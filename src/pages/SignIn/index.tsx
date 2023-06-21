import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/todo");
    }
  }, [isLoggedIn]);

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

    try {
      const response = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
        {
          email,
          password,
        }
      );
      alert("로그인이 완료되었습니다.");
      localStorage.setItem("jwt", response.data.access_token);
      setIsLoggedIn(true);
    } catch (e: any) {
      console.error(e.message);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
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
        <SignInButton
          data-testid="signin-button"
          type="submit"
          disabled={!isAllValid}
        >
          로그인
        </SignInButton>
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

const SignInButton = styled.button`
  border: 1px solid #ccc;
  height: 30px;
  padding: 0 10px;
`;
export default SignIn;
