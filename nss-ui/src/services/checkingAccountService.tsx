// src/services/checkingAccountService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/checking';

// Function to get all checking accounts
export const getAllCheckingAccounts = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching checking accounts:', error);
        return [];
    }
};

// Function to create a checking account
export const createCheckingAccount = async (checkingAccount: any) => {
    try {
        const token = localStorage.getItem('jwtToken');
        const customerId = localStorage.getItem('customerId');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.post(`${API_BASE_URL}/${customerId}`, checkingAccount, config);
        return response.data;
    } catch (error) {
        console.error('Error creating checking account:', error);
        throw error;
    }
};

// Function to delete a checking account
export const deleteCheckingAccount = async (accountNumber: string) => {
    try {
        await axios.delete(`${API_BASE_URL}/${accountNumber}`);
    } catch (error) {
        console.error('Error deleting checking account:', error);
        throw error;
    }
};
