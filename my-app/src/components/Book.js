import React, { useEffect, useState } from 'react'
import Header_book from './Header_book';
import MainBox_book from './MainBox_book';
import { useLocation , useNavigate } from 'react-router-dom'


import '../style/Style_book.scss'


import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Book = () => {
  const loc = useLocation()

  useEffect(() => {
    gsap.to('.main_book', {
      y: 150,
      ease: "circ",
      scrollTrigger: {
        trigger: '.MainBox_book',
        start: "top 67%",
        end: "top 25%",
        scrub: 0.2
      }
    });
  }, [])

  useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
        /* you can also use 'auto' behaviour 
           in place of 'smooth' */
    });
}, [loc])

  return (
    <>
      <div className='main_body_book'>
        <Header_book />
        <div>
          <div className='main_book'>
          </div>
        </div>
        <MainBox_book />
      </div>
    </>


  )
}

export default Book