import React, { useEffect, useRef } from 'react'
import '../style/Style.scss'
import logo from '../image/Mediamodifier-Design.svg'


const MainBox = () => {
    const vanish_title = useRef()
    const [scrollYPosition, setScrollYPosition] = React.useState(0);
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
        vanish_title.current.className = "title_mainBox_scolled"
    }
    useEffect(() => {
        if (scrollYPosition < 100) {
            vanish_title.current.className = "title_mainBox"
        }
    }, [scrollYPosition])

    
    return (
        <div className='mainBox'>
            <section>
                <div ref={vanish_title} className='title_mainBox'>
                    <img src={logo} className='img' alt="" />
                    <p className='title'>LA MAMOUNIA</p>
                    <p className='country'>MARRAKECH</p>
                </div>
                <div className='title_welcome'>
                    <p className='title'>Welcome to the very heart</p>
                    <p className='title'>of our story</p>
                </div>
            </section>
        </div>
    )
}

export default MainBox