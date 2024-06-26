// src/components/Navbar.tsx
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import the router for redirection

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        // Clear the JWT token from local storage
        localStorage.removeItem('jwtToken');

        // Redirect to the home page
        router.push('/');
    };

    return (
        <nav className="bg-lightPurple p-4">
            <ul className="flex justify-center space-x-8 items-center">
                <li>
                    <Link href="/admin/dashboard">
                        <div className="bg-purple-200 text-purple-600 hover:bg-purple-300 px-4 py-2 rounded-md text-center uppercase font-bold transition">
                            Dashboard
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/customers">
                        <div className="bg-purple-200 text-purple-600 hover:bg-purple-300 px-4 py-2 rounded-md text-center uppercase font-bold transition">
                            Customers
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/accounts">
                        <div className="bg-purple-200 text-purple-600 hover:bg-purple-300 px-4 py-2 rounded-md text-center uppercase font-bold transition">
                            Accounts
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/institutes">
                        <div className="bg-purple-200 text-purple-600 hover:bg-purple-300 px-4 py-2 rounded-md text-center uppercase font-bold transition">
                            Institutes
                        </div>
                    </Link>
                </li>
                <li className="ml-auto">
                    {/* Use a button instead of a link */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-200 text-red-600 hover:bg-red-300 px-4 py-2 rounded-md text-center uppercase font-bold transition"
                    >
                        Sign Out
                    </button>
                </li>
            </ul>
        </nav>
    );
}
