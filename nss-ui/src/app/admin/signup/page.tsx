// src/app/admin/signup/page.tsx

"use client";

import { useState } from 'react';
import { signupAdmin } from '../../../services/authService';

export default function AdminSignup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signupAdmin(name, password, email);
            setMessage(result); // Set response message
        } catch (error) {
            setMessage('Signup failed. Please try again.');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-lightPurple">
            <div className="p-8 rounded-lg shadow-lg bg-white max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Admin Signup</h1>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lightPurple focus:border-lightPurple sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lightPurple focus:border-lightPurple sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lightPurple focus:border-lightPurple sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightPurple"
                    >
                        Sign Up
                    </button>
                </form>
                {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
                <p className="mt-4 text-center">
                    Already have an account? <a href="/admin" className="text-purple-500 hover:text-purple-700 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
}
