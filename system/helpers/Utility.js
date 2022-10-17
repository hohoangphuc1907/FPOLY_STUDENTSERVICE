'use strict';
const config = require('../../config/config').getConfig();
module.exports.slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-\.]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};

module.exports.formatDate = (a, type, b) => {
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

module.exports.formatTime = (a, type, b) => {
    let date = new Date(a);
    let h = date.getHours();
    let m = date.getMinutes();
    h = h.toString().length === 1 ? '0' + h : h;
    m = m.toString().length === 1 ? '0' + m : m;
    if (type == 1) {
        return h + ':' + m + ':' + '00';
    }
    return '';
}

module.exports.index = (a, b) => a + 1;

module.exports.getEventStatus = (a, b) => {
    switch (a) {
        case config.EVENT_STATUS.WAITING:
            return 'Chờ duyệt';
        case config.EVENT_STATUS.APPROVED:
            return 'Đã duyệt';
        case config.EVENT_STATUS.WAITING:
            return 'Đã từ chối';
        default:
            break;
    }
}

module.exports.disableButton = (a, b) => {
    let len = a.length - 1;
    if ((a[len].education_status == config.EDUCATION_CHANGE_COURSE_STATUS.CLOSED &&
        a[len].finance_status == config.FINANCE_CHANGE_COURSE_STATUS.PENDING &&
        a[len].finance_updated_at == null &&
        a[len].finance_updated_by == null) || a[len].education_status == config.EDUCATION_CHANGE_COURSE_STATUS.REDO) {
        return '';
    }
    return 'disabled';
}

module.exports.getResult = (a, b) => {
    switch (a) {
        case config.PAPER_RESULT.PENDING:
            return 'Chờ xử lý';
        case config.PAPER_RESULT.DONE:
            return 'Đã xử lý';
        case config.PAPER_RESULT.CANCEL:
            return 'Đã hủy';
        default:
            break;
    }
}


module.exports.getRole = (a, b) => {
    switch (a) {
        case config.USER_ROLE.ADMIN:
            return 'Quản trị';
        case config.USER_ROLE.SUPER_ADMIN:
            return 'Hệ thống';
        case config.USER_ROLE.EDUCATION:
            return 'Đào tạo';
        case config.USER_ROLE.FINANCE:
            return 'Tài vụ';
        case config.USER_ROLE.EMPLOYEE:
            return 'Nhân viên';
        case config.USER_ROLE.STUDENT_SERVICE:
            return 'Dịch vụ sinh viên';
        default:
            return 'Khách';
    }
}

module.exports.checkStatusEducation = (a, b) => {
    switch (a) {
        case config.EDUCATION_CHANGE_COURSE_STATUS.CLOSED:
            return 'Đã xử lý';
        case config.EDUCATION_CHANGE_COURSE_STATUS.REDO:
            return 'Cần cập nhật'
    }
}

module.exports.formatDateTime = (a, b) => {
    var date, month, year, dt;
    if (a) {
        date = a;
        year = new Date(date).getFullYear();
        month = new Date(date).getMonth() + 1;
        dt = new Date(date).getDate();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        a = dt + '/' + month + '/' + year;
    } else {
        a = '';
    }

    return a;
}

module.exports.listVersion = (x, index) => {
    let len = x.length - 1;
    if (index == 0)
        var result = x[len].student_code;
    else if (index == 1)
        var result = x[len].fullname;
    else if (index == 2)
        var result = x[len].current_course;
    else if (index == 3)
        var result = x[len].current_major;
    else if (index == 4)
        var result = x[len].current_semester;
    else if (index == 5)
        var result = x[len].requested_course;
    else if (index == 6)
        var result = x[len].requested_major;
    else if (index == 7)
        var result = x[len].requested_semester;
    else if (index == 8) {
        var date, month, year, dt, result;
        date = x[len].education_updated_at;
        year = new Date(date).getFullYear();
        month = new Date(date).getMonth() + 1;
        dt = new Date(date).getDate();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        result = dt + '/' + month + '/' + year;
    } else if (index == 9)
        var result = x[len].education_updated_by.name;
    else if (index == 10)
        var education_status = x[len].education_status;
    if (education_status == config.EDUCATION_CHANGE_COURSE_STATUS.CLOSED) {
        var result = 'Đã xử lý';
    } else if (education_status == config.EDUCATION_CHANGE_COURSE_STATUS.REDO) {
        var result = 'Cần cập nhật';
    }
    else if (index == 11)
        var finance_status = x[len].finance_status;
    if (finance_status == config.FINANCE_CHANGE_COURSE_STATUS.PENDING)
        var result = 'Chờ xử lý';
    else if (finance_status == config.FINANCE_CHANGE_COURSE_STATUS.CLOSED)
        var result = 'Đã xử lý';
    else if (finance_status == config.FINANCE_CHANGE_COURSE_STATUS.REJECT)
        var result = 'Đã từ chối';
    else if (index == 12)
        var student_service_status = x[len].student_service_status;
    if (student_service_status == config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.PENDING)
        var result = 'Chờ xử lý';
    else if (student_service_status == config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.CLOSED)
        var result = 'Đã xử lý';
    else if (student_service_status == config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.REJECT)
        var result = 'Đã từ chối';
    else if (index == 13)
        var paper_status = x[len].paper_status;
    if (paper_status == config.PAPER_STATUS.STEP1)
        var result = 'Tài vụ tiếp nhận';
    else if (paper_status == config.PAPER_STATUS.STEP2)
        var result = 'Dịch vụ sinh viên tiếp nhận';
    else if (paper_status == config.PAPER_STATUS.STEP3)
        var result = 'Hoàn thành';
    else if (index == 14)
        if (x[len].finance_updated_by)
            var result = x[len].finance_updated_by.name;
        else
            var result = '';
    else if (index == 15)
        if (x[len].student_service_updated_by)
            var result = x[len].student_service_updated_by.name;
        else
            var result = '';
    return result;
}

module.exports.checkPermission = (userId, userRole, loginId, loginRole, b) => {
    if (loginRole == config.USER_ROLE.ADMIN) {
        if (userId.toString().toLowerCase() == loginId.toString().toLowerCase()) {
            return false;
        } else if (loginRole == userRole) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}


module.exports.checkTeacher = (id1, id2, b) => {
    return id1.toString() == id2.toString();
}

module.exports.ifEquals = (arg1, arg2, options) => {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
}

module.exports.renderRejoin = (row, index) => {
    let { studentCode, fullname, type, nextPartFirst, nextPartSecond, nextPartThird } = row;
    let types = config.REJOIN_PAPER_PROPERTIES.PAPER_TYPES;
    try {
        if (index == 1) {
            return studentCode.toUpperCase();
        } else if (index == 2) {
            return fullname;
        } else if (index == 3) {
            return type == types[0].VALUE ? types[0].NAME : type == types[1].VALUE ? types[1].NAME : types[2].NAME;
        } else if (index == 4) {
            // bình thường
            if (type == types[0].VALUE) {
                let { emailSent, studentServiceStatus, studentServiceBy, studentServiceAt, financeStatus, financeBy, financeAt } = nextPartFirst;
                if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.FEE_CONFIRM) {
                    if (emailSent) {
                        return 'Đã gửi email';
                    } else {
                        return 'Chưa gửi email';
                    }
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.CLOSED ||
                    financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.CANCEL) {
                    if (emailSent) {
                        return 'Đã gửi email';
                    } else {
                        return 'Chưa gửi email';
                    }
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.REJECT) {
                    if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.REDO) {
                        return 'Cần cập nhật';
                    } else if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.PROCESSING) {
                        return 'Đang xử lý';
                    }
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.DONE) {
                    if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.PAPER_CONFIRM) {
                        return 'Cần xác nhận';
                    } else if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.CANCEL) {
                        return 'Đã hủy đơn';
                    } else {
                        return 'Đã đóng đon';
                    }
                } else {
                    return 'Đã xử lý';
                }
            }
            // nhập học từ đầu
            else if (type == types[1].VALUE) {
                let { emailSent, studentServiceStatus, studentServiceBy, studentServiceAt, financeStatus, financeBy, financeAt, educationStatus, educationBy, educationAt } = nextPartSecond;
                if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.STUDENT_SERVICE.PROCESSING) {
                    return 'Đang xử lý';
                } else if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.STUDENT_SERVICE.DONE) {
                    if (emailSent) return 'Đã gửi email';
                    else {
                        if (educationStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.DONE &&
                            financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.FEE_CONFIRM) {
                            return 'Chưa gửi email';
                        }
                        else return 'Đã xử lý';
                    }
                } else if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.STUDENT_SERVICE.REDO) {
                    return 'Cần cập nhật';
                }
            }
            // chuyển ngành
            else {
                let { emailSent, studentServiceStatus, studentServiceBy, studentServiceAt, financeStatus, financeBy, financeAt } = nextPartThird;
                if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.STUDENT_SERVICE.DONE) {
                    if (emailSent) {
                        return 'Đã gửi email';
                    } else {
                        return 'Chưa gửi email';
                    }
                } else if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.PROCESSING) {
                    return 'Đang xử lý';
                }
            }
        } else if (index == 5) {
            if (type == types[0].VALUE) {
                return this.formatDate2(nextPartFirst.studentServiceAt, 1);
            } else if (type == types[1].VALUE) {
                return this.formatDate2(nextPartSecond.studentServiceAt, 1);
            } else {
                return this.formatDate2(nextPartThird.studentServiceAt, 1);
            }
        } else if (index == 6) {
            if (type == types[0].VALUE) {
                return nextPartFirst.studentServiceBy ? nextPartFirst.studentServiceBy.email.slice(0, nextPartFirst.studentServiceBy.email.indexOf('@')) : '';
            }
            // nhập học từ đầu
            else if (type == types[1].VALUE) {
                return nextPartSecond.studentServiceBy ? nextPartSecond.studentServiceBy.email.slice(0, nextPartSecond.studentServiceBy.email.indexOf('@')) : '';
            }
            // chuyển ngành
            else {
                return nextPartThird.studentServiceBy ? nextPartThird.studentServiceBy.email.slice(0, nextPartThird.studentServiceBy.email.indexOf('@')) : '';
            }

        } else if (index == 7) {
            // bình thường
            if (type == types[0].VALUE) {
                let { emailSent, studentServiceStatus, studentServiceBy, studentServiceAt, financeStatus, financeBy, financeAt } = nextPartFirst;
                if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.PROCESSING) {
                    return 'Chưa xử lý';
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.FEE_CONFIRM) {
                    return 'Đã xác nhận phí';
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.REJECT) {
                    return 'Đã yêu cầu cập nhật';
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.CLOSED) {
                    return 'Đã đóng đơn';
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.DONE) {
                    return 'Đã xử lý';
                } else {
                    return 'Đã hủy đơn';
                }
            }
            // nhập học từ đầu
            else if (type == types[1].VALUE) {
                let { emailSent, studentServiceStatus, studentServiceBy, studentServiceAt, financeStatus, financeBy, financeAt, educationStatus, educationBy, educationAt } = nextPartSecond;
                if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.PROCESSING) {
                    return 'Chưa xử lý';
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.FEE_CONFIRM) {
                    return 'Đã xác nhận phí';
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.REJECT) {
                    return 'Đã yêu cầu cập nhật';
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.CLOSED) {
                    return 'Đã đóng đơn';
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.CANCEL) {
                    return 'Đã hủy đơn';
                }
            }
            // chuyển ngành
            else {
                let { emailSent, studentServiceStatus, studentServiceBy, studentServiceAt, financeStatus, financeBy, financeAt } = nextPartThird;
                if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.FINANCE.PROCESSING) {
                    return 'Chưa xử lý';
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.FINANCE.CLOSED) {
                    return 'Đã đóng đơn';
                } else {
                    return 'Đã hủy đơn';
                }
            }
        } else if (index == 8) {
            if (type == types[0].VALUE) {
                return this.formatDate2(nextPartFirst.financeAt, 1);
            } else if (type == types[1].VALUE) {
                return this.formatDate2(nextPartSecond.financeAt, 1);
            } else {
                return this.formatDate2(nextPartThird.financeAt, 1);
            }

        } else if (index == 9) {
            if (type == types[0].VALUE) {
                return nextPartFirst.financeBy ? nextPartFirst.financeBy.email.slice(0, nextPartFirst.financeBy.email.indexOf('@')) : '';
            }
            // nhập học từ đầu
            else if (type == types[1].VALUE) {
                return nextPartSecond.financeBy ? nextPartSecond.financeBy.email.slice(0, nextPartSecond.financeBy.email.indexOf('@')) : '';
            }
            // chuyển ngành
            else {
                return nextPartThird.financeBy ? nextPartThird.financeBy.email.slice(0, nextPartThird.financeBy.email.indexOf('@')) : '';
            }

        } else if (index == 10) {
            // nhập học từ đầu
            if (type == types[1].VALUE) {
                let { educationStatus, educationBy, educationAt } = nextPartSecond;
                if (educationStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.PROCESSING) {
                    return 'Chưa xử lý';
                } else if (educationStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.REDO) {
                    return 'Cần cập nhật';
                } else if (educationStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.DONE) {
                    return 'Đã xử lý';
                } else if (educationStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.REJECT) {
                    return 'Đã yêu cầu cập nhật';
                }
            }
        } else if (index == 11) {
            return this.formatDate2(nextPartSecond.educationAt, 1);
        } else if (index == 12) {
            return nextPartSecond.educationBy ? nextPartSecond.educationBy.email.slice(0, nextPartSecond.educationBy.email.indexOf('@')) : '';
        } else if (index == 13) {
            if (type == types[0].VALUE) {
                let { emailSent, studentServiceStatus, studentServiceBy, studentServiceAt, financeStatus, financeBy, financeAt } = nextPartFirst;
                if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.CLOSED) {
                    return 'Đơn đã đóng';
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.CANCEL) {
                    return 'Đơn đã hủy';
                } else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.DONE) {
                    if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.CLOSED) {
                        return 'Đơn đã đóng';
                    } else if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.CANCEL) {
                        return 'Đơn đã hủy';
                    } else {
                        return 'Đơn đang được xử lý';
                    }
                } else {
                    return 'Đơn đang được xử lý';
                }
            }
            // nhập học từ đầu
            else if (type == types[1].VALUE) {
                let { financeStatus } = nextPartSecond;
                if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.CLOSED) {
                    return 'Đơn đã đóng';
                }
                else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.FINANCE.CANCEL) {
                    return 'Đơn đã hủy';
                }
                else {
                    return 'Đơn đang được xử lý';
                }
            }
            // chuyển ngành
            else {
                let { financeStatus } = nextPartThird;
                if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.FINANCE.CLOSED) {
                    return 'Đơn đã đóng';
                }
                else if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_CHANGE_COURSE_STATUS.FINANCE.CANCEL) {
                    return 'Đơn đã hủy';
                }
                else {
                    return 'Đơn đang được xử lý';
                }
            }
        } else if (index == 14) {
            // bình thường
            if (type == types[0].VALUE) {
                let { studentServiceStatus } = nextPartFirst;
                if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.REDO) {
                    return true;
                }
                return false;
            }
            // nhập học từ đầu
            else if (type == types[1].VALUE) {
                let { studentServiceStatus } = nextPartSecond;
                if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.STUDENT_SERVICE.REDO) {
                    return true;
                }
                return false;
            }
            // chuyển ngành
            else {
                return true;
            }
        } else if (index == 15) {
            // bình thường
            if (type == types[0].VALUE) {
                let { emailSent, studentServiceStatus, studentServiceBy, studentServiceAt, financeStatus, financeBy, financeAt } = nextPartFirst;
                if (financeStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.FINANCE.FEE_CONFIRM) {
                    if (studentServiceStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_NORMAL_STATUS.STUDENT_SERVICE.DONE) {
                        if (emailSent) {
                            return true;
                        }
                    }
                }
                return false;
            }
            // nhập học từ đầu
            else if (type == types[1].VALUE) {
                return false;
            }
            // chuyển ngành
            else {
                return false;
            }
        } else if (index == 16) {
            // bình thường
            if (type == types[0].VALUE) {
                return false;
            }
            // nhập học từ đầu
            else if (type == types[1].VALUE) {
                let { educationStatus } = nextPartSecond;
                if (educationStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.PROCESSING ||
                    educationStatus == config.REJOIN_PAPER_PROPERTIES.TYPE_RESTART_STATUS.EDUCATION.REDO) {
                    return true;
                }
            }
            // chuyển ngành
            else {
                return false;
            }
        }
    } catch (error) {
        console.log(error)
        return '';
    }
}

module.exports.formatDate2 = (a, type, b) => {
    if (!a) return ''
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