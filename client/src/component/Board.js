import React, { useEffect, useState, Suspense, useRef } from 'react';
import { GlobalStyle } from './noScroll.js';
import { BsMegaphone } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import { TbArrowsExchange2 } from 'react-icons/tb';
import styled from 'styled-components';
import axios from 'axios';
import {
  ChannelStore,
  ProfileStore,
  MasterStore2,
  MasterStore3,
  MasterStore4,
} from './store/store.js';
import assemble2 from './img/assemble2.jpg';
import assemble1 from './img/assemble1.jpg';
import arrow from './img/right_arrow.png';
import PacmanLoader from 'react-spinners/PacmanLoader';
import qs from 'qs';
import Loading from './Spinner.js';

const Container = styled.div`
  width: 1500px;
  height: 400px;
  display: flex;
  justify-content: center;
  margin-left: -30px;
`;

const BoardBox = styled.div`
  height: 300px;
  width: 1048px;
  margin-left: 10px;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: colmun;
  justify-content: center;
`;

const Searchbar = styled.input`
  border: 0.5px solid black;
  margin-left: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-right: 20px;
  height: 20px;
  &::placeholder {
    text-align: center;
  }
`;

const Searchbar2 = styled.input`
  border: none;
  background-color: #eeeeee;
  margin-bottom: 10px;
  height: 20px;
`;

const ChannelBox = styled.div`
  position: relative;
  height: 450px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Channel = styled.div`
  border: 0.5px solid orange;
  padding: 20px;
  border-radius: 30px;
  height: 150px;
  width: 1000px;
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChannelFirstRow = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  width: 900px;
  justify-content: space-between;
`;

const FirstItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  flex-direction: column;
`;

const RoomContainer = styled.div`
  position: absolute;
  top: 0%;
  margin-top: -500px;
  margin-left: -50px;
  width: 5000px;
  height: 2000px;
`;

const Room = styled.div`
  padding: 30px;
  border: 0.5px solid black;
  border-radius: 0px 0px 20px 20px;
  top: 15%;
  position: fixed;
  height: 370px;
  width: 500px;
  margin-left: 300px;
  margin-top: 10px;
  font-family: 'S-CoreDream-3Light';
  background-color: white;
  z-index: 5;
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: center;
`;

const SecondRow = styled.div`
  margin-top: 20px;
`;

const StartPoint = styled.div`
  margin-right: 40px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EndPoint = styled.div`
  margin-left: 40px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonX1 = styled.button`
  margin-left: 420px;
  margin-top: 20px;
  width: 5px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ButtonX2 = styled.button`
  margin-left: 275px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ButtonX3 = styled.button`
  margin-left: 480px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 0%;
  margin-top: -500px;
  margin-left: -50px;
  left: 0%;
  display: none;
  width: 2000px;
  height: 2000px;
`;

const ModalBox = styled.div`
  background-color: white;
  border-radius: 0px 0px 20px 20px;
  font-family: 'S-CoreDream-3Light';
  margin-left: 320px;
  margin-top: 10px;
  top: 15%;
  position: fixed;
  align-items: center;
  flex-direction: column;
  border: 0.5px solid black;
  height: 450px;
  width: 500px;
  display: flex;
`;

const Assemble = styled.button`
  position: fixed;
  width: 80px;
  height: 80px;
  z-index: 5;
  right: 3%;
  bottom: 3%;
  background-color: #ffb635;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

const RegularSticker = styled.div`
  position: absolute;
  margin-left: -950px;
  margin-top: -150px;
  font-family: 'GangwonEduPowerExtraBoldA';
  -webkit-text-stroke: 1px blue;
  color: white;
`;

const ContactTool = styled.div`
  margin-top: 30px;
`;

const PersonnelSticker = styled.div`
  position: absolute;
  margin-right: -900px;
  margin-top: -150px;
`;

const PlaceList = styled.ul`
  width: 250px;
  height: 200px;
  background-color: #fff;
  margin-top: 0px;
  overflow: scroll;
  z-index: 5;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubModal = styled.div`
  position: absolute;
  margin-top: 50px;
  width: 300px;
  height: 250px;
  background-color: white;
  border: 0.5px solid black;
  z-index: 4;
`;

const SubModal2 = styled.div`
  position: absolute;
  margin-top: 50px;
  width: 300px;
  height: 250px;
  background-color: white;
  border: 0.5px solid black;
  z-index: 4;
`;

const Pagination = styled.div``;

const ChannelPages = styled.div`
  width: 1040px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
  border: 0.5px solid #c0c0c0;
  width: 200px;
  height: 100px;
  position: absoulte;
  margin-left: 100px;
`;

const RoomPeopleBox = styled.span`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 80px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RoomPeople = styled.span`
  width: 100px;
  position: relative;
  cursor: pointer;
`;

const GetOut = styled.button`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 10px;
  cursor: pointer;
`;

const HiddenInfo = styled.div`
  display: none;
`;

const { kakao } = window;

const Board = ({ searchPlace }) => {
  let count = 0;
  let pageCount = 1;
  let channelNum = 0;
  let channelPages = 0;
  let pageArr = [];
  let firstCount = 0;
  let startArround = [];
  let completeXY = [];
  let completeDA = [];
  let usersCount = 0;
  let whichPoint = null;
  let tempflag = 0;

  const {
    channelList,
    setChannelList,
    channelArr,
    setChannelArr,
    addChannelArr,
    startPoint,
    setStartPoint,
    personnel,
    setPersonnel,
    regular,
    setRegular,
    content,
    setContent,
    departures,
    setDepartures,
    departuresLatitude,
    setDeparturesLatitude,
    departuresLongitude,
    setDeparturesLongitude,
    arrivals,
    setArrivals,
    arrivalsLatitude,
    setArrivalsLatitude,
    arrivalsLongitude,
    setArrivalsLongitude,
    place,
    setPlace,
    inputStartPoint,
    setInputStartPoint,
    inputEndPoint,
    setInputEndPoint,
    search,
    setSearch,
    search2,
    setSearch2,
    showListD,
    setShowListD,
    showListA,
    setShowListA,
    channelPg,
    setChannelPg,
    pageNum,
    setPageNum,
    firstTake,
    setFirstTake,
    please,
    setPlease,
    arroundArr,
    setArroundArr,
    channelCount,
    setChannelCount,
    driverExsist,
    setDriverExsist,
    isRoomOn,
    setIsRoomOn,
    render,
    setRender,
    temp,
    setTemp,
    secondArr,
    addSecondArr,
    setSecondArr,
    roomDeparture,
    setRoomDeparture,
    roomArrival,
    setRoomArrival,
    roomHost,
    setRoomHost,
    roomDriver,
    setRoomDriver,
    roomPeople,
    setRoomPeople,
    isMaster,
    setIsMaster,
    clicked,
    setClicked,
    tempIdSave,
    setTempIdSave,
    searchWord,
    setSearchWord,
    contentEdit,
    setContentEdit,
    roomContent,
    setRoomContent,
    enteredPostId,
    setEnteredPostId,
    roomDriverId,
    setRoomDriverId,
    locationMaster,
    setLocationMaster,
    channelPg2,
    setChannelPg2,
    flag,
    setFlag,
    mapRender,
    setMapRender,
  } = ChannelStore();
  const [loading, setLoading] = useState(true);
  const { loggedId, setLoggedId } = MasterStore2();
  const { loggedRealId, setLoggedRealId } = MasterStore3();
  const { loggedNickname, setLoggedNickname } = MasterStore4();
  const [searchPagePick, setSearchPagePick] = useState(1);
  const [hostNickname, setHostNickname] = useState('');
  const [nowRoom, setNowRoom] = useState('');

  const createChannel = () => {
    setContent(null);
    document.getElementById('modalbox').style.display = 'block';
    mapRender.relayout();
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;`;
    document.getElementById('channelBox').style.cssText = `
    overflow: hidden;`;
  };

  const closeCreateChannel = () => {
    setContent(null);
    document.getElementById('modalbox').style.display = 'none';
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    document.getElementById('channelBox').style.cssText = '';
    setSearch('');
    setSearch2('');
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  };

  const regularChange = (e) => {
    setRegular(JSON.parse(e.currentTarget.value));
    console.log(regular);
  };

  const contentChange = (e) => {
    setContent(e.currentTarget.value);
    console.log(content);
  };

  const personnelChange = (e) => {
    setPersonnel(e.currentTarget.value);
    console.log(content);
  };

  const onChangeSearch = (event) => {
    setSearch(event?.target.value);
  };

  const onChangeSearch2 = (event) => {
    setSearch2(event?.target.value);
  };

  const closeSubModal = (event) => {
    setShowListD(false);
  };

  const closeSubModal2 = (event) => {
    setShowListA(false);
  };

  const closeRoom = (event) => {
    document.getElementById('channelBox').style.cssText = '';
    document.getElementById('header').style.cssText = ``;
    setIsRoomOn(false);
    setIsMaster(false);
    setClicked(false);
    setTempIdSave(null);
  };

  const showProfile = (event) => {
    setClicked(true);
  };

  const driverChange = (e) => {
    if (e.target.value === 'true') {
      setDriverExsist(true);
    } else {
      setDriverExsist(false);
    }
  };

  const showAttendeeProfile = async (id) => {
    try {
      const res = await axios({
        method: 'get',
        // url: `${process.env.REACT_APP_API_URL}/api/users/${id}?userId=${loggedRealId}`,
        url: `${process.env.REACT_APP_API_URL}/api/userProfile/${id}`,
        header: {
          withCredentials: true,
        },
      });
      const attendeeProfBox = document.createElement('div');
      attendeeProfBox.id = 'me';
      attendeeProfBox.style.cssText = `
        border: 0.5px solid orange;
        border-radius: 5%;
        width: 300px;
        background-color: white;
        height: 200px;
        position: fixed;
        margin-top: -280px;
        margin-left: 170px;
        font-family: 'S-CoreDream-3Light';
        padding: 20px;
        font-size: 25px;
      `;
      attendeeProfBox.innerHTML =
        '<div> 닉네임: ' +
        res.data.data.nickname +
        '</div>' +
        '<div> 평점: ' +
        res.data.data.rating +
        '</div>' +
        '<div> 성별: ' +
        (res.data.data.gender === true ? '남자' : '여자') +
        '</div>' +
        '<div> 자차: ' +
        (res.data.data.hasCar === true ? '있음' : '없음') +
        '</div>' +
        '<div> 운전가능여부: ' +
        (res.data.data.isDriver === true ? '가능' : '불가') +
        '</div>';
      attendeeProfBox.onclick = function (event) {
        event.stopPropagation();
        while (document.getElementById('temp').lastChild.id !== 'notMe') {
          document
            .getElementById('temp')
            .removeChild(document.getElementById('temp').lastChild);
        }
      };
      document.getElementById('temp').appendChild(attendeeProfBox);
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const showAttendeeProfile2 = async (id, roomid) => {
    try {
      console.log(document.getElementById(`hidden_${id}`).children);
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/api/userDA/${id}/${roomid}`,
        header: {
          withCredentials: true,
        },
      });
      const attendeeProfBox = document.createElement('div');
      attendeeProfBox.id = 'me';
      attendeeProfBox.style.cssText = `
        border: 0.5px solid orange;
        border-radius: 5%;
        width: 300px;
        background-color: white;
        height: 80px;
        position: fixed;
        margin-top: -180px;
        margin-left: 170px;
        font-family: 'S-CoreDream-3Light';
        padding: 20px;
        font-size: 15px;
      `;
      attendeeProfBox.innerHTML =
        '<div> 출발지: ' +
        document.getElementById(`hidden_${id}`).children[0].innerHTML +
        '</div>' +
        '<div> 목적지: ' +
        document.getElementById(`hidden_${id}`).children[1].innerHTML +
        '</div>';
      attendeeProfBox.onclick = function (event) {
        event.stopPropagation();
        while (document.getElementById('temp').lastChild.id !== 'notMe') {
          document
            .getElementById('temp')
            .removeChild(document.getElementById('temp').lastChild);
        }
      };
      document.getElementById('temp').appendChild(attendeeProfBox);
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const selectDriver = async (id, nickname) => {
    try {
      console.log(enteredPostId);
      console.log(id);
      console.log(loggedRealId);
      console.log(nickname);

      let confirm = window.confirm('해당유저를 운전자로 지정하시겠습니까?');
      if (confirm) {
        const res = await axios({
          method: 'patch',
          url: `${process.env.REACT_APP_API_URL}/api/driverChange`,
          data: {
            roomId: enteredPostId,
            driverId: id,
            driverNickname: nickname,
          },
          header: {
            withCredentials: true,
          },
        });

        console.log(res);

        alert('수정되었습니다.');
        window.location.reload();
      } else {
        return false;
      }
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const generateProfileBox = (id, roomid, nickname) => {
    const peopleId = id;
    if (clicked === true) {
      document
        .getElementById(tempIdSave)
        .removeChild(document.getElementById('temp'));
      setTempIdSave(id);
      const profBox = document.createElement('div');
      const profText1 = document.createElement('p');
      profText1.id = 'notMe';
      const profText2 = document.createElement('p');
      profText2.id = 'notMe';
      profBox.style.cssText = `
        border: 1px solid blue;
        border-radius: 5%;
        background-color: white;
          width: 150px;
          // height: 100px;
          position: fixed;
          margin-left: 100px;
          font-family: 'S-CoreDream-3Light';
          padding: 20px;
          z-index: 6;
        `;
      profBox.id = 'temp';
      profBox.onclick = function (event) {
        document
          .getElementById(id)
          .removeChild(document.getElementById('temp'));
        setClicked(false);
      };
      profText1.innerHTML = '<div>유저프로필</div>';
      profText1.onclick = function (event) {
        event.stopPropagation();
        showAttendeeProfile(peopleId);
      };
      profText2.innerHTML = '<div>개인 출발/도착지</div>';
      profText2.onclick = function (event) {
        event.stopPropagation();
        showAttendeeProfile2(peopleId, roomid);
      };
      profBox.appendChild(profText1);
      profBox.appendChild(profText2);
      if (isMaster === true) {
        const profText3 = document.createElement('p');
        profText3.id = 'notMe';
        profText3.innerHTML = '<div>운전자 지정</div>';
        profText3.onclick = function (event) {
          event.stopPropagation();
          selectDriver(peopleId);
        };
        profBox.appendChild(profText3);
      }
      document.getElementById(id).appendChild(profBox);
    } else {
      setTempIdSave(id);
      const profBox = document.createElement('div');
      const profText1 = document.createElement('p');
      profText1.id = 'notMe';
      const profText2 = document.createElement('p');
      profText2.id = 'notMe';
      profBox.style.cssText = `
          border: 1px solid blue;
          border-radius: 5%;
          background-color: white;
          // background-color: rgba(0, 0, 255, 0.2);
          width: 150px;
          // height: 100px;
          position: fixed;
          font-family: 'S-CoreDream-3Light';
          margin-left: 100px;
          padding: 20px;
          z-index: 6;
        `;
      profBox.id = 'temp';
      profBox.onclick = function (event) {
        document
          .getElementById(id)
          .removeChild(document.getElementById('temp'));
        setClicked(false);
      };
      profText1.innerHTML = '<div>유저프로필</div>';
      profText1.onclick = function (event) {
        event.stopPropagation();
        showAttendeeProfile(peopleId);
      };
      profText2.innerHTML = '<div>개인 출발/도착지</div>';
      profText2.onclick = function (event) {
        event.stopPropagation();
        showAttendeeProfile2(peopleId, roomid);
      };
      profBox.appendChild(profText1);
      profBox.appendChild(profText2);
      if (isMaster === true) {
        const profText3 = document.createElement('p');
        profText3.id = 'notMe';
        profText3.innerHTML = '<div>운전자 지정</div>';
        profText3.onclick = function (event) {
          event.stopPropagation();
          selectDriver(peopleId, nickname);
        };
        profBox.appendChild(profText3);
      }
      document.getElementById(id).appendChild(profBox);
      setClicked(true);
    }
  };

  const closeProfile = (event) => {
    console.log(event);
  };

  const enterChannel2 = async (channel) => {
    try {
      let {
        curpersonnel,
        id,
        hostRealId,
        hostNickname,
        departures,
        departuresLatitude,
        departuresLongitude,
        arrivals,
        arrivalsLatitude,
        arrivalsLongitude,
        content,
        driverNickname,
        hostId,
      } = channel;
      setNowRoom(id);
      let locationing = [];
      let d_xy = [];
      let a_xy = [];
      d_xy.push(departuresLatitude);
      d_xy.push(departuresLongitude);
      a_xy.push(arrivalsLatitude);
      a_xy.push(arrivalsLongitude);
      locationing.push([d_xy, a_xy, [departures, arrivals]]);
      setLocationMaster(locationing);
      setRoomDriverId(driverNickname);
      setEnteredPostId(id);
      document.getElementById('channelBox').style.cssText = `
    overflow: hidden;`;
      document.getElementById('header').style.cssText = `
    pointer-events: none;`;
      if (hostRealId == loggedRealId) {
        setIsMaster(true);
      }

      const res3 = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/api/enter/${id}`,
        header: {
          withCredentials: true,
        },
      });

      setRoomContent(content);
      setHostNickname(res3.data.data.hostNickname);
      setRoomHost(res3.data.data.hostRealId);
      setRoomDeparture(res3.data.data.departures);
      setRoomArrival(res3.data.data.arrivals);
      setRoomDriver(res3.data.data.driverNickname);

      console.log(res3.data.data);

      let tempArr = [];
      for (let j = 0; j < res3.data.data.mateList.length; j++) {
        let tempArr_1 = [];
        tempArr_1.push(res3.data.data.mateList[j].mateNickname);
        tempArr_1.push(res3.data.data.mateList[j].mateRealId);
        tempArr_1.push(res3.data.data.mateList[j].departures);
        tempArr_1.push(res3.data.data.mateList[j].arrivals);
        tempArr.push(tempArr_1);
      }
      console.log(tempArr);
      setRoomPeople(tempArr);

      if (!tempArr.flat(2).includes(loggedRealId)) {
        if (res3.data.data.personnel == res3.data.data.curpersonnel) {
          alert('인원이 가득 찼습니다');
          document.getElementById('channelBox').style.cssText = ``;
          document.getElementById('header').style.cssText = ``;
          setIsRoomOn(false);
          setIsMaster(false);
          return;
        }
        const letMeIn = {
          mateId: loggedId,
          mateRealId: loggedRealId,
          mateNickname: loggedNickname,
          mateListId: res3.data.data.mateListId,
          departures: departures,
          departuresLatitude: departuresLatitude,
          departuresLongitude: departuresLongitude,
          arrivals: arrivals,
          arrivalsLatitude: arrivalsLatitude,
          arrivalsLongitude: arrivalsLongitude,
        };
        console.log(letMeIn);
        let result = window.confirm('해당 채널에 입장하시겠습니까?');
        if (result) {
          const res1 = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/mateOn`,
            data: letMeIn,
            header: {
              withCredentials: true,
            },
          });

          let tempArr2 = [];
          tempArr2.push(res1.data.data.mateNickname);
          tempArr2.push(res1.data.data.mateRealId);
          tempArr2.push(res1.data.data.departures);
          tempArr2.push(res1.data.data.arrivals);
          tempArr.push(tempArr2);
          setRoomPeople(tempArr);
          setIsRoomOn(true);
        } else {
          document.getElementById('channelBox').style.cssText = ``;
          document.getElementById('header').style.cssText = ``;
          setIsRoomOn(false);
          setIsMaster(false);
        }
      } else {
        setIsRoomOn(true);
      }
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const realGetChannelData = async () => {
    setLoading(true);
    try {
      console.log(loggedId);
      console.log(loggedNickname);
      console.log(loggedRealId);
      setFlag(false);
      // const temp = 1;
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/api/pages/${1}`,
        header: {
          withCredentials: true,
        },
      });
      for (let i = 1; i <= pageArr.length; i++) {
        if (document.getElementById(`${i}`).id == 1) {
          document.getElementById(`${i}`).style.color = 'blue';
        } else {
          document.getElementById(`${i}`).style.color = 'black';
        }
      }

      // setChannelCount(res.data.data[res.data.data.length - 1].postId);
      channelNum = res.data.num;
      channelPages =
        channelNum % 10 === 0
          ? Math.floor(channelNum / 10)
          : Math.floor(channelNum / 10) + 1;
      setChannelPg(channelPages);
      setChannelArr(res.data.data);
      setChannelList(res.data.data);
      setFirstTake(true);
      setLoading(false);
      return res.data;
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const getPageChannel2 = async (e) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/api/pages/${e}`,
        header: {
          withCredentials: true,
        },
      });
      for (let i = 1; i <= pageArr.length; i++) {
        if (document.getElementById(`${i}`).id == e) {
          document.getElementById(`${i}`).style.color = 'blue';
        } else {
          document.getElementById(`${i}`).style.color = 'black';
        }
      }
      channelNum = res.data.num;
      channelPages =
        channelNum % 10 === 0
          ? Math.floor(channelNum / 10)
          : Math.floor(channelNum / 10) + 1;
      setChannelPg(channelPages);
      setChannelArr(res.data.data);
      document.getElementById('channelBox').scrollTo(0, 0);
      setChannelArr(res.data.data);
      return res.data;
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const openChannel2 = async () => {
    try {
      if (inputStartPoint === null) {
        alert('출발지를 정해주세요');
        return;
      }
      if (inputEndPoint === null) {
        alert('도착지를 정해주세요');
        return;
      }

      const channelData = {
        realId: loggedRealId,
        nickname: loggedNickname,
        userId: loggedId,
        driverId: driverExsist === true ? loggedRealId : null,
        title: '제목없음',
        departures: inputStartPoint,
        departuresLatitude: departuresLatitude,
        departuresLongitude: departuresLongitude,
        arrivals: inputEndPoint,
        arrivalsLatitude: arrivalsLatitude,
        arrivalsLongitude: arrivalsLongitude,
        personnel: personnel,
        content: content === null ? '내용없음' : content,
        regular: regular,
        // carpoolDate: today,
      };
      console.log(channelData);

      const res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/channelCreate`,
        data: channelData,
        header: {
          withCredentials: true,
        },
      });

      const mate = {
        mateId: loggedId,
        mateRealId: loggedRealId,
        mateNickname: loggedNickname,
        mateListId: res.data.mateListId,
        departures: inputStartPoint,
        departuresLatitude: departuresLatitude,
        departuresLongitude: departuresLongitude,
        arrivals: inputEndPoint,
        arrivalsLatitude: arrivalsLatitude,
        arrivalsLongitude: arrivalsLongitude,
      };
      const res2 = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/mateOn`,
        data: mate,
        header: {
          withCredentials: true,
        },
      });
      setInputStartPoint(null);
      setInputEndPoint(null);
      closeCreateChannel();
      realGetChannelData();

      return res.data;
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const realSearch = async (i) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/api/search/${searchWord}/${i}`,
        header: {
          withCredentials: true,
        },
      });
      if (res.data.data.length == 0) {
        alert('검색결과가 존재하지 않습니다');
        return;
      }
      channelNum = res.data.data.length;
      channelPages =
        channelNum % 10 === 0
          ? Math.floor(channelNum / 10)
          : Math.floor(channelNum / 10) + 1;
      setChannelPg2(channelPages);
      let tempAllArr = [];
      const reverseData = res.data.data.slice(0).reverse();
      for (let i = 0; i < channelPages; i++) {
        let tempStartNum = 0;
        let tempNum = 10;
        let tempArr = [];
        tempStartNum = tempNum * i;
        tempNum = tempNum * (i + 1);
        for (let j = tempStartNum; j < tempNum; j++) {
          if (reverseData[j] === undefined) {
            break;
          }
          tempArr.push(reverseData[j]);
        }
        tempAllArr = [...tempAllArr, tempArr];
        console.log(tempAllArr.flat(1));
        tempArr = [];
      }
      setChannelArr(tempAllArr.flat(1));
      setChannelList(tempAllArr.flat(1));
      setFlag(true);
    } catch (e) {
      if (e.response.status === 500) {
        alert('검색결과가 존재하지 않습니다');
      }
      console.log('error: ' + e);
    }
  };

  const changeWord = (e) => {
    setSearchWord(e.target.value);
  };

  const changeWord2 = (e) => {
    setRoomContent(e.target.value);
  };

  const editSwitch = async (e) => {
    try {
      if (contentEdit === false) {
        setContentEdit(true);
      } else {
        const res = await axios({
          method: 'patch',
          url: `${process.env.REACT_APP_API_URL}/api/channelContentPatch`,
          data: {
            channelId: enteredPostId,
            content: roomContent,
          },
          header: {
            withCredentials: true,
          },
        });
        setContentEdit(false);
      }
    } catch (e) {}
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (e.target.id === 'keyword1') {
        whichPoint = 'start';
        setShowListD(true);
        document.getElementById('submit_btn1').click();
      } else {
        whichPoint = 'end';
        setShowListA(true);
        document.getElementById('submit_btn2').click();
      }
    }
  };

  const pageGenerator = () => {
    for (let i = 1; i <= channelPg; i++) {
      if (i !== channelPg) {
        if (i == 1) {
          pageArr.push(
            <span
              id={i}
              style={{
                color: 'blue',
                fontSize: '25px',
                cursor: 'pointer',
                marginRight: '20px',
              }}
              onClick={() => {
                getPageChannel2(i);
              }}
            >
              {i}
            </span>,
          );
        } else {
          pageArr.push(
            <span
              id={i}
              style={{
                color: 'black',
                fontSize: '25px',
                cursor: 'pointer',
                marginRight: '20px',
              }}
              onClick={() => {
                getPageChannel2(i);
              }}
            >
              {i}
            </span>,
          );
        }
      } else {
        if (i == 1) {
          pageArr.push(
            <span
              id={i}
              style={{
                color: 'blue',
                fontSize: '25px',
                cursor: 'pointer',
              }}
              onClick={() => {
                getPageChannel2(i);
              }}
            >
              {i}
            </span>,
          );
        } else {
          pageArr.push(
            <span
              id={i}
              style={{
                color: 'black',
                fontSize: '25px',
                cursor: 'pointer',
              }}
              onClick={() => {
                getPageChannel2(i);
              }}
            >
              {i}
            </span>,
          );
        }
      }
    }
    return pageArr;
  };

  const searchPageGenerator = () => {
    for (let i = 1; i <= channelPg2; i++) {
      if (i !== channelPg2) {
        if (i == 1) {
          pageArr.push(
            <span
              id={i}
              style={{
                color: 'blue',
                fontSize: '25px',
                cursor: 'pointer',
                marginRight: '20px',
              }}
              onClick={() => {
                realSearch(i);
              }}
            >
              {i}
            </span>,
          );
        } else {
          pageArr.push(
            <span
              id={i}
              style={{
                color: 'black',
                fontSize: '25px',
                cursor: 'pointer',
                marginRight: '20px',
              }}
              onClick={() => {
                realSearch(i);
              }}
            >
              {i}
            </span>,
          );
        }
      } else {
        if (i == 1) {
          pageArr.push(
            <span
              id={i}
              style={{
                color: 'blue',
                fontSize: '25px',
                cursor: 'pointer',
              }}
              onClick={() => {
                realSearch(i);
              }}
            >
              {i}
            </span>,
          );
        } else {
          pageArr.push(
            <span
              id={i}
              style={{
                color: 'black',
                fontSize: '25px',
                cursor: 'pointer',
              }}
              onClick={() => {
                realSearch(i);
              }}
            >
              {i}
            </span>,
          );
        }
      }
    }
    return pageArr;
  };

  useEffect(() => {
    var markers = [];
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    container.style.width = '200px';
    container.style.height = '200px';
    container.style.marginTop = '20px';

    setMapRender(map);

    // map.relayout();

    const markerPosition = new window.kakao.maps.LatLng(
      38.2313466,
      128.2139293,
    );

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    const ps = new kakao.maps.services.Places();

    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const searchForm = document.getElementById('submit_btn1');
    searchForm?.addEventListener('click', function (e) {
      let keyword = document.getElementById('keyword1').value;
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        e.stopImmediatePropagation();
        alert('키워드를 입력해주세요!');
        setShowListA(false);
        setShowListD(false);
        return false;
      }
      whichPoint = e.target.classList[0];
      e.preventDefault();
      setShowListD(true);
      searchPlaces(whichPoint);
    });

    const searchForm2 = document.getElementById('submit_btn2');
    searchForm2?.addEventListener('click', function (e) {
      let keyword = document.getElementById('keyword2').value;
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        e.stopImmediatePropagation();
        alert('키워드를 입력해주세요!');
        setShowListA(false);
        setShowListD(false);
        return false;
      }
      whichPoint = e.target.classList[0];
      e.preventDefault();
      setShowListA(true);
      searchPlaces(whichPoint);
    });

    const findDA = document.getElementById('find');
    findDA?.addEventListener('click', function (e) {
      let findD = document.getElementById('findD').value;
      let findA = document.getElementById('findA').value;
      if (
        !findD.replace(/^\s+|\s+$/g, '') ||
        !findA.replace(/^\s+|\s+$/g, '')
      ) {
        e.stopImmediatePropagation();
        alert('출발지와 목적지를 모두 입력해주세요!');
        return false;
      }
      e.preventDefault();
      whichPoint = 'both';
      searchPlaces(whichPoint);
    });

    function searchPlaces(whichPoint) {
      let keyword = null;
      let findD = null;
      let findA = null;
      if (whichPoint === 'start') {
        keyword = document.getElementById('keyword1').value;
        ps.keywordSearch(keyword, placesSearchCB);
      } else if (whichPoint === 'end') {
        keyword = document.getElementById('keyword2').value;
        ps.keywordSearch(keyword, placesSearchCB);
      } else {
        findD = document.getElementById('findD').value;
        findA = document.getElementById('findA').value;

        function placesSearchCBD(data, status, pagination) {
          if (status === window.kakao.maps.services.Status.OK) {
            const dataD = data;
            console.log(dataD);
            const locationD = [dataD[0].x, dataD[0].y];
            const locationD_name = dataD[0].place_name;
            searchChannel('findD', locationD, locationD_name);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
          }
        }

        function placesSearchCBA(data, status, pagination) {
          if (status === window.kakao.maps.services.Status.OK) {
            const dataA = data;
            console.log(dataA);
            const locationA = [dataA[0].x, dataA[0].y];
            const locationA_name = dataA[0].place_name;
            searchChannel('findA', locationA, locationA_name);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
          }
        }

        ps.keywordSearch(findD, placesSearchCBD);
        ps.keywordSearch(findA, placesSearchCBA);
      }
    }

    function placesSearchCB(data, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        if (whichPoint === 'start') {
          const data1 = data;
          const pagination1 = pagination;
          displayPlaces(data1);
          displayPagination(pagination1);
          const bounds = new window.kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        } else if (whichPoint === 'end') {
          const data2 = data;
          const pagination2 = pagination;
          displayPlaces(data2);
          displayPagination(pagination2);
          const bounds = new window.kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    }

    const searchChannel = async (DorA, location, locationName) => {
      try {
        console.log('여기아니지?');
        if (DorA === 'findD') {
          completeXY.unshift(location);
          completeDA.unshift(locationName);
        } else {
          completeXY.push(location);
          completeDA.push(locationName);

          let tempArr1 = [];
          let R = 6372.8 * 1000;

          const latD1 = parseFloat(completeXY[0][0]);
          const latD2 = parseFloat(locationMaster[0][0][0]);
          const lonD1 = parseFloat(completeXY[0][1]);
          const lonD2 = parseFloat(locationMaster[0][0][1]);
          let dLat = ((latD2 - latD1) * Math.PI) / 180;
          let dLon = ((lonD2 - lonD1) * Math.PI) / 180;
          let a =
            Math.pow(Math.sin(dLat / 2), 2.0) +
            Math.pow(Math.sin(dLon / 2), 2.0) *
              Math.cos((latD1 * Math.PI) / 180) *
              Math.cos((latD2 * Math.PI) / 180);
          let c = 2 * Math.asin(Math.sqrt(a));
          let finalD = R * c;

          const latA1 = parseFloat(completeXY[1][0]);
          const latA2 = parseFloat(locationMaster[0][1][0]);
          const lonA1 = parseFloat(completeXY[1][1]);
          const lonA2 = parseFloat(locationMaster[0][1][1]);
          let ALat = ((latA2 - latA1) * Math.PI) / 180;
          let ALon = ((lonA2 - lonA1) * Math.PI) / 180;
          let a2 =
            Math.pow(Math.sin(ALat / 2), 2.0) +
            Math.pow(Math.sin(ALon / 2), 2.0) *
              Math.cos((latA1 * Math.PI) / 180) *
              Math.cos((latA2 * Math.PI) / 180);
          let c2 = 2 * Math.asin(Math.sqrt(a2));
          let finalA = R * c2;

          if (finalD <= 500 && finalA <= 500) {
            console.log('프로토타입');
          } else {
            alert('100미터 이내에 존재하는 주소가 아닙니다.');
            completeXY = [];
            completeDA = [];
          }
        }
      } catch (e) {
        console.log('error: ' + e);
        alert('검색결과가 없습니다');
      }
    };

    function displayPlaces(places) {
      if (whichPoint === 'start') {
        const listEl = document.getElementById('placesList1');
        const fragment = document.createDocumentFragment();
        removeAllChildNods(listEl);
        removeMarker();
        for (let i = 0; i < places.length; i++) {
          const placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x,
          );
          const marker = addMarker(placePosition, i);
          const itemEl = getListItem(i, places[i]);
          (function (marker, title) {
            window.kakao.maps.event.addListener(
              marker,
              'mouseover',
              function () {
                displayInfowindow(marker, title);
              },
            );

            window.kakao.maps.event.addListener(
              marker,
              'mouseout',
              function () {
                infowindow.close();
              },
            );

            itemEl.addEventListener('click', function (e) {
              displayInfowindow(marker, title);
              setPlace(places[i]);
              setSearch(places[i].place_name);
              setInputStartPoint(places[i].place_name);
              setDeparturesLatitude(places[i].x);
              setDeparturesLongitude(places[i].y);
              setShowListD(false);

              map.panTo(placePosition);
            });
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl);
        }

        listEl?.appendChild(fragment);
      } else if (whichPoint === 'end') {
        const listEl2 = document.getElementById('placesList2');
        const fragment = document.createDocumentFragment();
        removeAllChildNods(listEl2);
        removeMarker();
        for (let i = 0; i < places.length; i++) {
          const placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x,
          );
          const marker = addMarker(placePosition, i);
          const itemEl2 = getListItem2(i, places[i]);

          (function (marker, title) {
            window.kakao.maps.event.addListener(
              marker,
              'mouseover',
              function () {
                displayInfowindow(marker, title);
              },
            );

            window.kakao.maps.event.addListener(
              marker,
              'mouseout',
              function () {
                infowindow.close();
              },
            );

            itemEl2.addEventListener('click', function (e) {
              displayInfowindow(marker, title);
              setPlace(places[i]);
              setSearch2(places[i].place_name);
              setInputEndPoint(places[i].place_name);
              setArrivalsLatitude(places[i].x);
              setArrivalsLongitude(places[i].y);
              setShowListA(false);

              map.panTo(placePosition);
            });
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl2);
        }
        listEl2?.appendChild(fragment);
      }
    }

    function getListItem(index, places) {
      const el = document.createElement('li');
      el.style.cursor = 'pointer';

      let itemStr =
        '<span class="markerbg marker_ ' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        '   <h5>' +
        places.place_name +
        '</h5>';

      if (places.road_address_name) {
        itemStr +=
          '    <span>' +
          places.road_address_name +
          '</span>' +
          '   <span class="jibun gray">' +
          `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
              </img>` +
          places.address_name +
          '</span>';
      } else {
        itemStr += '    <span>' + places.address_name + '</span>';
      }

      itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

      el.innerHTML = itemStr;
      el.className = 'item';
      // console.log(itemStr);
      return el;
    }

    function getListItem2(index, places) {
      const el2 = document.createElement('li');
      el2.style.cursor = 'pointer';

      let itemStr =
        '<span class="markerbg marker_ ' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        '   <h5>' +
        places.place_name +
        '</h5>';

      if (places.road_address_name) {
        itemStr +=
          '    <span>' +
          places.road_address_name +
          '</span>' +
          '   <span class="jibun gray">' +
          `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
              </img>` +
          places.address_name +
          '</span>';
      } else {
        itemStr += '    <span>' + places.address_name + '</span>';
      }

      itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

      el2.innerHTML = itemStr;
      el2.className = 'item';

      return el2;
    }

    function addMarker(position, idx) {
      const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
      const imageSize = new window.kakao.maps.Size(36, 37);
      const imgOptions = {
        spriteSize: new window.kakao.maps.Size(36, 691),
        spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
        offset: new window.kakao.maps.Point(13, 37),
      };

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions,
      );

      const marker = new window.kakao.maps.Marker({
        position,
        image: markerImage,
      });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    }

    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    function displayPagination(pagination) {
      let paginationEl = null;
      let paginationEl2 = null;
      if (whichPoint === 'start') {
        const pagination1 = pagination;

        paginationEl = document.getElementById('pagination1');
        const fragment = document.createDocumentFragment();

        paginationEl.style.display = 'flex';
        paginationEl.style.justifyContent = 'center';
        paginationEl.style.marginTop = '-15px';
        while (paginationEl?.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (let i = 1; i <= pagination1.last; i++) {
          const el = document.createElement('a');
          el.style.textDecoration = 'none';
          if (i !== pagination1.last) {
            el.style.marginRight = '10px';
          }
          el.href = '#';
          el.innerHTML = String(i);
          el.id = 'el' + String(i);
          el.style.color = 'black';

          if (i === pagination1.current) {
            el.className = 'on';
            el.style.color = 'blue';
          } else {
            el.onclick = (function (i) {
              return function () {
                whichPoint = 'start';
                pagination1.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl?.appendChild(fragment);
      } else if (whichPoint === 'end') {
        const pagination2 = pagination;
        paginationEl2 = document.getElementById('pagination2');
        const fragment = document.createDocumentFragment();

        paginationEl2.style.display = 'flex';
        paginationEl2.style.justifyContent = 'center';
        paginationEl2.style.marginTop = '-15px';
        while (paginationEl2?.hasChildNodes()) {
          paginationEl2.removeChild(paginationEl2.lastChild);
        }

        for (let i = 1; i <= pagination2.last; i++) {
          const el2 = document.createElement('a');
          el2.style.textDecoration = 'none';
          if (i !== pagination2.last) {
            el2.style.marginRight = '10px';
          }
          el2.href = '#';
          el2.innerHTML = String(i);
          el2.id = 'el2' + String(i);
          el2.style.color = 'black';

          if (i === pagination2.current) {
            el2.className = 'on';
            el2.style.color = 'blue';
          } else {
            el2.onclick = (function (i) {
              return function () {
                whichPoint = 'end';
                pagination2.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el2);
        }
        paginationEl2?.appendChild(fragment);
      }
    }

    function displayInfowindow(marker, title) {
      const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

    function displayMarker(place) {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      window.kakao.maps.event.addListener(
        marker,
        'click',
        function (mouseEvent) {
          setPlace(place);
          infowindow.setContent(`
              <span>
              ${place.place_name}
              </span>
              `);
          infowindow.open(map, marker);
          const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
          map.panTo(moveLatLon);
        },
      );
    }

    setTimeout(function () {
      map.relayout();
    }, 1000);

    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      var latlng = mouseEvent.latLng;

      var markerPosition = new kakao.maps.LatLng(
        latlng.getLat(),
        latlng.getLng(),
      );

      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);

      kakao.maps.event.addListener(marker, 'click', function () {
        marker.setMap(null);
      });

      // if (startPoint === true) {
      //   var stDiv = document.getElementById("stpt");
      //   stDiv.innerHTML = latlng.getLat() + " / " + latlng.getLng();
      // }
      // if (startPoint === false) {
      //   var edDiv = document.getElementById("edpt");
      //   edDiv.innerHTML = latlng.getLat() + " / " + latlng.getLng();
      // }

      var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';
    });
  }, []);

  useEffect(() => {
    realGetChannelData();
  }, []);

  useEffect(() => {
    var markers = [];
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    container.style.width = '200px';
    container.style.height = '200px';
    container.style.marginTop = '20px';

    setMapRender(map);

    // map.relayout();

    const markerPosition = new window.kakao.maps.LatLng(
      38.2313466,
      128.2139293,
    );

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    const ps = new kakao.maps.services.Places();

    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const searchForm = document.getElementById('submit_btn1');
    searchForm?.addEventListener('click', function (e) {
      let keyword = document.getElementById('keyword1').value;
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        e.stopImmediatePropagation();
        alert('키워드를 입력해주세요!');
        setShowListA(false);
        setShowListD(false);
        return false;
      }
      whichPoint = e.target.classList[0];
      e.preventDefault();
      setShowListD(true);
      searchPlaces(whichPoint);
    });

    const searchForm2 = document.getElementById('submit_btn2');
    searchForm2?.addEventListener('click', function (e) {
      let keyword = document.getElementById('keyword2').value;
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        e.stopImmediatePropagation();
        alert('키워드를 입력해주세요!');
        setShowListA(false);
        setShowListD(false);
        return false;
      }
      whichPoint = e.target.classList[0];
      e.preventDefault();
      setShowListA(true);
      searchPlaces(whichPoint);
    });

    const findDA = document.getElementById('find');
    findDA?.addEventListener('click', function (e) {
      let findD = document.getElementById('findD').value;
      let findA = document.getElementById('findA').value;
      console.log(findD);
      console.log(findA);
      if (
        !findD.replace(/^\s+|\s+$/g, '') ||
        !findA.replace(/^\s+|\s+$/g, '')
      ) {
        e.stopImmediatePropagation();
        alert('출발지와 목적지를 모두 입력해주세요!');
        return false;
      }
      e.preventDefault();
      whichPoint = 'both';
      searchPlaces(whichPoint);
    });

    function searchPlaces(whichPoint) {
      let keyword = null;
      let findD = null;
      let findA = null;
      if (whichPoint === 'start') {
        keyword = document.getElementById('keyword1').value;
        ps.keywordSearch(keyword, placesSearchCB);
      } else if (whichPoint === 'end') {
        keyword = document.getElementById('keyword2').value;
        ps.keywordSearch(keyword, placesSearchCB);
      } else {
        findD = document.getElementById('findD').value;
        findA = document.getElementById('findA').value;

        function placesSearchCBD(data, status, pagination) {
          if (status === window.kakao.maps.services.Status.OK) {
            const dataD = data;
            const locationD = [dataD[0].x, dataD[0].y];
            const locationD_name = dataD[0].place_name;
            searchChannel('findD', locationD, locationD_name);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
          }
        }

        function placesSearchCBA(data, status, pagination) {
          if (status === window.kakao.maps.services.Status.OK) {
            const dataA = data;
            // console.log(dataA);
            const locationA = [dataA[0].x, dataA[0].y];
            const locationA_name = dataA[0].place_name;
            searchChannel('findA', locationA, locationA_name);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
          }
        }

        ps.keywordSearch(findD, placesSearchCBD);
        ps.keywordSearch(findA, placesSearchCBA);
      }
    }

    function placesSearchCB(data, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        if (whichPoint === 'start') {
          const data1 = data;
          const pagination1 = pagination;
          displayPlaces(data1);
          displayPagination(pagination1);
          const bounds = new window.kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        } else if (whichPoint === 'end') {
          const data2 = data;
          const pagination2 = pagination;
          displayPlaces(data2);
          displayPagination(pagination2);
          const bounds = new window.kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    }

    const searchChannel = async (DorA, location, locationName) => {
      try {
        if (DorA === 'findD') {
          completeXY.unshift(location);
          completeDA.unshift(locationName);
          console.log(completeXY);
          console.log(completeDA);
          if (completeXY.length == 2 && completeDA.length == 2) {
            let tempArr1 = [];
            let R = 6372.8 * 1000;
            const latD1 = parseFloat(completeXY[0][0]);
            const latD2 = parseFloat(locationMaster[0][0][0]);
            const lonD1 = parseFloat(completeXY[0][1]);
            const lonD2 = parseFloat(locationMaster[0][0][1]);
            let dLat = ((latD2 - latD1) * Math.PI) / 180;
            let dLon = ((lonD2 - lonD1) * Math.PI) / 180;
            let a =
              Math.pow(Math.sin(dLat / 2), 2.0) +
              Math.pow(Math.sin(dLon / 2), 2.0) *
                Math.cos((latD1 * Math.PI) / 180) *
                Math.cos((latD2 * Math.PI) / 180);
            let c = 2 * Math.asin(Math.sqrt(a));
            let finalD = R * c;

            const latA1 = parseFloat(completeXY[1][0]);
            const latA2 = parseFloat(locationMaster[0][1][0]);
            const lonA1 = parseFloat(completeXY[1][1]);
            const lonA2 = parseFloat(locationMaster[0][1][1]);
            let ALat = ((latA2 - latA1) * Math.PI) / 180;
            let ALon = ((lonA2 - lonA1) * Math.PI) / 180;
            let a2 =
              Math.pow(Math.sin(ALat / 2), 2.0) +
              Math.pow(Math.sin(ALon / 2), 2.0) *
                Math.cos((latA1 * Math.PI) / 180) *
                Math.cos((latA2 * Math.PI) / 180);
            let c2 = 2 * Math.asin(Math.sqrt(a2));
            let finalA = R * c2;

            if (finalD <= 500 && finalA <= 500) {
              const changedDA = {
                channelId: enteredPostId,
                userId: loggedRealId,
                departures: completeDA[0],
                departuresLatitude: completeXY[0][0],
                departuresLongitude: completeXY[0][1],
                arrivals: completeDA[1],
                arrivalsLatitude: completeXY[1][0],
                arrivalsLongitude: completeXY[1][1],
              };
              const res = await axios({
                method: 'patch',
                url: `${process.env.REACT_APP_API_URL}/api/personalDAChange`,
                data: changedDA,
                header: {
                  withCredentials: true,
                },
              });
              alert('변경 되었습니다.');
              window.location.reload();
              completeXY = [];
              completeDA = [];
            } else {
              alert('100미터 이내에 존재하는 주소가 아닙니다.');
              completeXY = [];
              completeDA = [];
            }
          } else {
            console.log('이건 버림');
          }
        } else {
          completeXY.push(location);
          completeDA.push(locationName);
          console.log(completeXY);
          console.log(completeDA);
          if (completeXY.length == 2 && completeDA.length == 2) {
            let tempArr1 = [];
            let R = 6372.8 * 1000;

            const latD1 = parseFloat(completeXY[0][0]);
            const latD2 = parseFloat(locationMaster[0][0][0]);
            const lonD1 = parseFloat(completeXY[0][1]);
            const lonD2 = parseFloat(locationMaster[0][0][1]);
            let dLat = ((latD2 - latD1) * Math.PI) / 180;
            let dLon = ((lonD2 - lonD1) * Math.PI) / 180;
            let a =
              Math.pow(Math.sin(dLat / 2), 2.0) +
              Math.pow(Math.sin(dLon / 2), 2.0) *
                Math.cos((latD1 * Math.PI) / 180) *
                Math.cos((latD2 * Math.PI) / 180);
            let c = 2 * Math.asin(Math.sqrt(a));
            let finalD = R * c;

            const latA1 = parseFloat(completeXY[1][0]);
            const latA2 = parseFloat(locationMaster[0][1][0]);
            const lonA1 = parseFloat(completeXY[1][1]);
            const lonA2 = parseFloat(locationMaster[0][1][1]);
            let ALat = ((latA2 - latA1) * Math.PI) / 180;
            let ALon = ((lonA2 - lonA1) * Math.PI) / 180;
            let a2 =
              Math.pow(Math.sin(ALat / 2), 2.0) +
              Math.pow(Math.sin(ALon / 2), 2.0) *
                Math.cos((latA1 * Math.PI) / 180) *
                Math.cos((latA2 * Math.PI) / 180);
            let c2 = 2 * Math.asin(Math.sqrt(a2));
            let finalA = R * c2;

            if (finalD <= 500 && finalA <= 500) {
              const changedDA = {
                channelId: enteredPostId,
                userId: loggedRealId,
                departures: completeDA[0],
                departuresLatitude: completeXY[0][0],
                departuresLongitude: completeXY[0][1],
                arrivals: completeDA[1],
                arrivalsLatitude: completeXY[1][0],
                arrivalsLongitude: completeXY[1][1],
              };
              const res = await axios({
                method: 'patch',
                url: `${process.env.REACT_APP_API_URL}/api/personalDAChange`,
                data: changedDA,
                header: {
                  withCredentials: true,
                },
              });
              alert('변경 되었습니다.');
              window.location.reload();
              completeXY = [];
              completeDA = [];
            } else {
              alert('100미터 이내에 존재하는 주소가 아닙니다.');
              completeXY = [];
              completeDA = [];
            }
          } else {
            console.log('이건 버림');
          }
        }
      } catch (e) {
        console.log('error: ' + e);
        alert('검색결과가 없습니다');
      }
    };

    function displayPlaces(places) {
      if (whichPoint === 'start') {
        const listEl = document.getElementById('placesList1');
        const fragment = document.createDocumentFragment();
        removeAllChildNods(listEl);
        removeMarker();
        for (let i = 0; i < places.length; i++) {
          const placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x,
          );
          const marker = addMarker(placePosition, i);
          const itemEl = getListItem(i, places[i]);
          (function (marker, title) {
            window.kakao.maps.event.addListener(
              marker,
              'mouseover',
              function () {
                displayInfowindow(marker, title);
              },
            );

            window.kakao.maps.event.addListener(
              marker,
              'mouseout',
              function () {
                infowindow.close();
              },
            );

            itemEl.addEventListener('click', function (e) {
              displayInfowindow(marker, title);
              setPlace(places[i]);
              setSearch(places[i].place_name);
              setInputStartPoint(places[i].place_name);
              setDeparturesLatitude(places[i].x);
              setDeparturesLongitude(places[i].y);
              setShowListD(false);

              map.panTo(placePosition);
            });
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl);
        }

        listEl?.appendChild(fragment);
      } else if (whichPoint === 'end') {
        const listEl2 = document.getElementById('placesList2');
        const fragment = document.createDocumentFragment();
        removeAllChildNods(listEl2);
        removeMarker();
        for (let i = 0; i < places.length; i++) {
          const placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x,
          );
          const marker = addMarker(placePosition, i);
          const itemEl2 = getListItem2(i, places[i]);

          (function (marker, title) {
            window.kakao.maps.event.addListener(
              marker,
              'mouseover',
              function () {
                displayInfowindow(marker, title);
              },
            );

            window.kakao.maps.event.addListener(
              marker,
              'mouseout',
              function () {
                infowindow.close();
              },
            );

            itemEl2.addEventListener('click', function (e) {
              displayInfowindow(marker, title);
              setPlace(places[i]);
              setSearch2(places[i].place_name);
              setInputEndPoint(places[i].place_name);
              setArrivalsLatitude(places[i].x);
              setArrivalsLongitude(places[i].y);
              setShowListA(false);

              map.panTo(placePosition);
            });
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl2);
        }
        listEl2?.appendChild(fragment);
      }
    }

    function getListItem(index, places) {
      const el = document.createElement('li');
      el.style.cursor = 'pointer';

      let itemStr =
        '<span class="markerbg marker_ ' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        '   <h5>' +
        places.place_name +
        '</h5>';

      if (places.road_address_name) {
        itemStr +=
          '    <span>' +
          places.road_address_name +
          '</span>' +
          '   <span class="jibun gray">' +
          `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
              </img>` +
          places.address_name +
          '</span>';
      } else {
        itemStr += '    <span>' + places.address_name + '</span>';
      }

      itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

      el.innerHTML = itemStr;
      el.className = 'item';
      // console.log(itemStr);
      return el;
    }

    function getListItem2(index, places) {
      const el2 = document.createElement('li');
      el2.style.cursor = 'pointer';

      let itemStr =
        '<span class="markerbg marker_ ' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        '   <h5>' +
        places.place_name +
        '</h5>';

      if (places.road_address_name) {
        itemStr +=
          '    <span>' +
          places.road_address_name +
          '</span>' +
          '   <span class="jibun gray">' +
          `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
              </img>` +
          places.address_name +
          '</span>';
      } else {
        itemStr += '    <span>' + places.address_name + '</span>';
      }

      itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

      el2.innerHTML = itemStr;
      el2.className = 'item';

      return el2;
    }

    function addMarker(position, idx) {
      const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
      const imageSize = new window.kakao.maps.Size(36, 37);
      const imgOptions = {
        spriteSize: new window.kakao.maps.Size(36, 691),
        spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
        offset: new window.kakao.maps.Point(13, 37),
      };

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions,
      );

      const marker = new window.kakao.maps.Marker({
        position,
        image: markerImage,
      });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    }

    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    function displayPagination(pagination) {
      let paginationEl = null;
      let paginationEl2 = null;
      if (whichPoint === 'start') {
        const pagination1 = pagination;

        paginationEl = document.getElementById('pagination1');
        const fragment = document.createDocumentFragment();

        paginationEl.style.display = 'flex';
        paginationEl.style.justifyContent = 'center';
        paginationEl.style.marginTop = '-15px';
        while (paginationEl?.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (let i = 1; i <= pagination1.last; i++) {
          const el = document.createElement('a');
          el.style.textDecoration = 'none';
          if (i !== pagination1.last) {
            el.style.marginRight = '10px';
          }
          el.href = '#';
          el.innerHTML = String(i);
          el.id = 'el' + String(i);
          el.style.color = 'black';

          if (i === pagination1.current) {
            el.className = 'on';
            el.style.color = 'blue';
          } else {
            el.onclick = (function (i) {
              return function () {
                whichPoint = 'start';
                pagination1.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl?.appendChild(fragment);
      } else if (whichPoint === 'end') {
        const pagination2 = pagination;
        paginationEl2 = document.getElementById('pagination2');
        const fragment = document.createDocumentFragment();

        paginationEl2.style.display = 'flex';
        paginationEl2.style.justifyContent = 'center';
        paginationEl2.style.marginTop = '-15px';
        while (paginationEl2?.hasChildNodes()) {
          paginationEl2.removeChild(paginationEl2.lastChild);
        }

        for (let i = 1; i <= pagination2.last; i++) {
          const el2 = document.createElement('a');
          el2.style.textDecoration = 'none';
          if (i !== pagination2.last) {
            el2.style.marginRight = '10px';
          }
          el2.href = '#';
          el2.innerHTML = String(i);
          el2.id = 'el2' + String(i);
          el2.style.color = 'black';

          if (i === pagination2.current) {
            el2.className = 'on';
            el2.style.color = 'blue';
          } else {
            el2.onclick = (function (i) {
              return function () {
                whichPoint = 'end';
                pagination2.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el2);
        }
        paginationEl2?.appendChild(fragment);
      }
    }

    function displayInfowindow(marker, title) {
      const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

    function displayMarker(place) {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      window.kakao.maps.event.addListener(
        marker,
        'click',
        function (mouseEvent) {
          setPlace(place);
          infowindow.setContent(`
              <span>
              ${place.place_name}
              </span>
              `);
          infowindow.open(map, marker);
          const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
          map.panTo(moveLatLon);
        },
      );
    }

    setTimeout(function () {
      map.relayout();
    }, 1000);

    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      var latlng = mouseEvent.latLng;

      var markerPosition = new kakao.maps.LatLng(
        latlng.getLat(),
        latlng.getLng(),
      );

      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);

      kakao.maps.event.addListener(marker, 'click', function () {
        marker.setMap(null);
      });

      // if (startPoint === true) {
      //   var stDiv = document.getElementById("stpt");
      //   stDiv.innerHTML = latlng.getLat() + " / " + latlng.getLng();
      // }
      // if (startPoint === false) {
      //   var edDiv = document.getElementById("edpt");
      //   edDiv.innerHTML = latlng.getLat() + " / " + latlng.getLng();
      // }

      var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';
    });
  }, [isRoomOn]);

  return (
    <Container>
      <GlobalStyle />
      <Suspense fallback={<PacmanLoader color="#000000" size={25} />}>
        <BoardBox>
          <SearchSection>
            <button
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '15%',
                backgroundColor: 'white',
                marginBottom: '8px',
                cursor: 'pointer',
                borderStyle: 'solid',
                borderColor: 'black',
                boxShadow: 'none',
                borderWidth: '1px',
              }}
              onClick={realGetChannelData}
            >
              <BiRefresh style={{ marginLeft: '-3.5px' }} />
            </button>

            <Searchbar
              placeholder="출발지or도착지"
              onChange={changeWord}
            ></Searchbar>
            <button
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '15%',
                backgroundColor: 'white',
                marginBottom: '8px',
                cursor: 'pointer',
                borderStyle: 'solid',
                borderColor: 'black',
                boxShadow: 'none',
                borderWidth: '1px',
              }}
              onClick={() => {
                realSearch(1);
              }}
            >
              <AiOutlineSearch style={{ marginLeft: '-4px' }} />
            </button>
          </SearchSection>
          <Assemble onClick={createChannel}>
            <img
              src={assemble1}
              alt="assemble"
              style={{ marginTop: '2px', height: '32px' }}
            />
          </Assemble>
          <ChannelBox id="channelBox">
            {loading === true ? (
              <Loading />
            ) : (
              channelList.map((channel) => {
                firstCount++;
                if (firstCount < 10) {
                  return (
                    <Channel
                      style={{
                        borderColor:
                          channel.regular === true ? 'blue' : 'orange',
                      }}
                      onClick={(e) => {
                        enterChannel2(channel);
                      }}
                    >
                      <ChannelFirstRow>
                        <FirstItem>
                          <div
                            style={{
                              fontSize: '30px',
                              fontStyle: 'italic',
                              fontFamily: 'establishRetrosansOTF',
                            }}
                          >
                            출발
                          </div>
                          {channel.departures}
                        </FirstItem>
                        <img
                          src={arrow}
                          alt="arrow"
                          style={{ height: '32px' }}
                        />
                        <FirstItem>
                          <div
                            style={{
                              fontSize: '30px',
                              fontStyle: 'italic',
                              fontFamily: 'establishRetrosansOTF',
                            }}
                          >
                            도착
                          </div>
                          {channel.arrivals}
                        </FirstItem>
                      </ChannelFirstRow>
                      <PersonnelSticker>
                        인원수 {channel.curpersonnel} / {channel.personnel}{' '}
                      </PersonnelSticker>
                      <ContactTool>
                        <BsMegaphone /> {channel.content}
                      </ContactTool>
                      {channel.regular === true ? (
                        <RegularSticker
                          style={{ WebkitTextStroke: '1px blue' }}
                        >
                          "정기"
                        </RegularSticker>
                      ) : (
                        <RegularSticker
                          style={{ WebkitTextStroke: '1px orange' }}
                        >
                          '비정기'
                        </RegularSticker>
                      )}
                    </Channel>
                  );
                }
              })
            )}
            {isRoomOn === true && (
              <RoomContainer>
                <Room id="room">
                  <ButtonX3 onClick={closeRoom}>X</ButtonX3>
                  <div style={{ marginBottom: '10px' }}>
                    방장: {hostNickname}({roomHost})
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    출발지: {roomDeparture}{' '}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    목적지: {roomArrival}{' '}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    운전자: {roomDriver === null ? '없음' : roomDriver}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    소통창구:
                    {isMaster ? (
                      contentEdit === false ? (
                        <>
                          {roomContent}{' '}
                          <span>
                            <button
                              style={{
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                height: '10px',
                              }}
                              onClick={() => {
                                editSwitch();
                              }}
                            >
                              <BiPencil
                                style={{
                                  fontSize: '15px',
                                  marginBottom: '-2px',
                                  marginLeft: '-7px',
                                }}
                              />
                            </button>
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            <input
                              placeholder={roomContent}
                              onChange={changeWord2}
                            ></input>
                          </span>{' '}
                          <span>
                            <button
                              style={{
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                height: '10px',
                              }}
                              onClick={editSwitch}
                            >
                              <BiPencil
                                style={{
                                  fontSize: '15px',
                                  marginBottom: '-2px',
                                  marginLeft: '-7px',
                                }}
                              />
                            </button>
                          </span>
                        </>
                      )
                    ) : (
                      <>
                        <span>{roomContent} </span>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <div style={{ marginBottom: '10px' }}>
                            개인 출발지 / 도착지 지정하기{' '}
                          </div>
                          <div
                            style={{
                              fontSize: '10px',
                              color: 'orange',
                              marginBottom: '10px',
                            }}
                          >
                            (채널의 출발/목적지에서 100m 이내 지점만 지정
                            가능해요)
                          </div>
                          <div>
                            <span>
                              <input
                                placeholder="출발"
                                style={{ borderRadius: '10px' }}
                                id="findD"
                              ></input>
                            </span>
                            <span>
                              <input
                                placeholder="도착"
                                style={{
                                  marginLeft: '10px',
                                  borderRadius: '10px',
                                }}
                                id="findA"
                              ></input>
                            </span>
                            <span>
                              <button
                                style={{
                                  borderRadius: '10px',
                                  marginLeft: '10px',
                                  backgroundColor: 'white',
                                }}
                                id="find"
                              >
                                {' '}
                                <TbArrowsExchange2 />
                              </button>
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div style={{ zIndex: 7 }}>
                    <div style={{ marginTop: '10px' }}>탑승자:</div>
                    <RoomPeopleBox>
                      {roomPeople.sort().map((people) => {
                        return (
                          <>
                            <RoomPeople
                              id={people[1]}
                              onClick={() => {
                                generateProfileBox(
                                  people[1],
                                  nowRoom,
                                  people[0],
                                );
                              }}
                            >
                              {people[0]}({people[1]})
                              <HiddenInfo id={`hidden_${people[1]}`}>
                                <div>{people[2]}</div>
                                <div>{people[3]}</div>
                              </HiddenInfo>
                            </RoomPeople>
                          </>
                        );
                      })}
                    </RoomPeopleBox>
                  </div>
                </Room>
              </RoomContainer>
            )}
            <ModalContainer id="modalbox">
              <ModalBox>
                <ButtonX1 onClick={closeCreateChannel}>X</ButtonX1>
                <FirstRow>
                  <StartPoint>
                    <div>&lt;출발지&gt;</div>
                    <div id="form">
                      <input
                        type="text"
                        value={search}
                        id="keyword1"
                        style={{ width: '50px', borderRadius: '5px' }}
                        onChange={onChangeSearch}
                        onKeyPress={handleOnKeyPress}
                      />
                      <button
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '5px',
                        }}
                        className="start"
                        id="submit_btn1"
                        type="submit"
                      >
                        <AiOutlineSearch />
                      </button>
                    </div>
                    {showListD ? (
                      <SubModal>
                        <ButtonX2 onClick={closeSubModal}>X</ButtonX2>
                        <PlaceList id="placesList1"></PlaceList>
                        <Pagination id="pagination1"></Pagination>
                      </SubModal>
                    ) : (
                      <div></div>
                    )}
                  </StartPoint>
                  <div id="map" searchPlace={place}></div>
                  <EndPoint>
                    &lt;도착지&gt;
                    <div id="form">
                      <input
                        type="text"
                        value={search2}
                        id="keyword2"
                        style={{ width: '50px', borderRadius: '5px' }}
                        onChange={onChangeSearch2}
                        onKeyPress={handleOnKeyPress}
                      />
                      <button
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '5px',
                        }}
                        className="end"
                        id="submit_btn2"
                        type="submit"
                      >
                        <AiOutlineSearch />
                      </button>
                    </div>
                    {showListA ? (
                      <SubModal2>
                        <ButtonX2 onClick={closeSubModal2}>X</ButtonX2>
                        <PlaceList id="placesList2"></PlaceList>
                        <Pagination id="pagination2"></Pagination>
                      </SubModal2>
                    ) : (
                      <div></div>
                    )}
                  </EndPoint>
                </FirstRow>
                <SecondRow>
                  <div></div>
                  운전자입니까? &nbsp;
                  <span>
                    네
                    <input
                      type="radio"
                      name="driverCheck"
                      value="true"
                      onChange={driverChange}
                    />
                    아니오
                    <input
                      type="radio"
                      name="driverCheck"
                      value="false"
                      defaultChecked="true"
                      onChange={driverChange}
                    />
                  </span>
                  <div>
                    정기
                    <input
                      type="radio"
                      name="genderCheck"
                      value="true"
                      defaultChecked={regular === true ? true : false}
                      onChange={regularChange}
                    />
                    비정기
                    <input
                      type="radio"
                      name="genderCheck"
                      value="false"
                      defaultChecked={regular === false ? true : false}
                      onChange={regularChange}
                    />
                  </div>
                  <div>
                    참가인원제한 &nbsp;
                    <input
                      style={{ backgroundColor: 'white', borderRadius: '5px' }}
                      type="number"
                      min="2"
                      max="47"
                      onChange={personnelChange}
                    ></input>
                  </div>
                  <div>
                    소통창구 &nbsp;
                    <input
                      style={{ backgroundColor: 'white', borderRadius: '5px' }}
                      onChange={contentChange}
                    ></input>
                  </div>
                </SecondRow>
                <button
                  style={{
                    marginTop: '10px',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                  }}
                  onClick={openChannel2}
                >
                  채널생성
                </button>
              </ModalBox>
            </ModalContainer>
          </ChannelBox>
          <ChannelPages>
            {flag === false ? pageGenerator() : searchPageGenerator()}
          </ChannelPages>
        </BoardBox>
      </Suspense>
    </Container>
  );
};

export default Board;
