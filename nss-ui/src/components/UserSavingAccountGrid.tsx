// src/components/SavingAccountGrid.tsx
"use client";
import { useState, useEffect } from 'react';
import { getAllSavingAccounts, deleteSavingAccount } from '../services/savingAccountService';
import SavingAccountForm from './SavingAccountForm';
import ConfirmationDialog from './ConfirmationDialog';
import { AiOutlineDelete } from 'react-icons/ai';

interface SavingAccount {
    accountNumber: string;
    street: string;
    city: string;
    state: string;
    zipCode: number;
    interest: number;
    customerId: {
        customerId: string;
    };
}

export default function SavingAccountGrid() {
    const [accounts, setAccounts] = useState<SavingAccount[]>([]);
    const [showForm, setShowForm] = useState(false); // Toggle for form
    const [showDialog, setShowDialog] = useState(false); // Toggle for confirmation dialog
    const [accountToDelete, setAccountToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            const fetchedAccounts = await getAllSavingAccounts();
            const storedCustomerId = localStorage.getItem("customerId");

            const filteredAccounts = fetchedAccounts.filter(account =>
                account.customerId.customerId === storedCustomerId
            );
            setAccounts(filteredAccounts);
        };
        fetchAccounts();
    }, []);

    const handleDeleteAccount = async () => {
        if (!accountToDelete) return;

        try {
            await deleteSavingAccount(accountToDelete);
            setAccounts(accounts.filter(account => account.accountNumber !== accountToDelete));
            alert('Account deleted successfully');
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Error deleting account');
        }
        setShowDialog(false);
    };

    const openConfirmationDialog = (accountNumber: string) => {
        setAccountToDelete(accountNumber);
        setShowDialog(true);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center text-lightPurple mb-4">Saving Accounts</h1>
            <table className="table-auto w-full border-collapse border border-gray-300 mb-8">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Account Number</th>
                        <th className="border border-gray-300 px-4 py-2">Street</th>
                        <th className="border border-gray-300 px-4 py-2">City</th>
                        <th className="border border-gray-300 px-4 py-2">State</th>
                        <th className="border border-gray-300 px-4 py-2">Zip Code</th>
                        <th className="border border-gray-300 px-4 py-2">Interest</th>
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
                            <td className="border border-gray-300 px-4 py-2">{account.interest}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button onClick={() => openConfirmationDialog(account.accountNumber)}>
                                    <AiOutlineDelete className="text-red-600 hover:text-red-800" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={toggleForm}
                className="mb-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
            >
                {showForm ? 'Hide Form' : 'Add New Account'}
            </button>

            {showForm && <SavingAccountForm />}

            <ConfirmationDialog
                isOpen={showDialog}
                message="Are you sure you want to delete this account?"
                onConfirm={handleDeleteAccount}
                onCancel={() => setShowDialog(false)}
            />
        </div>
    );
}
