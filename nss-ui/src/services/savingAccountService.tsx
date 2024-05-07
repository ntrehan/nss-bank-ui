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
