import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Layout/Header';
import Main from './component/Main';
import MyPage from './component/MyPage';
import Board from './component/Board';
import Today from './component/Today';
import ChannelTask from './component/ChannelTask';
import ProfileTask from './component/ProfileTask';
import Loading from './component/Loading';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FullCalendar } from './component/calendar/FullCalendar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Header />}>
            <Route path="/login/mypage" element={<MyPage />}>
              <Route
                path="/login/mypage/channeltask"
                element={<ChannelTask />}
              ></Route>
              <Route
                path="/login/mypage/profiletask"
                element={<ProfileTask />}
              ></Route>
            </Route>
            <Route path="/login/board" element={<Board />}></Route>
            <Route path="/login/today" element={<Today />}></Route>
            <Route path="/login/Calendar" element={<FullCalendar />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
