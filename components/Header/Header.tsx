import React, { useState } from 'react';
import * as styled from './Header.styles';
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
    <styled.HeaderWrapper>
      <styled.LeftIcons>
        <MyPageIcon onClick={toggleMyPage} isToggled={isMyPageVisible} />
        <styled.SearchIconWrapper>
          <SearchIcon onClick={toggleSearch} isToggled={isSearchVisible} />
        </styled.SearchIconWrapper>
        <ChatIcon />
      </styled.LeftIcons>
      <styled.RightIcons>
        <BgmIcon />
        <LogoutIcon />
      </styled.RightIcons>
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
    </styled.HeaderWrapper>
  );
};

export default Header;
