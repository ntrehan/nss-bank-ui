
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '../../services/authService';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginAdmin(username, password); // Add the login function
            router.push('/admin/dashboard'); // Redirect to the dashboard
        } catch (error) {
            setMessage('Login failed. Please try again.');
        }
    }

    return (
        <div>
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Log In</button>
            </form>
            {message && <p>{message}</p>}
            <p>Don't have an account? <a href="/admin/signup">Sign up here</a></p>
        </div>
    );
}
