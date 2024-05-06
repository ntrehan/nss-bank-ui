// src/services/statsService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getNumberOfCustomers = async () => {
    const response = await axios.get(`${API_BASE_URL}/customers`);
    return response.data.length;
};

export const getNumberOfInstitutes = async () => {
    const response = await axios.get(`${API_BASE_URL}/institutes`);
    return response.data.length;
};

export const getAccountsDistribution = async () => {
    const checkingResponse = await axios.get(`${API_BASE_URL}/checking-accounts`);
    const savingResponse = await axios.get(`${API_BASE_URL}/saving-accounts`);
    const homeLoanResponse = await axios.get(`${API_BASE_URL}/home-loan-accounts`);
    const studentLoanResponse = await axios.get(`${API_BASE_URL}/student-loan-accounts`);

    return {
        total: checkingResponse.data.length + savingResponse.data.length + homeLoanResponse.data.length + studentLoanResponse.data.length,
        distribution: {
            checking: checkingResponse.data.length,
            saving: savingResponse.data.length,
            home: homeLoanResponse.data.length,
            student: studentLoanResponse.data.length
        }
    };
};
