import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import * as styled from './Header.styles';
import MyPageIcon from './icons/MyPageIcon';
import SearchIcon from './icons/SearchIcon';
import ChatIcon from './icons/ChatIcon';
import BgmIcon from './icons/BgmIcon';
import LogoutIcon from './icons/LogoutIcon';
import { MyPageToggle } from '../MyPageToggle';
import { FriendSearchToggle } from '../FriendSearchToggle';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { audioState } from '@recoil/atom';
import DisBgmIcon from './icons/DisBgmIcon';
import { MyChatToggle } from '../MyChatToggle';

const Header = () => {
  const play = useRecoilState(audioState);
  const [isMyPageVisible, setMyPageVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isMyChatVisible, setMyChatVisible] = useState(false);
  // const [pageStates, setPageStates] = useState({
  //   isMainButtonVisible: false,
  // });

  // useEffect(() => {
  //   const currentPath = window.location.pathname;
  //   setPageStates((prevState) => ({
  //     ...prevState,
  //     isMainButtonVisible: currentPath !== '/selectDormitory',
  //   }));
  // }, [window.location.pathname]);

  const toggleMyPage = () => {
    setMyPageVisible(!isMyPageVisible);
    setSearchVisible(false);
    setMyChatVisible(false);
    // isMainButtonVisible(false);
    // isClubButtonVisible(false);
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
        <styled.ChatIconWrapper>
          <ChatIcon onClick={toggleMyChat} isToggled={isMyChatVisible} />
        </styled.ChatIconWrapper>
      </styled.LeftIcons>
      <styled.RightIcons>
        {/* {pageStates.isMainButtonVisible && (
          <Link href="/selectDormitory">
            <styled.MainButton>MAIN</styled.MainButton>
          </Link>
        )} */}
        <Link href="/selectDormitory">
          <styled.MainButton>MAIN</styled.MainButton>
        </Link>
        {play[0] === true ? <BgmIcon /> : <DisBgmIcon />}
        <Link href="/">
          <LogoutIcon />
        </Link>
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
