function getStockProducts(dateID) {
    debugger
    var table = $('#product2_table');
    var t = table.DataTable({
        "bDestroy": true,
        ajax: {
            url: '/StoreStock/GetStoreStockReport?Dateforsor=' + dateID,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
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
            buttons: [{
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible'
                },
                customize: function (xlsx) {

                    var sheet = xlsx.xl.worksheets['sheet1.xml'];
                    // jQuery selector to add a border
                    $('row c[r*="G"]', sheet).attr('s', '47');
                    $('row c[r*="A"]', sheet).attr('s', '25');
                    $('row c[r*="B"]', sheet).attr('s', '25');
                    $('row c[r*="C"]', sheet).attr('s', '25');
                    $('row c[r*="D"]', sheet).attr('s', '25');
                    $('row c[r*="E"]', sheet).attr('s', '25');
                    $('row c[r*="F"]', sheet).attr('s', '25');
                    $('row c[r*="H"]', sheet).attr('s', '25');
                    $('row c[r*="I"]', sheet).attr('s', '25');
                    $('row c[r*="J"]', sheet).attr('s', '25');
                    $('row c[r*="2"]', sheet).attr('s', '47');
                    $('c[r=C2] t', sheet).text('Ürün Grubu');
                    $('c[r=A1] t', sheet).text('Depo Stok Raporu');
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
            this.api().columns([2]).every(function () {
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
                data: 'S/N',
                "width": "5%",
                className: 'dt-center',
                orderable: false,
                searchable: false,
            },
            {
                data: 'CurrentName',
            },
            {
                data: 'ProductGroup',
            },
            {
                data: 'Barcode',
                className: 'dt-center font-weight-bold',
            },
            {
                data: 'ProductName',
                className: ' font-weight-bold',
            },
            { data: 'UnitName' },
            {
                data: 'Stock',
                className: 'dt-center font-weight-bold bg-green',
            },
            { data: 'Comment' },
            {
                data: 'createdate',
                className: 'dt-center ',
            },
            {
                data: 'createuser',
                className: 'pl-2',
            },
        ],
        order: [[1, 'asc']],

        columnDefs: [

            {
                "orderable": false,
                width: '8%',
                targets: 5,
                render: function (data, type, full, meta) {
                    var result = "";
                    if ((full['UnitName']) == "ADET" || (full['UnitName']) == "adet" || (full['UnitName']) == "Adet") {
                        result = `<div style="width:100%; color:red;  " > ` + full['UnitName'] + `</div> `;

                    }
                    else if (full['UnitName'] == null) {
                        result = `TANIMSIZ`;

                    }
                    else
                        result = full['UnitName'];
                    return result;
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    var result = `<div class="pt-2" style="color:blue;"><b>` + full['ProductGroup'] + `</b> </div>`;
                    return result;
                },
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    var result = `<div class="pt-2" style="color:red;"><b>` + full['ProductName'] + `</b> </div>`;
                    return result;
                },
            },
            {
                targets: 0,
                render: function (data, type, full, meta) {
                    result = meta.row + 1;
                    return result;
                }
            },
            {
                targets: -2,
                render: function (data, type, full, meta) {
                    var id = full['CreateDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm');
                    return result;
                },
            },
        ],
        lengthChange: false,

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });
    t.on('draw.dt', function () {
        var PageInfo = $('#product2_table').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};
function getProductBaseStock(StartDate, EndDate, bool) {
    debugger
    var table = $('#kt_table_getPBWareHouseStock');
    var t = table.DataTable({
        ajax: {
            url: '/StoreStock/GetProductStoreStockReport?StartDate=' + StartDate + '&EndDate=' + EndDate + '&check=' + bool,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left pt-2 pr-0 mr-0'f><'col-sm-6 pl-0 ml-0 text-left'<"toolbar">><'col-sm-3 text-right'B>>
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
        "paging": false,
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
            this.api().columns([4]).every(function () {
                var column = this;
                $(column.header()).empty();
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Birim</option></select>')
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
                "width": "4%",
            },
            {
                data: 'ProductGroup',
                "width": "9%",
                className: 'font-weight-bold',
                orderable: false,
            },
            {
                data: 'Barcode',
                className: 'dt-center font-weight-bold',
                "width": "10%",
            },
            {
                data: 'ProductName',
                orderable: false,
                "width": "20%",
            },
            {
                data: 'UnitName',
                "width": "13%", orderable: false,
            },
            {
                data: 'InComing',
                className: 'dt-center font-weight-bold pr-0 mr-0 pl-0 ml-0',
                "width": "4%",
                orderable: false,
            },
            {
                data: 'CommingOut',
                "width": "4%",
                orderable: false,
                className: 'dt-center font-weight-bold pr-0 mr-0 pl-0 ml-0 ',
            },
            {
                data: 'Remaining',
                "width": "4%",
                orderable: false,
                className: 'dt-center font-weight-bold pr-0 mr-0 pl-0 ml-0 ',
            },
        ],
        order: [[3, 'asc']],
        columnDefs: [
            {
                "orderable": false,
                width: '8%',
                targets: 4,
                render: function (data, type, full, meta) {
                    debugger
                    var result = "";
                    if (full['UnitName'] == null) {
                        result = `TANIMSIZ`;

                    }
                    else
                        result = full['UnitName'];
                    return result;
                }
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    var result = `<div class="pt-2" style="color:blue;"><b>` + full['ProductGroup'] + `</b> </div>`;
                    return result;
                },
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var result = `<div class="pt-2" style="color:red;"><b>` + full['ProductName'] + `</b> </div>`;
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
                targets: 5,
                render: function (data, type, full, meta) {
                    result = ``;
                    if (full['InComing'] == "")
                        result = 0;
                    else {
                        var totalPrintFormat = full['InComing'].toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && totalPrintFormat.length > 3) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                            result = last
                        }
                    }
                    var result = `<div class="pt-2  bg-danger" style="color:blue;"><b>` + result + `</b> </div>`;
                    return result;
                }
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    result = ``;
                    if (full['CommingOut'] == "")
                        result = 0;
                    else {
                        var totalPrintFormat = full['CommingOut'].toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        result = last
                    }
                    var result = `<div class="pt-2  bg-primary" style="color:blue;"><b>` + result + `</b> </div>`;
                    return result;
                }
            },
            {
                targets: 7,
                render: function (data, type, full, meta) {
                    result = ``;
                    if (full['Remaining'] == "") {
                        if (full['InComing'] != "") {
                            var totalPrintFormat = full['InComing'].toString();
                            var last = "";
                            for (var i = totalPrintFormat.length; i > 0; i--) {
                                if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                    last = last + ".";
                                }
                                last = last + totalPrintFormat[totalPrintFormat.length - i];
                            }
                            result = last
                        }
                        else if (full['CommingOut'] != "") {
                            var totalPrintFormat = full['CommingOut'].toString();
                            var last = "";
                            for (var i = totalPrintFormat.length; i > 0; i--) {
                                if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                    last = last + ".";
                                }
                                last = last + totalPrintFormat[totalPrintFormat.length - i];
                            }
                            result = "-" + last
                        }
                        else
                            result = 0;

                    }

                    else if (full['Remaining'] < 0) {
                        var totalPrintFormat = full['Remaining'].toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 4) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        result = last
                    }

                    else {
                        var totalPrintFormat = full['Remaining'].toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        result = last
                    }
                    var result = `<div class="pt-2  bg-success" style="color:blue;"><b>` + result + `</b> </div>`;

                    return result;
                }




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
            debugger

            var tueTotal = api
                .column(5)
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
                .column(6)
                .data()
                .reduce(function (a, b) {
                    var result = intVal(a) + intVal(b);
                    return result
                }, 0);
            debugger
            var totalPrintFormat2 = wedTotal.toString();
            var last2 = "";
            for (var i = totalPrintFormat2.length; i > 0; i--) {
                if (i % 3 == 0 && i != 0 && i != totalPrintFormat2.length && totalPrintFormat2.length > 3) {
                    last2 = last2 + ".";
                }
                last2 = last2 + totalPrintFormat2[totalPrintFormat2.length - i];
            }


            var aaaaaa = api
                .column(7)
                .data()
                .reduce(function (a, b) {
                    var result = intVal(a) + intVal(b);
                    return result
                }, 0);
            debugger
            var totalPrintFormat3 = aaaaaa.toString();
            var last3 = "";
            for (var i = totalPrintFormat3.length; i > 0; i--) {
                if (i % 3 == 0 && i != 0 && i != totalPrintFormat3.length && totalPrintFormat3.length > 4) {
                    last3 = last3 + ".";
                }
                last3 = last3 + totalPrintFormat3[totalPrintFormat3.length - i];
            }



            // Update footer by showing the total with the reference of the column index 
            $(api.column(0).footer()).html('').addClass("bg-primary dt-center");
            $(api.column(1).footer()).html('').addClass("bg-primary dt-center");
            $(api.column(2).footer()).html('').addClass("bg-primary dt-center");
            $(api.column(3).footer()).html('Toplam').addClass("bg-primary dt-center");
            $(api.column(5).footer()).html(last).addClass("dt-center bg-primary");
            $(api.column(6).footer()).html(last2).addClass("bg-primary");
            if (last3 < 0) {
                $(api.column(7).footer()).html(last3).addClass("bg-primary text-danger");
            }
            else {
                $(api.column(7).footer()).html(last3).addClass("bg-primary");
            }

        },

        lengthChange: false,
        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });


    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_getPBWareHouseStock').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    //$("div.toolbar").html(`
    //               <div class="form-group row mb-0 " style="align-self:center;">
    //                                    <label style="align-self: center;" class="col-2 col-form-label pr-0 mr-0">Sıfır Ürünler Gelsin</label>
    //                                    <div style="align-self: center;" class="col-4 pl-0 ml-0">
    //                                        <span style="align-self: center; " class="kt-switch kt-switch--outline kt-switch--icon kt-switch--success pt-1 mt-1">
    //                                            <label class="mb-0" style="align-self: center;">
    //                                                <input id="visibileForPBWarehouseStockReport" type="checkbox" name="">
    //                                                <span></span>
    //                                            </label>
    //                                        </span>
    //                                    </div>
    //                                </div>`
    //);
};

function getBuyingProductList(days) {
    debugger
    var table = $('#table_BuyingProductList').DataTable({
        "bDestroy": true,
        ajax: {
            url: '/StoreStock/ProductStoreList?Dateforsor=' + days,
            type: 'POST',
        },
        "pageLength": -1,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tümü"]],
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left pr-0 mr-0'f><'col-sm-6 pl-0 ml-0 text-left'<"toolbar">><'col-sm-3 text-right'B>>
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
        "paging": false,
        initComplete: function () {
            this.api().columns([2]).every(function () {
                var column = this;
                $(column.header()).empty();
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Cari Adı</option></select>')
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
                data: 'S/N',
                className: 'dt-center',
                searchable: false,
                orderable: false,

            },
            {
                data: 'StockCode',
                orderable: false,
                className: 'details-control',
            },

            {
                data: 'CurrentName',
                orderable: false,
            },
            {
                data: 'CreateDate',
                className: 'dt-center',
                orderable: false,

            },
            {
                data: 'ProductCount',
                orderable: false,
            },
            {
                data: 'Safe',
                orderable: false,
            },
            {
                data: 'Point',
                className: 'dt-center font-weight-bold',
                orderable: false,

            },
            {
                data: 'Box',
                className: 'dt-center font-weight-bold',
                orderable: false,

            },
            {
                data: 'CreateUser',
                className: 'dt-center font-weight-bold',
                orderable: false,

            },

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
                    var id = full['CreateDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm');
                    return result;
                },
            },
            {
                targets: -3,
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
                targets: -4,
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
                targets: -2,
                render: function (data, type, full, meta) {
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
                },
            },

        ],
        lengthChange: false,
        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });
    table.on('draw.dt', function () {
        var PageInfo = $('#table_BuyingProductList').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

};

function destroyChild(row) {
    var table = $("table", row.child());
    table.detach();
    table.DataTable().destroy();
    // And then hide the row
    row.child.hide();
}
function ChangeDatePlusStock(d) {
    debugger
    var myDate = $('#kt_datepicker_2').val();

    $.ajax({
        type: "POST",
        url: '/Definition/ChangeDatePlus?dateforSOR=' + myDate + '&d=' + d,
        success: function (datefor) {
            debugger
            $('#kt_datepicker_3').val(datefor);
            $('#kt_datepicker_2').val(datefor);
            getStockProducts(datefor);
            getBuyingProductList(datefor);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function ChangeDateRangeStock() {
    var StartDate = $('#StartDate').val();
    var EndDate = $('#EndDate').val();
    var bool = $('#visibileForPBWarehouseStockReport').val();

    getProductBaseStock(StartDate, EndDate, bool);
};
function ChangeDatePlusStockBranch(d) {
    debugger
    var myDate = $('#kt_datepicker_2').val();

    $.ajax({
        type: "POST",
        url: '/Definition/ChangeDatePlus?dateforSOR=' + myDate + '&d=' + d,
        success: function (datefor) {
            debugger
            $('#kt_datepicker_3').val(datefor);
            $('#kt_datepicker_2').val(datefor);
            getStockProductsforBranch(datefor);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function PBcheck() {
    var EndDate = $('#EndDate').val();
    var StartDate = $('#StartDate').val();
    var bool = document.getElementById(`visibileForPBWarehouseStockReport`);
    if (bool.value == "false") {
        bool.value = true;
    }
    else
        bool.value = false;

    getProductBaseStock(StartDate, EndDate, bool.value);
};
function getProductsStock() {
    debugger
    var table = $('#product_table');
    var current = $('#AccountModel').val();
    var user = $('#userID').val();
    var t = table.DataTable({
        ajax: {
            url: '/StoreStock/GetProductsForStock?currentID=' + current + '&UserID=' + user,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: {

            },
        },
        "pageLength": -1,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tümü"]],
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
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Sipariş Birimi</option></select>')
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
                data: 'S/N',
                "width": "5%",
                className: 'dt-center',
                orderable: false,
                searchable: false,
            },
            {
                data: 'ProductGroupUrl',
                orderable: false,
            },
            {
                data: 'Barcode',
                className: 'dt-center font-weight-bold',
            },
            {
                data: 'Name',
                "width": "25%",
                className: ' font-weight-bold',
            },

            {
                data: 'Units',
                orderable: false,
            },
            {
                data: 'StockQuantity',
                className: 'dt-center font-weight-bold ',
                "width": "15%",
            },

            {
                data: 'Comment',
                "width": "15%",
                className: 'dt-center',
            },
        ],
        order: [[1, 'asc']],

        columnDefs: [
          
            {
                targets: 3,
                orderable: false,
                render: function (data, type, full, meta) {
                    var id = full['Name'];
                    var id = full['ID'];
                    var result = `<a style="width:100%; cursor:pointer; text-align: left; font-size: 12px; color:red;" onclick="EditProduct(` + full['ID'] + `)" class="btn" title="" ><b>` + full['Name'] + `</b></a>`;
                    return result;
                }
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    var id = full['Comment'];
                    result = `  <div class="" style="justify-content: center;width:100%;">
                                 <input type="text" value="` + id + `" style="min-width:180px;background-color: #f5e9f0;     border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "StockBasket(this.value,` + full['ID'] + `,1)" id = "comment_` + full['ID'] + `" >
                                </div>`;

                    return result;
                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    var id = full['StockQuantity'];
                    result = `  <div class="" style="justify-content: center;width:100%;">
                                 <input type="number" value="` + id + `" style="min-width:180px;background-color: #f5e9f0;     border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "StockBasket(this.value,` + full['ID'] + `,0)" id = "comment_` + full['ID'] + `" >
                                </div>`;

                    return result;
                }
            },
            {
                targets: 0,
                render: function (data, type, full, meta) {
                    result = ``;
                    return result;
                }
            },

            {
                targets: 4,
                render: function (data, type, full, meta) {
                    var unitname = full['UnitName'];
                    if (unitname == null)
                        unitname = "Tanımsız";
                    var result = `<a style="width:100%; cursor:pointer; text-align: left; font-size: 12px; color:red;"  class="btn" title="" ><b>` + unitname + `</b></a>`;
                    return result;
                }
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = "";
                    switch (full['ProductGroupUrl']) {
                        case `, , `:
                            result = `Grup Tanımlı Değil`;
                            break;
                        default:
                            result = `<span style="color:blue;"><b>` + full['ProductGroupUrl'] + `</b></span>`;
                            break;
                    }
                    return result;
                }
            },

        ],
        lengthChange: false,

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });
    t.on('draw.dt', function () {
        var PageInfo = $('#product_table').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};

function StockBasket(val, id, d) {
    debugger
    var current = $('#AccountModel').val();
    var user = $('#userID').val();
    var stock;
    var comment;
    if (d == 0) {
        stock = val;
        comment = "";
    }
    else {
        stock = 0;
        comment = val;
    }
    $.ajax({
        type: 'POST',
        url: '/StoreStock/SaveBasketStock?Currentid=' + current + '&productID=' + id + '&StockQuantity=' + stock + '&Comment=' + comment + '&currentUser=' + user,
        dataType: "json",
    });
};


function SaveStoreStock() {
    debugger
    var current = $('#AccountModel').val();
    var user = $('#userID').val();
    var date = $('#kt_datepicker_2').val();

    $.ajax({
        type: 'POST',
        url: '/StoreStock/SaveStoreStock?Currentid=' + current + '&currentUser=' + user + '&Dateforsor=' + date,
        dataType: "json",
    });
    window.location.reload();
};


function getStockProductsforBranch(days,days2) {
    debugger
    var table = $('#table_BuyingProductList').DataTable({
        "bDestroy": true,
        ajax: {
            url: '/StoreStock/GetStockReportFollow?StartDate=' + days + '&EndDate=' + days2 ,
            type: 'POST',
        },
        "pageLength": -1,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tümü"]],
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left pr-0 mr-0'f><'col-sm-6 pl-0 ml-0 text-left'<"toolbar">><'col-sm-3 text-right'B>>
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
        "paging": false,
        initComplete: function () {
            this.api().columns([2]).every(function () {
                var column = this;
                $(column.header()).empty();
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Depo Adı</option></select>')
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
                data: 'S/N',
                className: 'dt-center',
                searchable: false,
                orderable: false,
            },
            {
                data: 'StockCode',
                orderable: false,
                className: 'details-control dt-center ',
            },
            {
                data: 'CurrentName',
                orderable: false,
            },
            {
                data: 'CreateDate',
                className: 'dt-center font-weight-bold',
                orderable: false,
            },
            {
                data: 'ProductCount',
                orderable: false,
                className: ' dt-center',

            },
            {
                data: 'Safe',
                orderable: false,
                className: ' dt-center',

            },
            {
                data: 'Point',
                className: 'dt-center font-weight-bold',
                orderable: false,
            },
            {
                data: 'Box',
                className: 'dt-center font-weight-bold',
                orderable: false,
            },
            {
                data: 'CreateUser',
                className: 'dt-center font-weight-bold',
                orderable: false,
            },
            {
                data: 'İşlemler',
                className: 'pl-2',
                orderable: false,
                width: '10%',

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
                targets: 2,
                render: function (data, type, full, meta) {
                    var returnHtml = `<span style="color:red;"><b>` + full['CurrentName'] + `</b></span>`;
                    return returnHtml;
                },
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    var returnHtml = `<span style="color:blue;"><b>` + full['StockCode'] + `</b></span>`;
                    return returnHtml;
                },
            },
            {
                targets: -1,
                title: 'İşlemler',
                orderable: false,
                "width": "5%",
                render: function (data, type, full, meta) {
                    var result = `
                         <a href="/Center/StockReportUpdate?id=` + full['ID'] + `" onclick="ShowStock(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Görüntüle">
                          <i class="la la-eye"></i>
                         </a>
                        <a  onclick="DeleteStock(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Sil">
                          <i class="la la-trash"></i>
                         </a>`;
                    return result;
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var id = full['CreateDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm');
                    return result;
                },
            },
            {
                targets: 6,
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
                targets: 7,
                render: function (data, type, full, meta) {
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
                },
            },

        ],
        lengthChange: false,

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });
    table.on('draw.dt', function () {
        var PageInfo = $('#table_BuyingProductList').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

};
function SaveStoreStockForBranch() {
    debugger

    var BranchID = $('#BranchID').val();
    var user = $('#userID').val();
    var date = $('#kt_datepicker_2').val();
    var username = $('#userName').val();
    if (username!="") {
        $.ajax({
            type: 'POST',
            url: '/StoreStock/SaveStoreStockForBranch?BranchID=' + BranchID + '&currentUser=' + user + '&Dateforsor=' + date + '&UserName=' + username,
            dataType: "json",
        });
        window.location.reload();
    }
};

function DeleteStock(id) {
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
                url: '/StoreStock/DeleteStock?id=' + id,
                success: function (data) {
                    window.location.reload();
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


function StockBasketBranch(val, id, d) {
    debugger
    var BranchID = $('#BranchID').val();
    var user = $('#userID').val();
    var stock;
    var comment;
    if (d == 0) {
        stock = val;
        comment = "";
    }
    else {
        stock = 0.1;
        comment = val;
    }
    if (stock == "")
        stock = 0;
    $.ajax({
        type: 'POST',
        url: '/StoreStock/SaveBasketStockBranch?BranchID=' + BranchID + '&productID=' + id + '&StockQuantity=' + stock + '&Comment=' + comment + '&currentUser=' + user,
        dataType: "json",
    });
};

function StockBasketBranchForUpdate(val, id, d, stokID) {
    debugger
    var stock;
    var comment;
    if (d == 0) {
        stock = val;
        comment = "";
    }
    else {
        stock = 0;
        comment = val;
    }
    $.ajax({
        type: 'POST',
        url: '/StoreStock/SaveBasketStockBranchForUpdate?StokID=' + stokID + '&StockQuantity=' + stock + '&Comment=' + comment + '&ProdID=' + id,
        dataType: "json",
    });
};
function getProductsStockForBranch() {
    debugger
    var table = $('#product_table');
    var BranchID = $('#BranchID').val();
    var user = $('#userID').val();
    var t = table.DataTable({
        ajax: {
            url: '/StoreStock/GetProductsForStockBranch?BranchID=' + BranchID + '&UserID=' + user,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: {

            },
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left'f><'col-sm-8 pl-0 ml-0 text-left'<"toolbar">><'col-sm-1 text-right'B>>
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
            //this.api().columns([4]).every(function () {
            //    var column = this;
            //    $(column.header()).empty();
            //    var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Sipariş Birimi</option></select>')
            //        .appendTo($(column.header()))
            //        .on('change', function () {
            //            var val = $.fn.dataTable.util.escapeRegex(
            //                $(this).val()
            //            );

            //            column
            //                .search(val ? '^' + val + '$' : '', true, false)
            //                .draw();
            //        });

            //    column.data().unique().sort().each(function (d, j) {

            //        select.append('<option value="' + d + '">' + d + '</option>')

            //    });
            //});
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
                data: 'S/N',
                "width": "5%",
                className: 'dt-center',
                orderable: false,
                searchable: false,
            },
            {
                data: 'ProductGroupUrl',
                orderable: false,
                "width": "10%",
                className: 'font-weight-bold text-info',
            },
            {
                data: 'Barcode',
                className: 'dt-center font-weight-bold',
                orderable: false,
                "width": "5%",

            },
            {
                data: 'Name',
                "width": "20%",
                className: ' font-weight-bold',
                orderable: false,

            },

            {
                data: 'StockQuantity',
                className: 'dt-center font-weight-bold ',
                "width": "14%",
                orderable: false,

            },

            {
                data: 'Comment',
                "width": "20%",
                className: 'dt-center',
                orderable: false,

            },
            {
                visible: false,
                data: 'Prodgrp2',
            },
        ],
        order: [[6, 'asc'], [3, 'asc']],
        columnDefs: [
            {
                // hide columns by index number
                targets: 6,
                visible: false,
                render: function (data, type, full, meta) {
                    var a = full['Prodgrp2'];
                    return a;
                }
            },
            {
                targets: 3,
                orderable: false,
                render: function (data, type, full, meta) {
                    var id = full['Name'];
                    var id = full['ID'];
                    var result = `<a style=" width:100%; cursor:pointer; text-align: left; font-size: 12px; color:red;" onclick="EditProduct(` + full['ID'] + `)" class="btn pt-1 pb-1" title="" ><b>` + full['Name'] + `</b></a>`;
                    return result;
                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    var id = full['Comment'];
                    result = `  <div class="" style="justify-content: center;width:100%;">
                                 <input type="text" value="` + id + `" style="height: 20px;min-width:180px;background-color: #f5e9f0; border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "StockBasketBranch(this.value,` + full['ID'] + `,1)" id = "comment_` + full['ID'] + `" >
                                </div>`;

                    return result;
                }
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    if (((full['UnitName']) == "ADET" || (full['UnitName']) == "adet" || (full['UnitName']) == "Adet")) {
                        var returnHtml = `<input disabled type="text" value="` + full['UnitName'] + `" style="height: 20px; border-top-left-radius: 0px;border-bottom-left-radius: 0px;text-align: center;width:65px;background-color: #f5e9f0;color: red; border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn">`;
                    }
                    else {
                        var returnHtml = `<input disabled type="text" value="` + full['UnitName'] + `" style="height: 20px; border-top-left-radius: 0px;border-bottom-left-radius: 0px;text-align: center;width:65px;background-color: #f5e9f0; border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn">`;
                    }
                    debugger
                    var id =full['StockQuantity'];
                    result = `  <div class="row" style="justify-content: center;width:100%; min-width:170px;">

                    <input type="text" value="` + id + `" style=" height: 20px; border-top-right-radius: 0px;border-bottom-right-radius: 0px;width: 100px;background-color: #f5e9f0; border: 2px solid #ffd3e2;font-size: 11px;border-right: transparent;" type="text" class="form-control" onkeydown="UpDownKey2(event)"  oninput= "StockBasketBranch(this.value,` + full['ID'] + `,0)" id = "comment_` + full['ID'] + `" >
                  
                    `+ returnHtml + `
                    </div>`;
                    return result;
                }
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
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = "";
                    switch (full['ProductGroupUrl']) {
                        case `, , `:
                            result = `Grup Tanımlı Değil`;
                            break;
                        default:
                            result = full['ProductGroupUrl'];
                            break;
                    }
                    return result;
                }
            },

        ],
        lengthChange: false,

        responsive: false,
        "scrollX": true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });
    t.on('draw.dt', function () {
        var PageInfo = $('#product_table').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    $("div.toolbar").html(`
                     <div class="col-lg-6" style="margin-left: auto;">
                        <div class="row">
                            <div class="col-lg-12">
                                <input type="text" id="userName" name="userName" class="form-control" style="font-size:11px" placeholder="Stoğu Oluşturan Kişi" required>
                            </div>
                        </div>
                    </div>`
    );
};
function getInfo(id) {
    $.ajax({
        type: "POST",
        url: '/StoreStock/GetProductsForStockBranchUpdateInfo?StokID=' + id,
        success: function (data) {
            debugger
            $('#BranchForStok').val(data['BranchName']);

            var result = moment(data['CreateDate']).format('DD.MM.YYYY');

            $('#dateForStok').val(result);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Sipariş No bulunamadı", "error");
        }
    });
};
function getProductsStockForBranchUpdate(id) {
    debugger
    var stokID = id;
    var table = $('#stockUpdate_table');
    var t = table.DataTable({
        ajax: {
            url: '/StoreStock/GetProductsForStockBranchUpdate?StokID=' + id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: {

            },
        },
        "pageLength": -1,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tümü"]],
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
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Sipariş Birimi</option></select>')
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
                data: 'S/N',
                "width": "5%",
                className: 'dt-center',
                orderable: false,
                searchable: false,
            },
            {
                data: 'ProductGroupUrl',
            },
            {
                data: 'Barcode',
                className: 'dt-center',
            },
            {
                data: 'Name',
                "width": "25%",
                className: ' font-weight-bold',
            },
            {
                data: 'Units',
                orderable: false,
            },
            {
                data: 'StockQuantity',
                className: 'dt-center font-weight-bold ',
                "width": "22%",
            },
            {
                data: 'Comment',
                "width": "15%",
                className: 'dt-center',
            },
        ],
        order: [[1, 'asc']],
        columnDefs: [
            {
                targets: 3,
                orderable: false,
                render: function (data, type, full, meta) {
                    var id = full['Name'];
                    var id = full['ID'];
                    var result = `<a style="width:100%; cursor:pointer; text-align: left; font-size: 12px; color:red;" onclick="EditProduct(` + full['ID'] + `)" class="btn" title="" ><b>` + full['Name'] + `</b></a>`;
                    return result;
                }
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    var id = full['Comment'];
                    result = `  <div class="" style="justify-content: center;width:100%;">
                                 <input type="text" value="` + id + `" style="min-width:180px;background-color: #f5e9f0;border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "StockBasketBranchForUpdate(this.value,` + full['ID'] + `,1,` + stokID + `)" id = "comment_` + full['ID'] + `" >
                                </div>`;

                    return result;
                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    if (((full['UnitName']) == "ADET" || (full['UnitName']) == "adet" || (full['UnitName']) == "Adet")) {
                        var returnHtml = `<input disabled type="text" value="` + full['UnitName'] + `" style="border-top-left-radius: 0px;border-bottom-left-radius: 0px;text-align: center;width:65px;background-color: #f5e9f0;color: red; border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn">`;
                    }
                    else {
                        var returnHtml = `<input disabled type="text" value="` + full['UnitName'] + `" style="border-top-left-radius: 0px;border-bottom-left-radius: 0px;text-align: center;width:65px;background-color: #f5e9f0; border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn">`;
                    }
                    var id = full['StockQuantity'];
                    result = `  <div class="row" style="justify-content: center;width:100%;">
                    <input type="number" value="` + id + `" style="border-top-right-radius: 0px;border-bottom-right-radius: 0px;width: 100px;background-color: #f5e9f0; border: 2px solid #ffd3e2;font-size: 11px;border-right: transparent;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "StockBasketBranch(this.value,` + full['ID'] + `,0)" id = "comment_` + full['ID'] + `" >
                  
                    `+ returnHtml + `
                    </div>`;
                    return result;
                }
            },
            {
                targets: 0,
                render: function (data, type, full, meta) {
                    result = ``;
                    return result;
                }
            },

            {
                targets: 4,
                render: function (data, type, full, meta) {
                    var result = `<a style="width:100%; cursor:pointer; text-align: left; font-size: 12px; color:red;"  class="btn" title="" ><b>` + full['UnitName'] + `</b></a>`;
                    return result;
                }
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = "";
                    switch (full['ProductGroupUrl']) {
                        case `, , `:
                            result = `Grup Tanımlı Değil`;
                            break;
                        default:
                            result = full['ProductGroupUrl'];
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
        var PageInfo = $('#stockUpdate_table').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};
