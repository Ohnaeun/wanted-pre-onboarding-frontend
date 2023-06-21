import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /@/;
    if (!emailRegex.test(email)) {
      alert("잘못된 이메일 형식입니다.");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 최소 8자리 이상입니다.");
      return;
    }

    try {
      const response = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signup",
        {
          email,
          password,
        }
      );
      alert("회원가입이 완료되었습니다. 로그인 해주세요.");
      console.log(response.data);
      navigate("/signin");
    } catch (e: any) {
      console.error(e.message);
    }
  };

  const isAllValid = email && /@/.test(email) && password.length >= 8;

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          onChange={handleEmailChange}
          placeholder="이메일"
        />
        <input
          data-testid="password-input"
          onChange={handlePasswordChange}
          placeholder="패스워드"
        />
        <SignUpButton
          data-testid="signup-button"
          type="submit"
          disabled={!isAllValid}
        >
          회원가입
        </SignUpButton>
      </StyledForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: fit-content;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 300px;
  height: 150px;

  input {
    border: 1px solid #ccc;
    height: 30px;
    padding: 0 10px;
  }
`;

const SignUpButton = styled.button`
  border: 1px solid #ccc;
  height: 30px;
  padding: 0 10px;
`;

export default SignUp;
