import styled from 'styled-components';

export const Container = styled.form`
  width: 44.25rem;
  margin: 0 auto;
`;

export const Title = styled.div`
  font-size: 1.75rem;
  margin-bottom: 2.12rem;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.56rem;
`;

export const AnswerLabel = styled.label`
  width: auto;
  height: 4.375rem;
  background-color: #000;
  font: var(--color-white);
  font-size: 1.25rem;
  text-align: center;
  display: inline-block;
  line-height: 4.3rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-main-yellow);
    color: #000;
    box-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
  }
`;

export const AnswerInput = styled.input`
  display: none;
  &:checked + label {
    background-color: var(--color-main-yellow);
    color: #000;
    box-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
  }
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

export const SubmitBtn = styled.button`
  width: 15.875rem;
  height: 3rem;
  background-color: #000;
  color: #fff;
  border: 1px solid #262626;
  cursor: pointer;

  &:hover {
    background-color: var(--color-main-yellow);
    color: #000;
    box-shadow: 0px 0px 20px 0px rgba(242, 204, 0, 0.49);
  }
`;
