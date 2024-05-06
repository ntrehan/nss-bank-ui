// src/components/ConfirmationDialog.tsx
"use client";

interface ConfirmationDialogProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmationDialog({ isOpen, message, onConfirm, onCancel }: ConfirmationDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
                <p>{message}</p>
                <div className="flex justify-end mt-4 space-x-4">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Yes</button>
                </div>
            </div>
        </div>
    );
}
