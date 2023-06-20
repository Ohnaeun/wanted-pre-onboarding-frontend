import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Wrapper>
            <Link to="/siginin">Sign In</Link>
            <Link to="/siginup">Sign Up</Link>
            <Link to="/todo">Todo</Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
`;

export default Home;