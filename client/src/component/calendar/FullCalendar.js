import React, { useEffect } from 'react';
import './_styles.scss';
import { Icon } from '@iconify/react';
import { MdEnergySavingsLeaf } from 'react-icons/md';
import {
  format,
  parse,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from 'date-fns';
import styled from 'styled-components';
import { calenderStore, MasterStore3 } from '../store/store.js';
import axios from 'axios';
import Loading from '../Spinner';

const CalendarContainer = styled.div`
  width: 1500px;
  height: 450px;
  display: flex;
  justify-content: center;
  margin-top: -10px;
`;

const CellList = styled.div`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RenderHeader = (props) => {
  const { prevMonth, nextMonth, currentMonth } = calenderStore();

  return (
    <div>
      <div className="header row">
        <div className="col col-first">
          <span className="text">
            <span className="text month">{format(currentMonth, 'M')}월</span>
            {format(currentMonth, 'yyyy')}
          </span>
        </div>
        <div className="col col-center"></div>
        <div className="col col-end">
          <Icon
            icon="bi:arrow-left-circle-fill"
            style={{ color: 'blue' }}
            onClick={prevMonth}
          />
          <Icon
            icon="bi:arrow-right-circle-fill"
            style={{ color: 'blue' }}
            onClick={nextMonth}
          />
        </div>
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>,
    );
  }

  return <div className="days row">{days}</div>;
};

const RenderCells = () => {
  const {
    currentMonth,
    selectedDate,
    setSelectedDate,
    data,
    setData,
    setRow,
    row,
  } = calenderStore();

  const { loggedRealId } = MasterStore3();

  const carbonData = async () => {
    try {
      const thisYear = new Date();
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/api/calendar/${loggedRealId}`,
        header: {
          withCredentials: true,
        },
      });

      let datas = res.data.data;
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart);
      const endDate = endOfWeek(monthEnd);
      const rows = [];
      let days = [];
      let day = startDate;
      let formattedDate = '';
      while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
          const cloneDay = day;
          formattedDate = format(day, 'd');
          days.push(
            <div
              className={`col cell ${
                !isSameMonth(day, monthStart)
                  ? 'disabled'
                  : isSameDay(day, selectedDate)
                  ? 'selected'
                  : format(currentMonth, 'M') !== format(day, 'M')
                  ? 'not-valid'
                  : 'valid'
              }`}
              key={day}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
              id={cloneDay}
            >
              <span
                className={
                  format(currentMonth, 'M') !== format(day, 'M')
                    ? 'text not-valid'
                    : ''
                }
              >
                {formattedDate}
              </span>
              <CellList>
                {datas.length !== 0 &&
                  datas.map((dayData) => {
                    if (
                      dayData.day == day.getDate() &&
                      dayData.month == format(currentMonth, 'M') &&
                      dayData.year == format(currentMonth, 'yyyy')
                    ) {
                      let modify = parseInt(dayData.emissions / 10);
                      return (
                        <div
                          style={{
                            marginLeft: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <div style={{ color: 'green' }}>
                            -{(+dayData.emissions).toFixed(1)}Co2
                            <MdEnergySavingsLeaf
                              style={{ position: 'absolute', marginTop: '2px' }}
                            />
                          </div>
                          <div style={{ color: 'blue' }}>+{modify}p</div>
                        </div>
                      );
                    }
                  })}
              </CellList>
            </div>,
          );
          day = addDays(day, 1);
        }
        rows.push(
          <div className="row" key={day}>
            {days}
          </div>,
        );
        days = [];
      }
      setRow(rows);
      return <div className="body">{rows}</div>;
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  useEffect(() => {
    carbonData();
  }, [currentMonth]);

  return <div className="body">{row}</div>;
};

export const FullCalendar = () => {
  return (
    <CalendarContainer>
      <div className="calendar" style={{ width: '800px', height: '500px' }}>
        <RenderHeader />
        <RenderDays />
        <RenderCells />
      </div>
    </CalendarContainer>
  );
};
