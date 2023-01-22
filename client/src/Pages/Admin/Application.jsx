import React, { useState, useEffect, useRef } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { newForm } from '../../Api/AdminApi/AdminRequest'

function Application() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const imageRef = useRef(null);
    const Navigate = useNavigate()
    const [userName, setUserName] = useState({})
    const [application, setApplication] = useState({
        name: '', email: '',
        phone: '', designation: '', gender: '',
        image: '', course: []
    })

    console.log(application);
    console.log('application');

    const handleCheck = (event) => {
        var updatedList = [...application.course];
        if (event.target.checked) {
            updatedList = [...application.course, event.target.value];
        } else {
            updatedList.splice(application.course.indexOf(event.target.value), 1);
        }
        setApplication({ ...application, course: updatedList });
    };

    useEffect(() => {
        userAuthenticeted()
    }, [Navigate]);

    const userAuthenticeted = () => {
        axios.get("http://localhost:4000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            if (response.data.auth) {
                setUserName(jwtDecode(localStorage.getItem("token")));
                Navigate('/')
            }
            else Navigate("/login");
        });
    };




    const logout = () => {
        localStorage.removeItem('token');
        Navigate("/login");
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setApplication({
            ...application,
            [name]: value,
        })
    }


    const fileUpload = (e) => {
        setApplication({
            ...application,
            image: e.target.files[0]
        })
    }

    const applicationForm = async (e) => {
        // e.preventDefault()
        const formData = new FormData();
        for (let key in application) {
            formData.append(key, application[key])
        }
        console.log(formData);
        console.log('formDataxxxxx');


        newForm(formData).then(response => {
            if (response.data) {
                console.log(response.data);
                console.log('respons');
                // const { name, value = '' } = e.target
                // setApplication({
                //     [name]: '',
                //     image: value
                // })
                // setApplication({
                //     name: '', address: '', email: '',
                //     phone: '', company_name: '', Incubation: '',
                // })
                // imageRef.current.value = null;
            }
        }).catch(error => console.log(error))
    }


    return (
        <div>
            <main className='flex justify-center items-center w-full min-h-[100vh] py-5'>
                <div className="bg-white flex flex-col rounded-2xl shadow-2xl w-3/4">
                    <div className="w-full text-center py-2" >
                        <h2 className='text-3xl font-bold text-green-500 mb-2 uppercase'> Application for Employee </h2>
                        <div className='w-fit mx-auto'>
                            <div className=' bg-green-500 border-2 w-10 border-green-500 inline-block mb-2'></div>
                        </div>
                    </div>
                    <form autocomplete="off" onSubmit={handleSubmit(applicationForm)}>
                        <div className="grid-cols-1  w-full grid md:grid-cols-2 gap-2 p-5">
                            <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input type="text" {...register('name', { required: true })} value={application.name} onChange={handleChange} id="name" placeholder='Name *' className='bg-gray-100 outline-none text-sm flex-1 py-1' />
                            </div>
                            {errors.name && <p>name is required.</p>}


                            <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input type="text" {...register('email')} value={application.email} onChange={handleChange} id="email" placeholder='Email *' className='bg-gray-100 outline-none text-sm flex-1 py-1' />
                                {errors.email && <p>Email is required.</p>}
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input type="text"{...register('phone')} value={application.phone} onChange={handleChange} id="phone" placeholder='Phone no' className='bg-gray-100 outline-none text-sm flex-1 py-1' />
                                {errors.phone && <p>number is required.</p>}
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <select {...register('designation')} id="" className='bg-gray-100 outline-none text-sm flex-1 py-1' onChange={handleChange} required >
                                    <option value="hr">HR</option>
                                    <option value="manager">MANAGER</option>
                                    <option value="sales">SALES</option>
                                </select>
                                {errors.designation && <p>Designation is required.</p>}
                            </div>
                            <div>
                                <label htmlFor="" className='text-left'>Gender</label>
                                <div className="flex">
                                    <div className=' p-2 flex items-center pl-0'>
                                        <input type="radio" {...register('gender', { required: true })} value="male" onChange={handleChange} id="male" placeholder='' className=' ' />
                                        <label for="male" class="text-sm font-medium text-gray-900 ml-2 block" >Male</label>
                                    </div>
                                    <div className='p-2 flex items-center'>
                                        <input type="radio" {...register('gender', { required: true })} value="female" onChange={handleChange} id="female" placeholder='' className=' ' />
                                        <label for="female" class="text-sm font-medium text-gray-900 ml-2 block">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="" className='text-left'>Course</label>
                                <div className="flex">
                                    <div className=' p-2 flex items-center pl-0'>
                                        <input type="checkbox" name="course" value="mca" onChange={handleCheck} id="mca" placeholder='' className=' ' />
                                        <label for="mca" class="text-sm font-medium text-gray-900 ml-2 block" >MCA</label>
                                    </div>
                                    <div className='p-2 flex items-center'>
                                        <input type="checkbox" name="course" value="bca" onChange={handleCheck} id="bca" placeholder='' className=' ' />
                                        <label for="bca" class="text-sm font-medium text-gray-900 ml-2 block">BCA</label>
                                    </div>
                                    <div className='p-2 flex items-center'>
                                        <input type="checkbox" name="course" value="bsc" onChange={handleCheck} id="bsc" placeholder='' className=' ' />
                                        <label for="bsc" class="text-sm font-medium text-gray-900 ml-2 block">BSC</label>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-center mb-5'>
                                <input ref={imageRef} type="file" name="image" onChange={fileUpload} id="image" placeholder='Image' className='bg-gray-100 outline-none text-sm flex-1 py-1' required />
                            </div>



                        </div>
                        <div className='px-5 w-fit mx-auto pb-5'>
                            <button type='submit' className='border-2 text-green-500 border-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'>Submit</button>
                        </div>
                    </form>
                </div>
            </main>

        </div>
    )
}

export default Application
