'use strict';

const express = require('express'),
    router = express.Router();
const AuthController = require('../../controllers/AuthController');
const IndexController = require('../../controllers/IndexController');
const RejoinController = require('../../controllers/RejoinController');


router.get('/', AuthController.checkLogin, IndexController.index);

router.get('/dao-tao', AuthController.checkLogin, AuthController.isEducation, IndexController.education);
// lấy danh sách chuyển ngành cho màn hình đào tạo
router.get('/dao-tao/chuyen-nganh-hoc', AuthController.checkLogin, AuthController.isEducation, IndexController.getChangeCoursePaperForEducation);
router.get('/dao-tao/chuyen-nganh-hoc/sua/:id', AuthController.checkLogin, AuthController.isEducation, IndexController.getChangeCoursePaperForEducationToFixUpdate);
router.get('/dao-tao/chuyen-nganh-hoc/them-moi', AuthController.checkLogin, AuthController.isEducation, IndexController.getChangeCoursePaperInsertPage);
router.get('/dao-tao/chien-dich', AuthController.checkLogin, AuthController.isEducation, IndexController.getCampaignPageForEducation);


router.get('/tai-vu', AuthController.checkLogin, AuthController.isFinance, IndexController.finance);
// lấy danh sách chuyển ngành cho màn hình đào tạo
router.get('/tai-vu/chuyen-nganh-hoc', AuthController.checkLogin, AuthController.isFinance, IndexController.getChangeCoursePaperForFinance);
router.get('/tai-vu/them-moi/:id', AuthController.checkLogin, AuthController.isFinance, IndexController.getChangeCoursePaperForFinanceToUpdate);


router.get('/dich-vu-sinh-vien', AuthController.checkLogin, AuthController.isStudentService, IndexController.studentService);
// lấy danh sách chuyển ngành cho màn hình đào tạo
router.get('/dich-vu-sinh-vien/chuyen-nganh-hoc', AuthController.checkLogin, AuthController.isStudentService, IndexController.getChangeCoursePaperForStudentService);
router.get('/dich-vu-sinh-vien/chuyen-nganh-hoc/them-moi', AuthController.checkLogin, AuthController.isStudentService, IndexController.getChangeCoursePaperNewPage);





router.get('/dich-vu-sinh-vien/chien-dich', AuthController.checkLogin, AuthController.isStudentService, RejoinController.getCampaignPageForStudentService);
router.get('/dich-vu-sinh-vien/nhap-hoc-tro-lai', AuthController.checkLogin, AuthController.isStudentService, RejoinController.getRejoinForStudentService);
router.get('/dich-vu-sinh-vien/nhap-hoc-tro-lai/them-moi', AuthController.checkLogin, AuthController.isStudentService, RejoinController.getRejoinInsertPageForStudentService);

router.get('/dich-vu-sinh-vien/nhap-hoc-tro-lai/cap-nhat', AuthController.checkLogin, AuthController.isStudentService, RejoinController.studentServiceGetOnePaper);
router.get('/tai-vu/nhap-hoc-tro-lai/', AuthController.checkLogin, AuthController.isFinance, RejoinController.getRejoinForFinance);

router.get('/dao-tao/nhap-hoc-tro-lai/', AuthController.checkLogin, AuthController.isEducation, RejoinController.getRejoinForEducation);
router.get('/dao-tao/nhap-hoc-tro-lai/cap-nhat', AuthController.checkLogin, AuthController.isEducation, RejoinController.educationGetOnePaper);



module.exports = router;
