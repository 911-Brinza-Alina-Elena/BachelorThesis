import jwtDecode from "jwt-decode";

export const getUserType = () => {
    const userType = localStorage.getItem("userType");
    return userType;
};

export const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

const isTokenExpired = (token: string) => {
    if (token) {
        try {
            const decodedToken = jwtDecode(token) as { exp: number };
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return true;
        }
    } else {
        return true;
    }
};

export const isUserAuthenticated = () => {
    const userType = localStorage.getItem("userType");
    const token = localStorage.getItem("token");
    if (userType && token) {
        if (isTokenExpired(token)) {
            return false;
        } else {
            return true;
        }
    }
};

export const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
};