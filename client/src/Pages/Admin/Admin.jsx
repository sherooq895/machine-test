import React, { useEffect } from 'react'
import Header from '../../component/Header/Header';
import Navbar from '../../component/Navbar/Navbar';
import {Outlet, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AdminAuth } from '../../Api/AdminApi/AdminRequest'

function Admin() {
  const Navigate = useNavigate()

  useEffect(() => {
    userAuthenticeted()
  }, []);

  const userAuthenticeted = async () => {
    try {
      const { data } = await AdminAuth()
      console.log(data, 'dataaaaaaa')
      if (data.auth) Navigate('/')
      else Navigate("/login");
  } catch (error) {
      console.log(error, 'catch error');
  }
  };

 

  return (
    <div>
      <Header />
      <div className='w-full min-h-[90vh] flex grid-cols-12 lg:grid'>
            <Navbar />
            <div className='w-full col-span-10 p-4 '>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Admin



