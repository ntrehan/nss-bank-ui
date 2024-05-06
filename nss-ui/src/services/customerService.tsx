import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/customers';

export const getAllCustomers = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
};

export const deleteCustomer = async (customerId: string) => {
    try {
        await axios.delete(`${API_BASE_URL}/${customerId}`);
        console.log(`Customer ${customerId} deleted successfully`);
    } catch (error) {
        console.error(`Error deleting customer ${customerId}:`, error);
    }
};



