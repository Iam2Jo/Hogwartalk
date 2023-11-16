# 호그와톡

## 💁 프로젝트 정보

> 주어진 API와 소켓을 활용한 채팅앱 제작 프로젝트입니다. <br>
> 호그와트 학생 체험을 할 수 있도록 구성하였습니다. <br>
> 개발기간: 2023.11.06 ~ 2023.11.16
> <br>

<br>

## 🌐 배포 주소

> 배포 주소:
> <br>

<br>

## 🚖 개발 팀 소개

|                          어승준                           |                           이승연                           |                          이승현                           |                           배경규                           |                          장문용                           |
| :-------------------------------------------------------: | :--------------------------------------------------------: | :-------------------------------------------------------: | :--------------------------------------------------------: | :-------------------------------------------------------: |
|      [@seungjun222](https://github.com/seungjun222)       |          [@ewinkite](https://github.com/ewinkite)          |     [@seungsimdang](https://github.com/seungsimdang)      |       [@kyungkyuBae](https://github.com/kyungkyuBae)       |          [@moonyah](https://github.com/moonyah)           |
| ![](https://avatars.githubusercontent.com/u/39702832?v=4) | ![](https://avatars.githubusercontent.com/u/139189610?v=4) | ![](https://avatars.githubusercontent.com/u/93538221?v=4) | ![](https://avatars.githubusercontent.com/u/131759810?v=4) | ![](https://avatars.githubusercontent.com/u/51106050?v=4) |
|                         채팅 기능                         |                퀴즈, 클럽 페이지 관련 기능                 |                         채팅 기능                         |                   로그인/ 회원가입 기능                    |        공통 컴포넌트(헤더 - 마이페이지, 친구 목록)        |

<br>

## 💻 개발 스택

### 환경

`VSC` `GIT` `GITHUB`

### 개발

`Next.js` `REACT` `FIREBASE` `TYPESCRIPT` `Recoil`

### 🌙 이슈 관리 및 소통

`JIRA` `SLACK` `NOTION`

<br/>

## 🤝 협업 방식

커밋 컨벤션, 코딩 컨벤션, 깃허브 규칙 등의 내용은 아래의 노션 페이지를 참고해주세요! </br>

### [🔗 노션 페이지](https://www.notion.so/I-am-2-bb6a5448abf64a9bb941c8e98bef31f2?pvs=4) </br>

<br/>
<br/>

## 🤝 요구사항 반영 여부

### 필수 구현 사항

✅ `useState`, `useReducer`를 활용한 상태 관리 구현 <br/>
✅ `Sass` 또는 `styled-component`를 활용한 스타일 구현 <br/>
✅ `react` 상태를 통한 CRUD 구현 <br/>
✅ 상태에 따라 달라지는 스타일 구현 <br/>
✅ `custom hook`을 통한 비동기 처리 구현 <br/>
✅ 유저인증 시스템(로그인, 회원가입) 구현 <br/>
✅ `jwt`등의 유저 인증 시스템 (로그인, 회원가입 기능) <br/>
✅ 소켓을 이용한 채팅 구현 <br/>

### 선택 구현 사항

✅ `Next.js`를 활용한 서버 사이드 렌더링 구현 <br/>
✅ `typescript`를 활용한 앱 구현

<br/>
<br/>

## 🔍 팀원별 세부 구현 사항

<details>
<summary style="font-size: 18px">어승준: 💬 채팅</summary>
<div markdown="1">

내용 써주세요

</div>
</details>

<br>

<details>
<summary style="font-size: 18px"> 이승연: 🌐 퀴즈, 클럽, 공통</summary>
<div markdown="1">

### 1. 기숙사 배정 퀴즈 페이지 (회원가입)

#### 시나리오에 따른 기숙사 배정 로직 구현

![1퀴즈](https://github.com/Iam2Jo/Hogwartalk/assets/139189610/700a2eda-905e-4e08-9921-4085c59fcc94)

```
💡 시나리오에 따라 답변을 클릭하면 점수가 누적되며, 이에 따른 기숙사 배정이 이루어집니다.
문항별 선택한 답변 정보를 저장하여 이전/다음 이동시에도 답변이 유지됩니다.
```

### 2. 클럽 페이지

#### 채팅방 목록 조회

![3채팅방목록조회](https://github.com/Iam2Jo/Hogwartalk/assets/139189610/e5757be6-5b08-4240-95ac-4ae671b0a504)

```
💡 네 개의 기숙사 채팅방을 제외한 모든 채팅방을 불러옵니다.
이때 update 일시를 기준, 최신순으로 정렬되어 노출됩니다.
로그인한 사용자가 참여중인 채팅방의 경우 개별적으로 표기합니다.
```

#### 채팅방 생성

![4채팅방생성](https://github.com/Iam2Jo/Hogwartalk/assets/139189610/39f42276-9339-496e-88a1-794f95097996)

```
💡 새로운 채팅방을 생성하며, 생성이 완료되면 해당되는 채팅방으로 이동합니다.
제목은 필수값이며 채팅방 공개 여부 설정에 따라 목록 조회가 업데이트 됩니다.
```

#### 채팅방 참여

![5채팅방참여](https://github.com/Iam2Jo/Hogwartalk/assets/139189610/dee4cf96-696c-438d-9ca6-378a68096c93)

```
💡 현재 참여중인 채팅방의 경우 바로 해당되는 채팅방으로 이동하며,
참여중이지 않은 채팅방의 경우 참여 여부를 묻는 다이얼로그가 노출됩니다.
```

### 3. 공통

#### 로딩 페이지

![2클럽로딩](https://github.com/Iam2Jo/Hogwartalk/assets/139189610/d592854e-93a4-4f67-908d-e11e740f0bc3)

```
💡 API 호출 중 로딩 페이지가 노출됩니다.
```

#### BGM(헤더)

![6BGM](https://github.com/Iam2Jo/Hogwartalk/assets/139189610/9ad95e5a-1ee6-4a75-b7a0-640e478cb3cb)

```
💡 홈페이지 최초 진입 후 특정 영역을 클릭시 BGM이 재생됩니다.
헤더에서 아이콘을 통해 제어가 가능하며, 경로 이동되어도 재생 상태가 유지됩니다.
```

</div>
</details>

<br>

<details>
<summary style="font-size: 18px">이승현: 💬 채팅</summary>
<div markdown="1">

</div>
</details>

<br>

<details>
<summary style="font-size: 18px">배경규: 🔑 로그인/ 회원가입</summary>
<div markdown="1">

내용써주세요

</div>
</details>

<br>

<details>
<summary style="font-size: 18px">장문용: 📑 공통 컴포넌트</summary>
<div markdown="1">

### 1. 헤더 제작

```
💡각 아이콘에 간단한 호버 효과를 넣었습니다.
```

### 2. 마이페이지 토글

#### 로그인된 사용자 정보 표시

```
💡쿠키에 저장된 세션을 이용해 이름을 가져오고 firebase storage에서 프로필 이미지, firebase db에서 기숙사 정보를 가져옵니다.
```

#### 로그인된 사용자 정보 편집하기

```
💡편집하기를 누르면 이름과 프로필 사진을 변경할 수 있다. 변경 사항은 서버에 반영됩니다.
```

### 3. 친구목록 토글

#### 사용자 목록 출력 (이름, 기숙사 정보, 접속 유무 표시)

```
💡주어진 api와 소켓 통신을 통해 전체 유저와 접속 유저를 가져오고 id값을 비교해서 접속 유무를 표시합니다.
기숙사 정보는 firebase db에서 가져옵니다.
```

### 4. 로그아웃

#### 페이지 이동 & 쿠키 삭제

```
💡로그아웃 버튼을 누르면 로그인 페이지로 이동하고 쿠키에 저장된 `access_token`과 `refresh_token`은 제거됩니다.
```

</div>
</details>

<br>
