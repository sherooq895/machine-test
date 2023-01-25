import React from 'react'
// import {IoArrowBackOutline} from "react-icons/io5";
import { useNavigate } from "react-router-dom";


function Error() {

    let navigate =useNavigate()


    return (
        <div className='text-center flex justify-center items-center h-screen'>
            <div className='text-center'>

                <div className='w-full text-center flex items-center justify-center'>
                    <p className='font-bold text-[150px]'>4</p>
                    <img className='w-[140px]' src='https://res.cloudinary.com/damhcnu7n/image/upload/v1672669593/uploader/emoji_kifcaz.png' alt="png" />
                    <p className='font-bold text-[150px]'>4</p>
                </div>

                <p>Sorry, We couldn't find the page you're looking for</p>
                
                <p className='text-gray-500 text-light text-[15px] flex justify-center items-center text-sm mt-3 cursor-pointer' onClick={()=>{navigate('/')}}><span>Go back home</span> </p>

            </div>
        </div>
    )
}

export default Error