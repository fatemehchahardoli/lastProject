
import React, { useEffect, useRef, useState } from 'react'
import MultiSelect from './MultiSelect';
import { useLocation, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Calendar, DateObject } from "react-multi-date-picker"
import useDate from './useDate';
import Cookies from 'universal-cookie'
import { useUpdateRoomMutation, useGetCountryQuery, useCreateGuestsMutation, useGetRoomsQuery } from '../redux/services/HotelApi';
import { ToastContainer, toast } from 'react-toastify';
import ReactToPrint from "react-to-print";



import Header_book from './Header_book'
import Print_Component from './Print_Component';
import Footer from './Footer'
import '../style/checkout.scss'
import '../style/Date_Component.scss'
import '../style/toastify.scss'






const Checkout = () => {

    //--------------- Timer --------------------
    const Ref = useRef(null);

    //---------The state for our timer
    const [timer, setTimer] = useState();

    const getTimeRemaining = (e) => {
        const total =
            Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        return {
            total,
            minutes,
            seconds,
        };
    };

    const startTimer = (e) => {
        let { total, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };

    const clearTimer = (e) => {
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    const getDeadTime = () => {
        const deadline = new Date();
        const total1 = Date.parse(cookies.get('firstEnter')) + (1000 * 60 * 210)
        const seconds = Math.floor((total1 / 1000) % 60);
        const minutes = Math.floor(
            (total1 / 1000 / 60) % 60
        );
        deadline.setSeconds((seconds));
        deadline.setMinutes((minutes + 15));
        return deadline;
    };

    const onClickReset = () => {
        clearTimer(getDeadTime());
    };


    //--------- end Timer --------------------

    const { data: Rooms, roomError, roomIsLoading } = useGetRoomsQuery('Rooms');
    const { data: Countries, error, isLoading } = useGetCountryQuery();
    const [updateRoom, { isLoadingUpdateRoom }] = useUpdateRoomMutation();
    const cookies = new Cookies();
    var nameCountry = [];

    const history = useNavigate();
    const [adult, setAdult] = useState(0);
    const [children, setChildren] = useState(0);
    const loc = useLocation()
    const { reserved, inService, data } = loc.state;
    const [value, setValue] = useState([])
    const { searchin } = useDate(reserved, inService)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [isSectionChanged, setIsSectionChanged] = useState(true)
    const [isSuccess, setIsSuccess] = useState(true)
    const componentRef = useRef();
    const [showTimer, setShowTimer] = useState(false)
    const dataCookies = cookies.get('bookArray');
    const [Expiration_Minutes, set_Expiration_Minutes] = useState(false)

    const setFirstEnter = () => {
        if (cookies.get('firstEnter') == null) {
            const setDate = new Date()
            cookies.set('firstEnter', setDate)
        }
    }

    useEffect(() => {
        if (selectedRoom) {
            updateRoom({ url: 'Rooms', id: selectedRoom.id, room: selectedRoom })
            cookies.remove('Expiration_Minutes');
            setShowTimer(false);
            cookies.remove('firstEnter');
        }
    }, [selectedRoom]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
            /* you can also use 'auto' behaviour 
               in place of 'smooth' */
        });
    }, [loc]);

    const personNumberHandler = (event) => {

        switch (event.currentTarget.id) {
            case "adult_minus":
                if (adult > 0) {
                    setAdult((prev) => prev - 1)
                }
                break;
            case "adult_plus":
                setAdult((prev) => prev + 1)
                break;
            case "children_minus":
                if (children > 0) {
                    setChildren((prev) => prev - 1)
                }
                break;
            case "children_plus":
                setChildren((prev) => prev + 1)
                break;

            default:
                break;
        }
    };

    Countries?.map((country) => {
        const name = { value: country.name.common, label: country.name.common, customAbbreviation: country.flags.svg }
        nameCountry = [...nameCountry, name]
        nameCountry.sort(function (a, b) {
            return a.value.localeCompare(b.value)
        })
    });

    function isReserved(strDate) {
        for (let i = 0; i < reserved.length; i++) {
            const element = reserved[i];
            for (let j = 0; j < element.length; j++) {
                const date = element[j];
                if (strDate === date) {
                    return true
                }
            }
        }
    };

    function isInService(strDate) {
        for (let i = 0; i < inService.length; i++) {
            const element = inService[i];
            for (let j = 0; j < element.length; j++) {
                const date = element[j];
                if (strDate === date) {
                    return true
                }
            }
        }
    };

    const setToCookies = (values) => {

        setFirstEnter();

        //--------get data of calendar and push to newArray --------

        const newArray = []
        for (let i = 0; i < value.length; i++) {
            const dateRes = value[i].format();
            newArray.push(dateRes)
        }
        newArray.sort();

        //-------- create object of Guest --------

        const newGuests = {
            "first_name": values.firstName,
            "last_name": values.lastName,
            "phone_number": values.phoneNumber,
            "email_address": values.emailAddress,
            "adult": adult,
            "children": children,
            "reserved": newArray,
            "country": values.selectedOption
        }


        //-------- set data of guest in cookies --------
        if (dataCookies == null) {
            const bookArray = [];
            bookArray.push({
                data: newGuests,
                id: data.id
            })
            cookies.set('bookArray', bookArray)
            window.location.reload(true);
        }
        if (dataCookies.length !== 0) {
            const allBookArray = dataCookies
            allBookArray.push({
                data: newGuests,
                id: data.id
            })
            cookies.set('bookArray', allBookArray)
            window.location.reload(true);
        }
        if (dataCookies.length == 0) {
            const bookArray = [];
            bookArray.push({
                data: newGuests,
                id: data.id
            })
            cookies.set('bookArray', bookArray)
            window.location.reload(true);
        }
    };

    const Book = () => {
        dataCookies?.map((book) => {
            Rooms?.map((room) => {
                if (room.id == book.id) {
                    const newGuests = [...room.guests, book.data]
                    const newReserved = [...room.reserved , book.data.reserved ]
                    const updatedRoom = { ...room, guests: newGuests,  reserved: newReserved }
                    setSelectedRoom(updatedRoom)
                }
            })
        })
        if (!isLoadingUpdateRoom) {
            setIsSectionChanged(true)
            setIsSuccess(false)
            notify();
        }
    };

    const notify = () => toast.success('success', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });

    const goBack = () => {
        history(-1)
    };

    function refreshPage() {
        window.location.reload(false);
    };

    const secttionChangedHandle = () => {
        setIsSectionChanged(false)
    };
    var totalPriceNumber = 0;
    const total = () => {
        dataCookies?.map((book) => {
            Rooms?.map((room) => {
                if (room.id == book.id) {
                    totalPriceNumber += room.price * book.data.reserved.length;
                }
            })
        })
    };

    total();

    const deleteBookHandle = (event) => {
        const newCookies = dataCookies?.filter((book) => {
            return book.id != event.currentTarget.id
        })
        cookies.set('bookArray', newCookies)
        if (cookies.get('bookArray').length == 0) {
            cookies.remove('Expiration_Minutes')
        }
        if (dataCookies.length == 1) {
            cookies.remove('Expiration_Minutes');
            cookies.remove('firstEnter');
            onClickReset();
        }
        refreshPage();
    };

    useEffect(() => {
        if (dataCookies != null) {
            if (Expiration_Minutes == true && dataCookies.length >= 1) {
                const time = getDeadTime();
                const total2 =
                    Date.parse(time) - Date.parse(new Date());
                setTimeout(() => {
                    cookies.remove('Expiration_Minutes');
                    setShowTimer(false);
                    cookies.remove('bookArray');
                    cookies.remove('firstEnter');
                }, total2)
            }
        }
    }, [Expiration_Minutes])

    useEffect(() => {
        if (dataCookies != null) {
            if (dataCookies.length !== 0) {
                setShowTimer(true)
            }
            if (dataCookies.length == 1 && Expiration_Minutes == false) {
                let deadline = new Date();
                cookies.set('Expiration_Minutes', deadline.getMinutes());
            }
            set_Expiration_Minutes(true)
        }
    }, [dataCookies])

    const options = nameCountry;
    return (
        <div className='main_body_checkout'>
            <Header_book />
            {isSuccess ? (
                <div className='main_box_checkout'>
                    <div className='main_checkout'>
                        <div className='Guest_Information'>

                            {isSectionChanged ? (
                                <>
                                    <div>
                                        <div>
                                            <img src={data.img[0]} alt="" />
                                        </div>
                                        <div>
                                            <h2>{data.name}</h2>
                                        </div>
                                    </div>
                                    <div className='main_book_Date_headre'>
                                        <div>{value?.map((date) => (
                                            <div>{date.format()}</div>
                                        ))}</div>
                                    </div>
                                    <Calendar
                                        className="custom-calendar"
                                        minDate={new DateObject().set("day", new Date().getDate())}
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
                                    ></Calendar>
                                    <div className='clandar_bth'>
                                        <button
                                            id='Unselect'
                                            style={{ margin: "5px" }}
                                            onClick={() => setValue([])}
                                        >
                                            Unselect
                                        </button>
                                    </div>
                                    <Formik
                                        initialValues={{ firstName: "", lastName: "", phoneNumber: "", emailAddress: "", selectedOption: "", adult_number: "", Policy: false }}

                                        onSubmit={
                                            (values) => {
                                                setToCookies(values)
                                            }}
                                        validate={(values) => {

                                            const errors = {};

                                            const regEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'g')

                                            const regPhonenumber = new RegExp(/^(00)\d{10,15}$/, 'g')


                                            if (!values.firstName) {
                                                errors.firstName = "* Enter Your First Name"
                                            }

                                            if (!values.lastName) {
                                                errors.lastName = "* Enter Your Last Name"
                                            }
                                            if (!values.phoneNumber) {
                                                errors.phoneNumber = "* Enter Your Phone Number"
                                            }

                                            if (!regPhonenumber.test(values.phoneNumber.trim())) {
                                                errors.phoneNumber = "* Your Phone Number is not valid"
                                            }
                                            if (!values.emailAddress) {
                                                errors.emailAddress = "* Enter Your Email Address"
                                            }

                                            if (!regEmail.test(values.emailAddress.trim())) {
                                                errors.emailAddress = "* Your  email address is not valid"
                                            }
                                            if (adult == 0) {
                                                errors.adult_number = "* Enter The Number of Adult"
                                            }
                                            if (!values.selectedOption) {
                                                errors.selectedOption = "* Select Country"
                                            }
                                            if (!values.Policy) {
                                                errors.Policy = "* please verify the aggrement"
                                            }
                                            return errors;
                                        }}
                                    >

                                        <Form className='information'>

                                            <div>
                                                <h2>Guest Information</h2>
                                            </div>
                                            <div >
                                                <div className='input_container'>
                                                    <Field type="text" className='inpute_checkout'
                                                        id='name'
                                                        placeholder=' '
                                                        name="firstName"
                                                    />
                                                    <div className="cut"></div>
                                                    <label htmlFor="name" className='label_checkout'>First Name</label>
                                                    <ErrorMessage name="firstName" component="span" />

                                                </div>
                                                <div className='input_container'>
                                                    <Field type="text" className='inpute_checkout'
                                                        id='family'
                                                        placeholder=' '
                                                        name="lastName"
                                                    />
                                                    <div className="cut"></div>
                                                    <label htmlFor="family" className='label_checkout'>Last Name </label>
                                                    <ErrorMessage name="lastName" component="span" />

                                                </div>
                                            </div>
                                            <div>
                                                <div className='input_container'>
                                                    <Field type="text" className='inpute_checkout'
                                                        id='phone'
                                                        placeholder=' '
                                                        name="phoneNumber"
                                                    />
                                                    <div className="cut cut_short"></div>
                                                    <label htmlFor="phone" className='label_checkout'>Phone Number</label>
                                                    <ErrorMessage name="phoneNumber" component="span" />
                                                </div>
                                                <div className='input_container'>
                                                    <Field
                                                        type="text" className='inpute_checkout' placeholder=' '
                                                        id='email'
                                                        name="emailAddress"
                                                    />
                                                    <div className="cut cut_short"></div>
                                                    <label htmlFor="email" className='label_checkout'>Email Address</label>
                                                    <ErrorMessage name="emailAddress" component="span" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className='person_number'>
                                                    <div>
                                                        <h4>adult : </h4>
                                                        <div>
                                                            <button type='button' id='adult_minus' onClick={personNumberHandler}>
                                                                <i className="fa-solid fa-minus" ></i>
                                                            </button>
                                                            <Field
                                                                type="text" className='inpute_checkout'
                                                                id='adult_number'
                                                                placeholder=' '
                                                                name="adult_number"
                                                                value={adult}
                                                                readOnly="readonly"
                                                            >
                                                            </Field>
                                                            <button type='button' id='adult_plus' onClick={personNumberHandler}>
                                                                <i className="fa-solid fa-plus" ></i>
                                                            </button>
                                                        </div>
                                                        <ErrorMessage name="adult_number" component="span" />
                                                    </div>
                                                </div>
                                                <div className='person_number'>
                                                    <div>
                                                        <h4>children : </h4>
                                                        <div>
                                                            <button type='button' id='children_minus' onClick={personNumberHandler}>
                                                                <i className="fa-solid fa-minus" ></i>
                                                            </button>
                                                            <Field type="number"
                                                                id='children_number'
                                                                placeholder=' '
                                                                name="children_number"
                                                                value={children}
                                                                readOnly="readonly"
                                                            >
                                                            </Field>
                                                            <button type='button' id='children_plus' onClick={personNumberHandler}>
                                                                <i className="fa-solid fa-plus" ></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id='addressContainer'>
                                                <h4>Country :</h4>
                                                <div>
                                                    <Field
                                                        name="selectedOption"
                                                        id="country"
                                                        placeholder="--Select Country--"
                                                        isMulti={false}
                                                        component={MultiSelect}
                                                        options={options}
                                                    />
                                                    <ErrorMessage name="selectedOption" component="span" />
                                                </div>
                                            </div>
                                            <div className="policies">
                                                <h2>Policies : </h2>
                                                <div>
                                                    <div>
                                                        <h3>Check-in</h3>
                                                        <p>After 3:00 PM</p>
                                                    </div>
                                                    <div>
                                                        <h3>Check-out</h3>
                                                        <p>Before 12:00 PM</p>
                                                    </div>
                                                </div>
                                                <p>ROOM 1 CLASSIC TWIN ROOM</p>
                                                <h4>Guarantee Policy</h4>
                                                <p>
                                                    50% deposit within 72h for stays between 22/12 and 06/01 or stays equal or more than 250 000 MAD or for Prestige Suite, Exceptional Suites and Riad. Otherwise reservation will be automatically cancelled. 100% charge for no-show. </p>
                                                <h4>Cancel Policy</h4>
                                                <p>Free cancellation up to 7 days prior arrival, between 7 days and 24 hrs prior arrival 50% of the reservation amount will be due, beyond that 100% of the full stay amount will be due. In case of early check-out or no show, the full stay amount will be due. </p>
                                                <ul>
                                                    <li>
                                                        If you cancel your reservation from June 30, 2024 (local hotel time), you will be charged 100% of your total stay.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className='Acknowledgement'>
                                                <h2>Acknowledgement</h2>
                                                <p>By completing this booking, I agree with the Booking Conditions.</p>
                                                <div>
                                                    <Field
                                                        type="checkbox"
                                                        id="vehicle1"
                                                        name="Policy"
                                                    />
                                                    <p>I agree with the Privacy Terms.</p>
                                                </div>
                                                <ErrorMessage name="Policy" component="span" />
                                            </div>
                                            <div className='btn_submit'>
                                                <button type="submit" disabled={value?.length == 0}
                                                >{value.length == 0 ? <span>Please choice a date</span> : <span>Book</span>}</button>
                                            </div>
                                        </Form>
                                    </Formik>
                                </>
                            ) : (
                                <Formik
                                    initialValues={{ card_Number: "", Expiration_Date: "", cvv: "", card_Holder_Name: "" }}

                                    onSubmit={
                                        (values) => {
                                            Book(values);
                                        }
                                    }
                                // validate={(values) => {
                                //     const regCardnumber = new RegExp(/^\d{16,20}$/, 'g')
                                //     const errors = {};
                                //     if (!values.card_Number) {
                                //         errors.card_Number = "* Enter Your Credit Card Number"
                                //     }
                                //     if (!regCardnumber.test(values.card_Number)) {
                                //         errors.card_Number = "* Your Credit Card Number is not valid"
                                //     }

                                //     const regCardexpiration = new RegExp(/^(\d{2})['/'](\d{2})$/, 'g')
                                //     if (!values.Expiration_Date) {
                                //         errors.Expiration_Date = "* Enter Your Expiration Date"
                                //     }
                                //     if (!regCardexpiration.test(values.Expiration_Date)) {
                                //         errors.Expiration_Date = "* Your Expiration Date is not valid"
                                //     }

                                //     const regCardcvv = new RegExp(/^\d{3,4}$/, 'g')
                                //     if (!values.cvv) {
                                //         errors.cvv = "* Enter Your Security Code"
                                //     }
                                //     if (!regCardcvv.test(values.cvv)) {
                                //         errors.cvv = "* Your Security Code is not valid"
                                //     }

                                //     const regCardname = new RegExp(/^\D+$/, 'g')
                                //     if (!values.card_Holder_Name) {
                                //         errors.card_Holder_Name = "* Enter Your Name"
                                //     }

                                //     if (!regCardname.test(values.card_Holder_Name)) {
                                //         errors.card_Holder_Name = "* Your Name is not valid"
                                //     }
                                //     return errors;
                                // }}
                                >
                                    <div className='formPay'>
                                        <div>
                                            <h3>Payment Information</h3>
                                        </div>
                                        <Form className='Payment'>
                                            <div>
                                                <div>
                                                    <img src="https://be.synxis.com/public/images/Visa.png" alt="" />
                                                    <img src="https://be.synxis.com/public/images/DinersClub.png" alt="" />
                                                    <img src="https://be.synxis.com/public/images/Amex.png" alt="" />
                                                    <img src="https://be.synxis.com/public/images/DinersClub.png" alt="" />
                                                    <img src="https://be.synxis.com/public/images/JCB.png" alt="" />
                                                    <img src="https://be.synxis.com/public/images/EuroCard.png" alt="" />
                                                    <img src="https://be.synxis.com/public/images/ChinaUnionPay.png" alt="" />
                                                </div>
                                                <div className='inpute_container_creditCard'>
                                                    <Field
                                                        type="text" className='inpute_checkout'
                                                        id='cardNumber'
                                                        placeholder=' '
                                                        name="card_Number"
                                                    />
                                                    <div className="cut cut_short">                        </div>
                                                    <label htmlFor="name" className='label_checkout'>Card Number</label>
                                                    <ErrorMessage name="card_Number" component="span" />
                                                </div>
                                                <div>
                                                    <div className='inpute_container_creditCard'>
                                                        <Field
                                                            type="text" className='inpute_checkout'
                                                            id='cardNumber'
                                                            placeholder=' '
                                                            name="Expiration_Date"
                                                        />
                                                        <div className="cut cut_Expiration">                        </div>
                                                        <label htmlFor="name" className='label_checkout'>Expiration Date (MM/YY)</label>
                                                        <ErrorMessage name="Expiration_Date" component="span" />
                                                    </div>
                                                    <div className='inpute_container_creditCard'>
                                                        <Field
                                                            type="text" className='inpute_checkout'
                                                            id='cardNumber'
                                                            placeholder=' '
                                                            name="cvv"
                                                        />
                                                        <div className="cut cut_cvv">                        </div>
                                                        <label htmlFor="name" className='label_checkout'>CVV</label>
                                                        <ErrorMessage name="cvv" component="span" />
                                                    </div>
                                                </div>
                                                <div className='inpute_container_creditCard'>
                                                    <Field
                                                        type="text" className='inpute_checkout'
                                                        id='cardNumber'
                                                        placeholder=' '
                                                        name="card_Holder_Name"
                                                    />
                                                    <div className="cut cut_short">                        </div>
                                                    <label htmlFor="name" className='label_checkout'>Name on Card</label>
                                                    <ErrorMessage name="card_Holder_Name" component="span" />
                                                </div>

                                            </div>
                                            <div className='btn_submit'>
                                                <button type="submit">Pay</button>
                                            </div>
                                        </Form>
                                    </div>
                                </Formik>
                            )}

                        </div>
                    </div>
                    <div className='stay'>
                        {showTimer && (
                            <div className="timer">
                                <p>Expiration time of your reservation</p>
                                <p>{timer}</p>
                            </div>
                        )}
                        <h2>Your Stay</h2>
                        <div className='Check_div'>
                            <div>
                                <h3>Check-in</h3>
                                <p>After 3:00 PM</p>
                            </div>
                            <div>
                                <h3>Check-out</h3>
                                <p>Before 12:00 PM</p>
                            </div>
                        </div>

                        {dataCookies?.map((book) => (
                            <div className='book_reserved_data'>
                                {
                                    Rooms?.map((room) =>
                                        room.id == book.id && <div>

                                            <div className='main_book_Date_headre'>
                                                <div>
                                                    {book.data.reserved.map((reserve) => (
                                                        <div>{reserve}</div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <img src={room.img[0]} alt="" />
                                                <h3>
                                                    <div>
                                                        <div>
                                                            {room?.name}
                                                        </div>
                                                    </div>
                                                </h3>
                                            </div>

                                            <div>
                                                <div>
                                                    <span>{book.data.adult}</span><span>Adult</span>
                                                </div>
                                                <div>
                                                    <span>{book.data.children}</span><span>Children</span>
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
                                                <div className='button' onClick={deleteBookHandle} id={book.id}>

                                                    <i className="fa-regular fa-trash-can"></i>

                                                    <h3>Delete</h3>

                                                </div>
                                            </div>

                                        </div>)
                                }
                            </div>
                        )
                        )}
                        <div>
                            <div className='Add_room' onClick={goBack}>
                                <h3>Add Room</h3>
                            </div>
                            <h3 className='Total_price_h3'>Total Price :{totalPriceNumber} $</h3>
                            {cookies.get('bookArray') && isSectionChanged &&
                                <div className='Add_room' onClick={secttionChangedHandle}>
                                    <h3>Payment</h3>
                                </div>}
                        </div>
                    </div>

                </div>
            ) : (
                <div className='main_stay'>
                    <div className='staySuccessContainer'>

                        {dataCookies?.map((book) => (
                            <>
                                <div className='staySuccess'>
                                    <div>
                                        <h2>Your Stay</h2>
                                    </div>
                                    <div>
                                        <div>
                                            <h3>Check-in</h3>
                                            <p>After 3:00 PM</p>
                                        </div>
                                        <div>
                                            <h3>Check-out</h3>
                                            <p>Before 12:00 PM</p>
                                        </div>
                                    </div>
                                    <div className='book_reserved_data'>
                                        {
                                            Rooms?.map((room) =>
                                                room.id == book.id && <div>

                                                    <div className='main_book_Date_headre'>
                                                        <div>
                                                            {book.data.reserved.map((reserve) => (
                                                                <div>{reserve}</div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <img src={room.img[0]} alt="" />
                                                    </div>

                                                    <div>
                                                        <div>
                                                            <span>{book.data.adult}</span><span>Adult</span>
                                                        </div>
                                                        <div>
                                                            <span>{book.data.children}</span><span>Children</span>
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
                                                        {room?.name}
                                                    </div>
                                                </div>)
                                        }
                                    </div>
                                </div>

                            </>
                        )
                        )}
                    </div>
                    <div ref={componentRef} className='print_Toast'>
                        <Print_Component dataCookies={dataCookies} Rooms={Rooms} />
                    </div>
                    <ToastContainer
                        position="bottom-left"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    <ReactToPrint
                        trigger={() => <button id='print'>Book Print</button>}
                        content={() => componentRef.current}
                    />

                </div>
            )
            }

            <Footer />
        </div >
    )
}

export default Checkout