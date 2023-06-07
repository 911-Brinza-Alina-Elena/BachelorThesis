import axios from 'axios';
import { Journal } from '../models/journal';

export const getJournals = async (token: string): Promise<Journal[]> => {
    // axios call to get all journals for a patient
    // return the journals
    const headers = { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}};
    return new Promise((resolve, reject) => {
        axios.get("http://127.0.0.1:5000/api/patients/journals", headers).then((response) => {
            console.log(response);
            resolve(response.data.journals);
        }).catch((error) => {
            console.log(error);
            reject("An error occurred while trying to get journals.");
        });
    });
};
