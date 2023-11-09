import * as Styles from './FriendSearchToggle.styles';

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
    <Styles.Sidebar isVisible={isVisible}>
      <Styles.CloseButton onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="Close" />
      </Styles.CloseButton>
      <Styles.TotalStudents>
        <Styles.TotalStudentsLabel>전체 학생 수</Styles.TotalStudentsLabel>
        <Styles.TotalStudentsCount>30</Styles.TotalStudentsCount>
      </Styles.TotalStudents>

      <Styles.UserList>
        <Styles.UserItem>
          <Styles.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <Styles.UserInfo>
            <Styles.Username>
              해리포터 <Styles.Emoji>🟢</Styles.Emoji>
            </Styles.Username>
            <Styles.UserDormitory>그리핀도르</Styles.UserDormitory>
          </Styles.UserInfo>
        </Styles.UserItem>
        <Styles.UserItem>
          <Styles.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <Styles.UserInfo>
            <Styles.Username>
              해리포터 <Styles.Emoji>🔴</Styles.Emoji>
            </Styles.Username>
            <Styles.UserDormitory>그리핀도르</Styles.UserDormitory>
          </Styles.UserInfo>
        </Styles.UserItem>
        <Styles.UserItem>
          <Styles.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <Styles.UserInfo>
            <Styles.Username>
              해리포터 <Styles.Emoji>🔴</Styles.Emoji>
            </Styles.Username>
            <Styles.UserDormitory>그리핀도르</Styles.UserDormitory>
          </Styles.UserInfo>
        </Styles.UserItem>
        <Styles.UserItem>
          <Styles.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <Styles.UserInfo>
            <Styles.Username>
              해리포터 <Styles.Emoji>🟢</Styles.Emoji>
            </Styles.Username>
            <Styles.UserDormitory>그리핀도르</Styles.UserDormitory>
          </Styles.UserInfo>
        </Styles.UserItem>
        <Styles.UserItem>
          <Styles.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <Styles.UserInfo>
            <Styles.Username>
              해리포터 <Styles.Emoji>🟢</Styles.Emoji>
            </Styles.Username>
            <Styles.UserDormitory>그리핀도르</Styles.UserDormitory>
          </Styles.UserInfo>
        </Styles.UserItem>
        <Styles.UserItem>
          <Styles.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <Styles.UserInfo>
            <Styles.Username>
              해리포터 <Styles.Emoji>🟢</Styles.Emoji>
            </Styles.Username>
            <Styles.UserDormitory>그리핀도르</Styles.UserDormitory>
          </Styles.UserInfo>
        </Styles.UserItem>
        <Styles.UserItem>
          <Styles.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <Styles.UserInfo>
            <Styles.Username>
              해리포터 <Styles.Emoji>🔴</Styles.Emoji>
            </Styles.Username>
            <Styles.UserDormitory>그리핀도르</Styles.UserDormitory>
          </Styles.UserInfo>
        </Styles.UserItem>
        <Styles.UserItem>
          <Styles.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <Styles.UserInfo>
            <Styles.Username>
              해리포터 <Styles.Emoji>🟢</Styles.Emoji>
            </Styles.Username>
            <Styles.UserDormitory>그리핀도르</Styles.UserDormitory>
          </Styles.UserInfo>
        </Styles.UserItem>
        <Styles.UserItem>
          <Styles.ProfileImage
            src="/assets/img/HarryPotter.png"
            alt="Profile"
          />
          <Styles.UserInfo>
            <Styles.Username>
              해리포터 <Styles.Emoji>🟢</Styles.Emoji>
            </Styles.Username>
            <Styles.UserDormitory>그리핀도르</Styles.UserDormitory>
          </Styles.UserInfo>
        </Styles.UserItem>
      </Styles.UserList>
    </Styles.Sidebar>
  );
};

export default FriendSearchToggle;
