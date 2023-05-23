import React from "react";
import {
    LoginRegisterButtonStyle,
  LoginInputStyle,
  LoginRegisterLabelStyle,
  SignUpActionButtonStyle,
  loginFormStyle,
  loginRegisterFormTitleStyle,
  loginIconStyle,
  loginRegisterStyle,
  registerContainerStyle,
  registerIconStyle,
  RegisiterInputStyle,
  registerColumnStyle,
  registerFormStyle,
  optionContainerStyles,
  choiceGroupStyle,
} from "./login-register-style";
import { ActionButton, ChoiceGroup, DatePicker, DefaultButton, IChoiceGroupOption, Label, TextField } from "@fluentui/react";
import { loginUser, registerUser } from "../../services/auth-service";
import { FONT_FAMILY } from "../../constants";
import User from "../../models/user";


export const LoginRegisterComponent = () => {
  const [isRegister, setIsRegister] = React.useState<boolean>(false); 
  const [username, setUsername] = React.useState<string>(""); 
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [typeOfUser, setTypeOfUser] = React.useState<string>("pacient");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [dateOfBirth, setDateOfBirth] = React.useState<Date>(new Date());
  const [gender, setGender] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [therapistSpecialty, setTherapistSpecialty] = React.useState<string>("");
  const [therapistLocation, setTherapistLocation] = React.useState<string>("");

  const resetStates = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTypeOfUser("");
    setFirstName("");
    setLastName("");
    setDateOfBirth(new Date());
    setGender("");
    setCountry("");
    setCity("");
    setTherapistSpecialty("");
    setTherapistLocation("");
  };

  const accountTypeOptions: IChoiceGroupOption[] = [
    { key: 'patient', text: 'Patient' },
    { key: 'therapist', text: 'Therapist' },
  ];

  const onFormatDate = (date?: Date): string => {
    return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
  };

  const onChangeUsername = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setUsername(newValue || '');
    },
    [],
  );

  const onChangeEmail = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setEmail(newValue || '');
    },
    [],
  );

  const onChangePassword = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setPassword(newValue || '');
    },
    [],
  );

  const onChangeConfirmPassword = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setConfirmPassword(newValue || '');
    },
    [],
  );

  const onChangeAccountType = React.useCallback((ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption) => {
    setTypeOfUser(option!.key);
  }, []);

  const onChangeFirstName = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setFirstName(newValue || '');
    },
    [],
  );

  const onChangeLastName = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setLastName(newValue || '');
    },
    [],
  );

  const onChangeDateOfBirth = React.useCallback(
    (date: Date | null | undefined) => {
      setDateOfBirth(date || new Date());
    },
    [],
  );

  const onChangeGender = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setGender(newValue || "");
    },
    []
  );

  const onChangeCountry = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setCountry(newValue || "");
    },
    []
  );

  const onChangeCity = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setCity(newValue || "");
    },
    []
  );

  const onChangeTherapistSpecialty = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setTherapistSpecialty(newValue || "");
    },
    []
  );

  const onChangeTherapistLocation = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      setTherapistLocation(newValue || "");
    },
    []
  );

  const sendToRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    } 
    if (typeOfUser === "patient") {
      let user: User = {
        username: username,
        email: email,
        password: password,
        type_of_account: typeOfUser,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        gender: gender,
        country: country,
        city: city
      };
      registerUser(user);
    } 
    else if (typeOfUser === "therapist") {
      let user: User = {
        username: username,
        email: email,
        password: password,
        type_of_account: typeOfUser,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        gender: gender,
        country: country,
        city: city,
        therapist_speciality: therapistSpecialty,
        therapist_location: therapistLocation
      };
      registerUser(user);
    }
    else {
      alert("Please select a valid account type!");
      return;
    }
  };

  return (
    <>
      {!isRegister ? (
        <div className={loginRegisterStyle}>
          <img
            src="/—Pngtree—mental health problems flat illustration_6855451.png"
            alt="Therapy session illustration"
            className={loginIconStyle}
          />
          <div className={loginFormStyle}>
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
                styles={LoginInputStyle}
                value={email}
                onChange={onChangeEmail}
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
                styles={LoginInputStyle}
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <DefaultButton
              text="Sign In"
              className={LoginRegisterButtonStyle}
              onClick={() => loginUser(email, password)}
            />
            <p>
              Don't have an account?{" "}
              <ActionButton
                className={SignUpActionButtonStyle}
                onClick={() => {
                  setIsRegister(true);
                  resetStates();
                }}
              >
                Sign up
              </ActionButton>
            </p>
          </div>
        </div>
      ) : (
        <div className={registerContainerStyle}>
          <p className={loginRegisterFormTitleStyle}>Join our community</p>
          <div className={registerFormStyle}>
            <div className={registerColumnStyle}>
              <div>
                <Label htmlFor="usernameField" styles={LoginRegisterLabelStyle}>
                  Username
                </Label>
                <TextField
                  id="usernameField"
                  name="username"
                  styles={RegisiterInputStyle}
                  value={username}
                  onChange={onChangeUsername}
                />
              </div>
              <div>
                <Label htmlFor="emailField" styles={LoginRegisterLabelStyle}>
                  Email
                </Label>
                <TextField
                  id="emailField"
                  name="email"
                  styles={RegisiterInputStyle}
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>
              <div>
                <Label htmlFor="passwordField" styles={LoginRegisterLabelStyle}>
                  Password
                </Label>
                <TextField
                  id="passwordField"
                  type="password"
                  canRevealPassword
                  revealPasswordAriaLabel="Show password"
                  styles={RegisiterInputStyle}
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
              <div>
                <Label
                  htmlFor="confirmPasswordField"
                  styles={LoginRegisterLabelStyle}
                >
                  Confirm Password
                </Label>
                <TextField
                  id="confirmPasswordField"
                  type="password"
                  canRevealPassword
                  revealPasswordAriaLabel="Show password"
                  styles={RegisiterInputStyle}
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                />
              </div>
            </div>
            <div className={registerColumnStyle}>
              <div>
                <Label
                  htmlFor="accountTypeField"
                  styles={LoginRegisterLabelStyle}
                >
                  Pick one
                </Label>
                <ChoiceGroup
                  className={choiceGroupStyle}
                  selectedKey={typeOfUser}
                  options={accountTypeOptions}
                  onChange={onChangeAccountType}
                  styles={{ flexContainer: optionContainerStyles,
                  root: {selectors: {
                    '.ms-ChoiceField': {
                      fontFamily: FONT_FAMILY
                    }
                  }} }}
                />
              </div>
              <div>
                <Label
                  htmlFor="firstNameField"
                  styles={LoginRegisterLabelStyle}
                >
                  First Name
                </Label>
                <TextField
                  id="firstNameField"
                  name="firstName"
                  styles={RegisiterInputStyle}
                  value={firstName}
                  onChange={onChangeFirstName}
                />
              </div>
              <div>
                <Label htmlFor="lastNameField" styles={LoginRegisterLabelStyle}>
                  Last Name
                </Label>
                <TextField
                  id="lastNameField"
                  name="lastName"
                  styles={RegisiterInputStyle}
                  value={lastName}
                  onChange={onChangeLastName}
                />
              </div>
              <div>
                <Label htmlFor="dobField" styles={LoginRegisterLabelStyle}>
                  Date of Birth
                </Label>
                <DatePicker
                  id="dobField"
                  styles={RegisiterInputStyle}
                  value={dateOfBirth}
                  onSelectDate={onChangeDateOfBirth}
                />

              </div>
            </div>
            <div className={registerColumnStyle}>
              <div>
                <Label
                  htmlFor="genderField"
                  styles={LoginRegisterLabelStyle}
                >
                  Gender
                </Label>
                <TextField
                  id="genderField"
                  name="gender"
                  styles={RegisiterInputStyle}
                  value={gender}
                  onChange={onChangeGender}
                />
              </div>
              <div>
                <Label
                  htmlFor="countryField"
                  styles={LoginRegisterLabelStyle}
                >
                  Country
                </Label>
                <TextField
                  id="countryField"
                  name="country"
                  styles={RegisiterInputStyle}
                  value={country}
                  onChange={onChangeCountry}
                />
              </div>
              <div>
                <Label
                  htmlFor="cityField"
                  styles={LoginRegisterLabelStyle}
                >
                  Country
                </Label>
                <TextField
                  id="cityField"
                  name="city"
                  styles={RegisiterInputStyle}
                  value={city}
                  onChange={onChangeCity}
                />
              </div>
            </div>
            {typeOfUser === "therapist" && (
              <div className={registerColumnStyle}>
                <div>
                  <Label htmlFor="specialityField" styles={LoginRegisterLabelStyle}>
                    Speciality
                  </Label>
                  <TextField
                    id="specialityField"
                    name="speciality"
                    styles={RegisiterInputStyle}
                    value={therapistSpecialty}
                    onChange={onChangeTherapistSpecialty}
                  />
                </div>
                <div>
                  <Label htmlFor="locationField" styles={LoginRegisterLabelStyle}>
                    Location
                  </Label>
                  <TextField
                    id="locationField"
                    name="location"
                    styles={RegisiterInputStyle}
                    value={therapistLocation}
                    onChange={onChangeTherapistLocation}
                  />
                </div>
              </div>
            )}
          </div>
          <DefaultButton
            text="Sign Up"
            className={LoginRegisterButtonStyle}
            onClick={sendToRegister}
          />
          <p>
            Already have an account?{" "}
            <ActionButton
              className={SignUpActionButtonStyle}
              onClick={() => {
                setIsRegister(false);
                resetStates();
              }}
            >
              Login
            </ActionButton>
          </p>
          <img
            src="/33891894_2210_w048_n005_383b_p1_383-removebg-preview.png"
            alt="Welcome to Therapease"
            className={registerIconStyle}
          />
        </div>
      )}
    </>
  );
};
