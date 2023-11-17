import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { MasterStore3 } from './store/store.js';
import { MdEnergySavingsLeaf } from 'react-icons/md';
import Loading from './Spinner.js';

const TodayContainer = styled.div`
  width: 1500px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodayLine = styled.div`
  display: flex;
  align-items: center;
  margin-left: 100px;
`;

const TodayLine2 = styled.div`
  display: flex;
  align-items: center;
  margin-right: 100px;
`;

const TodayBox = styled.div`
  width: 300px;
  height: 450px;
  border: 4px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Yoyak = styled.h3`
  font-family: 'Dosis', sans-serif;
`;

const Summary = styled.div`
  font-size: 25px;
  font-family: 'Tenada';
`;

const SummaryContent = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Today = (props) => {
  const { loggedRealId } = MasterStore3();

  const [lastDate, setLastDate] = useState('-/-/-');
  const [boxSwitch, setBoxSwitch] = useState(false);
  const [point, setPoint] = useState(0);
  const [point2, setPoint2] = useState(0);
  const [level, setLevel] = useState(0);
  const [level2, setLevel2] = useState(0);
  const [emission, setEmission] = useState(0);
  const [emission2, setEmission2] = useState(0);
  const [dataNone, setDataNone] = useState(false);

  const [loading, setLoading] = useState(true);

  const getToday = async () => {
    try {
      const res1 = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/api/today/${loggedRealId}`,
        header: {
          withCredentials: true,
        },
      });
      if (res1.data.status == 200) {
        setEmission(res1.data.todayData.emission);
        setPoint(res1.data.todayData.point);
        setLevel(res1.data.todayData.level);
      }

      return res1.data;
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const getLast = async () => {
    setLoading(true);
    try {
      const res1 = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/api/lastday/${loggedRealId}`,
        header: {
          withCredentials: true,
        },
      });

      if (res1.data.status == 200) {
        setLastDate(res1.data.todayData.lastDate);
        setEmission2(res1.data.todayData.emission);
        setPoint2(res1.data.todayData.point);
        setLevel2(res1.data.todayData.level);
      } else if (res1.data.status == 400) {
        setDataNone(true);
      }
      setLoading(false);
      return res1.data;
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  useEffect(() => {
    getToday();
    getLast();
  }, []);

  return (
    <>
      <TodayContainer>
        {boxSwitch === false ? (
          <>
            <Yoyak> Today's Summary</Yoyak>
            <TodayLine>
              <TodayBox>
                {loading === true ? (
                  <Loading />
                ) : (
                  <div>
                    <Summary>
                      <span style={{ color: 'blue' }}>LV</span>
                    </Summary>
                    <SummaryContent>
                      <span
                        style={{
                          fontSize: '45px',
                          fontFamily: 'Great Vibes',
                          fontWeight: 'bold',
                          background:
                            'linear-gradient(to right top, blue, black)',
                          color: 'transparent',
                          WebkitBackgroundClip: 'text',
                        }}
                      >
                        {level}
                      </span>
                    </SummaryContent>
                    <Summary>
                      오늘의 <span style={{ color: 'blue' }}>절약량</span>
                    </Summary>
                    <SummaryContent>
                      <span style={{ color: 'green', fontFamily: 'Dosis' }}>
                        {emission}
                      </span>{' '}
                      <span style={{ fontFamily: 'Dosis' }}>Co2</span>{' '}
                      <span style={{ position: 'relative' }}>
                        <MdEnergySavingsLeaf
                          style={{ position: 'absolute', marginTop: '4px' }}
                        />
                      </span>
                    </SummaryContent>
                    <Summary>
                      누적 <span style={{ color: 'blue' }}>포인트</span>
                    </Summary>
                    <SummaryContent>
                      <span style={{ color: 'orange', fontFamily: 'Dosis' }}>
                        {point}p
                      </span>
                    </SummaryContent>
                  </div>
                )}
              </TodayBox>
              <Icon
                onClick={() => {
                  setBoxSwitch(!boxSwitch);
                }}
                icon="bi:arrow-right-circle-fill"
                style={{
                  cursor: 'pointer',
                  width: '100px',
                  fontSize: '40px',
                  color: 'blue',
                }}
              />
            </TodayLine>
          </>
        ) : (
          <>
            <Yoyak> Last Summary</Yoyak>
            <TodayLine2>
              <Icon
                onClick={() => {
                  setBoxSwitch(!boxSwitch);
                }}
                icon="bi:arrow-left-circle-fill"
                style={{
                  cursor: 'pointer',
                  width: '100px',
                  fontSize: '40px',
                  color: 'blue',
                }}
              />
              <TodayBox>
                {dataNone ? (
                  <h2>최근 1년 데이터 없음</h2>
                ) : (
                  <>
                    {' '}
                    <Summary>
                      {lastDate}의 <span style={{ color: 'blue' }}>절약량</span>
                    </Summary>
                    <SummaryContent>
                      <span style={{ color: 'green', fontFamily: 'Dosis' }}>
                        {emission2}
                      </span>{' '}
                      <span style={{ fontFamily: 'Dosis' }}>Co2</span>{' '}
                      <span style={{ position: 'relative' }}>
                        <MdEnergySavingsLeaf
                          style={{ position: 'absolute', marginTop: '4px' }}
                        />
                      </span>
                    </SummaryContent>
                    <Summary>
                      누적 <span style={{ color: 'blue' }}>포인트</span>
                    </Summary>
                    <SummaryContent>
                      <span style={{ color: 'orange', fontFamily: 'Dosis' }}>
                        {point2}p
                      </span>
                    </SummaryContent>
                  </>
                )}
                {/* <Summary>
                  <span style={{ color: 'blue' }}>LV</span>
                </Summary>
                <SummaryContent>
                  <span
                    style={{
                      fontSize: '45px',
                      fontFamily: 'Great Vibes',
                      fontWeight: 'bold',
                      background: 'linear-gradient(to right top, blue, black)',
                      color: 'transparent',
                      WebkitBackgroundClip: 'text',
                    }}
                  >
                    {level2}
                  </span>
                </SummaryContent>
                <Summary>
                  {lastDate}의 <span style={{ color: 'blue' }}>절약량</span>
                </Summary>
                <SummaryContent>
                  <span style={{ color: 'green', fontFamily: 'Dosis' }}>
                    {emission2}
                  </span>{' '}
                  <span style={{ fontFamily: 'Dosis' }}>Co2</span>{' '}
                  <span style={{ position: 'relative' }}>
                    <MdEnergySavingsLeaf
                      style={{ position: 'absolute', marginTop: '4px' }}
                    />
                  </span>
                </SummaryContent>
                <Summary>
                  누적 <span style={{ color: 'blue' }}>포인트</span>
                </Summary>
                <SummaryContent>
                  <span style={{ color: 'orange', fontFamily: 'Dosis' }}>
                    {point2}p
                  </span>
                </SummaryContent> */}
              </TodayBox>
            </TodayLine2>
          </>
        )}
      </TodayContainer>
    </>
  );
};

export default Today;
