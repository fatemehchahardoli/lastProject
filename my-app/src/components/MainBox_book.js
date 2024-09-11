import React, { useEffect, useState } from 'react';
import Date_Component from './Date_Component';
import { useGetRoomsQuery } from '../redux/services/HotelApi';
import Room_details from './Room_details'
import AdTrump from '../image/ad/AdTrump.png'
import Footer from './Footer';



const MainBox_book = () => {


  const reserved = [];
  const inService = [];

  const { data: Rooms, error, isLoading } = useGetRoomsQuery('Rooms');

  return (
    <div className='MainBox_book'>
      <div className='main_book_Date'>
        <Date_Component reserved={reserved} inService={inService} />
        <h2>Select a Room</h2>
        <div>
          <select name="" id="">
            <option value="1"></option>
            <option value="2"></option>
          </select>
        </div>
        <div>
          {
            Rooms?.map((room, index) => (
              <div>
                <Room_details key={index} data={room} />
              </div>
            ))
          }
        </div> 
        <Footer />
      </div>
      <div className='your_stay'>

        <img src={AdTrump} alt="" />

      </div>
    </div>
  )
}

export default MainBox_book