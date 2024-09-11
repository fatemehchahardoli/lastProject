
import React from 'react'
import MainBox from './MainBox';
import Header from './Header';
import Introduce from './Introduce';
import Footer from './Footer';

import '../style/Style.scss';


const Home = () => {
    return (
        <div>
            <div className='main_body'>
                <div className='main'>
                    <div className='shadow'>
                        <Header/>
                        <MainBox/>
                        <Introduce/>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;