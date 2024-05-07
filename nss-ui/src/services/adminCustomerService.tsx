// src/services/adminCustomerService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/customer';

export const getAllCustomers = async () => {
    try {
        const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage
        const response = await axios.get(API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}` // Attach the token to the Authorization header
            }
        });
        return response.data; // Return the list of customers
    } catch (error) {
        console.error('Error fetching customers:', error); // Log errors if any
        throw error; // Rethrow the error to handle it further up the chain
    }
};

export const getNumberOfCustomers = async () => {
    try {
        const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage
        const response = await axios.get(API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}` // Attach the token to the Authorization header
            }
        });
        return response.data.length; // Return the list of customers
    } catch (error) {
        console.error('Error fetching customers:', error); // Log errors if any
        throw error; // Rethrow the error to handle it further up the chain
    }
};