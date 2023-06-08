import { DefaultButton, Stack } from "@fluentui/react";

interface UserPanelProps {
    userType: string;
    onLogout: () => void;
};

export const UserPanel = ({ userType, onLogout }: UserPanelProps) => {
    return (
        <Stack tokens={{ childrenGap: 10 }}>
            <DefaultButton text="Logout" onClick={onLogout} />
        </Stack>
    )
};