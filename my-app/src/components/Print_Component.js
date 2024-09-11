import React from 'react'
import '../style/Print_Component.scss'
import logo from '../image/Mediamodifier-Design.svg'

const Print_Component = ({ dataCookies, Rooms }) => {

    return (
        <div className='printContainer'>
            <div>
                <img src={logo} className='img' alt="" />
                <p className='title'>LA MAMOUNIA</p>
                <p className='country'>MARRAKECH</p>
            </div>
            <div>
                <div>
                    <h1>BOOKING CONFIRMATION</h1>
                    <div>
                        <address>Avenue Bad Jdid / 40040 / Marrakech-Medina / Maroc</address>
                        <p>Tel.:+212 524 388 600</p>
                        <p>informations@mamounia.com</p>
                    </div>
                </div>
                <div>
                    {dataCookies?.map((book) => (
                        <div className='printStay'>
                            <div>
                                <div>
                                    <h3>Check-in</h3>
                                    <p>After 3:00 PM</p>
                                    <p>{book.data.reserved[0]}</p>
                                </div>
                                <div>
                                    <h3>Check-out</h3>
                                    <p>Before 12:00 PM</p>
                                    <p>{book.data.reserved[book.data.reserved.length - 1]}</p>
                                </div>
                            </div>
                            {
                                Rooms?.map((room) =>
                                    room.id == book.id && <div>

                                        <div>
                                            <div>
                                                <h2>{book.data.first_name} {book.data.last_name}</h2>
                                            </div>
                                            <div>

                                                <i className="fa-solid fa-user"></i>
                                                <span>Adult : </span>
                                                <span>{book.data.adult}</span>

                                            </div>
                                            <div>

                                                <i className="fa-solid fa-children"></i>
                                                <span>Children : </span>
                                                <span>{book.data.children}</span>

                                            </div>
                                        </div>

                                        <div>
                                            <h3>Total :
                                                <div>
                                                    <span>{room.price * book.data.reserved.length} $</span>
                                                </div>
                                            </h3>
                                        </div>

                                        <div>
                                            <span>{room?.name}</span>
                                        </div>

                                    </div>)
                            }

                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Print_Component