import React, { useEffect } from 'react'
import AddressCard from '../components/AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import {Grid,Box} from '@mui/material'
import {deepPurple} from "@mui/material/colors"
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../State/Order/Action'

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  // console.log("orderId", orderId)
  
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId)); 
    }
 }, [ orderId,dispatch]);

 const {order} = useSelector(state => state.order);

//  console.log("order details",order)
 

  return (
    <div className='px:5 lg:px-20'>
      <div>
      <h1 className='font-bold text-xl py-7'> Delivery Address</h1>
      {order?.shippingAddress && <AddressCard address={order.shippingAddress} />}
      </div>
      <div className='py-20'>
        <OrderTracker activeStep={2}/>
      </div>
      <Grid className='space-y-5' container>
        {order?.orderItems?.map((item, index) => 
        <Grid item container className='shadow-xl rounded-md p-5 border' sx={{
          alignItems:"center",justifyContent:"space-between"
        }}> 
      <Grid item xs={6}>
         <div className='flex items-center space-x-4'>
          <img className='w-[5rem] h-[5rem] object-cover object-top'
         src={item.product.imageUrl} alt={item.product.title}          />
          <div className='space-y-2 ml-5'> 
            <p className='font-semibold'>{item.product.title}</p>
            <p className='space-x-5 opacity-50 text-xs font-semibold'><span>color: {item.product.color}</span> <span>Size :{item.size}</span> </p>
            
            <p>Seller: {item.product.brand}</p>
            <p>${item.product.price}/-</p>
          </div>
         </div>
     </Grid>
     <Grid item >
       <Box sx={{color:deepPurple[500]}}>
      <StarBorderIcon sx={{fontSize:"2rem"}} className="px-2 " />
      <span>Rate & Review Product</span>
       </Box>
     </Grid>

        </Grid>
        )}
        
        
      </Grid>
      
    </div>
  )
}

export default OrderDetail