const mongoose = require('mongoose');
const { Schema } = require('mongoose');

class RejoinPaper {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'type': {
                'type': Number,
                'required': true,
            },

            // phần 1
            'studentCode': {
                'type': String,
                'required': true,
            },
            'fullname': {
                'type': String,
                'required': true,
            },
            'email': {
                'type': String,
                'required': true,
            },
            // ngành cũ
            'course': {
                'type': String,
                'required': false,
            },
            // ngành cũ
            'courseFee': {
                'type': Number,
                'required': true,
            },
            // quyết định thôi học
            'dropout': {
                'type': String,
                'required': true,
            },
            // kỳ thứ thôi học
            'dropoutAtSemester': {
                'type': Number,
                'required': true,
            },
            // khóa nhập học
            'rejoinAcademicYear': {
                'type': String,
                'required': true,
            },
            'mobile': {
                'type': String,
                'required': true,
            },
            'createdBy': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'user'
            },
            'campaign': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'campaign'
            },



            // phần 2 - bình thường
            'nextPartFirst': {
                // thời gian nhập học
                'campaign': {
                    'type': Schema.Types.ObjectId,
                    'required': false,
                    'ref': 'campaign'
                },
                // kỳ thứ sinh viên quay lại
                'rejoinAtSemester': {
                    'type': Number,
                    'required': false,
                },
                // trạng thái sinh viên quay lại
                'rejoinStudentStatus': {
                    'type': Number,
                    'required': false,
                },
                // level tiếng anh
                'english': {
                    'level': {
                        'type': String,
                        'required': false,
                    },
                    'fee': {
                        'type': Number,
                        'required': false,
                    }
                },
                // môn thi lại
                'retestSubjects': [
                    {
                        'name': {
                            'type': String,
                            'required': false,
                        },
                        'fee': {
                            'type': Number,
                            'required': false,
                        },
                        'part': {
                            'type': Number,
                            'required': false,
                        }
                    }
                ],
                // môn học lại
                'retakeSubjects': [
                    {
                        'name': {
                            'type': String,
                            'required': false,
                        },
                        'fee': {
                            'type': Number,
                            'required': false,
                        },
                    }
                ],
                // môn bổ sung
                'newSubjects': [
                    {
                        'name': {
                            'type': String,
                            'required': false,
                        },
                        'fee': {
                            'type': Number,
                            'required': false,
                        },
                    }
                ],
                // môn miễn giảm
                'finishedSubjects': [
                    {
                        'name': {
                            'type': String,
                            'required': false,
                        },
                        'fee': {
                            'type': Number,
                            'required': false,
                        },
                    }
                ],
                // môn chuyển đổi
                'exchangeSubjects': [
                    {
                        'name': {
                            'type': String,
                            'required': false,
                        },
                        'fee': {
                            'type': Number,
                            'required': false,
                        },
                    }
                ],
                // ghi chú
                'notes': {
                    'type': String,
                    'required': false,
                },
                // tổng phí
                'totalFee': {
                    'type': Number,
                    'required': false,
                },
                 // tổng phí
                 'remainFee': {
                    'type': Number,
                    'required': false,
                    'default': 0
                },
                // hạn đóng phí
                'feeDeadline': {
                    'type': Date,
                    'required': false,
                },
                'emailSent': {
                    'type': Boolean,
                    'required': false,
                },
                'studentServiceStatus': {
                    'type': Number,
                    'required': false,
                },
                'studentServiceBy': {
                    'type': Schema.Types.ObjectId,
                    'required': false,
                    'ref': 'user'
                },
                'studentServiceAt': {
                    'type': Date,
                    'required': false,
                },
                'financeStatus': {
                    'type': Number,
                    'required': false,
                },
                'financeBy': {
                    'type': Schema.Types.ObjectId,
                    'required': false,
                    'ref': 'user'
                },
                'financeAt': {
                    'type': Date,
                    'required': false,
                },
            },



            // phần 2 - nhập học từ đầu
            'nextPartSecond': {
                // thời gian nhập học
                'campaign': {
                    'type': Schema.Types.ObjectId,
                    'required': false,
                    'ref': 'campaign'
                },
                // khung chương trình học mới
                'newCoursePlanning': {
                    'type': String,
                    'required': false,
                },
                // kỳ thứ mới
                'newAtSemester': {
                    'type': Number,
                    'required': false,
                },
                // trạng thái mới
                'newStudentStatus': {
                    'type': String,
                    'required': false,
                },
                // học kỳ bắt đầu
                'startAtSemester': {
                    'type': String,
                    'required': false,
                },
                // kế hoạch học tập
                'studyPlanning': [
                    {
                        'semester': {
                            'type': String,
                            'required': false,
                        },
                        'english': {
                            'level': {
                                'type': String,
                                'required': false,
                            },
                            'fee': {
                                'type': Number,
                                'required': false,
                            },
                            'status': {
                                'type': String,
                                'required': false,
                            }
                        },
                        // môn thi lại
                        'retestSubjects': [
                            {
                                'name': {
                                    'type': String,
                                    'required': false,
                                },
                                'fee': {
                                    'type': Number,
                                    'required': false,
                                },
                                'parts': {
                                    'type': String,
                                    'required': false,
                                }
                            }
                        ],
                        // môn học lại
                        'retakeSubjects': [
                            {
                                'name': {
                                    'type': String,
                                    'required': false,
                                },
                                'fee': {
                                    'type': Number,
                                    'required': false,
                                },
                                'semester': {
                                    'type': String,
                                    'required': false,
                                }
                            }
                        ],
                        // môn bổ sung
                        'newSubjects': [
                            {
                                'name': {
                                    'type': String,
                                    'required': false,
                                },
                                'fee': {
                                    'type': Number,
                                    'required': false,
                                },
                            }
                        ],
                        // môn miễn giảm
                        'finishedSubjects': [
                            {
                                'name': {
                                    'type': String,
                                    'required': false,
                                },
                                'fee': {
                                    'type': Number,
                                    'required': false,
                                },
                            }
                        ],
                    }
                ],
                // tổng phí
                'totalFee': {
                    'type': Number,
                    'required': false,
                },
                // tổng phí
                'remainFee': {
                    'type': Number,
                    'required': false,
                    'default': 0
                },
                // hạn đóng phí
                'feeDeadline': {
                    'type': Date,
                    'required': false,
                },
                'emailSent': {
                    'type': Boolean,
                    'required': false,
                },
                'studentServiceStatus': {
                    'type': Number,
                    'required': false,
                },
                'studentServiceBy': {
                    'type': Schema.Types.ObjectId,
                    'required': false,
                    'ref': 'user'
                },
                'studentServiceAt': {
                    'type': Date,
                    'required': false,
                },
                'financeStatus': {
                    'type': Number,
                    'required': false,
                },
                'financeBy': {
                    'type': Schema.Types.ObjectId,
                    'required': false,
                    'ref': 'user'
                },
                'financeAt': {
                    'type': Date,
                    'required': false,
                },
                'educationStatus': {
                    'type': Number,
                    'required': false,
                },
                'educationBy': {
                    'type': Schema.Types.ObjectId,
                    'required': false,
                    'ref': 'user'
                },
                'educationAt': {
                    'type': Date,
                    'required': false,
                },
            },


            // phần 3 - chuyển ngành
            'nextPartThird': {
                // ghi chú
                'notes': {
                    'type': String,
                    'required': false,
                },
                // hạn đóng phí
                'feeDeadline': {
                    'type': Date,
                    'required': false,
                },
                'emailSent': {
                    'type': Boolean,
                    'required': false,
                },
                'studentServiceStatus': {
                    'type': Number,
                    'required': false,
                },
                'studentServiceBy': {
                    'type': Schema.Types.ObjectId,
                    'required': false,
                    'ref': 'user'
                },
                'studentServiceAt': {
                    'type': Date,
                    'required': false,
                },
                'financeStatus': {
                    'type': Number,
                    'required': false,
                },
                'financeBy': {
                    'type': Schema.Types.ObjectId,
                    'required': false,
                    'ref': 'user'
                },
                'financeAt': {
                    'type': Date,
                    'required': false,
                },
            },

        }, { 'timestamps': true });

        try {
            mongoose.model('rejoinPaper', schema);
        } catch (e) {

        }

    }

    getInstance() {
        if (!RejoinPaper.instance) {
            this.initSchema();
            RejoinPaper.instance = mongoose.model('rejoinPaper');
        }
        return RejoinPaper.instance;
    }
}

module.exports = { RejoinPaper };