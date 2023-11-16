import { StyledImage } from './Icon.styles';
import { logout } from '@utils/logout';

const LogoutIcon = () => {
  const handleLogoutClick = () => {
    logout();
  };
  return (
    <StyledImage
      src="/assets/icons/logout.svg"
      alt="Logout"
      width="14"
      height="14"
      onClick={handleLogoutClick}
    />
  );
};

export default LogoutIcon;
