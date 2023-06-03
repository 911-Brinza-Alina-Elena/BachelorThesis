// page for when a patient logs in

import { DefaultButton } from "@fluentui/react";
import { LoginRegisterButtonStyle } from "../../components/login-register/login-register-style";
import { logoutUser } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

export const PatientDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser().then((response) => {
            if (response) {
                navigate('/login');
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    if (localStorage.getItem('userType') !== 'patient') {
        if (localStorage.getItem('userType') === 'therapist') {
            navigate('/therapist');
        } else {
            navigate('/login');
        }
    }
    return (
        <div>
            <h1>Patient Dashboard</h1>
            <DefaultButton
            text="Logout"
            className={LoginRegisterButtonStyle}
            onClick={handleLogout}
            />
        </div>
    );
};