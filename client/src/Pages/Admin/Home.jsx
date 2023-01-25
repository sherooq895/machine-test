import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AdminAuth } from '../../Api/AdminApi/AdminRequest'
import { editForm } from '../../Api/AdminApi/AdminRequest'
import { getEmployeeList, DeleteEmployeeData } from '../../Api/AdminApi/AdminRequest'

function EmployeeList() {
    const Navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const imageRef = useRef(null);

    const [fileErr, setFileErr] = useState('');
    const [file, setFile] = useState('');
    const [formErr, setFormErr] = useState('');
    const [applicationList, setApplicationList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [application, setApplication] = useState({
        name: '', email: '',
        phone: '', designation: 'hr', gender: '',
        image: '', course: []
    });

    useEffect(() => {
        getEmployeeListData()
    }, [showModal]);

    useEffect(() => {
        AdminAuthenticeted()
    }, [Navigate]);

    const AdminAuthenticeted = async () => {
        const { data } = await AdminAuth()
        if (data.auth) Navigate('/EmployeeList')
        else Navigate("/login");
    }

    const getEmployeeListData = async () => {
        try {
            const { data } = await getEmployeeList()
            console.log(data, 'data');
            setApplicationList(data)
            console.log(applicationList)
        } catch (error) {
            console.log(error, 'catch error');
        }
    };

    const EditEmployee = (EmployeeData) => {
        setApplication(EmployeeData)
        setShowModal(true)
    }

    const DeleteEmployee = async (id) => {
        const { data } = await DeleteEmployeeData(id)
        getEmployeeListData()
    }

    const handleCheck = (event) => {
        console.log(application); 
        console.log(event.target.value); 
       
        // var updatedList = [...application.course];
        // if (event.target.checked) {
        //     console.log("inside true");
        //     console.log(application.course);
        //     updatedList = [...application.course, event.target.value];
        // } else {
        //     console.log("inside false");
        //     console.log(application.course);
        //     updatedList.splice(application.course.indexOf(event.target.value), 1);
        // }
        //  console.log(updatedList);
        // setApplication({ ...application, course: updatedList });

        setApplication({
            ...application,
            course: event.target.value
        })
    };

    //  const handleCheck = (event) => {console.log("jj");console.log(application)}

    
    

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
            setFile(URL.createObjectURL(e.target.files[0]))
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
            const formDataa = new FormData();
            for (let key in application) {
                formDataa.append(key, application[key])
            }
            const { data } = await editForm(formDataa)
            if (data.auth === false) {
                Navigate("/login");
            } else if (data.err) {
                console.log(data);
                setFormErr(data.msg)
            } else if (data.edit) {
                alert('edit successfully')
                setShowModal(!showModal)
            }  else if(data.error==true){
                Navigate("/error");
            }
            else {
                setFormErr('')
                setApplication({
                    name: '', email: '',
                    phone: '', designation: 'hr', gender: '',
                    image: '', course: ''
                })
                imageRef.current.value = null;
            }
        } else {
            setFileErr('Please select image')
        }

    }

    return (
        <div>

            <section className="py-1 bg-blueGray-50">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0 bg-[#baffc6]">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex justify-between">
                                    <h3 className="font-semibold text-base text-blueGray-700">Employee List</h3>
                                    <h3 className="font-semibold text-base text-blueGray-700">Total : <strong>{applicationList.length}</strong> </h3>
                                </div>
                               
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Unique Id
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Image
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Email
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Mobile
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Designation
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Gender
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Course
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Create Date
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        applicationList?.map((list, index) => {
                                            return (
                                                <tr className='border-b-2' key={index}>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{index + 1}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 "><img src={'http://localhost:4000/api/images/' + list.image} alt="" /></td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.email}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.phone}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.designation}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.gender}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.course}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.createdAt.slice(0,10)}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">
                                                        <button className="mr-3 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded" onClick={() => { EditEmployee(list) }}>Edit</button>
                                                        <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={() => { DeleteEmployee(list._id) }}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Edit Employee Data</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
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
                                                        <input type="radio" {...register('gender', { required: true })} value={application?.gender} onChange={()=> setApplication({...application, gender: 'male'})} id="male" placeholder='' className=' ' checked={application?.gender==='male'} />
                                                        <label htmlFor="male" className="text-sm font-medium text-gray-900 ml-2 block" >Male</label>
                                                    </div>
                                                    <div className='p-2 flex items-center'>
                                                        <input type="radio" {...register('gender', { required: true })} value={application?.gender} onChange={()=> setApplication({...application, gender: 'female'})} id="female" placeholder='' className=' '  checked={application?.gender==='female'} />
                                                        <label htmlFor="female" className="text-sm font-medium text-gray-900 ml-2 block">Female</label>
                                                    </div>
                                                </div>
                                                {errors.gender && <p className='text-[13px] text-red-600'>Gender is required.</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="" className='text-left'>Course</label>
                                                <div className="flex">
                                                    <div className=' p-2 flex items-center pl-0'>
                                                        <input type="checkbox" name="course" value="mca" {...register('course', { required: true })} onClick={handleCheck} id="mca" placeholder='' className=' 'checked={application.course === "mca"} />
                                                        <label htmlFor="mca" className="courseChecks text-sm font-medium text-gray-900 ml-2 block" >MCA</label>
                                                    </div>
                                                    <div className='p-2 flex items-center'>
                                                        <input type="checkbox" name="course" value="bca" {...register('course', { required: true })} onClick={handleCheck} id="bca" placeholder='' className=' ' checked={application.course === "bca"}   />
                                                        <label htmlFor="bca" className="courseChecks text-sm font-medium text-gray-900 ml-2 block">BCA</label>
                                                    </div>
                                                    <div className='p-2 flex items-center'>
                                                        <input type="checkbox" name="course" value="bsc"{...register('course', { required: true })} onClick={handleCheck} id="bsc" placeholder='' className=' ' checked={application.course === "bsc"}  />
                                                        <label htmlFor="bsc" className="courseChecks text-sm font-medium text-gray-900 ml-2 block">BSC</label>
                                                    </div>
                                                </div>
                                                {errors.course && <p className='text-[13px] text-red-600'>Course is required.</p>}
                                            </div>
                                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                                <input ref={imageRef} type="file" name="image" onChange={fileUpload} id="image" placeholder='Image' className='bg-gray-100 outline-none text-sm flex-1 py-1' />
                                                <img width='200px' src={file ? file : `http://localhost:4000/api/images/${application.image}`} alt="" />
                                                {fileErr ? <p className='text-[13px] text-red-600'>{fileErr}</p> : ''}
                                            </div>
                                        </div>
                                        <div className='px-5 w-fit mx-auto pb-5'>
                                            <button type='submit' className='border-2 text-green-500 border-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'>Submit</button>
                                            {formErr ? <p className='text-[13px] text-red-600'>{formErr}</p> : ''}
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}

export default EmployeeList
