'use strict';
const express = require('express'),
    router = express.Router();
const AuthController = require('../../controllers/AuthController');
const UserController = require('../../controllers/UserController');

router.put('/:id', AuthController.checkLogin, UserController.cpanel_Update);
router.post('/sinh-vien/docExcel', [AuthController.checkLogin, UserController.upload.single('file')], UserController.readExcel);
router.get('/sinh-vien/chi-tiet/:code', AuthController.checkLogin, UserController.getStudentByCode);
module.exports = router;
