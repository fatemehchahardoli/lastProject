import React, { useState } from 'react'
import tripadvisorIcon from '../image/tripadvisor-logotype-svgrepo-com.png'
import logo from '../image/logo.svg'
import leading_Hotel from '../image/lhw_simplified_logoh_ko.png'


const Footer = () => {


  const [btnScrollvisible, setBtnScrollvisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500) {
      setBtnScrollvisible(true)
    }
    else if (scrolled <= 500) {
      setBtnScrollvisible(false)
    }
  };

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 

  window.addEventListener('scroll', toggleVisible); 

  return (
    <div className='footer'>
      <div className='footer_up'>
        <div>
          <div className='iconBox'>
            <div>
              <div><i class="fa-brands fa-facebook"></i></div>
              <div><i class="fa-brands fa-x-twitter"></i></div>
              <div><i class="fa-brands fa-instagram"></i></div>
            </div>
            <div>
              <div>
                <img src={tripadvisorIcon} alt="" />
              </div>
              <div><i class="fa-brands fa-youtube"></i></div>
              <div><i class="fa-brands fa-linkedin"></i></div>
            </div>
          </div>
        </div>

        <div className='logo'>
          <img src={logo} alt="" />
        </div>

        <div className='contact'>
          <div>
            <p>Avenue Bad Jdid</p>
            <p>40040Marrakech-MedinaMaroc</p>
            <p>Tel.:+212 524 388 600</p>
            <p>informations@mamounia.com</p>
          </div>
        </div>

      </div>
      <div className='shape'>
        <div></div>
        <div></div>
      </div>
      <div className='footer_down'>

        <div>
          <div>
            <div><a href="">ACCOMMODATION</a></div>
            <div><a href="">RESTAURANTS</a></div>
            <div><a href="">BARS</a></div>
            <div><a href="">TEA ROOMS</a></div>
            <div><a href="">SPA & WELLBEING</a></div>
            <div><a href="">EVENTS</a></div>
            <div><a href="">SHOPS</a></div>
            <div><a href="">SPECIAL OFFERS</a></div>
          </div>
        </div>

        <div>
          <div>
            <div><a href="">BOOK YOUR:</a></div>
            <div><a href="">STAY</a></div>
            <div><a href="">TABLE</a></div>
            <div><a href="">TREATMENT</a></div>
            <div><a href="">EVENTS</a></div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <img src={leading_Hotel} alt="" />
            </div>
            <div>
              <a href="">Since 1923</a>
              <a href="">Magazine</a>
              <a href="">Press</a>
            </div>
            <div>
              <a href="">E-brochure</a>
              <a href="">Videos gallery</a>
              <a href="">Photo gallery</a>
            </div>
            <div>
              <a href="">Careers</a>
              <a href="">Legal notice</a>
              <a href="">Confidentiality</a>
            </div>
            <div>
              <a href="">Contact</a>
              <a href="">Q&A</a>
              <a href="">Leaders Club</a>
            </div>
          </div>
        </div>
      </div>
      {btnScrollvisible && <div className="btn_scrollTop" onClick={scrollToTop}>
        <i class="fa-solid fa-arrow-up" ></i>
      </div>}
      
    </div>

  )
}

export default Footer;