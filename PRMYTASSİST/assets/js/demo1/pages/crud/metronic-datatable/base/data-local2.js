'use strict';
// Class definition

var KTDatatableDataLocalDemo = function () {
    // Private functions

    // demo initializer
    var demo = function () {
        var dataJSONArray = JSON.parse('[{"RecordID":1,"OrderID":"0374-5070","Country":"China","ShipCountry":"CN","ShipCity":"Jiujie","ShipName":"Rempel Inc","ShipAddress":"60310 Schiller Center","CompanyEmail":"cdodman0@wsj.com","CompanyAgent":"Cordi Dodman","CompanyName":"6686360","Currency":"CNY","Notes":"sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus","Department":"Kids","Website":"tripadvisor.com","Latitude":39.952319,"Longitude":119.598195,"ShipDate":"8/27/2017","PaymentDate":"2016-09-15 22:18:06","TimeZone":"Asia/Chongqing","TotalPayment":"$336309.10","Status":4,"Type":2,"Actions":null},\n' +
            '{"RecordID":94,"OrderID":"11822-9854","Country":"Indonesia","ShipCountry":"ID","ShipCity":"Pasirpanjang","ShipName":"Dietrich-Langworth","ShipAddress":"5 Hollow Ridge Plaza","CompanyEmail":"mtrayhorn2l@sciencedirect.com","CompanyAgent":"Marcos Trayhorn","CompanyName":"Pacocha-Kling","Currency":"IDR","Notes":"justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est","Department":"Sports","Website":"chicagotribune.com","Latitude":0.845865,"Longitude":108.8796091,"ShipDate":"3/27/2016","PaymentDate":"2017-06-08 14:15:50","TimeZone":"Asia/Jakarta","TotalPayment":"$362198.01","Status":4,"Type":3,"Actions":null},\n' +
            '{"RecordID":95,"OrderID":"49643-120","Country":"Russia","ShipCountry":"RU","ShipCity":"Muchkapskiy","ShipName":"Conn LLC","ShipAddress":"68 5th Drive","CompanyEmail":"fmunford2m@tiny.cc","CompanyAgent":"Francis Munford","CompanyName":"Smith-Stokes","Currency":"RUB","Notes":"tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat","Department":"Beauty","Website":"ox.ac.uk","Latitude":51.8478427,"Longitude":42.4697909,"ShipDate":"9/12/2016","PaymentDate":"2017-01-27 16:06:13","TimeZone":"Europe/Moscow","TotalPayment":"$1001206.62","Status":4,"Type":1,"Actions":null},\n' +
            '{"RecordID":96,"OrderID":"56062-393","Country":"Guam","ShipCountry":"GU","ShipCity":"Agana Heights Village","ShipName":"Mayer-Cole","ShipAddress":"04373 Golden Leaf Center","CompanyEmail":"ckahler2n@histats.com","CompanyAgent":"Catriona Kahler","CompanyName":"Lynch-Satterfield","Currency":"USD","Notes":"ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam","Department":"Jewelery","Website":"newyorker.com","Latitude":13.4677672,"Longitude":144.7453228,"ShipDate":"7/18/2017","PaymentDate":"2016-06-21 16:10:22","TimeZone":"Pacific/Guam","TotalPayment":"$717532.21","Status":2,"Type":1,"Actions":null},\n' +
            '{"RecordID":97,"OrderID":"50436-0120","Country":"Dominica","ShipCountry":"DM","ShipCity":"Soufrière","ShipName":"Ernser, Miller and Barton","ShipAddress":"7 Canary Crossing","CompanyEmail":"gkleinplatz2o@naver.com","CompanyAgent":"Giuseppe Kleinplatz","CompanyName":"Denesik-Wyman","Currency":"XCD","Notes":"congue elementum in hac habitasse platea dictumst morbi vestibulum velit id","Department":"Kids","Website":"miibeian.gov.cn","Latitude":15.2338798,"Longitude":-61.3567483,"ShipDate":"12/20/2017","PaymentDate":"2016-08-13 23:06:00","TimeZone":"America/Dominica","TotalPayment":"$630409.34","Status":2,"Type":3,"Actions":null},\n' +
            '{"RecordID":98,"OrderID":"42507-004","Country":"Mexico","ShipCountry":"MX","ShipCity":"Rancho Nuevo","ShipName":"Borer and Sons","ShipAddress":"424 Birchwood Terrace","CompanyEmail":"lgrinishin2p@hubpages.com","CompanyAgent":"Lucky Grinishin","CompanyName":"O\'Reilly, Block and Goyette","Currency":"MXN","Notes":"mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh","Department":"Tools","Website":"hexun.com","Latitude":22.2222241,"Longitude":-100.9256085,"ShipDate":"12/22/2017","PaymentDate":"2016-04-09 03:07:19","TimeZone":"America/Mexico_City","TotalPayment":"$314052.63","Status":2,"Type":3,"Actions":null},\n' +
            '{"RecordID":99,"OrderID":"49230-191","Country":"Japan","ShipCountry":"JP","ShipCity":"Yokosuka","ShipName":"White, Legros and Carroll","ShipAddress":"8 Annamark Place","CompanyEmail":"mellse2q@xinhuanet.com","CompanyAgent":"Meade Ellse","CompanyName":"Purdy-Carroll","Currency":"JPY","Notes":"magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia","Department":"Sports","Website":"abc.net.au","Latitude":34.6830797,"Longitude":137.9865313,"ShipDate":"12/12/2016","PaymentDate":"2016-08-30 12:27:38","TimeZone":"Asia/Tokyo","TotalPayment":"$1127673.96","Status":1,"Type":1,"Actions":null},\n' +
            '{"RecordID":100,"OrderID":"50865-056","Country":"Honduras","ShipCountry":"HN","ShipCity":"Yuscarán","ShipName":"Anderson, Pfannerstill and Miller","ShipAddress":"116 Bay Way","CompanyEmail":"hensley2r@businessweek.com","CompanyAgent":"Hamil Ensley","CompanyName":"Kessler, Greenfelder and Gaylord","Currency":"HNL","Notes":"nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis","Department":"Kids","Website":"dell.com","Latitude":13.9448964,"Longitude":-86.8508942,"ShipDate":"1/14/2016","PaymentDate":"2016-12-27 22:25:10","TimeZone":"America/Tegucigalpa","TotalPayment":"$386091.31","Status":4,"Type":3,"Actions":null}]');

        var datatable = $('.kt-datatable2').KTDatatable({
            // datasource definition
            data: {
                type: 'local',
                source: dataJSONArray,
                pageSize: 10,
            },

            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                // height: 450, // datatable's body's fixed height
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: true,

            pagination: true,

      
            // columns definition
            columns: [
                {
                    field: 'RecordID',
                    title: '#',
                    sortable: false,
                    width: 20,
                    type: 'number',
                    selector: { class: 'kt-checkbox--solid' },
                    textAlign: 'center',
                },

                {
                    field: 'OrderID',
                    title: 'Sıra No',
                    width: 70,
                },
                {
                    field: 'CompanyName',
                    title: 'Sipariş No',
                    width: 70,

                },
                {
                    field: 'Type',
                    title: 'Bölge',
                    autoHide: false,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: { 'title': 'İstanbul </br>  Anadolu', 'state': 'warning' },
                            2: { 'title': 'Ankara - Mamak', 'state': 'warning' },
                            3: { 'title': 'Amasya - Merkez', 'state': 'warning' },
                        };
                        return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' + status[row.Type].state +
                            '">' + status[row.Type].title + '</span>';
                    },
                },
                {
                    field: 'CompanyName',
                    title: 'Şube Adı',
                },
               
                {
                    field: 'ShipDate',
                    title: 'Sipariş Tarihi',
                    textAlign: 'center',

                },
                {
                    field: 'Status',
                    title: 'Onay Durumu',
                    width: 100,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: { 'title': 'Bekleme', 'class': 'kt-badge--brand' },
                            2: { 'title': 'Onaylanmadı', 'class': ' kt-badge--danger' },
                            /*     3: { 'title': 'Canceled', 'class': ' kt-badge--primary' },*/
                            4: { 'title': 'Onaylandı', 'class': ' kt-badge--success' },
                            /*  5: { 'title': 'Info', 'class': ' kt-badge--info' },*/
                            //6: { 'title': 'Danger', 'class': ' kt-badge--danger' },
                            //7: { 'title': 'Warning', 'class': ' kt-badge--warning' },
                        };
                        return '<span class="kt-badge ' + status[row.Status].class + ' kt-badge--inline kt-badge--pill">' + status[row.Status].title + '</span>';
                    },
                },
                {
                    field: 'Country',
                    title: 'Ürün Sayısı',
                    textAlign: 'center',
                    width: 50,

                },
                {
                    field: 'CompanyName',
                    title: 'Kasa Miktarı',
                    width: 50,

                },

                {
                    field: 'CompanyName',
                    width: 50,
                    title: 'Adet Miktarı',
                },
                {
                    field: 'CompanyName',
                    width: 50,
                    title: 'Palet Miktarı',
                },
                {
                    field: 'CompanyName',
                    title: 'Kayıt Bilgisi',
                },

                {
                    field: 'Actions',
                    title: 'İşlemler',
                    sortable: false,
                    width: 110,
                    overflow: 'visible',
                    autoHide: false,
                    template: function () {
                        return '\<a href="/Center/StateOrderListView" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
							<i class="icon flaticon-eye"></i>\
						</a>\
                        \<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
							<i class="icon flaticon2-checkmark"></i>\
						</a>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\
							<i class="icon-sm flaticon2-cross"></i> \
						</a>\
					';
                    },
                }],
        });

        $('#kt_form_status').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_form_reasion').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Reasion');
        });

        $('#kt_form_type').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

    };

    return {
        // Public functions
        init: function () {
            // init dmeo
            demo();
        },
    };
}();

jQuery(document).ready(function () {
    KTDatatableDataLocalDemo.init();
});