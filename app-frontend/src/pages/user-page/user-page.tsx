import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../models/user";
import { getUser, updatePassword, updateUser } from "../../services/api-service";
import { DatePicker, DefaultButton, Stack, TextField } from "@fluentui/react";

export const UserPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [user, setUser] = useState<User>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [updatedUser, setUpdatedUser] = useState<User>();
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [currentPassword, setCurrentPassword] = useState<string>('');

    useEffect(() => {
        if (token) {
            getAndSetUser();
        } else {
            navigate('/login');
        }
    }, [token]);

    const getAndSetUser = () => {
        getUser(token!).then((response) => {
            console.log(response);
            const dob = new Date(response.date_of_birth!);
            setUser(response);
            setUpdatedUser(response);
            setUser(user => ({...user!, date_of_birth: dob}));
            setUpdatedUser(user => ({...user!, date_of_birth: dob}));
        }).catch((error) => {
            console.log(error);
            alert(error);
        });

    };

    const handleUsernameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setUpdatedUser(user => ({ ...user!, username: newValue! }));
    };

    const handleFirstNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {  
        setUpdatedUser(user => ({ ...user!, first_name: newValue! }));
    };

    const handleLastNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setUpdatedUser(user => ({ ...user!, last_name: newValue! }));
    };

    const handleGenderChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setUpdatedUser(user => ({...user!, gender: newValue!}));
    };

    const handleCountryChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setUpdatedUser(user => ({...user!, country: newValue!}));
    };

    const handleCityChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setUpdatedUser(user => ({...user!, city: newValue!}));
    };

    const handleSpecialityChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setUpdatedUser(user => ({...user!, therapist_speciality: newValue!}));
    };

    const handleLocationChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setUpdatedUser(user => ({...user!, therapist_location: newValue!}));
    };

    const onChangeDateOfBirth = useCallback(
        (date: Date | null | undefined) => {
          setUpdatedUser(user => ({...user!, date_of_birth: date || new Date()}));
        },
        [],
    );

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        // validate input
        if (updatedUser!.username === '' || updatedUser!.username.length < 4) {
            alert('Username too short!');
            return;
        } else if (updatedUser!.first_name === '' || updatedUser!.first_name.length < 4) {
            alert('First name too short!');
            return;
        } else if (updatedUser!.last_name === '' || updatedUser!.last_name.length < 4) {
            alert('Last name too short!');
            return;
        } else if (updatedUser!.gender === '' || updatedUser!.gender.length < 4) {
            alert('Gender too short!');
            return;
        } else if (updatedUser!.country === '' || updatedUser!.country.length < 4) {
            alert('Country too short!');
            return;
        } else if (updatedUser!.city === '' || updatedUser!.city.length < 4) {
            alert('City too short!');
            return;
        }
        console.log(updatedUser);
        updateUser(token!, updatedUser!)
          .then((response) => {
            setEditMode(false);
            getAndSetUser();
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setUpdatedUser(user);
    };

    const handleCurrentPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setCurrentPassword(newValue!);
    };

    const handleNewPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setNewPassword(newValue!);
    };

    const handleConfirmPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setConfirmPassword(newValue!);
    };

    const savePasswordChange = () => {
        if (newPassword === currentPassword) {
            alert('New password cannot be the same as the current password!');
            return;
        }
        if (newPassword === '' || newPassword.length < 4) {
            alert('Password too short!');
            return;
        } else if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        updatePassword(token!, currentPassword, newPassword)
          .then((response) => {
            setEditMode(false);
            getAndSetUser();
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
    }

    return (
        <div style={{width: '50%'}}>
            <h1>User Profile</h1>
            <div>
                <h2>Personal details</h2>
                <TextField
                    label="Username"
                    value={updatedUser?.username}
                    onChange={handleUsernameChange}
                    disabled={!editMode}
                />
                <TextField
                    label="Email"
                    value={updatedUser?.email}
                    disabled={true}
                />
                <TextField
                    label="First Name"
                    value={updatedUser?.first_name}
                    onChange={handleFirstNameChange}
                    disabled={!editMode}
                />
                <TextField
                    label="Last Name"
                    value={updatedUser?.last_name}
                    onChange={handleLastNameChange}
                    disabled={!editMode}
                />
                <DatePicker
                  label="Date of Birth"
                  value={updatedUser?.date_of_birth}
                  onSelectDate={onChangeDateOfBirth}
                  disabled={!editMode}
                />
                <TextField
                    label="Gender"
                    value={updatedUser?.gender}
                    onChange={handleGenderChange}
                    disabled={!editMode}
                />
                <TextField
                    label="Country"
                    value={updatedUser?.country}
                    onChange={handleCountryChange}
                    disabled={!editMode}
                />
                <TextField
                    label="City"
                    value={updatedUser?.city}
                    onChange={handleCityChange}
                    disabled={!editMode}
                />
                {user?.type_of_account === 'therapist' && (
                    <>
                        <TextField
                            label="Speciality"
                            value={updatedUser?.therapist_speciality}
                            onChange={handleSpecialityChange}
                            disabled={!editMode}
                        />
                        <TextField
                            label="Location"
                            value={updatedUser?.therapist_location}
                            onChange={handleLocationChange}
                            disabled={!editMode}
                        />
                    </>
                )}
                {!editMode && (
                    <DefaultButton text="Edit" onClick={handleEditClick} />
                )}
                {editMode && (
                    <Stack horizontal tokens={{ childrenGap: 10 }}>
                        <DefaultButton text="Save" onClick={handleSaveClick} />
                        <DefaultButton text="Cancel" onClick={handleCancelClick} />
                    </Stack>
                )}
            </div>
            <div>
                <h2>Change password</h2>
                <TextField
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                />
                <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <DefaultButton text="Save" onClick={savePasswordChange} />
            </div>
        </div>
    );
};