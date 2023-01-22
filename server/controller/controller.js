const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Userlog = require('../models/Login')
const form = require('../models/Form')
const adminLoginSchema = require('../models/Login')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');



module.exports = {
    jwtCheck: (req, res) => {
        res.status(200).json({ auth: true, message: "You are authenticated Congrats!" })
    },
    login: async (req, res) => {
        try {
            adminLoginSchema.findOne({ email: req.body.email }).then((response) => {
                if (response) {
                    bcrypt.compare(req.body.password, response.password).then(result => {
                        if (!result) {
                            passwordStatus = false;
                            return res.json({ auth: false, passwordStatus })
                        } else {
                            passwordStatus = true;
                            let token = jwt.sign({ email: response.email }, process.env.JWT_SECRET, { expiresIn: 3000 });
                            res.status(200).json({ auth: true, adminToken: token, passwordStatus })
                        }
                    })
                } else {
                    return res.json({ auth: false })
                }
            })
        } catch (error) {
            console.log(error);
        }
    },
    newForm: async (req, res) => {
        try {
            const { name, email, phone, designation, gender, course, image } = req.body
            if (name && email && phone && designation && gender && course && req.file.filename) {

                const existEmail = await form.findOne({ email: email })
                if (existEmail) {
                    res.json({ msg: 'Email is already exist', err: true })
                } else {
                    const employeeform = new form({
                        name,
                        email,
                        phone,
                        designation,
                        gender,
                        course: course.split(','),
                        image: req.file.filename,
                    })
                    employeeform.save()
                    res.status(200).json({ err: false })
                }

            } else {
                res.json({ msg: 'Please fill the required fields', err: true })
            }
        } catch (error) {
            console.log(error);
        }
    },
    getEmployeeList: async (req, res) => {
        try {
            let EmployeeList = await form.find()
            res.status(200).json(EmployeeList)
        } catch (error) {
            console.log(error);
        }
    },
    DeleteEmployeeData: async (req, res) => {
        try {
            console.log(req.body, 'req.body');
            let EmployeeList = await form.deleteOne({_id: req.body.userId})
            res.status(200).json(EmployeeList)
        } catch (error) {
            console.log(error);
        }
    },
    editEmployeeData: async (req, res) => {
        try {
            console.log(req.body, 'req.body');
            // const { name, email, phone, designation, gender, course, userId } = req.body
            // if (name && email && phone && designation && gender && course && req.file.filename) {

            //     const existEmail = await form.findOne({ email: email })
            //     if (existEmail ) {
            //         res.json({ msg: 'Email is already exist', err: true })
            //     } else {
            //         res.status(200).json({ err: false })
            //     }

            // } else {
            //     res.json({ msg: 'Please fill the required fields', err: true })
            // }
        } catch (error) {
            console.log(error);
        }
    }
}