import React from 'react'
import Grid from '@mui/material/Grid'
import AdjustIcon from '@mui/icons-material/Adjust';
import{useNavigate} from "react-router-dom"

const OrderCard = ({ item , orderDate}) => {
  const navigate=useNavigate();
  // console.log( "item from odercard", {item})
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
 };
//  console.log("ordecardsfrwfrf",item)
  return (
    <div onClick={()=>navigate(`/product/${item.product._id}`)} 
    className='p-5 shadow-md  hover:shadow-2xl border'>
        <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
          <Grid item xs={6}>
                  <div className='flex cursor-pointer'>
                    <img className='w-[5rem] h-[5rem] object-cover object-top'
                     src={item.product?.imageUrl}
                    alt={item.product?.title}/>
                    <div className='ml-5 space-y-2'>
                    <p className=''>{item.product?.title}</p>
                    <p className='opacity-50 text-xs font-semibold'>{item.size}</p>
                    <p className='opacity-50 text-xs font-semibold'>{item.product?.color}</p>
            
                  </div>
                  </div>
                  
          </Grid>
          <Grid item xs={2}>
            <p className='font-thin text-green-600' >₹{item.product?. discountedPrice}/-</p>
            <p className='text-xs'>Ordered on: {formatDate(orderDate)}</p>
          </Grid>
          <Grid item xs={4}>
        {true && 
        <div><p>
        <AdjustIcon sx={{width:"15px",height:"15px"}}
        className='text-green-600 mr-2 text-sm' />
        <span>
            Deliverd on March 03
        </span>
     </p>
     <p className=' text-xs'>Your Items has Deliverd</p>
            </div>}
        {false && <p>
            <AdjustIcon sx={{width:"15px",height:"15px"}}
            className='text-green-600 mr-2 text-sm' />
            <span>
              Expected   Deliverd on March 03
            </span></p>}
          </Grid>
        </Grid>
    </div>
  )
}

export default OrderCard