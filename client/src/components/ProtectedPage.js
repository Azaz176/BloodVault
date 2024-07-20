import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { message} from "antd";


function ProtectedPage({children}) {

    const getCurrentUser=async()=>{
        try {
            const response= await GetCurrentUser()
            if(response.success){
                message.success(response.message)
            } else{
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
            
        }
    }
    useEffect(()=>{
        getCurrentUser();
    }, [])
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedPage