import React from 'react';
import { HeaderWrapper, LeftIcons, RightIcons } from './Header.styles';
import MyPageIcon from './icons/MyPageIcon';
import SearchIcon from './icons/SearchIcon';
import ChatIcon from './icons/ChatIcon';
import BgmIcon from './icons/BgmIcon';
import LogoutIcon from './icons/LogoutIcon';

const Header = () => {
  return (
    <HeaderWrapper>
      <LeftIcons>
        <MyPageIcon />
        <SearchIcon />
        <ChatIcon />
      </LeftIcons>
      <RightIcons>
        <BgmIcon />
        <LogoutIcon />
      </RightIcons>
    </HeaderWrapper>
  );
};

export default Header;
