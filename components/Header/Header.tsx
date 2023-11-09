import React, { useState } from 'react';
import {
  SearchIconWrapper,
  HeaderWrapper,
  LeftIcons,
  RightIcons,
} from './Header.styles';
import MyPageIcon from './icons/MyPageIcon';
import SearchIcon from './icons/SearchIcon';
import ChatIcon from './icons/ChatIcon';
import BgmIcon from './icons/BgmIcon';
import LogoutIcon from './icons/LogoutIcon';
import { MyPageToggle } from '../MyPageToggle';
import { FriendSearchToggle } from '../FriendSearchToggle';

const Header = () => {
  const [isMyPageVisible, setMyPageVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleMyPage = () => {
    setMyPageVisible(!isMyPageVisible);
    setSearchVisible(false);
  };

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
    setMyPageVisible(false);
  };

  return (
    <HeaderWrapper>
      <LeftIcons>
        <MyPageIcon onClick={toggleMyPage} isToggled={isMyPageVisible} />
        <SearchIconWrapper>
          <SearchIcon onClick={toggleSearch} isToggled={isSearchVisible} />
        </SearchIconWrapper>
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
      {isSearchVisible && (
        <FriendSearchToggle
          isVisible={isSearchVisible}
          onClose={() => setSearchVisible(false)}
        />
      )}
    </HeaderWrapper>
  );
};

export default Header;
