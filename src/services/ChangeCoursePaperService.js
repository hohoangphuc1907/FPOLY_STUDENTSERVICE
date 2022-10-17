'use strict';
const { Service } = require('../../system/services/Service');
const autoBind = require('auto-bind');
const { HttpResponse } = require('../../system/helpers/HttpResponse');
const config = require('../../config/config').getConfig();
const { UserService } = require('./UserService');
const { User } = require('../models/User');
const userService = new UserService(new User().getInstance());

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

const { convertWordFiles } = require('convert-multiple-files');

class ChangeCoursePaperService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }

    async create(body, id) {
        try {
            let user = await userService.getOneUser(id);
            user = user.data;
            let { version, campaign } = body;
            version = {
                ...version,
                education_status: config.EDUCATION_CHANGE_COURSE_STATUS.CLOSED,
                education_updated_at: new Date(),
                education_updated_by: { _id: user._id, name: user.email.slice(0, user.email.indexOf('@')) },
                finance_status: config.FINANCE_CHANGE_COURSE_STATUS.PENDING,
                finance_updated_at: null,
                finance_updated_by: null,
                student_service_status: config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.PENDING,
                student_service_updated_at: null,
                student_service_updated_by: null,
                is_mail_sent: false,
                paper_status: config.PAPER_CHANGE_COURSE_STATUS.PENDING,
                version_id: new Date().getTime(),
            }
            let versions = [];
            versions.push(version);

            const item = await this.model.create({ versions: versions, campaign: campaign });

            if (item) {
                return new HttpResponse(item);
            }
            throw new Error('Có lỗi, bạn có thể thử lại sau');

        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async updateSendEmail(body, idUser) {
        try {
            const { idPaper, idVersion } = body;
            const version_id = parseInt(idVersion);
            const user = await userService.getOneUser(idUser);

            const data = {
                'versions.$.is_mail_sent': true,
                'versions.$.student_service_updated_by': { _id: user.data._id, name: user.data.email.slice(0, user.data.email.indexOf('@')) },
                'versions.$.student_service_updated_at': new Date(),
            };

            const item = await this.model.updateOne({ "_id": idPaper, "versions.version_id": version_id }, {
                $set: data
            });
            return new HttpResponse(item);
        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async financeUpdate(body, idUser) {
        try {
            const { idPaper, idVersion } = body;
            const paper = await this.model.findOne({ '_id': idPaper });
            const version_id = parseInt(idVersion);
            const user = await userService.getOneUser(idUser);

            const data = {
                'versions.$.finance_updated_at': new Date(),
                'versions.$.finance_updated_by': { _id: user.data._id, name: user.data.email.slice(0, user.data.email.indexOf('@')) },
                'versions.$.education_status': config.EDUCATION_CHANGE_COURSE_STATUS.CLOSED,
                'versions.$.finance_status': config.FINANCE_CHANGE_COURSE_STATUS.CLOSED,
                'versions.$.student_service_status': config.PAPER_CHANGE_COURSE_STATUS.PENDING,
                'versions.$.paper_status': config.PAPER_STATUS.STEP2
            };

            const item = await this.model.updateOne({ "_id": idPaper, "versions.version_id": version_id }, {
                $set: data
            });
            return new HttpResponse(item);
        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async financeUpdateCancel(body, idUser) {
        try {
            const { idPaper, idVersion } = body;
            const version_id = parseInt(idVersion);
            const paper = await this.model.findOne({ '_id': idPaper });
            const user = await userService.getOneUser(idUser);

            const data = {
                'versions.$.finance_updated_at': new Date(),
                'versions.$.finance_updated_by': { _id: user.data._id, name: user.data.email.slice(0, user.data.email.indexOf('@')) },
                'versions.$.education_status': config.EDUCATION_CHANGE_COURSE_STATUS.REDO,
                'versions.$.finance_status': config.FINANCE_CHANGE_COURSE_STATUS.REJECT
            };

            const item = await this.model.updateOne({ "_id": idPaper, "versions.version_id": version_id },
                { $set: data });

            return new HttpResponse(item);
        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async studentServiceUpdateCancel(body, idUser) {
        try {
            const { idPaper, idVersion } = body;
            const version_id = parseInt(idVersion);
            const paper = await this.model.findOne({ '_id': idPaper });
            const user = await userService.getOneUser(idUser);

            const data = {
                'versions.$.student_service_updated_at': new Date(),
                'versions.$.student_service_updated_by': { _id: user.data._id, name: user.data.email.slice(0, user.data.email.indexOf('@')) },
                'versions.$.education_status': config.EDUCATION_CHANGE_COURSE_STATUS.REDO,
                'versions.$.paper_status': config.PAPER_STATUS.STEP2,
                'versions.$.student_service_status': config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.REJECT
            };

            const item = await this.model.updateOne({ "_id": idPaper, "versions.version_id": version_id },
                { $set: data });

            return new HttpResponse(item);
        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async updatePaperResult(body, idUser) {
        try {
            const { idPaper, paper_result, idVersion } = body;
            const version_id = parseInt(idVersion);
            const paper = await this.model.findOne({ '_id': idPaper });
            const user = await userService.getOneUser(idUser);

            console.log(body);

            if (paper_result === config.PAPER_CHANGE_COURSE_STATUS.FINISH) {
                const data = {
                    'versions.$.student_service_updated_at': new Date(),
                    'versions.$.student_service_updated_by': { _id: user.data._id, name: user.data.email.slice(0, user.data.email.indexOf('@')) },
                    [`versions.$.paper_change_course_status`]: config.PAPER_CHANGE_COURSE_STATUS.FINISH,
                    [`versions.$.paper_status`]: config.PAPER_STATUS.STEP3,
                    [`versions.$.student_service_status`]: config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.CLOSED
                }

                console.log(data);
                const item = await this.model.updateOne({ "_id": idPaper, "versions.version_id": version_id }, { $set: data });
                return new HttpResponse(item);
            } else if (paper_result === config.PAPER_CHANGE_COURSE_STATUS.CANCEL) {
                const data = {
                    'versions.$.student_service_updated_at': new Date(),
                    'versions.$.student_service_updated_by': { _id: user.data._id, name: user.data.email.slice(0, user.data.email.indexOf('@')) },
                    [`versions.$.paper_change_course_status`]: config.PAPER_CHANGE_COURSE_STATUS.CANCEL,
                    [`versions.$.paper_status`]: config.PAPER_STATUS.STEP3,
                    [`versions.$.student_service_status`]: config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.CLOSED
                }
                const item = await this.model.updateOne({ "_id": idPaper, "versions.version_id": version_id }, { $set: data });
                return new HttpResponse(item);
            }
        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async putChangeCoursePaperEducationUpdate(body, paperId, userId, email) {
        try {
            let paper = await this.model.findOne({ '_id': paperId });
            if (!paper) {
                throw new Error('Không tìm thấy đơn');
            }
            body = {
                ...body,
                education_status: config.EDUCATION_CHANGE_COURSE_STATUS.CLOSED,
                education_updated_at: new Date(),
                education_updated_by: { _id: userId, name: email.slice(0, email.indexOf('@')) },
                finance_status: config.FINANCE_CHANGE_COURSE_STATUS.PENDING,
                finance_updated_at: paper.versions[0].finance_updated_at,
                finance_updated_by: paper.versions[0].finance_updated_by,
                student_service_status: config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.PENDING,
                student_service_updated_at: paper.versions[0].student_service_updated_at,
                student_service_updated_by: paper.versions[0].student_service_updated_by,
                paper_status: config.PAPER_CHANGE_COURSE_STATUS.PENDING,
                version_id: new Date().getTime(),
            }
            let versions = [];
            versions.push(body);

            const item = await this.model.findByIdAndUpdate(paperId, { versions: versions }, { new: true });
            return new HttpResponse(item);
        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async getOneCoursePaper(_id) {
        try {
            const res = await this.model.findOne({ '_id': _id }).populate('campaign');
            return new HttpResponse(res);

        } catch (e) {
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        }
    }

    async update(body, id) {
        try {
            const data = {
                ...body
            }

            const item = await this.model.findByIdAndUpdate(id, data);

            if (item) {
                return new HttpResponse(item);
            }
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        } catch (error) {

        }
    }

    async getStatusAnalys(coursePapers) {
        try {
            //FIXME: Fix caching
            const statusAnalys = config.PAPER_STATUS_OPTIONS.map(item => { return { ...item, count: 0 } });
            coursePapers.forEach(coursePaper => {
                statusAnalys[Number(coursePaper.paper_status) - 1].count++;
            });
            return statusAnalys;
        } catch (error) {
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        }
    }

    async getAll(query) {
        let { skip, limit, sortBy, campaign, course } = query;
        course = Array.isArray(course) ? course : course ? [course] : [];
        skip = skip ? Number(skip) : 0;
        limit = limit ? Number(limit) : 10;
        sortBy = sortBy ? sortBy : { 'createdAt': -1 };

        delete query.skip;
        delete query.limit;
        delete query.sortBy;
        delete query.campaign;
        delete query.course;

        if (campaign) query.campaign = campaign;
        if (course.length > 0) query.versions = { $elemMatch: { current_course: { $in: course } } }
        // must call redis first
        console.log(query)
        try {
            const res = await this.model
                .find(query)
                .sort(sortBy)
                .skip(skip)
                .limit(limit)
                .populate('updatedBy createdBy')
                .populate({ path: 'education_accepted_by', select: 'name' });
            return new HttpResponse(res);
        } catch (errors) {
            console.log(errors)
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        }
    }

    async downloadPaper(idPaper, _semesterProps, _englishProps) {
        try {

            const path = await this.generateDocPDF(idPaper, _semesterProps, _englishProps);
            return new HttpResponse({ path: path });

        } catch (e) {
            console.log(e)
            throw new Error(e.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async generateDocPDF(idPaper, _semesterProps, _englishProps) {
        const paper = await this.model.findOne({ '_id': idPaper }).populate('campaign');
        const { requested_course, start_at_semester, education_notes } = paper.versions[paper.versions.length - 1];

        const { campaign: { time } } = paper;
        const tuition_deadline = time;


        let sum = 0;
        let detail_instruction = `Ngành ${requested_course}. `;
        paper.versions[paper.versions.length - 1].study_planning?.sort((a, b) => a.semester.localeCompare(b.semester));
        let tableData = paper.versions[paper.versions.length - 1].study_planning?.map(item => {
            let total = Number(item.semester_fee) + Number(item.english.fee);
            let _index = _semesterProps.sems.findIndex(x => x.value == item.semester);
            detail_instruction += `${item.status == _semesterProps.status[0].value ? '' : item.status} ${item.semester} `;
            detail_instruction += `${item.finished_subjects.length > 0 ? `Môn miễn giảm: ` : ``}`;

            let finished_html = '';
            for (let j = 0; j < item.finished_subjects.length; j++) {
                const subject = item.finished_subjects[j];
                finished_html += `${subject.name}: ${this.formatCurrency(subject.fee)}`
                finished_html += j < item.finished_subjects.length - 1 ? `, ` : ``;
                total -= Number(subject.fee);
                detail_instruction += `${subject.name}`
                if (j == item.finished_subjects.length - 1) {
                    detail_instruction += `. `
                } else {
                    detail_instruction += `; `
                }
            }
            let new_html = '';
            detail_instruction += `${item.new_subjects.length > 0 ? `Môn bổ sung: ` : ``}`
            for (let j = 0; j < item.new_subjects.length; j++) {
                const subject = item.new_subjects[j];
                new_html += `${subject.name}: ${this.formatCurrency(subject.fee)}`;
                new_html += j < item.new_subjects.length - 1 ? `, ` : ``;
                total += Number(subject.fee);
                detail_instruction += `${subject.name}`
                if (j == item.new_subjects.length - 1) {
                    detail_instruction += `. `
                } else {
                    detail_instruction += `; `
                }
            }

            let retake_retest = '';
            for (let j = 0; j < item.retake_subjects.length; j++) {
                const subject = item.retake_subjects[j];
                retake_retest += `${subject.name}`;
                retake_retest += j < item.retake_subjects.length - 1 ? `, ` : ``;
            }

            for (let j = 0; j < item.retest_subjects.length; j++) {
                const subject = item.retest_subjects[j];
                retake_retest += `${subject.name}: ${subject.fee}`;
                retake_retest += j < item.retest_subjects.length - 1 ? `, ` : ``;
            }

            sum += total;
            detail_instruction += item.english.level.toString() == _englishProps.levels[0].value.toString() ? '' : ` Level tiếng Anh: ${item.english.level}. `

            return [
                `${item.semester} \n ${item.status} \n ${this.formatCurrency(item.semester_fee)}`,
                item.english.level.toString() == _englishProps.levels[0].value.toString() ? '' :
                    `${item.english.status} ${item.english.level}: ${this.formatCurrency(item.english.fee)}`,
                finished_html,
                new_html,
                retake_retest,
                `${this.formatCurrency(total)}`,
                _index,
            ]
        });

        detail_instruction += ' ' + education_notes + '. '
        detail_instruction += 'Sinh viên tự đăng ký học lại hoặc thi lại trên AP.'

        let firstStudyPlan = paper.versions[paper.versions.length - 1].study_planning?.[0];
        let versionData = paper.versions[paper.versions.length - 1];

        let modalData = {
            ...versionData,
            tuition: firstStudyPlan.semester_fee,
            study_planning: [...tableData],
            sum: sum,
            detail_instruction: detail_instruction,
            education_notes: education_notes,
            start_at_semester: start_at_semester,
            tuition_deadline: tuition_deadline
        };


        let docxData = {
            request_at: this.formatDate(modalData.requested_at),
            fullname: modalData.fullname,
            current_course: modalData.current_course,
            current_semester: modalData.current_semester,
            student_code: modalData.student_code,
            requested_course: modalData.requested_course,
            requested_semester: modalData.requested_semester,
            requested_reason: modalData.requested_reason,
            request_accepted_reason: modalData.requested_reason,
            new_course_semester: modalData.status_at_new_semester + ' ' + modalData.requested_semester,
            current_major: modalData.current_major,
            tuition: this.formatCurrency(modalData.sum),
            tuition_deadline: this.formatDate(modalData.tuition_deadline),
            education_notes: modalData.education_notes,
            detail_instruction: modalData.detail_instruction,
            start_at_semester: start_at_semester,
        }

        for (var i = 0; i < 7; i++) {
            let found = modalData.study_planning?.find(x => x[6] == i);
            if (!found) {
                docxData[`sem_${i}`] = `Kỳ ${i + 1}`;
                docxData[`tbl_english_${i}`] = "...";
                docxData[`tbl_finished_subjects_${i}`] = "...";
                docxData[`tbl_new_subjects_${i}`] = "...";
                docxData[`tbl_retake_subjects_${i}`] = "...";
                docxData[`tbl_fee_${i}`] = "...";
            } else {
                docxData[`sem_${i}`] = found[0] || `Kỳ ${i + 1}`;
                docxData[`tbl_english_${i}`] = found[1] || "...";
                docxData[`tbl_finished_subjects_${i}`] = found[2] || "...";
                docxData[`tbl_new_subjects_${i}`] = found[3] || "...";
                docxData[`tbl_retake_subjects_${i}`] = found[4] || "...";
                docxData[`tbl_fee_${i}`] = found[5] || "...";
            }
        }

        const content = fs.readFileSync(
            path.resolve(`${__dirname}/../../public/uploads/TVCN.docx`),
            "binary"
        );

        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.render(docxData);

        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });

        const name = new Date().getTime();

        await fs.writeFileSync(path.resolve(`${__dirname}/../../public/uploads/${name}.docx`), buf);

        const inputPath = path.resolve(`${__dirname}/../../public/uploads/${name}.docx`);
        const outputPath = path.resolve(`${__dirname}/../../public/uploads/`);

        console.log(inputPath, outputPath);

        await convertWordFiles(inputPath, 'pdf', outputPath);
        setTimeout(() => {
            fs.unlink(path.resolve(`${__dirname}/../../public/uploads`) + '/' + name + '.pdf', (err) => {
                if (err) {
                    console.log("Failed to delete local file:" + err);
                } else {
                    console.log('Successfully deleted local file: ' + name + '.pdf');
                }
            });
            fs.unlink(path.resolve(`${__dirname}/../../public/uploads`) + '/' + name + '.docx', (err) => {
                if (err) {
                    console.log("Failed to delete local file:" + err);
                } else {
                    console.log('Successfully deleted local file: ' + name + '.docx');
                }
            });
        }, 60000);

        return config.HOST + `/uploads/${name}.pdf`

    }

    async getPaperByCampaign(campaignId) {
        let paper = await this.model.find({ campaign: campaignId });
        return paper;
    }

    formatCurrency(value) {
        if (!value) return '';
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }

    formatDate(a, type = 1) {
        let date = new Date(a);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        month = month.toString().length === 1 ? '0' + month : month;
        let day = date.getDate().toString().length === 1 ?
            '0' + date.getDate().toString() : date.getDate().toString();
        if (type == 1) {
            return day + '-' + month + '-' + year;
        }
        let h = date.getHours();
        let m = date.getMinutes();
        h = h.toString().length === 1 ? '0' + h : h;
        m = m.toString().length === 1 ? '0' + m : m;
        return year + '-' + month + '-' + day + 'T' + h + ':' + m;
    }



}

module.exports = { ChangeCoursePaperService };
