import React from "react";
import { logoStyle, pageStyle } from "./login-page-style";
import { LoginRegisterComponent } from "../../components/login-register/login-register";

export const LoginPage = () => {
  return (<div className={pageStyle}>
    <LoginRegisterComponent />
  </div>);
};

export default LoginPage;