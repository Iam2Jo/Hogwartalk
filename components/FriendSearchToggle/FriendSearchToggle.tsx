import * as styled from './FriendSearchToggle.styles';

interface FriendSearchToggleProps {
  isVisible: boolean;
  onClose: () => void;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

const FriendSearchToggle: React.FC<FriendSearchToggleProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <styled.Sidebar isVisible={isVisible}>
      <styled.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </styled.CloseButton>
      <styled.TotalStudents>
        <styled.TotalStudentsLabel>전체 학생 수</styled.TotalStudentsLabel>
        <styled.TotalStudentsCount>30</styled.TotalStudentsCount>
      </styled.TotalStudents>

      <styled.UserList>
        <styled.UserItem>
          <styled.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <styled.UserInfo>
            <styled.Username>
              해리포터 <styled.Emoji>🟢</styled.Emoji>
            </styled.Username>
            <styled.UserDormitory>그리핀도르</styled.UserDormitory>
          </styled.UserInfo>
        </styled.UserItem>
        <styled.UserItem>
          <styled.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <styled.UserInfo>
            <styled.Username>
              해리포터 <styled.Emoji>🔴</styled.Emoji>
            </styled.Username>
            <styled.UserDormitory>그리핀도르</styled.UserDormitory>
          </styled.UserInfo>
        </styled.UserItem>
        <styled.UserItem>
          <styled.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <styled.UserInfo>
            <styled.Username>
              해리포터 <styled.Emoji>🔴</styled.Emoji>
            </styled.Username>
            <styled.UserDormitory>그리핀도르</styled.UserDormitory>
          </styled.UserInfo>
        </styled.UserItem>
        <styled.UserItem>
          <styled.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <styled.UserInfo>
            <styled.Username>
              해리포터 <styled.Emoji>🟢</styled.Emoji>
            </styled.Username>
            <styled.UserDormitory>그리핀도르</styled.UserDormitory>
          </styled.UserInfo>
        </styled.UserItem>
        <styled.UserItem>
          <styled.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <styled.UserInfo>
            <styled.Username>
              해리포터 <styled.Emoji>🟢</styled.Emoji>
            </styled.Username>
            <styled.UserDormitory>그리핀도르</styled.UserDormitory>
          </styled.UserInfo>
        </styled.UserItem>
        <styled.UserItem>
          <styled.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <styled.UserInfo>
            <styled.Username>
              해리포터 <styled.Emoji>🟢</styled.Emoji>
            </styled.Username>
            <styled.UserDormitory>그리핀도르</styled.UserDormitory>
          </styled.UserInfo>
        </styled.UserItem>
        <styled.UserItem>
          <styled.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <styled.UserInfo>
            <styled.Username>
              해리포터 <styled.Emoji>🔴</styled.Emoji>
            </styled.Username>
            <styled.UserDormitory>그리핀도르</styled.UserDormitory>
          </styled.UserInfo>
        </styled.UserItem>
        <styled.UserItem>
          <styled.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <styled.UserInfo>
            <styled.Username>
              해리포터 <styled.Emoji>🟢</styled.Emoji>
            </styled.Username>
            <styled.UserDormitory>그리핀도르</styled.UserDormitory>
          </styled.UserInfo>
        </styled.UserItem>
        <styled.UserItem>
          <styled.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <styled.UserInfo>
            <styled.Username>
              해리포터 <styled.Emoji>🟢</styled.Emoji>
            </styled.Username>
            <styled.UserDormitory>그리핀도르</styled.UserDormitory>
          </styled.UserInfo>
        </styled.UserItem>
      </styled.UserList>
    </styled.Sidebar>
  );
};

export default FriendSearchToggle;
