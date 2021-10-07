function getProducts() {
    debugger
    var table = $('#product_table');
    var t = table.DataTable({
        ajax: {
            url: '/Center/GetProducts/',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
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
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-2 dataTables_pager'lp>>`,

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
                data: 'Photo',
                "width": "3%",
                className: 'dt-center',
            },
            {
                data: 'Code',
                className: 'dt-center',
            },
            {
                data: 'Barcode',
                className: 'dt-center font-weight-bold',
            },
            {
                data: 'Name',
                className: ' font-weight-bold',
            },
            {
                data: 'Units',
                orderable: false,
            },
            { data: 'ProductGroupUrl' },
            { data: 'Visible' },

            { data: 'İşlemler' },
        ],
        order: [[4, 'asc']],

        columnDefs: [
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    var id = full['Name'];
                    var id = full['ID'];
                    var result = `<a style="width:100%; cursor:pointer; text-align: left; font-size: 12px; color:red;" onclick="EditProduct(` + full['ID'] + `)" class="btn" title="" ><b>` + full['Name'] + `</b></a>`;
                    return result;
                }
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var id = full['Barcode'];
                    result = `<span style="color:blue;">` + id + `</span>`;

                    return result;
                }
            },
            {
                targets: 1,
                render: function (data, type, full, meta) {
                    debugger
                    var id = full['Photo'];
                    var result = "";
                    if(id!="")
                        result = `<i class="icon-2x flaticon2-image-file"></i>`;
                    

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
                targets: -1,
                title: 'İşlemler',
                orderable: false,
                "width": "4%",
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    return `
                        <a onclick="EditProduct(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Düzenle">
                          <i class="la la-edit"></i>
                        </a>`;
                }
            },
            {
                targets: -2,
                orderable: false,
                "width": "4%",
                render: function (data, type, full, meta) {
                    var id = full['Visible'];
                    var result = "";

                    if (id == true) {
                        result = '<a style=" color:red;" > Pasif </a>';
                    }
                    else {
                        result = 'Aktif';
                    }

                    return result;
                }
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var UnitName = full['Units'];
                    if (UnitName == null) {
                        UnitName = "TANIMSIZ";
                    }
                    var length = full['UnitName'].length;
                    var deneme = "";
                    for (var i = 0; i < length; i++) {
                        debugger
                        deneme = deneme + `<option value=` + full['UnitName'][i] + ` >` + full['UnitName'][i].toLocaleUpperCase() + `</option>`;
                    }
                    return `
                       <select onchange="SaveUnit(this,`+ full['ID'] + `)" style="font-size: 11px;height: 25px;" class="form-control pt-1" id="exampleSelect1">
                         <option>` + UnitName + `</option>` + deneme + `</select>`;
                }
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = "";
                    switch (full['ProductGroupUrl']) {
                        case `, , `:
                            result = `Grup Tanımlı Değil`;
                            break;
                        default:
                            result = `<a  > ` + full['ProductGroupUrl'] + `<span style="color:red; font-weight: bold;">` + full['ProductGroupUr2'] + `</span></a>`;
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
        var PageInfo = $('#product_table').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};
function SaveUnit(unit, id) {
    var value = unit.value;
    debugger
    $.ajax({
        type: "POST",
        url: '/Center/SaveUnit?unit=' + value + '&id=' + id,
    });
};

function EditProduct(id) {
    debugger

    
    if (id!=0) {
        $.ajax({
            type: "POST",
            url: '/Center/EditProducts/' + id,
            success: function (data) {

                $('#productModal #ProductKodu').val(data['ProductCode']);
                $('#productModal #Barkod').val(data['Barcode']);
                $('#productModal #ProductName').val(data['Name']);
                $('#productModal #ProductForeignKey').val(data['ProductForeignKey']);
                $('#productModal #RetailTaxPercentage').val(data['RetailTaxPercentage']);
                $('#productModal #ShortName').val(data['ShortName']);
                $('#productModal #WholeSaleTaxPercentage').val(data['WholeSaleTaxPercentage']);
                $('#productModal #MainGroupCode').val(data['MainGroupCode']);
                $('#productModal #ManufacturerCode').val(data['ManufacturerCode']);
                $('#productModal #SectionCode').val(data['SectionCode']);
                $('#productModal #BrandCode').val(data['BrandCode']);
                $('#productModal #SectorCode').val(data['SectorCode']);
                $('#productModal #ModelCode').val(data['ModelCode']);
                $('#productModal #CategoryCode').val(data['CategoryCode']);
                $('#productModal #SubGroupCode').val(data['SubGroupCode']);
                $('#productModal #ModelCode').val(data['ModelCode']);
                $('#productModal #ProductTitleName').text(data['ProductTitleName']);
                $('#productModal #LastUpdateUser').text(data['LastUpdateUser']);
                $('#productModal #UnitName').val(data['UnitName']);
                $('#productModal #Factor').val(data['Factor']);
                $('#productModal #Weight').val(data['Weight']);
                var LUDate = data['LastUpdateDate'];
                var LUDateResult = moment(LUDate).format('DD.MM.YYYY - HH:mm ');
                $('#productModal #UpdateDate').text(LUDateResult);
                $('#productModal #UpdateUser').text(data['LastUpdateUser']);
                $('#productModal #CreatedUser').text(data['CreateUser']);
                var Date = data['CreateDate'];
                var DateResult = moment(Date).format('DD.MM.YYYY - HH:mm ');
                $('#productModal #CreatedDate').text(DateResult);

                $('#productModal #next').val(data['nextid']);
                $('#productModal #back').val(data['backid']);
                

                if (data['Visibile'] == true) {
                    $("#productModal #visibileForProductList").prop("checked", true);
                    $("#productModal #visibileForProductList").val(id);
                }

                else {
                    $("#productModal #visibileForProductList").prop("checked", false);
                    $("#productModal #visibileForProductList").val(id);
                }

                debugger
                $("#productModal #productphoto").val(data['photo']);
               // $("#productModal #categoryForProduct").val(data['ProductGroup3Id']);

               


                debugger
                if (data['ProductGroup3Id'] != undefined) {

                    $('#productModal #ShortName').val(data['ProductGroupName']);
                   

                                }
                else {
                    $('#productModal #ShortName').val("TANIMSIZ");
                }
                $('#productModal').modal();
                if (data['Photo'] != undefined) {
                    abc(data['Photo']);
                } else {
                    abc("/assets/media/resim-yok.jpg")
                }
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Önceki/Sonraki Sipariş Yok", "error");
            }
        });}
    else
        swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
    
};