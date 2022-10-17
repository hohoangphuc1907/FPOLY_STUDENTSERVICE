const autoBind = require('auto-bind');

const config = require('../../config/config').getConfig();
const resourses = require('../../config/resourses').getResources();
const Mailer = require('../services/Mailer');

const { CampaignService } = require('../services/CampaignService');
const { Campaign } = require('../models/Campaign');
const campaignService = new CampaignService(new Campaign().getInstance());

const { RejoinService } = require('../services/RejoinService');
const { RejoinPaper } = require('../models/RejoinPaper');
const rejoinService = new RejoinService(new RejoinPaper().getInstance());

const { User } = require('../models/User');
const { UserService } = require('../services/UserService');
const userService = new UserService(new User().getInstance());



class RejoinController {

    constructor() {
        autoBind(this);
    }


    async sendEmail(req, res, next) {
        try {
            const { content, title, id, file } = req.body;
            const { _id } = req.user;

            let paper = await rejoinService.studentServiceGetOnePaper(id);
            if (!paper.data) throw new Error('Không tìm thấy phiếu');
            paper = paper.data;

            let mailContent = content;
            if(paper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[0].VALUE ||
                paper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[2].VALUE) {
                    let mailer = new Mailer(paper.email, title, mailContent, null, null);
                    await mailer.sendWithoutAttachment();
            } else if(paper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[1].VALUE) {  
                let mailer = new Mailer(paper.email, title, mailContent, file, paper.studentCode);
                await mailer.send();
            }
            

            let rs = await rejoinService.studentServiceUpdateSendEmail(id, _id);

            return await res.status(rs.statusCode).json(rs);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    /**
     * chỗ này sẽ gửi lên id và status của paper
     */
     async educationGetOnePaper(req, res, next) {
        try {
            let { id } = req.query;
            let { semesterProps, englishProps, courses, subjects, newCourses } = resourses;

            let paper = await rejoinService.studentServiceGetOnePaper(id);
            paper = paper.data;

            let oneCampaign = await campaignService.get(paper.campaign);
            oneCampaign = oneCampaign.data;

            let type = paper.type;

            let rejoinStudentStatus = config.REJOIN_PAPER_PROPERTIES.REJOIN_STUDENT_STATUS;
            let newStudentStatus = config.REJOIN_PAPER_PROPERTIES.NEW_STUDENT_STATUS;

            let path = 'bdt/rejoinUpdateTypeTwo';
            res.render(path, {
                paper: paper,
                _paper: JSON.stringify(paper),
                _courses: JSON.stringify(courses),
                _newCourses: JSON.stringify(newCourses),
                _type: JSON.stringify(type),
                _oneCampaign: JSON.stringify(oneCampaign),
                _rejoinStudentStatus: JSON.stringify(rejoinStudentStatus),
                _englishProps: JSON.stringify(englishProps),
                _subjects: JSON.stringify(subjects),
                _semesterProps: JSON.stringify(semesterProps),
                _newStudentStatus: JSON.stringify(newStudentStatus),
            });

        } catch (e) {
            console.log(e);
            next(e);
        }
    }


    /**
     * chỗ này sẽ gửi lên id và status của paper
     * kiểm tra nếu type như cũ thì ko làm gì
     * nếu type khác thì sẽ update lại type, tạo lại đơn mới, chỉ giữ nguyên phần thông tin chung
     */
    async studentServiceGetOnePaper(req, res, next) {
        try {
            let { id, t } = req.query;
            let { semesterProps, englishProps, courses, subjects } = resourses;
            let { user: { _id } } = req;

            let paper = await rejoinService.studentServicePrepareOnePaperForUpdating(id, t, _id);
            paper = paper.data;
            console.log(paper);

            let oneCampaign = await campaignService.get(paper.campaign);
            oneCampaign = oneCampaign.data;

            let type = paper.type;

            let rejoinStudentStatus = config.REJOIN_PAPER_PROPERTIES.REJOIN_STUDENT_STATUS;

            let path = type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[0].VALUE ? 'studentService/rejoinUpdateTypeOne' :
                type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[1].VALUE ? 'studentService/rejoinUpdateTypeTwo' :
                    'studentService/rejoinUpdateTypeThree';
            res.render(path, {
                paper: paper,
                _paper: JSON.stringify(paper),
                _courses: JSON.stringify(courses),
                _type: JSON.stringify(type),
                _oneCampaign: JSON.stringify(oneCampaign),
                _rejoinStudentStatus: JSON.stringify(rejoinStudentStatus),
                _englishProps: JSON.stringify(englishProps),
                _subjects: JSON.stringify(subjects),
            });

        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async educationUpdatePaper(request, response, next) {
        try {
            const { body, user: { _id } } = request;
            const rs = await rejoinService.educationUpdatePaper(body, _id);
            await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }

    async studentServiceUpdatePaper(request, response, next) {
        try {
            const { body, user: { _id } } = request;
            const rs = await rejoinService.studentServiceUpdatePaper(body, _id);
            await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }

    async financeUpdatePaper(request, response, next) {
        try {
            const { body, user: { _id } } = request;
            const rs = await rejoinService.financeUpdatePaper(body, _id);
            await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }

    async insertRejoinPaper(request, response, next) {
        try {
            const { body, user: { _id } } = request;
            const rs = await rejoinService.insert(body, _id);
            await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }

    /**
     * Hiển thị trang thêm mới cho dịch vụ sinh viên
     * Nội dung hiển thị tùy vào loại chiến dịch
     */
    async getRejoinInsertPageForStudentService(req, res, next) {
        try {
            let { campaign, type } = req.query;
            let { semesterProps, englishProps, courses, subjects } = resourses;

            let oneCampaign = await campaignService.get(campaign);
            oneCampaign = oneCampaign.data;

            let rejoinStudentStatus = config.REJOIN_PAPER_PROPERTIES.REJOIN_STUDENT_STATUS;

            let path = type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[0].VALUE ? 'studentService/rejoinInsertTypeOne' : type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[1].VALUE ? 'studentService/rejoinInsertTypeTwo' : 'studentService/rejoinInsertTypeThree';
            res.render(path, {
                _courses: JSON.stringify(courses),
                _type: JSON.stringify(type),
                _oneCampaign: JSON.stringify(oneCampaign),
                _rejoinStudentStatus: JSON.stringify(rejoinStudentStatus),
                _englishProps: JSON.stringify(englishProps),
                _subjects: JSON.stringify(subjects),
            });
        } catch (e) {
            next(e);
        }
    }

    /**
         * Lấy danh sách nhập học trở lại cho phòng tài vụ
         * Lấy danh sách chiến dịch
         * Lấy danh sách loại nhâp học
         * Trả về trang danh sách
         */
    async getRejoinForEducation(req, res, next) {
        try {
            let { campaign, type } = req.query;

            let response = await rejoinService.getAll({ limit: 10000, campaign, type });
            let papers = response.data;

            let campaigns = await campaignService.getAll({ limit: 10000, department: 2 });
            campaigns = campaigns.data;

            campaigns = campaigns.map(c => {
                c = {
                    _id: c._id,
                    name: c.name,
                    time: c.time,
                    isSelected: false
                }
                if (campaign && campaign == c._id) {
                    c.isSelected = true;
                }
                return c;
            });

            let rejoinPaperTypes = config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES;
            let newStudentStatus = config.REJOIN_PAPER_PROPERTIES.NEW_STUDENT_STATUS;

            //let statusAnalys = await changeCoursePaperService.getStatusAnalys(coursePapers);
            let { semesterProps, englishProps, courses, newCourses } = resourses;

            type = Array.isArray(type) ? type : type ? [type] : [];
            rejoinPaperTypes = rejoinPaperTypes.map(c => {
                c = {
                    name: c.NAME,
                    isSelected: false,
                    value: c.VALUE
                }
                if (type && type.length > 0 && type.some(i => i.toString() == c.value.toString())) {
                    c.isSelected = true;
                }
                return c;
            });

            res.render('bdt/rejoinList', {
                currentYear: new Date().getFullYear(),
                papers: papers,
                _papers: JSON.stringify(papers),
                _campaigns: JSON.stringify(campaigns),
                _rejoinPaperTypes: JSON.stringify(rejoinPaperTypes),
                _newStudentStatus: JSON.stringify(newStudentStatus),
                _semesterProps: JSON.stringify(semesterProps),
                _newCourses: JSON.stringify(newCourses),
            });

        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    /**
     * Lấy danh sách nhập học trở lại cho phòng tài vụ
     * Lấy danh sách chiến dịch
     * Lấy danh sách loại nhâp học
     * Trả về trang danh sách
     */
    async getRejoinForFinance(req, res, next) {
        try {
            let { campaign, type } = req.query;

            let response = await rejoinService.getAll({ limit: 10000, campaign, type });
            let papers = response.data;

            let campaigns = await campaignService.getAll({ limit: 10000, department: 2 });
            campaigns = campaigns.data;

            campaigns = campaigns.map(c => {
                c = {
                    _id: c._id,
                    name: c.name,
                    time: c.time,
                    isSelected: false
                }
                if (campaign && campaign == c._id) {
                    c.isSelected = true;
                }
                return c;
            });

            let rejoinPaperTypes = config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES;
            let newStudentStatus = config.REJOIN_PAPER_PROPERTIES.NEW_STUDENT_STATUS;

            //let statusAnalys = await changeCoursePaperService.getStatusAnalys(coursePapers);
            let { semesterProps, englishProps, courses, newCourses } = resourses;

            type = Array.isArray(type) ? type : type ? [type] : [];
            rejoinPaperTypes = rejoinPaperTypes.map(c => {
                c = {
                    name: c.NAME,
                    isSelected: false,
                    value: c.VALUE
                }
                if (type && type.length > 0 && type.some(i => i.toString() == c.value.toString())) {
                    c.isSelected = true;
                }
                return c;
            });

            res.render('tv/rejoinList', {
                currentYear: new Date().getFullYear(),
                papers: papers,
                _papers: JSON.stringify(papers),
                _campaigns: JSON.stringify(campaigns),
                _rejoinPaperTypes: JSON.stringify(rejoinPaperTypes),
                _newStudentStatus: JSON.stringify(newStudentStatus),
                _semesterProps: JSON.stringify(semesterProps),
                _newCourses: JSON.stringify(newCourses),
            });

        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    /**
     * Lấy danh sách nhập học trở lại cho phòng dịch vụ sinh viên
     * Lấy danh sách chiến dịch
     * Lấy danh sách loại nhâp học
     * Trả về trang danh sách
     */
    async getRejoinForStudentService(req, res, next) {
        try {
            let { campaign, type } = req.query;

            let response = await rejoinService.getAll({ limit: 10000, campaign, type });
            let papers = response.data;

            let campaigns = await campaignService.getAll({ limit: 10000, department: 2 });
            campaigns = campaigns.data;

            campaigns = campaigns.map(c => {
                c = {
                    _id: c._id,
                    name: c.name,
                    time: c.time,
                    isSelected: false
                }
                if (campaign && campaign == c._id) {
                    c.isSelected = true;
                }
                return c;
            });

            let rejoinPaperTypes = config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES;
            let newStudentStatus = config.REJOIN_PAPER_PROPERTIES.NEW_STUDENT_STATUS;

            //let statusAnalys = await changeCoursePaperService.getStatusAnalys(coursePapers);
            let { semesterProps, englishProps, courses, newCourses } = resourses;

            type = Array.isArray(type) ? type : type ? [type] : [];
            rejoinPaperTypes = rejoinPaperTypes.map(c => {
                c = {
                    name: c.NAME,
                    isSelected: false,
                    value: c.VALUE
                }
                if (type && type.length > 0 && type.some(i => i.toString() == c.value.toString())) {
                    c.isSelected = true;
                }
                return c;
            });

            res.render('studentService/rejoinList', {
                currentYear: new Date().getFullYear(),
                papers: papers,
                _papers: JSON.stringify(papers),
                _campaigns: JSON.stringify(campaigns),
                _rejoinPaperTypes: JSON.stringify(rejoinPaperTypes),
                _newStudentStatus: JSON.stringify(newStudentStatus),
                _semesterProps: JSON.stringify(semesterProps),
                _newCourses: JSON.stringify(newCourses),
            });

        } catch (e) {
            console.log(e)
            next(e);
        }
    }


    async getCampaignPageForStudentService(req, res, next) {
        try {
            let campaigns = await campaignService.getAll({ limit: 10000, department: 2 });
            campaigns = campaigns.data;
            let campaignTypes = config.CAMPAIGN_TYPES.filter(item => item.DEPARTMENT == 2);

            campaigns = campaigns.map(item => {
                item = {
                    _id: item._id,
                    name: item.name,
                    time: item.time,
                    createdBy: item.createdBy,
                    type: item.type == 1 ? 'Thôi học quay lại' : '',
                }
                return item;
            });

            res.render('studentService/campaign',
                {
                    campaigns: campaigns,
                    _campaignTypes: JSON.stringify(campaignTypes),
                });
        } catch (e) {
            next(e);
        }
    }







}

module.exports = new RejoinController();
