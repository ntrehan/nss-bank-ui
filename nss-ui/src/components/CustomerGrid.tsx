// src/components/CustomerGrid.tsx
"use client";

import { useState, useEffect } from 'react';
import { getAllCustomers } from '../services/adminCustomerService.tsx';
import { deleteCustomer as deleteCustomerService } from '../services/customerService';
import { AiOutlineDelete } from 'react-icons/ai';
import ConfirmationDialog from './ConfirmationDialog'; // Import the new component

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            const customers = await getAllCustomers();
            setCustomers(customers);
        };
        fetchCustomers();
    }, []);

    const openDeleteDialog = (customerId: string) => {
        setCustomerToDelete(customerId);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setCustomerToDelete(null);
    };

    const confirmDelete = async () => {
        if (customerToDelete) {
            await deleteCustomerService(customerToDelete);
            setCustomers(customers.filter(c => c.customerId !== customerToDelete));
        }
        closeDialog();
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center text-lightPurple mb-4">Customers</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Customer ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Street</th>
                        <th className="border border-gray-300 px-4 py-2">City</th>
                        <th className="border border-gray-300 px-4 py-2">State</th>
                        <th className="border border-gray-300 px-4 py-2">Zip Code</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customerId} className="odd:bg-white even:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{customer.customerId}</td>
                            <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{customer.street}</td>
                            <td className="border border-gray-300 px-4 py-2">{customer.city}</td>
                            <td className="border border-gray-300 px-4 py-2">{customer.state}</td>
                            <td className="border border-gray-300 px-4 py-2">{customer.zipCode}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button onClick={() => openDeleteDialog(customer.customerId)}>
                                    <AiOutlineDelete className="text-red-600 hover:text-red-800" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmationDialog
                isOpen={isDialogOpen}
                message="Are you sure you want to delete this customer?"
                onConfirm={confirmDelete}
                onCancel={closeDialog}
            />
        </div>
    );
}
