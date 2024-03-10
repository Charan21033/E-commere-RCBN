import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import{useNavigate} from "react-router-dom"
import {useDispatch ,useSelector} from "react-redux"
import { getUser, register } from '../../State/Auth/Action'



const RegisterForm = () => {
 const navigate =useNavigate();
 const dispatch = useDispatch()
 const jwt =localStorage.getItem("jwt")
 const {auth} = useSelector(store =>store)


 useEffect(()=>{
  if(jwt){
    dispatch(getUser(jwt))
  }
  
 },[jwt,auth.jwt])



const handleSubmit=async (event)=>{
  event.preventDefault();

    const data=new FormData(event.currentTarget);

    const userData={
      firstName:data.get("firstName"),
      lastName:data.get("lastName"),
      email:data.get("email"),
      password:data.get("password")
    }
    try {
      await dispatch(register(userData))
      window.location.reload();
   } catch (error) {
      console.error("Registration failed:", error);
   }
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
 <Grid container spacing={3}>
  <Grid item xs={12} sm={6}>
    <TextField
    required
      id="firstName"
     autoComplete='given-name'
       label="First Name"
      name='firstName'
      fullWidth
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      id="lastName"
     autoComplete='given-name'
       label="Last Name"
      name='lastName'
      fullWidth
    />
  </Grid>
  <Grid item xs={12} >
    <TextField
    required
      id="email"
     autoComplete='email'
       label="Email"
      name='email'
      fullWidth
    />
  </Grid>
  <Grid item xs={12} >
    <TextField
    required
      id="password"
     autoComplete='password'
       label="Password"
      name='password'
      fullWidth
    />
  </Grid>
  <Grid item xs={12} >
   <Button className=" bg-[#9155FD] w-full"
   type='submit'
   variant='contained'
   size='large'
   sx={{padding:".8rem 0",bgcolor:"#9155FD"}}
   >
     Register
   </Button>
  </Grid>
  
   
 </Grid>
      </form>
      <div className='flex justify-center flex-col items-center' >
        <div className='py-3 flex items-center'>
          <p>if you have already account ?</p>
          <Button onClick={()=>navigate("/login")} 
          className='ml-5' size='small'
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm