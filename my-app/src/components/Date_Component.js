import React, { useState } from 'react';
import { Calendar } from "react-multi-date-picker"
import useDate from './useDate';

import '../style/Date_Component.scss'

export default function Date_Component({ reserved, inService }) {



  const initialValue = [...reserved, ...inService];

  function isReserved(strDate) {
    return reserved.some(([start, end]) => strDate >= start && strDate <= end);
  }

  function isInService(strDate) {
    return inService.some(([start, end]) => strDate >= start && strDate <= end);
  }

  const search = () => {

  }

  const addReserv = () => {

  }
  const [value, setValue] = useState([])

  const { searchin } = useDate(reserved, inService)


  return (
    <>
      <div className='main_book_Date_headre'>
        <div>{value?.map((date) => (
          <div>{date.format()}</div>
        ))}</div>
      </div>

      <Calendar
        className="custom-calendar"
        value={value}
        multiple
        dateSeparator=" To "
        numberOfMonths={2}
        onChange={(value) => {
          searchin(value)

          if (searchin(value)) {
            return false;
          }
          setValue(value)
        }
        }
        mapDays={({ date }) => {

          let className;
          const strDate = date.format();

          if (isReserved(strDate)) className = "reserved";
          if (isInService(strDate)) className = "in-service";
          if (className) return { className };


        }}

      >
      </Calendar>

      <div className='clandar_bth'>
        <button
          id='Unselect'
          style={{ margin: "5px" }}
          onClick={() => setValue(undefined)}
        >
          Unselect
        </button>

        <button
          id='Today'
          style={{ margin: "5px" }}
          onClick={() => setValue(new Date())}
        >
          Today
        </button>

        <button
          id='Search'
          style={{ margin: "5px" }}
          onClick={() => search()}
        >
          Search
        </button>
      </div>
    </>
  );
}