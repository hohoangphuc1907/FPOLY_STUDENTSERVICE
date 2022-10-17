'use strict';
const { Service } = require('../../system/services/Service');
const autoBind = require('auto-bind');
const config = require('../../config/config').getConfig();
const { HttpResponse } = require('../../system/helpers/HttpResponse');


class UserService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }

    async register(data) {
        try {
            return await super.insert(data);
        } catch (error) {
            throw error;
        }
    }
    async createStudent(body) {
        try {
            // xoa het students truoc khi them moi
            await this.model.deleteMany({ 'role': config.USER_ROLE.STUDENT });
            setTimeout(async () => {
                for (let index = 0; index < body.length; index++) {
                    const row = body[index];
                    const data = {
                        name: row.NAME,
                        code: row.CODE,
                        email: row.EMAIL + '@fpt.edu.vn',
                        role: config.USER_ROLE.STUDENT,
                        current_semester: row.CURRENT_SEMESTER,
                        available: false,
                    }
                    try{
                        await this.model.create(data);
                        console.log('>>>>>>>>>>>>>>>save ', index, data);
                    } catch(error){
                        console.log('>>>>>>>>>>>>>>>error ', index, error);
                    }
                }
            }, 0);
            return new HttpResponse({});
        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async getStudentByCode(code) {
        try {
            const user = await this.model.findOne({ "code": { '$regex': code.toLowerCase(), '$options': 'i' } });
            if (user) {
                return new HttpResponse(user);
            }
            throw new Error('Không tìm thấy sinh viên');
        } catch (errors) {
            throw new Error(errors.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async findByEmail(email, includePassword = false) {
        return includePassword ? this.model.findByEmail(email).select('+password') : this.model.findByEmail(email);
    }

    async getAll(query, role) {

        let { skip, limit, sortBy } = query;

        skip = skip ? Number(skip) : 0;
        limit = limit ? Number(limit) : 10;
        sortBy = sortBy ? sortBy : { 'createdAt': -1 };

        delete query.skip;
        delete query.limit;
        delete query.sortBy;

        // must call redis first

        try {
            if (role < config.USER_ROLE.ADMIN) {
                throw new Error('Bạn không có quyền truy cập');
            }
            const res = await this.model
                .find(query)
                .sort(sortBy)
                .skip(skip)
                .limit(limit)
                .populate('updatedBy createdBy')
                .populate({
                    path: 'department',
                    populate: {
                        path: 'unit',
                        select: 'name _id'
                    }
                });

            return new HttpResponse(res);
        } catch (errors) {
            throw new Error('Có lỗi, bạn có thể thử lại sau');;
        }
    }

    async findOne(_id) {
        try {
            const user = await this.model.findOne({ "_id": _id });
            return new HttpResponse(user);
        } catch (errors) {
            throw errors;
        }
    }

    async cpanel_Update(id, data, role) {
        try {
            if (role < config.USER_ROLE.ADMIN) {
                throw new Error('Bạn không có quyền cập nhật');
            }
            if (id == data.updatedBy) {
                throw new Error('Bạn không có quyền cập nhật');
            }
            const item = await this.model.findByIdAndUpdate(id, data, { 'new': true });

            return new HttpResponse(item);
        } catch (errors) {
            throw new Error(errors.message || 'Có lỗi, bạn có thể thử lại sau');;
        }
    }

    async getOneUser(_id) {
        try {
            const user = await this.model.findOne({ "_id": _id });
            if (!user) {
                return "";
            }
            return new HttpResponse(user);
        } catch (errors) {
            throw errors;
        }
    }
}

module.exports = { UserService };
