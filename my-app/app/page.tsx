
import React  from 'react'
import Header from '@/app/Components/Header/Header'
import Login from '@/app/Components/LoginSystem/Login'
import Register from '@/app/Components/LoginSystem/Register'
import Home from '@/app/Components/HomeContent/Home'
import AddPost from '@/app/Components/HomeContent/AddPost'

function page() {

  return (
    <>
      <Login />
      <Register />
      <Header label={"Home"} />
      <AddPost placeHolder="what's going on?" isreply={false} />
      <Home />
      </>
  )
}

export default page