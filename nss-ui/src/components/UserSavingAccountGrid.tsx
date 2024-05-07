"use client";
import { useState, useEffect } from 'react';
import { getAllSavingAccounts } from '../services/savingAccountService';

interface SavingAccount {
    accountNumber: string;
    street: string;
    city: string;
    state: string;
    zipCode: number;
    interest: number;
}

export default function SavingAccountGrid() {
    const [accounts, setAccounts] = useState<SavingAccount[]>([]);

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

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center text-lightPurple mb-4">Saving Accounts</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Account Number</th>
                        <th className="border border-gray-300 px-4 py-2">Street</th>
                        <th className="border border-gray-300 px-4 py-2">City</th>
                        <th className="border border-gray-300 px-4 py-2">State</th>
                        <th className="border border-gray-300 px-4 py-2">Zip Code</th>
                        <th className="border border-gray-300 px-4 py-2">Interest</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
