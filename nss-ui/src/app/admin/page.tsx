"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+
import { loginAdmin } from '../../services/authService';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginAdmin(username, password);
            router.push('/admin/dashboard');
        } catch (error) {
            setMessage('Login failed. Please try again.');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-lightPurple">
            <div className="p-8 rounded-lg shadow-lg bg-white max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightPurple"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
                <p className="mt-4 text-center">
                    Don't have an account? <a href="/admin/signup" className="text-lightPurple hover:underline">Sign up here</a>
                </p>
            </div>
        </div>
    );
}
