function getProductsReportHorizontal(days/*, format, region*/) {
    debugger
    var color = "blue";

    var table = $('#product_Horizontal').DataTable({
        
        "bDestroy": true,

        ajax: {
            url: '/Definition/getProductsReportHorizontal?dateforSOR=' + days /*+ '&format=' + format + '&region=' + region*/,
            type: 'POST',
        },
        "pageLength": -1,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tümü"]],
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `
            <'row'<'col-sm-4 text-left pr-0 mr-0'f><'col-sm-7 pr-0 mr-0 text-right'<"toolbar">><'col-sm-1 pl-0 ml-0 text-right'B>>
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
        "info": false,
        drawCallback: function (settings) {
            var api = this.api();
            var rows = api.rows({ page: 'current' }).nodes();
            var last = null;

            api.column(3, { page: 'current' }).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="group "><td class="bg-primary" style="padding-left: 10px;height: 20px;font-weight: bolder;font-size: 12px;" colspan="20">' + group + '</td></tr>',
                    );
                    last = group;
                }
            });
            //api.column(3, { page: 'current' }).data().each(function (group, i) {
            //    if (last !== group) {
            //        $(rows).eq(i).after(
            //            '<tr class="group "><td class="bg-success" style="padding-left: 10px;height: 20px;font-weight: bolder;font-size: 12px;" colspan="20">' + + '</td></tr>',
            //        );
            //        last = group;
            //    }
            //});
        },

        order: [[4, 'asc'], [2, 'asc']],
        columns: [
            
            {
                data: 'S/N',
                className: 'dt-center',
                searchable: false,
                orderable: false,

            },

            {
                data: 'Barcode',
                className: 'dt-center font-weight-bold',
                orderable: false,
            },
            {
                data: 'Name',
                orderable: false,
            },

            {
                data: 'ProductGroupUrl',
                className: 'dt-center',
                orderable: false,
                visible: false,

            },
            {
                data: 'GroupID',
                className: 'dt-center',
                orderable: false,
                visible: false,

            },
            {
                data: 'Units',
                className: 'dt-center',
                orderable: false,
            },
            {
                data: 'OrderCount',
                className: 'dt-center ',
                orderable: false,

            },
            {
                data: 'branch0',
                className: 'dt-center font-weight-500',
                orderable: false,


            },
            {
                data: 'branch1',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch2',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch3',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch4',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch5',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch6',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch7',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch8',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch9',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch10',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch11',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch12',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch13',
                className: 'dt-center font-weight-500',
                orderable: false,

            },
            {
                data: 'branch14',
                className: 'dt-center font-weight-500',
                orderable: false,

            },

        ],
        columnDefs: [

            {
                targets: 0,
                render: function (data, type, full, meta) {

                    result = ``;
                    if (full['Units'] == "adet" || full['Units'] == "ADET" || full['Units'] == "Adet") {
                        color = "red";
                    }
                    else
                        color = "blue";
                    return result;
                   
                    
                   
                }
                
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    var returnHtml = '';
                   
                    if (full['Units'] == "adet" || full['Units'] == "ADET" || full['Units'] == "Adet") {
                        returnHtml = `<div  style="color:red;"><b> ` + full['Units'] + `</b></div> `;
                    }
                    else  {
                        returnHtml = `<div  ><b> ` + full['Units'] + `</b></div> `;
                    }
                    return returnHtml;
                }
                
            },
            {
                targets: 2,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:red;"><b> ` + full['Name'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 6,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:red;"><b> ` + full['OrderCount'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 7,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "> <a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme'] + `)" style="cursor:pointer;"  > ` + full['branch0'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 8,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" >

            <a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme1'] + `)" style="cursor:pointer;"  > ` + full['branch1'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 9,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme2'] + `)" style="cursor:pointer;"  > ` + full['branch2'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 10,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" " ><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme3'] + `)" style="cursor:pointer;"  > ` + full['branch3'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 11,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme4'] + `)" style="cursor:pointer;"  > ` + full['branch4'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 12,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme5'] + `)" style="cursor:pointer;"  > ` + full['branch5'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 13,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme6'] + `)" style="cursor:pointer;"  > ` + full['branch6'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 14,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme7'] + `)" style="cursor:pointer;"  > ` + full['branch7'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 15,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme8'] + `)" style="cursor:pointer;"  > ` + full['branch8'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 16,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme9'] + `)" style="cursor:pointer;"  > ` + full['branch9'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 17,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme10'] + `)" style="cursor:pointer;"  > ` + full['branch10'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 18,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme11'] + `)" style="cursor:pointer;"  > ` + full['branch11'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 19,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme12'] + `)" style="cursor:pointer;"  > ` + full['branch12'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 20,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme13'] + `)" style="cursor:pointer;"  > ` + full['branch13'] + `</a></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 21,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger


                    var returnHtml = `<div  style="color:` + color + `;font-weight: bold;" "><a onclick="OpenStateOrderRepModal(` + full['ID'] + `,` + full['deneme14'] + `)" style="cursor:pointer;"  > ` + full['branch14'] + `</a></div> `;
                    return returnHtml;
                },
            },

        ],

        responsive: false,
        "scrollX": true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,
        "footerCallback": function (row, data, start, end, display) {

            debugger
            var api = this.api(), data;
            // converting to interger to find total
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // computing column Total of the complete result 
            var tueTotal4 = api
                .column(5)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal4 = (tueTotal4).toLocaleString('tr');


            var tueTotal5 = api
                .column(6)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal5 = (tueTotal5).toLocaleString('tr');


            var tueTotal6 = api
                .column(7)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal6 = (tueTotal6).toLocaleString('tr');


            var tueTotal7 = api
                .column(8)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal7 = (tueTotal7).toLocaleString('tr');

            var tueTotal8 = api
                .column(9)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal8 = (tueTotal8).toLocaleString('tr');

            var tueTotal9 = api
                .column(10)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal9 = (tueTotal9).toLocaleString('tr');

            var tueTotal10 = api
                .column(11)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal10 = (tueTotal10).toLocaleString('tr');

            var tueTotal11 = api
                .column(12)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal11 = (tueTotal11).toLocaleString('tr');

            var tueTotal12 = api
                .column(13)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal12 = (tueTotal12).toLocaleString('tr');

            var tueTotal13 = api
                .column(14)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal13 = (tueTotal13).toLocaleString('tr');

            var tueTotal14 = api
                .column(15)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal14 = (tueTotal14).toLocaleString('tr');

            var tueTotal15 = api
                .column(16)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal15 = (tueTotal15).toLocaleString('tr');

            var tueTotal16 = api
                .column(17)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal16 = (tueTotal16).toLocaleString('tr');

            var tueTotal18 = api
                .column(17)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal18 = (tueTotal18).toLocaleString('tr');

            var tueTotal19 = api
                .column(18)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal19 = (tueTotal19).toLocaleString('tr');


            var tueTotal20 = api
                .column(19)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            tueTotal20 = (tueTotal20).toLocaleString('tr');

            //// Update footer by showing the total with the reference of the column index 
            $(api.column(0).footer()).html('').addClass("bg-primary dt-center");
            $(api.column(1).footer()).html(' ').addClass("bg-primary dt-center");
            $(api.column(2).footer()).html('Toplam').addClass("bg-primary dt-center");
            $(api.column(5).footer()).html('').addClass("bg-primary");
            $(api.column(6).footer()).html(tueTotal5).addClass("bg-primary");
            $(api.column(7).footer()).html(tueTotal6).addClass("bg-primary dt-center");
            $(api.column(8).footer()).html(tueTotal7).addClass("dt-center bg-primary");
            $(api.column(9).footer()).html(tueTotal8).addClass("bg-primary");
            $(api.column(10).footer()).html(tueTotal9).addClass("bg-primary");
            $(api.column(11).footer()).html(tueTotal10).addClass("bg-primary");
            $(api.column(12).footer()).html(tueTotal11).addClass("bg-primary dt-center");
            $(api.column(13).footer()).html(tueTotal12).addClass("bg-primary dt-center");
            $(api.column(14).footer()).html(tueTotal13).addClass("bg-primary dt-center");
            $(api.column(15).footer()).html(tueTotal14).addClass("bg-primary dt-center");
            $(api.column(16).footer()).html(tueTotal15).addClass("bg-primary dt-center");
            $(api.column(17).footer()).html(tueTotal16).addClass("bg-primary dt-center");
            $(api.column(18).footer()).html(tueTotal16).addClass("bg-primary dt-center");
            $(api.column(19).footer()).html(tueTotal19).addClass("bg-primary dt-center");
            $(api.column(20).footer()).html(tueTotal19).addClass("bg-primary dt-center");
            $(api.column(21).footer()).html(tueTotal19).addClass("bg-primary dt-center");

        },


    });
    table.on('draw.dt', function () {
        var PageInfo = $('#product_Horizontal').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

    $("div.toolbar").html(`
                   

   <a href="/Center/StateOrderReport"  class="kt-menu__link pr-0" title="Yatay Mağaza Görünümü">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class=" svg-icon svg-icon-primary " style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect x="0" y="0" width="24" height="24"/>
        <rect fill="#003366" x="5" y="4" width="6" height="16" rx="1.5"/>
        <rect fill="#003366" opacity="0.3" x="13" y="4" width="6" height="16" rx="1.5"/>
    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                                    <a class="kt-menu__link">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class="svg-icon svg-icon-primary" style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect x="0" y="0" width="24" height="24"/>
        <rect fill="#ffb822" opacity="0.3" x="4" y="5" width="16" height="6" rx="1.5"/>
        <rect fill="#ffb822" x="4" y="13" width="16" height="6" rx="1.5"/>
    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                        

                  `
    );
};


function SubmitModal(days) {
    debugger


    var table = $(`#table_` + days).DataTable();
    table.ajax.reload();
    var table2 = $(`#product_Horizontal`).DataTable();
    table2.ajax.reload();
};

function getProductsReport(days) {

    var table = $('#product_deneme').DataTable({
        "bDestroy": true,
        ajax: {
            url: '/Definition/GetProductsForStateOrderReports?dateforSOR=' + days,
            type: 'POST',
        },
        "pageLength": -1,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tümü"]],
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `
            <'row'<'col-sm-4 text-left pr-0 mr-0'f><'col-sm-7 text-left'<"toolbar">><'col-sm-1 text-right'B>>
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
                    footer: true,
                    exportOptions: {
                        orthogonal: 'export',
                        columns: [1, 2, 3, 4, 5, 6, 7, 8]
                    },
                    customize: function (xlsx) {

                        var a = Date.now();
                        var sheet = xlsx.xl.worksheets['sheet1.xml'];
                        var col = $('col', sheet);
                        $(col[0]).attr('width', 5);
                        $(col[1]).attr('width', 10);
                        $(col[3]).attr('width', 26);
                        $(col[4]).attr('width', 10);
                        $(col[5]).attr('width', 10);
                        $(col[6]).attr('width', 15);
                        $(col[7]).attr('width', 16);

                        $('c[r=A1] t', sheet).text('Hal Sipariş Raporu - ' + days);

                        $('c[r=B2] t', sheet).text('Ürün Grubu');
                        $('c[r=E2] t', sheet).text('Birim');
                        $('row c[r*="A"]', sheet).attr('s', '9');
                        $('row c[r*="B"]', sheet).attr('s', '9');
                        $('row c[r*="C"]', sheet).attr('s', '9');
                        $('row c[r*="D"]', sheet).attr('s', '8');
                        $('row c[r*="E"]', sheet).attr('s', '9');
                        $('row c[r*="F"]', sheet).attr('s', '9');
                        $('row c[r*="G"]', sheet).attr('s', '9');
                        $('row c[r*="H"]', sheet).attr('s', '9');
                        $('row c[r*="I"]', sheet).attr('s', '9');
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
                        $('row c[r="G2"]', sheet).attr('s', '30');
                        $('row c[r="H2"]', sheet).attr('s', '30');
                        $('row c[r="I2"]', sheet).attr('s', '30');
                        $('row:first c', sheet).attr('s', '2');
                        var new_style = '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="https://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><numFmts count="2"><numFmt numFmtId="171" formatCode="d/mm/yyyy;@"/><numFmt numFmtId="172" formatCode="m/d/yyyy;@"/></numFmts><fonts count="10" x14ac:knownFonts="1"><font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><b/><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color theme="0"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><i/><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color rgb="FFC00000"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color rgb="FF006600"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color rgb="FF990033"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><sz val="11"/><color rgb="FF663300"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><b/><sz val="11"/><color rgb="FFC00000"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts><fills count="16"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFC00000"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFF0000"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFC000"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFFF00"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF92D050"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF00B050"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF00B0F0"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0070C0"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF002060"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF7030A0"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor theme="1"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF99CC00"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFF9999"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFCC00"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color indexed="64"/></left><right style="thin"><color indexed="64"/></right><top style="thin"><color indexed="64"/></top><bottom style="thin"><color indexed="64"/></bottom><diagonal/></border></borders><cellStyleXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/><xf numFmtId="9" fontId="1" fillId="0" borderId="0" applyFont="0" applyFill="0" applyBorder="0" applyAlignment="0" applyProtection="0"/></cellStyleXfs><cellXfs count="70"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="4" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="4" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="4" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="5" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="6" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="7" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="8" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="9" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="10" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="11" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="12" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="5" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="6" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="7" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="8" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="9" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="10" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="11" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="12" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="4" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="5" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="6" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="7" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="8" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="9" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="10" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="11" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="3" fillId="12" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top" textRotation="90"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" textRotation="255"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment textRotation="45"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="0" fontId="5" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="top"/></xf><xf numFmtId="0" fontId="6" fillId="13" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="6" fillId="13" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="7" fillId="14" borderId="0" xfId="1" applyNumberFormat="1" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="7" fillId="14" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="8" fillId="15" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="8" fillId="15" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf><xf numFmtId="171" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="172" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="171" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="172" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="171" fontId="9" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="172" fontId="9" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="171" fontId="9" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf><xf numFmtId="172" fontId="9" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf></cellXfs><cellStyles count="2"><cellStyle name="Procent" xfId="1" builtinId="5"/><cellStyle name="Standaard" xfId="0" builtinId="0"/></cellStyles><dxfs count="0"/><tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/><colors><mruColors><color rgb="FF663300"/><color rgb="FFFFCC00"/><color rgb="FF990033"/><color rgb="FF006600"/><color rgb="FFFF9999"/><color rgb="FF99CC00"/></mruColors></colors><extLst><ext uri="{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}" xmlns:x14="https://schemas.microsoft.com/office/spreadsheetml/2009/9/main"><x14:slicerStyles defaultSlicerStyle="SlicerStyleLight1"/></ext></extLst></styleSheet>';
                        xlsx.xl['styles.xml'] = $.parseXML(new_style);

                        var tagName = sheet.getElementsByTagName('sz');
                        for (i = 0; i < tagName.length; i++) {
                            tagName[i].setAttribute("val", "22")
                        }
                        //    $('row:last c', sheet).attr('s', '47');
                    },
                    customizeData: function (data) {
                        //    for (var i = 0; i < data.body.length; i++) {
                        //        for (var j = 0; j < data.body[i].length; j++) {
                        //            data.body[i][4] = '\u200C' + data.body[i][4];
                        //        }

                        //    }
                        //    for (var i = 0; i < data.body.length; i++) {
                        //        for (var j = 0; j < data.body[i].length; j++) {
                        //            data.body[i][2] = '\u200C' + data.body[i][2];
                        //        }
                        //    }
                        for (var i = 0; i < data.body.length; i++) {
                            for (var j = 0; j < data.body[i].length; j++) {
                                data.body[i][0] = (i + 1);
                            }
                        }
                        //    for (var i = 0; i < data.footer.length; i++) {

                        //        data.footer[2] = '\u200C' + data.footer[2];
                        //        data.footer[4] = '\u200C' + data.footer[4];
                        //    }
                    }
                },
                'print',
                'csv',
                'pdf',
                'copy',
                'colvis',
            ],
        }],
        order: [[9, 'asc'], [2, 'asc'], [4, 'asc']],
        drawCallback: function (settings) {
            var api = this.api();
            var rows = api.rows({ page: 'current' }).nodes();
            var last = null;

            api.column(2, { page: 'current' }).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="group "><td class="bg-primary" style="padding-left: 10px;height: 35px;font-weight: bolder;font-size: 12px;" colspan="9">' + group + '</td></tr>',
                    );
                    last = group;
                }
            });
        },
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
            this.api().columns([5]).every(function () {
                var column = this;
                $(column.header()).empty();
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Birim</option></select>')
                    .appendTo($(column.header()))
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(this.value)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {

                    select.append('<option value="' + d + '">' + d + '</option>')

                });
            });
        },
        columns: [
            {
                orderable: false,
                className: 'details-control',
                data: null,
            },
            {
                data: 'S/N',
                className: 'dt-center',
                searchable: false,
                orderable: false,

            },
            {
                data: 'ProductGroupUrl',
                orderable: false,
                className: 'text-info font-weight-bold',

            },
            {
                data: 'Barcode',
                className: 'dt-center',
                orderable: false,
                className: 'font-weight-bold',
            },
            {
                data: 'Name',
                orderable: false,
            },
            {
                data: 'Units',
                orderable: false,
            },
            {
                data: 'DepotStock',
                className: 'dt-center font-weight-bold',
                orderable: false,

            },
            {
                data: 'OrderCount',
                className: 'dt-center font-weight-bold',
                orderable: false,

            },
            {
                data: 'StockDist',
                className: 'dt-center font-weight-bold',
                orderable: false,

            },
            {
                data: 'GroupID',
            },
        ],
        columnDefs: [
            {
                // hide columns by index number
                targets: 9,
                visible: false,
                render: function (data, type, full, meta) {
                    var a = full['GroupID'];
                    return a;
                }
            },
            {
                targets: 0,
                "className": 'details-control',
                width: '25px',
                render: function (data, type, full, meta) {

                    return `
                        <a class="btn btn-sm btn-clean btn-icon btn-icon-md" style="height:23px" title="Açıklama" id="` + days + `` + full['ID'] + `" value="` + days + `` + full['ID'] + `">
                            <i class="fa fa-2x fa-caret-right" style="color:green;"></i>
                        </a>`;
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
                "orderable": false,
                width: '12%',
                targets: 2,
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
            {
                targets: 4,
                "render": function (data, type, full, meta) {
                    return `<div style="width:100%; color:red; font-weight: bold; font-size:12px; "> ` + full['Name'] + `</div> `;
                }
            },
            {
                targets: 6,
                "render": function (data, type, full, meta) {
                    return `<div style="width:100%; color:blue; font-weight: bold; font-size:12px; " > ` + full['DepotStock'] + `</div> `;
                }
            },
            {
                targets: 7,
                "render": function (data, type, full, meta) {
                    return `<div style="width:100%; color:red; font-weight: bold; font-size:12px; " > ` + full['OrderCount'] + `</div>`;
                }
            },
            {
                "orderable": false,
                width: '8%',
                targets: 5,
                render: function (data, type, full, meta) {

                    var result = "";
                    if (full['Units'] == null) {
                        result = `TANIMSIZ`;

                    }
                    else if (full['Units'] == "ADET") {
                        return `<div style="width:100%; color:red; font-weight: bold; font-size:11px;"> ` + full['Units'] + `</div>`;
                    }
                    else
                        result = full['Units'];

                    return result;
                }
            },
            {
                targets: 8,
                render: function (data, type, full, meta) {
                    var x = full['StockDist'];
                    debugger
                    var returnHtml = "";
                    if (x == "0") {
                        debugger
                        returnHtml = `<div style="width:100%; color:green; font-weight: bold; ">` + x + `</div>`;
                    }
                    else if (x > 0) {
                        debugger
                        returnHtml = `<div style="width:100%;  font-weight: bold; ">` + x + `</div>`;

                    }
                    else if (parseInt(x) < 0) {
                        debugger
                        returnHtml = `<div style="width:100%; color:red; font-weight: bold; ">` + x + `</div>`;

                    }
                    else if (x == "") {
                        debugger
                        if (parseInt(full['OrderCount']) >= 0)
                            x = "-" + full['OrderCount'];
                        else
                            x = full['DepotStock'];
                        returnHtml = `<div style="width:100%; color:red; font-weight: bold; ">` + x + `</div>`;
                    }
                    return returnHtml;
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
    table.on('draw.dt', function () {
        var PageInfo = $('#product_deneme').DataTable().page.info();
        table.column(1, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
    $("div.toolbar").html(`
                    <div class="row">
                        <div class="col-lg-6 pl-5" style=" text-align: left; ">
                             <a class="btn btn-info pt-2 pb-2 mr-3" style="cursor: pointer; font-size: 11px; color:white;" title="Aç" value="" onclick="OpenAll()" >
                                <i class= "icon-xl fas fa-sort-amount-down" style="color:white;"></i>Tümünü Aç
                            </a>
                            <a class="btn btn-danger pt-2 pb-2" style="cursor: pointer; font-size: 11px; color:white;" title="Kapat" value="" onclick="CloseAll()">
                                <i class= "icon-xl fas fa-sort-amount-up" style="color:white;"></i>Tümünü Kapat
                            </a>
                        
                        </div>
                        <div class="col-lg-6 " style=" text-align: right; ">

   <a  class="kt-menu__link pr-0" >
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class=" svg-icon svg-icon-primary " style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect x="0" y="0" width="24" height="24"/>
        <rect fill="#ffb822" x="5" y="4" width="6" height="16" rx="1.5"/>
        <rect fill="#ffb822" opacity="0.3" x="13" y="4" width="6" height="16" rx="1.5"/>
    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                                    <a href="/Center/StateOrderReportHorizontal" class="kt-menu__link" title="Dikey Mağaza Görünümü">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class="svg-icon svg-icon-primary" style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect x="0" y="0" width="24" height="24"/>
        <rect fill="#003366" opacity="0.3" x="4" y="5" width="16" height="6" rx="1.5"/>
        <rect fill="#003366" x="4" y="13" width="16" height="6" rx="1.5"/>
    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                        </div>

                    </div>`
    );

    $('#product_deneme tbody').on('click', 'td.details-control', function () {
        debugger
        var tr = $(this).closest('tr');
        var atag = $(this).find("a");
        var ID2 = atag.attr('id');
        var day = ID2.substring(0, 10);
        var ID = ID2.substring(10);

        var row = table.row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
            $(this).closest('tr').removeClass('bg-success');
        }
        else {
            // Open this row
            $(this).closest('tr').addClass('bg-success');
            createChild(row, ID, day);
            tr.addClass('shown');
        }
    });
};

$('#StartDate').change(function myfunction() {
    debugger
    $(this).datepicker('hide');
});
$('#EndDate').change(function myfunction() {
    debugger
    $(this).datepicker('hide');
    $('.ListButton').trigger('click');

});

//$('#kt_datepicker_3').change(function myfunction() {
//    debugger
//    var days = $('#kt_datepicker_2').val();
//    getProductsReport(days);
//    $(this).datepicker('hide');
//});
$('#kt_datepicker_report').change(function myfunction() {
    debugger
    var days = $('#kt_datepicker_report').val();
    $('#kt_datepicker_3').val(days);

    getProductsReport(days);
    $('#kt_datepicker_3').datepicker('hide');
});
function CloseAll() {
    debugger
    var tr = $('#product_deneme tbody tr');
    for (var i = 0; i < tr.length; i++) {
        var row = $('#product_deneme').DataTable().row(tr[i]);
        row.child.remove();
        tr.removeClass('shown').removeClass('bg-success');
    }
}

function OpenAll() {
    debugger
    var tr = $('#product_deneme tbody tr');
    var atag = $('#product_deneme tbody a');

    for (var i = 0; i < atag.length; i++) {
        OpenAllDenem(i);
    }
}

function OpenAllDenem(i) {
    debugger
    var atag = $('#product_deneme tbody a');
    var tr = atag[i].closest('tr');

    var ID2 = atag[i].id;
    var day = ID2.substring(0, 10);
    var ID = ID2.substring(10);

    var row = $('#product_deneme').DataTable().row(tr);
    createChild(row, ID, day);
}



function UTCToday() {
    debugger
    var deneme = $('#kt_datepicker_2').val();
    var deneme2 = $('#kt_datepicker_21').val();
    var deneme3 = $('#kt_datepicker_report').val();

    if (deneme == "" || deneme2 == "" || deneme3 == "") {
        var myDate = new Date();
        var date = myDate;

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = day + "/" + month + "/" + year;

        $('#kt_datepicker_2').val(today);
        $('#kt_datepicker_3').val(today);
        $('#kt_datepicker_21').val(today);
        $('#kt_datepicker_report').val(today);


    }
}
function UTCTodayDis() {
    debugger
    if (localStorage.dateForDist == undefined) {
        var myDate = new Date();
        var date = myDate;

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = day + "/" + month + "/" + year;

        $('#kt_datepicker_2').val(today);
        $('#kt_datepicker_3').val(today);
        localStorage.dateForDist = today;
    }
    else {
        $('#kt_datepicker_3').val(localStorage.dateForDist);
        $('#kt_datepicker_2').val(localStorage.dateForDist);
    }
}
function ChangeDatePlus(d) {
    debugger
    var myDate = $('#kt_datepicker_report').val();

    $.ajax({
        type: "POST",
        url: '/Definition/ChangeDatePlus?dateforSOR=' + myDate + '&d=' + d,
        success: function (datefor) {
            debugger
            $('#kt_datepicker_3').val(datefor);
            $('#kt_datepicker_report').val(datefor);

            getProductsReport(datefor);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function ChangeDatePlus5(d) {
    debugger
    var myDate = $('#kt_datepicker_2').val();

    $.ajax({
        type: "POST",
        url: '/Definition/ChangeDatePlus?dateforSOR=' + myDate + '&d=' + d,
        success: function (datefor) {
            debugger
            $('#kt_datepicker_3').val(datefor);
            $('#kt_datepicker_2').val(datefor);
            localStorage.dateForDist = datefor;
            window.location.reload();


        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function ChangeDatePlus2(d) {
    debugger
    var myDate = $('#kt_datepicker_21').val();

    $.ajax({
        type: "POST",
        url: '/Definition/ChangeDatePlus?dateforSOR=' + myDate + '&d=' + d,
        success: function (datefor) {
            debugger
            $('#kt_datepicker_3').val(datefor);
            $('#kt_datepicker_21').val(datefor);

            var region = $('#RegionsSelect').val();
            var format = $('#FormatSelect').val();
            getProductsReportHorizontal(datefor, format, region);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function createChild(row, id, days) {
    var table = $(`<table id="table_` + id + `" class="table table-striped- table-bordered table-hover table-checkable display" style="background-color:white; margin: 0rem 0 !important;"></table>`);
    // Display it the child row
    row.child(table).show();
    // Initialise as a DataTable
    var usersTable = table.DataTable({
        "searching": false,
        "paging": false,
        "bDestroy": true,
        ajax: {
            url: '/Definition/GetStatementOrderDet?d=' + id + '&dateforSOR=' + days,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
        },
        columns: [
            {
                name: 'photoGroup',
                data: 'PhotoGroup',
                className: 'dt-center',
                title: '',
                orderable: false,
                selector: { class: 'kt-checkbox--solid' },
            },
            {
                className: 'dt-center',
                title: 'S/N',
                width: '20px',
                orderable: false,

                //    selector: { class: 'kt-checkbox--solid' },
            },
            {
                data: 'BranchName',
                title: 'Şube Adı',
                width: '220px',
                className: 'font-weight-bold ',
                orderable: false,

                //    selector: { class: 'kt-checkbox--solid' },
            },
            {
                data: 'Units',
                title: 'Birim',
                width: '100px',
                className: 'dt-center font-weight-bold ',
                orderable: false,

                //    selector: { class: 'kt-checkbox--solid' },
            },
            {
                data: 'SubTotal',
                title: 'Sipariş Miktarı',
                className: 'dt-center bg-success',
                width: '110px',
                orderable: false,

            },
            {
                data: 'Quantity',
                title: 'Eldeki Stok',
                className: 'dt-center bg-primary',
                width: '110px',
                orderable: false,

            },

            {
                data: 'Comment',
                title: 'Açıklama',
                className: 'pl-4 ml-4',
                orderable: false,
            },
        ],
        order: [[1, 'asc'], [2, 'asc']],

        rowGroup: [
            'photoGroup:name',
        ],
        columnDefs: [
            {
                targets: 0,
                "orderable": false,
                render: function (data, type, full, meta) {
                    if (full['PhotoGroup'] == null)
                        return `<img style = "width:130px;background-color:white;" src = "./assets/media/resim-yok.jpg "/>`;

                    else
                        return `<img style = "width:130px;background-color:white;" src = "` + full['PhotoGroup'] + `"/>`;
                }
            },
            {
                targets: 1,
                "render": function (data, type, full, meta) {
                    return `<div style="width:100%;"> ` + (meta.row + 1) + `</div> `;
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    return `<div class="row mt-1 mb-1 pr-1" style=" min-width: 220px;">
                                <div class="col-sm-10" style="color: red;width: 60%;align-self: center;">
                                    ` + full['BranchName'] + `
                                </div>
                                <div class="col-sm-2" style="width:40%;">
                                   <a onclick="OpenStateOrderRepModal(` + id + `,` + full['BranchID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Düzenle" style=" float: right;">
                                        <i class="la la-edit" style="color:green;"></i>
                                   </a>
                                </div>
                            </div>`;
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    if (full['Units'] == "ADET")
                        return `<div style="width:100%; color:red; font-weight: bold; font-size:12px; ">` + full['Units'] + `</div>`;
                    else
                        return `<div style="width:100%; color:black; font-weight: bold; font-size:12px; ">` + full['Units'] + `</div>`;

                }
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    if (full['Units'] == "ADET")
                        return `<div style="width:100%; font-weight: bold; font-size:12px; ">` + full['SubTotal'] + `</div>`;
                    else
                        return `<div style="width:100%; color:black; font-weight: bold; font-size:12px; ">` + full['SubTotal'] + `</div>`;

                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    if (full['Units'] == "ADET")
                        return `<div style="width:100%;  font-weight: bold; font-size:12px; ">` + full['Quantity'] + `</div>`;
                    else
                        return `<div style="width:100%; color:black; font-weight: bold; font-size:12px; ">` + full['Quantity'] + `</div>`;
                }
            },

        ],
        'rowsGroup': [0],
        'createdRow': function (row, data, dataIndex, full) {
            if (data[0] === full['PhotoGroup'] && dataIndex == 0) {
                // Add COLSPAN attribute
                $('td:eq(0)', row).attr('rowspan', 1000000);
                $('td:eq(0)', row).addClass('bg-white');
            }
            else {
                $('td:eq(0)', row).css('display', 'none');
            }
        },
    });
}
function destroyChild(row) {
    var table = $("table", row.child());
    table.detach();
    table.DataTable().destroy();
    // And then hide the row
    row.child.hide();
}


function OpenStateOrderRepModal(prodID, branchID) {
    debugger
    var dateID = $('#kt_datepicker_3').val();

    var table = $('#modal_order').DataTable({
        "bDestroy": true,
        "searching": false,
        "paging": false,
        ajax: {
            url: '/Order/StateOrderReportedit?productID=' + prodID + '&branchID=' + branchID + '&dateforSOR=' + dateID,
            type: 'POST',
        },
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left pr-0 mr-0'f><'col-sm-6 mb-1 ml-0 text-left'<"toolbar">><'col-sm-3 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i>
            <'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        buttons: [],
        columns: [

            {
                data: 'S/N',
                className: 'dt-center',
                searchable: false,
                orderable: false,
                width: '5%'

            },
            {
                data: 'OrderNo',
                orderable: false,
                className: 'dt-center ',
                width: '10%'

            },
            {
                data: 'BranchName',
                orderable: false,
                className: 'dt-center ',
                width: '20%'

            },
            {
                data: 'ProductName',
                orderable: false,
                className: 'font-weight-bold',
                width: '30%'


            },
            {
                data: 'SubTotal',
                orderable: false,
                className: 'dt-center font-weight-bold',
                width: '10%'
            },
            {
                data: 'Quantity',
                orderable: false,
                className: 'dt-center font-weight-bold',
                width: '8%'

            },

            {
                data: 'Comment',
                className: 'dt-center font-weight-bold',
                orderable: false,
                width: '20%'

            },

        ],
        order: [[3, 'asc']],

        columnDefs: [
            {
                targets: 0,
                orderable: false,
                "render": function (data, type, full, meta) {
                    return `<div style="width:100%;"  > ` + (meta.row + 1) + `</div> `;
                }
            },
            {
                targets: 1,
                orderable: false,
                "render": function (data, type, full, meta) {
                    return `<a style="width:100%; cursor:pointer; text-align: left; font-size: 12px; color:red;" href="/Center/StateOrderListViewOff?id= ` + full['OrderID'] + `"><b> ` + full['OrderNo'] + `</b></a> `;
                }
            },
            {
                targets: 2,
                orderable: false,
                "render": function (data, type, full, meta) {
                    return `<div style="width:100%; text-align: left; font-size: 12px; color:red;" >` + full['BranchName'] + `</div> `;
                }
            },
            {
                targets: 3,
                orderable: false,
                "render": function (data, type, full, meta) {
                    return `<span style="width:100%; color:blue;" > ` + full['ProductName'] + `</span> `;
                }
            },
            {
                targets: 5,
                orderable: false,
                render: function (data, type, full, meta) {
                    debugger
                    var returnHtml = `
                            <div  style="width:100%;"> <input disabled style="    background-color: transparent;width:85%;text-align: center;border: 0px;font-size: 12px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + full['Quantity'] + `" name="demo0" placeholder=""></div>`;

                    return returnHtml;
                }
            },

            {
                targets: 4,
                render: function (data, type, full, meta) {
                    debugger
                    var subtotal = full['SubTotal'];
                    if (full['CheckBox'] == 1 && full['SubTotal'] == 0)
                        subtotal = "Yok";
                    var returnHtml = `
                            <div class="row" style="justify-content: center;min-width:130px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="UpdateStateSubtotalneg(value,` + full['OrderID'] + `,` + prodID + `,` + full['Quantity'] + `)" id="subTotalstateneg_` + full['OrderID'] + `"/>
                                   <input type="text" style="width: 60px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 0px 0px 0px 0px; height:2rem; color:red;background-color: #ffe8d6;font-size: 1.3rem;" value="`+ subtotal + `"  oninput="UpdateStateSubtotal(value,` + full['OrderID'] + `,` + prodID + `,` + full['Quantity'] + `)" class="form-control" id="subTotalstate_` + full['OrderID'] + `" />
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="UpdateStateSubtotalplus(value,` + full['OrderID'] + `,` + prodID + `,` + full['Quantity'] + `)" id="subTotalstateplus_` + full['OrderID'] + `"/>

                            </div>`;

                    return returnHtml;
                }

            },
            //{
            //    targets: 8,
            //    render: function (data, type, full, meta) {
            //        var x = full['StockDist'];
            //        var returnHtml;
            //        if (x == 0) {
            //            returnHtml = `<div style="width:100%; color:green; font-weight: bold; ">` + x + `</div>`;
            //        }
            //        else if (x > 0) {
            //            returnHtml = `<div style="width:100%;  font-weight: bold; ">` + x + `</div>`;

            //        }
            //        else {
            //            returnHtml = `<div style="width:100%; color:red; font-weight: bold; ">` + x + `</div>`;
            //        }
            //        return returnHtml;
            //    }
            //},

        ],
        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });
    $('#OpenStateOrderRepModal').on('shown.bs.modal', function () {
        var table = $('#modal_order').DataTable();
        table.columns.adjust();
    });
    $('#OpenStateOrderRepModal').modal();
    $('#AddButtonModal').empty();
    var button = '<button type="button" value"" onclick="SubmitModal(' + prodID + ')" data-dismiss="modal" id="SaveAllForProductDetButton" class="btn btn-secondary " style="background:#ffb822; color:#000000; background-color:#ffad00;">Kaydet</button>';
    $('#AddButtonModal').append(button);

    //    $('#modal_order').DataTable().ajax.reload();
};


//$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
//    debugger
//    $($.fn.dataTable.tables(false)).DataTable().columns.adjust();
//});

