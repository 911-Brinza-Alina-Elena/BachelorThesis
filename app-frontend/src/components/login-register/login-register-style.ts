import { ILabelStyles, ITextFieldStyles, mergeStyles } from "@fluentui/react";
import { BUTTON_COLOR, FONT_FAMILY, LOGIN_REGISTER_COLOR, WHITE_COLOR } from "../../constants";

export const loginRegisterStyle = mergeStyles({
    backgroundColor: LOGIN_REGISTER_COLOR,
    width: "75%",
    height: "75%",
    margin: "auto",
    borderRadius: "25px",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "row",
    verticalAlign: "middle",
    alignItems: "center",
    minHeight: "500px",
});

export const registerContainerStyle = mergeStyles({
    backgroundColor: LOGIN_REGISTER_COLOR,
    width: "75%",
    height: "75%",
    margin: "auto",
    borderRadius: "25px",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    verticalAlign: "middle",
    alignItems: "center",
    minHeight: "500px",
});

export const loginIconStyle = mergeStyles({
    width: "50%"
});

export const registerIconStyle = mergeStyles({
    width: "40%"
});

export const loginFormStyle = mergeStyles({
    display: "flex",
    flexDirection: "column",
    width: "50%",
    alignItems: "center",
});

export const registerFormStyle = mergeStyles({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
});

export const loginRegisterFormTitleStyle = mergeStyles({
    fontSize: "1.3em",
});

export const LoginRegisterLabelStyle: Partial<ILabelStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
    },
};

export const LoginInputStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
        borderRadius: "25px",
        border: "none",
        boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
        width: "20vw",
        height: "5vh",
        minHeight:"30px",
        margin: "2vh 0 2vh 0",
        selectors: {
            ".ms-TextField-fieldGroup": {
                border: "none",
            }
        }
    }
};

export const RegisiterInputStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
        borderRadius: "25px",
        border: "none",
        boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
        width: "15vw",
        height: "4vh",
        minHeight:"25px",
        margin: "1vh 0 1vh 0",
        selectors: {
            ".ms-TextField-fieldGroup": {
                border: "none",
            }
        }
    }
};

export const LoginRegisterButtonStyle = mergeStyles({
    width: "7vw",
    height: "5vh",
    minHeight:"25px",
    margin: "1vh 0 1vh 0",
    borderRadius: "25px",
    border: "none",
    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
    backgroundColor: BUTTON_COLOR,
    color: WHITE_COLOR 
});

export const SignUpActionButtonStyle = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: "1em",
});

export const registerColumnStyle = mergeStyles({
    display: "flex",
    flexDirection: "column",
    marginRight: "2vw",
});

export const choiceGroupStyle = mergeStyles({
    fontFamily: FONT_FAMILY,
});

export const optionContainerStyles = mergeStyles({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    fontFamily: FONT_FAMILY,
  });
