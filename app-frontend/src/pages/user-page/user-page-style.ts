import { ITextFieldStyles, mergeStyles } from "@fluentui/react";
import { FONT_FAMILY, LOGIN_REGISTER_COLOR, PEACH_COLOR, WHITE_COLOR } from "../../constants";

export const mainDivClassName = mergeStyles({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: WHITE_COLOR,
});

export const detailsAndPasswordDivClassName = mergeStyles({
    width: "95%",
    display: "flex",
    backgroundColor: LOGIN_REGISTER_COLOR,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.25)",
    overflowY: "auto",
    marginBottom: "5vh"
});

export const headerClassName = mergeStyles({
    margin: "5px"
});

export const profileInputStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
        borderRadius: "25px",
        border: "none",
        boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
        margin: "1vh 0 1vh 0",
        selectors: {
            ".ms-TextField-fieldGroup": {
                border: "none",
            },
        },
    },
    root: {
        width: "100%",
        selectors: {
            ".ms-Label": {
                fontFamily: FONT_FAMILY,
            },
            ".ms-TextField-field": {
                fontFamily: FONT_FAMILY,
            },
            "input:disabled": {
                borderRadius: "25px",
            },
            ".ms-TextField-fieldGroup": {
                borderRadius: "25px",
                border: "none",
                boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
            }
        }
    }
};

export const detailsDivClassName = mergeStyles({
    width: "45%",
    display: "flex",
    flexDirection: "column",
});

export const passwordDivClassName = mergeStyles({
    width: "35%",
    display: "flex",
    flexDirection: "column",    
});

export const saveButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: PEACH_COLOR,
    borderRadius: "25px",
    border: "none",
    fontFamily: FONT_FAMILY,
    color: WHITE_COLOR
});

export const cancelButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: WHITE_COLOR,
    borderRadius: "25px",
    border: "1px solid " + PEACH_COLOR,
    fontFamily: FONT_FAMILY,
    color: PEACH_COLOR
});

export const buttonsClassName = mergeStyles({
    alignSelf: "center",
    margin: "10px",
});

export const editButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: PEACH_COLOR,
    borderRadius: "25px",
    border: "none",
    fontFamily: FONT_FAMILY,
    color: WHITE_COLOR,
    alignSelf: "center",
    margin: "10px",
});

export const savePasswordButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: PEACH_COLOR,
    borderRadius: "25px",
    border: "none",
    fontFamily: FONT_FAMILY,
    color: WHITE_COLOR,
    alignSelf: "center",
    margin: "10px",
});