// src/components/CustomerGrid.tsx
'use client'
import { useState, useEffect } from 'react';
import { getAllCustomers } from '../services/customerService';

interface Customer {
    customerId: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: number;
}

export default function CustomerGrid() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const customers = await getAllCustomers();
            setCustomers(customers);
        };
        fetchCustomers();
    }, []);

    return (
        <div>
            <h1>Customers</h1>
            <table>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customerId}>
                            <td>{customer.customerId}</td>
                            <td>{customer.name}</td>
                            <td>{customer.street}</td>
                            <td>{customer.city}</td>
                            <td>{customer.state}</td>
                            <td>{customer.zipCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
