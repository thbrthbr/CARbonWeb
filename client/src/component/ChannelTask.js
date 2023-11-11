import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { MasterStore2, ChannelStore, MasterStore3 } from './store/store.js';
import postit from './img/postit.png';
import { useState } from 'react';
import Loading from './Spinner.js';

const Container = styled.div`
  overflow: auto;
  height: 450px;
  width: 1048px;
  margin-top: -2px;
  border: 2px solid orange;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChannelRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Temp = styled.div`
  border: 0.5px solid #c0c0c0;
  height: 200px;
  width: 150px;

  background-image: url(./img/postit.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ChannelItem = styled.div`
  height: 200px;
  width: 150px;
  margin-top: -250px;
  margin-left: 50px;
  font-family: 'S-CoreDream-3Light';
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 5;
`;

const Title = styled.div`
  font-size: 8px;
`;

const Contents = styled.div`
  margin-top: 30px;
  font-size: 8px;
`;

const DriverBox = styled.div`
  margin-top: 20px;
  height: 20px;
  width: 100px;
  font-size: 8px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PersonnelBox = styled.div`
  margin-top: 5px;
  height: 80px;
  width: 100px;
  font-size: 8px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonX = styled.button`
  margin-left: 130px;
  margin-top: 10px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ChannelTask = (props) => {
  const { loggedId } = MasterStore2();
  const { loggedRealId } = MasterStore3();
  const {
    myCarpools,
    setMyCarpools,
    forLayOut,
    setForLayOut,
    roomPeople,
    setRoomPeople,
  } = ChannelStore();

  const [loading, setLoading] = useState(false);

  const getChannels2 = async () => {
    setLoading(true);
    try {
      console.log(loggedId);
      console.log(loggedRealId);
      const res1 = await axios({
        method: 'get',
        url:
          // `${process.env.REACT_APP_API_URL}/api/carpools?userId=${loggedRealId}`,
          `http://localhost:8000/api/channels/${loggedRealId}`,
        header: {
          withCredentials: true,
        },
      });

      let tempArr = res1.data.data;
      setMyCarpools(tempArr.reverse());
      setLoading(false);
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const deleteChannel = async (channelId, hostId, num) => {
    try {
      if (hostId == loggedId) {
        let confirm = window.confirm('채널을 삭제하시겠습니까?');
        if (confirm) {
          const res2 = await axios({
            method: 'delete',
            url:
              // `${process.env.REACT_APP_API_URL}/api/posts?postId=${id}&userId=${loggedRealId}`,
              `http://localhost:8000/api/channels/${channelId}`,
            header: {
              withCredentials: true,
            },
          });
          if (res2.data.status == 200) {
            alert('채널이 삭제 되었습니다');
            getChannels2();
          }
        } else {
          return;
        }
      } else {
        let confirm = window.confirm('채널을 삭제하시겠습니까?');
        if (confirm) {
          alert('권한이 없습니다.');
        }
      }
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  useEffect(() => {
    getChannels2();
  }, []);

  return (
    <Container>
      {loading === true ? (
        <Loading />
      ) : (
        <ChannelRow>
          {myCarpools.map((channel) => {
            return (
              <div style={{ position: 'relative' }}>
                <div>
                  <img
                    src={postit}
                    style={{ height: '300px', width: '250px' }}
                  />
                </div>
                <ChannelItem>
                  <ButtonX
                    onClick={(e) => {
                      deleteChannel(
                        channel.channelId,
                        channel.hostId,
                        channel.mateList.length,
                      );
                    }}
                  >
                    x
                  </ButtonX>
                  <Title>{channel.departures}</Title>
                  <Title>-&gt;</Title>
                  <Title>{channel.arrivals}</Title>
                  <DriverBox>
                    운전자:{' '}
                    {channel.driverNickname === null
                      ? ' 없음'
                      : channel.driverNickname}
                  </DriverBox>
                  <PersonnelBox>
                    탑승자:
                    {channel.mateList.map((person) => {
                      return <div>{person.mateNickname}</div>;
                    })}
                  </PersonnelBox>
                </ChannelItem>
              </div>
            );
          })}
        </ChannelRow>
      )}
    </Container>
  );
};

export default ChannelTask;
