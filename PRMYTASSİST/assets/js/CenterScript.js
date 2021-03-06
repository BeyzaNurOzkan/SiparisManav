function UTCTodayforBranchOrderList() {

    var deneme = $('#StartDate').val();
    var deneme1 = $('#EndDate').val();

    if (deneme == "") {
        var myDate = new Date();
        var date = myDate;

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = day + "/" + month + "/" + year;

        $('#StartDate').val(today);
    }

    if (deneme1 == "") {
        var myDate = new Date();
        var date = myDate;

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = day + "/" + month + "/" + year;

        $('#EndDate').val(today);
    }
}
function getBranchOrderListCenter(StartDate, EndDate) {
    debugger
    var table = $('#kt_table_getBranchOrderListCenter');
    var t = table.DataTable({
        ajax: {
            url: '/Branch/GetBranchesOrder?StartDate=' + StartDate + '&EndDate=' + EndDate,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",

        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row pt-3'<'col-sm-3 text-left pr-0 mr-0'f><'col-sm-6 text-left'<"toolbar">><'col-sm-3 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i>
            <'col-sm-12 col-md-7 dataTables_pager'lp>>`,
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
                        var StartDate = $('#StartDate').val();
                        var EndDate = $('#EndDate').val();
                        OrderCountAndAppCount(val, StartDate, EndDate);
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {

                    select.append('<option value="' + d + '">' + d + '</option>')

                });
            });
            this.api().columns([5]).every(function () {
                var bekleme = "Beklemede";
                var onaylı = "Onaylandı";
                var red = "Red";
                var column = this;
                $(column.header()).empty();
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Onay Durumu</option></select>')
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

                    if (d == 0) {
                        select.append('<option value="' + bekleme + '">' + bekleme + '</option>')
                    }
                    else if (d == 1) {
                        select.append('<option value="' + onaylı + '">' + onaylı + '</option>')
                    }
                    else {
                        select.append('<option value="' + red + '">' + red + '</option>')
                    }
                });
            });
        },

        columns: [
            {
                data: 'deneme',
            },
            {
                data: 'S/N',
                orderable: false,
                className: 'dt-center',
                searchable: false,
                width: "3%",

            },
            {
                data: 'OrderNo',
                className: 'dt-center',
                orderable: false,
                width: "5%",

            },
            {
                data: 'CreateDate',
                className: 'dt-center font-weight-bold',
                width: "12%",

            },
            {

                data: 'BranchName',
                orderable: false,
                className: 'font-weight-bold text-danger',

            },

            {
                data: 'ApprovalStatus',
                className: 'dt-center',
                orderable: false,
            },
            {
                data: 'NumberofProduct',
                className: 'font-weight-bold dt-center',
                orderable: false,
            },
            {
                data: 'Safe',
                className: 'font-weight-bold dt-center',
                orderable: false,
            },
            {
                data: 'Point',
                className: 'font-weight-bold dt-center',
                orderable: false,
            },
            {
                data: 'Box',
                className: 'font-weight-bold dt-center',
                orderable: false,
            },
            {
                data: 'UserName',
                orderable: false,
                width: "10%",
                visible: false
            },
            {
                data: 'SaveDetails',
                orderable: false,
                width: "10%",
            },
            {
                data: 'İşlemler',
                width: "10%",
            },
        ],
        order: [[2, 'desc']],

        headerCallback: function (thead, data, start, end, display) {
            thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                        <input type="checkbox" value="" onClick="toggle(this)" class="m-group-checkable">
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
                    var returnHtml = ``;

                    switch (full['ApprovalStatus']) {
                        case 0:
                            returnHtml = `<label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--warning">
                                            <input name="SelectedChild" type="checkbox" value="` + full['ID'] + `" class="m-checkable branchOrder">
                                            <span></span>
                                        </label>
                         `;
                            break;

                        case 1:
                            returnHtml = `
                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--success">
                                            <input disabled="disabled" type="checkbox" value="` + full['ID'] + `" class="m-checkable branchOrder">
                                            <span></span>
                                        </label>
                         `;
                            break

                        case 2:
                            returnHtml = `<label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger">
                                            <input disabled="disabled" type="checkbox" value="` + full['ID'] + `" class="m-checkable branchOrder">
                                            <span></span>
                                        </label>
                        
                         `;
                            break;
                    }

                    return returnHtml;
                },
            },
            {
                targets: -1,
                title: 'İşlemler',
                orderable: false,
                "width": "10%",
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = "";
                    switch (full['ApprovalStatus']) {
                        case 0:
                            result = `
                         <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Görüntüle">
                         <i class="la la-eye"></i>
                         </a>
                        <a onclick="ConfirmBranchOrderList(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Onayla">
                         <i class="la la-check"></i>
                         </a>
                         <a onclick="CancelBranchOrderList(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Reddet">
                         <i class="la la-close"></i>
                         </a>
                         `;
                            break;

                        case 1:
                            result = `
                         <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Görüntüle">
                         <i class="la la-eye"></i>
                         </a>
                       
                         `;
                            break

                        case 2:
                            result = `
                         <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Görüntüle">
                         <i class="la la-eye"></i>
                         </a>
                       
                         `;
                            break;
                    }
                    return result;
                }
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {

                    result = ``;

                    return result;
                }

            },
            {
                targets: 7,
                render: function (data, type, full, meta) {

                    var totalPrintFormat = full['Safe'].toString();
                    var last = "";
                    for (var i = totalPrintFormat.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                            last = last + ".";
                        }
                        last = last + totalPrintFormat[totalPrintFormat.length - i];
                    }

                    return last;
                }

            },
            {
                targets: 8,
                render: function (data, type, full, meta) {

                    var totalPrintFormat = full['Point'].toString();
                    var last = "";
                    for (var i = totalPrintFormat.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                            last = last + ".";
                        }
                        last = last + totalPrintFormat[totalPrintFormat.length - i];
                    }

                    return last;
                }

            },

            {
                targets: 5,
                title: 'Onay Durumu',
                orderable: false,
                className: 'dt-center',
                "width": "14%",
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = "";
                    switch (full['ApprovalStatus']) {
                        case 0:
                            result = `<a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList"><span style="width: 100%;"><span style="width:100%; font-size:11px; height: 20px;" class="kt-badge  kt-badge--brand kt-badge--inline kt-badge--pill">Beklemede</span></span></a>`;
                            break;
                        case 1:
                            result = `<a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList"><span style="width: 100%;"><span style="width:100%; font-size:11px; height: 20px;" class="kt-badge  kt-badge--success  kt-badge--inline kt-badge--pill">Onaylandı</span></span></a>`;
                            break;
                        case 2:
                            result = `<a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList"><span style="width: 100%;"><span style="width:100%; font-size:11px; height: 20px;" class="kt-badge  kt-badge--danger  kt-badge--inline kt-badge--pill">Red</span></span></a>`;
                            break;
                    }
                    return result;
                },

            },
            {
                targets: 3,
                title: 'Sipariş Tarihi',
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var id = full['CreateDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm ');
                    return result;
                },

            },
            //{
            //    targets: 0,

            //    render: function (data, type, full, meta) {
            //        var id = full['CreateDate'];
            //        var result = moment(id).format('DD.MM.YYYY - HH:MM ');
            // <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Görüntüle">
            //        return result;
            //    },

            //},
            {
                targets: 2,
                title: 'No',
                orderable: false,
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var id = full['ID'];
                    var result = "";
                    switch (full['ApprovalStatus']) {
                        case 0:
                            result = ` <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList" class="btn pt-0 mt-0 pb-0 mb-0"  title="" style="font-size: 11px;     font-weight: bold; color:blue;" >` + full['OrderNo'] + `</a>`;
                            break;
                        case 1:
                            result = ` <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList" class="btn pt-0 mt-0 pb-0 mb-0"  title="" style="font-size: 11px;     font-weight: bold; color:blue;" >` + full['OrderNo'] + `</a>`;
                            break;
                        case 2:
                            result = ` <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList" class="btn pt-0 mt-0 pb-0 mb-0"  title="" style="font-size: 11px;     font-weight: bold; color:blue;" >` + full['OrderNo'] + `</a>`;
                            break;
                    }
                    return result;
                }
            },
            {
                targets: 4,
                "width": "18%",
                className: 'text-danger font-weight-bold',
                render: function (data, type, full, meta) {
                    var id = full['BranchName'];
                    return id;
                }
            },
            {
                targets: 9,
                render: function (data, type, full, meta) {
                    result = "";
                    if (full['Box'] != "") {
                        var totalPrintFormat = full['Box'].toString();
                        var split = totalPrintFormat.split('.');
                        var last = "";
                        for (var i = split[0].length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != split[0].length && split[0].length > 3) {
                                last = last + ".";
                            }
                            last = last + split[0][split[0].length - i];
                        }
                        if (split.length > 1)
                            result = last + "," + split[1].substring(0, 2);
                        else
                            result = last + ",00";
                    }
                    return result;
                }
            }
        ],
        responsive: false,
        "scrollX": true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });


    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_getBranchOrderListCenter').DataTable().page.info();
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

    //table.on('change', 'thead tr .orderSelectBranch', function () {
    //    
    //});

    $("div.toolbar").html(`
                    <div class="row">
                        <div class="col-lg-12 pr-0 mr-0 mb-1" style=" text-align: left; ">
                             <a class="btn btn-info pt-2 pb-2 mr-3" style="cursor: pointer; font-size: 11px; color:white;" title="Onayla" value="" onclick="checkedOrderToBranch()">
                                <i class="icon-2x flaticon2-check-mark" style="color:white;"></i>Onayla
                            </a>
                            <a class="btn btn-danger pt-2 pb-2 mb-1" style="cursor: pointer; font-size: 11px; color:white;" title="Reddet" value="" onclick="checkedOrderToBranchNeg()">
                                <i class="icon-2x pl-0 flaticon2-cancel-music" style="color:white;"></i>Reddet
                            </a>
                        
                        </div>
                    </div>`
    );
};
function OrderCountAndAppCount(branchID, StartDate, EndDate) {

    $.ajax({
        type: "POST",
        url: '/Branch/OrderCountAndAppCount?BranchName=' + branchID + '&StartDate=' + StartDate + '&EndDate=' + EndDate,
        success: function (data) {

            $('#BranchCount').val(data['BranchCount']);
            if (data['fark'] == undefined || data['fark'] == null)
                $('#fark').text('(0)');
            else
                $('#fark').text('(-' + data['fark'] + ')');

            $('#OrderCount').val(data['ordercount']);
            $('#App0Count').val(data['appcount0']);
            $('#App1Count').val(data['appcount1']);
            $('#App2Count').val(data['appcount2']);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
};
function getOrderStatusDay() {
    $('#SelectedTimeZone').text('Bugün');

    debugger
    var date = new Date();
    var date2 = new Date();
    date2.setDate(date2.getDate() + 1);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = day + "/" + month + "/" + year;

    var day = date2.getDate();
    var month = date2.getMonth() + 1;
    var year = date2.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var tomorrow = day + "/" + month + "/" + year;

    getOrderStatusAll(today, tomorrow);
}
function getOrderCountByMonth() {
    debugger
    $.ajax({
        type: "POST",
        url: '/Definition/GetOrderCountByMonth',
        success: function (data) {
            $('#JanuaryOrderTotal').text(data['mountcount0']);
            $('#FebOrderTotal').text(data['mountcount1']);
            $('#MarchOrderTotal').text(data['mountcount2']);
            $('#AprilOrderTotal').text(data['mountcount3']);
            $('#MayOrderTotal').text(data['mountcount4']);
            $('#JunOrderTotal').text(data['mountcount5']);
            $('#JulyOrderTotal').text(data['mountcount6']);
            $('#AguOrderTotal').text(data['mountcount7']);
            $('#SepOrderTotal').text(data['mountcount8']);
            $('#OctOrderTotal').text(data['mountcount9']);
            $('#NowOrderTotal').text(data['mountcount10']);
            $('#DesOrderTotal').text(data['mountcount11']);
            var AllCount = data['mountcount0'] + data['mountcount1'] + data['mountcount2'] + data['mountcount3'] + data['mountcount4'] + data['mountcount5'] + data['mountcount6'] + data['mountcount7'] + data['mountcount8'] + data['mountcount9'] + data['mountcount10'] + data['mountcount11'];
            $('#AllOrderTotal').text(AllCount);
            $('#AllOrderTotalByQuarter').text(AllCount);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function getOrderCountByQuarter() {
    debugger
    $.ajax({
        type: "POST",
        url: '/Definition/GetOrderCountByQuarter',
        success: function (data) {
            $('#QuarterOneTotal').text(data['quartercount0']);
            $('#QuarterTwoTotal').text(data['quartercount1']);
            $('#QuarterThreeTotal').text(data['quartercount2']);
            $('#QuarterFourTotal').text(data['quartercount3']);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function ShowBranchOrderListOff(id) {
    var user = "";
    var branch = "";
    var userName = "";
    var Safe = "";
    var Point = "";
    var Box = "";

    var table = $('#kt_table_getShowBranchOrderListOffCenter');
    var t = table.DataTable({
        "pageLength": 100,
        ajax: {
            url: '/Center/GetStateOrderOff?id=' + id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        },
        dom: `<'row'<'col-sm-3 text-left pr-0 mr-0'f><'col-sm-8 pl-0 ml-0 text-left'<"toolbar">><'col-sm-1 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i>
            <'col-sm-12 col-md-7 dataTables_pager'lp>>`,

        buttons: [{
            extend: 'collection',
            text: '<i class="flaticon2-gear" style= "font-size:16px; "></i>',
            className: 'btn btn-outline-info dropleft-inline  pt-2 mt-0 pb-2 mb-0',
            buttons: [
                {
                    extend: 'excelHtml5',
                    exportOptions: {
                        orthogonal: 'export',
                        columns: [1, 2, 3, 4, 5, 11]
                    },
                    customize: function (xlsx) {
                        debugger
                        var a = Date.now();
                        var sheet = xlsx.xl.worksheets['sheet1.xml'];
                        var col = $('col', sheet);
                        $(col[0]).attr('width', 14);
                        $(col[1]).attr('width', 10);
                        $(col[2]).attr('width', 33);
                        $(col[3]).attr('width', 15);
                        $(col[4]).attr('width', 15);
                        $(col[5]).attr('width', 30);


                        $('c[r=A1] t', sheet).text('Sipariş Listesi - ' + branch + ' - ' + userName + '                                   ' + Point + ' Adet                  ' + Safe + ' Kasa                  ' + Box + ' Palet ');

                        $('c[r=A2] t', sheet).text('Ürün Grubu');
                        $('row c[r*="A"]', sheet).attr('s', '9');
                        $('row c[r*="B"]', sheet).attr('s', '9');
                        $('row c[r*="C"]', sheet).attr('s', '8');
                        $('row c[r*="D"]', sheet).attr('s', '8');
                        $('row c[r*="E"]', sheet).attr('s', '9');
                        $('row c[r*="F"]', sheet).attr('s', '9');

                        $('row c[r="A2"]', sheet).attr('s', '30');
                        $('row c[r="A1"]', sheet).attr('s', '30');
                        $('row c[r="B1"]', sheet).attr('s', '30');
                        $('row c[r="C1"]', sheet).attr('s', '30');
                        $('row c[r="D1"]', sheet).attr('s', '30');

                        $('row c[r="B2"]', sheet).attr('s', '30');
                        $('row c[r="C2"]', sheet).attr('s', '30');
                        $('row c[r="D2"]', sheet).attr('s', '30');
                        $('row c[r="E2"]', sheet).attr('s', '30');
                        $('row c[r="F2"]', sheet).attr('s', '30');
                        $('row:first c', sheet).attr('s', '2');
                        var new_style = '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="https://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><numFmts count="2"><numFmt numFmtId="171" formatCode="d/mm/yyyy;@"/><numFmt numFmtId="172" formatCode="m/d/yyyy;@"/></numFmts><fonts count="10" x14ac:knownFonts="1"><font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><b/><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color theme="0"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><i/><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color rgb="FFC00000"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color rgb="FF006600"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color rgb="FF990033"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color rgb="FF663300"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><b/><sz val="11"/><color rgb="FFC00000"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts><fills count="16"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFC00000"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFF0000"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFC000"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFFF00"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF92D050"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF00B050"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF00B0F0"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0070C0"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF002060"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF7030A0"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor theme="1"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF99CC00"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFF9999"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFCC00"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color indexed="64"/></left><right style="thin"><color indexed="64"/></right><top style="thin"><color indexed="64"/></top><bottom style="thin"><color indexed="64"/></bottom><diagonal/></border></borders><cellStyleXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/><xf numFmtId="9" fontId="1" fillId="0" borderId="0" applyFont="0" applyFill="0" applyBorder="0" applyAlignment="0" applyProtection="0"/></cellStyleXfs><cellXfs count="70"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="4" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="4" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="4" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="5" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="6" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="7" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="8" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="9" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="10" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="11" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="12" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="5" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="6" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="7" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="8" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="9" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="10" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="11" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="12" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="5" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="6" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="7" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="8" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="9" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="10" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="11" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="12" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top" textRotation="90"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" textRotation="255"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment textRotation="45"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="6" fillId="13" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="6" fillId="13" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="7" fillId="14" borderId="0" xfId="1" applyNumberFormat="1" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="7" fillId="14" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="8" fillId="15" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="8" fillId="15" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="171" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="172" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="171" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="172" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="171" fontId="9" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="172" fontId="9" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="171" fontId="9" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="172" fontId="9" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf></cellXfs><cellStyles count="2"><cellStyle name="Procent" xfId="1" builtinId="5"/><cellStyle name="Standaard" xfId="0" builtinId="0"/></cellStyles><dxfs count="0"/><tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/><colors><mruColors><color rgb="FF663300"/><color rgb="FFFFCC00"/><color rgb="FF990033"/><color rgb="FF006600"/><color rgb="FFFF9999"/><color rgb="FF99CC00"/></mruColors></colors><extLst><ext uri="{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}" xmlns:x14="https://schemas.microsoft.com/office/spreadsheetml/2009/9/main"><x14:slicerStyles defaultSlicerStyle="SlicerStyleLight1"/></ext></extLst></styleSheet>';
                        xlsx.xl['styles.xml'] = $.parseXML(new_style);
                        debugger
                        var tagName = sheet.getElementsByName('0');
                        for (i = 0; i < tagName.length; i++) {
                            tagName[i].setAttribute("val", "22")
                        }
                    },
                    customizeData: function (data) {

                        var newData = []
                        for (var i = (data.body.length - 1); i >= 0; i--) {
                            var z = data.body[i];
                            debugger

                            if (z[4] == "0") {
                                continue;
                            }
                            newData[newData.length] = data.body[i];

                        }
                        // the loop reverses order so put it back
                        data.body = newData.reverse();
                    }
                },
                'print',
                'csv',
                'pdf',
                'copy',
                'colvis',
            ],
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
                searchable: false,
                orderable: false,
                width: '4%',
                className: 'dt-center',
            },
            {
                orderable: false,
                data: 'Group2',
                width: '12%',
                className: 'font-weight-bold text-info',
            },
            {
                data: 'Code',
                width: '8%',
                className: 'dt-center font-weight-bold',
            },
            {
                data: 'Name',
                width: '20%',
            },
            {
                data: 'ProductUnitName',
                width: '5%',
                className: ' font-weight-bold dt-center',
                orderable: false,
            },
            {
                visible: false,
                title: 'Sipariş Miktarı',
                data: 'SubTotal',
                width: '20%',
            },
            {
                data: 'SubTotal',
                className: 'dt-center',
                width: '8%',
            },
            {
                data: 'Quantity',
                className: 'dt-center',
                width: '8%',
            },
            {
                visible: false,
                title: 'Kapasite',
                data: 'MaxCapacity',
                width: '20%',
            },
            {
                data: 'MaxCapacity',
            },
            {
                data: 'Code',
                className: 'dt-center',
                width: '8%',
            },
            {
                data: 'Comment',
                width: '20%',
            },
            {
                visible: false,
                data: 'Group2ID',
                width: '20%',
            },
            {
                title: 'Sipariş Kontrol',
                visible: false,
                data: 'Group2ID',
                width: '20%',
            },
        ],
        order: [3, 'asc'],

        columnDefs: [
            {
                targets: 3,
                className: '',
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="width:100%;"><b style="color:red; width:250px;"> ` + full['Name'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 13,
                visible: false,
                className: '',
                render: function (data, type, full, meta) {
                    var siparismiktar = full['Quantity'];
                    if (full['SubTotal'] != "") {
                        var eldekistok = full['SubTotal'];
                    }
                    else {
                        var eldekistok = 0;
                    }
                    var MaxCapacity = full['MaxCapacity'];
                    var x = Number(siparismiktar) + Number(eldekistok) - Number(MaxCapacity);
                    return x;
                },
            },
            {
                targets: 4,
                className: '',
                render: function (data, type, full, meta) {
                    user = full['user'];
                    branch = full['branchName'];
                    userName = full['userName'];
                    Safe = full['Safe'];
                    Point = full['Point'];
                    Box = full['Box'];
                    if (((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet")) {
                        var returnHtml = `<div  style="width:100%;"><b style="color:red;"> ` + full['ProductUnitName'] + `</b></div> `;
                    }
                    else {
                        var returnHtml = `<div  style="width:100%;"><b> ` + full['ProductUnitName'] + `</b></div> `;
                    }
                    return returnHtml;
                },
            },
            {
                targets: 9,
                orderable: false,
                className: 'dt-center mt-0 mb-0 pt-0 pb-0',
                render: function (data, type, full, meta) {

                    var totalPrintFormat = Number(full['MaxCapacity']);
                    var last = totalPrintFormat.toLocaleString('tr');

                    var returnHtml = `
                            <div  style="width:100%;"> <input disabled id = "MaxCapacity_` + full["ID"] + `" style="    background-color: transparent;width:100%;text-align: center;border: 0px;font-size: 12px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + last + `" name="demo0" placeholder=""></div>`;
                    return returnHtml;
                },
            },
            {
                targets: 6,
                orderable: false,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var returnHtml = ``;
                    var subtotal = full['SubTotal'];
                    if (full['CheckBox'] == 1 && full['SubTotal'] == 0)
                        subtotal = "Yok";

                    if (full['SubTotal'] != "" && subtotal != "Yok") {
                        var totalPrintFormat = full['SubTotal'].toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        returnHtml = `
                            <div class="row" style="justify-content: center;min-width:155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="UpdateSubtotal(value,` + id + `,` + full['ID'] + `,` + full['Quantity'] + `)" id="subTotalstateneg_` + full['ID'] + `"/>
                                   <input type="text" style="width: 90px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 0px 0px 0px 0px; height:2rem; color:red;background-color: #ffe8d6;font-size: 1.3rem;" value="`+ last + `"  oninput="UpdateSubtotal(value,` + id + `,` + full['ID'] + `,` + full['Quantity'] + `)" class="form-control" id="subTotalstate_` + full['ID'] + `" />
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="UpdateSubtotal(value,` + id + `,` + full['ID'] + `,` + full['Quantity'] + `)" id="subTotalstateplus_` + full['ID'] + `"/>

                            </div>`;
                    }
                    else {
                        returnHtml = `
                            <div class="row" style="justify-content: center;min-width:155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="UpdateSubtotal(value,` + id + `,` + full['ID'] + `,` + full['Quantity'] + `)" id="subTotalstateneg_` + full['ID'] + `"/>
                                   <input type="text" style="width: 90px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 0px 0px 0px 0px; height:2rem; color:blue;background-color: #ffe8d6;font-size: 1.3rem;" value="`+ subtotal + `"   class="form-control" id="subTotalstate_` + full['ID'] + `" />
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="UpdateSubtotal(value,` + id + `,` + full['ID'] + `,` + full['Quantity'] + `)" id="subTotalstateplus_` + full['ID'] + `"/>

                            </div>`
                    }
                    return returnHtml;
                },
            },
            {
                targets: 7,
                orderable: false,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var returnHtml;
                    var totalPrintFormat = full['Quantity'].toString();
                    var last = "";
                    for (var i = totalPrintFormat.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                            last = last + ".";
                        }
                        last = last + totalPrintFormat[totalPrintFormat.length - i];
                    }
                    if (full['quantity'] != "") {
                        returnHtml = `<div class="" style="justify-content: center;width: 100%;background-color: #f0f8ff;font-size: 1.3rem; text-align: center;">` + last + `</div>`;
                    }
                    else {
                        returnHtml = `<div class="" style="justify-content: center;width: 100%;background-color: #f0f8ff;font-size: 1.3rem; text-align: center;">0</div>`;
                    }

                    return returnHtml;
                },
            },
            {
                targets: 10,
                width: '6%',
                orderable: false,
                className: 'dt-center mt-0 mb-0 pt-0 pb-0',
                render: function (data, type, full, meta) {
                    var siparismiktar = full['Quantity'];
                    if (full['SubTotal'] != "") {
                        var eldekistok = full['SubTotal'];
                    }
                    else {
                        var eldekistok = 0;
                    }
                    var MaxCapacity = full['MaxCapacity'];
                    var x = Number(siparismiktar) + Number(eldekistok) - Number(MaxCapacity);

                    var returnHtml;
                    if (x == 0) {
                        returnHtml = `
                                        <span class="icon-2x flaticon2-check-mark" style="color:green;font-size: 12px;" id = "OrderControl_` + full["ID"] + `" ></span>
                                     `;
                    }
                    else if (x > 0) {
                        var totalPrintFormat = x.toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        returnHtml = `
                            <input disabled id = "OrderControl_` + full["ID"] + `" style="    background-color: transparent;width:100%;text-align: center;border: 0px;font-size: 12px; color:green;" type="text" class="pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + last + `" name="demo0" placeholder="">`;

                    }
                    else {
                        returnHtml = `
                            <input disabled id = "OrderControl_` + full["ID"] + `" style="    background-color: transparent;width:100%;text-align: center;border: 0px;font-size: 12px; color:red;" type="text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">`;

                    }
                    return returnHtml;
                },

            },
            {
                targets: 11,
                className: ' mt-0 mb-0 pt-0 pb-0 ml-3 pl-3',
                render: function (data, type, full, meta) {
                    var returnHtml;
                    if (full['Comment'] != null) {
                        returnHtml = `<div  style="width:150px; color:red;">` + full['Comment'] + `</div> `;
                    }
                    else {
                        returnHtml = `<div  style="width:150px; color:red;"></div> `;
                    }
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
        ],

        responsive: false,
        "scrollX": true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

        "footerCallback": function (row, data, start, end, display) {
            if (user == null) {
                user = "Bilinmiyor";
            }
            var api = this.api(), data;
            debugger
            $(api.column(0).footer()).html('Son İşlem Yapan Kullanıcı: ' + user).addClass(" dt-left");

        },
    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_getShowBranchOrderListOffCenter').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    $("div.toolbar").html(`
                     <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-6 pt-0 mb-1" style=" text-align: left; align-self:center;">
                            <span style="width: 10px;">
                                    <span id="approvalstatus" class="kt-badge  kt-badge--success  kt-badge--inline kt-badge--pill" style="width: 100px; font-size: 11px; height: 25px; text-align: center;"></span>
                             </span>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 pt-0 mb-1" style=" text-align-last: right; ">
                            <a class="btn btn-success pt-2 pb-2" style="cursor: pointer; font-size: 11px;" title="Geri" id="btnPrvOrder" value="" onclick="OrderDetailChange(0)">
                                <i class="icon-2x flaticon2-back"></i>Önceki Sipariş
                            </a>
                            <a class="btn btn-success pt-2 pb-2" style="cursor: pointer; font-size: 11px;" title="İleri" id="btnNextOrder" value="" onclick="OrderDetailChange(1)">
                                Sonraki Sipariş <i class="icon-2x pl-2 pr-0 flaticon2-next"></i>
                            </a>
                        </div>
                    </div>`
    );
};
function OrderDetailChange(d) {

    var orderid = $('#orderGetID').val();
    $.ajax({
        type: 'POST',
        url: '/Order/OrderDetailChange?orderid=' + orderid + '&d=' + d,
        dataType: "json",
        success: function (datefor) {
            if (datefor > 0) {
                ProductCountandOrderCode(datefor);
                ShowBranchOrderListOff(datefor);
                url: '/Center/StateOrderListViewOff?id=' + datefor;
            }
            else if (d == 0)
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı! İlk Sipariştesiniz...", "error");
            else
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Son Sipariştesiniz...", "error");
        },
    });
};
function ProductCountandOrderCode(orderID) {
    $.ajax({
        type: "POST",
        url: '/Center/productCountandOrderCode?orderID=' + orderID,
        success: function (data) {

            var result = "";
            var result2 = "";
            switch (data['ApprovalStatus']) {
                case 0:
                    result = `Beklemede`;
                    result2 = 'kt-badge--primary';
                    break;
                case 1:
                    result = `Onaylandı`;
                    result2 = 'kt-badge--success';
                    break;
                case 2:
                    result = `Reddedildi`;
                    result2 = 'kt-badge--danger';
                    break;
            }
            debugger
            var x = document.getElementById("WaitingButton");
            var y = document.getElementById("EditOrder");

            if (x != null) {
                if (result == `Beklemede`) {
                    x.text = "Siparişi Yeniden Düzenle";
                    x.style.background = "blue";
                    x.style.border = "blue";

                }
            }
            if (y != null) {
                if (result == `Beklemede`)
                    y.hidden = false;


            }

            var CreDate = data['CreateDate'];
            var printDate = moment(CreDate).format('DD.MM.YYYY');
            $('#kt_datepicker_3').val(printDate);
            $('#orderGetID').val(data['Id']);
            $('#approvalstatus').text(result);

            $('#approvalstatus').removeClass('kt-badge--danger');
            $('#approvalstatus').removeClass('kt-badge--success');
            $('#approvalstatus').removeClass('kt-badge--primary');
            $('#approvalstatus').addClass(result2);

            $('#orderCodeDet').val(data['OrderNo']);
            $('#orderCodeDet1').val(data['OrderNo']);
            $('#orderCodeDetdiss').val(data['OrderNo']);
            $('#productCountTotalOrder').val(data['CountOrder']);
            $('#orderBranchName').val(data['BranchName']);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
};
function OrderDetailChange(d) {

    var orderid = $('#orderGetID').val();
    $.ajax({
        type: 'POST',
        url: '/Order/OrderDetailChange?orderid=' + orderid + '&d=' + d,
        dataType: "json",
        success: function (datefor) {
            if (datefor > 0) {
                ProductCountandOrderCode(datefor);
                ShowBranchOrderListOff(datefor);
                url: '/Center/StateOrderListViewOff?id=' + datefor;
            }
            else if (d == 0)
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı! İlk Sipariştesiniz...", "error");
            else
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Son Sipariştesiniz...", "error");
        },
    });
};
function OrderDetailChangeBranch(d) {

    var orderid = $('#orderGetID').val();
    $.ajax({
        type: 'POST',
        url: '/Order/OrderDetailChange?orderid=' + orderid + '&d=' + d,
        dataType: "json",
        success: function (datefor) {
            if (datefor > 0) {
                ProductCountandOrderCode(datefor);
                ShowBranchOrderListOffForBranch(datefor);
                url: '/Center/StateOrderListViewOff?id=' + datefor;
            }
            else if (d == 0)
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı! İlk Sipariştesiniz...", "error");
            else
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Son Sipariştesiniz...", "error");
        },
    });
};
function DeleteBranchOrder(id) {
    var table = $('#kt_table_getBranchOrderList');
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
                url: '/Order/DeleteBranchOrder/' + id,
                success: function (data) {
                    window.location.href = "Branch/OrderList"
                },
            });
            table.DataTable().ajax.reload();
            debugger
        } else if (result.dismiss === 'cancel') {
            swal.fire(
                "İptal!", "Silme İşlemi İptal Edildi!", "error"
            )
        }
    });
};
