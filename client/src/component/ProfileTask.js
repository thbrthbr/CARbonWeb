import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  ProfileStore,
  MasterStore2,
  MasterStore3,
  MasterStore4,
} from './store/store.js';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { BiPencil } from 'react-icons/bi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Loading from './Spinner.js';

const Uramen = styled.div`
  width: 1048px;
  height: 450px;
  background-color: white;
  border: 2px solid orange;
  margin-top: -2px;
`;

const ProfileContainer = styled.div`
  margin-left: 111.5px;
  background-color: white;

  margin-top: -2px;
  height: 380px;
  width: 936px;
  padding-top: 35px;
  padding-bottom: 35px;
  border: 2px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileBox1 = styled.div`
  padding: 10px;
  font-size: 30px;
  font-family: 'S-CoreDream-3Light';
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const ProfileBox2 = styled.div`
  padding: 10px;
  font-family: 'S-CoreDream-3Light';
  background-color: white;
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Name = styled.div``;
const Nickname = styled.div``;
const Gender = styled.div``;
const PhoneNumber = styled.div``;
const Point = styled.div``;
const HaveCar = styled.div``;

const IsDriver = styled.div``;

const Rate = styled.div``;

const ProfileTask = (props) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState(false);
  const [rating, setRating] = useState('');
  const [mileage, setMileage] = useState('');
  const [carPoolCount, setCarPoolCount] = useState(0);
  const [canDrive, setCanDrive] = useState(false);
  const [ownCar, setOwnCar] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  const [phoneF, setPhoneF] = useState('');
  const [phoneS, setPhoneS] = useState('');
  const [phoneT, setPhoneT] = useState('');
  const [loading, setLoading] = useState(true);

  const { loggedRealId } = MasterStore3();
  const { setLoggedId, loggedId } = MasterStore2();
  const { loggedNickname, setLoggedNickname } = MasterStore4();

  const modifty = () => {
    if (switchOn === false) {
      setSwitchOn(true);
      patchUserData();
      console.log(switchOn);
    }
    if (switchOn === true) {
      setSwitchOn(false);
      console.log(switchOn);
    }
  };

  const nickNameChange = (e) => {
    setNickname(e.currentTarget.value);
  };

  const genderChange = (e) => {
    if (e.currentTarget.value === 'true') {
      setGender(e.currentTarget.value);
    } else {
      setGender(e.currentTarget.value);
    }
    console.log(gender);
  };

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

  const hasCarChange = (e) => {
    if (e.currentTarget.value === 'yes') {
      setOwnCar(true);
    } else {
      setOwnCar(false);
    }
    console.log(ownCar);
  };

  const isDriverChange = (e) => {
    if (e.currentTarget.value === 'yes') {
      setCanDrive(true);
    } else {
      setCanDrive(false);
    }
  };

  const getUserData = async () => {
    setLoading(true);
    try {
      const res = await axios({
        // `${process.env.REACT_APP_API_URL}/api/users/${loggedRealId}?userId=${loggedRealId}`,
        method: 'get',
        url: `http://localhost:8000/api/profile/${loggedRealId}`,
        header: {
          withCredentials: true,
        },
      });
      const data = res.data.data;
      setName(data.name);
      setNickname(data.nickname);
      setPhoneF(data.phoneNumber.split('-')[0]);
      setPhoneS(data.phoneNumber.split('-')[1]);
      setPhoneT(data.phoneNumber.split('-')[2]);
      setRating(data.rating);
      setCarPoolCount(data.carpoolCount);
      setGender(data.gender);
      setOwnCar(data.hasCar);
      setMileage(data.point);
      setCanDrive(data.isDriver);

      setLoading(false);
      return res.data;
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const patchUserData = async () => {
    try {
      const updateDataObj = {
        userId: loggedRealId,
        nickname: nickname,
        gender: gender,
        phoneNumber: phoneF + '-' + phoneS + '-' + phoneT,
        hasCar: ownCar,
        driving: canDrive,
      };
      const res = await axios({
        method: 'patch',
        url: `http://localhost:8000/api/profile/${loggedRealId}`,
        data: updateDataObj,
        header: {
          withCredentials: true,
        },
      });
      setLoggedNickname(nickname);
      return res.data;
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Uramen>
      <ProfileContainer>
        {loading === true ? (
          <Loading />
        ) : switchOn === true ? (
          <ProfileBox1>
            <Name>이름: {name}</Name>
            <Nickname>닉네임: {nickname}</Nickname>
            <Gender>성별: {gender === false ? '여자' : '남자'}</Gender>
            <PhoneNumber>
              전화번호: {phoneF + '-' + phoneS + '-' + phoneT}
            </PhoneNumber>
            <Point>포인트: {mileage}</Point>
            <IsDriver>
              운전가능여부: {canDrive === false ? '불가' : '가능'}
            </IsDriver>
            <HaveCar>자차보유: {ownCar === false ? '미보유' : '보유'}</HaveCar>
            <Rate>평점: {rating}</Rate>
            <br></br>
            <button
              style={{
                borderRadius: '50%',
                cursor: 'pointer',
                backgroundColor: 'white',
                height: '50px',
                width: '50px',
              }}
              onClick={modifty}
            >
              <BiPencil style={{ fontSize: '20px' }} />
            </button>
          </ProfileBox1>
        ) : (
          <ProfileBox2>
            <button
              onClick={() => {
                setSwitchOn(!switchOn);
              }}
            >
              <AiOutlineArrowLeft />
            </button>
            <Nickname>
              닉네임:{' '}
              <input
                style={{
                  borderColor: 'black',
                  borderRadius: '5px',
                }}
                onChange={nickNameChange}
              ></input>
            </Nickname>
            <Gender>
              <div>성별:</div>
              <input
                type="radio"
                name="genderCheck"
                value="male"
                // defaultChecked={gender === "male" ? true : false}
                // checked={gender === "male" ? true : false}
                onChange={genderChange}
              />
              남자
              <input
                type="radio"
                name="genderCheck"
                value="female"
                // defaultChecked={gender === "female" ? true : false}
                // checked={gender === "female" ? true : false}
                onChange={genderChange}
              />
              여자
            </Gender>
            <PhoneNumber>
              전화번호:
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
            </PhoneNumber>
            <IsDriver>
              <div>운전가능여부:</div>
              <input
                type="radio"
                name="isDriver"
                value="yes"
                // defaultChecked={ownCar === "male" ? true : false}
                // checked={canDrive === "yes" ? true : false}
                onChange={isDriverChange}
              />
              가능
              <input
                type="radio"
                name="isDriver"
                value="no"
                // defaultChecked={gender === "female" ? true : false}
                // checked={canDrive === "no" ? true : false}
                onChange={isDriverChange}
              />
              미보유
            </IsDriver>
            <HaveCar>
              <div>자차보유:</div>
              <input
                type="radio"
                name="hasCarCheck"
                value="yes"
                // defaultChecked={ownCar === "male" ? true : false}
                // checked={ownCar === "yes" ? true : false}
                onChange={hasCarChange}
              />
              불가
              <input
                type="radio"
                name="hasCarCheck"
                value="no"
                // defaultChecked={gender === "female" ? true : false}
                // checked={ownCar === "no" ? true : false}
                onChange={hasCarChange}
              />
              미보유
            </HaveCar>
            <button
              style={{
                borderRadius: '50%',
                cursor: 'pointer',
                backgroundColor: 'white',
                height: '50px',
                width: '50px',
              }}
              onClick={modifty}
            >
              <BiPencil style={{ fontSize: '20px' }} />
            </button>
          </ProfileBox2>
        )}
      </ProfileContainer>
    </Uramen>
  );
};

export default ProfileTask;
