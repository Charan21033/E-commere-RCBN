import React from 'react'
import {Route,Routes} from "react-router-dom"
import HomePage from '../customer/pages/HomePage/HomePage'
import Cart from '../customer/components/Cart/Cart'
import Navigation from '../customer/components/Navigation/navigation'
import Footer from '../customer/components/Footer/Footer'
import Product from '../customer/components/Product/Product'
import ProductDetails from '../customer/components/ProductDetails/ProductDetails'
import Checkout from '../customer/components/Checkout/Checkout'
import Order from '../customer/Order/Order'
import OrderDetail from '../customer/Order/OrderDetail'
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess'
import AuthModal from '../customer/Auth/AuthModal'

const CustomerRoutes = () => {
  return (
    <div> 
        <div>
           <Navigation/>
        </div>
        <Routes>
            <Route path='/login' element={<HomePage/>}></Route>
            <Route path='/register' element={<HomePage/>}></Route>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<Product/>}></Route>
            <Route path='/product/:productId' element={<ProductDetails/>}></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path='/account/order' element={<Order/>}></Route>
            <Route path='/account/order/:orderId' element={<OrderDetail/>}></Route>
            <Route path="/payment/:orderId" element={<PaymentSuccess/>}></Route>
            
      
        {/* <Order/> */}
        {/* <OrderDetail/> */}
        </Routes>
        <div>
        <Footer/>
        </div>
    </div>
  )
}

export default CustomerRoutes