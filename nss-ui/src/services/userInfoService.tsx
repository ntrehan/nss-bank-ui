// src/services/userInfoService.tsx

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/customer';

export const getCustomerInfo = async () => {
    const customerId = localStorage.getItem('customerId');
    const jwtToken = localStorage.getItem('jwtToken');
    
    if (!customerId || !jwtToken) {
        throw new Error('Customer ID or JWT token not found in local storage');
    }

    try {
        console.log(localStorage.getItem('customerId'));
        const response = await axios.get(`${API_BASE_URL}/info`, {
            params: { customerId },
            headers: { Authorization: `Bearer ${jwtToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching customer info:', error);
        throw error;
    }
};
