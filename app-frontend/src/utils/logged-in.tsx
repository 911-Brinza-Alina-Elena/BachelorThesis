import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "./helpers";

export const LoggedIn = (props: any) => {
    let navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated());
    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (!userToken || userToken === 'undefined') {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
            const userType = localStorage.getItem('userType');
            if (userType === 'patient') {
                navigate('/patient');
            } else if (userType === 'therapist') {
                navigate('/therapist');
            } else {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        checkUserToken();
    }, [isAuthenticated]);

    return (
        <React.Fragment>
            {!isAuthenticated? props.children : null}
        </React.Fragment>
    )
};