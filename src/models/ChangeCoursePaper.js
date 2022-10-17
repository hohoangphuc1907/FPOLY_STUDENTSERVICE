const mongoose = require('mongoose');
const { Schema } = require('mongoose');
// const uniqueValidator = require( 'mongoose-unique-validator' );
const config = require('../../config/config').getConfig();

class ChangeCoursePaper {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'versions': {
                'type': [
                    {
                        'type': Object,
                        'required': true
                    }
                ],
                'required': true,
                'default': [],
            },
            'campaign': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'campaign'
            }
        }, { 'timestamps': true });

        // schema.plugin( uniqueValidator );
        try {
            mongoose.model('ChangeCoursePaper', schema);
        } catch (e) {

        }

    }

    getInstance() {
        if (!ChangeCoursePaper.instance) {
            this.initSchema();
            ChangeCoursePaper.instance = mongoose.model('ChangeCoursePaper');
        }
        return ChangeCoursePaper.instance;
    }
}

module.exports = { ChangeCoursePaper };


let pp = {
    "versions": [
        {
            "requested_at": { // ngày đề nghị
                "$date": {
                    "$numberLong": "1658335028095"
                }
            },
            "student_code": "PS16752", // mã sinh viên
            "fullname": "Nguyễn Văn A", // họ tên
            "email": "channn3@fpt.edu.vn", // email
            "current_semester": "6", // kỳ hiện tại
            "current_course": "Lập trình máy tính", // ngành hiện tại
            "current_major": "Di động", // ngành hiện tại
            "requested_reason": "Ngu", // lý do chuyển ngành
            "requested_course": "Ứng dụng phầm mềm", // ngành chuyển đến
            "requested_major": "Ứng dụng phầm mềm", // ngành chuyển đến
            "requested_semester": "5", // kỳ thứ tại ngành mới
            "start_at_semester": "Fall 22", // học kỳ bắt đầu chuyển
            "study_planning": [ // kế hoạch học tập
                {
                    "semester": "1", // kỳ học
                    "status": "HDI", // trạng thái kỳ
                    "semester_fee": 123, // phí học kỳ
                    "english": {
                        "level": "1.1 - ENT1126", // level tiếng anh
                        "status": "HD", // trạng thái
                        "fee": "2600000" // mức phí
                    },
                    "finished_subjects": [ // môn miễn giảm
                        { "name": "Mạng máy tính", "fee": 200 }
                    ],
                    "new_subjects": [ // môn bổ sung
                        { "name": "Mạng máy tính", "fee": "2600000" }
                    ],
                    "retake_subjects": [ // môn học lại
                        { "name": "Mạng máy tính", "fee": "2600000" }
                    ],
                    "retest_subjects": [ // môn thi lại
                        { "name": "Mạng máy tính", "fee": "2600000" }
                    ]
                }
            ],
            // CÁC TRẠNG THÁI NÀY PHẢI XEM BÊN CONFIG
            "education_status": 1,
            "education_updated_at": { // ngày đào tạo cập nhật
                "$date": {
                    "$numberLong": "1658335028095"
                }
            },
            "education_updated_by": { // nhân viên đào tạo cập nhật
                "_id": {
                    "$oid": "62b7c9bdcfa3f237fddcd13a"
                },
                "name": "channn3"
            },
            "finance_status": 1,
            "finance_updated_at": { // ngày tài vụ cập nhật
                "$date": {
                    "$numberLong": "1658335028095"
                }
            },
            "finance_updated_by": { // tài chính cập nhật
                "_id": {
                    "$oid": "62b7c9bdcfa3f237fddcd13a"
                },
                "name": "channn3"
            },
            "student_service_status": 1,
            "student_service_updated_at": { // ngày dịch vụ sinh viên cập nhật cập nhật
                "$date": {
                    "$numberLong": "1658335028095"
                }
            },
            "student_service_updated_by": { // tài chính cập nhật
                "_id": {
                    "$oid": "62b7c9bdcfa3f237fddcd13a"
                },
                "name": "channn3"
            },
            "paper_status": 1 // trạng thái của phiếu, cái này chỉ có dịch vụ cập nhật

        }
    ]
}

let courses = {
    "course_name": "Thiết kế trang web",
    "available": true,
    "majors": [
        {
            "major_name": "Backend",
            "available": true,
        },
        {
            "major_name": "Frontend",
            "available": true,
        },
    ]
}
