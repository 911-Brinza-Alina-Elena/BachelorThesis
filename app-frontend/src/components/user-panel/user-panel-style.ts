import { mergeStyles } from "@fluentui/react";
import { BACKGROUND_COLOR, BLACK_COLOR, FONT_FAMILY, PEACH_COLOR, WHITE_COLOR } from "../../constants";

export const userPanelClassName = mergeStyles({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
    fontFamily: FONT_FAMILY,
    color: BLACK_COLOR,
});

export const logoutButtonClassName = mergeStyles({
    backgroundColor: PEACH_COLOR,
    color: WHITE_COLOR,
    border: "none",
    borderRadius: "15px",
    width: "10vw"
});