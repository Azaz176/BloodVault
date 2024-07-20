import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { message} from "antd";
import {useNavigate} from "react-router-dom"
import { getLoggedInUserName } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentUser } from '../redux/usersSlice';


function ProtectedPage({children}) {
    const {currentUser}= useSelector((state)=>state.users)
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const getCurrentUser=async()=>{
        try {
            const response= await GetCurrentUser()
            if(response.success){
                message.success(response.message)
                dispatch(SetCurrentUser(response.data))
            } else{
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
            
        }
    }
    useEffect(()=>{

        if(localStorage.getItem("token"))
            getCurrentUser();
        else
            navigate("/login")
    }, [])
  return (
    currentUser && <div>
        <h1>welcome{getLoggedInUserName(currentUser)}</h1>
        {children}
    </div>
  )
}

export default ProtectedPage