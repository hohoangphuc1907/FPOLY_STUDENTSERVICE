'use strict';
const { Service } = require('../../system/services/Service');
const autoBind = require('auto-bind');
const { HttpResponse } = require('../../system/helpers/HttpResponse');
const config = require('../../config/config').getConfig();
const { UserService } = require('./UserService');
const { User } = require('../models/User');
const userService = new UserService(new User().getInstance());
const { default: mongoose } = require('mongoose');
const { select, log } = require('async');

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
            body = {
                ...body,
                education_status: config.EDUCATION_CHANGE_COURSE_STATUS.CLOSED,
                education_updated_at: new Date(),
                education_updated_by: { _id: user._id, name: user.email.slice(0, user.email.indexOf('@')) },
                finance_status: config.FINANCE_CHANGE_COURSE_STATUS.PENDING,
                finance_updated_at: null,
                finance_updated_by: null,
                student_service_status: config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.PENDING,
                student_service_updated_at: null,
                student_service_updated_by: null,
                paper_status: config.PAPER_CHANGE_COURSE_STATUS.PENDING,
                version_id: new Date().getTime(),
            }
            let versions = [];
            versions.push(body);

            const item = await this.model.create({ versions: versions });

            if (item) {
                return new HttpResponse(item);
            }
            throw new Error('Có lỗi, bạn có thể thử lại sau');

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
                'versions.$.finance_updated_by': { _id: user.data._id, name: user.data.email.slice(0, user.data.email.indexOf('@'))},
                'versions.$.education_status': config.EDUCATION_CHANGE_COURSE_STATUS.CLOSED,
                'versions.$.finance_status': config.FINANCE_CHANGE_COURSE_STATUS.CLOSED,
                'versions.$.student_service_status': config.PAPER_CHANGE_COURSE_STATUS.PENDING,
                'versions.$.paper_status': config.PAPER_STATUS.STEP2
            };

            const item = await this.model.updateOne({ "_id": idPaper, "versions.version_id": version_id}, {
                $set: data });
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
                'versions.$.finance_updated_by': { _id: user.data._id, name: user.data.email.slice(0, user.data.email.indexOf('@'))  },
                'versions.$.education_status': config.EDUCATION_CHANGE_COURSE_STATUS.REDO,
                'versions.$.finance_status': config.FINANCE_CHANGE_COURSE_STATUS.REJECT
            };

            const item = await this.model.updateOne({ "_id": idPaper, "versions.version_id": version_id},
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
                    'versions.$.student_service_updated_by': { _id: user.data._id, name: user.data.email.slice(0, user.data.email.indexOf('@'))},
                    [`versions.$.paper_change_course_status`]: config.PAPER_CHANGE_COURSE_STATUS.FINISH,
                    [`versions.$.paper_status`]: config.PAPER_STATUS.STEP3,
                    [`versions.$.student_service_status`]: config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.CLOSED
                }

                console.log(data);
                const item = await this.model.updateOne({ "_id": idPaper, "versions.version_id": version_id}, { $set: data });
                return new HttpResponse(item);
            } else if (paper_result === config.PAPER_CHANGE_COURSE_STATUS.CANCEL) {
                const data = {
                    'versions.$.student_service_updated_at': new Date(),
                    'versions.$.student_service_updated_by': { _id: user.data._id, name: user.data.email.slice(0, user.data.email.indexOf('@'))},
                    [`versions.$.paper_change_course_status`]: config.PAPER_CHANGE_COURSE_STATUS.FINISH,
                    [`versions.$.paper_status`]: config.PAPER_STATUS.STEP3,
                    [`versions.$.student_service_status`]: config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.CLOSED
                }
                const item = await this.model.updateOne({ "_id": idPaper, "versions.version_id": version_id}, { $set: data });
                return new HttpResponse(item);
            }
        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async putChangeCoursePaperEducationUpdate(body, id) {
        try {
            let {
                student_code, fullname, current_semester, current_course, current_major, requested_course,
                requested_semester, requested_reason, new_course_subjects, english_level,
                requested_major, idPaper
            } = body;

            const data = {
                fee_accepted_at: '',
                fee_accepted_by: '',
                student_code,
                requested_major,
                english_level,
                fullname,
                current_semester,
                current_course,
                current_major,
                requested_course,
                requested_semester,
                requested_reason,
                new_course_subjects,
            }

            const item = await this.model.findByIdAndUpdate(idPaper, { $push: { 'version': data }, 'finance_status': '' }, { new: true });
            return new HttpResponse(item);
        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async getOneCoursePaper(_id) {
        try {
            const res = await this.model.findOne({ '_id': _id });
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
        let { skip, limit, sortBy } = query;

        skip = skip ? Number(skip) : 0;
        limit = limit ? Number(limit) : 10;
        sortBy = sortBy ? sortBy : { 'createdAt': -1 };

        delete query.skip;
        delete query.limit;
        delete query.sortBy;

        // must call redis first

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
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        }
    }


}

module.exports = { ChangeCoursePaperService };
