import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Wrapper>
      <Link to="/signin">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: fit-content;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  a + a {
    margin-left: 30px;
  }
`;

export default Home;
