// src/components/InstituteGrid.tsx
"use client";
import { useState, useEffect } from 'react';
import { getAllInstitutes, deleteInstitute } from '../services/instituteService';
import ConfirmationDialog from './ConfirmationDialog';
import InstituteForm from './InstituteForm'; // Import the form component
import { AiOutlineDelete } from 'react-icons/ai';

interface Institute {
    universityId: string;
    universityName: string;
    street: string;
    state: string;
    city: string;
    zipCode: number;
}

export default function InstituteGrid() {
    const [institutes, setInstitutes] = useState<Institute[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedInstitute, setSelectedInstitute] = useState<string | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false); // New state to toggle form visibility

    useEffect(() => {
        const fetchInstitutes = async () => {
            const institutes = await getAllInstitutes();
            setInstitutes(institutes);
        };
        fetchInstitutes();
    }, []);

    const handleDeleteClick = (universityId: string) => {
        setSelectedInstitute(universityId);
        setDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedInstitute) {
            await deleteInstitute(selectedInstitute);
            setInstitutes(institutes.filter(inst => inst.universityId !== selectedInstitute));
        }
        setDialogOpen(false);
        setSelectedInstitute(null);
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(prev => !prev);
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center text-lightPurple mb-4">Institutes</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">University ID</th>
                        <th className="border border-gray-300 px-4 py-2">University Name</th>
                        <th className="border border-gray-300 px-4 py-2">Street</th>
                        <th className="border border-gray-300 px-4 py-2">City</th>
                        <th className="border border-gray-300 px-4 py-2">State</th>
                        <th className="border border-gray-300 px-4 py-2">Zip Code</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {institutes.map(inst => (
                        <tr key={inst.universityId} className="odd:bg-white even:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{inst.universityId}</td>
                            <td className="border border-gray-300 px-4 py-2">{inst.universityName}</td>
                            <td className="border border-gray-300 px-4 py-2">{inst.street}</td>
                            <td className="border border-gray-300 px-4 py-2">{inst.city}</td>
                            <td className="border border-gray-300 px-4 py-2">{inst.state}</td>
                            <td className="border border-gray-300 px-4 py-2">{inst.zipCode}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button onClick={() => handleDeleteClick(inst.universityId)}>
                                    <AiOutlineDelete className="text-red-600 hover:text-red-800" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className=" bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-md text-center uppercase font-bold">
                <button onClick={toggleFormVisibility} className="mt-4 bg-lightPurple p-2 rounded">Add Institute</button>
            </div>
            
            {isFormVisible && <InstituteForm />}
            <ConfirmationDialog
                isOpen={dialogOpen}
                message="Are you sure you want to delete this institute?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setDialogOpen(false)}
            />
        </div>
    );
}
