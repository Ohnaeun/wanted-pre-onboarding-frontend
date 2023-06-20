import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    
        try {
          // 로그인 API 호출
          const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin', {
            email,
            password
          });
          alert('로그인이 완료되었습니다.');
          if(response.data) {
            localStorage.setItem('jwt', response.data.access_token);
          }
          navigate('/todo');
        } catch (e: any) {
          console.error(e.message);
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
      };

    const isAllValid = email && /@/.test(email) && password.length >= 8;

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <input data-testid="email-input" onChange={handleEmailChange} />
                <input data-testid="password-input" onChange={handlePasswordChange}/>
                <SignInButton data-testid="signin-button" type="submit" disabled={!isAllValid}>로그인</SignInButton>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
`;

const SignInButton = styled.button`
`;

export default SignIn;