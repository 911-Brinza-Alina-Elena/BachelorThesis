import axios from 'axios';
import { Journal } from '../models/journal';
import User from '../models/user';

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

export const addJournal = async (token: string, journal: Journal): Promise<string> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return new Promise((resolve, reject) => {
        axios.post(`http://127.0.0.1:5000/api/patients/journals`, journal, headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.msg);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to add journal.");
        }
        );
    });
};

export const getUser = async (token: string): Promise<User> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return new Promise((resolve, reject) => {
        axios.get("http://127.0.0.1:5000/api/users/account", headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.user);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to get user.");
        });
    });
};

const formatDate = (date: Date): string => {
    let stringDate: string = '';
    stringDate += date.getFullYear() + '-';
    stringDate += (date.getMonth() + 1) + '-';
    stringDate += date.getDate();
    return stringDate;
  }

export const updateUser = async (token: string, user: User): Promise<string> => {
    console.log(user);
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (user.type_of_account === "patient") {
        return new Promise((resolve, reject) => {
            axios.put("http://127.0.0.1:5000/api/users/account", {
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                date_of_birth: formatDate(user.date_of_birth),
                gender: user.gender,
                country: user.country,
                city: user.city
            }, headers).then((response) => {
                console.log(response);
                resolve(response.data.msg);
            }).catch((error) => {
                console.log(error);
                reject("An error occurred while trying to update user.");
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            axios.put("http://127.0.0.1:5000/api/users/account", {
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                date_of_birth: formatDate(user.date_of_birth),
                gender: user.gender,
                country: user.country,
                city: user.city,
                therapist_speciality: user.therapist_speciality,
                therapist_location: user.therapist_location
            }, headers).then((response) => {
                console.log(response);
                resolve(response.data.msg);
            }
            ).catch((error) => {
                console.log(error);
                reject("An error occurred while trying to update user.");
            }
            );
        });
    }
};

export const updatePassword = async (token: string, password: string, newPassword: string): Promise<string> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const body = {
        password: password,
        new_password: newPassword
    }
    return new Promise((resolve, reject) => {
        axios.put("http://127.0.0.1:5000/api/users/account/password", body, headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.msg);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to update password.");
        });
    });
};