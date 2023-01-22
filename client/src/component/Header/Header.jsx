import React from 'react'
import { CpuChipIcon, BellIcon, UserCircleIcon  } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';


    function Header() {
  const Navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('adminToken');
    Navigate("/login");
  };
  return (
    <div className='bg-[#b4ffc1] w-full py-6 items-center justify-between flex px-12 shadow-md shadow-[#f2f2f2] '>
      <div className='items-center w-full justify-start flex space-x-4'>
        <CpuChipIcon className='w-6 h-6' />
        <h1 className='text-xl text-gray-900 font-medium'>Admin</h1>
      </div>

      <div className='items-center justify-end space-x-6 flex w-full'>
        <div className='flex gap-2 bg-green-300 py-2 px-3 rounded text-gray-700 font-semibold cursor-pointer justify-center items-center' onClick={logout}>
          <UserCircleIcon className='header-icon' /> Logout
        </div>
      </div>

    </div>
  )
}

export default Header
