import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useNavigate}from "react-router-dom"
import {useDispatch}from "react-redux"
import { login } from '../../State/Auth/Action'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate =useNavigate();
const handleSubmit=(event)=>{
  event.preventDefault()

    const data=new FormData(event.currentTarget);

    const userData={
      
      email:data.get("email"),
      password:data.get("password")
    }
    dispatch(login(userData))
    .then(() => {
      navigate("/");
      window.location.reload(); 
    }).catch((error) => {
      // console.error("Login failed:", error);
      // Handle login failure, e.g., show an error message
    });
    // console.log("userData",userData)
    
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
 <Grid container spacing={3}>
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
     Login
   </Button>
  </Grid>
  
   
 </Grid>
      </form>

      <div className='flex justify-center flex-col items-center' >
        <div className='py-3 flex items-center'>
          <p>Don't have an Account ?</p>
          <Button onClick={()=>navigate("/register")} 
          className='ml-5' size='small'
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm