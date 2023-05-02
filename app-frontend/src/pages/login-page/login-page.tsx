import React from "react";
import { logoStyle, pageStyle } from "./login-page-style";
import { LoginRegisterComponent } from "../../components/login-register/login-register";

export const LoginPage = () => {
  return (<div className={pageStyle}>
    <img src="/therapease-low-resolution-logo-color-on-transparent-background.png" alt="Therapease Logo" className={logoStyle}/>
    <LoginRegisterComponent />
  </div>);
};

export default LoginPage;