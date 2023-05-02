import { mergeStyles } from "@fluentui/react";
import { BACKGROUND_COLOR } from "../../constants";

export const logoStyle = mergeStyles({
    width: "15em",
    margin: "1.25em"
});

export const pageStyle = mergeStyles({
    backgroundColor: BACKGROUND_COLOR,
    height: "100vh",
    width: "100vw",
});

