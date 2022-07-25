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
    if(a[len].education_status == config.EDUCATION_CHANGE_COURSE_STATUS.CLOSED) {
        return 'disabled';
    }else if(a[len].education_status == config.EDUCATION_CHANGE_COURSE_STATUS.REDO) {
        return '';
    }
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
    if(a){    
        date = a;
        year = new Date(date).getFullYear();
        month = new Date(date).getMonth()+1;
        dt = new Date(date).getDate();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        a = dt + '/' + month + '/' + year;
    }else{
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
    else if (index == 8){
        var date, month, year, dt, result;
        date = x[len].education_updated_at;
        year = new Date(date).getFullYear();
        month = new Date(date).getMonth()+1;
        dt = new Date(date).getDate();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        result = dt + '/' + month + '/' + year;
    }else if (index == 9)
        var result = x[len].education_updated_by.name;
    else if (index == 10)
        var education_status = x[len].education_status;
        if(education_status == config.EDUCATION_CHANGE_COURSE_STATUS.CLOSED){
            var result = 'Đã xử lý';
        }else if(education_status == config.EDUCATION_CHANGE_COURSE_STATUS.REDO){
            var result = 'Cần cập nhật';
        }
    else if (index == 11)
        var finance_status = x[len].finance_status;
        if(finance_status == config.FINANCE_CHANGE_COURSE_STATUS.PENDING)
            var result = 'Chờ xử lý';
        else if(finance_status == config.FINANCE_CHANGE_COURSE_STATUS.CLOSED)
            var result = 'Đã xử lý';
        else if(finance_status == config.FINANCE_CHANGE_COURSE_STATUS.REJECT)
            var result = 'Đã từ chối';
    else if(index == 12)
        var student_service_status = x[len].student_service_status;
        if(student_service_status == config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.PENDING)
            var result = 'Chờ xử lý';
        else if(student_service_status == config.STUDENT_SERVICE_CHANGE_COURSE_STATUS.CLOSED)
            var result = 'Đã xử lý';
    else if(index == 13)
        var paper_status = x[len].paper_status;
        if(paper_status == config.PAPER_STATUS.STEP1)
            var result = 'Tài vụ tiếp nhận';
        else if(paper_status == config.PAPER_STATUS.STEP2)
            var result = 'Dịch vụ sinh viên tiếp nhận';
        else if(paper_status == config.PAPER_STATUS.STEP3)
            var result = 'Hoàn thành';
    else if(index == 14)
        if(x[len].finance_updated_by)
            var result = x[len].finance_updated_by.name;
        else
            var result = '';
    else if(index == 15)
        if(x[len].student_service_updated_by)
            var result = x[len].student_service_updated_by.name;
        else
            var result = '';
    return result;
}

module.exports.checkPermission = (userId, userRole, loginId, loginRole, b) => {
    if (loginRole == config.USER_ROLE.ADMIN) {
        if (userId.toString().toLowerCase() == loginId.toString().toLowerCase()) {
            return false;
        } else if(loginRole == userRole) {
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