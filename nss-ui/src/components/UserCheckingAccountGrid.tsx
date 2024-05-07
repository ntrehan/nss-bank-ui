// src/components/CheckingAccountGrid.tsx
"use client";
import { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { getAllCheckingAccounts, deleteCheckingAccount } from '../services/checkingAccountService';
import CheckingAccountForm from './CheckingAccountForm';

interface CheckingAccount {
    accountNumber: string;
    street: string;
    city: string;
    state: string;
    zipCode: number;
    serviceCharge: number;
    customerId: { customerId: string };
}

export default function CheckingAccountGrid() {
    const [accounts, setAccounts] = useState<CheckingAccount[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            const fetchedAccounts = await getAllCheckingAccounts();
            const storedCustomerId = localStorage.getItem("customerId");

            const filteredAccounts = fetchedAccounts.filter(account => 
                account.customerId.customerId === storedCustomerId
            );
            setAccounts(filteredAccounts);
        };
        fetchAccounts();
    }, []);

    const handleDelete = async (accountNumber: string) => {
        if (confirm('Are you sure you want to delete this checking account?')) {
            try {
                await deleteCheckingAccount(accountNumber);
                setAccounts(accounts.filter(account => account.accountNumber !== accountNumber));
            } catch (error) {
                console.error('Error deleting checking account:', error);
                alert('Failed to delete the account');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center text-lightPurple mb-4">Checking Accounts</h1>
            <table className="table-auto w-full border-collapse border border-gray-300 mb-8">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Account Number</th>
                        <th className="border border-gray-300 px-4 py-2">Street</th>
                        <th className="border border-gray-300 px-4 py-2">City</th>
                        <th className="border border-gray-300 px-4 py-2">State</th>
                        <th className="border border-gray-300 px-4 py-2">Zip Code</th>
                        <th className="border border-gray-300 px-4 py-2">Service Charge</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account.accountNumber} className="odd:bg-white even:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{account.accountNumber}</td>
                            <td className="border border-gray-300 px-4 py-2">{account.street}</td>
                            <td className="border border-gray-300 px-4 py-2">{account.city}</td>
                            <td className="border border-gray-300 px-4 py-2">{account.state}</td>
                            <td className="border border-gray-300 px-4 py-2">{account.zipCode}</td>
                            <td className="border border-gray-300 px-4 py-2">{account.serviceCharge}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button onClick={() => handleDelete(account.accountNumber)}>
                                    <AiOutlineDelete className="text-red-600 hover:text-red-800" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-center mb-8">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="mb-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
                >
                    {showForm ? "Hide Form" : "Add Checking Account"}
                </button>
            </div>

            {showForm && <CheckingAccountForm />}
        </div>
    );
}
