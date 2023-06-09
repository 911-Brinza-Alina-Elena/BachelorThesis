import { LoginRegisterComponent } from "../../components/login-register/login-register";
import { pageStyle } from "./login-page-style";

export const LoginPage = () => {
  return (<div className={pageStyle}>
    <LoginRegisterComponent />
  </div>);
};

export default LoginPage;