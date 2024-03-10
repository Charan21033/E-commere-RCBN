import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCaroselData } from './MainCaroselData';
import {useNavigate} from "react-router-dom"




const MainCarosel = () => {
    const navigate = useNavigate()
    const handleClick =()=> navigate('/women/clothing/lengha_choli')
    
    const items = mainCaroselData.map((item)=><img className='cursor-pointer  mt-9 ' role='presentation'  src={item.image} alt=''/>)


   return ( <div onClick={handleClick} ><AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
        
    /> </div>
   )
   };

export default MainCarosel;