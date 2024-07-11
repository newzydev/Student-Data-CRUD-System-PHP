// ป้องกัน Input ข้อมูลที่ไม่พึงประสงค์
$(document).ready(function () {
    $('.input-name').on('keypress', function (e) {
        var charCode = e.which;
        var thaiRegex = /[ก-ฮเแโใไฤๅฆฉฐญฑฎดตบ้ป่อฮะัาิีึืุูเะัำๆไึ๊แ๋ใ็ไฯํฺ๊โ์]+/;
        var englishRegex = /[a-zA-Z]/;
        var inputChar = String.fromCharCode(charCode);

        if (!(thaiRegex.test(inputChar) || englishRegex.test(inputChar) || charCode === 32)) {
            e.preventDefault();
        }
    });

    $('.input-age').on('keypress', function (e) {
        var charCode = e.which;
        var numberRegex = /[0-9]/;
        var inputChar = String.fromCharCode(charCode);

        if (!(numberRegex.test(inputChar))) {
            e.preventDefault();
        }
    });

    $('.input-age').on('input', function () {
        var value = $(this).val();
        if (value !== '' && parseInt(value) < 1) {
            $(this).val(1);
        }
    });

    $('.input-grade').on('keypress', function (e) {
        var charCode = e.which;
        var numberRegex = /[0-9]/;
        var dotRegex = /[.]/;
        var inputChar = String.fromCharCode(charCode);

        if (!(numberRegex.test(inputChar) || dotRegex.test(inputChar))) {
            e.preventDefault();
        }
    });

    $('.input-grade').on('input', function () {
        var value = $(this).val();
        var validRegex = /^\d{1}(\.\d{0,2})?$/;

        if (!validRegex.test(value)) {
            $(this).val(value.substring(0, value.length - 1));
        }
    });

    $('.input-search').on('keypress', function (e) {
        var charCode = e.which;
        var thaiRegex = /[ก-ฮเแโใไฤๅฆฉฐญฑฎดตบ้ป่อฮะัาิีึืุูเะัำๆไึ๊แ๋ใ็ไฯํฺ๊โ์]+/;
        var englishRegex = /[a-zA-Z]/;
        var numberRegex = /[0-9]/;
        var inputChar = String.fromCharCode(charCode);

        if (!(thaiRegex.test(inputChar) || englishRegex.test(inputChar) || numberRegex.test(inputChar) || charCode === 32)) {
            e.preventDefault();
        }
    });

    // ป้องกันการกดปุ่ม Ctrl ต่างๆ
    $('.input-anti').on('keydown', function (e) {
        var charCode = e.which || e.keyCode;
        var ctrlKey = e.ctrlKey || e.metaKey; // ตรวจสอบว่ากด Ctrl หรือ Command (Mac)

        // ตรวจสอบว่ากดปุ่มลบหรือไม่
        if (charCode === 8) {
            return; // อนุญาตให้ลบข้อมูล
        }

        // ถ้ากดเพื่องาน Ctrl+A, Ctrl+C, หรือ Ctrl+V ให้ยกเลิกการเพิ่มตัวอักษร
        if (ctrlKey) {
            e.preventDefault();
        }
    });

    // ป้องกันการคลิกขวา
    $('.body-anti').on('contextmenu', function (e) {
        e.preventDefault();
    });

    // ป้องกันการคลิกขวาปุ่ม
    $('.btn-anti').on('contextmenu', function (e) {
        e.preventDefault();
    });

    // ป้องกันการคลิกขวาในช่องป้อนข้อมูล
    $('.input-anti').on('contextmenu', function (e) {
        e.preventDefault();
    });

    // ป้องกันการลากและวางข้อความลงในช่องป้อนข้อมูล
    $('.input-anti').on('dragover drop', function (e) {
        e.preventDefault();
    });

    // ป้องกันการกดปุ่มก่อนกรอกข้อมูล
    checkInput();

    $('.input-name').on('input', function () {
        checkInput();
    });
    $('.input-age').on('input', function () {
        checkInput();
    });
    $('.input-grade').on('input', function () {
        checkInput();
    });

    function checkInput() {
        // ตรวจสอบว่า input field ว่างเปล่าหรือไม่
        if ($('.input-name').val().trim() === '' || $('.input-age').val().trim() === '' || $('.input-grade').val().trim() === '') {
            $('#add-student-form button').prop('disabled', true); // ปิดใช้งานปุ่ม
        } else {
            $('#add-student-form button').prop('disabled', false); // เปิดใช้งานปุ่ม
        }
    }
});

let currentPage = 1;
let studentsData = [];
let currentSearch = ""; // New variable to store the current search term

function fetchStudents(search = "") {
    $.ajax({
        url: 'php/fetch_students.php',
        method: 'GET',
        data: {
            search: search
        },
        dataType: 'json',
        success: function (data) {
            studentsData = data;
            displayStudents();
        },
        error: function () {
            $('#students-table tbody').empty();
            $('#students-table tbody').append(
                '<tr><td colspan="7" class="text-center">เกิดเหตุขัดข้องไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ขณะนี้กำลังเร่งดำเนินการแก้ไข ขออภัยในความไม่สะดวก</td></tr>'
            );
            $('#pagination').hide(); // Hide pagination if there's an error
        }
    });
}

$('#search').on('keyup', function () {
    currentSearch = $(this).val().toLowerCase();
    currentPage = 1; // Reset to the first page when a new search is initiated
    fetchStudents(currentSearch);
});

function displayStudents() {
    $('#students-table tbody').empty();
    const start = (currentPage - 1) * 5;
    const end = start + 5;
    const paginatedStudents = studentsData.slice(start, end);

    if (paginatedStudents.length === 0) {
        $('#students-table tbody').append(
            '<tr><td colspan="7" class="text-center">ไม่เจอข้อมูลที่ค้นหา หรือ ไม่มีข้อมูลในฐานข้อมูล</td></tr>'
        );
        $('#pagination').hide();
        $('#total-pages').hide();
    } else {
        paginatedStudents.forEach(function (student, index) {
            $('#students-table tbody').append(
                '<tr>' +
                '<td>' + (start + index + 1) + '</td>' +
                '<td class="text-center">' + student.id + '</td>' +
                '<td>' + student.name + '</td>' +
                '<td class="text-center">' + student.age + '</td>' +
                '<td class="text-center">' + student.grade + '</td>' +
                '<td>' + student.created_at + '</td>' +
                '<td class="text-center d-print-none">' +
                '<div class="btn-group" role="group" aria-label="Basic example">' +
                '<button class="btn btn-success btn-sm view-btn" data-id="' + student.id + '">ดูข้อมูล</button> ' +
                '<button class="btn btn-warning btn-sm edit-btn" data-id="' + student.id + '">แก้ไขข้อมูล</button> ' +
                '<button class="btn btn-danger btn-sm delete-btn" data-id="' + student.id + '">ลบข้อมูล</button>' +
                '</div>' +
                '</td>' +
                '</tr>'
            );
        });
        $('#pagination').show();
        $('#total-pages').show();
    }

    const totalPages = Math.ceil(studentsData.length / 5);
    $('#total-pages').empty();
    $('#total-pages').append(
        '<span>จาก ' + currentPage + ' หน้า ทั้งหมด ' + totalPages + ' หน้า</span>'
    );

    updatePaginationButtons();
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(studentsData.length / 5);
    $('#pagination-numbers').empty();

    if (totalPages <= 1) {
        $('#pagination').hide(); // Hide pagination if there is only one page or less
        return;
    }

    $('#pagination').show(); // Ensure pagination is shown if there are multiple pages
    const maxPageToShow = 3; // จำนวนของตัวเลขหน้าที่ต้องการแสดง

    // หาหน้าแรกและหน้าสุดท้ายที่จะแสดง
    let startPage = Math.max(1, currentPage - Math.floor(maxPageToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPageToShow - 1);

    // ปรับหน้าแรกและหน้าสุดท้ายเพื่อให้มีจำนวนตามที่กำหนด
    if (totalPages > maxPageToShow && (endPage - startPage + 1) < maxPageToShow) {
        startPage = endPage - maxPageToShow + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
        $('#pagination-numbers').append(
            '<li class="page-item ' + (i === currentPage ? 'active' : '') + '">' +
            '<div style="cursor: pointer;" class="page-link page-number">' + i + '</div>' +
            '</li>'
        );
    }

    $('#prev-page').parent().toggleClass('disabled', currentPage === 1);
    $('#next-page').parent().toggleClass('disabled', currentPage === totalPages);
}

$(document).ready(function () {
    fetchStudents();

    // เริ่มการรีเฟรชข้อมูลทุก 5 วินาที
    setInterval(function () {
        fetchStudents(currentSearch);
    }, 5000);

    $('#print-table').click(function (e) {
        e.preventDefault();
        window.print();
    });

    $('#add-student-form').submit(function (e) {
        e.preventDefault();
        var name = $('#name').val();
        var age = $('#age').val();
        var grade = $('#grade').val();

        $.ajax({
            url: 'php/add_student.php',
            method: 'POST',
            data: {
                name: name,
                age: age,
                grade: grade
            },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    fetchStudents(currentSearch); // Fetch students with the current search term
                    $('#name').val('');
                    $('#age').val('');
                    $('#grade').val('');
                } else {
                    alert('Error: ' + response.message);
                }
            }, error: function () {
                alert('เกิดเหตุขัดข้องไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ขณะนี้กำลังเร่งดำเนินการแก้ไข ขออภัยในความไม่สะดวก');
            }
        });
    });

    // Add this variable to keep the student ID for deletion
    let deleteStudentId = null;

    $(document).on('click', '.delete-btn', function () {
        deleteStudentId = $(this).data('id');

        $.ajax({
            url: 'php/fetch_students.php',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var student = data.find(student => student.id == deleteStudentId);
                $('#delete-id').val(student.id);
                $('#delete-name').text(student.name);
                $('#deleteStudentModal').modal('show');
            },
            error: function () {
                alert('เกิดเหตุขัดข้องไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ขณะนี้กำลังเร่งดำเนินการแก้ไข ขออภัยในความไม่สะดวก');
            }
        });

    });

    $('#confirm-delete-btn').click(function () {
        if (deleteStudentId) {
            $.ajax({
                url: 'php/delete_student.php',
                method: 'POST',
                data: {
                    id: deleteStudentId
                },
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        fetchStudents(currentSearch);
                        $('#deleteStudentModal').modal('hide');
                    } else {
                        alert('Error: ' + response.message);
                    }
                },
                error: function () {
                    alert('เกิดเหตุขัดข้องไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ขณะนี้กำลังเร่งดำเนินการแก้ไข ขออภัยในความไม่สะดวก');
                }
            });
        }
    });

    $(document).on('click', '.edit-btn', function () {
        var id = $(this).data('id');

        $.ajax({
            url: 'php/fetch_students.php',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var student = data.find(student => student.id == id);
                $('#edit-id').val(student.id);
                $('#edit-name').val(student.name);
                $('#edit-age').val(student.age);
                $('#edit-grade').val(student.grade);
                $('#editStudentModal').modal('show');
            },
            error: function () {
                alert('เกิดเหตุขัดข้องไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ขณะนี้กำลังเร่งดำเนินการแก้ไข ขออภัยในความไม่สะดวก');
            }
        });
    });

    $('#edit-student-form').submit(function (e) {
        e.preventDefault();
        var id = $('#edit-id').val();
        var name = $('#edit-name').val();
        var age = $('#edit-age').val();
        var grade = $('#edit-grade').val();

        $.ajax({
            url: 'php/update_student.php',
            method: 'POST',
            data: {
                id: id,
                name: name,
                age: age,
                grade: grade
            },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    fetchStudents(currentSearch); // Fetch students with the current search term
                    $('#editStudentModal').modal('hide');
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function () {
                alert('เกิดเหตุขัดข้องไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ขณะนี้กำลังเร่งดำเนินการแก้ไข ขออภัยในความไม่สะดวก');
            }
        });
    });

    $(document).on('click', '.view-btn', function () {
        var id = $(this).data('id');

        $.ajax({
            url: 'php/fetch_students.php',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var student = data.find(student => student.id == id);
                $('#view-id').val(student.id);
                $('#view-name').val(student.name);
                $('#view-age').val(student.age);
                $('#view-grade').val(student.grade);
                $('#viewStudentModal').modal('show');
            },
            error: function () {
                alert('เกิดเหตุขัดข้องไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ ขณะนี้กำลังเร่งดำเนินการแก้ไข ขออภัยในความไม่สะดวก');
            }
        });
    });

    $('#prev-page').click(function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayStudents();
        }
    });

    $('#next-page').click(function (e) {
        e.preventDefault();
        if (currentPage < Math.ceil(studentsData.length / 5)) {
            currentPage++;
            displayStudents();
        }
    });

    $(document).on('click', '.page-number', function () {
        currentPage = parseInt($(this).text());
        displayStudents();
    });
});
