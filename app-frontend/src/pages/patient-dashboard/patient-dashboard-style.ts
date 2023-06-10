import { mergeStyles } from "@fluentui/react";
import { FONT_FAMILY, LOGIN_REGISTER_COLOR, PEACH_COLOR, WHITE_COLOR } from "../../constants";

export {};

export const patientDashboardMainDivClassName = mergeStyles({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: WHITE_COLOR,
});

export const journalDivClassName = mergeStyles({
    width: "80%",
    display: "flex",
    backgroundColor: LOGIN_REGISTER_COLOR,
    flexWrap: "wrap",
    justifyContent: "space-around",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.25)",
});

export const journalCardClassName = mergeStyles({
    flexBasis: "33.33%",
    marginTop: "10px",
    marginBottom: "10px",
    height:"18vh",
    minHeight:"120px",
    borderRadius: "10px",
    display:"flex",
    flexDirection:"column",
});

export const journalCardTitleClassName = mergeStyles({
    fontFamily: FONT_FAMILY,
    marginLeft: "5px",
    marginTop: "10px",
});

export const journalCardDetailsClassName = mergeStyles({
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    marginTop: "2vh"
});

export const journalCardDetailsTextClassName = mergeStyles({
    display:"flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
});

export const addJournalButtonClassName = mergeStyles({
    backgroundColor: PEACH_COLOR,
    color: WHITE_COLOR,
    border: "none",
    borderRadius: "15px",
    width: "10vw",
    height: "5vh",
    marginTop: "5vh",
});