import React, { useState, useEffect } from 'react';
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AdminLogin, AdminAuth } from '../../Api/AdminApi/AdminRequest'

function Login() {
    const Navigate = useNavigate()

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

    useEffect(() => {
        userAuthenticeted()
    }, [Navigate]);

    const [logErr, setLogErr] = useState({
        email: true,
        password: true,
        msg: ''
    })

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    console.log(login)
    console.log('login')

    const handleChange = (e) => {
        const { name, value } = e.target
        setLogin({
            ...login,
            [name]: value
        })
    }

    const loginForm = async (e) => {
        e.preventDefault()
        if (!login.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
            setLogErr({
                email: false,
                password: true,
                msg: 'Email is required'
            })
        } else if (login.password === '') {
            setLogErr({
                email: true,
                password: false,
                msg: 'Password is required'
            })
        } else {
            console.log(login)
            console.log('login')
            const { data } = await AdminLogin(login)
            if (data.passwordStatus === false) {
                setLogErr({
                    email: true,
                    password: false,
                    msg: 'The password that you entered is incorrect'
                })
            } else {
                if (data.auth === true) {
                    console.log('dsdsdsds');
                    localStorage.setItem('adminToken', data.adminToken)
                    setLogErr({
                        email: true,
                        password: true,
                        msg: ''
                    })
                    console.log('kitttiii');
                    Navigate('/')

                } else {
                    Navigate('/login')
                    console.log('llll');

                }
            }
        }
    }
    return (
        <div>
            <main className='flex justify-center items-center min-h-[100vh] bg-green-300'>
                <div className="bg-white rounded-2xl shadow-2xl flex w-1/3 max-w-4xl">
                    <div className='w-full p-5'>
                        <div className='text-left font-bold'>
                            <span className="text-green-500">REVA </span>NEST
                        </div>
                        <div className="py-10 text-center">
                            <h2 className='text-3xl font-bold text-green-500 mb-2'> Admin Login </h2>
                            <div className='w-fit mx-auto'>
                                <div className=' bg-green-500 border-2 w-10 border-green-500 inline-block mb-2'></div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='mx-auto w-[75%]'>
                                    <form onSubmit={loginForm}>
                                        <div className='bg-gray-100 p-2 flex items-center'>
                                            <EnvelopeIcon className='text-gray-400 m-2 h-6 w-6' />
                                            <input type="email" name="email" value={login.email} onChange={handleChange} id="email" placeholder='Email' className='bg-gray-100 outline-none text-sm flex-1' />
                                        </div>
                                        <p className='font-normal text-xs m-0  mb-3 text-left text-red-600'>{logErr.email ? '' : logErr.msg}</p>
                                        <div className='bg-gray-100 p-2 flex items-center'>
                                            <LockClosedIcon className='text-gray-400 m-2 h-6 w-6' />
                                            <input type="password" name="password" value={login.password} onChange={handleChange} id="password" placeholder='Password' className='bg-gray-100 outline-none text-sm flex-1' />
                                        </div>
                                        <p className='font-normal text-xs m-0   mb-5 text-left text-red-600'>{logErr.password ? '' : logErr.msg}</p>
                                        <button className='border-2 text-green-500 border-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'>Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}


export default Login
