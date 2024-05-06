// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
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
                    <Link href="/">
                        <div className="bg-red-200 text-red-600 hover:bg-red-300 px-4 py-2 rounded-md text-center uppercase font-bold transition">
                            Sign Out
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
