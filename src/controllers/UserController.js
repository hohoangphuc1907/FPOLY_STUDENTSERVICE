const { Controller } = require('../../system/controllers/Controller');
const { UserService } = require('../services/UserService');
const { User } = require('../models/User');
const autoBind = require('auto-bind');
const userService = new UserService(new User().getInstance());
const config = require('../../config/config').getConfig();
const utility = require('../../system/helpers/Utility')
var multer = require("multer");
var path = require('path');
var fs = require('fs');
var XLSX = require('xlsx');
var FileReader = require('file-reader');
class UserController extends Controller {
    storage = multer.memoryStorage()
    upload = multer({ 'storage': this.storage, })
    constructor(service) {
        super(service);
        autoBind(this);
    }
    async students(req, res, next) {
        try {
            res.render('student/index');
        } catch (e) {
            next(e);
        }
    }

    async getStudentByCode(req, res, next) {
        try {
            const { code } = req.params;
            const response = await userService.getStudentByCode(code);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }

    async cpanel_UpdateStudent(req, res, next) {
        try {
            const { body } = req;
            const response = await userService.cpanel_UpdateStudent(body);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }

    }
    async readExcel(req, res, next) {
        try {
            var buf = new Buffer.from(req.file.buffer);
            var workbook = XLSX.read(buf.toString('base64'), { type: "base64" });
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            const bookData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
            const response = await userService.createStudent(bookData);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }

    }
    async getAll(req, res, next) {
        try {
            const { _id, role } = req.user;
            const { size, page } = req.query;
            const previous = 1;
            const response = await userService.getAll({ limit: 1000, role: { $ne: 5 } }, role);
            let users = response.data;
            users = users.map(item => {
                if (utility.checkPermission(item._id, item.role, _id, role)) {
                    item = { ...item, isEditable: true };
                } else {
                    item = { ...item, isEditable: false };
                }
                return item;
            })
            res.render('user/index', {
                currentYear: new Date().getFullYear(),
                users: users,
                _users: JSON.stringify(users),
            });
        } catch (e) {
            next(e);
        }
    }
    async getAllStudent(req, res, next) {
        try {
            const { _id, role } = req.user;
            const { size, page } = req.query;
            const previous = 1;
            const response = await userService.getAll({ limit: 13000, role: config.USER_ROLE.STUDENT }, role);
            let users = response.data;
            users = users.map(item => {
                if (utility.checkPermission(item._id, item.role, _id, role)) {
                    item = { ...item, isEditable: true };
                } else {
                    item = { ...item, isEditable: false };
                }
                return item;
            })
            res.render('student/list', {
                currentYear: new Date().getFullYear(),
                users: users,

            });
        } catch (e) {
            next(e);
        }
    }

    async cpanel_Update(req, res, next) {
        try {
            const { _id, role } = req.user;
            const { id } = req.params;
            const { available, newRole } = req.body;
            console.log(">>>> new role: ", newRole);
            if (typeof available === "undefined") {
                const data = {
                    role: newRole,
                    updatedAt: new Date(),
                    updatedBy: _id,
                    _id: id,
                }
                const response = await this.service.cpanel_Update(id, data, role)
                return res.status(response.statusCode).json(response);
            } else {
                const data = {
                    available: available,
                    role: newRole,
                    updatedAt: new Date(),
                    updatedBy: _id,
                    _id: id,
                }
                const response = await this.service.cpanel_Update(id, data, role)
                return res.status(response.statusCode).json(response);
            }

        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController(userService);
