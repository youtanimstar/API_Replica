import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';

const Layout = () => {
  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Navbar/>

      <Outlet />
      </div>
    </>
  )
}

export default Layout