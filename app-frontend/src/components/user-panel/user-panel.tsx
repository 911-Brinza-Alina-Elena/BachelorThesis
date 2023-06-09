import { DefaultButton, Stack } from "@fluentui/react";
import { logoutButtonClassName, userPanelClassName } from "./user-panel-style";

interface UserPanelProps {
    onLogout: () => void;
};

export const UserPanel = ({ onLogout }: UserPanelProps) => {
    return (
        <Stack tokens={{ childrenGap: 10 }} className={userPanelClassName}>
            <DefaultButton className={logoutButtonClassName} text="Logout" onClick={onLogout} />
        </Stack>
    )
};