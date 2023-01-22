const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')
const verifyAdminJWT =  require('./auth.js')
const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/images');
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage });

router.post('/login',controller.login)
router.get('/isAdminAuth', verifyAdminJWT, controller.jwtCheck);
router.post('/newForm',verifyAdminJWT, upload.single('image'), controller.newForm)
router.get('/getEmployeeList',verifyAdminJWT, controller.getEmployeeList)
router.put('/deleteEmployeeData',verifyAdminJWT, controller.DeleteEmployeeData)
router.post('/editEmployeeData',verifyAdminJWT, controller.editEmployeeData)

module.exports = router   