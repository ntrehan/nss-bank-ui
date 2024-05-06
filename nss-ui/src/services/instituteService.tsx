// src/services/instituteService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/institutes';

export const getAllInstitutes = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching institutes:', error);
        return [];
    }
};

export const createInstitute = async (institute: any) => {
    try {
        const response = await axios.post(API_BASE_URL, institute);
        return response.data;
    } catch (error) {
        console.error('Error creating institute:', error);
        throw error;
    }
};

export const deleteInstitute = async (id: string) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting institute:', error);
        throw error;
    }
};
