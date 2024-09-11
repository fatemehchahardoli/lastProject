import React, { useRef, useState } from 'react'
import '../style/Room_details.scss'
import { Link } from 'react-router-dom'
import disableScroll from 'disable-scroll';



const Room_details = (props) => {
  const { data } = props;


  const [imageAlbum, setImageAlbum] = useState([])
  const [count, setCount] = useState(0);
  const details = useRef(null)
  const [showAlbum, setShowAlbum] = useState(false)
  const [detailsBox, setDdetailsBox] = useState(false)

  const res = data.reserved;
  const ins = data.inService;

  const showAlbumHandler = () => {
    setImageAlbum(data.img)
    setShowAlbum(true);
    document.body.style.overflow = 'hidden'
    disableScroll.on();
  }

  const closeAlbumHandler = () => {
    setShowAlbum(false);
    document.body.style.overflow = 'visible';
    disableScroll.off();
  }
  const detailsHandler = () => {
    setDdetailsBox(true);
    document.body.style.overflow = 'hidden';
    disableScroll.on();
  }
  const closeDetailsHandler = () => {
    setDdetailsBox(false);
    document.body.style.overflow = 'visible';
    disableScroll.off();
  }

  return (
    <>
      <div className='main_Room_details'>
        <div className='Room_details_image_container'>
          <img src={data.img[0]} alt="" />
          <i className="fa-regular fa-images"
            onClick={showAlbumHandler}
            id={data.room_id}
          ></i>
        </div>

        <div className='Room_details_container'>
          <div className='Room_details_container_name'>
            <h3>{data.name}</h3>
            <h5>Sleeps : {data.Sleeps}</h5>
            <h4>{data.name}</h4>
            <p onClick={detailsHandler}>Room details</p>
          </div>
          <div className='Room_details_container_price'>
            <div>
              <div>{data.price} $</div>
              <div><h6>Per Night</h6></div>
              <div><h6>Excluding Taxes & Fees</h6></div>

              <Link to={{
                pathname: '/checkout',
              }} 
              state={{ reserved: res, inService: ins, data: data }}
              ><button>Book</button></Link>

            </div>
          </div>
        </div>

        {showAlbum && (
          <div className='showAlbum '>
            <i class="fa-solid fa-rectangle-xmark" id='close_icon' onClick={closeAlbumHandler}></i>
            <h2>{data.name}</h2>
            <div className='gallery'>
              {imageAlbum?.map((image) => (
                <div className='gallery-panel'>
                  <img src={image} alt="" />
                </div>
              ))}
            </div>
          </div>
        )
        }

        {
          detailsBox && (
            <div className='details'>
              <img src={data.img[0]} alt="" />
              <i className="fa-solid fa-rectangle-xmark" id='close_icon_details' onClick={closeDetailsHandler}></i>
              <h3>{data.name}</h3>
              <h4>Sleeps {data.Sleeps}</h4>
              <h4>Room Amenities</h4>
              <ul>
                {data.amenities.map((amenity) => (
                  <li>{amenity}</li>
                ))}
              </ul>
              <hr />
              <h3>{data.name}</h3>
              <p>{data.details}</p>
            </div>
          )
        }

      </div>

    </>

  )

}

export default Room_details