import { Icon, Persona } from "@fluentui/react";
import { menuIconClassName, personaClassName, userMenuClassName } from "./user-menu-style";

interface UserMenuProps {
    username: string;
    handleUsernameClick: () => void;
    setShowPanel: (showPanel: boolean) => void;
};

export const UserMenu = ({username, handleUsernameClick, setShowPanel}: UserMenuProps) => {
    return (
      <div className={userMenuClassName}>
        <Persona
          text={username}
          onClick={handleUsernameClick}
          className={personaClassName}
        />
        <Icon
          iconName="CollapseMenu"
          onClick={() => setShowPanel(true)}
          className={menuIconClassName}
        />
      </div>
    );
}