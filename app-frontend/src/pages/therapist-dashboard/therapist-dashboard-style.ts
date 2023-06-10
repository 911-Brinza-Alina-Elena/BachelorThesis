import { IDialogStyles, ITextFieldStyles, mergeStyles } from "@fluentui/react";
import { ANGER_COLOR, FONT_FAMILY, LOGIN_REGISTER_COLOR, PEACH_COLOR, WHITE_COLOR } from "../../constants";

export const therapistDashboardMainDivClassName = mergeStyles({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: WHITE_COLOR,
});

export const patientsDivClassName = mergeStyles({
    width: "50%",
    display: "flex",
    backgroundColor: LOGIN_REGISTER_COLOR,
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.25)",
    alignItems: "center",
    overflowY: "auto",
});

export const addButtonClassName = mergeStyles({
    backgroundColor: PEACH_COLOR,
    color: WHITE_COLOR,
    border: "none",
    borderRadius: "15px",
    width: "10vw",
    height: "5vh",
    marginTop: "5vh",
});

export const patientDivClassName = mergeStyles({
    display: "flex",
    flexDirection: "row",
    margin: "20px",
    alignItems: "center",
    borderRadius: "10px",
    backgroundColor: WHITE_COLOR,
    justifyContent: "space-between",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.15)",
    cursor: "pointer",
});

export const patientPersonaClassName = mergeStyles({
    margin: "10px",
    fontFamily: FONT_FAMILY
});

export const deleteIconClassName = mergeStyles({
    color: ANGER_COLOR
});

export const addDialogStyle: Partial<IDialogStyles> = {
    root: {
        selectors: {
            ".ms-Dialog-title": {
                fontFamily: FONT_FAMILY,
            },
            ".ms-Dialog-subText": {
                fontFamily: FONT_FAMILY,
            },

        }
    },
    main: {
        borderRadius: "10px",
    }
};

export const addDialogButtonClassName = mergeStyles({
    backgroundColor: PEACH_COLOR,
    borderRadius: "25px",
    border: "none",
    fontFamily: FONT_FAMILY,
    color: WHITE_COLOR
});

export const cancelDialogButtonClassName = mergeStyles({
    backgroundColor: WHITE_COLOR,
    borderRadius: "25px",
    border: "1px solid " + PEACH_COLOR,
    fontFamily: FONT_FAMILY,
    color: PEACH_COLOR
});

export const editEmailInputStyle: Partial<ITextFieldStyles> = {
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
    }
};

export const cofirmationStyle: Partial<IDialogStyles> = {
    root: {
        selectors: {
            ".ms-Dialog-title": {
                fontFamily: FONT_FAMILY,
                marginTop: "10px",
            },
            ".ms-Dialog-subText": {
                fontFamily: FONT_FAMILY,
            }
        }
    },
    main: {
        borderRadius: "10px",
    }
};

export const confirmationDeleteButtonClassName = mergeStyles({
    backgroundColor: PEACH_COLOR,
    borderRadius: "25px",
    border: "none",
    fontFamily: FONT_FAMILY,
    color: WHITE_COLOR,
    marginTop: "10px",
});

export const confirmationCancelButtonClassName = mergeStyles({
    backgroundColor: WHITE_COLOR,
    borderRadius: "25px",
    border: "1px solid " + PEACH_COLOR,
    fontFamily: FONT_FAMILY,
    color: PEACH_COLOR,
    marginTop: "10px",
});