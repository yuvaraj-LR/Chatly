import React from 'react'
import { Outlet } from 'react-router'

import "./AuthLayout.css";

const AuthLayout = () => {
  return (
    <section className='layout'>
        <Outlet />
    </section>
  )
}

export default AuthLayout