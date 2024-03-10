import React from 'react'
import Grid from '@mui/material/Grid'
import OrderCard from './OrderCard'

import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '../../State/Order/Action';


const orderStatus=[
    {lable:"On The Way",value :"on_the_way"},
    {lable:"Deliverd",value :"delivered"},
    {lable:"Cancelled",value:"cancelled"},
    {lable:"returned",value:"returned"}

]

const Order = () => {
  const dispatch = useDispatch();
  // const { userId } = useSelector(state => state.auth);

  useEffect(() => {
    
      dispatch(getOrderHistory()); 
    
 }, [ dispatch]);

 const { orders } = useSelector(state => state.order);

  // console.log("order",orders)




  return (
    <div className='mt-10 px-5 lg:px-10'>
        <Grid container sx={{justifyContent:"space-between"}}>
          <Grid item xs={2.5}>
            <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
              <h1 className='font-bold text-lg'>Filter</h1>
              <div className='space-y-4 mt-10'>
                <h1 className='font-semibold'>ORDER STATUS</h1>
      {orderStatus.map((option)=>  <div className='flex items-center'>
            <input defaultValue={option.value} type="checkbox" 
            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'/>

            <label className='ml-3 text-sm text-gray-600' htmlFor={option.value}>
                  {option.lable}
            </label>

        </div>)}

              </div>
            </div>

          </Grid>
          <Grid item xs={9}>
            <div className='space-y-5'>
            {orders?.map((order, index) => (
                <div key={index}>
                 {order.orderItems.map((item, itemIndex) => (
                    <OrderCard key={itemIndex} item={item} orderDate={order.orderDate} />
                  ))}
                </div>
              ))}
            </div>
         
          </Grid>
        </Grid>
    </div>
  )
}

export default Order