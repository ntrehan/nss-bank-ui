// src/components/UserLayout.tsx
import UserNavbar from './UserNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <UserNavbar />
            <main className="p-4">
                {children}
            </main>
        </div>
    );
}
