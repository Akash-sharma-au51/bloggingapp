import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector(store=>store.user.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if (!user) {
      navigate("/login")
      
    }
  },[user,navigate])
  return (
    <div>
        dashboard
      
    </div>
  )
}

export default Dashboard
