// src/services/adminAccountsService.tsx

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/admin/accounts';

export const getAllAccounts = async () => {
    try {
        // Get the JWT token from local storage
        const token = localStorage.getItem('jwtToken');

        // Make sure the token exists before making the request
        if (!token) {
            throw new Error('No authentication token found');
        }

        // Set up the request headers
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        // Make the GET request to the API
        const response = await axios.get(API_BASE_URL, config);
        return response.data; // This will return the list of accounts
    } catch (error) {
        console.error('Error fetching accounts:', error);
        throw error; // Throwing the error to handle it where the service is called
    }
};

export const getAccountsDistribution = async () => {
    try {
        const allAccounts = await getAllAccounts();
        const distribution = {
            checking: 0,
            saving: 0,
            home: 0,
            student: 0
        };
        
        allAccounts.forEach(account => {
            switch (account.accountType.toUpperCase()) {
                case 'CHECKING':
                    distribution.checking++;
                    break;
                case 'SAVING':
                    distribution.saving++;
                    break;
                case 'HOME':
                    distribution.home++;
                    break;
                case 'STUDENT':
                    distribution.student++;
                    break;
                default:
                    break;
            }
        });
        
        return {
            total: allAccounts.length,
            distribution
        };
    } catch (error) {
        console.error('Error fetching account distribution:', error);
        throw error;
    }
};