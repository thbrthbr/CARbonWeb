import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import logoImg from './img/logo.png';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import {
  LoginStore,
  MasterStore,
  MasterStore2,
  MasterStore3,
  MasterStore4,
} from './store/store.js';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  margin-top: 120px;
  margin-right: 50px;
  border: 4px solid black;
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 10px;
`;

const LoginButton = styled.button`
  margin-top: 10px;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const SigninButton = styled.button`
  margin-top: 10px;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const SignInInput = styled.input`
  margin-bottom: 5px;
  border-color: black;
  border-radius: 5px;
`;

const SignInInput2 = styled.input.attrs((props) => ({
  type: 'password',
}))`
  margin-bottom: 5px;
  border-color: black;
  border-radius: 5px;
`;

const ChoiceBox = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Radio = styled.input.attrs((props) => ({
  type: 'radio',
}))`
  //  accent-color: black;
`;

const Main = (props) => {
  const movePage = useNavigate();
  const {
    isSignIn,
    setIsSignIn,
    // id,
    // setId,
    // password,
    // setPassword,
    // nickname,
    // setNickname,
    // name,
    // setName,
    // gender,
    // setGender,
    // phoneF,
    // setPhoneF,
    // phoneS,
    // setPhoneS,
    // phoneT,
    // setPhoneT,
    // birthdateY,
    // setBirthdateY,
    // birthdateM,
    // setBirthdateM,
    // birthdateD,
    // setBirthdateD,
    // isDriver,
    // setIsDriver,
    // ownCar,
    // setOwnCar,
  } = LoginStore();
  const next = useRef();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phoneF, setPhoneF] = useState('');
  const [phoneS, setPhoneS] = useState('');
  const [phoneT, setPhoneT] = useState('');
  const [birthdateY, setBirthdateY] = useState('');
  const [birthdateM, setBirthdateM] = useState('');
  const [birthdateD, setBirthdateD] = useState('');
  const [isDriver, setIsDriver] = useState(false);
  const [ownCar, setOwnCar] = useState(false);

  const { loggedin, setLoggedin } = MasterStore();
  const { loggedId, setLoggedId } = MasterStore2();
  const { loggedRealId, setLoggedRealId } = MasterStore3();
  const { loggedNickname, setLoggedNickname } = MasterStore4();

  const phoneChange = (e) => {
    if (e.target.id === 'first') {
      setPhoneF(e.target.value);
    }
    if (e.target.id === 'second') {
      setPhoneS(e.target.value);
    }
    if (e.target.id === 'third') {
      setPhoneT(e.target.value);
    }
  };

  const birthdateChange = (e) => {
    if (e.target.id === 'year') {
      setBirthdateY(e.target.value);
    }
    if (e.target.id === 'month') {
      setBirthdateM(e.target.value);
    }
    if (e.target.id === 'day') {
      setBirthdateD(e.target.value);
    }
  };

  const signInRequest = async () => {
    try {
      const signInData = {
        userId: id,
        password: password,
        name: name,
        nickname: nickname,
        gender: gender,
        phoneNumber:
          phoneF.toString() + '-' + phoneS.toString() + '-' + phoneT.toString(),
        birthdate:
          birthdateY.toString() +
          '-' +
          birthdateM.toString() +
          '-' +
          birthdateD.toString(),
        hasCar: ownCar,
        isDriver: isDriver,
      };

      const res = await axios({
        // `${process.env.REACT_APP_API_URL}/join`,
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/signin`,
        data: signInData,
        header: {
          withCredentials: true,
        },
      });

      if (res.data.status === '성공') {
        alert('회원가입에 성공하셨습니다');
        window.location.reload();
      } else {
        alert('회원가입 실패');
      }
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const logInRequest = async () => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/login`,
        data: {
          username: id,
          password: password,
        },
        headers: {
          withCredentials: true,
        },
      });
      console.log(res.data);
      if (res.data.status == 200) {
        alert('로그인 되었습니다');
        setLoggedin(true);
        setLoggedId(res.data.id);
        setLoggedRealId(res.data.userId);
        setLoggedNickname(res.data.nickname);
        movePage('login/today');
      } else {
        alert('아이디나 비밀번호를 확인해주세요');
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        alert('아이디나 비밀번호를 확인해주세요');
      } else {
        alert('로그인 실패');
      }
    }
  };

  return (
    <>
      <Container>
        <img
          src={logoImg}
          alt="logo"
          style={{ marginTop: '80px', marginRight: '100px' }}
        />

        {loggedin === false ? (
          isSignIn === false ? (
            <LoginBox>
              <div></div>
              <div style={{ fontSize: '20px' }}>ID</div>
              <input
                type="text"
                onChange={(e) => {
                  setId(e.target.value);
                }}
                style={{
                  borderRadius: '5px',
                  marginBottom: '20px',
                  borderColor: 'black',
                }}
                onKeyDown={(e) => {
                  if (e.key == 'Enter') {
                    next.current.focus();
                  }
                }}
              ></input>
              <div style={{ fontSize: '20px' }}>PASSword</div>
              <input
                ref={next}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{
                  borderRadius: '5px',
                  marginBottom: '20px',
                  borderColor: 'black',
                }}
                onKeyDown={(e) => {
                  if (e.key == 'Enter') {
                    logInRequest();
                  }
                }}
              ></input>
              <LoginButton onClick={logInRequest}>LOGin</LoginButton>
              <SigninButton
                onClick={() => {
                  setIsSignIn(!isSignIn);
                }}
              >
                SIGNin
              </SigninButton>
            </LoginBox>
          ) : (
            <LoginBox>
              <button
                style={{
                  position: 'absolute',
                  left: '0%',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  height: '30px',
                  marginTop: '-470px',
                  borderRadius: '10px',
                }}
                onClick={() => {
                  setIsSignIn(!isSignIn);
                }}
              >
                <AiOutlineArrowLeft />
              </button>
              &lt;아이디&gt;
              <SignInInput
                onChange={(e) => {
                  setId(e.target.value);
                }}
              ></SignInInput>
              &lt;비밀번호&gt;
              <SignInInput2
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></SignInInput2>
              &lt;이름&gt;
              <SignInInput
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></SignInInput>
              &lt;닉네임&gt;
              <SignInInput
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              ></SignInInput>
              &lt;성별&gt;
              <ChoiceBox>
                <div>남자</div>
                <input
                  type="radio"
                  name="gender"
                  value="true"
                  style={{
                    borderColor: 'black',
                  }}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
                <div>여자</div>
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  style={{
                    borderColor: 'black',
                  }}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </ChoiceBox>
              &lt;전화번호&gt;
              <ChoiceBox>
                <input
                  style={{
                    width: '30px',
                    marginRight: '5px',
                    marginLeft: '5px',
                    borderColor: 'black',
                    borderRadius: '5px',
                  }}
                  id="first"
                  onChange={phoneChange}
                ></input>
                -
                <input
                  style={{
                    width: '40px',
                    marginRight: '5px',
                    marginLeft: '5px',
                    borderColor: 'black',
                    borderRadius: '5px',
                  }}
                  id="second"
                  onChange={phoneChange}
                ></input>
                -
                <input
                  style={{
                    width: '40px',
                    marginRight: '5px',
                    marginLeft: '5px',
                    borderColor: 'black',
                    borderRadius: '5px',
                  }}
                  id="third"
                  onChange={phoneChange}
                ></input>
              </ChoiceBox>
              &lt;생년월일&gt;
              <ChoiceBox>
                <input
                  style={{
                    width: '40px',
                    marginRight: '5px',
                    marginLeft: '5px',
                    borderColor: 'black',
                    borderRadius: '5px',
                  }}
                  placeholder="YYYY"
                  id="year"
                  onChange={birthdateChange}
                ></input>
                <input
                  style={{
                    width: '30px',
                    marginRight: '5px',
                    marginLeft: '5px',
                    borderColor: 'black',
                    borderRadius: '5px',
                  }}
                  placeholder="MM"
                  id="month"
                  onChange={birthdateChange}
                ></input>
                <input
                  style={{
                    width: '30px',
                    marginRight: '5px',
                    marginLeft: '5px',
                    borderColor: 'black',
                    borderRadius: '5px',
                  }}
                  placeholder="DD"
                  id="day"
                  onChange={birthdateChange}
                ></input>
              </ChoiceBox>
              &lt;운전가능여부&gt;
              <ChoiceBox>
                <div>예</div>
                <Radio
                  name="driverCheck"
                  value="true"
                  onChange={(e) => {
                    setIsDriver(e.target.value);
                  }}
                ></Radio>
                <div>아니오</div>
                <Radio
                  name="driverCheck"
                  value="false"
                  onChange={(e) => {
                    setIsDriver(e.target.value);
                  }}
                ></Radio>
              </ChoiceBox>
              &lt;자차여부&gt;
              <ChoiceBox>
                <div>예</div>
                <input
                  type="radio"
                  name="carCheck"
                  value="true"
                  onChange={(e) => {
                    setOwnCar(e.target.value);
                  }}
                />
                <div>아니오</div>
                <input
                  type="radio"
                  name="carCheck"
                  value="false"
                  onChange={(e) => {
                    setOwnCar(e.target.value);
                  }}
                />
              </ChoiceBox>
              <button
                style={{
                  borderColor: 'black',
                  backgroundColor: 'white',
                  borderRadius: '5px',
                }}
                onClick={signInRequest}
              >
                SUBmit
              </button>
            </LoginBox>
          )
        ) : (
          <LoginBox>
            <button
              style={{
                position: 'absolute',
                right: '0%',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: 'white',
                height: '30px',
                marginTop: '-470px',
                borderRadius: '10px',
              }}
            >
              <Link
                to="/login/today/*"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <AiOutlineArrowRight />
              </Link>
            </button>
            <p
              style={{
                fontSize: '30px',
                fontFamily: 'S-CoreDream-3Light',
                fontWeight: 700,
              }}
            >
              {loggedNickname}님 환영합니다
            </p>
          </LoginBox>
        )}
      </Container>
    </>
  );
};

export default Main;
