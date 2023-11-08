'use client';
import type { NextPage } from 'next';
import { useState } from 'react';

const signup: NextPage = () => {
  const [formData, setFormData] = useState<any>({
    id: '',
    password: '',
    name: '',
    picture: '"https://avatars.githubusercontent.com/u/66263916?v=4',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleButtonClick = async () => {
    const isDuplicated = await checkUserIdAvailability(formData.id);
    if (isDuplicated === true) {
      throw new Error('아이디가 중복되었습니다.')
    }

    signupUser(formData);
  };
  return (
    <>
      <header>
        <img src="" alt="" />
      </header>
      <form>
        <div>
          <label htmlFor="">아이디</label>
          <input
            type="text"
            id="id"
            value={formData.id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="">이름</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="">대표사진</label>
          <input
            type="text"
            id="picture"
            value={formData.picture}
            onChange={handleInputChange}
          />
          <button>첨부하기</button>
        </div>
        <div>
          <label htmlFor="">기숙사</label>
          <input type="text" id="name" />
          <button>기숙사 시험보기</button>
        </div>
        <button type="button" onClick={handleButtonClick}>
          입학신청서 작성 완료
        </button>
      </form>
    </>
  );
};

async function checkUserIdAvailability(id:string){
  const res = await fetch('https://fastcampus-chat.net/check/id',{
    headers: {
      'content-type': 'application/json',
      serverId: '660d616b',
    },
    method : 'POST',
    body : JSON.stringify({id:id})
  })
  if (res.ok) {
    const responseData = await res.json();
      return responseData.isDuplicated;
  }

}

async function signupUser (formData:any){
  const resdata = await fetch('https://fastcampus-chat.net/signup', {
      headers: {
        'content-type': 'application/json',
        serverId: '660d616b',
      },
      method: 'POST',
      body: JSON.stringify(formData),
    });
    if (resdata.ok) {
      const responseData = await resdata.json(); 
      console.log(responseData);
    }
}

export default signup;
