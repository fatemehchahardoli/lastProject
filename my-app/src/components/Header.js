import React, { useEffect, useRef, useState } from 'react'
import '../style/Style.scss'
import logo from '../image/Mediamodifier-Design.svg'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'


const Header = () => {

    const vanish_title = useRef()
    const ref_Slide_Shadow = useRef()
    const menu_slide = useRef()
    const [scrollYPosition, setScrollYPosition] = React.useState(0);
    const [menueVisible, setMenueVisible] = useState(false);
    const [Logout, setLogOut] = useState(false)
    const cookies = new Cookies();
    const user = cookies.get('user')

    const handleScroll = () => {
        const newScrollYPosition = window.pageYOffset;
        setScrollYPosition(newScrollYPosition);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    if (scrollYPosition > 100) {
        ref_Slide_Shadow.current.className = "slide_Shadow_active"
        vanish_title.current.className = "title_mainBox_scolled"

    }
    useEffect(() => {
        if (scrollYPosition < 100) {
            ref_Slide_Shadow.current.className = "slide_Shadow";
            vanish_title.current.className = "title_mainBox";

        }
    }, [scrollYPosition])

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
        <div className='header_Home'>

            <div ref={ref_Slide_Shadow} className='slide_Shadow' >
                <div ref={vanish_title} className='title_mainBox'>
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
                                <Link to="book"><p>Book</p></Link>
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

export default Header