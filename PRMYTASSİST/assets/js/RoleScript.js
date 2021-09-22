function getRoles() {
    var table = $('#kt_table_roles');
    var t = table.DataTable({
        ajax: {
            url: '/Role/GetRoles/',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {
                pagination: {
                    perpage: 50,
                },
            },
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left'f><'col-sm-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

        buttons: [{
            extend: 'collection',
            text: '<i class="flaticon2-gear" style= "font-size:16px; "></i>',
            className: 'btn btn-outline-info dropleft-inline  pt-2 mt-0 pb-2 mb-0',
            buttons: [
                'excel',
                'print',
                'csv',
                'pdf',
                'copy',
                'colvis',
            ],
        }],
        columns: [
            {
                data: 'SN',
                searchable: false,
                orderable: false,
                width: '4%',
                className: 'dt-center',
            },
            {
                data: 'Name',
            },
            {
                data: 'CreateDate',
                className: 'dt-center',
            },
            { data: 'Visible' },
            { data: 'İşlemler' },
        ],
        order: [[1, 'asc']],

        columnDefs: [
            {
                targets: 0,
                render: function (data, type, full, meta) {

                    result = ``;

                    return result;
                }

            },
            {
                targets: -1,
                title: 'İşlemler',
                orderable: false,
                "width": "14%",
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = "";
                    switch (full['Visible']) {
                        case true:
                            result = `<a onclick="EditRoles(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Düzenle">
                         <i class="la la-edit"></i>
                         </a>
                 
                         <a onclick="InDontShowRoles(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Durumu Pasifleştir">
                          <i class="la la-eye-slash"></i>
                         </a>
                         <a onclick="DeleteRoles(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Sil">
                         <i class="la la-trash"></i>
                         </a>
                         `;
                            break;

                        case false:
                            result = `<a onclick="EditRoles(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Düzenle">
                          <i class="la la-edit"></i>
                         </a>
                         <a onclick="InShowRoles(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="VDurumu Aktifleştir">
                          <i class="la la-eye"></i>
                         </a>
                         <a onclick="DeleteRoles(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Sil">
                         <i class="la la-trash"></i>
                         </a>
                         `;
                            break;
                    }
                    return result;
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    var id = full['CreateDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm ');
                    return result;
                },

            },
            {
                targets: 1,
                title: 'Görev Adı',
                orderable: false,
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = `<a style="width:100%; text-align: left; font-size: 12px; color:blue;" onclick="EditRoles(` + full['ID'] + `)" class="btn pt-1 pb-1" title="" ><b>` + full['Name'] + `</b></a>`;
                    return result;
                }
            },
            {
                targets: 3,
                title: 'Durum',
                orderable: false,
                "width": "14%",
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = "";
                    switch (full['Visible']) {
                        case true:
                            result = `Aktif`;
                            break;

                        case false:
                            result = `Pasif`;
                            break;
                    }
                    return result;
                }
            },
        ],

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,


    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_roles').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};


function EditRoles(id) {
    debugger
    $.ajax({
        type: "POST",
        url: '/Role/EditRoles/' + id,
        success: function (data) {
            $('#rolesModal #RoleName').val(data['Name']);
            $('#rolesModal #RoleID').val(data['ID']);
            $('#rolesModal').modal();
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function DeleteRoles(id) {
    var table = $('#kt_table_roles');
    $.ajax({
        type: "POST",
        url: '/Role/DeleteRoles/' + id,
        success: function (data) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                }
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function InShowRoles(id) {
    var table = $('#kt_table_roles');
    $.ajax({
        type: "POST",
        url: '/Role/InShowRoles/' + id,
        success: function (data) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                }
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function InDontShowRoles(id) {
    var table = $('#kt_table_roles');
    $.ajax({
        type: "POST",
        url: '/Role/InDontShowRoles/' + id,
        success: function (data) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                }
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

////function InShowComment(id) {
////    var table = $('#kt_table_comments');
////    $.ajax({
////        type: "POST",
////        url: '/User/InShowComment/' + id,
////        success: function (data) {
////            swal.fire({
////                title: "Başarılı!",
////                text: data,
////                type: "success",
////                buttonsStyling: false,
////                confirmButtonText: "Tamam!",
////                confirmButtonClass: "btn btn-brand"
////            }).then(function (result) {
////                if (result.value) {
////                    table.DataTable().ajax.reload();
////                }
////            });
////        },
////        error: function (request, status, error) {
////            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
////        }
////    });
////};
////function InDontShowComment(id) {
////    var table = $('#kt_table_comments');
////    $.ajax({
////        type: "POST",
////        url: '/User/InDontShowComment/' + id,
////        success: function (data) {
////            swal.fire({
////                title: "Başarılı!",
////                text: data,
////                type: "success",
////                buttonsStyling: false,
////                confirmButtonText: "Tamam!",
////                confirmButtonClass: "btn btn-brand"
////            }).then(function (result) {
////                if (result.value) {
////                    table.DataTable().ajax.reload();
////                }
////            });
////        },
////        error: function (request, status, error) {
////            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
////        }
////    });
////};

////function Confirm(id) {
////    var table = $('#kt_table_users');
////    $.ajax({
////        type: "POST",
////        url: '/User/Confirm/' + id,
////        success: function (data) {
////            swal.fire({
////                title: "Başarılı!",
////                text: data,
////                type: "success",
////                buttonsStyling: false,
////                confirmButtonText: "Tamam!",
////                confirmButtonClass: "btn btn-brand"
////            }).then(function (result) {
////                if (result.value) {
////                    table.DataTable().ajax.reload();
////                }
////            });
////        },
////        error: function (request, status, error) {
////            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
////        }
////    });
////};
////function Cancel(id) {
////    var table = $('#kt_table_users');
////    $.ajax({
////        type: "POST",
////        url: '/User/Cancel/' + id,
////        success: function (data) {
////            swal.fire({
////                title: "Başarılı!",
////                text: data,
////                type: "success",
////                buttonsStyling: false,
////                confirmButtonText: "Tamam!",
////                confirmButtonClass: "btn btn-brand"
////            }).then(function (result) {
////                if (result.value) {
////                    table.DataTable().ajax.reload();
////                }
////            });
////        },
////        error: function (request, status, error) {
////            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
////        }
////    });
////}













//// Mustafa Scriptleri Bazıları Kullanılacak..

//function getEditRegister(id) {
//    $.ajax({
//        type: "POST",
//        url: '/Register/GetRegisterById/' + id,
//        success: function (data) {
//            $('#editRegisterModal #ID').val(data['ID']);
//            $('#editRegisterModal #FirstName').val(data['FirstName']);
//            $('#editRegisterModal #LastName').val(data['LastName']);
//            $('#editRegisterModal #Gender').val(data['Gender']);
//            $('#editRegisterModal #EMail').val(data['EMail']);
//            $('#editRegisterModal #PhoneNumber').val(data['PhoneNumber']);
//            $('#editRegisterModal #School').val(data['School']);
//            $('#editRegisterModal #Grade').val(data['Grade']);
//            $('#editRegisterModal #ParentFirstName').val(data['ParentFirstName']);
//            $('#editRegisterModal #ParentLastName').val(data['ParentLastName']);
//            $('#editRegisterModal #Relationship').val(data['Relationship']);
//            $('#editRegisterModal #ParentEMail').val(data['ParentEMail']);
//            $('#editRegisterModal #ParentPhoneNumber').val(data['ParentPhoneNumber']);
//            $('#editRegisterModal #ParentNote').val(data['ParentNote']);
//            $('#editRegisterModal #Interview').val(data['Interview']);
//            $('#editRegisterModal').modal();
//        },
//        error: function (request, status, error) {
//            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
//        }
//    });
//}

//function toClassroom(id) {
//    $.ajax({
//        type: "POST",
//        url: '/Register/GetRegisterById/' + id,
//        success: function (data) {
//            debugger
//            $('#toClassroomModal #registerID').val(data['ID']);
//            $('#toClassroomModal').modal();
//        },
//        error: function (request, status, error) {
//            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
//        }
//    });
//}

//$('#insertRegisterForm').submit(function myfunction() {
//    var table = $('#kt_table_register');
//    event.preventDefault();
//    var form = $(this);
//    $.ajax({
//        type: "POST",
//        url: '/Register/InsertRegister',
//        data: form.serialize(),
//        success: function (data) {
//            swal.fire({
//                title: "Başarılı!",
//                text: "Kayıt eklendi!",
//                type: "success",
//                buttonsStyling: false,
//                confirmButtonText: "Tamam!",
//                confirmButtonClass: "btn btn-brand"
//            }).then(function (result) {
//                if (result.value) {
//                    table.DataTable().ajax.reload();
//                    $('#insertRegisterModal').modal('toggle');
//                }
//            });
//        },
//        error: function (request, status, error) {
//            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
//        }
//    });
//});

//$('#editRegisterForm').submit(function myfunction() {
//    var table = $('#kt_table_register');
//    event.preventDefault();
//    var form = $(this);
//    $.ajax({
//        type: "POST",
//        url: '/Register/EditRegister',
//        data: form.serialize(),
//        success: function (data) {
//            swal.fire({
//                title: "Başarılı!",
//                text: "Kayıt düzenlendi!",
//                type: "success",
//                buttonsStyling: false,
//                confirmButtonText: "Tamam!",
//                confirmButtonClass: "btn btn-brand"
//            }).then(function (result) {
//                if (result.value) {
//                    table.DataTable().ajax.reload();
//                    $('#editRegisterModal').modal('toggle');
//                }
//            });
//        },
//        error: function (request, status, error) {
//            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
//        }
//    });
//});

//function showInterviews(id) {
//    $('.kt-list-timeline__item').remove();
//    $('#registerFullName h5').remove();
//    var notes = "";
//    $.ajax({
//        type: "POST",
//        url: '/Register/GetInterviewsByRegisterId/' + id,
//        success: function (data) {
//            $('#interviewResultForm #RegisterId').val(data['RegisterId']);
//            $('#interviewForm #RegisterId').val(data['RegisterId']);
//            $('#registerFullName').append('<h5 class="modal-title">' + data['RegisterFullName'] + '<small> | Görüşme Geçmişi</small></h5>');
//            for (let prop of data['notes']) {
//                var dateStr = new Date(parseInt(prop['CreatedDate'].substr(6)));
//                var mounth = dateStr.getMonth() + 1;
//                dateStr = dateStr.getDate() + '.' + mounth + '.' + dateStr.getFullYear();
//                notes += '<div class="kt-list-timeline__item"><span class="kt-list-timeline__badge"></span><span class="kt-list-timeline__text">' + prop['Text'] + '</span><span class="kt-list-timeline__time">' + prop['User'] + '</span><span class="kt-list-timeline__time">' + dateStr + '</span><span class="kt-list-timeline__time"><a onclick="deleteNote(' + prop["ID"] + ')"><i class="la la-remove"></i></a></span></div>';
//            }
//            $('#notes').append(notes);
//            $('#interviewHistoryModal').modal();
//        },
//        error: function (request, status, error) {
//            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
//        }
//    });
//}

//$('#interviewForm').submit(function myfunction() {
//    var table = $('#kt_table_register');
//    event.preventDefault();
//    var form = $(this);
//    $.ajax({
//        type: "POST",
//        url: '/Register/InsertRegisterNote',
//        data: form.serialize(),
//        success: function (data) {
//            showInterviews(data);
//            table.DataTable().ajax.reload();
//        },
//        error: function (request, status, error) {
//            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
//        }
//    });
//    $('#Note').val("");
//});

//$('#toClassroomForm').submit(function myfunction() {
//    var table = $('#kt_table_register');
//    event.preventDefault();
//    var form = $(this);
//    $.ajax({
//        type: "POST",
//        url: '/Register/ToClassroom',
//        data: form.serialize(),
//        success: function (data) {
//            swal.fire(
//                'Başarılı!',
//                'Başvuru sözleşmesi oluşturuldu, kaydı öğrenciler tablosundan görüntüleyebilirsiniz.',
//                'success'
//            ).then(function (result) {
//                table.DataTable().ajax.reload();
//                $('#toClassroomModal').modal('toggle');
//            });
//        },
//        error: function (request, status, error) {
//            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
//        }
//    });
//});

//$('#interviewResultForm').submit(function myfunction() {
//    var table = $('#kt_table_register');
//    event.preventDefault();
//    var form = $(this);
//    $.ajax({
//        type: "POST",
//        url: '/Register/UpdateInterviewByRegisterId',
//        data: form.serialize(),
//        success: function (data) {
//            swal.fire(
//                'Güncellendi!',
//                'Kayıt başarı ile düncellendi!',
//                'success'
//            ).then(function (result) {
//                table.DataTable().ajax.reload();
//                $('#interviewHistoryModal').modal("toggle");
//            });
//        },
//        error: function (request, status, error) {
//            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
//        }
//    });
//    $('#Note').val("");
//});

//$(".interviewCheck").change(function () {
//    var checkboxes = $(".interviewCheck");
//    var checkboxesChecked = [];
//    for (var i = 0; i < checkboxes.length; i++) {
//        if (checkboxes[i].checked) {
//            checkboxesChecked.push(checkboxes[i].value);
//        }
//    }
//    var table = $('#kt_table_register');
//    table.DataTable().destroy();
//    table.DataTable({
//        ajax: {
//            type: "POST",
//            url: '/Register/FilterData',
//            data: { "interviews": checkboxesChecked },
//            dataType: "json",
//        },
//        columns: [
//            { data: 'FullName' },
//            {
//                data: 'Grade',
//                "render": function (data, type, full, meta) {
//                    debugger
//                    var result = "";
//                    switch (full['Grade']) {
//                        case 14:
//                            result = '4 Yaş';
//                            break;
//                        case 15:
//                            result = '5 Yaş';
//                            break;
//                        case 16:
//                            result = '6 Yaş';
//                            break;
//                        case null:
//                            result = 'Belirtilmemiş';
//                            break;
//                        case "":
//                            result = 'Belirtilmemiş';
//                            break;
//                        default:
//                            result = full['Grade'];
//                    }
//                    return result;
//                }
//            },
//            { data: 'ParentFullName' },
//            { data: 'ParentPhoneNumber' },
//            { data: 'ParentNote' },
//            { data: 'RegisterNotes' },
//            { data: 'Interview' },
//            {
//                data: 'CreatedDate',
//                "type": "date",
//                "render": function parseJsonDate(jsonDate) {
//                    var fullDate = new Date(parseInt(jsonDate.substr(6)));
//                    var twoDigitMonth = (fullDate.getMonth() + 1) + ""; if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;
//                    var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
//                    var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + twoDigitDate;
//                    return currentDate;
//                }
//            },
//            { data: 'Duzenle', responsivePriority: -1 }
//        ],
//        columnDefs: [
//            {
//                targets: -1,
//                title: 'İşlemler',
//                orderable: false,
//                "width": "14%",
//                render: function (data, type, full, meta) {
//                    var id = full['ID'];
//                    return `
//                        <a onclick="getEditRegister(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Düzenle">
//                          <i class="la la-edit"></i>
//                        </a>
//                        <a onclick="deleteData(` + full['ID'] + `,'/Register/DeleteRegister/')" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Sil">
//                          <i class="la la-trash"></i>
//                        </a>
//                        <a onclick="showInterviews(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Görüşme Geçmişi">
//                          <i class="la la-history"></i>
//                        </a>
//                        <a onclick="toClassroom(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Sınıfa Ata">
//                          <i class="la la-mail-forward"></i>
//                        </a>`;
//                }
//            },
//            {
//                targets: 6,
//                title: 'Görüşme Sonucu',
//                render: function (data, type, full, meta) {
//                    debugger
//                    var result = "";
//                    switch (full['Interview']) {
//                        case "Yapılmadı":
//                            result = '<span style="width: 131px;"><span class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill">' + full['Interview'] + '</span></span>';
//                            break;
//                        case "Olumsuz":
//                            result = '<span style="width: 131px;"><span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill">' + full['Interview'] + '</span></span>';
//                            break;
//                        case "Daha Sonra Düşünüyor":
//                            result = '<span style="width: 131px;"><span class="kt-badge  kt-badge--warning kt-badge--inline kt-badge--pill">' + full['Interview'] + '</span></span>';
//                            break;
//                        case "Kayıt Olacak":
//                            result = '<span style="width: 131px;"><span class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill">' + full['Interview'] + '</span></span>';
//                            break;
//                        case "Dönüş Bekleniyor":
//                            result = '<span style="width: 131px;"><span class="kt-badge  kt-badge--warning kt-badge--inline kt-badge--pill">' + full['Interview'] + '</span></span>';
//                            break;
//                        default:
//                            result = '<span style="width: 131px;"><span class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill">' + full['Interview'] + '</span></span>';
//                    }
//                    return result;
//                }
//            },
//            { "width": "9%", "targets": 3 },
//            { "width": "15%", "targets": 4 },
//            { "width": "15%", "targets": 5 },
//            { "width": "12%", "targets": 6 },
//            { "width": "6%", "targets": 7 }
//        ],
//        "order": [[7, "desc"]],
//        dom: 'Bfrtip',
//        buttons: [
//            'copy', 'csv', 'excel', 'pdf', 'print'
//        ],
//        "language": {
//            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
//        },
//        "search": {
//            "caseInsensitive": false
//        },
//        responsive: true,
//        orderCellsTop: true,
//        fixedHeader: true,
//        "destroy": true
//    });
//});

//function TriggerCopyButton() {
//    $(".buttons-copy").trigger("click");
//}

//function TriggerExcelButton() {
//    $(".buttons-excel").trigger("click");
//}

//function TriggerCsvButton() {
//    $(".buttons-csv").trigger("click");
//}

//function TriggerPdfButton() {
//    $(".buttons-pdf").trigger("click");
//}

//function TriggerPrintButton() {
//    $(".buttons-print").trigger("click");
//}