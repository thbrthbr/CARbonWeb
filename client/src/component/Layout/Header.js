import React, { useEffect } from 'react';
import styled from 'styled-components';
import logoImg from '../img/logo2.png';
import car from '../img/car.png';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ProfileStore,
  ChannelStore,
  MasterStore,
  MasterStore2,
} from '../store/store.js';

const HeaderArea = styled.div`
  height: 150px;
  width: 1300px;
  display: flex;
  align-items: center;
  margin-left: 60px;
`;

const CategoryItem = styled.span`
  margin-top: -27px;
  margin-left: 27px;
  font-family: 'S-CoreDream-3Light';
  font-size: 30px;
  font-weight: 600;
`;

const Line = styled.div`
  height: 2px;
  width: 990px;
  background-color: black;
  margin-top: -22px;
  margin-left: -25px;
`;

const Section2 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Section1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.p`
  &:hover {
    color: blue;
  }
`;

function Header(props) {
  const movePage = useNavigate();

  const { switchOn, setSwitchOn } = ProfileStore();
  const { setShowListA, setShowListD } = ChannelStore();
  const { loggedin, setLoggedin } = MasterStore();
  const { loggedId, setLoggedId } = MasterStore2();
  const location = useLocation();

  const stateInit = () => {
    setSwitchOn(true);
    setShowListA(false);
    setShowListD(false);
  };

  const logOut = () => {
    let confirm = window.confirm('로그아웃 하시겠습니까?');
    if (confirm) {
      setLoggedId(null);
      movePage('/');
      setLoggedin(false);
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (loggedin === false) {
      alert('Access Denied');
      movePage('/');
    }
  }, []);

  return (
    <>
      <HeaderArea id="header">
        <span style={{ height: '100px' }}>
          <Link
            to="/login/today"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <img
              src={logoImg}
              alt="logo"
              style={{ height: '100px', marginRight: '15px' }}
            />
          </Link>
        </span>
        <Section1>
          <Section2>
            <CategoryItem>
              <Link
                to="/login/today"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Item
                  style={
                    location.pathname === '/login/today'
                      ? {
                          color: 'blue',
                          textDecoration: 'none',
                          marginLeft: '15px',
                          marginRight: '30px',
                          marginTop: '60px',
                        }
                      : {
                          color: 'inherit',
                          textDecoration: 'none',
                          marginLeft: '15px',
                          marginRight: '30px',
                          marginTop: '60px',
                        }
                  }
                  onClick={stateInit}
                >
                  하루요약
                </Item>
              </Link>
            </CategoryItem>
            <CategoryItem>
              <Link
                to="/login/calendar"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Item
                  style={
                    location.pathname === '/login/calendar'
                      ? {
                          color: 'blue',
                          textDecoration: 'none',
                          marginRight: '30px',
                          marginTop: '60px',
                        }
                      : {
                          color: 'inherit',
                          textDecoration: 'none',
                          marginRight: '30px',
                          marginTop: '60px',
                        }
                  }
                  onClick={stateInit}
                >
                  탄소배출일지
                </Item>
              </Link>
            </CategoryItem>
            <CategoryItem>
              <Link
                to="/login/board"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Item
                  style={
                    location.pathname === '/login/board'
                      ? {
                          color: 'blue',
                          textDecoration: 'none',
                          marginRight: '30px',
                          marginTop: '60px',
                        }
                      : {
                          color: 'inherit',
                          textDecoration: 'none',
                          marginRight: '30px',
                          marginTop: '60px',
                        }
                  }
                  onClick={stateInit}
                >
                  카풀 쉐어링
                </Item>
              </Link>
            </CategoryItem>
            <CategoryItem>
              <Link
                to="/login/mypage/channeltask"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Item
                  style={
                    location.pathname.includes('/login/mypage')
                      ? {
                          color: 'blue',
                          textDecoration: 'none',
                          marginRight: '30px',
                          marginTop: '60px',
                        }
                      : {
                          color: 'inherit',
                          textDecoration: 'none',
                          marginRight: '30px',
                          marginTop: '60px',
                        }
                  }
                  onClick={stateInit}
                >
                  마이페이지
                </Item>
              </Link>
            </CategoryItem>
            <img
              src={car}
              onClick={logOut}
              alt="car"
              style={{
                cursor: 'pointer',
                height: '60px',
                marginRight: '10px',
                marginTop: '27px',
              }}
            />
          </Section2>
          <Line></Line>
        </Section1>
      </HeaderArea>
      <Outlet />
    </>
  );
}

export default Header;
