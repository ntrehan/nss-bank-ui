// src/services/userAuthService.ts

import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = 'http://localhost:8080/customer';

export const signupCustomer = async (name: string, street: string, city: string, state: string, zipCode: string, password: string): Promise<string> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, {
            name,
            street,
            city,
            state,
            zipcode: zipCode,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Assuming the API returns the customer ID as a plain string
        return response.data as string;
    } catch (error) {
        console.error('Error signing up customer:', error);
        throw error;
    }
};

export const loginCustomer = async (customerId: string, password: string): Promise<void> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, qs.stringify({
            customerId,
            password
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Save the JWT token to local storage
        localStorage.setItem('jwtToken', response.data as string);
        localStorage.setItem('customerId', customerId);
    } catch (error) {
        console.error('Error logging in customer:', error);
        throw error;
    }
};