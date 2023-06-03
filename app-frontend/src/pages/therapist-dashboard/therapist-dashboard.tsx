import { DefaultButton } from "@fluentui/react";
import { LoginRegisterButtonStyle } from "../../components/login-register/login-register-style";
import { logoutUser } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

// page for when the therapist logs in
export const TherapistDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser().then((response) => {
            if (response) {
                navigate('/login');
            }
        }).catch((error) => {
            console.log(error);
            alert('There was an error logging out.');
        });
    };

    if (localStorage.getItem('userType') !== 'therapist') {
        if (localStorage.getItem('userType') === 'patient') {
            navigate('/patient');
        } else {
            navigate('/login');
        }
    }

    return (
        <div>
            <h1>Therapist Dashboard</h1>
            <DefaultButton
            text="Logout"
            className={LoginRegisterButtonStyle}
            onClick={handleLogout}
            />
        </div>
    );
};