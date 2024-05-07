// src/services/authService.ts

import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = 'http://localhost:8080/admin';

export const signupAdmin = async (name: string, password: string, email: string) => {
    try {
        // Encode the data using qs
        const data = qs.stringify({
            name,
            password,
            email,
            role: 'ADMIN'
        });

        const response = await axios.post(`${API_BASE_URL}/signup`, data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data; // Adjust according to the actual response
    } catch (error) {
        console.error('Error signing up admin:', error);
        throw error;
    }
};
export const loginAdmin = async (employeeId: string, password: string) => {
    try {
        // Encode the data using qs
        const data = qs.stringify({
            employeeId,
            password,
        });

        const response = await axios.post(`${API_BASE_URL}/login`, data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // Return the JWT token
        return response.data;
    } catch (error) {
        console.error('Error logging in admin:', error);
        throw error;
    }
};