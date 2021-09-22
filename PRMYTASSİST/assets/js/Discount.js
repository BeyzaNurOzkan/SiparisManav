function getDiscount() {
    var table = $('#kt_table_discount');
    var t = table.DataTable({
        ajax: {
            url: '/Discount/GetDiscount',
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
                orderable: false,
                className: 'dt-center',

            },
            {
                data: 'DiscountName',
                className: 'font-weight-bold ',
            },
            {
                data: 'DiscountCode',
                orderable: false,
            },
            { data: 'Coefficient' },
            { data: '' },
            {
                data: 'CreatedDate',
                className: 'dt-center',            },
            { data: 'CreatedUser' },
            { data: 'İşlemler' },
        ],
        columnDefs: [
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var returnHtml = `<div style="width:100%;color:red;"><b>` + full['DiscountCode'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 0,
                render: function (data, type, full, meta) {

                    result = ``;

                    return result;
                }

            },
            {
                targets: 1,
                "width": "6%",
                render: function (data, type, full, meta) {
                    var id = "//";
                    var name = full['DiscountName'];

                    var output;
                    if (id != "//") {
                        output = `
                                <div style="justify-content: center;" class="kt-user-card-v1">
                                    <a style="width:100%; cursor:pointer;" onclick="EditDiscount(` + full['ID'] + `)" class="btn" title="" >
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
                                <div style="justify-content: center;" class="kt-user-card-v1">
                                    <div class="kt-user-card-v2__pic">
                                        <a style="cursor:pointer;" onclick="EditDiscount(` + full['ID'] + `)"  class=" pt-0 pb-0 btn btn-hover-` + state + `" title="" >
                                            <div class="kt-badge kt-badge--xl kt-badge--` + state + `"><span>` + name.substring(0, 100) + `</div>
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
                            result = `<a onclick="EditDiscount(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Düzenle">
                         <i class="la la-edit"></i>
                         </a>
                         <a onclick="InShowDiscount(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Durumu Aktifleştir">
                          <i class="la la-eye"></i>
                         </a>
                       
                         <a onclick="DeleteDiscount(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Sil">
                         <i class="la la-trash"></i>
                         </a>
                         `;
                            break;

                        case true:
                            result = `<a onclick="EditDiscount(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Düzenle">
                          <i class="la la-edit"></i>
                         </a>
                        <a onclick="InDontShowDiscount(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Durumu Pasifleştir">
                          <i class="la la-eye-slash"></i>
                         </a>
                        
                         <a onclick="DeleteDiscount(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Sil">
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
                title: 'Format Adı',
                orderable: false,
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = `<a style="width:100%; cursor:pointer; text-align: left; font-size: 12px;" onclick="EditDiscount(` + full['ID'] + `)" class="btn" title="" ><b>` + full['DiscountName'] + `</b></a>`;
                    return result;
                }
            },
            {
                targets: 6,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var id = full['CreatedDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm ');
                    return result;
                },

            },
            {
                targets: 5,
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
        order: [[3, 'asc']],

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_discount').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};

function EditDiscount(id) {
    debugger

    $.ajax({
        type: "POST",
        url: '/Discount/EditDiscount/' + id,
        success: function (data) {
            debugger
            $('#userModal #CreatedUser').text(data['CreatedUser']);
            var CDate = data['CreatedDate'];
            var CDateResult = moment(CDate).format('DD.MM.YYYY - HH:mm ');
            $('#userModal #CreatedDate').text(CDateResult);
            $('#userModal #UpdateUser').text(data['CreatedUser']);
            var LUDate = data['CreatedDate'];
            var LUDateResult = moment(LUDate).format('DD.MM.YYYY - HH:mm ');
            $('#userModal #UpdateDate').text(LUDateResult);
            $('#userModal #userID').val(data['ID']);
            $('#userModal #UserInformation').text(data['FormatName'] + " Güncelle");
            $('#userModal #userID').val(data['ID']);
            $('#userModal #Visible').val(data['Visible']);
            $('#userModal #UserName').val(data['FormatName']);
            $('#userModal #UserLastName').val(data['FormatCode']);
            $('#userModal #Coefficient').val(data['Coefficient']);
            $('#userModal').modal();
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function DeleteDiscount(id) {
    var table = $('#kt_table_discount');
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
                url: '/Discount/DeleteDiscount/' + id,
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

function InShowDiscount(id) {
    var table = $('#kt_table_discount');
    $.ajax({
        type: "POST",
        url: '/Discount/InShow/' + id,
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
function InDontShowDiscount(id) {
    var table = $('#kt_table_discount');
    $.ajax({
        type: "POST",
        url: '/Discount/InDontShow/' + id,
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

function getBranchesToFormat(id) {

    var table = $('#kt_table_brachestoFormat');
    table.DataTable({
        ajax: {
            url: '/Branch/GetFormatBranch?id=' + id/* + '&StartDate=' + StartDate + '&EndDate=' + EndDate*/,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {
            },
        },
        "searching": true,
        "paging": false,
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left align-self-center'<"mustafa">><'col-sm-9 text-left'f>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        buttons: [
        ],
        columns: [
            {
                data: 'deneme',
                searchable: false,
            },
            {
                data: 'BranchName'
            },
        ],
        // Order settings
        order: [[1, 'asc']],

        headerCallback: function (thead, data, start, end, display) {
            thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                        <input onClick="SelectAll(this)" type="checkbox" value="" class="m-group-checkable">
                        <span></span>
                    </label>`;
        },

        columnDefs: [
            {
                targets: 0,
                width: '10px',
                className: 'dt-right',
                orderable: false,
                render: function (data, type, full, meta) {
                    var returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                    return returnHtml;
                },
            },
            {
                targets: 1,
                className: 'pl-3',
                orderable: false,
                render: function (data, type, full, meta) {
                    var name = full['BranchName'];
                    return name;
                },
            }
        ],

        responsive: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true
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
    $('div.mustafa').append(`
                    <div class="row">
                        <div class="col-lg-12 pr-0 mr-0" style=" text-align: left; ">
                           <h4 class="pl-2"> Şubeler</h4>
                        </div>
                    </div>`
    );
};

function getProductForDiscount() {
    var table = $('#kt_table_productDiscount');
    table.DataTable({
        ajax: {
            url: '/Discount/GetProductForDiscount',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {
            },
        },
        "searching": true,
        "paging": false,
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-1 text-left align-self-center'<"mustafa1">><'col-sm-5 text-left'f>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        buttons: [
        ],
        columns: [
            {
                data: 'deneme',
                searchable: false,
            },
            {
                data: 'Barcode'
            },
            {
                data: 'Name'
            },
            {
                data: 'Code',
                searchable: false,
            },
            {
                className: 'pl-3',
                data: 'ProductGroupUrl'
            }
        ],
        // Order settings
        order: [[2, 'asc']],

        headerCallback: function (thead, data, start, end, display) {
            thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                        <input onClick="SelectAll2(this)" type="checkbox" value="" class="m-group-checkable">
                        <span></span>
                    </label>`;
        },

        columnDefs: [
            {
                targets: 0,
                width: '10px',
                className: 'dt-right',
                orderable: false,
                render: function (data, type, full, meta) {
                    var returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input  name="SelectBranch2" type="checkbox" value="` + full['ID'] + `" class="m-checkable product">
                                            <span></span>
                                        </label>`;
                    return returnHtml;
                },
            },
            {
                targets: 2,
                className: 'pl-3',
                orderable: false,
                render: function (data, type, full, meta) {
                    var name = full['Name'];
                    return name;
                },
            }
        ],

        responsive: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true
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
    $('div.mustafa1').append(`
                    <div class="row">
                        <div class="col-lg-12 pr-0 mr-0" style=" text-align: left; ">
                           <h4 class="pl-2"> Ürünler</h4>
                        </div>
                    </div>`
    );
};

$('#branchForFormatSelect').change(function myfunction() {
    var id = $('#branchForFormatSelect').val();
    getBranchesToFormat(id);
});

function BranchProductDiscount() {
    var discountID = $('#branchDiscountSelect').val();
    var startDate = $('#StartDate').val();
    var endDate = $('#EndDate').val();

    var checkboxes = $(".branch");
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }

    var checkboxesq = $(".product");
    var checkboxesCheckedq = [];
    for (var i = 0; i < checkboxesq.length; i++) {
        if (checkboxesq[i].checked) {
            checkboxesCheckedq.push(checkboxesq[i].value);
        }
    }
    debugger
    $.ajax({
        type: 'POST',
        url: '/Discount/DiscountToBranch',
        dataType: "json",
        data: { "branchs": checkboxesChecked, "product": checkboxesCheckedq, "discountID": discountID, "startDate": startDate, "endDate": endDate },
        success: function (data) {
            swal.fire({
                text: data,
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
}
