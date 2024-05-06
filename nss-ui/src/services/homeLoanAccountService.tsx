import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/home-loan-accounts';

export const getAllHomeLoanAccounts = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching home loan accounts:', error);
        return [];
    }
};
