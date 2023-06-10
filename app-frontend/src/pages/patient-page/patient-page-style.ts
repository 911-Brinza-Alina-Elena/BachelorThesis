import { IDropdownStyles, mergeStyles } from "@fluentui/react";
import { FONT_FAMILY, LOGIN_REGISTER_COLOR } from "../../constants";

export const dashboardClassName = mergeStyles({
    display: 'flex',
    flexDirection: 'column',
});

export const statisticsDivClassName = mergeStyles({
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent:'space-around'
});

export const titleClassName = mergeStyles({
    alignSelf: 'center',
    marginTop: "5px"
});

export const personalDetailsDivClassName = mergeStyles({
    alignSelf: 'center',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: LOGIN_REGISTER_COLOR,
    borderRadius: '25px',
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.25)',
});

export const dateEmotionDivClassName = mergeStyles({
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: LOGIN_REGISTER_COLOR,
    borderRadius: '25px',
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.25)',
    marginTop: '20px',
    marginBottom: '20px',
});

export const frequencyDivClassName = mergeStyles({
    alignSelf: 'center',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: LOGIN_REGISTER_COLOR,
    borderRadius: '25px',
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.25)',
    marginTop: '20px',
    marginBottom: '20px',
});

export const dropdownStyle: Partial<IDropdownStyles> = {
    dropdown: { 
        fontFamily: FONT_FAMILY,
    },
    title: {
        borderRadius: '25px',
        border: 'none',
    },
    dropdownOptionText: {
        fontFamily: FONT_FAMILY,
    },
};

export const dropdownDivClassName = mergeStyles({
    fontFamily: FONT_FAMILY,
});