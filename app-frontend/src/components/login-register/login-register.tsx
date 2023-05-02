import React from "react";
import {
    LoginRegisterButtonStyle,
  LoginRegisterInputStyle,
  LoginRegisterLabelStyle,
  loginRegisterFormStyle,
  loginRegisterFormTitleStyle,
  loginRegisterIconStyle,
  loginRegisterStyle,
} from "./login-register-style";
import { DefaultButton, Label, TextField } from "@fluentui/react";

export const LoginRegisterComponent = () => {
  return (
    <div className={loginRegisterStyle}>
      <img
        src="/—Pngtree—mental health problems flat illustration_6855451.png"
        alt="Therapy session illustration"
        className={loginRegisterIconStyle}
      />
      <div className={loginRegisterFormStyle}>
        <p className={loginRegisterFormTitleStyle}>
          Welcome! Are you ready to feel better?
        </p>
        <div>
          <Label htmlFor="emailField" styles={LoginRegisterLabelStyle}>
            Email
          </Label>
          <TextField
            id="emailField"
            name="email"
            styles={LoginRegisterInputStyle}
          />
        </div>
        <div>
          <Label htmlFor="paswordField" styles={LoginRegisterLabelStyle}>
            Password
          </Label>
          <TextField
            id="paswordField"
            type="password"
            canRevealPassword
            revealPasswordAriaLabel="Show password"
            styles={LoginRegisterInputStyle}
          />
        </div>
        <DefaultButton text="Sign In" className={LoginRegisterButtonStyle}/>
      </div>
    </div>
  );
};
