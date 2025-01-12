import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Success from './components/Success';
import Failure from './components/Failure';
import './App.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/registration"} element={<Registration />} />
          <Route path={"/success"} element={<Success />} />
          <Route path={"/failure"} element={<Failure />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;