import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { newForm } from '../../Api/AdminApi/AdminRequest'
import { AdminAuth } from '../../Api/AdminApi/AdminRequest'

function Application() {

    const Navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const imageRef = useRef(null);

    const [fileErr, setFileErr] = useState('');
    const [formErr, setFormErr] = useState('');
    const [application, setApplication] = useState({
        name: '', email: '',
        phone: '', designation: '', gender: '',
        image: '', course: ''
    })

    const handleCheck = (event) => {
        // var updatedList = [...application.course];
        // if (event.target.checked) {
        //     updatedList = [...application.course, event.target.value];
        // } else {
        //     updatedList.splice(application.course.indexOf(event.target.value), 1);
        // }
        // setApplication({ ...application, course: updatedList });
        setApplication({
            ...application,
            course: event.target.value
        })
    };

    useEffect(() => {
        AdminAuthenticeted()
    }, [Navigate]);
    const AdminAuthenticeted = async () => {
        const { data } = await AdminAuth()
        if (data.auth) Navigate('/createEmployee')
        else Navigate("/login");
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setApplication({
            ...application,
            [name]: value,
        })
    }


    const fileUpload = (e) => {
        const isValidFileUploaded = (file) => {
            const validExtensions = ['png', 'jpeg', 'jpg']
            const fileExtension = file.type.split('/')[1]
            return validExtensions.includes(fileExtension)
        }

        const file = e.target.files[0];
        if (isValidFileUploaded(file)) {
            setFileErr('')
            setApplication({
                ...application,
                image: file
            })
        } else {
            setFileErr('this file is not will support')
        }

    }

    const applicationForm = async (e) => {
        if (fileErr == '') {
            setFileErr('')
            const formData = new FormData();
            for (let key in application) {
                formData.append(key, application[key])
            }
            const { data } = await newForm(formData)
            if (data.auth === false) {
                Navigate("/login");
            } else if (data.err) {
                setFormErr(data.msg)
            } else if(data.error==true){
                Navigate("/error");
            }
            else {
                alert('FORM SUBMITTED SUCCESSFULLY.')
                setFormErr('')
                setApplication({
                    name: '', email: '',
                    phone: '', designation: 'hr', gender: '',
                    image: '', course:''
                })
                imageRef.current.value = null;
            }
        } else {
            setFileErr('Please select image')
        }

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
                    <form autoComplete="off" onSubmit={handleSubmit(applicationForm)}>
                        <div className="grid-cols-1  w-full grid md:grid-cols-2 gap-2 p-5">
                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                <input type="text" {...register('name', { required: true, pattern: /^@?(\w){1,50}$/ })} value={application.name} onChange={handleChange} id="name" placeholder='Name *' className='bg-gray-100 outline-none text-sm flex-1 py-1 w-full' />
                                {errors.name && <p className='text-[13px] text-red-600'>name is required.</p>}
                            </div>


                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                <input type="text" {...register('email', { required: true, pattern: /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ })} value={application.email} onChange={handleChange} id="email" placeholder='Email *' className='bg-gray-100 outline-none text-sm flex-1 py-1 w-full' />
                                {errors.email && <p className='text-[13px] text-red-600'>Email is required.</p>}
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                <input type="text"{...register('phone', { required: true, maxLength: 10, pattern: /^[0-9]{10}$/ })} value={application.phone} onChange={handleChange} id="phone" placeholder='Phone no' className='bg-gray-100 outline-none text-sm flex-1 py-1 w-full' />
                                {errors.phone && <p className='text-[13px] text-red-600'>number is required.</p>}
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                <select {...register('designation', { required: true })} id="" className='bg-gray-100 outline-none text-sm flex-1 py-1 w-full' onChange={handleChange}>
                                    <option value="hr">HR</option>
                                    <option value="manager">MANAGER</option>
                                    <option value="sales">SALES</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="" className='text-left'>Gender</label>
                                <div className="flex">
                                    <div className=' p-2 flex items-center pl-0'>
                                        <input type="radio" {...register('gender', { required: true })} value="male" onChange={handleChange} id="male" placeholder='' className=' ' />
                                        <label htmlFor="male" className="text-sm font-medium text-gray-900 ml-2 block" >Male</label>
                                    </div>
                                    <div className='p-2 flex items-center'>
                                        <input type="radio" {...register('gender', { required: true })} value="female" onChange={handleChange} id="female" placeholder='' className=' ' />
                                        <label htmlFor="female" className="text-sm font-medium text-gray-900 ml-2 block">Female</label>
                                    </div>
                                </div>
                                {errors.gender && <p className='text-[13px] text-red-600'>Gender is required.</p>}
                            </div>
                            <div>
                                <label htmlFor="" className='text-left'>Course</label>
                                <div className="flex">
                                    <div className=' p-2 flex items-center pl-0'>
                                        <input type="checkbox" name="course" value="mca" {...register('course', { required: true })} onChange={handleCheck} id="mca" placeholder='' className=' ' checked={application.course === "mca"} />
                                        <label htmlFor="mca" className="text-sm font-medium text-gray-900 ml-2 block" >MCA</label>
                                    </div>
                                    <div className='p-2 flex items-center'>
                                        <input type="checkbox" name="course" value="bca" {...register('course', { required: true })} onChange={handleCheck} id="bca" placeholder='' className=' ' checked={application.course === "bca"} />
                                        <label htmlFor="bca" className="text-sm font-medium text-gray-900 ml-2 block">BCA</label>
                                    </div>
                                    <div className='p-2 flex items-center'>
                                        <input type="checkbox" name="course" value="bsc"{...register('course', { required: true })} onChange={handleCheck} id="bsc" placeholder='' className=' ' checked={application.course === "bsc"} />
                                        <label htmlFor="bsc" className="text-sm font-medium text-gray-900 ml-2 block">BSC</label>
                                    </div>
                                </div>
                                {errors.course && <p className='text-[13px] text-red-600'>Course is required.</p>}
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                <input ref={imageRef} {...register('image', { required: true })} type="file" name="image" onChange={fileUpload} id="image" placeholder='Image' className='bg-gray-100 outline-none text-sm flex-1 py-1' />
                                {errors.image && <p className='text-[13px] text-red-600'>image is required.</p>}
                                {fileErr ? <p className='text-[13px] text-red-600'>{fileErr}</p> : ''}
                            </div>



                        </div>
                        <div className='px-5 w-fit mx-auto pb-5'>
                            <button type='submit' className='border-2 text-green-500 border-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'>Submit</button>
                            {formErr ? <p className='text-[13px] text-red-600'>{formErr}</p> : ''}

                        </div>
                    </form>
                </div>
            </main>

        </div>
    )
}

export default Application
