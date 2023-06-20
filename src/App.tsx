import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Todo from './pages/Todo';

function App() {
  const token = localStorage.getItem('jwt');

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element= {token ? <Navigate to="/todo" /> : <SignIn />} />
        <Route path="/signup" element={token ? <Navigate to="/todo" /> : <SignUp />} />
        <Route path="/todo" element={!token ? <Navigate to="/signin" /> : <Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
