import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/student-loan-accounts';

export const getAllStudentLoanAccounts = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching student loan accounts:', error);
        return [];
    }
};
