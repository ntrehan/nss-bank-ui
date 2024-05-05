
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/customers';

export const getAllCustomers = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        print(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
};
