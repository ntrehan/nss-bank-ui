// src/components/SavingAccountForm.tsx
"use client";
import { useState } from 'react';
import { createSavingAccount } from '../services/savingAccountService';

export default function SavingAccountForm() {
    const customerId = localStorage.getItem('customerId') || '';

    const [formData, setFormData] = useState({
        street: '',
        openDate: new Date().toISOString().split('T')[0], // Set to current date
        city: '',
        state: '',
        zipCode: '',
        interestRate: 0,
    });

    const [errors, setErrors] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        interestRate: '',
    });

    const validateField = (name: string, value: string | number) => {
        let errorMessage = '';

        switch (name) {
            case 'street':
                if (typeof value === 'string' && value.length === 0) {
                    errorMessage = 'Street is required';
                } else if (typeof value === 'string' && value.length > 20) {
                    errorMessage = 'Street cannot exceed 20 characters';
                }
                break;
            case 'city':
                if (typeof value === 'string' && value.length === 0) {
                    errorMessage = 'City is required';
                } else if (typeof value === 'string' && value.length > 20) {
                    errorMessage = 'City cannot exceed 20 characters';
                }
                break;
            case 'state':
                if (typeof value === 'string' && value.length !== 2) {
                    errorMessage = 'State must be exactly 2 characters long';
                }
                break;
            case 'zipCode':
                if (typeof value === 'string' && isNaN(Number(value))) {
                    errorMessage = 'Zip Code must be a number';
                } else if (typeof value === 'string' && Number(value) <= 0) {
                    errorMessage = 'Zip Code must be a positive number';
                }
                break;
            case 'interestRate':
                if (isNaN(Number(value)) || Number(value) < 0) {
                    errorMessage = 'Interest Rate must be a non-negative number';
                }
                break;
            default:
                break;
        }

        return errorMessage;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        const errorMessage = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: errorMessage }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Check if form has errors
        if (Object.values(errors).some(error => error !== '') || Object.values(formData).some(value => value === '')) {
            return; // Prevent submission if errors exist
        }
        try {
            const formDataWithCustomerId = { ...formData, customerId };
            await createSavingAccount(formDataWithCustomerId);
            alert('Saving Account created successfully');
            // Reset form
            setFormData({
                street: '',
                openDate: new Date().toISOString().split('T')[0], // Reset to current date
                city: '',
                state: '',
                zipCode: '',
                interestRate: 0,
            });
            setErrors({
                street: '',
                city: '',
                state: '',
                zipCode: '',
                interestRate: '',
            });
        } catch (error) {
            alert('Error creating saving account');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded">
            <div>
                <label>Street</label>
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.street ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                />
                {errors.street && <p className="text-red-500">{errors.street}</p>}
            </div>
            <div>
                <label>City</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                />
                {errors.city && <p className="text-red-500">{errors.city}</p>}
            </div>
            <div>
                <label>State</label>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                />
                {errors.state && <p className="text-red-500">{errors.state}</p>}
            </div>
            <div>
                <label>Zip Code</label>
                <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                />
                {errors.zipCode && <p className="text-red-500">{errors.zipCode}</p>}
            </div>
            <div>
                <label>Interest Rate</label>
                <input
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.interestRate ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                />
                {errors.interestRate && <p className="text-red-500">{errors.interestRate}</p>}
            </div>
            <div>
                <button
                    type="submit"
                    className={`mt-4 p-2 rounded ${
                        Object.values(errors).some(error => error !== '') || Object.values(formData).some(value => value === '')
                            ? 'bg-lightPurple opacity-50 cursor-not-allowed'
                            : 'bg-lightPurple text-gray-900'
                    }`}
                    disabled={Object.values(errors).some(error => error !== '') || Object.values(formData).some(value => value === '')}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
