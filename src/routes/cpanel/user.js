'use strict';
const express = require( 'express' ), 
router = express.Router();
const AuthController = require( '../../controllers/AuthController' );
const UserController = require('../../controllers/UserController');

router.get( '/', AuthController.checkLogin, AuthController.isAdmin, UserController.getAll);
router.get( '/sinh-vien', AuthController.checkLogin, AuthController.isAdmin, UserController.students);
router.get( '/sinh-vien/list', AuthController.checkLogin, AuthController.isAdmin, UserController.getAllStudent);
module.exports = router;
