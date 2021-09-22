function getUnit() {
    var table = $('#kt_table_unit');
    var t = table.DataTable({
        ajax: {
            url: '/Center/GetUnits',
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
                data: 'UnitName',
                className: 'font-weight-bold ',
            },
            { data: 'Factor' },
            { data: 'Weight' },
            { data: 'CreatedDate' },
            { data: 'CreatedUser' },
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
                "width": "6%",
                render: function (data, type, full, meta) {
                    var id = "//";
                    var name = full['UnitName'];

                    var output;
                    if (id != "//") {
                        output = `
                                <div style="justify-content: center;" class="kt-user-card-v1">
                                    <a style="width:100%; cursor:pointer;" onclick="EditUnit(` + full['ID'] + `)" class="btn" title="" >
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
                                        <a style="cursor:pointer;" onclick="EditUnit(` + full['ID'] + `)"  class=" pt-0 pb-0 btn btn-hover-` + state + `" title="" >
                                            <div class="kt-badge kt-badge--xl kt-badge--` + state + `"><span>` + name + `</div>
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
                className: 'pl-2',
                orderable: false,
                "width": "14%",
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = `<a onclick="EditUnit(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Düzenle">
                                   <i class="la la-edit"></i>
                                    </a>`;
                    return result;
                }
            },
            {
                targets: 2,
                title: 'Birim Adı',
                orderable: false,
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = `<a style="width:100%; cursor:pointer; text-align: left; font-size: 12px;" onclick="EditUnit(` + full['ID'] + `)" class="btn" title="" ><b>` + full['UnitName'] + `</b></a>`;
                    return result;
                }
            },
            {
                targets: 5,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var id = full['CreatedDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm ');
                    return result;
                },

            }],
        order: [[3, 'asc']],

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,


    });
    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_unit').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};

function EditUnit(id) {
    debugger

    $.ajax({
        type: "POST",
        url: '/Center/EditUnit?id=' + id,
        success: function (data) {
            debugger
            $('#userModal #CreatedUser').text(data['CreatedUser']);
            var CDate = data['CreatedDate'];
            var CDateResult = moment(CDate).format('DD.MM.YYYY - HH:mm ');
            $('#userModal #CreatedDate').text(CDateResult);
            $('#userModal #UpdateUser').text(data['CreatedUser']);
            var LUDate = data['LastUpdateDate'];
            var LUDateResult = moment(LUDate).format('DD.MM.YYYY - HH:mm ');
            $('#userModal #UpdateDate').text(LUDateResult);
            $('#userModal #userID').val(data['ID']);
            $('#userModal #UserInformation').text(data['UnitName'] + " Güncelle");
            $('#userModal #userID').val(data['ID']);
            $('#userModal #Visible').val(data['Visible']);
            $('#userModal #UserName').val(data['UnitName']);
            $('#userModal #UserLastName').val(data['Factor']);
            $('#userModal #Weight').val(data['Weight']);

            $('#userModal').modal();
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
