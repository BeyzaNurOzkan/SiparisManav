function getUsers() {
    var table = $('#kt_table_users');
    var t = table.DataTable({
        ajax: {
            url: '/User/GetUsers/',
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
        initComplete: function () {
            this.api().columns([4]).every(function () {
                var column = this;
                $(column.header()).empty();
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Şube Adı</option></select>')
                    .appendTo($(column.header()))
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {

                    select.append('<option value="' + d + '">' + d + '</option>')

                });
            });
            this.api().columns([5]).every(function () {
                var column = this;
                $(column.header()).empty();
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Görevi</option></select>')
                    .appendTo($(column.header()))
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {

                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        },

        columns: [
            {
                data: 'SN',
                searchable: false,
                orderable: false,
                width: '4%',
                className: 'dt-center',
            },
            {
                data: 'ProfilePhoto',
                orderable: false,
                className: 'dt-center',

            },
            {
                data: 'FullName',
                className: 'font-weight-bold ',
            },
            {
                data: 'Email',
                className: 'font-weight-bold ',
            },
            {
                data: 'BranchName',
                className: 'font-weight-bold text-danger',
                orderable: false,
            },
            {
                data: 'UserRole',
                orderable: false,
                className: 'font-weight-bold text-info',

            },
            { data: 'Visible' },
            { data: 'İşlemler' },
        ],
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, full, meta) {

                    result = ``;

                    return result;
                }

            },
            {
                targets: 1,
                title: 'Görsel',
                "width": "6%",
                render: function (data, type, full, meta) {
                    var id = full['ProfilePhoto'];
                    var name = full['FullName'];

                    var output;
                    if (id != "//") {
                        output = `
                                <div style="justify-content: center;" class="kt-user-card-v2">
                                    <a style="width:100%; cursor:pointer;" onclick="EditUser(` + full['ID'] + `)" class="btn" title="" >
                                        <div class="kt-user-card-v2__pic">
                                            <img src="` + id + `" class="m-img-rounded kt-marginless" alt="photo">
                                        </div>
                                    </a>
                                </div>`;
                    }
                    else {
                        var stateNo = KTUtil.getRandomInt(0, 7);
                        var states = [
                            'success',
                            'brand',
                            'danger',
                            'success',
                            'warning',
                            'dark',
                            'primary',
                            'info'];
                        var state = states[stateNo];

                        output = `
                                <div style="justify-content: center;" class="kt-user-card-v2">
                                    <div class="kt-user-card-v2__pic">
                                        <a style="cursor:pointer;" onclick="EditUser(` + full['ID'] + `)"  class=" pt-0 pb-0 btn btn-hover-` + state + `" title="" >
                                            <div class="kt-badge kt-badge--xl kt-badge--` + state + `"><span>` + name.substring(0, 1) + `</div>
                                        </a>
                                    </div>
                                </div>`;
                    }

                    return output;
                },
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
                        case false:
                            result = `<a onclick="EditUser(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Düzenle">
                         <i class="la la-edit"></i>
                         </a>
                         <a onclick="InShow(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Durumu Aktifleştir">
                          <i class="la la-eye"></i>
                         </a>
                       
                         <a onclick="DeleteUsers(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Sil">
                         <i class="la la-trash"></i>
                         </a>
                         `;
                            break;

                        case true:
                            result = `<a onclick="EditUser(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Düzenle">
                          <i class="la la-edit"></i>
                         </a>
                         <a onclick="DeleteUsers(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Sil">
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
                title: 'Adı Soyadı',
                orderable: false,
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = `<a style="width:100%; cursor:pointer; text-align: left; font-size: 12px;" onclick="EditUser(` + full['ID'] + `)" class="btn" title="" ><b>` + full['FullName'] + `</b></a>`;
                    return result;
                }
            },
            {
                targets: 3,
                title: 'Kullanıcı Adı',
                orderable: false,
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = `<a style="color:green; width:100%; cursor:pointer; text-align: left; font-size: 12px;" onclick="EditUser(` + full['ID'] + `)" class="btn" title="" ><b>` + full['EMail'] + `</b></a>`;
                    return result;
                }
            },
            {
                targets: 6,
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
        order: [[2, 'asc']],

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,


    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_users').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};
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
function EditUser(id) {
    debugger
    $.ajax({
        type: "POST",
        url: '/User/EditUser/' + id,
        success: function (data) {
            debugger
            $('#userModal #CreatedUser').text(data['CreateUser']);
            $('#userModal #CreatedDate').text(data['CreateDate']);
            $('#userModal #UpdateUser').text(data['LastUpdateUser']);
            $('#userModal #UpdateDate').text(data['LastUpdateDate']);
            $('#userModal #EMail').val(data['EMail']);
            $('#userModal #UserInformation').text(data['Name'] + ' ' + data['LastName']);

            $('#userModal #userID').val(data['ID']);
            $('#userModal #Visible').val(data['Visible']);
            $('#userModal #UserName').val(data['Name']);
            $('#userModal #UserLastName').val(data['LastName']);
            $('#userModal #UserCountName').val(data['UserCountName']);
            $('#userModal #UserPassword').val(data['Password']);
            $('#userModal #userForBranchSelect #userForBranchSelectOptions').text(data['Branches']);
            $('#userModal #userForBranchSelect #userForBranchSelectOptions').val(data['CurrentBranch']);

            $('#userModal #userForRoleSelect #userForCategorySelectOptions').text(data['UserRole']);
            $('#userModal #userForRoleSelect #userForCategorySelectOptions').val(data['RoleID']);
            userForCategorySelectOptions
            getBranches1(id);
            $('#userModal').modal();
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function getBranches1(id) {
    debugger
    var table = $('#kt_table_braches1');
    var t = table.DataTable({
        ajax: {
            url: '/Branch/GetUserBranch1/' + id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",

        },
        "pageLength": 50,

        columns: [
            {
                data: 'SN',
                className: 'dt-center',
                searchable: false,
                orderable: false,
            },
            {
                data: 'BranchName',
                className: 'font-weight-bold',
            },
            { data: 'BranchCreatedDate' },
            {
                data: 'Durum',
                className: 'dt-center',
            },

        ],
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
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
        columnDefs: [
            {
                targets: 0,


                render: function (data, type, full, meta) {

                    result = ``;

                    return result;
                }

            },
            {
                targets: 2,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var id = full['BranchCreatedDate'];
                    var result = moment(id).format('DD.MM.YYYY');
                    return result;
                },

            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    var returnHtml = `<div  style="width:100%"><b style="color:red; width:250px;"> ` + full['BranchName'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: -1,
                title: 'Durum',
                //"language": {
                //    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
                //},
                orderable: false,
                "width": "5%",
                render: function (data, type, full, meta) {

                    return `
                        <a onclick="CancelBranchUser(` + full['ID'] + `,` + id + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Şubeden Çıkar">
                          <i class="la la-close"></i>
                        </a>`;
                }
            }
        ],
        responsive: true,

        // Order settings
        order: [[1, 'desc']],

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_braches1').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    table.on('change', '.kt-group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .kt-checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $(this).prop('checked', true);
                $(this).closest('tr').addClass('active');
            }
            else {
                $(this).prop('checked', false);
                $(this).closest('tr').removeClass('active');
            }
        });
    });

    table.on('change', 'tbody tr .kt-checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
};
function InDontShow(id) {
    var table = $('#kt_table_branchFormat');
    $.ajax({
        type: "POST",
        url: '/Branch/InDontShow/' + id,
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
function DeleteUsers(id) {
    var table = $('#kt_table_users');
    swal.fire({
        title: 'Silmek istediğinizden emin misiniz?',
        text: "Bu İşlem Geri Alınamaz!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, Sil!',
        cancelButtonText: 'Hayır, İptal Et!',
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            debugger
            $.ajax({
                type: "POST",
                url: '/User/DeleteUser/' + id,
                success: function (data) {
                    table.DataTable().ajax.reload();
                },
            });
            debugger
        } else if (result.dismiss === 'cancel') {
            swal.fire(
                "İptal!", "Silme İşlemi İptal Edildi!", "error"
            )
        }
    });
};
