import { Icon, Persona } from "@fluentui/react";
import { useEffect } from "react";

interface UserMenuProps {
    username: string;
    handleUsernameClick: () => void;
    setShowPanel: (showPanel: boolean) => void;
};

export const UserMenu = ({username, handleUsernameClick, setShowPanel}: UserMenuProps) => {
    return (
        <div style={{position: 'absolute', top: 0, right: 0, display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                    <Persona
                    text={username}
                    onClick={handleUsernameClick}
                    style={{cursor: 'pointer'}}
                    />
                    <Icon
                        iconName="CollapseMenu"
                        onClick={() => setShowPanel(true)}
                        style={{cursor: 'pointer', marginLeft: '10px'}}
                    />
                </div>
    );
}