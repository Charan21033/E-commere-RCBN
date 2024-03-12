import React, { useEffect, useState } from 'react'
import MainCarosel from '../../components/HomeCarosel/MainCarosel'
import HomeSectionCarosel from '../../components/HomeSectionCarosel/HomeSectionCarosel'



// import { api } from '../../../config/apiConfig'; 
import {lengha_choli} from "../../../Data/lengha_choli"
import {mens_kurta} from "../../../Data/mens_kurta"
import {women_jeans} from "../../../Data/Women-jeans"
import {white_shirt} from "../../../Data/white_shirt"
import {Dress} from "../../../Data/Womendress"
import {shoes} from "../../../Data/shoe"






const HomePage = () => {
 
//   const [mensKurta, setMensKurta] = useState([]);
//   const [WomenJeans, setWomenJeans] = useState([]);
//   const [mensShirts, setMensShirts] = useState([]);
//   const [ladiesCholi, setLadiesCholi] = useState([]);
//   const [beaut, setBeaut] = useState([]);
//   const [shoes, setShoes] = useState([]);

//   // console.log("homepage.js auth",auth)
  

  
  
//   useEffect(() => {
    
//     const fetchProducts = async () => {
//        try {
//          const responseBeautiful = await api.get('/api/products?category=lengha_choli');
//          const responseMensKurta = await api.get('/api/products?category=mens_kurta');
//          const responseWomenJeans = await api.get('/api/products?category=women_jeans');
//          const responseMensShirts = await api.get('/api/products?category=shirt');
//          const responseLadiesCholi = await api.get('/api/products?category=Dress');
//          const responseShoes = await api.get('/api/products?category=shoes');
   
//         //  Correctly handle the response objects
//          if (responseBeautiful && responseBeautiful.data) {
//           setBeaut(responseBeautiful.data);
//          }
//          if (responseMensKurta && responseMensKurta.data) {
//            setMensKurta(responseMensKurta.data);
//          }
//          if (responseWomenJeans && responseWomenJeans.data) {
//            setWomenJeans(responseWomenJeans.data);
//          }
//          if (responseMensShirts && responseMensShirts.data) {
//            setMensShirts(responseMensShirts.data);
//          }
//          if (responseLadiesCholi && responseLadiesCholi.data) {
//            setLadiesCholi(responseLadiesCholi.data);
//          }
//          if (responseShoes && responseShoes.data) {
//           setShoes(responseShoes.data);
//          }
   
//         //  console.log('Mens Kurta:', responseMensKurta.data);
//         //  console.log('Women Jeans:', responseWomenJeans.data);
//         //  console.log('Mens Shirts:', responseMensShirts.data);
//         //  console.log('Ladies Choli:', responseLadiesCholi.data);
//         //  console.log('shoes:', responseShoes.data);
//         //  console.log('Beautiful :', responseBeautiful.data);
//        } catch (error) {
//          console.error('Failed to fetch products:', error);
//        }
//     };
   
//     fetchProducts();
//    }, []);

  return (
    <div>
     
        <MainCarosel/> 
        <div className=' space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        <HomeSectionCarosel data={lengha_choli}  sectionName={"Lengha Choli"}/>
        <HomeSectionCarosel data={Dress}  sectionName={"Women Dress"}/>
        <HomeSectionCarosel data={women_jeans}  sectionName={"Women Jeans"}/>
        <HomeSectionCarosel data={shoes}  sectionName={"Fashion Shoes"}/>

            <HomeSectionCarosel data={mens_kurta} sectionName={"Men's Kurta"} />
            
            <HomeSectionCarosel data={white_shirt} sectionName={"Mens's Shirt"} />
            
           
        </div>   
        
       
        
    </div>
  )
}

export default HomePage