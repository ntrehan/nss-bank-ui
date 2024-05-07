// src/components/CheckingAccountForm.tsx
"use client";

import { useState } from 'react';
import { createCheckingAccount } from '../services/checkingAccountService';

export default function CheckingAccountForm() {
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        serviceCharge: '',
        openDate: new Date().toISOString().slice(0, 10), // Defaults to today's date
    });

    const [errors, setErrors] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        serviceCharge: '',
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
            case 'serviceCharge':
                if (typeof value === 'string' && isNaN(Number(value))) {
                    errorMessage = 'Service Charge must be a number';
                } else if (typeof value === 'string' && Number(value) <= 0) {
                    errorMessage = 'Service Charge must be a positive number';
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
            await createCheckingAccount(formData);
            alert('Checking account created successfully');
            // Reset form
            setFormData({
                street: '',
                city: '',
                state: '',
                zipCode: '',
                serviceCharge: '',
                openDate: new Date().toISOString().slice(0, 10),
            });
            setErrors({
                street: '',
                city: '',
                state: '',
                zipCode: '',
                serviceCharge: '',
            });
        } catch (error) {
            alert('Error creating checking account');
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
                <label>Service Charge</label>
                <input
                    type="text"
                    name="serviceCharge"
                    value={formData.serviceCharge}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.serviceCharge ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                />
                {errors.serviceCharge && <p className="text-red-500">{errors.serviceCharge}</p>}
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
