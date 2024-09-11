import React, { useEffect, useRef, useState } from 'react'
import logo from '../image/Mediamodifier-Design.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'




const Header_book = () => {

    const menu_slide = useRef()
    const [menueVisible, setMenueVisible] = useState(false)
    const navigate = useNavigate();
    const [Logout, setLogOut] = useState(false)
    const cookies = new Cookies();
    const user = cookies.get('user')

    const menuOpen = () => {
        menu_slide.current.className = "menu_slide_active";
        setMenueVisible(true)
    }

    const menuClose = () => {
        function close() {
            setMenueVisible(false)
        }
        setTimeout(close, 900);
        menu_slide.current.className = "menu_slide";
    }

    const logout = () => {
        cookies.remove("user");
        setLogOut(true);
    }

    useEffect(() => {

    }, [Logout])

    return (
        <div className='header_book'>

            <div className='slide_Shadow' >
                <div className='title_mainBox'>
                    <img src={logo} className='img' alt="" />
                    <p className='title'>LA MAMOUNIA</p>
                    <p className='country'>MARRAKECH</p>
                </div>
            </div>

            <div className='menu'>
                <div className='menu_button'>
                    <label className='menu_label' onClick={menuOpen}>
                        <div className='menu_text_bar'></div>
                    </label>
                </div>
            </div>

            <div className='header_tab'>
                <ul>
                    <li>{user && <li>Hi {user?.name}</li>}</li>
                    {!user ? (<Link to={{ pathname: "/login" }}><li>Log In</li></Link>) : (<Link onClick={logout} to={{ pathname: "/" }}>Log Out</Link>)}
                </ul>
            </div>


            <div className='menu_slide' ref={menu_slide}>
                {menueVisible && (
                    <>
                        <div>
                            <div>
                                <button onClick={menuClose}>
                                    Close
                                </button>
                                <div>
                                    <p>LA MAMOUNIA</p>
                                    <p>MARRAKECH</p>
                                </div>
                            </div>
                            <div>
                                <Link to={{
                                    pathname: '/'
                                }}><p>HOME</p></Link>
                                <Link><p>RESTAURANTS</p></Link>
                                <Link><p>BARS</p></Link>
                            </div>
                        </div>
                        <div>

                        </div>
                    </>
                )
                }


            </div>
        </div>
    )
}

export default Header_book;