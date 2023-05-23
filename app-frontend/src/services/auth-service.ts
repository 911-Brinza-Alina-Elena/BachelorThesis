import axios from "axios";
import User from "../models/user";
import { Console } from "console";

export const loginUser = (email: string, password: string) => {
    // call to the API to login using axios
    // if successful, redirect to the dashboard
    // if not, display an error message
    try {
      axios.post("http://127.0.0.1:5000/api/users/login", {
        email: email,
        password: password
      })
      .then((response) => {
        console.log(response);
        // redirect to the dashboard
      })
      .catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
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
              });
        }
    } catch (error) {
        console.log(error);
    }
  };