"use client";
import { useState, useEffect } from 'react';
import { getAllStudentLoanAccounts } from '../services/studentLoanAccountService';

interface StudentLoanAccount {
    accountNumber: string;
    street: string;
    city: string;
    state: string;
    zipCode: number;
    loanRate: number;
    loanAmount: number;
    loanMonths: number;
    loanPayment: string;
    universityId: string;
    studentId: string;
    educationLevel: string;
    expectedGraduationDate: string;
}

export default function StudentLoanAccountGrid() {
    const [accounts, setAccounts] = useState<StudentLoanAccount[]>([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const fetchedAccounts = await getAllStudentLoanAccounts();
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
            <h1 className="text-3xl font-bold text-center text-lightPurple mb-4">Student Loan Accounts</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Account Number</th>
                        <th className="border border-gray-300 px-4 py-2">Street</th>
                        <th className="border border-gray-300 px-4 py-2">City</th>
                        <th className="border border-gray-300 px-4 py-2">State</th>
                        <th className="border border-gray-300 px-4 py-2">Zip Code</th>
                        <th className="border border-gray-300 px-4 py-2">Loan Rate</th>
                        <th className="border border-gray-300 px-4 py-2">Loan Amount</th>
                        <th className="border border-gray-300 px-4 py-2">Loan Months</th>
                        <th className="border border-gray-300 px-4 py-2">University ID</th>
                        <th className="border border-gray-300 px-4 py-2">Student ID</th>
                        <th className="border border-gray-300 px-4 py-2">Education Level</th>
                        <th className="border border-gray-300 px-4 py-2">Expected Graduation Date</th>
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
                            <td className="border border-gray-300 px-4 py-2">{account.loanRate}</td>
                            <td className="border border-gray-300 px-4 py-2">{account.loanAmount}</td>
                            <td className="border border-gray-300 px-4 py-2">{account.loanMonths}</td>
                            <td className="border border-gray-300 px-4 py-2">{account.universityId}</td>
                            <td className="border border-gray-300 px-4 py-2">{account.studentId}</td>
                            <td className="border border-gray-300 px-4 py-2">{account.educationLevel}</td>
                            <td className="border border-gray-300 px-4 py-2">{account.expectedGraduationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
