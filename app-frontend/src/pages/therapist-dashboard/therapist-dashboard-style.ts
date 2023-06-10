import { mergeStyles } from "@fluentui/react";
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
    cursor: "pointer",
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
});

export const patientPersonaClassName = mergeStyles({
    margin: "10px",
    fontFamily: FONT_FAMILY
});

export const deleteIconClassName = mergeStyles({
    color: ANGER_COLOR
});