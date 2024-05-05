// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Welcome to NSS Bank</h1>
            <h2>Please select your role:</h2>
            <ul>
                <li><Link href="/admin">Admin</Link></li>
                <li><Link href="/user">User</Link></li>
            </ul>
        </div>
    );
}
