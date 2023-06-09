import { mergeStyles } from "@fluentui/react";
import { FONT_FAMILY } from "../../constants";

export const userMenuClassName = mergeStyles({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    right: "0",
    top: "7px",
});

export const personaClassName = mergeStyles({
    cursor: "pointer",
    fontFamily: FONT_FAMILY
});

export const menuIconClassName = mergeStyles({
    cursor: "pointer",
    marginLeft: "10px",
    marginRight: "10px",
});