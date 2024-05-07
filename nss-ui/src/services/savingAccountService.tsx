// src/services/savingAccountService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/savings';

export const getAllSavingAccounts = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching saving accounts:', error);
        return [];
    }
};

export const createSavingAccount = async (accountData) => {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.post(
            `${API_BASE_URL}/${accountData.customerId}`, 
            accountData, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating saving account:', error);
        throw error;
    }
};

export const deleteSavingAccount = async (accountId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${accountId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting saving account:', error);
        throw error;
    }
};
