
let rejoinPaper = {
    'type': '',
    // phần 1
    'studentCode': '',
    'fullname': '',
    'email': '',
    // chuyên ngành
    'course': '',
    'courseFee': 0,
    // quyết định thôi học
    'dropout': '',
    // kỳ thứ thôi học
    'dropoutAtSemester': -1,
    // khóa nhập học
    'rejoinAcademicYear': -1,
    'mobile': ''
}

let nextPartFirst = {
    'campaign': null,
    // kỳ thứ sinh viên quay lại
    'rejoinAtSemester': -1,
    // trạng thái sinh viên quay lại
    'rejoinStudentStatus': -1,
    // level tiếng anh
    'english': {
        'level': '',
        'fee': 0
    },
    // môn thi lại
    'retestSubjects': [],
    // môn học lại
    'retakeSubjects': [],
    // môn bổ sung
    'newSubjects': [],
    // môn miễn giảm
    'finishedSubjects': [],
    // môn chuyển đổi
    'exchangeSubjects': [],
    // ghi chú
    'notes': '',
    // tổng phí
    'totalFee': 0,
    'remainFee': 0,
    // hạn đóng phí
    'feeDeadline': null,
}

let nextPartThird = {
    'campaign': null,
    // ghi chú
    'notes': '',
    // tổng phí
    'totalFee': 0,
    // hạn đóng phí
    'feeDeadline': null,
}

let nextPartSecond = {
    'newCoursePlanning': '',
    'campaign': null,
    'newAtSemester': 0,
    'newStudentStatus': '',
    'startAtSemester': '',
    // tổng phí
    'totalFee': 0,
    'remainFee': 0,
    // hạn đóng phí
    'feeDeadline': null,
}

const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

const formatDate = (a, type = 1) => {
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
    return year + '-' + month + '-' + day;
}

const formatTime = (a, type, b) => {
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

const fetchAPI = async (url, option) => {
    const res = await fetch(url, option);
    return res.json();
}







// phần này danh cho trang danh sách đơn của dịch vụ sinh viên
const studentService_initCampaigns = (_campaigns) => {
    let html = `<option value="">Chọn</option>`;
    _campaigns.forEach((item, index) => {
        html += item.isSelected ? `<option selected value="${item._id}">${item.name} - Nhập học ngày ${formatDate(item.time)}</option>` : `<option value="${item._id}">${item.name} - Đợt ngày ${formatDate(item.time)}</option>`;
    });
    $("#campaign-list").html(html);
}

const studentService_initPaperTypes = (types) => {
    let html = ``;
    types.sort((a, b) => a.name.localeCompare(b.name));
    types.forEach((item, index) => {
        html += item.isSelected ? `<option selected value="${item.value}">${item.name}</option>` : `<option value="${item.value}">${item.name}</option>`;
    });
    $("#type-list").html(html);
    $("#type-list").select2();
}

const studentService_goInsertPage = () => {
    const campaign = $("#campaign-list").val();
    const types = $("#type-list").val();
    if (!campaign) return swal('Vui lòng chọn đợt');
    if (!types || (types && types.length > 1)) return swal('Vui lòng chọn 1 loại');

    window.location.href = '/dich-vu-sinh-vien/nhap-hoc-tro-lai/them-moi?campaign=' + campaign + '&type=' + types;
}

const studentService_filterData = () => {
    const campaign = $("#campaign-list").val();
    const type = $("#type-list").val();
    let url = `/dich-vu-sinh-vien/nhap-hoc-tro-lai?`;
    if (campaign) url += `campaign=${campaign}&`;
    if (type) url += new URLSearchParams(type.map(s => ['type', s])).toString();
    window.location.href = url;
}








// trang thêm mới của dịch vụ sinh viên

const studentService_initCreatedAt = (d) => {
    $("#createdAt").val(formatDate(d ? new Date(d) : new Date(), 2));
}

const studentService_getStudentInfo = async (code) => {
    const url = `/api/users/sinh-vien/chi-tiet/${code}`;
    const option = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    }
    try {
        const result = await fetchAPI(url, option);
        if (result.error == false) {
            $('#fullname').val(result.data.name);
            $('#email').val(result.data.email);
            $('#current_semester').val(result.data.current_semester);
        }
    } catch (e) { swal(`Lỗi: ${e.message} `); }
}

const studentService_initCourses = async (courses, isHavingDefault = false) => {
    courses.sort((a, b) => a.name.localeCompare(b.name));
    let html = ``;
    if(isHavingDefault) {
        html += `<option value = "" > Chọn</option>`;
    }
    for (let i = 0; i < courses.length; i++) {
        const c = courses[i];
        if (c.name.toString() == rejoinPaper.course.toString()) {
            html += `<option selected value = "${c.name}" > ${c.name}</option>`;
        } else {
            html += `<option value = "${c.name}" > ${c.name}</option>`;
        }
    }
    $('#course').html(html);
    let val = $('#course').val();
    if (val) {
        rejoinPaper.course = val;
        rejoinPaper.courseFee = courses.find(c => c.name == val).fee;
        $('#courseFee').val(rejoinPaper.courseFee);
    }
}

const studentService_onChangeCourse = async (value) => {
    let c = _courses.find(c => c.name == value);
    if (c) {
        rejoinPaper.courseFee = c.fee;
        rejoinPaper.course = value;
        $('#courseFee').val(c.fee);
    }
    studentService_calculateTotalFee();
}



const studentService_initSemesters = async (selected, id) => {
    let html = ``;
    for (let i = 1; i <= 8; i++) {
        html += selected == i ? `<option selected value = "${i}" > Kỳ ${i}</option>` :
            `<option value = "${i}" >Kỳ ${i}</option>`;
    }
    $(`#${id}`).html(html);
}

const studentService_initCampaign = async (campaign) => {
    let text = `Nhập học ngày ${formatDate(campaign.time)}`;
    let value = campaign._id;
    $('#campaign').val(value);
    $('#campaign_display').val(text);
    nextPartFirst.campaign = campaign._id;
    nextPartThird.campaign = campaign._id;
    nextPartSecond.campaign = campaign._id;
}

const studentService_initRejoinStudentStatus = async (arr, selected) => {
    let html = ``;
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        html += selected == item.VALUE ?
            `<option selected value = "${item.VALUE}" > ${item.NAME}</option>` :
            `<option value = "${item.VALUE}" > ${item.NAME}</option>`;
    }
    $(`#rejoinStudentStatus`).html(html);
}

const studentService_onChangeRejoinStudentStatus = async (value) => {
    let c = _rejoinStudentStatus.find(c => c.VALUE == value);
    if (c) {
        rejoinPaper.rejoinStudentStatus = c.VALUE;
    }
    studentService_calculateTotalFee();
}

const studentService_initEnglish = async (englishProps, level, fee) => {
    let modalContent = `
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModal">Tiếng Anh</h4>
        </div>
        <div class="modal-body">
            <form id="course_form">
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="form_english_level">Level Tiếng Anh</label>
                        <select class="form-control" id="form_english_level">
    `;

    let { levels, fees } = englishProps;
    for (let i = 0; i < levels.length; i++) {
        let item = levels[i];
        if (!item.value) continue;
        modalContent += level == item.value ?
            `<option selected value = "${item.value}" > ${item.value}</option>` :
            `<option value = "${item.value}" > ${item.value}</option>`;
    }
    modalContent += ` </select>
            </div>
            <div class="form-group col-md-6">
                <label for="form_english_fee">Mức phí</label>
                <select class="form-control" id="form_english_fee">`;
    for (let i = 0; i < fees.length; i++) {
        let item = fees[i];
        if (!item.value) continue;
        modalContent += fee == item.value ?
            `<option selected value = "${item.value}" > ${formatCurrency(item.value)}</option>` :
            `<option value = "${item.value}" > ${formatCurrency(item.value)}</option>`;
    }
    modalContent += `
            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="form-group modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button onclick="studentService_saveEnglish()" data-dismiss="modal" type="button"
                    class="btn btn-primary">Lưu</button>
            </div>`;

    $(`#modal-content`).html(modalContent);
}

const studentService_saveEnglish = () => {
    let level = $(`#form_english_level`).val();
    let fee = $(`#form_english_fee`).val();
    nextPartFirst.english.level = level;
    nextPartFirst.english.fee = fee;
    $(`#english`).html(`${level} - ${formatCurrency(fee)}`);
    studentService_calculateTotalFee();
}


const studentService_initRetestSubjects = (arr) => {
    let modalContent = `
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Danh sách môn học</h4>
    </div>
    <div class="modal-body text-center">
        <form id="course_form">
            <div class="new_subjects_container" id="new_subjects_container">
    `;

    for (let i = 0; i < arr.length; i++) {
        const c = arr[i];
        modalContent += `
                <div class="form-check new_course_item">
                    <input class="form-check-input" type="checkbox" id="check${c.code}" name="new_courses" value="${c.code}" onchange="studentService_onChangeRestestSubject(this.value)">
                    <label class="form-check-label" for="check${c.code}"><span>${c.code}</span></label>
                    <label><input type="radio" name="radio${c.code}" id="radio${c.code}1" value="1">1 phần</label>
                    <label><input type="radio" name="radio${c.code}" id="radio${c.code}2" value="2">2 phần</label>
                    <input type="hidden" id="hidden${c.code}" value="${c.fee}">
                </div>
            `
    }

    modalContent += `
                    </div>
                </form>
            </div>
            <div class="form-group modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button onclick="studentService_saveSubjects(1)" data-dismiss="modal" type="button"
                    class="btn btn-primary">Lưu</button>
            </div>
            `;
    $(`#modal-content`).html(modalContent);
}

const studentService_onChangeRestestSubject = code => {
    $('#radio' + code + '1').prop('checked', true);
}

// type = 1: thi lai, 2: học lại, 3: bổ sung, 4: miễn giảm, 5: chuyển đổi
const studentService_saveSubjects = (type = 1) => {
    if (type == 1) {
        nextPartFirst.retestSubjects = [];
    } else if (type == 2) {
        nextPartFirst.retakeSubjects = [];
    } else if (type == 3) {
        nextPartFirst.newSubjects = [];
    } else if (type == 4) {
        nextPartFirst.finishedSubjects = [];
    } else if (type == 5) {
        nextPartFirst.exchangeSubjects = [];
    }

    const subjects = $("input[name='new_courses']");
    for (let i = 0; i < subjects.length; i++) {
        let item = subjects[i];
        if (item.checked) {
            if (type == 1) {
                let fee = $(`#hidden${item.value}`).val();
                let part = $(`input[name='radio${item.value}']:checked`).val();
                fee = part == 2 ? 500000 : 250000;
                nextPartFirst.retestSubjects.push({ name: item.value, fee: fee, part: part });
            } else if (type == 2) {
                let fee = $(`#hidden${item.value}`).val();
                nextPartFirst.retakeSubjects.push({ name: item.value, fee: fee });
            } else if (type == 3) {
                let fee = $(`#hidden${item.value}`).val();
                nextPartFirst.newSubjects.push({ name: item.value, fee: fee });
            } else if (type == 4) {
                let fee = $(`#hidden${item.value}`).val();
                nextPartFirst.finishedSubjects.push({ name: item.value, fee: fee });
            } else {
                let fee = $(`#hidden${item.value}`).val();
                nextPartFirst.exchangeSubjects.push({ name: item.value, fee: fee });
            }
        }
    }
    studentService_renderSubjects(type);
}

const studentService_removeSubjects = (subject, type = 1) => {
    if (type == 1) {
        let index = nextPartFirst.retestSubjects.findIndex(x => x.name == subject);
        if (index > -1) {
            nextPartFirst.retestSubjects.splice(index, 1);
        }
    } else if (type == 2) {
        let index = nextPartFirst.retakeSubjects.findIndex(x => x.name == subject);
        if (index > -1) {
            nextPartFirst.retakeSubjects.splice(index, 1);
        }
    } else if (type == 3) {
        let index = nextPartFirst.newSubjects.findIndex(x => x.name == subject);
        if (index > -1) {
            nextPartFirst.newSubjects.splice(index, 1);
        }
    } else if (type == 4) {
        let index = nextPartFirst.finishedSubjects.findIndex(x => x.name == subject);
        if (index > -1) {
            nextPartFirst.finishedSubjects.splice(index, 1);
        }
    } else {
        let index = nextPartFirst.exchangeSubjects.findIndex(x => x.name == subject);
        if (index > -1) {
            nextPartFirst.exchangeSubjects.splice(index, 1);
        }
    }
    studentService_renderSubjects(type);
}

const studentService_renderSubjects = (type = 1) => {
    studentService_calculateTotalFee();
    let subjects = type == 1 ? nextPartFirst.retestSubjects :
        type == 2 ? nextPartFirst.retakeSubjects :
            type == 3 ? nextPartFirst.newSubjects :
                type == 4 ? nextPartFirst.finishedSubjects : nextPartFirst.exchangeSubjects;
    let id = type == 1 ? 'retestSubjects' :
        type == 2 ? 'retakeSubjects' :
            type == 3 ? 'newSubjects' :
                type == 4 ? 'finishedSubjects' : 'exchangeSubjects';
    let html = ``;
    for (let i = 0; i < subjects.length; i++) {
        const item = subjects[i];
        if (type == 1) {
            html += `<span class="btn">${item.name}(${item.part}P)</span> - <span>${formatCurrency(item.fee)}</span>
                -<span class="btn btn-link"  onclick="studentService_removeSubjects('${item.name}', ${type})">Xoá</span>`;
        } else if (type == 2) {
            html += `<span class="btn">${item.name}</span> - <span>${formatCurrency(item.fee)}</span>
            -<span class="btn btn-link"  onclick="studentService_removeSubjects('${item.name}', ${type})">Xoá</span>`;
        } else if (type == 3) {
            html += `<span class="btn">${item.name}</span> - <span>${formatCurrency(item.fee)}</span>
            -<span class="btn btn-link"  onclick="studentService_removeSubjects('${item.name}', ${type})">Xoá</span>`;
        } else if (type == 4) {
            html += `<span class="btn">${item.name}</span> - <span>${formatCurrency(item.fee)}</span>
            -<span class="btn btn-link"  onclick="studentService_removeSubjects('${item.name}', ${type})">Xoá</span>`;
        } else {
            html += `<span class="btn">${item.name}</span> - <span>${formatCurrency(item.fee)}</span>
            -<span class="btn btn-link"  onclick="studentService_removeSubjects('${item.name}', ${type})">Xoá</span>`;
        }
    }
    $(`#${id}`).html(html);
}

const studentService_initRetakeSubjects = (arr) => {
    let modalContent = `
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Danh sách môn học</h4>
    </div>
    <div class="modal-body text-center">
        <form id="course_form">
            <div class="new_subjects_container" id="new_subjects_container">
    `;

    for (let i = 0; i < arr.length; i++) {
        const c = arr[i];
        modalContent += `
                <div class="form-check new_course_item">
                    <input class="form-check-input" type="checkbox" id="check${c.code}" name="new_courses" value="${c.code}" onchange="studentService_onChangeRestestSubject(this.value)">
                    <label class="form-check-label" for="check${c.code}"><span>${c.code}</span> - <span>${formatCurrency(c.fee)}</span></label>
                    <input type="hidden" id="hidden${c.code}" value="${c.fee}">
                </div>
            `
    }

    modalContent += `
                    </div>
                </form>
            </div>
            <div class="form-group modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button onclick="studentService_saveSubjects(2)" data-dismiss="modal" type="button"
                    class="btn btn-primary">Lưu</button>
            </div>
            `;
    $(`#modal-content`).html(modalContent);
}

const studentService_initNewSubjects = (arr) => {
    let modalContent = `
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Danh sách môn học</h4>
    </div>
    <div class="modal-body text-center">
        <form id="course_form">
            <div class="new_subjects_container" id="new_subjects_container">
    `;

    for (let i = 0; i < arr.length; i++) {
        const c = arr[i];
        modalContent += `
                <div class="form-check new_course_item">
                    <input class="form-check-input" type="checkbox" id="check${c.code}" name="new_courses" value="${c.code}" onchange="studentService_onChangeRestestSubject(this.value)">
                    <label class="form-check-label" for="check${c.code}">
                        <span>${c.code}</span> - <span>${formatCurrency(c.fee)}</span>
                    </label>
                    <input type="hidden" id="hidden${c.code}" value="${c.fee}">
                </div>
            `
    }

    modalContent += `
                    </div>
                </form>
            </div>
            <div class="form-group modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button onclick="studentService_saveSubjects(3)" data-dismiss="modal" type="button"
                    class="btn btn-primary">Lưu</button>
            </div>
            `;
    $(`#modal-content`).html(modalContent);
}

const studentService_initFinishedSubjects = (arr) => {
    let modalContent = `
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Danh sách môn học</h4>
    </div>
    <div class="modal-body text-center">
        <form id="course_form">
            <div class="new_subjects_container" id="new_subjects_container">
    `;

    for (let i = 0; i < arr.length; i++) {
        const c = arr[i];
        modalContent += `
                <div class="form-check new_course_item">
                    <input class="form-check-input" type="checkbox" id="check${c.code}" name="new_courses" value="${c.code}" onchange="studentService_onChangeRestestSubject(this.value)">
                    <label class="form-check-label" for="check${c.code}">
                        <span>${c.code}</span> - <span>${formatCurrency(c.fee)}</span>
                    </label>
                    <input type="hidden" id="hidden${c.code}" value="${c.fee}">
                </div>
            `
    }

    modalContent += `
                    </div>
                </form>
            </div>
            <div class="form-group modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button onclick="studentService_saveSubjects(4)" data-dismiss="modal" type="button"
                    class="btn btn-primary">Lưu</button>
            </div>
            `;
    $(`#modal-content`).html(modalContent);
}

const studentService_initExchangeSubjects = (arr) => {
    let modalContent = `
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Danh sách môn học</h4>
    </div>
    <div class="modal-body text-center">
        <form id="course_form">
            <div class="new_subjects_container" id="new_subjects_container">
    `;

    for (let i = 0; i < arr.length; i++) {
        const c = arr[i];
        modalContent += `
                <div class="form-check new_course_item">
                    <input class="form-check-input" type="checkbox" id="check${c.code}" name="new_courses" value="${c.code}" onchange="studentService_onChangeRestestSubject(this.value)">
                    <label class="form-check-label" for="check${c.code}">
                        <span>${c.code}</span> - <span>${formatCurrency(c.fee)}</span>
                    </label>
                    <input type="hidden" id="hidden${c.code}" value="${c.fee}">
                </div>
            `
    }

    modalContent += `
                    </div>
                </form>
            </div>
            <div class="form-group modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button onclick="studentService_saveSubjects(5)" data-dismiss="modal" type="button"
                    class="btn btn-primary">Lưu</button>
            </div>
            `;
    $(`#modal-content`).html(modalContent);
}

const studentService_calculateTotalFee = () => {
    let total = 500000 + Number(nextPartFirst.english.fee);
    let rejoinStudentStatus = $('#rejoinStudentStatus').val();
    if (rejoinStudentStatus == 1) {
        total += Number(rejoinPaper.courseFee);
    }
    for (let index = 0; index < nextPartFirst.retestSubjects.length; index++) {
        const item = nextPartFirst.retestSubjects[index];
        total += Number(item.fee);
    }
    for (let index = 0; index < nextPartFirst.retakeSubjects.length; index++) {
        const item = nextPartFirst.retakeSubjects[index];
        total += Number(item.fee);
    }
    for (let index = 0; index < nextPartFirst.newSubjects.length; index++) {
        const item = nextPartFirst.newSubjects[index];
        total += Number(item.fee);
    }
    for (let index = 0; index < nextPartFirst.finishedSubjects.length; index++) {
        const item = nextPartFirst.finishedSubjects[index];
        total -= Number(item.fee);
    }
    nextPartFirst.totalFee = total;
    $('#totalFee').html(formatCurrency(total));
}

const studentService_onSaveRejoinPaper = async () => {

    rejoinPaper = {
        ...rejoinPaper,
        type: _type,
        studentCode: $('#studentCode').val(),
        fullname: $('#fullname').val(),
        email: $('#email').val(),
        dropout: $('#dropout').val(),
        dropoutAtSemester: $('#dropoutAtSemester').val(),
        rejoinAcademicYear: $('#rejoinAcademicYear').val(),
        mobile: $('#mobile').val(),
        nextPartFirst: {
            ...nextPartFirst,
            rejoinAtSemester: $('#rejoinAtSemester').val(),
            rejoinStudentStatus: $('#rejoinStudentStatus').val(),
            notes: $('#notes').val(),
            feeDeadline: $('#feeDeadline').val(),
        }
    }
    console.log(rejoinPaper);

    swal("Xác nhận tạo phiếu nhập học?", {
        buttons: {
            cancel: "Hủy",
            confirm: 'Xác nhận',
        },
    })
        .then(async (value) => {
            if (value) {
                const url = `/api/papers/dich-vu-sinh-vien/nhap-hoc-tro-lai/them-moi/`;

                const option = {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rejoinPaper })
                }
                try {
                    const result = await fetchAPI(url, option);
                    if (result.error == false) {
                        window.location.href = '/dich-vu-sinh-vien/nhap-hoc-tro-lai/'
                    }
                    else {
                        swal("Lỗi", result.message, "error");
                    }
                } catch (e) { swal(`Lỗi: ${e.message} `); }
            }
        })
}

const studentService_getSemFromDate = (d = new Date()) => {
    let date = new Date(d);
    let month = date.getMonth();
    let year = date.getFullYear().toString().slice(-2,);
    switch (month) {
        case 0:
        case 1:
        case 2:
        case 3:
            return `SU${year}`;
        case 4:
        case 5:
        case 6:
        case 7:
            return `FA${year}`;
        case 8:
        case 9:
        case 10:
        case 11:
            return `SP${Number(year) + 1}`;
        default: break;
    }
}

const finance_onUpdateRejoinPaper = async (id, action) => {
    let actionType = 1, remainFee = $('#remainFee').val() || 0;
    if (action.toString() == 'FEE_CONFIRM') {
        actionType = 2;
    } else if (action.toString() == 'REJECT') {
        actionType = 3;
        remainFee = 0;
    } else if (action.toString() == 'CLOSED') {
        actionType = 4;
    } else if (action.toString() == 'CANCEL') {
        actionType = 5;
    } else if (action.toString() == 'DONE') {
        actionType = 6;
    }
    if (actionType == 1) return;


    swal("Xác nhận cập nhật phiếu?", {
        buttons: {
            cancel: "Hủy",
            confirm: 'Xác nhận',
        },
    })
        .then(async (value) => {
            if (value) {
                const url = `/api/papers/tai-vu/nhap-hoc-tro-lai/`;

                const option = {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: actionType, id, remainFee })
                }
                try {
                    const result = await fetchAPI(url, option);
                    if (result.error == false) {
                        window.location.href = '/tai-vu/nhap-hoc-tro-lai/'
                    }
                    else {
                        swal("Lỗi", result.message, "error");
                    }
                } catch (e) { swal(`Lỗi: ${e.message} `); }
            }
        })
}








// phần này dành cho trang dịch vụ sinh viên cập nhật

const studentService_initUpdatingPage = (isHavingDefault = false) => {
    $("#createdAt").val(formatDate(rejoinPaper.createdAt, 2));
    $('#studentCode').val(rejoinPaper.studentCode);
    $('#fullname').val(rejoinPaper.fullname);
    $('#email').val(rejoinPaper.email);
    studentService_initCourses(_courses, isHavingDefault);
    $('#dropout').val(rejoinPaper.dropout);
    studentService_initSemesters(rejoinPaper.dropoutAtSemester, 'dropoutAtSemester');
    $('#rejoinAcademicYear').val(rejoinPaper.rejoinAcademicYear);
    $('#mobile').val(rejoinPaper.mobile);
    studentService_initSemesters(nextPartFirst.rejoinAtSemester, 'rejoinAtSemester');
}

const studentService_initPageTypeOneForUpdating = async () => {
    studentService_initUpdatingPage();
    studentService_initCampaign(_oneCampaign);
    studentService_initRejoinStudentStatus(_rejoinStudentStatus, nextPartFirst.rejoinStudentStatus);

    let english = `${nextPartFirst.english.level} - ${formatCurrency(nextPartFirst.english.fee)}`;
    $(`#english`).html(english.trim().length > 3 ? english : '');

    studentService_renderSubjects(1);
    studentService_renderSubjects(2);
    studentService_renderSubjects(3);
    studentService_renderSubjects(4);
    studentService_renderSubjects(5);

    $('#notes').val(nextPartFirst.notes);
    $('#totalFee').html(formatCurrency(nextPartFirst.totalFee));
    $('#feeDeadline').val(formatDate(nextPartFirst.feeDeadline, 2));

}

const studentService_initPageTypeTwoForUpdating = async () => {
    studentService_initUpdatingPage();
    studentService_initCampaign(_oneCampaign);
   
    $('#feeDeadline').val(formatDate(nextPartSecond.feeDeadline, 2));
}

const studentService_initPageTypeThreeForUpdating = async () => {
    studentService_initCampaign(_oneCampaign);
    studentService_initUpdatingPage();
    $('#notes').val(nextPartThird.notes);
    $('#feeDeadline').val(formatDate(nextPartThird.feeDeadline || new Date(), 2));
}




const studentService_onSaveUpdateRejoinPaper = async (status = 1) => {

    rejoinPaper = {
        ...rejoinPaper,
        type: _type,
        studentCode: $('#studentCode').val(),
        fullname: $('#fullname').val(),
        email: $('#email').val(),
        dropout: $('#dropout').val(),
        dropoutAtSemester: $('#dropoutAtSemester').val(),
        rejoinAcademicYear: $('#rejoinAcademicYear').val(),
        mobile: $('#mobile').val(),

    }
    if (_type == 1) {
        rejoinPaper.nextPartFirst = {
            ...nextPartFirst,
            rejoinAtSemester: $('#rejoinAtSemester').val(),
            rejoinStudentStatus: $('#rejoinStudentStatus').val(),
            notes: $('#notes').val(),
            feeDeadline: $('#feeDeadline').val(),
        }
    } else if (_type == 2) {
        rejoinPaper = {
            ...rejoinPaper,
            type: _type,
            studentCode: $('#studentCode').val(),
            fullname: $('#fullname').val(),
            email: $('#email').val(),
            dropout: $('#dropout').val(),
            dropoutAtSemester: $('#dropoutAtSemester').val(),
            rejoinAcademicYear: $('#rejoinAcademicYear').val(),
            mobile: $('#mobile').val(),
            course: $('#course').val(),
            nextPartSecond: {
                ...nextPartSecond,
                notes: $('#notes').val(),
                feeDeadline: $('#feeDeadline').val(),
            }
        }
    } else if (_type == 3) {
        rejoinPaper.nextPartThird = {
            ...nextPartThird,
            notes: $('#notes').val(),
            feeDeadline: $('#feeDeadline').val(),
        }
    }
    console.log(rejoinPaper);

    swal("Xác nhận cập nhật phiếu nhập học?", {
        buttons: {
            cancel: "Hủy",
            confirm: 'Xác nhận',
        },
    })
        .then(async (value) => {
            if (value) {
                const url = `/api/papers/dich-vu-sinh-vien/nhap-hoc-tro-lai/`;

                const option = {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rejoinPaper, status })
                }
                try {
                    const result = await fetchAPI(url, option);
                    if (result.error == false) {
                        window.location.href = '/dich-vu-sinh-vien/nhap-hoc-tro-lai/'
                    }
                    else {
                        swal("Lỗi", result.message, "error");
                    }
                } catch (e) { swal(`Lỗi: ${e.message} `); }
            }
        })
}







// phần này dành cho trang dịch vụ sinh viên loại 3

const studentService_onSaveRejoinPaper3 = async () => {

    rejoinPaper = {
        ...rejoinPaper,
        type: _type,
        studentCode: $('#studentCode').val(),
        fullname: $('#fullname').val(),
        email: $('#email').val(),
        dropout: $('#dropout').val(),
        dropoutAtSemester: $('#dropoutAtSemester').val(),
        rejoinAcademicYear: $('#rejoinAcademicYear').val(),
        mobile: $('#mobile').val(),
        nextPartThird: {
            ...nextPartThird,
            feeDeadline: $('#feeDeadline').val(),
            totalFee: 0,
        }
    }
    console.log(rejoinPaper);

    swal("Xác nhận tạo phiếu nhập học?", {
        buttons: {
            cancel: "Hủy",
            confirm: 'Xác nhận',
        },
    })
        .then(async (value) => {
            if (value) {
                const url = `/api/papers/dich-vu-sinh-vien/nhap-hoc-tro-lai/them-moi/`;

                const option = {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rejoinPaper })
                }
                try {
                    const result = await fetchAPI(url, option);
                    if (result.error == false) {
                        window.location.href = '/dich-vu-sinh-vien/nhap-hoc-tro-lai/'
                    }
                    else {
                        swal("Lỗi", result.message, "error");
                    }
                } catch (e) { swal(`Lỗi: ${e.message} `); }
            }
        })
}




// phần này dành cho dịch vụ sinh viên loại 2
const studentService_onSaveRejoinPaper2 = async () => {

    rejoinPaper = {
        ...rejoinPaper,
        type: _type,
        studentCode: $('#studentCode').val(),
        fullname: $('#fullname').val(),
        email: $('#email').val(),
        dropout: $('#dropout').val(),
        dropoutAtSemester: $('#dropoutAtSemester').val(),
        rejoinAcademicYear: $('#rejoinAcademicYear').val(),
        mobile: $('#mobile').val(),
        course: $('#course').val(),
        nextPartSecond: {
            ...nextPartSecond,
            notes: $('#notes').val(),
            feeDeadline: $('#feeDeadline').val(),
        }
    }
    console.log(rejoinPaper);

    swal("Xác nhận tạo phiếu nhập học?", {
        buttons: {
            cancel: "Hủy",
            confirm: 'Xác nhận',
        },
    })
        .then(async (value) => {
            if (value) {
                const url = `/api/papers/dich-vu-sinh-vien/nhap-hoc-tro-lai/them-moi/`;

                const option = {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rejoinPaper })
                }
                try {
                    const result = await fetchAPI(url, option);
                    if (result.error == false) {
                       window.location.href = '/dich-vu-sinh-vien/nhap-hoc-tro-lai/'
                    }
                    else {
                        swal("Lỗi", result.message, "error");
                    }
                } catch (e) { swal(`Lỗi: ${e.message} `); }
            }
        })
}




// phần này dành cho đào tạo cập nhật loại 2
const education_initPageTypeTwoForUpdating = async () => {
    studentService_initUpdatingPage(true);
    studentService_initCampaign(_oneCampaign);

    let html = '';
    for (let index = 0; index < _newCourses.length; index++) {
        const element = _newCourses[index];
        if (element.value.toString() == nextPartSecond.newCoursePlanning.toString()) {
            html += `<option selected value = "${element.value}" > ${element.name}</option>`;
        } else {
            html += `<option value = "${element.value}" > ${element.name}</option>`;
        }
    }
    $('#newCoursePlanning').html(html);
    studentService_initSemesters(nextPartSecond.newAtSemester, 'newAtSemester');
    html = '';
    for (let index = 0; index < _newStudentStatus.length; index++) {
        const element = _newStudentStatus[index];
        if (element.VALUE.toString() == nextPartSecond.newStudentStatus.toString()) {
            html += `<option selected value = "${element.VALUE}" > ${element.NAME}</option>`;
        } else {
            html += `<option value = "${element.VALUE}" > ${element.NAME}</option>`;
        }
    }
    $('#newStudentStatus').html(html);
    $('#feeDeadline').val(formatDate(nextPartSecond.feeDeadline, 2));
    $('#startAtSemester').val(nextPartSecond.startAtSemester || studentService_getSemFromDate());
}