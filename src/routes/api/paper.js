'use strict';

const express = require('express'),
    router = express.Router();
const AuthController = require('../../controllers/AuthController');
const IndexController = require('../../controllers/IndexController');
const RejoinController = require('../../controllers/RejoinController');

router.post('/dao-tao/chuyen-nganh-hoc', AuthController.checkLogin, IndexController.postChangeCoursePaperEducation);
router.put('/dao-tao/chuyen-nganh-hoc/cap-nhat/:id', AuthController.checkLogin, IndexController.putChangeCoursePaperEducationUpdate);

router.put('/tai-vu/chuyen-nganh-hoc', AuthController.checkLogin, IndexController.putChangeCoursePaperFinance);
router.put('/tai-vu/chuyen-nganh-hoc/cancel', AuthController.checkLogin, IndexController.putChangeCoursePaperFinanceCancel);

router.post('/dao-tao/gui-mail-hoc-phi', AuthController.checkLogin, IndexController.sendTuitionMail);

router.post('/dich-vu-sinh-vien/chuyen-nganh-hoc/them-moi', AuthController.checkLogin, IndexController.postChangeCoursePaper);
router.put('/dich-vu-sinh-vien/chuyen-nganh-hoc', AuthController.checkLogin, IndexController.putChangeCoursePaper);

router.put('/dich-vu-sinh-vien/chuyen-nganh-hoc/cap-nhat-trang-thai', AuthController.checkLogin, IndexController.putChangeCoursePaperResult);
router.put('/dich-vu-sinh-vien/chuyen-nganh-hoc/hoan-tac', AuthController.checkLogin, IndexController.putChangeCoursePaperStudentServiceCancel);


router.get('/:id/chuyen-nganh-hoc/', AuthController.checkLogin, IndexController.getOneCoursePaper);
router.get('/chuyen-nganh-hoc/tai-xuong', AuthController.checkLogin, IndexController.downloadPaper);




router.post('/dich-vu-sinh-vien/nhap-hoc-tro-lai/them-moi', AuthController.checkLogin, RejoinController.insertRejoinPaper);
router.put('/dich-vu-sinh-vien/nhap-hoc-tro-lai', AuthController.checkLogin, RejoinController.studentServiceUpdatePaper);
router.post('/dich-vu-sinh-vien/gui-email-nhap-hoc-tro-lai', AuthController.checkLogin, RejoinController.sendEmail);
router.put('/tai-vu/nhap-hoc-tro-lai/', AuthController.checkLogin, RejoinController.financeUpdatePaper);
router.put('/dao-tao/nhap-hoc-tro-lai/cap-nhat', AuthController.checkLogin, RejoinController.educationUpdatePaper);



module.exports = router;