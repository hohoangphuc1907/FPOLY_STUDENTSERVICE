const autoBind = require('auto-bind');

const config = require('../../config/config').getConfig();
const resourses = require('../../config/resourses').getResources();
const { ChangeCoursePaperService } = require('../services/ChangeCoursePaperService');
const { CampaignService } = require('../services/CampaignService');
const { ChangeCoursePaper } = require('../models/ChangeCoursePaper');
const { Campaign } = require('../models/Campaign');
const Mailer = require('../services/Mailer');
const changeCoursePaperService = new ChangeCoursePaperService(new ChangeCoursePaper().getInstance());
const campaignService = new CampaignService(new Campaign().getInstance());
const { User } = require('../models/User');
const { UserService } = require('../services/UserService');
const userService = new UserService(new User().getInstance());



class IndexController {

    constructor() {
        autoBind(this);
    }

    async index(req, res, next) {
        try {
            res.render('index');
        } catch (e) {
            next(e);
        }
    }

    async studentService(req, res, next) {
        try {
            res.render('studentService/index');
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    async education(req, res, next) {
        try {
            res.render('bdt/index');
        } catch (e) {
            next(e);
        }
    }

    async finance(req, res, next) {
        try {
            res.render('tv/index');
        } catch (e) {
            next(e);
        }
    }

    async getChangeCoursePaperForEducation(req, res, next) {
        try {
            let { campaign, course } = req.query;
            const response = await changeCoursePaperService.getAll({ limit: 1000, campaign: campaign, course: course });
            let campaigns = await campaignService.getAll({ limit: 100000, department: 1 });
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

            let coursePapers = response.data;
            let { semesterProps, englishProps, courses } = resourses;

            course = Array.isArray(course) ? course : course ? [course] : [];
            courses = courses.map(c => {
                c = {
                    name: c.name,
                    isSelected: false
                }
                if (course && course.length > 0 && course.some(i => i.toString() == c.name.toString())) {
                    c.isSelected = true;
                }
                return c;
            });

            res.render('bdt/list', {
                currentYear: new Date().getFullYear(),
                coursePapers: coursePapers,
                _campaigns: JSON.stringify(campaigns),
                _campaignTypes: JSON.stringify(config.CAMPAIGN_TYPES),
                _coursePapers: JSON.stringify(coursePapers),
                _semesterProps: JSON.stringify(semesterProps),
                _englishProps: JSON.stringify(englishProps),
                _courses: JSON.stringify(courses),
            });

        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    async sendTuitionMail(req, res, next) {
        try {
            const { email, name, tuition_deadline, file, idPaper, idVersion, code, newComerStudent } = req.body;
            const { _id } = req.user;
            const semester = this.getSemFromDate();
            let { semesterProps, englishProps } = resourses;
            // let path = await changeCoursePaperService.generateDocPDF(idPaper, semesterProps, englishProps);

            let mailContent = newComerStudent ? `
            <b>Bạn ${name} thân mến</b>,
            <p>Phòng DVSV gửi Bạn thông tin về việc cần phải hoàn thành để đủ điều kiện chuyển ngành. Bạn vui lòng xem thông tin chi tiết về tư vấn môn học và học phí ở File đính kèm.</p>
            <p  style="font-weight: bold; color: red;">1. Hạn đóng học phí: ${tuition_deadline}
            <br/>
            2. Hình thức đóng phí: <a href="https://dng.fpt.edu.vn/Invoice">https://dng.fpt.edu.vn/Invoice</a></p>
            <p>Ngoài ra Bạn cần nộp thêm 1 bộ hồ sơ mới trước ngày: <span style="font-weight: bold; color: red;"> ${tuition_deadline}</span> bao gồm:</p>
            <p>1. Phiếu đăng ký học theo mẫu nhà trường (có xác nhận của địa phương, đóng mộc giáp lai lên ảnh 3x4): Tải phiếu <a href="https://docs.google.com/document/d/1AIQ-678RfLHhZWKi9qVsZhtLN0kMXSj-/edit">TẠI ĐÂY.</a></p>
            <p>2. Bằng tốt nghiệp THPT photo công chứng.</p>
            <p>3. Chứng minh nhân dân photo công chứng.</p>
            <p>Hồ sơ gửi chuyển phát nhanh đến địa chỉ: Phòng Dịch vụ sinh viên, 778/1B Nguyễn Kiệm, Phường 4, Phú Nhuận, Hồ Chí Minh. Hoặc nộp trực tiếp tại cơ sở học gần nhất.</p>
            <br>
            <p>Bạn hãy luôn chú ý điện thoại để có thể nhận liên hệ của trường khi cần nhé!!!</p>
            <p>Mong sớm được tiếp tục đồng hành cùng bạn tại trường!</p>
            ` : `
            <b>Bạn ${name} thân mến</b>,
            <p>Phòng DVSV gửi Bạn các thông tin và việc cần phải hoàn thành để đủ điều kiện chuyển ngành.
            Bạn vui lòng xem thông tin chi tiết về tư vấn môn học và học phí ở File đính kèm.</p>
            <p>Nếu đồng ý với nội dung tư vấn, 
                <span style="font-weight: bold; color: red;">Hãy phản hồi lại Email này trong vòng 8 giờ với nội dung: “Tôi đồng ý chuyển ngành theo nội dung được tư vấn”.</span></p>
            
            <p  style="font-weight: bold; color: red;">1.        Hạn đóng học phí: ${tuition_deadline}
            <br/>
            2.        Phương thức đóng học phí: chi tiết ở file đính kèm.</p>
            <br/>
            <p>Mong sớm nhận được phản hồi của Bạn!
            Chúc Bạn học tập thật tốt và nhiều sức khỏe.</p>
            `

            let title = newComerStudent ? `${code} - ${semester} - NHẬP HỌC LẠI TỪ ĐẦU - PHẢN HỒI NỘI DUNG TƯ VẤN CHUYỂN NGÀNH` : `${code} - ${semester} - PHẢN HỔI TƯ VẤN CHUYỂN NGÀNH`;

            let mailer = new Mailer(email, title, mailContent, file, code);
            await mailer.send();

            let rs = await changeCoursePaperService.updateSendEmail({ idPaper: idPaper, idVersion: idVersion }, _id);

            return await res.status(rs.statusCode).json(rs);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async getChangeCoursePaperForFinance(req, res, next) {
        try {
            let { campaign, course } = req.query;
            const response = await changeCoursePaperService.getAll({ limit: 1000, campaign: campaign, course: course });
            let campaigns = await campaignService.getAll({ limit: 100000, department: 1});
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

            let coursePapers = response.data;
            let { semesterProps, englishProps, courses } = resourses;

            course = Array.isArray(course) ? course : course ? [course] : [];
            courses = courses.map(c => {
                c = {
                    name: c.name,
                    isSelected: false
                }
                if (course && course.length > 0 && course.some(i => i.toString() == c.name.toString())) {
                    c.isSelected = true;
                }
                return c;
            });

            res.render('tv/list', {
                currentYear: new Date().getFullYear(),
                coursePapers: coursePapers,
                _coursePapers:  JSON.stringify(coursePapers),
                _campaigns: JSON.stringify(campaigns),
                _semesterProps: JSON.stringify(semesterProps),
                _englishProps: JSON.stringify(englishProps),
                _courses: JSON.stringify(courses),
            });

        } catch (e) {
            next(e);
        }
    }

    async getOneCoursePaper(request, response, next) {
        try {
            const { id } = request.params;
            const rs = await changeCoursePaperService.getOneCoursePaper(id);
            return await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }

    async putChangeCoursePaper(req, res, next) {
        try {
            const { body } = req;
            let id = body.id;

            delete body.id;

            const response = await changeCoursePaperService.update(body, id);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getStudentServiceStatisticsPage(req, res, next) {
        try {
            res.render('studentService/statistics');
        } catch (e) {
            next(e);
        }
    }

    // chú ý, nếu có id thì là chi tiết,
    // ko có là thêm mới
    async getChangeCoursePaperForStudentService(req, res, next) {
        try {
            let { campaign, course } = req.query;
            const response = await changeCoursePaperService.getAll({ limit: 1000, campaign: campaign, course: course });
            let coursePapers = response.data;
            let campaigns = await campaignService.getAll({ limit: 100000, department: 1 });
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
            //let statusAnalys = await changeCoursePaperService.getStatusAnalys(coursePapers);
            let { semesterProps, englishProps, courses } = resourses;

            course = Array.isArray(course) ? course : course ? [course] : [];
            courses = courses.map(c => {
                c = {
                    name: c.name,
                    isSelected: false
                }
                if (course && course.length > 0 && course.some(i => i.toString() == c.name.toString())) {
                    c.isSelected = true;
                }
                return c;
            });

            res.render('studentService/list', {
                currentYear: new Date().getFullYear(),
                coursePapers: coursePapers,
                _coursePapers: JSON.stringify(coursePapers),
                _campaigns: JSON.stringify(campaigns),
                paperStatus: config.PAPER_STATUS_OPTIONS,
                _semesterProps: JSON.stringify(semesterProps),
                _englishProps: JSON.stringify(englishProps),
                _courses: JSON.stringify(courses),
                //statusAnalys
            });

        } catch (e) {
            console.log(e)
            next(e);
        }
    }



    async getChangeCoursePaperNewPage(req, res, next) {
        try {
            res.render('studentService/new');
        } catch (e) {
            next(e);
        }
    }

    async postChangeCoursePaper(req, res, next) {
        try {
            const { body, user: { _id, email } } = req;
            const response = await changeCoursePaperService.create(body, _id);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getChangeCoursePaperForEducationToFixUpdate(req, res, next) {
        try {
            const { id } = req.params;
            const { campaign } = req.query;
            const response = await changeCoursePaperService.getOneCoursePaper(id);
            let paper = response.data;
            let version = paper.versions[0];

            let { courses, subjects, semesterProps, englishProps } = resourses;
            res.render('bdt/update', {
                currentYear: new Date().getFullYear(),
                paper: paper,
                version: version,
                _version: JSON.stringify(version),
                _courses: JSON.stringify(courses),
                _subjects: JSON.stringify(subjects),
                _semesterProps: JSON.stringify(semesterProps),
                _englishProps: JSON.stringify(englishProps),
            });
        } catch (e) {
            next(e);
        }
    }

    async getChangeCoursePaperInsertPage(req, res, next) {
        try {
            let { campaign } = req.query;
            let { courses, subjects, semesterProps, englishProps } = resourses;
            let oneCampaign = await campaignService.get(campaign);
            oneCampaign = oneCampaign.data;
            res.render('bdt/insert',
                {
                    courses: courses,
                    _oneCampaign: JSON.stringify(oneCampaign),
                    _courses: JSON.stringify(courses),
                    _subjects: JSON.stringify(subjects),
                    _semesterProps: JSON.stringify(semesterProps),
                    _englishProps: JSON.stringify(englishProps),
                });
        } catch (e) {
            next(e);
        }
    }

    async getChangeCoursePaperForFinanceToUpdate(req, res, next) {
        try {
            const { id } = req.params;
            const paper = await changeCoursePaperService.getOneCoursePaper(id);
            if (paper.data.paper_status === config.PAPER_STATUS.STEP2) {
                res.render('tv/insert', { id: id, paper: paper.data, _paper: JSON.stringify(paper.data) });
            } else {
                res.redirect('/tai-vu/chuyen-nganh-hoc');
            }
        } catch (e) {
            next(e);
        }
    }

    async postChangeCoursePaperEducation(request, response, next) {
        try {
            const { body, user: { _id, email } } = request;
            const rs = await changeCoursePaperService.create(body, _id);
            await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }

    async putChangeCoursePaperFinance(request, response, next) {
        try {
            const { body, user: { _id, email } } = request;
            const rs = await changeCoursePaperService.financeUpdate(body, _id);
            await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }

    async putChangeCoursePaperFinanceCancel(request, response, next) {
        try {
            const { body, user: { _id, email } } = request;
            const rs = await changeCoursePaperService.financeUpdateCancel(body, _id);
            await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }

    async putChangeCoursePaperStudentServiceCancel(request, response, next) {
        try {
            const { body, user: { _id, email } } = request;
            const rs = await changeCoursePaperService.studentServiceUpdateCancel(body, _id);
            await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }

    async putChangeCoursePaperResult(request, response, next) {
        try {
            const { body, user: { _id, email } } = request;
            console.log(body);
            const rs = await changeCoursePaperService.updatePaperResult(body, _id);
            await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }

    async putChangeCoursePaperEducationUpdate(request, response, next) {
        try {
            const { body, user: { _id, email } } = request;
            const { id } = request.params;
            const rs = await changeCoursePaperService.putChangeCoursePaperEducationUpdate(body, id, _id, email);
            await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }

    async getCampaignPageForEducation(req, res, next) {
        try {
            let campaigns = await campaignService.getAll({ limit: 10000, department: 1 });
            campaigns = campaigns.data;
            let campaignTypes = config.CAMPAIGN_TYPES.filter(item => item.DEPARTMENT == 1);

            campaigns = campaigns.map(item => {
                item = {
                    _id: item._id,
                    name: item.name,
                    time: item.time,
                    createdBy: item.createdBy,
                    type: item.type == 1 ? 'Chuyển ngành học' : '',
                }
                return item;
            });

            res.render('bdt/campaign',
                {
                    campaigns: campaigns,
                    _campaignTypes: JSON.stringify(campaignTypes),
                });
        } catch (e) {
            next(e);
        }
    }

    //Middleware check papper status

    async getAllCourse() {
        return [
            {
                name: "Ứng dụng phầm mềm",
                majors: [
                    { name: "Java" },
                    { name: ".Net" },
                ],
                fee: 5600000
            },
            {
                name: "Phát triển phần mềm",
                majors: [
                    { name: "Java" },
                    { name: ".Net" },
                ],
                fee: 5600000
            },
            {
                name: "Lập trình máy tính",
                majors: [
                    { name: "Mobile" },
                    { name: "IOT" },
                ],
                fee: 5600000
            },
            {
                name: "Lập trình Mobile",
                majors: [
                    { name: "Đa nền tảng" },
                    { name: "Game" },
                ],
                fee: 5600000
            },
            {
                name: "Thiết kế trang Web",
                majors: [
                    { name: "Frontend" },
                    { name: "Backend" },
                ],
                fee: 5600000
            },
            {
                name: "Lập trình web",
                majors: [
                    { name: "Frontend" },
                    { name: "Backend" },
                ],
                fee: 5600000
            },
            {
                name: "Marketing và bán hàng",
                majors: [
                    { name: "Marketing và bán hàng" }
                ],
                fee: 5600000
            },
            {
                name: "Thương mại điện tử",
                majors: [
                    { name: "Thương mại điện tử", }
                ],
                fee: 5600000
            },
            {
                name: "Quan hệ công chúng và tổ chức sự kiện",
                majors: [
                    { name: "Quan hệ công chúng và tổ chức sự kiện", }
                ],
                fee: 5600000
            },
            {
                name: "Logistics",
                majors: [
                    { name: "Logistics", }
                ],
                fee: 5600000
            },
            {
                name: "Quản trị nhà hàng",
                majors: [
                    { name: "Quản trị nhà hàng", }
                ],
                fee: 8200000
            },
            {
                name: "Quản trị khách sạn",
                majors: [
                    { name: "Quản trị khách sạn", }
                ],
                fee: 8200000
            },
            {
                name: "Công nghệ kỹ thuật điều khiển và Tự động hóa",
                majors: [
                    { name: "Công nghiệp" },
                    { name: "Dân dụng" },
                ],
                fee: 5600000
            },
            {
                name: "Thiết kế đồ họa",
                majors: [
                    { name: "Nội và ngoại thất" },
                    { name: "Dựng phim và quảng cáo" },
                ],
                fee: 5600000
            },
            {
                name: "Hướng dẫn du lịch",
                majors: [
                    { name: "Hướng dẫn du lịch", }
                ],
                fee: 8200000
            },
            {
                name: "Công nghệ kỹ thuật cơ khí",
                majors: [
                    { name: "Công nghệ kỹ thuật cơ khí", }
                ],
                fee: 5600000
            }
        ]
    }


    async getSubjects() {
        return [
            {
                code: "SKI101",
                fee: "1317000"
            },
            {
                code: "MUL101",
                fee: "1317000"
            },
            {
                code: "COM101",
                fee: "1317000"
            },
            {
                code: "COM107",
                fee: "1317000"
            },
            {
                code: "COM108",
                fee: "1317000"
            },
            {
                code: "ENT112",
                fee: "2600000"
            },
            {
                code: "WEB101",
                fee: "1317000"
            },
            {
                code: "MOB101",
                fee: "1317000"
            },
            {
                code: "COM201",
                fee: "1317000"
            },
            {
                code: "WEB104",
                fee: "1317000"
            },
            {
                code: "ENT122",
                fee: "2600000"
            },
            {
                code: "MOB102",
                fee: "1317000"
            },
            {
                code: "MOB103",
                fee: "1317000"
            },
            {
                code: "WEB302",
                fee: "1317000"
            },
            {
                code: "MOB202",
                fee: "1317000"
            },
            {
                code: "ENT212",
                fee: "2600000"
            },
            {
                code: "MOB204",
                fee: "1317000"
            },
            {
                code: "MOB201",
                fee: "1317000"
            },
            {
                code: "PRO112",
                fee: "1317000"
            },
            {
                code: "ENT222",
                fee: "2600000"
            },
            {
                code: "MOB305",
                fee: "1317000"
            },
            {
                code: "IOT101",
                fee: "1317000"
            },
            {
                code: "MOB306",
                fee: "1317000"
            },
            {
                code: "MOB401",
                fee: "1317000"
            },
            {
                code: "IOT102",
                fee: "1317000"
            },
            {
                code: "MOB402",
                fee: "1317000"
            },
            {
                code: "MOB104",
                fee: "1317000"
            },
            {
                code: "IOT201",
                fee: "1317000"
            },
            {
                code: "SKI201",
                fee: "1317000"
            },
            {
                code: "MOB403",
                fee: "1317000"
            },
            {
                code: "IOT202",
                fee: "1317000"
            },
            {
                code: "PRO205",
                fee: "2195000"
            },
            {
                code: "PRO222",
                fee: "2195000"
            },
            {
                code: "PRO118",
                fee: "2195000"
            },
            {
                code: "VIE103",
                fee: "880000"
            },
            {
                code: "VIE101",
                fee: "880000"
            },
            {
                code: "VIE102",
                fee: "878000"
            },
            {
                code: "SYB301",
                fee: "1317000"
            },
            {
                code: "MUL116",
                fee: "1317000"
            },
            {
                code: "MUL102",
                fee: "1317000"
            },
            {
                code: "MUL214",
                fee: "1317000"
            },
            {
                code: "MUL114",
                fee: "1317000"
            },
            {
                code: "MUL117",
                fee: "1317000"
            },
            {
                code: "MUL211",
                fee: "1317000"
            },
            {
                code: "MUL212",
                fee: "1317000"
            },
            {
                code: "MUL213",
                fee: "1317000"
            },
            {
                code: "MUL217",
                fee: "1317000"
            },
            {
                code: "MUL319",
                fee: "1317000"
            },
            {
                code: "MUL215",
                fee: "1317000"
            },
            {
                code: "MUL216",
                fee: "1317000"
            },
            {
                code: "PRO111",
                fee: "1317000"
            },
            {
                code: "MUL218",
                fee: "1317000"
            },
            {
                code: "MUL219",
                fee: "1317000"
            },
            {
                code: "MUL317",
                fee: "1317000"
            },
            {
                code: "MUL220",
                fee: "1317000"
            },
            {
                code: "MUL322",
                fee: "1317000"
            },
            {
                code: "MUL321",
                fee: "1317000"
            },
            {
                code: "MUL221",
                fee: "1317000"
            },
            {
                code: "MUL222",
                fee: "1317000"
            },
            {
                code: "MUL315",
                fee: "1317000"
            },
            {
                code: "MUL311",
                fee: "1317000"
            },
            {
                code: "MUL320",
                fee: "1317000"
            },
            {
                code: "MUL318",
                fee: "1317000"
            },
            {
                code: "PRO223",
                fee: "2195000"
            },
            {
                code: "PRO221",
                fee: "2195000"
            },
            {
                code: "PRO119",
                fee: "2195000"
            },
            {
                code: "NET101",
                fee: "1317000"
            },
            {
                code: "WEB202",
                fee: "1317000"
            },
            {
                code: "WEB201",
                fee: "1317000"
            },
            {
                code: "WEB205",
                fee: "1317000"
            },
            {
                code: "WEB204",
                fee: "1317000"
            },
            {
                code: "WEB102",
                fee: "1317000"
            },
            {
                code: "PRO101",
                fee: "1317000"
            },
            {
                code: "WEB206",
                fee: "1317000"
            },
            {
                code: "WEB301",
                fee: "1317000"
            },
            {
                code: "WEB501",
                fee: "1317000"
            },
            {
                code: "WEB207",
                fee: "1317000"
            },
            {
                code: "WEB503",
                fee: "1317000"
            },
            {
                code: "SOF303",
                fee: "1317000"
            },
            {
                code: "WEB502",
                fee: "1317000"
            },
            {
                code: "WEB203",
                fee: "1317000"
            },
            {
                code: "WEB208",
                fee: "1317000"
            },
            {
                code: "WEB401",
                fee: "1317000"
            },
            {
                code: "WEB209",
                fee: "1317000"
            },
            {
                code: "PRO224",
                fee: "2195000"
            },
            {
                code: "PRO220",
                fee: "2195000"
            },
            {
                code: "PRO116",
                fee: "2195000"
            },
            {
                code: "COM203",
                fee: "1317000"
            },
            {
                code: "NET102",
                fee: "1317000"
            },
            {
                code: "SOF203",
                fee: "1317000"
            },
            {
                code: "NET103",
                fee: "1317000"
            },
            {
                code: "SOF204",
                fee: "1317000"
            },
            {
                code: "SOF205",
                fee: "1317000"
            },
            {
                code: "SOF102",
                fee: "1317000"
            },
            {
                code: "PRO104",
                fee: "1317000"
            },
            {
                code: "PRO131",
                fee: "1317000"
            },
            {
                code: "SOF304",
                fee: "1317000"
            },
            {
                code: "SOF307",
                fee: "1317000"
            },
            {
                code: "SOF301",
                fee: "1317000"
            },
            {
                code: "NET104",
                fee: "1317000"
            },
            {
                code: "SOF302",
                fee: "1317000"
            },
            {
                code: "NET105",
                fee: "1317000"
            },
            {
                code: "SOF306",
                fee: "1317000"
            },
            {
                code: "NET106",
                fee: "1317000"
            },
            {
                code: "PRO211",
                fee: "2195000"
            },
            {
                code: "PRO219",
                fee: "2195000"
            },
            {
                code: "PRO115",
                fee: "2195000"
            },
            {
                code: "MAR102",
                fee: "1317000"
            },
            {
                code: "PRE101",
                fee: "1317000"
            },
            {
                code: "PRE102",
                fee: "1317000"
            },
            {
                code: "PRE103",
                fee: "1317000"
            },
            {
                code: "PRE105",
                fee: "1317000"
            },
            {
                code: "PRE104",
                fee: "1317000"
            },
            {
                code: "PRE106",
                fee: "1317000"
            },
            {
                code: "PRE203",
                fee: "1317000"
            },
            {
                code: "PRE210",
                fee: "1317000"
            },
            {
                code: "PRE202",
                fee: "1317000"
            },
            {
                code: "PRE206",
                fee: "1317000"
            },
            {
                code: "PRE204",
                fee: "1317000"
            },
            {
                code: "PRO114",
                fee: "1317000"
            },
            {
                code: "PRE205",
                fee: "1317000"
            },
            {
                code: "PRE207",
                fee: "1317000"
            },
            {
                code: "MAR207",
                fee: "1317000"
            },
            {
                code: "PRE208",
                fee: "1317000"
            },
            {
                code: "PRE209",
                fee: "1317000"
            },
            {
                code: "PRO213",
                fee: "2195000"
            },
            {
                code: "PRO110",
                fee: "2195000"
            },
            {
                code: "MAR103",
                fee: "1317000"
            },
            {
                code: "BUS102",
                fee: "1317000"
            },
            {
                code: "BUS201",
                fee: "1317000"
            },
            {
                code: "MAR202",
                fee: "1317000"
            },
            {
                code: "DOM106",
                fee: "1317000"
            },
            {
                code: "PRE201",
                fee: "1317000"
            },
            {
                code: "BUS204",
                fee: "1317000"
            },
            {
                code: "MAR205",
                fee: "1317000"
            },
            {
                code: "BUS303",
                fee: "1317000"
            },
            {
                code: "PRO102",
                fee: "1317000"
            },
            {
                code: "DOM105",
                fee: "1317000"
            },
            {
                code: "MAR206",
                fee: "1317000"
            },
            {
                code: "BUS205",
                fee: "1317000"
            },
            {
                code: "DOM102",
                fee: "1317000"
            },
            {
                code: "BUS103",
                fee: "1317000"
            },
            {
                code: "PRO204",
                fee: "2195000"
            },
            {
                code: "PRO117",
                fee: "2195000"
            },
            {
                code: "DOM101",
                fee: "1317000"
            },
            {
                code: "DOM103",
                fee: "1317000"
            },
            {
                code: "DOM104",
                fee: "1317000"
            },
            {
                code: "DOM107",
                fee: "1317000"
            },
            {
                code: "DOM108",
                fee: "1317000"
            },
            {
                code: "PRO113",
                fee: "1317000"
            },
            {
                code: "DOM201",
                fee: "1317000"
            },
            {
                code: "DOM202",
                fee: "1317000"
            },
            {
                code: "DOM203",
                fee: "1317000"
            },
            {
                code: "PRO212",
                fee: "2195000"
            },
            {
                code: "PRO109",
                fee: "2195000"
            },
            {
                code: "TOU101",
                fee: "1317000"
            },
            {
                code: "HIS101",
                fee: "1317000"
            },
            {
                code: "TOU102",
                fee: "1317000"
            },
            {
                code: "TOU106",
                fee: "1317000"
            },
            {
                code: "PSY101",
                fee: "1317000"
            },
            {
                code: "HIS102",
                fee: "1317000"
            },
            {
                code: "TOU107",
                fee: "1317000"
            },
            {
                code: "TOU103",
                fee: "1317000"
            },
            {
                code: "TOU201",
                fee: "1317000"
            },
            {
                code: "ETO101",
                fee: "1317000"
            },
            {
                code: "TOU202",
                fee: "1317000"
            },
            {
                code: "TOU203",
                fee: "1317000"
            },
            {
                code: "TOU204",
                fee: "1317000"
            },
            {
                code: "ETO201",
                fee: "1317000"
            },
            {
                code: "PRO105",
                fee: "1756000"
            },
            {
                code: "TOU301",
                fee: "1317000"
            },
            {
                code: "TOU302",
                fee: "1317000"
            },
            {
                code: "TOU401",
                fee: "1317000"
            },
            {
                code: "TOU402",
                fee: "1317000"
            },
            {
                code: "PRO207",
                fee: "2195000"
            },
            {
                code: "PRO120",
                fee: "2195000"
            },
            {
                code: "HOS101",
                fee: "1317000"
            },
            {
                code: "HOS401",
                fee: "1317000"
            },
            {
                code: "HOS103",
                fee: "1317000"
            },
            {
                code: "HOS102",
                fee: "1317000"
            },
            {
                code: "HOS104",
                fee: "1317000"
            },
            {
                code: "HOS105",
                fee: "1317000"
            },
            {
                code: "EHO102",
                fee: "1317000"
            },
            {
                code: "ACC105",
                fee: "1317000"
            },
            {
                code: "HOS201",
                fee: "1317000"
            },
            {
                code: "HOS202",
                fee: "1317000"
            },
            {
                code: "EHO202",
                fee: "1317000"
            },
            {
                code: "PRO108",
                fee: "1756000"
            },
            {
                code: "HOS304",
                fee: "1317000"
            },
            {
                code: "HOS305",
                fee: "1317000"
            },
            {
                code: "HOS403",
                fee: "1317000"
            },
            {
                code: "COM106",
                fee: "1317000"
            },
            {
                code: "HOS402",
                fee: "1317000"
            },
            {
                code: "PRO209",
                fee: "2195000"
            },
            {
                code: "PRO121",
                fee: "2195000"
            },
            {
                code: "HOS302",
                fee: "1317000"
            },
            {
                code: "HOS203",
                fee: "1317000"
            },
            {
                code: "HOS204",
                fee: "1317000"
            },
            {
                code: "PRO107",
                fee: "1756000"
            },
            {
                code: "HOS301",
                fee: "1317000"
            },
            {
                code: "HOS303",
                fee: "1317000"
            },
            {
                code: "PRO210",
                fee: "2195000"
            },
            {
                code: "PRO122",
                fee: "2195000"
            }
        ]
    }

    getSemFromDate(d = new Date()) {
        let date = new Date(d);
        let month = date.getMonth();
        let year = date.getFullYear().toString().slice(-2,);
        switch (month) {
            case 0:
            case 1:
            case 2:
            case 3:
                return `SU${year}`;
            case 4:
            case 5:
            case 6:
            case 7:
                return `FA${year}`;
            case 8:
            case 9:
            case 10:
            case 11:
                return `SP${Number(year) + 1}`;
            default: break;
        }
    }

    async downloadPaper(request, response, next) {
        try {
            const { id } = request.query;
            let { semesterProps, englishProps, courses } = resourses;
            const rs = await changeCoursePaperService.downloadPaper(id, semesterProps, englishProps);
            await response.status(rs.statusCode).json(rs);
        } catch (e) {
            next(e);
        }
    }


}

module.exports = new IndexController();
