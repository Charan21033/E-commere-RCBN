import React from 'react'
import Grid from '@mui/material/Grid'
import AddressCard from '../AddressCard/AddressCard'
import {Button,Box} from '@mui/material'
import TextField from '@mui/material/TextField'
import {useDispatch} from "react-redux"
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
import { createOrder } from '../../../State/Order/Action'

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const{auth}= useSelector(store=>store)
  // const { auth } = useSelector(state => state.auth)
  // console.log("auth",auth.user)
  const navigate = useNavigate()
    const handleSubmit=(e)=>{
      e.preventDefault(); //for not refresing on submit
      
       const data = new FormData(e.currentTarget)
       const address1={
        firstName:data.get("firstname"),
        lastName:data.get("lastname"),
        streetAddress:data.get("address"),
        city:data.get("city"),
        state:data.get("state"),
        zipCode:data.get("zip"),
        mobile:data.get("phoneNumber")
       }
       const orderData ={address1,navigate}
       dispatch(createOrder(orderData))
      //  console.log("address",orderData)
    }
  return (
    <div>
        <Grid container spacing={4}>
            <Grid xs={12} lg={5} item className='border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll'>
            
              <span className=' '  >LAST ADDRESS</span>
              
                 <div className='p-5 py-7 border-b cursor-pointer'>
                {auth.user?.address?.map((item)=> <div className=' border gap-2 p-5' > <AddressCard address={item} /> </div>  )}
                {/* <Button sx={{mt:2,bgcolor:"RGB(145 85 253)"}} size='large' variant='contained' >
                  Deliver Here
                </Button> */}
                 </div>
            </Grid>
          
      <Grid item xs={12} lg={7}>
       <Box className="border rounded-s-md shadow-md p-5">
         <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <TextField
                required
                  id="firstName"
                  name='firstname'
                  label="First Name"
                  fullWidth
                  autoComplete='given-name'
                />             
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                required
                  id="lastName"
                  label="Last Name"
                  name='lastname'
                  fullWidth
                  autoComplete='off'
                />             
                </Grid>
                <Grid item xs={12} >
                <TextField
                required
                  id="address"
                  label="Address"
                  name='address'
                  fullWidth
                  autoComplete='off'
                  multiline
                  rows={4}
                />             
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                required
                  id="city"
                  label="City"
                  name='city'
                  fullWidth
                  autoComplete='off'
                />             
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                required
                  id="state"
                  label="State/Province/Region"
                  name='state'
                  fullWidth
                  autoComplete='off'
                />             
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                required
                  id="zip"
                  label="Zip /Postal code"
                  name='zip'
                  fullWidth
                  autoComplete='shipping postal-code'
                />             
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                required
                  id="PhoneNumber"
                  label="Phone Number"
                  name='phoneNumber'
                  fullWidth
                  autoComplete='given-number'
                />             
                </Grid>
                <Grid item xs={12} sm={6}>
                <Button sx={{py:1.5, mt:2,bgcolor:"RGB(145 85 253)"}} size='large' variant='contained'
                type='submit' >
             Deliver here
                </Button>
                </Grid>

            </Grid>
         </form>
       </Box>
      </Grid>
        </Grid>


    </div>
  )
}

export default DeliveryAddressForm