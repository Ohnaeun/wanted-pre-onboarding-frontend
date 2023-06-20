import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'

function SignUp() {
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
    
        const emailRegex = /@/;
        if (!emailRegex.test(email)) {
          alert('잘못된 이메일 형식입니다.');
          return;
        }
    
        if (password.length < 8) {
          alert('비밀번호는 최소 8자리 이상입니다.');
          return;
        }
    
        try {
          const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signup', {
            email,
            password
          });
          alert('회원가입이 완료되었습니다. 로그인 해주세요.');
          console.log(response.data);
          navigate('/signin');
        } catch (e: any) {
          console.error(e.message);
          alert(e.message);
        }
      };

    const isAllValid = email && /@/.test(email) && password.length >= 8;

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <input data-testid="email-input" onChange={handleEmailChange} />
                <input data-testid="password-input" onChange={handlePasswordChange}/>
                <SignUpButton data-testid="signup-button" type="submit" disabled={!isAllValid}>회원가입</SignUpButton>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
`;

const SignUpButton = styled.button`
`;

export default SignUp;