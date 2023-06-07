import axios from "axios";
import User from "../models/user";
import {LoginResponse} from "../models/login-response";
import { handleLogout } from "../utils/helpers";

export const logoutUser = (): Promise<string> => {
  
  return new Promise((resolve, reject) => {
    const headers = { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}};
    axios.post("http://127.0.0.1:5000/api/users/logout", {
      email: localStorage.getItem("email"),
    }, headers).then((response) => {
      console.log(response);
      handleLogout();
      resolve(response.data.msg);

    }).catch((error) => {
      console.log(error);
      handleLogout();
      reject("An error occurred while trying to logout.");
    });
  });
  
};

export const loginUser = (email: string, password: string): Promise<LoginResponse> => {
    // call to the API to login using axios
    // if successful, redirect to the dashboard
    // if not, display an error message
    return new Promise((resolve, reject) => {
      axios.post("http://127.0.0.1:5000/api/users/login", {
        email: email,
        password: password
      })
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          reject("Invalid credentials.");
        } else {
          reject("An error occurred while trying to login.");
        }
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

  export const registerUser = (user: User) => {
    console.log(user);
    try {
        if (user.type_of_account === "patient") {
            axios.post("http://127.0.0.1:5000/api/users/register", {
              username: user.username,
              email: user.email,
              password: user.password,
              type_of_account: user.type_of_account,
              first_name: user.first_name,
              last_name: user.last_name,
              date_of_birth: formatDate(user.date_of_birth),
              gender: user.gender,
              country: user.country,
              city: user.city
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
                return error.response.data.msg;
            });
        } else if (user.type_of_account === "therapist") {
            axios
              .post("http://127.0.0.1:5000/api/users/register", {
                username: user.username,
                email: user.email,
                password: user.password,
                type_of_account: user.type_of_account,
                first_name: user.first_name,
                last_name: user.last_name,
                date_of_birth: formatDate(user.date_of_birth),
                gender: user.gender,
                country: user.country,
                city: user.city,
                therapist_speciality: user.therapist_speciality,
                therapist_location: user.therapist_location,
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
                return error.response.data.msg;
              });
        }
    } catch (error) {
        console.log(error);
    }
  };