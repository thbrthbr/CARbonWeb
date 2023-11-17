import React from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import { ProfileStore } from './store/store.js';

const PageBox = styled.div`
  // border: 0.5px solid #c0c0c0;
  height: 70vh;
  width: 80vw;
  margin-left: 170px;
`;

const UpperBar = styled.div`
  display: flex;
  align-items: center;
`;

const PageCategory1 = styled.div`
  padding-left: 5px;
  height: 50px;
  width: 100px;
  font-size: 30px;
  background-color: white;
  font-family: 'Lobster', cursive;
  border: 2px solid orange;
  // border-bottom-color: white;
`;
const PageCategory2 = styled.div`
  /* padding-left: 15px; */
  height: 50px;
  width: 100px;
  font-size: 30px;
  color: black;
  background-color: white;
  font-family: 'Lobster', cursive;
  border: 2px solid blue;
  /* border-bottom: 4px solid white; */
  margin-left: 5px;
  margin-top: -1px;
`;

const MyPage = (props) => {
  const { switchOn, setSwitchOn } = ProfileStore();

  const stateInit = () => {
    setSwitchOn(true);
  };
  return (
    <>
      <PageBox>
        <UpperBar>
          <PageCategory1 onClick={stateInit}>
            <Link
              to="/login/mypage/channeltask"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Channel
            </Link>
          </PageCategory1>
          <PageCategory2 onClick={stateInit}>
            <Link
              to="/login/mypage/profiletask"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Profile
            </Link>
          </PageCategory2>
        </UpperBar>
        <Outlet />
      </PageBox>
    </>
  );
};

export default MyPage;
