// src/user/dashboard/page.tsx

"use client";

import { useEffect, useState } from 'react';
import Layout from '../../../components/UserLayout';
import { getCustomerInfo } from '../../../services/userInfoService'; // Import the service

interface Customer {
    customerId: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: number;
    enabled: boolean;
}

export default function UserDashboard() {
    const [customer, setCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            const customerInfo = await getCustomerInfo();
            setCustomer(customerInfo);
        };
        fetchCustomerInfo();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
            {customer ? (
                <div className="bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">User Information</h2>
                    <ul>
                        <li><strong>Customer ID:</strong> {customer.customerId}</li>
                        <li><strong>Name:</strong> {customer.name}</li>
                        <li><strong>Street:</strong> {customer.street}</li>
                        <li><strong>City:</strong> {customer.city}</li>
                        <li><strong>State:</strong> {customer.state}</li>
                        <li><strong>Zip Code:</strong> {customer.zipCode}</li>
                        <li><strong>Account Status:</strong> {customer.enabled ? 'Active' : 'Inactive'}</li>
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </Layout>
    );
}
