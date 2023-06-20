import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Wrapper>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
`;

export default Home;