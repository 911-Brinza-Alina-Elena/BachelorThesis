import { ITextFieldStyles, mergeStyles } from "@fluentui/react";
import { BUTTON_COLOR, FONT_FAMILY, LOGIN_REGISTER_COLOR, WHITE_COLOR } from "../../constants";

export {};

export const addJournalClassName = mergeStyles({
    backgroundColor: LOGIN_REGISTER_COLOR,
    width: "85%",
    height: "85%",
    margin: "auto",
    borderRadius: "25px",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    minHeight: "500px",
    justifyContent: "space-evenly",
});

export const addJournalTitleClassName = mergeStyles({
    alignSelf: "center",
});

export const buttonsClassName = mergeStyles({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "75%",
    alignSelf: "center"
});

export const addTitleInputStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
        borderRadius: "25px",
        border: "none",
        boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
        minHeight:"25px",
        margin: "1vh 0 1vh 0",
        selectors: {
            ".ms-TextField-fieldGroup": {
                border: "none",
            }
        }
    },
    root: {
        width: "100%",
        selectors: {
            ".ms-Label": {
                fontFamily: FONT_FAMILY,
            },
            ".ms-TextField-field": {
                fontFamily: FONT_FAMILY,
            }
        }
    },
    wrapper: {
        width:"50%"
    }
};

export const addContentInputStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
        borderRadius: "25px",
        border: "none",
        boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)",
        margin: "1vh 0 1vh 0",
        selectors: {
            ".ms-TextField-fieldGroup": {
                border: "none",
            }
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
            }
        }
    },
    wrapper: {
        width:"75%",
    }
};

export const addInputClassName = mergeStyles({
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontFamily: FONT_FAMILY
});

export const saveButtonClassName = mergeStyles({
    width: "200px",
    height: "50px",
    backgroundColor: BUTTON_COLOR,
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
    border: "none",
    fontFamily: FONT_FAMILY
});