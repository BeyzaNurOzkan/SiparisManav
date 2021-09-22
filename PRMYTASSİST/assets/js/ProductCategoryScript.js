function getProductGroupforCategory() {
    debugger
    var table = $('#kt_table_getCategoryProductList');
    table.DataTable({
        ajax: {
            url: '/Definition/GetProductGroup/',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {

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
            { data: 'deneme' },
            { data: 'Name' },
            { data: 'Code' },
            { data: 'CreatedDate' },

        ],

        // Order settings
        order: [[1, 'desc']],

        headerCallback: function (thead, data, start, end, display) {
            thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                        <input type="checkbox" onClick="SelectAllCat(this)"value="" class="m-group-checkable">
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
                    var productID = full['ID'];
                    var returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input type="checkbox" name="ProductSelect" value="` + full['ID'] + `" class="m-checkable category">
                                            <span></span>
                                        </label>`;

                    return returnHtml;
                },
            },
            {
                targets: 3,
                title: "Giriş Tarihi",
                render: function (data, type, full, meta) {
                    debugger
                    var id = full['CreatedDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm ');
                    return result;
                },
            },
        ],

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

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
function SelectAllCat(source) {
    debugger
    checkboxes = document.getElementsByName('ProductSelect');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}
function checkedCategoryProduct() {
    debugger
    table = $('#kt_table_getCategoryProductList');
    var groupId = $('#categoryForProductSelect').val();
    var checkboxes = $(".category");
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    debugger
    $.ajax({
        type: 'POST',
        url: '/Definition/ProductToGroup/',
        dataType: "json",
        data: { "productList": checkboxesChecked, "ProductGroup3ID": groupId }
    });
};

$('#categoryForProductSelect').change(function myfunction() {
    debugger
    var id = $('#categoryForProductSelect').val();
    getProductGroupforCategory()
});





function getCategoryForNewOne() {
    debugger
    var table = $('#kt_table_newCategory');
    var t = table.DataTable({
        ajax: {
            url: '/Definition/GetGroup/',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
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
                className: 'dt-center',
                searchable: false,
                orderable: false,
                width: '4%',

            },
            {
                data: 'ProfilePhoto',
                orderable: false,
                className: 'dt-center',

            },
            { data: 'Code' },
            { data: 'Name' },
            {
                data: 'CreateDate',
                className: 'dt-center',
            },
            { data: 'İşlemler' },
        ],
        order: [[2, 'asc']],

        columnDefs: [
            {
                targets: 0,
                render: function (data, type, full, meta) {

                    result = ``;

                    return result;
                }

            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var name3 = "";
                    if (full['Name3'] != null)
                        name3 = full['Name3'];
                    return full['Name'] + `<span style="color:red; font-weight: bold;"> ` + name3 + `</span> `;
                }

            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    var code3 = "";
                   
                   

                    if (full['Code3'] != null) { 
                        code3 = full['Code3'];
                        if (full['Code3'].length == 1)
                            code3 = "0" + full['Code3'];}
                    return full['Code'] + `<span style="color:red; font-weight: bold;">`+ code3 +`</span> `;
                }
               
            },
            {
                targets: 1,
                title: 'Görsel',
                "width": "6%",
                render: function (data, type, full, meta) {
                    var id = full['ProfilePhoto'];
                    var name = full['Name'];

                    var output;
                    if (id != null) {
                        output = `
                                <div style="justify-content: center;" class="kt-user-card-v2">
                                    <div class="kt-user-card-v2__pic">
                                        <img src="` + id + `" class="m-img-rounded kt-marginless" alt="photo">
                                    </div>
                                </div>`;
                    }
                    else {
                        output = `
                                <div style="justify-content: center;" class="kt-user-card-v2">
                                    <div class="kt-user-card-v2__pic">
                                        <img src="./assets/media/resim-yok.jpg " class="m-img-rounded kt-marginless" alt="photo">
                                    </div>
                                </div>`;
                        //var stateNo = KTUtil.getRandomInt(0, 7);
                        //var states = [
                        //    'success',
                        //    'brand',
                        //    'danger',
                        //    'success',
                        //    'warning',
                        //    'dark',
                        //    'primary',
                        //    'info'];
                        //var state = states[stateNo];

                        //output = `
                        //        <div style="justify-content: center;" class="kt-user-card-v2">
                        //            <div class="kt-user-card-v2__pic">
                        //                <div class="kt-badge kt-badge--xl kt-badge--` + state + `"><span>` + name.substring(0, 1) + `</div>
                        //            </div>
                        //        </div>`;
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
                    debugger
                    var result = `<a onclick="EditCategory(` + full['CodeRand'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Düzenle">
                         <i class="la la-edit"></i>
                         </a>

                         <a onclick="DeleteCategory(` + full['CodeRand'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Sil">
                         <i class="la la-trash"></i>
                         </a>
                         `;

                    return result;
                }
            },
            {
                targets: 4,
                title: "Oluşturma Tarihi",
                render: function (data, type, full, meta) {
                    debugger
                    var id = full['CreateDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm ');
                    return result;
                },

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
        var PageInfo = $('#kt_table_newCategory').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};
//var branchId = $('#branch').val();
//  var subTotal = $('#subTotal_' + id).val();
//  var count = $('#count_' + id).val();
//  var productId = id;
//  $.ajax({
//      type: 'POST',
//      url: '/Order/ToBasket?productId=' + id + '&branchId=' + branchId + '&count=' + count + '&subTotal=' + subTotal,
//      dataType: "json"
//  }); 


function EditCategory(CodeRand) {
    debugger
    $.ajax({
        type: "POST",
        url: '/Definition/EditGroup3?CodeRand=' + CodeRand,
        success: function (data) {
            $('#groupModal #groupname').text(data['Name']);
            $('#groupModal #categoryNameOne').text(data['Name'].toLocaleUpperCase());
            $('#groupModal #categoryName2').val(data['Name']);
            $('#groupModal #categoryCodeRand').val(data['CodeRand']);


            $('#groupModal #categoryID').val(data['ID']);
            $('#groupModal #categoryName1').val(data['Name'].toLocaleUpperCase());
            $('#groupModal #categoryCode1').val(data['Code']);
            $('#groupModal').modal();
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};



function DeleteCategory(CodeRand) {

    var table = $('#kt_table_roles');
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
                url: '/Definition/DeleteCategory?CodeRand=' + CodeRand,
                dataType: "json",
                success: function (result) {
                    if (result.value) {
                        debugger
                        table.DataTable().ajax.reload();
                    }
                }
            });
            debugger
        } else if (result.dismiss === 'cancel') {
            swal.fire(
                "İptal!", "Silme İşlemi İptal Edildi!", "error"
            )
        }
    });

};




//    table.on('change', '.kt-group-checkable', function () {
//        var set = $(this).closest('table').find('td:first-child .kt-checkable');
//        var checked = $(this).is(':checked');

//        $(set).each(function () {
//            if (checked) {
//                $(this).prop('checked', true);
//                $(this).closest('tr').addClass('active');
//            }
//            else {
//                $(this).prop('checked', false);
//                $(this).closest('tr').removeClass('active');
//            }
//        });
//    });

//    table.on('change', 'tbody tr .kt-checkbox', function () {
//        $(this).parents('tr').toggleClass('active');
//    });
//};



//function checkedBranchUser() {
//    table = $('#kt_table_braches');
//    var userId = $('#branchForUserSelect').val();
//    var checkboxes = $(".branch");
//    var checkboxesChecked = [];
//    for (var i = 0; i < checkboxes.length; i++) {
//        if (checkboxes[i].checked) {
//            checkboxesChecked.push(checkboxes[i].value);
//        }
//    }

//    $.ajax({
//        type: 'POST',
//        url: '/Definition/Produc',
//        dataType: "json",
//        data: { "branchs": checkboxesChecked, "userId": userId }
//    });
//}

//$('#branchForUserSelect').change(function myfunction() {
//    debugger
//    var id = $('#branchForUserSelect').val();
//    getProductGroup;
//});