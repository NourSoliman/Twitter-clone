'use client'
import React from 'react'
import Header from './Components/Header/Header'
import Modal from './Components/Modals/Modal'
import {openDialog , closeDialog} from './Redux/dialog/Actions'
import { RootState } from './Redux/MainStore/rootReducer'
import { useSelector } from 'react-redux'
import Login from './Components/LoginSystem/Login'
import Register from './Components/LoginSystem/Register'
function page() {
  const {isLoginFormOpen} = useSelector((state :  RootState)=>state.dialog)

  return (
    <div>
      <Login />
      <Register />
      <Header label={"Home"} />

    </div>
  )
}

export default page