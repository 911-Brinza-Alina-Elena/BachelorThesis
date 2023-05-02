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

export const loginRegisterIconStyle = mergeStyles({
    width: "50%"
});

export const loginRegisterFormStyle = mergeStyles({
    display: "flex",
    flexDirection: "column",
    width: "50%",
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

export const LoginRegisterInputStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
        borderRadius: "25px",
        border: "none",
        boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
        width: "20vw",
        height: "5vh",
        margin: "2vh 0 2vh 0",
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
    margin: "2vh 0 2vh 0",
    borderRadius: "25px",
    border: "none",
    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
    backgroundColor: BUTTON_COLOR,
    color: WHITE_COLOR 
});