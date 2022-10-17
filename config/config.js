'use strict';
const path = require('path');

module.exports.getConfig = () => {
    const config = {
        'MODE': 'Development',
        'PORT': process.env.PORT || 5555,
        // 'MONGO_URL': 'mongodb://127.0.0.1:27017/Student_Service?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
        'MONGO_URL': 'mongodb+srv://admin:123@cluster01.exbva.mongodb.net/Student_Service?retryWrites=true&w=majority',
        'UPLOAD_PATH': path.resolve(`${__dirname}/../public/uploads`),
        'UPLOAD_2PIK_PATH': 'https://2.pik.vn/',
        'JWT_SECRET': 'R4ND0M5TR1NG',
        'FPT_MAIL_ADMIN': '@fpt.edu.vn',
        'GOOGLE_CLIENT_ID': '550765995121-n7mdkd8nd3s4ggcjve3pfcdluf99jigk.apps.googleusercontent.com',
        'GOOGLE_PROJECT_ID': '',
        'GOOGLE_CLIENT_SECRET': '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',
        'GOOGLE_REDIRECT_URL': `/auth/callback`,
        'GOOGLE_SCOPE': ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email',],
        'COOKIE_TOKEN_LIFETIME': 30 * 24 * 60 * 60 * 1000, // 60 MINUTES IN NANO SECOND
        'JWT_TOKEN_LIFETIME': 30 * 24 * 60 * 60, // 60 MINUTES IN SECOND
        'USER_ROLE': {
            'EMPLOYEE': 1,
            'STUDENT_SERVICE': 2,
            'FINANCE': 3,
            'EDUCATION': 4,
            'STUDENT': 5,
            'ADMIN': 99,
            'SUPER_ADMIN': 100
        },
        'PAPER_STATUS': {
            'STEP1': 1, // đào tạo tiếp nhận
            'STEP2': 2, // tài vụ xác nhận
            'STEP3': 3, // dịch vụ sinh viên xác nhận kết quả
        },
        'FINANCE_STATUS': {
            'ACCEPTED': 1, // tài vụ xác nhận
            'REJECTED': 2, // tài vụ từ chối

        },
        'PAPER_STATUS_OPTIONS': [
            {
                'value': 1,
                'label': 'Dịch vụ sinh viên tiếp nhận'
            },
            {
                'value': 2,
                'label': 'Đào tạo tiếp nhận'
            },
            {
                'value': 3,
                'label': 'Tài vụ xác nhận'
            }
        ],
        'PAPER_RESULT': {
            'DONE': 1, // hoàn thành, sv đồng ý
            'CANCEL': 2, // huỷ đơn
            'PENDING': 3,
        },







        // ĐÂY LÀ CÁC TRẠNG THÁI MỚI, ÁP DỤNG CÁI NÀY TRỞ ĐI, KHÔNG ÁP DỤNG CÁI HIỆN CÓ
        'EDUCATION_CHANGE_COURSE_STATUS': {
            'CLOSED': 1, // ĐÃ XỬ LÝ XONG
            'REDO': 2, // CẬP NHẬT LẠI PHIẾU
        },

        'FINANCE_CHANGE_COURSE_STATUS': {
            'PENDING': 1, // CHỜ XỬ LÝ
            'CLOSED': 2, // ĐÃ XỬ LÝ XONG
            'REJECT': 3, // TỪ CHỐI YÊU CẦU CHỈNH SỬA
        },

        'STUDENT_SERVICE_CHANGE_COURSE_STATUS': {
            'PENDING': 1, // CHỜ XỬ LÝ
            'CLOSED': 2, // ĐÃ XỬ LÝ XONG
            'REJECT': 3, // TỪ CHỐI YÊU CẦU CHỈNH SỬA
        },

        'PAPER_CHANGE_COURSE_STATUS': {
            'FINISH': 2, // SINH VIÊN HOÀN THÀNH ĐƠN
            'CANCEL': 3, // SINH VIÊN HUỶ ĐƠN
            'PENDING': 1, // CHỜ DỊCH VỤ SINH VIÊN XỬ LÝ
        },


        // department 1: dành cho đào tạo, department 2: dành cho dịch vụ sinh viên
        'CAMPAIGN_TYPES': [
            { 'NAME': 'Chuyển ngành học', 'VALUE': 1, 'DEPARTMENT': 1 },
            { 'NAME': 'Thôi học quay lại', 'VALUE': 1, 'DEPARTMENT': 2 },
        ],

        'CAMPAIGN_STUDENT_SERVICE_TYPES': [
            { 'NAME': 'Thôi học quay lại', 'VALUE': 1 },
        ],


        // nhập học quay lại
        'REJOIN_PAPER_PROPERTIES': {
            PAPER_TYPES: [
                { NAME: 'Bình thường', VALUE: 1 },
                { NAME: 'Nhập học từ đầu', VALUE: 2 },
                { NAME: 'Chuyển ngành', VALUE: 3 },
            ],
            REJOIN_STUDENT_STATUS: [
                { NAME: 'Học đi', VALUE: 1 },
                { NAME: 'Bảo lưu_Trả nợ môn', VALUE: 2 },
                { NAME: 'HTCT_Trả nợ môn', VALUE: 3 },
            ],
            NEW_STUDENT_STATUS: [
                { NAME: 'Học chờ (TN2)', VALUE: 1 },
                { NAME: 'Học chờ (TN21)', VALUE: 2 },
                { NAME: 'Học đi (HDI)', VALUE: 3 },
            ],
            TYPE_NORMAL_STATUS: {
                STUDENT_SERVICE: {
                    DONE: 1, // ĐÃ XỬ LÝ
                    REDO: 2, // LÀM LẠI, CHỈNH SỬA
                    CANCEL: 3, // HỦY ĐƠN
                    PAPER_CONFIRM: 4, // XÁC NHẬN ĐƠN
                    CLOSED: 5, // ĐÃ XỬ LÝ XONG
                    PROCESSING: 6, // ĐÃ XỬ LÝ XONG
                },
                FINANCE: {
                    PROCESSING: 1, // CHỜ XỬ LÝ
                    FEE_CONFIRM: 2, // XÁC NHẬN PHÍ
                    REJECT: 3, // TỪ CHỐI
                    CLOSED: 4, // ĐÃ XỬ LÝ XONG
                    CANCEL: 5, // HỦY ĐƠN
                    DONE: 6, // ĐÃ XỬ LÝ, CHUYỂN CHO DỊCH VỤ ĐÓNG ĐƠN
                },
            },
            TYPE_RESTART_STATUS: {
                STUDENT_SERVICE: {
                    PROCESSING: 0, // ĐÃ XỬ LÝ, CHUYỂN CHO DỊCH VỤ ĐÓNG ĐƠN
                    DONE: 1, // CHỜ XỬ LÝ
                    REDO: 2, // LÀM LẠI.
                    CANCEL: 3, // HỦY ĐƠN
                },
                EDUCATION: {
                    PROCESSING: 1, // CHỜ XỬ LÝ
                    REDO: 2, // LÀM LẠI, CHỈNH SỬA
                    DONE: 3, // ĐÃ XỬ LÝ XONG
                    REJECT: 4, // TỪ CHỐI
                },
                FINANCE: {
                    PROCESSING: 1, // CHỜ XỬ LÝ
                    FEE_CONFIRM: 2, // XÁC NHẬN PHÍ
                    REJECT: 3, // TỪ CHỐI
                    CLOSED: 4, // ĐÃ XỬ LÝ XONG
                    CANCEL: 5 // HỦY ĐƠN
                },
            },
            TYPE_CHANGE_COURSE_STATUS: {
                STUDENT_SERVICE: {
                    DONE: 1, // CHỜ XỬ LÝ
                    PROCESSING: 2, // CHỜ XỬ LÝ
                },
                FINANCE: {
                    PROCESSING: 1, // CHỜ XỬ LÝ
                    CLOSED: 4, // ĐÃ XỬ LÝ XONG
                    CANCEL: 5 // HỦY ĐƠN
                },
            },



        },
    };

    // Modify for Production
    if (process.env.NODE_ENV === 'production') {
        config.MODE = 'Production';
        config.HOST = `https://fpoly-student-service.herokuapp.com`;
    } else {
        config.HOST = `http://localhost:${process.env.PORT || 5555}`;
    }
    config.GOOGLE_REDIRECT_URL = `${config.HOST}/auth/callback`;

    return config;
};
