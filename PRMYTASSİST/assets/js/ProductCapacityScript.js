function getCapacityProducts(groupId, branchFormatID) {
    debugger
    var table = $("#table1_");
    var t = table.DataTable({
        "bDestroy": true,
        ajax: {
            url: '/Capacity/getCapacity?groupId=' + groupId + '&branchFormatID=' + branchFormatID,
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        },
        "pageLength": 300,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `
            <'row'<'col-sm-3 text-left'f><'col-sm-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>
            `,
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
            responsive: true

        }],
        initComplete: function () {
            this.api().columns([1]).every(function () {
                var column = this;
                $(column.header()).empty();
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Ürün Grubu</option></select>')
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
                className: 'dt-center',
                searchable: false,
                orderable: false,
                width: '6%',

            },
            {
                data: 'ProductGroup',
                width: '14%',
                orderable: false,
                className: 'text-info',

            },
            {
                data: 'Code',
                className: 'dt-center font-weight-bold ',
                orderable: false,
                width: '10%',
            },

            {
                data: 'Name',
                width: '25%',
            },
            {
                data: 'Capacity',
                width: '10%',
                orderable: false,

            },
            {
                data: 'ProductUnitName',
                width: '10%',
                orderable: false,
                className: 'dt-center',

            },
            {
                data: 'OrderCount',
                width: '10%',
                className: 'dt-center',
                orderable: false,

            },

        ],
        order: [[3, 'asc']],

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
                width: '40%',
                className: '',

                render: function (data, type, full, meta) {
                    var id = full['Name'];
                    result = `<span style="color:red;"><b>` + id + `</b></span>`;

                    return result;
                }
            },
            {
                targets: 4,
                width: '8%',
                className: '',
                className: 'dt-center',

                render: function (data, type, full, meta) {
                    var returnHtml = `
                            <div class="row" style="justify-content: center;">                     
                            <input id = "min_` + full["ID"] + `" style="    background-color:#c8e3ff;width:85%;text-align: center;border: 0px;font-size: 11px;color: blue; font-weight: bold; height: 20px;" type="text" class="form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + full['Capacity'] + `" name="demo0" placeholder="" oninput="UpdateRecord(` + full["ID"] + `,` + groupId + `)">
                            </div>`;
                    return returnHtml;
                },
            },
            //{
            //    targets: 8,
            //    className: '',
            //    className: 'dt-center',

            //    render: function (data, type, full, meta) {
            //        var name = full['Details'];

            //        var output;
            //        if (name != null) {
            //            output = `
            //                    <div class="row" style="justify-content: center;">
            //                <input id = "detail_` + full["ID"] + `" style="background-color: transparent;width: 96%;border: 0px;font-size: 11px; height: 20px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + name + `" name="demo0" placeholder="" onfocusout="UpdateRecord(` + full["ID"] + `,` + groupId + `)">
            //                </div>`;
            //        }
            //        else {
            //            output = `
            //                    <div class="row" style="justify-content: center;">
            //                <input id = "detail_` + full["ID"] + `" style="background-color: transparent;width:96%;border: 0px;font-size: 11px; height: 20px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="" name="demo0" placeholder="" onfocusout="UpdateRecord(` + full["ID"] + `,` + groupId + `)">
            //                </div>`;
            //        }
            //        return output;
            //    },
            //},

        ],
        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,
    });
    t.on('draw.dt', function () {
        var PageInfo = $('#table1_').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};
function UpdateRecord(id) {
    debugger;
    var branchFormat = $("#branchFormat").val();
    var table = $("#table1_");
    var capacity = $("#min_" + id).val();
    //var detailVal = $("#detail_" + id).val();
    $.ajax({
        type: 'POST',
        url: '/Capacity/ForSave',
        dataType: "json",
        data: { "capacity": capacity, "id": id/*, "maxVal": maxVal, "detailVal": detailVal*/ },
        success: function (data) {
            if (data) {
                table.DataTable().ajax.reload();
            }
        }
    });
};
function getCategoryForOrder1(id) {
    debugger
    var table = $('#kt_table_braches');
    table.DataTable({
        ajax: {
            url: '/Branch/GetUserBranch?id=' + id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {

            },
        },
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
        columns: [
            { data: 'deneme' },
            { data: 'BranchName' },
            { data: 'BranchCode' },
            { data: 'BranchCreatedDate' },

        ],

        // Order settings

        headerCallback: function (thead, data, start, end, display) {
            thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                        <input type="checkbox" value="" class="m-group-checkable">
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
                    var branchId = full['ID'];
                    var returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                                            <input type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                    debugger
                    for (let user of full['User']) {
                        for (let branch of user['Branches']) {
                            debugger
                            if (branch['BranchId'] == branchId) {
                                returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                                            <input checked type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                                break;
                            }
                            else {
                                returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                                            <input type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                            }
                        }
                        break;
                    }
                    return returnHtml;
                },
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var id = full['BranchCreatedDate'];
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

$('#categoryForOrder1').change(function () {
    var id = this.value;
    fillPanelTab(id);
});

$('#branchFormat').change(function az() {
    debugger
    var id = this.value;
    var id2 = $('#categoryForOrder1').val();
    getCapacityProducts(id2, id);
});

function fillPanelTab(id) {
    debugger
    $('#tablistdiv #tablistul li').remove();
    var liList = "";
    var a;
    $.ajax({
        type: 'POST',
        url: '/Definition/GetProductGroup2ByProductGroup1Id/' + id,

        dataType: "json",
        success: function (data) {
            for (let prop of data['data']) {
                if (liList[0]) {
                    a = prop["Name"];
                    liList += `<li class="nav-item">
                               <a class="nav-link " style="min-width: 100px; text-align: center;" id="profile-tab" data-toggle="tab" href="#`+ prop["Name"] + `" role="tab" aria-controls="profile" aria-selected="false">` + a.toLocaleUpperCase() + `</a>
                           </li>`;
                }
                else {
                    a = prop["Name"];
                    liList += `<li class="nav-item">
                               <a class="nav-link active" style="min-width: 100px; text-align: center;" id="profile-tab" data-toggle="tab" href="#`+ prop["Name"] + `" role="tab" aria-controls="profile" aria-selected="false">` + a.toLocaleUpperCase() + `</a>
                           </li>`;
                }

            }
            /* liList += `<li class="nav-item">
                            <a class="nav-link" style="min-width: 100px; text-align: center;" id="profile-tab" data-toggle="tab" href="#OrderBrief" role="tab" aria-controls="profile" aria-selected="false">Sipariş Özet</a>
                        </li>`;*/
            $('#tablistdiv #tablistul').append(liList);
        }
    });
};


function ReloadCapacity() {
    debugger;
    var id = $('#branchFormat').val();
    var id2 = $('#categoryForOrder1').val();
    getCapacityProducts(id2, id);
};

$(document).ready(function () {
    $('#example').DataTable();
});

//function ProductCapacityListViewSave() {
//    debugger
//    var table = $('#table1_');
//    $.ajax({
//        type: "POST",
//        url: '/Center/ProductCapacityListViewSave',
//        success: function (data) {
//            swal.fire({
//                title: "Başarılı!",
//                text: "Kaydetme  işlemi gerçekleştirildi!",
//                type: "success",
//                buttonsStyling: false,
//                confirmButtonClass: "btn btn-brand"
//            }).then(function (result) {
//                if (result.value) {
//                    table.DataTable().ajax.reload();
//                }
//            });
//        },
//        error: function (request, status, error) {
//            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
//        }
//    });
//};