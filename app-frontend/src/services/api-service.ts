import axios from 'axios';
import { Journal } from '../models/journal';

export const getJournals = async (token: string): Promise<Journal[]> => {
  // axios call to get all journals for a patient
  // return the journals
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return new Promise((resolve, reject) => {
    axios
      .get("http://127.0.0.1:5000/api/patients/journals", headers)
      .then((response) => {
        console.log(response);
        resolve(response.data.journals);
      })
      .catch((error) => {
        console.log(error);
        reject("An error occurred while trying to get journals.");
      });
  });
};

export const getJournal = async (token: string, id: number): Promise<Journal> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return new Promise((resolve, reject) => {
        axios
        .get(`http://127.0.0.1:5000/api/patients/journal/${id}`, headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.journal);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to get journal.");
        });
    });

};

export const updateJournal = async (token: string, journal: Journal): Promise<string> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    console.log(journal);
    return new Promise((resolve, reject) => {
        axios.put(`http://127.0.0.1:5000/api/patients/journal/${journal._id}`, journal, headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.msg);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to update journal.");
        });
    });
};

export const deleteJournal = async (token: string, id: number): Promise<string> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return new Promise((resolve, reject) => {
        axios.delete(`http://127.0.0.1:5000/api/patients/journal/${id}`, headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.msg);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to delete journal.");
        });
    });
};