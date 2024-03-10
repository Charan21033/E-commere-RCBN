import {useDispatch,useSelector} from "react-redux"
import { getOrderById } from "../../../State/Order/Action"
import { updatePayment } from "../../../State/Payment/Action"
import {Alert,AlertTitle,Grid} from "@mui/material"
import OrderTracker from "../../Order/OrderTracker"
import AddressCard from "../AddressCard/AddressCard"
import {useState, useEffect} from "react"
import { useParams } from 'react-router-dom';

const PaymentSuccess =()=>{
    const [paymentId,setPaymentId] = useState()
    const [referenceId,setReferenceId]=useState()
    const [paymentStatus,setPaymentStatus]=useState();
    const {orderId}=useParams();

   const dispatch =useDispatch();
   const {order} =useSelector(store => store);

  //  console.log("order",order.order)

  useEffect(()=>{
    const urlParam =new URLSearchParams(window.location.search);
     
    setPaymentId(urlParam.get("razorpay_payment_id"))
    setPaymentStatus(urlParam.get("razorpay_payment_link_status"))

  },[])

  useEffect(()=>{
    if(paymentId){
        const data ={orderId,paymentId};
        if(orderId){
          dispatch(getOrderById(orderId));
          dispatch(updatePayment(data))
        }
      

    }
  },[orderId,paymentId,dispatch])

  return(
    <div className ="px-2 lg:px-36"> 
     <div className="flex flex-col justify-center items-center">
     <Alert
     variant="filled"
     severity="success"
     sx={{mb:6, width:"fit-content"}}
     >
        <AlertTitle>Payment Success</AlertTitle>
         Done!! Your Order Successfully Got Placed
     </Alert>
     </div>
 <OrderTracker activeStep={1} />
<Grid container className="space-y-14 py-5 pt-20">
    {order.order?.orderItems.map((item)=>
      <Grid container item className=" space-y-10"  
      sx={{alignItems:"center",justifyContent:"space-between"}}
      >
      {/* <Grid item xs={6} >
     <div className="flex items-center"> 
    <img className="w-[5rem] h-[5rem] object-cover object-top" src={item.product.imageUrl} alt={item.product.title} />
    
    <div className="flex items-center" >
       <p>{item.product.title} </p>
       <div className=" opacity-50 text-xs font-semibold space-y-3">
       <span>Size: {item.size}  </span>
       </div>
       <p>Seller : {item.product.brand}</p>
       <p>₹ {item.price} </p>
    </div>

     </div>
      </Grid> */}
      <Grid item xs ={6}  >
       <div className='flex items-center' >
            <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'> 
            <img className='w-full h-full object-cover object-top'
            src={item.product.imageUrl}
            alt={item.product.title}
            />
            </div>
            <div className='ml-5 space-y-1'>
                <p className='font-semibold'>{item.product.title}</p>
                <p className='opacity-70'>Size : {item.size},  {item.product.color}</p>
                <p className='opacity-70 mt-2'>Seller : {item.product.brand}</p>
           
            <div className='flex space-x-5 items-center  text-gray-900 pt-6'>
                 <p className='font-semibold'>Total Paid :
                 <span className=" font-normal text-green-600" > ₹{item.discountedPrice?item.discountedPrice:item.product.discountedPrice } </span>  
                </p>
                 {/* <p className=' opacity-50 line-through'>  ₹{item.price}</p> */}
                 {/* <p className='text-green-600 font-semibold'>{item.discountPercent?item.discountPercent:item.product.discountPercent}% Off</p> */}
            </div>
            </div>

            
             
            
        </div>

        </Grid>



     <Grid item> <span  className=" font-bold  pt-1 pb-1 text-blue-500 " >Delivery Address  </span>
          <AddressCard address={order.order?.shippingAddress} /> 
        </Grid>


      </Grid>
    
    
    
    )}
</Grid>

         </div>
  )

}

export default PaymentSuccess;