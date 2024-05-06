// src/app/admin/dashboard/page.tsx
"use client";
import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { getNumberOfCustomers, getNumberOfInstitutes, getAccountsDistribution } from '../../../services/statsService';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

export default function AdminDashboard() {
    const [customerCount, setCustomerCount] = useState<number>(0);
    const [instituteCount, setInstituteCount] = useState<number>(0);
    const [accounts, setAccounts] = useState<{ total: number, distribution: any }>({ total: 0, distribution: {} });

    useEffect(() => {
        async function fetchData() {
            const customers = await getNumberOfCustomers();
            const institutes = await getNumberOfInstitutes();
            const accountData = await getAccountsDistribution();

            setCustomerCount(customers);
            setInstituteCount(institutes);
            setAccounts(accountData);
        }
        fetchData();
    }, []);

    const pieData = {
        labels: ['Checking', 'Saving', 'Home Loan', 'Student Loan'],
        datasets: [{
            data: [accounts.distribution.checking, accounts.distribution.saving, accounts.distribution.home, accounts.distribution.student],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
    };

    return (
        <Layout>
            <h1 className="text-center text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="flex justify-around">
                <div>
                    <h2 className="text-xl font-bold">Number of Customers:</h2>
                    <p>{customerCount}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold">Number of Registered Institutes</h2>
                    <p>{instituteCount}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold">Total Accounts</h2>
                    <p>{accounts.total}</p>
                    <Pie data={pieData} />
                </div>
            </div>
        </Layout>
    );
}
