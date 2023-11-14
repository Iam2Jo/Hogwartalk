'use client';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { SignupContainer } from './signupStyle';
import { BsCamera } from 'react-icons/bs';
import { getStorageURL, setStorageImage,setUsersClass } from '@utils/firebase.js';
import { checkUserIdAvailability, signupUser } from '@utils/service.js';
import { useRecoilValue,useRecoilState } from 'recoil';
import { teamState,signupState,userPreviewState,userImageState } from '@recoil/atom';
type FormData = {
  id: string;
  password: string;
  name: string;
  picture: string;
};

const signup: NextPage = () => {
  const fileInputRef = useRef(null);
  const team = useRecoilValue(teamState);
  const [formData, setFormData] = useRecoilState(signupState);
  const [userImage, setUserImage] = useRecoilState(userImageState);
  const [previewImg, setPreviewImg] = useRecoilState(userPreviewState);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleButtonClick = async () => {
    if (formData.id.trim() === ''){
      alert('아이디를 입력하세요');
      throw new Error('아이디를 입력하세요')
    }
    const isDuplicated = await checkUserIdAvailability(formData.id);
    if (isDuplicated === true) {
      alert('이미 존재하는 아이디입니다.');
      throw new Error('이미 존재하는 아이디입니다.');
    }
    if (formData.password.trim() === '') {
      alert('비밀번호를 입력하세요.');
      throw new Error('비밀번호를 입력하세요.');
    } else if (formData.password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.')
      throw new Error('비밀번호는 최소 6자 이상이어야 합니다.');
    }
    if (team.trim() === ''){
      alert('기숙사를 선택하세요');
      throw new Error('기숙사를 선택하세요');
    }
    await setUsersClass(formData.id,team);
    if (userImage) {
      await setStorageImage(userImage, formData.id);
      const imageURL = await getStorageURL(formData.id);
      const data = { ...formData, picture: imageURL };
      await signupUser(data);
      return;
    }
    await signupUser(formData);
  };
  const handleInputImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setUserImage(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const result = reader.result;
        if (typeof result === 'string') {
          setPreviewImg(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  function handleTestButtonClick (){
    router.push('signup/quiz');
  }
  return (
    <SignupContainer>
      <header>
        <img src="LoginTitle.png" alt="" className="LoginTitile" />
      </header>
      <form>
        <div>
          <div className="form__input">
            <label htmlFor="" className="">
              아이디
            </label>
            <input
              type="text"
              id="id"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form__input">
            <label htmlFor="">비밀번호</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form__input">
            <label htmlFor="">이름</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="">기숙사</label>
            <div>
              <input value={team}  disabled type="text" id="name" className="input__test" required/>
              <button type="button" className="button__test" onClick={handleTestButtonClick}>
                기숙사 시험보기
              </button>
            </div>
          </div>
          <button
            type="button"
            className="button__submit"
            onClick={handleButtonClick}
          >
            입학신청서 작성 완료
          </button>
        </div>
        <div>
          <div className="form__input">
            <img
              src={previewImg || '/assets/img/default.png'}
              alt="defaultImage"
              className="profile__img"
            />
            <label htmlFor="picture" className="button__save__img">
              <BsCamera size="28" />
            </label>
            <input
              ref={fileInputRef}
              type="file"
              id="picture"
              accept="image/*"
              onChange={handleInputImgChange}
            />
          </div>
        </div>
      </form>
    </SignupContainer>
  );
};

export default signup;
