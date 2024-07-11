<!DOCTYPE html>
<html lang="th">

<head>
    <!-- Meta -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ระบบฐานข้อมูลนักเรียน</title>

    <!-- Icon -->
    <link rel="apple-touch-icon" sizes="180x180" href="image/PSU Logo.jpg">
    <link rel="icon" type="image/png" sizes="32x32" href="image/PSU Logo.jpg">
    <link rel="icon" type="image/png" sizes="16x16" href="image/PSU Logo.jpg">

    <!-- Style -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <div class="container mt-3 mb-3">

        <!-- Header -->
        <div class="card mb-3">
            <div class="card-header text-center">
                ระบบฐานข้อมูลนักเรียน
            </div>
        </div>

        <!-- Add Student -->
        <div class="card mb-3 d-print-none">
            <div class="card-header">
                เพิ่มนักเรียน
            </div>
            <div class="card-body">
                <form id="add-student-form">
                    <div class="form-row">
                        <div class="col-md-6 mb-3 mb-sm-0">
                            <input type="text" class="form-control input-anti input-name" id="name" placeholder="ชื่อ - นามสกุล" required autocomplete="off">
                        </div>
                        <div class="col-md-2 mb-3 mb-sm-0">
                            <input type="text" class="form-control input-anti input-age" id="age" placeholder="อายุ" required autocomplete="off">
                        </div>
                        <div class="col-md-2 mb-3 mb-sm-0">
                            <input type="text" class="form-control input-anti input-grade" id="grade" placeholder="เกรดเฉลี่ย" required autocomplete="off">
                        </div>
                        <div class="col-md-2 mb-sm-0">
                            <button type="submit" class="btn btn-primary btn-block btn-anti btn-submit">เพิ่มนักเรียน</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Table Students -->
        <div class="card mb-3">
            <div class="card-header d-flex justify-content-between align-items-center d-print-none">
                ตารางข้อมูลนักเรียน
                <div id="print-table" class="btn btn-outline-secondary btn-sm btn-anti">พิมพ์ตาราง</div>
            </div>
            <div class="card-body">
                <div class="form-row d-print-none">
                    <div class="col-md-8"></div>
                    <div class="col-md-4 mb-3">
                        <input type="text" class="form-control input-anti input-search" id="search" placeholder="ค้นหานักเรียน จาก ชื่อ - นามสกุล" autocomplete="off">
                    </div>
                </div>
                <table class="mb-3 table table-hover table-responsive-sm text-nowrap d-print-table" id="students-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th class="text-center">ไอดี</th>
                            <th>ชื่อ - นามสกุล</th>
                            <th class="text-center">อายุ</th>
                            <th class="text-center">เกรดเฉลี่ย</th>
                            <th>สร้างเมื่อ</th>
                            <th class="text-center d-print-none">ดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody class="body-anti">
                    </tbody>
                </table>
                <nav class="col-md-12 d-print-none" aria-label="Page navigation mt-3">
                    <div class="justify-content-center text-center mb-2">
                        <span id="total-pages"></span>
                    </div>
                    <ul class="pagination justify-content-center m-0" id="pagination">
                        <li class="page-item">
                            <div style="cursor: pointer;" class="page-link text-nowrap btn-anti" id="prev-page">ก่อนหน้า</div>
                        </li>
                        <li class="page-item">
                            <div id="pagination-numbers" class="d-inline-flex btn-anti"></div>
                        </li>
                        <li class="page-item">
                            <div style="cursor: pointer;" class="page-link text-nowrap btn-anti" id="next-page">ถัดไป</div>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>

        <!-- Footer -->
        <div class="card d-print-none">
            <div class="card-header text-center">
                &copy <?php $year_copy = date("Y");
                        echo $year_copy; ?> - ระบบฐานข้อมูลนักเรียน<br>พัฒนาระบบ โดย ศักดา สุขขวัญ
            </div>
        </div>

        <!-- Modal Dialog -->
        <div class="modal fade" id="deleteStudentModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="deleteStudentModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteStudentModalLabel">ลบข้อมูลนักเรียน</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <b id="delete-id"></b><b id="delete-name"></b> คุณแน่ใจหรือไม่ว่าต้องการลบนักเรียนรายนี้?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-anti" data-dismiss="modal">ยกเลิก</button>
                        <button type="button" class="btn btn-success btn-anti" id="confirm-delete-btn">ลบข้อมูล</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="editStudentModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><b>แก้ไขนักเรียน</b></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">X</span>
                        </button>
                    </div>
                    <form id="edit-student-form">
                        <div class="modal-body">
                            <input type="hidden" id="edit-id">
                            <div class="form-group">
                                <label for="edit-name"><b>ชื่อ - นามสกุล</b></label>
                                <input type="text" class="form-control input-anti input-name" id="edit-name" required autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="edit-age"><b>อายุ</b></label>
                                <input type="text" class="form-control input-anti input-age" id="edit-age" required autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="edit-grade"><b>เกรดเฉลี่ย</b></label>
                                <input type="text" class="form-control input-anti input-grade" id="edit-grade" required autocomplete="off">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger btn-anti" data-dismiss="modal">ยกเลิก</button>
                            <button type="submit" class="btn btn-success btn-anti btn-submit">บันทึกข้อมูล</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade" id="viewStudentModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><b>ดูนักเรียน</b></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">X</span>
                        </button>
                    </div>
                    <form id="view-student-form">
                        <div class="modal-body">
                            <input type="hidden" id="view-id">
                            <div class="form-group">
                                <label for="view-name"><b>ชื่อ - นามสกุล</b></label>
                                <input type="text" class="form-control" id="view-name" required autocomplete="off" disabled>
                            </div>
                            <div class="form-group">
                                <label for="view-age"><b>อายุ</b></label>
                                <input type="text" class="form-control" id="view-age" required autocomplete="off" disabled>
                            </div>
                            <div class="form-group">
                                <label for="view-grade"><b>เกรดเฉลี่ย</b></label>
                                <input type="text" class="form-control" id="view-grade" required autocomplete="off" disabled>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger btn-anti" data-dismiss="modal">ปิด</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>

    <!-- Javascript -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>
    <script src="js/script.js"></script>
</body>

</html>