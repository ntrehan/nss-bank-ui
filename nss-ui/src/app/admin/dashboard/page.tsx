"use client";
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                <li>
                    <Link href="/admin/customers">List Customers</Link>
                </li>
                <li>
                    <a href="/admin/institutes">List Institutes</a>
                </li>
                <li>
                    <a href="/admin/accounts">List Accounts</a>
                </li>
                <li>
                    <a href="/admin/education-institutes">List Education Institutes</a>
                </li>
            </ul>
        </div>
    );
}
