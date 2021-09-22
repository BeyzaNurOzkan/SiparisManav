function UpDownKey(e) {
    
    e = e || window.event;

    if (e.keyCode == 40) {
        var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
        if (document.activeElement && document.activeElement.form) {
            var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
                function (element) {
                    //check for visibility while always include the current activeElement 
                    return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                });
            var index = focussable.indexOf(document.activeElement);
            if (index > -1) {
                var nextElement = focussable[index + 3] || focussable[0];
                nextElement.focus();
            }
        }
    }
    if (e.keyCode == 38) {
        var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
        if (document.activeElement && document.activeElement.form) {
            var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
                function (element) {
                    //check for visibility while always include the current activeElement 
                    return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                });
            var index = focussable.indexOf(document.activeElement);
            if (index > -1) {
                var nextElement = focussable[index - 3] || focussable[0];
                nextElement.focus();
            }
        }
    }
}
function UpDownKey2(e) {
    debugger
    e = e || window.event;

    if (e.keyCode == 40) {
        var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
        if (document.activeElement && document.activeElement.form) {
            var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
                function (element) {
                    //check for visibility while always include the current activeElement 
                    return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                });
            var index = focussable.indexOf(document.activeElement);
            if (index > -1) {
                var nextElement = focussable[index + 3] || focussable[0];
                nextElement.focus();
            }
        }
    }
    if (e.keyCode == 38) {
        var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
        if (document.activeElement && document.activeElement.form) {
            var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
                function (element) {
                    //check for visibility while always include the current activeElement 
                    return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                });
            var index = focussable.indexOf(document.activeElement);
            if (index > -1) {
                var nextElement = focussable[index - 3] || focussable[0];
                nextElement.focus();
            }
        }
    }

}
function getBranches(id) {

    var table = $('#kt_table_braches');
    var t = table.DataTable({
        ajax: {
            url: '/Branch/GetUserBranch?id=' + id,
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
            {
                data: 'deneme',
            },
            {
                data: 'SN',
                className: 'dt-center',
                searchable: false,
                width: '4%',
                orderable: false,
            },
            { data: 'BranchName' },
            {
                data: 'BranchCode',
                className: 'dt-center',
            },
            {
                data: 'BranchCreatedDate',
                className: 'dt-center',
            },

        ],

        // Order settings
        order: [[2, 'asc']],

        headerCallback: function (thead, data, start, end, display) {
            thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                        <input onClick="SelectAll(this)" type="checkbox" value="" class="m-group-checkable">
                        <span></span>
                    </label>`;
        },

        columnDefs: [
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    var returnHtml = `<div style="color:red;"> <b>` + full['BranchName'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var returnHtml = `<div style="color:blue;"> <b>` + full['BranchCode'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {

                    result = ``;

                    return result;
                }

            },
            {
                targets: 0,
                width: '10px',
                className: 'dt-right',
                orderable: false,
                render: function (data, type, full, meta) {
                    var branchId = full['ID'];
                    var returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;

                    for (let user of full['User']) {
                        for (let branch of user['Branches']) {

                            if (branch['BranchId'] == branchId) {
                                returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input checked type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                                break;
                            }
                            else {
                                returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
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
                targets: 4,
                className: 'pl-3',
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
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_braches').DataTable().page.info();
        t.column(1, { page: 'current' }).nodes().each(function (cell, i) {
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
function getOrderForUpdate() {
    var userId = $('#branchForUserSelect').val();
    var checkboxes = $(".branch");
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }

    $.ajax({
        type: 'POST',
        url: '/Branch/UserToBranch',
        dataType: "json",
        data: { "branchs": checkboxesChecked, "userId": userId }
    });
}

$('#branchForUserSelect').change(function myfunction() {

    var id = $('#branchForUserSelect').val();
    getBranches(id);
});

function DistributionsTable(OrderCode, id) {
    debugger
    var dateID = localStorage.dateForDist;
    var order = OrderCode.split(",");
    for (let i = 0; i < id; i++) {
        setTimeout(() => {
            table = $('#Distributions_' + i);
            table.DataTable({
                ajax: {
                    type: 'POST',
                    url: '/Branch/GetDistributionsTable',
                    dataType: "json",
                    data: { "dateID": dateID, "OrderCode": order[i] }
                },
                "bDestroy": true,
                "searching": false,
                "paging": false,
                "pageLength": 1000,
                'stripeClasses': ['stripe1', 'stripe2'],
                dom: `<'row'<'col-sm-12'tr>>`,

                buttons: [

                ],
                order: [[0, 'asc']],

                columns: [
                    {
                        data: 'S/N',
                        orderable: false,
                        className: 'dt-center',
                        searchable: false,

                    },

                    {
                        data: 'Barcode',
                        orderable: false,
                        className: 'dt-center',

                    },
                    {
                        data: 'Name',
                        orderable: false,

                    },
                    {
                        data: 'OrderCount',
                        orderable: false,
                        className: 'dt-center',

                    },
                ],
                columnDefs: [
                    {
                        targets: 0,
                        "render": function (data, type, full, meta) {
                            return `<div style="width:100%;"> ` + (meta.row + 1) + `</div> `;
                        }
                    },
                    {
                        targets: 1,
                        "render": function (data, type, full, meta) {
                            return `<div style="color:blue"><b> ` + full['Barcode'] + `</b></div> `;
                        }
                    },
                    {
                        targets: 3,
                        "render": function (data, type, full, meta) {

                            if (full['Units'] == "ADET")
                                return `<div style="width:100%; color:red;"> ` + full['OrderCount'] + `  ` + full['Units'] + `</div> `;
                            else
                                return `<div style="width:100%; "> ` + full['OrderCount'] + `  ` + full['Units'] + `</div> `;

                        }
                    },

                ],
            });        }, 5000);
    }
    
};
function DistributionsTable2(OrderCode, id) {
    debugger
    var dateID = localStorage.dateForDist;
    var order = OrderCode.split(",");
    for (var i = 0; i < id; i++) {
        table2 = $('#OrderUnitTotal_' + i);

        table2.DataTable({
            ajax: {
                type: 'POST',
                url: '/Branch/GetDistributionsTable2',
                dataType: "json",
                data: { "dateID": dateID, "OrderCode": order[i] }
            },
            "bDestroy": true,
            "searching": false,
            "paging": false,
            "pageLength": 1000,
            'stripeClasses': ['stripe1', 'stripe2'],
            dom: `<'row'<'col-sm-12'tr>>`,

            buttons: [

            ],

            columns: [

                {
                    data: 'UnitName',
                    orderable: false,
                    width: "70%"
                },
                {
                    data: 'UnitTotal',
                    className: 'dt-center',
                    orderable: false,
                    width: "30%"

                },

            ],
            order: [[1, 'asc']],

            columnDefs: [
                {
                    targets: 0,
                    "render": function (data, type, full, meta) {

                        if (full['UnitName'] == "ADET")
                            return `<div style="width:100%; color:red;"> ` + full['UnitName'] + `</div> `;
                        else
                            return `<div style="width:100%; ">  ` + full['UnitName'] + `</div> `;

                    }
                },

            ],
        });
    }
};

function DistributionsTableTitle(OrderCode, id) {
    var dateID = $('#kt_datepicker_3').val();
    var order = OrderCode.split(",");
    for (var i = 0; i < id; i++) {
        loadData(i, order[i], dateID);
    }
};
function loadData(i, order, dateID) {

    $.ajax({
        type: "POST",
        url: '/Branch/GetBranchName?orderCode=' + order,
        success: function (data) {
            debugger
            $('#orderBranchName2_' + i).text(data['BranchName']);
            $('#orderBranchName_' + i).text(data['BranchName']);
            $('#RegionName_' + i).text(data['RegionName']);
            $('#FormatName_' + i).text(data['FormatName']);
            $('#Date_' + i).text(dateID);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
}
function PassiveBranch(id, select) {
    $.ajax({
        type: "POST",
        url: '/Branch/PassiveBranch?id=' + id + '&select=' + select,
        success: function (data) {
            var table = $('#kt_table_brachesList');
            table.DataTable().ajax.reload();

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
}
function getBranchesList() {
    var table = $('#kt_table_brachesList');
    var t = table.DataTable({
        ajax: {
            url: '/Branch/GetBranchList/',
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
            {
                data: 'S/N',
                "width": "5%",
                className: 'dt-center',
                orderable: false,
                searchable: false,
            },
            {
                data: 'BranchCode',
                "width": "5%",
                orderable: false,
                className: 'dt-center',
            },
            {
                data: 'BranchName',
                className: ' font-weight-bold',
            },
            { data: 'Regions' },
            {
                data: 'BranchCreatedDate',
                className: 'dt-center',
            },
            {
                data: 'İşlemler',
                orderable: false,
            },
        ],
        // Order settings
        order: [[2, 'asc']],
        columnDefs: [
            {
                targets: -1,
                title: 'İşlemler',
                orderable: false,
                "width": "5%",
                render: function (data, type, full, meta) {
                    if (full['Visible'] == true)
                        var result = `
                        <a  onclick="PassiveBranch(` + full['ID'] + `,0)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Pasif Yap">
                          <i class="la la-eye-slash"></i>
                         </a>`;
                    if (full['Visible'] == false)
                        var result = `
                        <a  onclick="PassiveBranch(` + full['ID'] + `,1)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Aktif Yap">
                          <i class="la la-eye"></i>
                         </a>`;
                    return result;
                }
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    var id = full['BranchCreatedDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm ');
                    return result;
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
                targets: 2,
                orderable: false,
                "width": "15%",

                render: function (data, type, full, meta) {
                    var id = full['BranchName'];
                    result = `<span style="color:red;">` + id + `</span>`;

                    return result;
                }
            },
            {
                targets: 1,
                orderable: false,
                "width": "15%",

                render: function (data, type, full, meta) {
                    var id = full['BranchCode'];
                    result = `<span style="color:blue;"><b>` + id + `</b></span>`;

                    return result;
                }
            },
            {
                targets: 3,
                orderable: false,
                "width": "15%",

                render: function (data, type, full, meta) {
                    var id = full['Regions'];
                    result = `<span style="color:blue;"><b>` + id + `</b></span>`;

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
        var PageInfo = $('#kt_table_brachesList').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};
function SelectAll(source) {

    checkboxes = document.getElementsByName('SelectBranch');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}
function SelectAll2(source) {

    checkboxes = document.getElementsByName('SelectBranch2');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}
function getBranchesToDist(region, format, OrderCode, EndDate) {
    debugger
    var check = localStorage.dateForDist;
    var table = $('#kt_table_brachestoRegions');
    table.DataTable({
        ajax: {
            url: '/Branch/GetRegionsBranchDis?region=' + region + '&format=' + format + '&EndDate=' + EndDate,
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
                data: 'BranchName',
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
                    var returnHtml = '';
                    if (OrderCode == 0)
                        returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                    else {
                        var array = OrderCode.split(",");

                        for (var i = 0; i < array.length; i++) {
                            if (full['ID'] == parseInt(array[i])) {
                                returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable branch" checked>
                                            <span></span>
                                        </label>`;
                                break;
                            }
                            else
                                returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable branch" >
                                            <span></span>
                                        </label>`;
                        }

                    }
                    return returnHtml;
                },
            },

            {
                targets: 1,
                className: 'pl-3',
                orderable: false,
                render: function (data, type, full, meta) {
                    var name = `<span style="color:red;"><b>` + full['BranchName'] + `</b></span>`;
                    return name;
                },
            },
        ],

        responsive: false,
        "scrollX": true,
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

function getBranchesToRegions(id) {
    var table = $('#kt_table_brachestoRegions');
    table.DataTable({
        ajax: {
            url: '/Branch/GetRegionsBranch?id=' + id/* + '&StartDate=' + StartDate + '&EndDate=' + EndDate*/,
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
                data: 'BranchName',
            },
            {
                data: 'BranchFormat',
                className: 'dt-center',
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
                targets: 2,
                render: function (data, type, full, meta) {
                    if (full['BranchFormat'] == null)
                        full['BranchFormat'] = "Tanımsız";
                    var returnHtml = `<div style="color:blue;"> <b>` + full['BranchFormat'].toLocaleUpperCase() + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 1,
                className: 'pl-3',
                orderable: false,
                render: function (data, type, full, meta) {
                    var name = `<div style="color:red;"> <b>` + full['BranchName'] + `</b></div> `;
                    return name;
                },
            }
        ],

        responsive: false,
        "scrollX": true,
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


$('#branchForRegionsSelect').change(function myfunction() {
    var id = $('#branchForRegionsSelect').val();
    getBranchesToRegions(id);
    checkedBranchRegionsStart();
});
$('#branchForRegionsDisSelect').change(function myfunction() {
    var region = $('#branchForRegionsDisSelect').val();
    var format = $('#branchForFormatsDisSelect').val();
    var url = window.location.href;
    var OrderCode = url.substring(url.lastIndexOf('=') + 1);
    if (url == OrderCode)
        OrderCode = 0;
    var dateID = $('#kt_datepicker_3').val();

    getBranchesToDist(region, format, OrderCode, dateID);
});
$('#branchForFormatsDisSelect').change(function myfunction() {
    var region = $('#branchForRegionsDisSelect').val();
    var format = $('#branchForFormatsDisSelect').val();
    var url = window.location.href;
    var OrderCode = url.substring(url.lastIndexOf('=') + 1);
    if (url == OrderCode)
        OrderCode = 0;
    var dateID = $('#kt_datepicker_3').val();

    getBranchesToDist(region, format, OrderCode, dateID);
});
$('#RegionsSelect').change(function myfunction() {
    var region = $('#RegionsSelect').val();
    var format = $('#FormatSelect').val();    
    var dateID = $('#kt_datepicker_3').val();
    getProductsReportHorizontal(dateID, format, region);
});
$('#FormatSelect').change(function myfunction() {
    var region = $('#RegionsSelect').val();
    var format = $('#FormatSelect').val();  
    var dateID = $('#kt_datepicker_3').val();
    getProductsReportHorizontal(dateID, format, region);
});
function checkedBranchRegionsStart() {
    table = $('#kt_table_brachestoOrderAbs');
    var regionsID = $('#branchForRegionsSelect').val();
    var StartDate = $('#StartDate').val();
    var EndDate = $('#EndDate').val();
    var LineCount = 0;

    var t = table.DataTable({
        "bDestroy": true,
        ajax: {
            type: 'POST',
            url: '/Branch/RegionToBranchStart?RegionID=' + regionsID + '&StartDate=' + StartDate + '&EndDate=' + EndDate,
            dataType: "json",
        },
        "searching": false,
        "paging": false,
        "pageLength": 1000,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-4 text-left align-self-center'<"mürvet">><'col-sm-8 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

        buttons: [{
            extend: 'collection',
            text: '<i class="flaticon2-gear" style= "font-size:16px; "></i>',
            className: 'btn btn-outline-info dropleft-inline  pt-2 mt-0 pb-2 mb-0',
            buttons: [
                {
                    extend: 'excelHtml5',
                    footer: true,
                    exportOptions: {
                        columns: ':visible',
                        orthogonal: 'export'
                    },
                    customize: function (xlsx) {

                        var sheet = xlsx.xl.worksheets['sheet1.xml'];
                        // jQuery selector to add a border
                        $('c[r=A1] t', sheet).text('Sipariş Sevkiyat Özeti');
                        $('row c[r*="A"]', sheet).attr('s', '25');
                        $('row c[r*="B"]', sheet).attr('s', '25');
                        $('row c[r*="C"]', sheet).attr('s', '25');
                        $('row c[r*="D"]', sheet).attr('s', '25');
                        $('row c[r*="E"]', sheet).attr('s', '25');
                        $('row c[r="A2"]', sheet).attr('s', '47');
                        $('row c[r="B2"]', sheet).attr('s', '47');
                        $('row c[r="C2"]', sheet).attr('s', '47');
                        $('row c[r="D2"]', sheet).attr('s', '47');
                        $('row c[r="E2"]', sheet).attr('s', '47');
                        $('row:first c', sheet).attr('s', '51');

                        $('row:last c', sheet).attr('s', '47');
                    },
                    customizeData: function (data) {
                        for (var i = 0; i < data.body.length; i++) {
                            for (var j = 0; j < data.body[i].length; j++) {
                                data.body[i][4] = '\u200C' + data.body[i][4];
                            }

                        }
                        for (var i = 0; i < data.body.length; i++) {
                            for (var j = 0; j < data.body[i].length; j++) {
                                data.body[i][2] = '\u200C' + data.body[i][2];
                            }
                        }
                        for (var i = 0; i < data.body.length; i++) {
                            for (var j = 0; j < data.body[i].length; j++) {
                                data.body[i][0] = (i + 1);
                            }
                        }
                        for (var i = 0; i < data.footer.length; i++) {

                            data.footer[2] = '\u200C' + data.footer[2];
                            data.footer[4] = '\u200C' + data.footer[4];
                        }
                    }
                },
                'print',
                'csv',
                'pdf',
                'copy',
                'colvis',
            ],
        }],
        order: [[0, 'asc']],
        columns: [
            {
                targets: 0,
                width: '10%',
                className: 'dt-center',
                orderable: false,
                "render": function (data, type, full, meta) {
                    return `<div style="width:100%;"> ` + (meta.row + 1) + `</div> `;
                }
            },
            {
                data: 'BranchName',
                className: 'font-weight-bold',
            },
            {
                data: 'Safe',
                className: 'dt-center font-weight-bold',
                orderable: false,
                width: '14%',
            },
            {
                data: 'Point',
                className: 'dt-center font-weight-bold',
                orderable: false,
                width: '14%',
            },
            {
                data: 'Box',
                className: 'dt-center font-weight-bold',
                orderable: false,
                width: '14%',

            },
            {
                data: 'Box2',
                className: 'dt-center font-weight-bold',
                orderable: false,
                width: '14%',
            },
            {
                data: 'BoxAll',
                className: 'dt-center font-weight-bold',
                orderable: false,
                width: '14%',
            },
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
                targets: 1,
                render: function (data, type, full, meta) {
                    var returnHtml = `<span style="color:red;">` + full['BranchName'] + `</span>`;
                    return returnHtml;
                },
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    var a = Number(full['Box2']);
                    var last = a.toLocaleString('tr')
                    var returnHtml = `<span style="color:red;">` + last + `</span>`;
                    return returnHtml;
                },
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    debugger
                    var b = Number(full['BoxAll']);
                    var last = b.toLocaleString('tr')

                    var returnHtml = last;
                    return returnHtml;
                },
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    var returnHtml;
                    if (full['Safe'] != "") {
                        var totalPrintFormat2 = full['Safe'].toString();
                        var last2 = "";

                        for (var i = totalPrintFormat2.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat2.length && totalPrintFormat2.length > 3) {
                                last2 = last2 + ".";
                            }
                            last2 = last2 + totalPrintFormat2[totalPrintFormat2.length - i];
                        }
                        returnHtml = last2;
                        return returnHtml;
                    }
                    else {
                        returnHtml = `<span style="font-size:12px;">` + 0 + `</span>`;
                    }
                    return returnHtml;
                },
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {

                    var totalPrintFormat2 = full['Point'].toString();
                    var last2 = "";
                    for (var i = totalPrintFormat2.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat2.length && totalPrintFormat2.length > 3) {
                            last2 = last2 + ".";
                        }
                        last2 = last2 + totalPrintFormat2[totalPrintFormat2.length - i];
                    }
                    returnHtml = last2;
                    return returnHtml;
                },
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    result = "";
                    var totalPrintFormat = full['Box'].toString();
                    var split = totalPrintFormat.split('.');
                    var last = "";
                    for (var i = split[0].length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != split[0].length && split[0].length > 3) {
                            last = last + ".";
                        }
                        last = last + split[0][split[0].length - i];
                    }
                    if (last == "")
                        last = "0";
                    if (split.length > 1)
                        result = last + "," + split[1].substring(0, 2);
                    else
                        result = last + ",00";
                    return result;
                },
            },

        ],


        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;

            // converting to interger to find total
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // computing column Total of the complete result 

            var tueTotal = api
                .column(2)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var totalPrintFormat = tueTotal.toString();
            var last = "";
            for (var i = totalPrintFormat.length; i > 0; i--) {
                if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                    last = last + ".";
                }
                last = last + totalPrintFormat[totalPrintFormat.length - i];
            }


            var wedTotal = api
                .column(3)
                .data()
                .reduce(function (a, b) {
                    var result = intVal(a) + intVal(b);

                    return result
                }, 0);

            var totalPrintFormat2 = wedTotal.toString();
            var last2 = "";
            for (var i = totalPrintFormat2.length; i > 0; i--) {
                if (i % 3 == 0 && i != 0 && i != totalPrintFormat2.length && totalPrintFormat2.length > 3) {
                    last2 = last2 + ".";
                }
                last2 = last2 + totalPrintFormat2[totalPrintFormat2.length - i];
            }
            var thuTotal = api
                .column(4)
                .data()
                .reduce(function (a, b) {
                    var result = intVal(a) + intVal(b);
                    return result.toFixed(1);
                }, 0);

            var totalPrintFormat3 = thuTotal.toString();
            var last3 = "";

            for (var i = totalPrintFormat3.length; i > 0; i--) {
                if (totalPrintFormat3[totalPrintFormat3.length - i] == '.') {
                    last3 = last3 + ",";
                }
                else {
                    last3 = last3 + totalPrintFormat3[totalPrintFormat3.length - i];
                }
            }
            var floorVal = parseFloat(last3).toFixed(0);
            var last4 = '';
            for (var i = floorVal.length; i > 0; i--) {
                if (i % 3 == 0 && i != 0 && i != floorVal.length && floorVal.length > 3) {
                    last4 = last4 + ".";
                }
                last4 = last4 + floorVal[floorVal.length - i];
            }

            var mustaagg = (parseFloat(totalPrintFormat3) - parseFloat(floorVal)).toFixed(1);
            var mk = '';
            for (var i = 0; i < mustaagg.length; i++) {
                if (mustaagg[i] == '.') {
                    break
                }
                else {
                    mk = mk + mustaagg[mustaagg.length - i - 1];
                }
            }
            var lastResult = last4 + ',' + mk;

            // Update footer by showing the total with the reference of the column index 
            $(api.column(0).footer()).html('').addClass("bg-primary");
            $(api.column(1).footer()).html('TOPLAM').addClass("bg-primary dt-center");
            $(api.column(2).footer()).html(last).addClass("dt-center bg-primary");
            $(api.column(3).footer()).html(last2).addClass("bg-primary");
            $(api.column(4).footer()).html(lastResult).addClass("bg-primary");
            $(api.column(5).footer()).html('').addClass("bg-primary");
            $(api.column(6).footer()).html('').addClass("bg-primary");
        },
        // Order settings
        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_brachestoOrderAbs').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    $('div.mürvet').append(`
                    <div class="row">
                        <div class="col-lg-12 pr-0 mr-0" style=" text-align: left; ">
                           <h5 class="pl-2"> Sipariş Sevkiyat Özeti</h5>
                        </div>
                    </div>`
    );

};
function checkedBranchRegions() {
    table = $('#kt_table_brachestoOrderAbs');
    var checkboxes = $(".branch");
    var StartDate = $('#StartDate').val();
    var EndDate = $('#EndDate').val();

    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }

    if (checkboxesChecked.length == 0) {
        checkedBranchRegionsStart();
    }
    else {

        table.DataTable({
            ajax: {
                type: 'POST',
                url: '/Branch/RegionToBranch',
                dataType: "json",
                data: { "StartDate": StartDate, "EndDate": EndDate, "branchs": checkboxesChecked }
            },
            "bDestroy": true,
            "searching": false,
            "paging": false,
            "pageLength": 1000,
            'stripeClasses': ['stripe1', 'stripe2'],
            dom: `<'row'<'col-sm-4 text-left align-self-center'<"mürvet">><'col-sm-8 text-right'B>>
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
            order: [[0, 'asc']],

            columns: [
                {
                    targets: 0,
                    width: '10%',
                    className: 'dt-center',
                    orderable: false,
                    "render": function (data, type, full, meta) {
                        return `<div style="width:100%;"> ` + (meta.row + 1) + `</div> `;
                    }
                },
                {
                    data: 'BranchName',
                },
                {
                    data: 'Safe',
                    className: 'dt-center',
                    orderable: false,
                    width: '14%',

                },
                {
                    data: 'Point',
                    className: 'dt-center',
                    orderable: false,
                    width: '14%',

                },
                {
                    data: 'Box',
                    className: 'dt-center',
                    orderable: false,
                    width: '14%',
                },
                {
                    data: 'Box2',
                    className: 'dt-center font-weight-bold',
                    orderable: false,
                    width: '14%',
                },
                {
                    data: 'BoxAll',
                    className: 'dt-center font-weight-bold',
                    orderable: false,
                    width: '14%',
                },
            ],
            columnDefs: [
                {
                    targets: 1,
                    render: function (data, type, full, meta) {
                        var returnHtml = `<span style="color:red;">` + full['BranchName'] + `</span>`;
                        return returnHtml;
                    },
                },

                {
                    targets: 2,
                    render: function (data, type, full, meta) {
                        var totalPrintFormat2 = full['Safe'].toString();
                        var last2 = "";
                        for (var i = totalPrintFormat2.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat2.length && totalPrintFormat2.length > 3) {
                                last2 = last2 + ".";
                            }
                            last2 = last2 + totalPrintFormat2[totalPrintFormat2.length - i];
                        }
                        return last2;
                    },
                },
                {
                    targets: 3,
                    render: function (data, type, full, meta) {
                        var totalPrintFormat2 = full['Point'].toString();
                        var last2 = "";
                        for (var i = totalPrintFormat2.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat2.length && totalPrintFormat2.length > 3) {
                                last2 = last2 + ".";
                            }
                            last2 = last2 + totalPrintFormat2[totalPrintFormat2.length - i];
                        }
                        returnHtml = last2;
                        return returnHtml;
                    },
                },
                {
                    targets: 4,
                    render: function (data, type, full, meta) {
                        result = "";

                        var totalPrintFormat = full['Box'].toString();
                        var mustafadeneme = totalPrintFormat.replace(",", ".");

                        var split = mustafadeneme.split('.');
                        var last = "";
                        for (var i = split[0].length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != split[0].length && split[0].length > 3) {
                                last = last + ".";
                            }
                            last = last + split[0][split[0].length - i];
                        }
                        if (last == "")
                            last = "0";
                        if (split.length > 1)
                            result = last + "," + split[1].substring(0, 2);
                        else
                            result = last + ",00";
                        return result;
                        return returnHtml;
                    },
                },
            ],

            "footerCallback": function (row, data, start, end, display) {
                var api = this.api(), data;

                // converting to interger to find total
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                            i : 0;
                };

                // computing column Total of the complete result 

                var tueTotal = api
                    .column(2)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                var totalPrintFormat = tueTotal.toString();
                var last = "";
                for (var i = totalPrintFormat.length; i > 0; i--) {
                    if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                        last = last + ".";
                    }
                    last = last + totalPrintFormat[totalPrintFormat.length - i];
                }


                var wedTotal = api
                    .column(3)
                    .data()
                    .reduce(function (a, b) {
                        var result = intVal(a) + intVal(b);

                        return result
                    }, 0);
                var totalPrintFormat2 = wedTotal.toString();
                var last2 = "";
                for (var i = totalPrintFormat2.length; i > 0; i--) {
                    if (i % 3 == 0 && i != 0 && i != totalPrintFormat2.length && totalPrintFormat2.length > 3) {
                        last2 = last2 + ".";
                    }
                    last2 = last2 + totalPrintFormat2[totalPrintFormat2.length - i];
                }

                var thuTotal = api
                    .column(4)
                    .data()
                    .reduce(function (a, b) {
                        var result = intVal(a) + intVal(b);
                        return result.toFixed(1);
                    }, 0);

                var totalPrintFormat3 = thuTotal.toString();
                var last3 = "";

                for (var i = totalPrintFormat3.length; i > 0; i--) {
                    if (totalPrintFormat3[totalPrintFormat3.length - i] == '.') {
                        last3 = last3 + ",";
                    }
                    else {
                        last3 = last3 + totalPrintFormat3[totalPrintFormat3.length - i];
                    }
                }
                var floorVal = parseFloat(last3).toFixed(0);

                var last4 = '';
                for (var i = floorVal.length; i > 0; i--) {
                    if (i % 3 == 0 && i != 0 && i != floorVal.length && floorVal.length > 3) {
                        last4 = last4 + ".";
                    }
                    last4 = last4 + floorVal[floorVal.length - i];
                }

                var mustaagg = (parseFloat(totalPrintFormat3) - parseFloat(floorVal)).toFixed(1);
                var mk = '';
                for (var i = 0; i < mustaagg.length; i++) {
                    if (mustaagg[i] == '.') {
                        break
                    }
                    else {
                        mk = mk + mustaagg[mustaagg.length - i - 1];
                    }
                }
                var lastResult = last4 + ',' + mk;

                // Update footer by showing the total with the reference of the column index 
                $(api.column(0).footer()).html('').addClass("bg-primary");
                $(api.column(1).footer()).html('TOPLAM').addClass("bg-primary dt-center");
                $(api.column(2).footer()).html(last).addClass("dt-center bg-primary");
                $(api.column(3).footer()).html(last2).addClass("bg-primary");
                $(api.column(4).footer()).html(lastResult).addClass("bg-primary");
            },
            // Order settings
            responsive: false,
            "scrollX": true,
            stateSave: true,
            orderCellsTop: true,
            fixedHeader: true,
            "destroy": true,

        });
        $('div.mürvet').append(`
                    <div class="row">
                        <div class="col-lg-12 pr-0 mr-0" style=" text-align: left; ">
                           <h5 class="pl-2"> Sipariş Sevkiyat Özeti</h5>
                        </div>
                    </div>`
        );
    }
};

function checkedBranchRegionsDis() {
    debugger
    localStorage.dateForDist = $('#kt_datepicker_2').val();
    var checkboxes = $(".branch");
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    var a = checkboxesChecked.length;
    window.location.href = '/Center/OrderShipmentDistributions?id=' + a + '?check=' + checkboxesChecked;
};

function getBranchesToSettings() {
    var user = "";
    var table = $('#kt_table_brachesToSettings');
    var t = table.DataTable({
        ajax: {
            url: '/Branch/getBranchesToSettings',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {

            },
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-6 pl-0 text-left'f><'col-sm-6 text-right'B>>
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
                data: 'deneme',
            },
            {
                data: 'SN',
                className: 'dt-center',
                searchable: false,
                width: '4%',
                orderable: false,
            },
            {
                data: 'Regions',
                className: 'dt-center',
            },
            { data: 'BranchName' },
            {
                data: 'BranchCode',
                className: 'dt-center',
            },



        ],

        // Order settings
        order: [[3, 'asc']],

        headerCallback: function (thead, data, start, end, display) {
            thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                        <input onClick="SelectAll(this)" type="checkbox" value="" class="m-group-checkable">
                        <span></span>
                    </label>`;
        },

        columnDefs: [
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    user = full['user'];
                    var returnHtml = `<div style="color:red;"> <b>` + full['BranchName'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    result = ``;
                    return result;
                }

            },
            {
                targets: 2,
                render: function (data, type, full, meta) {

                    if (full['Regions'] == null)
                        full['Regions'] = "Tanımsız";
                    var result = `<div style="color:blue;"><b>` + full['Regions'] + `</b></div>`;
                    return result;
                }

            },
            {
                targets: 4,
                render: function (data, type, full, meta) {

                    if (full['Regions'] == null)
                        full['Regions'] = "Tanımsız";
                    var result = `<div style="color:blue;"><b>` + full['BranchCode'] + `</b></div>`;
                    return result;
                }

            },
            {
                targets: 0,
                width: '10px',
                className: 'dt-right',
                orderable: false,
                render: function (data, type, full, meta) {
                    var branchId = full['ID'];

                    if (full['isMaster'] == true) {
                        returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input checked type="checkbox" value="` + full['ID'] + `" class="m-checkable branchess">
                                            <span></span>
                                        </label>`;
                    }
                    else {
                        returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable branchess">
                                            <span></span>
                                        </label>`;
                    }
                    return returnHtml;
                },
            },

        ],
        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;

            $(api.column(0).footer()).html('Son Güncelleyen Kullanıcı: ' + user).addClass(" dt-center");

        },

    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_brachesToSettings').DataTable().page.info();
        t.column(1, { page: 'current' }).nodes().each(function (cell, i) {
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

function getSettingsBranchForUpdate(id) {

    var checkboxes = $(".branchess");
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    $.ajax({
        type: 'POST',
        url: '/Branch/getSettingsBranchForUpdate',
        dataType: "json",
        data: {
            "branchess": checkboxesChecked,
            "id": id
        },
        success: function (data) {
            swal.fire({
                title: "Başarılı!",
                text: "Merkez Depo Atama İşlemi Başarılı!",
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                    $('#insertRegisterModal').modal('toggle');
                }
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
}

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
//            
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
//                    
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
//                    
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
//        lengthChange: false,
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

////function TriggerCopyButton() {
////    $(".buttons-copy").trigger("click");
////}

////function TriggerExcelButton() {
////    $(".buttons-excel").trigger("click");
////}

////function TriggerCsvButton() {
////    $(".buttons-csv").trigger("click");
////}

////function TriggerPdfButton() {
////    $(".buttons-pdf").trigger("click");
////}

////function TriggerPrintButton() {
////    $(".buttons-print").trigger("click");
////}