'use strict';
const AuthController = require('../../controllers/AuthController');
const CampaignController = require('../../controllers/CampaignController');


const express = require('express'),
    router = express.Router();

router.post('/', [AuthController.checkLogin,], CampaignController.insert);
router.put('/:id', AuthController.checkLogin, CampaignController.update);
router.delete('/:id', AuthController.checkLogin, CampaignController.delete);


module.exports = router;