'use strict';
const { Service } = require('../../system/services/Service');
const autoBind = require('auto-bind');
const config = require('../../config/config').getConfig();
const { HttpResponse } = require('../../system/helpers/HttpResponse');


class RejoinService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }

    async studentServicePrepareOnePaperForUpdating(id, type, by) {
        try {
            let onePaper = await this.model.findById(id);
            if (!onePaper) throw new Error('Không tìm thấy phiếu');
            if (onePaper.type != type) {
                onePaper.type = type;
                if (type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[0].VALUE) {
                    onePaper.createdAt = new Date();
                    onePaper.createdBy = by;
                    onePaper.nextPartFirst = {
                        campaign: onePaper.campaign,
                        rejoinAtSemester: 0,
                        rejoinStudentStatus: 0,
                        english: {
                            level: '',
                            fee: 0
                        },
                        retestSubjects: [],
                        retakeSubjects: [],
                        newSubjects: [],
                        finishedSubjects: [],
                        exchangeSubjects: [],
                        notes: '',
                        totalFee: 0,
                        remainFee: 0,
                        feeDeadline: new Date(),
                        emailSent: false,
                        studentServiceStatus: config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.PROCESSING,
                        studentServiceBy: by,
                        studentServiceAt: new Date(),
                        financeStatus: config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.PROCESSING,
                        financeBy: null,
                        financeAt: null,
                    };
                } else if (type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[1].VALUE) {
                    onePaper.createdAt = new Date();
                    onePaper.createdBy = by;
                    onePaper.nextPartSecond = {
                        campaign: onePaper.campaign,
                        newCoursePlanning: null,
                        newAtSemester: 0,
                        newStudentStatus: null,
                        startAtSemester: null,
                        studyPlanning: [],
                        totalFee: 0,
                        remainFee: 0,
                        feeDeadline: null,
                        emailSent: false,
                        studentServiceStatus: config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.STUDENT_SERVICE.PROCESSING,
                        studentServiceBy: by,
                        studentServiceAt: new Date(),
                        financeStatus: config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.PROCESSING,
                        financeBy: null,
                        financeAt: null,
                        educationStatus: config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.PROCESSING,
                        educationAt: null,
                        educationBy: null,
                    }

                } else if (type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[2].VALUE) {
                    onePaper.createdAt = new Date();
                    onePaper.createdBy = by;
                    onePaper.nextPartThird = {
                        notes: '',
                        feeDeadline: null,
                        emailSent: false,
                        studentServiceStatus: config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.STUDENT_SERVICE.PROCESSING,
                        studentServiceBy: by,
                        studentServiceAt: new Date(),
                        financeStatus: config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.FINANCE.PROCESSING,
                        financeBy: null,
                        financeAt: null,
                    };
                }

                const item = await super.update(onePaper._id, onePaper);
                if (item) {
                    return item;
                }
                throw new Error('Có lỗi, bạn có thể thử lại sau');
            }

            return new HttpResponse(onePaper);

        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async studentServiceUpdateSendEmail(idPaper, updatedBy) {
        try {
            let rejoinPaper = await this.model.findById(idPaper);

            if (rejoinPaper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[0].VALUE) {
                rejoinPaper.nextPartFirst.emailSent = true;
                rejoinPaper.nextPartFirst.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.DONE;
                rejoinPaper.nextPartFirst.studentServiceBy = updatedBy;
                rejoinPaper.nextPartFirst.studentServiceAt = new Date();
                rejoinPaper.nextPartSecond.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.PROCESSING;
                rejoinPaper.nextPartSecond.financeAt = null;
                rejoinPaper.nextPartSecond.financeBy = null;  
            } else if (rejoinPaper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[1].VALUE) {
                rejoinPaper.nextPartSecond.emailSent = true;
                rejoinPaper.nextPartSecond.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.STUDENT_SERVICE.DONE;
                rejoinPaper.nextPartSecond.studentServiceBy = updatedBy;
                rejoinPaper.nextPartSecond.studentServiceAt = new Date();
                rejoinPaper.nextPartSecond.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.PROCESSING;
                rejoinPaper.nextPartSecond.financeAt = null;
                rejoinPaper.nextPartSecond.financeBy = null;  
            } else {
                rejoinPaper.nextPartThird.emailSent = true;
                rejoinPaper.nextPartThird.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.STUDENT_SERVICE.DONE;
                rejoinPaper.nextPartThird.studentServiceBy = updatedBy;
                rejoinPaper.nextPartThird.studentServiceAt = new Date();
            }
            console.log(rejoinPaper)
            const item = await super.update(rejoinPaper._id, rejoinPaper);

            if (item) {
                return new HttpResponse(item);
            }
            throw new Error('Có lỗi, bạn có thể thử lại sau');

        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async studentServiceGetOnePaper(id) {
        try {
            let onePaper = await this.model.findById(id);
            if (!onePaper) throw new Error('Không tìm thấy phiếu');

            return new HttpResponse(onePaper);

        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async studentServiceUpdatePaper(body, updatedBy) {
        try {
            let { rejoinPaper, status } = body;
            let onePaper = await this.model.findById(rejoinPaper._id);
            if (!onePaper) throw new Error('Không tìm thấy phiếu');

            if (rejoinPaper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[0].VALUE) {
                if (status == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.DONE) {
                    rejoinPaper.nextPartFirst.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.DONE;
                    rejoinPaper.nextPartFirst.studentServiceBy = updatedBy;
                    rejoinPaper.nextPartFirst.studentServiceAt = new Date();
                    rejoinPaper.nextPartFirst.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.PROCESSING;
                    rejoinPaper.nextPartFirst.financeBy = null;
                    rejoinPaper.nextPartFirst.financeAt = null;
                } else if (status == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.CLOSED) {
                    rejoinPaper.nextPartFirst.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.CLOSED;
                    rejoinPaper.nextPartFirst.studentServiceBy = updatedBy;
                    rejoinPaper.nextPartFirst.studentServiceAt = new Date();
                } else if (status == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.CANCEL) {
                    rejoinPaper.nextPartFirst.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.CANCEL;
                    rejoinPaper.nextPartFirst.studentServiceBy = updatedBy;
                    rejoinPaper.nextPartFirst.studentServiceAt = new Date();
                }

            } else if (rejoinPaper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[1].VALUE) {
                if(status == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.STUDENT_SERVICE.DONE){
                    rejoinPaper.nextPartSecond.emailSent = false;
                    rejoinPaper.nextPartSecond.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.STUDENT_SERVICE.DONE;
                    rejoinPaper.nextPartSecond.studentServiceBy = updatedBy;
                    rejoinPaper.nextPartSecond.studentServiceAt = new Date();
                    rejoinPaper.nextPartSecond.educationStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.PROCESSING;
                    rejoinPaper.nextPartSecond.educationBy = null;
                    rejoinPaper.nextPartSecond.educationAt = null;
                    rejoinPaper.nextPartSecond.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.PROCESSING;
                    rejoinPaper.nextPartSecond.financeBy = null;
                    rejoinPaper.nextPartSecond.financeAt = null;
                    rejoinPaper.campaign = rejoinPaper.nextPartSecond.campaign;
                }
            } else {
                if (status == config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.STUDENT_SERVICE.DONE) {
                    rejoinPaper.nextPartThird.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.STUDENT_SERVICE.DONE;
                    rejoinPaper.nextPartThird.studentServiceBy = updatedBy;
                    rejoinPaper.nextPartThird.studentServiceAt = new Date();
                    rejoinPaper.nextPartThird.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.FINANCE.PROCESSING;
                    rejoinPaper.nextPartThird.financeBy = null;
                    rejoinPaper.nextPartThird.financeAt = null;
                }
            }
            console.log(rejoinPaper)
            const item = await super.update(rejoinPaper._id, rejoinPaper);

            if (item) {
                return new HttpResponse(item);
            }
            throw new Error('Có lỗi, bạn có thể thử lại sau');

        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async educationUpdatePaper(body, updatedBy) {
        try {
            let { rejoinPaper } = body;
            let onePaper = await this.model.findById(rejoinPaper._id);
            if (!onePaper) throw new Error('Không tìm thấy phiếu');
            if (rejoinPaper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[1].VALUE) {
                rejoinPaper.nextPartSecond.educationStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.DONE;
                rejoinPaper.nextPartSecond.educationBy = updatedBy;
                rejoinPaper.nextPartSecond.educationAt = new Date();
                rejoinPaper.nextPartSecond.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.PROCESSING;
                rejoinPaper.nextPartSecond.financeBy = null;
                rejoinPaper.nextPartSecond.financeAt = null;
            }
            console.log(rejoinPaper)
            const item = await super.update(rejoinPaper._id, rejoinPaper);

            if (item) {
                return new HttpResponse(item);
            }
            throw new Error('Có lỗi, bạn có thể thử lại sau');

        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async financeUpdatePaper(body, updatedBy) {
        try {
            let { status, id, remainFee } = body;
            let rejoinPaper = await this.model.findById(id);
            if (!rejoinPaper) throw new Error('Không tìm thấy phiếu');

            if (rejoinPaper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[0].VALUE) {
                if (status == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.FEE_CONFIRM) {
                    rejoinPaper.nextPartFirst.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.FEE_CONFIRM;
                    rejoinPaper.nextPartFirst.financeBy = updatedBy;
                    rejoinPaper.nextPartFirst.financeAt = new Date();
                    rejoinPaper.nextPartFirst.remainFee = remainFee;
                } else if (status == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.REJECT) {
                    rejoinPaper.nextPartFirst.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.REDO;
                    rejoinPaper.nextPartFirst.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.REJECT;
                    rejoinPaper.nextPartFirst.financeBy = updatedBy;
                    rejoinPaper.nextPartFirst.financeAt = new Date();
                    rejoinPaper.nextPartFirst.remainFee = remainFee;
                } else if (status == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.CLOSED) {
                    rejoinPaper.nextPartFirst.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.CLOSED;
                    rejoinPaper.nextPartFirst.financeBy = updatedBy;
                    rejoinPaper.nextPartFirst.financeAt = new Date();
                } else if (status == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.CANCEL) {
                    rejoinPaper.nextPartFirst.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.CANCEL;
                    rejoinPaper.nextPartFirst.financeBy = updatedBy;
                    rejoinPaper.nextPartFirst.financeAt = new Date();
                } else if (status == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.DONE) {
                    rejoinPaper.nextPartFirst.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.DONE;
                    rejoinPaper.nextPartFirst.financeBy = updatedBy;
                    rejoinPaper.nextPartFirst.financeAt = new Date();
                    rejoinPaper.nextPartFirst.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.PAPER_CONFIRM;
                }
            } else if (rejoinPaper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[1].VALUE) {
                if(status == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.FEE_CONFIRM) {
                    rejoinPaper.nextPartSecond.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.FEE_CONFIRM;
                    rejoinPaper.nextPartSecond.financeBy = updatedBy;
                    rejoinPaper.nextPartSecond.financeAt = new Date();
                    rejoinPaper.nextPartSecond.remainFee = remainFee;
                } else if(status == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.REJECT) {
                    rejoinPaper.nextPartSecond.educationStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.REDO;
                    rejoinPaper.nextPartSecond.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.REJECT;
                    rejoinPaper.nextPartSecond.financeBy = updatedBy;
                    rejoinPaper.nextPartSecond.financeAt = new Date();
                    rejoinPaper.nextPartSecond.remainFee = remainFee;
                } else if(status == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.CLOSED) {
                    rejoinPaper.nextPartSecond.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.CLOSED;
                    rejoinPaper.nextPartSecond.financeBy = updatedBy;
                    rejoinPaper.nextPartSecond.financeAt = new Date();
                } else if(status == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.CANCEL) {
                    rejoinPaper.nextPartSecond.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.CANCEL;
                    rejoinPaper.nextPartSecond.financeBy = updatedBy;
                    rejoinPaper.nextPartSecond.financeAt = new Date();
                }
            } else {
                if (status == config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.FINANCE.CLOSED) {
                    rejoinPaper.nextPartThird.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMATYPE_CHANGE_COURSE_STATUSL_STATUS.FINANCE.CLOSED;
                    rejoinPaper.nextPartThird.financeBy = updatedBy;
                    rejoinPaper.nextPartThird.financeAt = new Date();
                } else if (status == config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.FINANCE.CANCEL) {
                    rejoinPaper.nextPartThird.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.FINANCE.CANCEL;
                    rejoinPaper.nextPartThird.financeBy = updatedBy;
                    rejoinPaper.nextPartThird.financeAt = new Date();
                }
            }
            console.log(rejoinPaper)
            const item = await super.update(id, rejoinPaper);

            if (item) {
                return new HttpResponse(item);
            }
            throw new Error('Có lỗi, bạn có thể thử lại sau');

        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async insert(body, id) {
        try {
            let { rejoinPaper } = body;
            console.log(rejoinPaper)
            if (rejoinPaper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[0].VALUE) {
                rejoinPaper.nextPartFirst.emailSent = false;
                rejoinPaper.nextPartFirst.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.DONE;
                rejoinPaper.nextPartFirst.studentServiceBy = id;
                rejoinPaper.nextPartFirst.studentServiceAt = new Date();
                rejoinPaper.nextPartFirst.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.PROCESSING;
                rejoinPaper.nextPartFirst.financeBy = null;
                rejoinPaper.nextPartFirst.financeAt = null;
                rejoinPaper.createdBy = id;
                rejoinPaper.campaign = rejoinPaper.nextPartFirst.campaign;
            } else if (rejoinPaper.type == config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES[1].VALUE) {
                rejoinPaper.nextPartSecond.emailSent = false;
                rejoinPaper.nextPartSecond.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.STUDENT_SERVICE.DONE;
                rejoinPaper.nextPartSecond.studentServiceBy = id;
                rejoinPaper.nextPartSecond.studentServiceAt = new Date();
                rejoinPaper.nextPartSecond.educationStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.PROCESSING;
                rejoinPaper.nextPartSecond.educationBy = null;
                rejoinPaper.nextPartSecond.educationAt = null;
                rejoinPaper.nextPartSecond.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.PROCESSING;
                rejoinPaper.nextPartSecond.financeBy = null;
                rejoinPaper.nextPartSecond.financeAt = null;
                rejoinPaper.createdBy = id;
                rejoinPaper.campaign = rejoinPaper.nextPartSecond.campaign;

            } else {
                rejoinPaper.nextPartThird.emailSent = false;
                rejoinPaper.nextPartThird.studentServiceStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.STUDENT_SERVICE.DONE;
                rejoinPaper.nextPartThird.studentServiceBy = id;
                rejoinPaper.nextPartThird.studentServiceAt = new Date();
                rejoinPaper.nextPartThird.financeStatus = config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.FINANCE.PROCESSING;
                rejoinPaper.nextPartThird.financeBy = null;
                rejoinPaper.nextPartThird.financeAt = null;
                rejoinPaper.createdBy = id;
                rejoinPaper.campaign = rejoinPaper.nextPartThird.campaign;
            }
            console.log(rejoinPaper)
            const item = await this.model.create(rejoinPaper);

            if (item) {
                return new HttpResponse(item);
            }
            throw new Error('Có lỗi, bạn có thể thử lại sau');

        } catch (error) {
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }

    async getAll(query) {
        let { skip, limit, sortBy, campaign, type } = query;
        type = Array.isArray(type) ? type : type ? [type] : [];
        skip = skip ? Number(skip) : 0;
        limit = limit ? Number(limit) : 10;
        sortBy = sortBy ? sortBy : { 'updatedAt': -1 };

        delete query.skip;
        delete query.limit;
        delete query.sortBy;
        delete query.campaign;
        delete query.type;

        if (campaign) query.campaign = campaign;
        if (type.length > 0) query.type = { $in: type };
        // must call redis first
        console.log(query)
        try {
            const res = await this.model
                .find(query)
                .sort(sortBy)
                .skip(skip)
                .limit(limit)
                .populate('updatedBy createdBy campaign')
                .populate({ path: 'nextPartFirst.studentServiceBy', select: 'email' })
                .populate({ path: 'nextPartFirst.financeBy', select: 'email' })
                .populate({ path: 'nextPartSecond.studentServiceBy', select: 'email' })
                .populate({ path: 'nextPartSecond.financeBy', select: 'email' })
                .populate({ path: 'nextPartSecond.educationBy', select: 'email' })
                .populate({ path: 'nextPartThird.studentServiceBy', select: 'email' })
                .populate({ path: 'nextPartThird.financeBy', select: 'email' })
            return new HttpResponse(res);
        } catch (errors) {
            console.log(errors)
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        }
    }

}

module.exports = { RejoinService };
