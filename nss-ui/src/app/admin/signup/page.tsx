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
        <div>
            <h1>Admin Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
            <p>Already have an account? <a href="/admin">Login here</a></p>
        </div>
    );
}
