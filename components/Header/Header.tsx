import React, { useState } from 'react';
import * as styled from './Header.styles';
import MyPageIcon from './icons/MyPageIcon';
import SearchIcon from './icons/SearchIcon';
import ChatIcon from './icons/ChatIcon';
import BgmIcon from './icons/BgmIcon';
import LogoutIcon from './icons/LogoutIcon';
import { MyPageToggle } from '../MyPageToggle';
import { FriendSearchToggle } from '../FriendSearchToggle';
import { MyChatToggle } from '../MyChatToggle';

const Header = () => {
  const [isMyPageVisible, setMyPageVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isMyChatVisible, setMyChatVisible] = useState(false);

  const toggleMyPage = () => {
    setMyPageVisible(!isMyPageVisible);
    setSearchVisible(false);
    setMyChatVisible(false);
  };

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
    setMyPageVisible(false);
    setMyChatVisible(false);
  };

  const toggleMyChat = () => {
    setMyChatVisible(!isMyChatVisible);
    setMyPageVisible(false);
    setSearchVisible(false);
  };

  return (
    <styled.HeaderWrapper>
      <styled.LeftIcons>
        <MyPageIcon onClick={toggleMyPage} isToggled={isMyPageVisible} />
        <styled.SearchIconWrapper>
          <SearchIcon onClick={toggleSearch} isToggled={isSearchVisible} />
        </styled.SearchIconWrapper>
        <ChatIcon onClick={toggleMyChat} isToggled={isMyChatVisible} />
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
      {isMyChatVisible && (
        <MyChatToggle
          isVisible={isMyChatVisible}
          onClose={() => setMyChatVisible(false)}
        />
      )}
    </styled.HeaderWrapper>
  );
};

export default Header;
