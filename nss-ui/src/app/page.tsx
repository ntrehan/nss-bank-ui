// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-lightPurple">
            <div className="text-center p-8 rounded-lg shadow-lg bg-white max-w-md w-full space-y-6">
                <h1 className="text-3xl font-bold mb-6">Welcome to NSS Bank</h1>
                <h2 className="text-xl mb-4">Please select your role:</h2>
                <div className="space-y-4">
                    <Link href="/admin">
                        <button className="w-full py-3 px-4 mb-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600">
                            Admin
                        </button>
                    </Link>
                    <Link href="/user">
                        <button className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600">
                            User
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
