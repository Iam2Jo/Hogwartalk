// Header.tsx
import React, { useState } from 'react';
import { HeaderWrapper, LeftIcons, RightIcons } from './Header.styles';
import MyPageIcon from './icons/MyPageIcon';
import SearchIcon from './icons/SearchIcon';
import ChatIcon from './icons/ChatIcon';
import BgmIcon from './icons/BgmIcon';
import LogoutIcon from './icons/LogoutIcon';
import { MyPageToggle } from '../MyPageToggle';

const Header = () => {
  const [isMyPageVisible, setMyPageVisible] = useState(false);

  const toggleMyPage = () => {
    setMyPageVisible(!isMyPageVisible);
  };

  return (
    <HeaderWrapper>
      <LeftIcons>
        <MyPageIcon onClick={toggleMyPage} isToggled={isMyPageVisible} />
        <SearchIcon />
        <ChatIcon />
      </LeftIcons>
      <RightIcons>
        <BgmIcon />
        <LogoutIcon />
      </RightIcons>
      {isMyPageVisible && (
        <MyPageToggle
          isVisible={isMyPageVisible}
          onClose={() => setMyPageVisible(false)}
        />
      )}
    </HeaderWrapper>
  );
};

export default Header;
