'use strict';
// Class definition
var KTDatatableChildDataLocalDemo = function () {
    // Private functions

    var subTableInit = function (e) {
        $('<div/>').attr('id', 'child_data_local_' + e.data.RecordID).appendTo(e.detailCell).KTDatatable({
            data: {
                type: 'local',
                source: e.data.Orders,
                pageSize: 10,
            },

            // layout definition
            layout: {
                scroll: true,
                height: 300,
                footer: false,

                // enable/disable datatable spinner.
                spinner: {
                    type: 1,
                    theme: 'default',
                },
            },

            sortable: true,

            // columns definition
            columns: [
                //{
                //    name: 'first',
                //    field: 'OrderID',
                //    title: 'IDD',
                //    template: function () {
                //        return '\
                //        <img src="./assets/media/logos/logo-1.png" style="width: 10%;"/>\
                //';
                //    }                    
                //},
                {
                    field: 'ShipCountry',
                    title: 'Country',
                }, {
                    field: 'ShipAddress',
                    title: 'Ship Address',
                }, {
                    field: 'ShipName',
                    title: 'Ship Name',
                }, {
                    field: 'TotalPayment',
                    title: 'Payment',
                    type: 'number',
                }, {
                    field: 'Status',
                    title: 'Status',
                }, {
                    field: 'Type',
                    title: 'Type'
                }],
        });
    };

    // demo initializer
    var mainTableInit = function () {

        var dataJSONArray = JSON.parse(
            '[{"RecordID":1,"FirstName":"Domates","LastName":"Pee","Company":"Roodel","Email":"tpee0@slashdot.org","Phone":"103-891-3486","Status":4,"Type":1,"Orders":[{"OrderID":"41250-166","ShipCountry":"FR","ShipAddress":"5 Rutledge Court","ShipName":"Rogahn-Shanahan","OrderDate":"3/7/2017","TotalPayment":"$591994.23","Status":5,"Type":1},{"OrderID":"41250-166","ShipCountry":"CN","ShipAddress":"953 Schlimgen Park","ShipName":"Hilpert-Sanford","OrderDate":"5/12/2017","TotalPayment":"$79774.93","Status":1,"Type":1},{"OrderID":"47593-443","ShipCountry":"BY","ShipAddress":"46925 Memorial Park","ShipName":"Brakus and Sons","OrderDate":"2/12/2017","TotalPayment":"$1095029.28","Status":1,"Type":1},{"OrderID":"50114-5236","ShipCountry":"NZ","ShipAddress":"1420 Mockingbird Drive","ShipName":"Beer-Harris","OrderDate":"6/6/2017","TotalPayment":"$778690.72","Status":5,"Type":3},{"OrderID":"36987-2826","ShipCountry":"PL","ShipAddress":"3995 Huxley Court","ShipName":"Kling, Miller and Quitzon","OrderDate":"9/1/2017","TotalPayment":"$773995.02","Status":5,"Type":2},{"OrderID":"62750-006","ShipCountry":"ID","ShipAddress":"2064 Dennis Parkway","ShipName":"Lang, Kohler and Considine","OrderDate":"9/21/2017","TotalPayment":"$830550.45","Status":5,"Type":2},{"OrderID":"59779-597","ShipCountry":"IR","ShipAddress":"32 Golf Course Parkway","ShipName":"Jaskolski-Hilll","OrderDate":"4/4/2017","TotalPayment":"$754685.32","Status":3,"Type":3},{"OrderID":"59762-3743","ShipCountry":"HT","ShipAddress":"76 Anthes Hill","ShipName":"Reynolds Group","OrderDate":"1/23/2017","TotalPayment":"$295435.66","Status":2,"Type":1},{"OrderID":"64942-1114","ShipCountry":"ID","ShipAddress":"7511 Mayfield Avenue","ShipName":"Purdy and Sons","OrderDate":"12/1/2016","TotalPayment":"$636911.04","Status":6,"Type":2},{"OrderID":"0456-0461","ShipCountry":"KZ","ShipAddress":"36303 Esch Parkway","ShipName":"Reinger, Howe and Kertzmann","OrderDate":"1/31/2016","TotalPayment":"$753691.79","Status":4,"Type":1},{"OrderID":"16781-426","ShipCountry":"SE","ShipAddress":"507 Columbus Lane","ShipName":"Carter, Gibson and Kassulke","OrderDate":"10/26/2017","TotalPayment":"$873190.14","Status":2,"Type":2},{"OrderID":"60512-1008","ShipCountry":"ID","ShipAddress":"8 Jana Lane","ShipName":"Rutherford and Sons","OrderDate":"1/10/2017","TotalPayment":"$242894.68","Status":3,"Type":1},{"OrderID":"0456-0461","ShipCountry":"CN","ShipAddress":"5127 Roxbury Trail","ShipName":"Johnson Inc","OrderDate":"12/10/2017","TotalPayment":"$328850.50","Status":5,"Type":3},{"OrderID":"63304-098","ShipCountry":"GR","ShipAddress":"54627 Randy Lane","ShipName":"Johnston, Veum and Funk","OrderDate":"12/11/2016","TotalPayment":"$278247.03","Status":3,"Type":2},{"OrderID":"64092-317","ShipCountry":"CN","ShipAddress":"292 Rusk Lane","ShipName":"Bode, Zboncak and Reichel","OrderDate":"4/10/2016","TotalPayment":"$798173.38","Status":2,"Type":2},{"OrderID":"36987-1483","ShipCountry":"CU","ShipAddress":"2225 Saint Paul Junction","ShipName":"Dach, Haag and Koss","OrderDate":"2/7/2017","TotalPayment":"$1147799.38","Status":4,"Type":2},{"OrderID":"68084-814","ShipCountry":"ID","ShipAddress":"0 Sheridan Avenue","ShipName":"Little-O\'Hara","OrderDate":"11/24/2016","TotalPayment":"$394051.79","Status":6,"Type":1},{"OrderID":"42023-131","ShipCountry":"BR","ShipAddress":"4238 Roth Drive","ShipName":"Boehm LLC","OrderDate":"4/23/2016","TotalPayment":"$300684.31","Status":6,"Type":3},{"OrderID":"14290-350","ShipCountry":"CN","ShipAddress":"41950 Troy Point","ShipName":"Windler, Larkin and Collier","OrderDate":"4/17/2017","TotalPayment":"$467794.40","Status":4,"Type":1}]},\n' +
            '{"RecordID":2,"FirstName":"Biber","LastName":"Coldbreath","Company":"Zooxo","Email":"scoldbreath1@zdnet.com","Phone":"143-179-5104","Status":5,"Type":1,"Orders":[{"OrderID":"41250-166","ShipCountry":"ID","ShipAddress":"56955 Rusk Street","ShipName":"Paucek, Dietrich and Bergnaum","OrderDate":"9/27/2016","TotalPayment":"$662732.49","Status":2,"Type":3},{"OrderID":"68462-467","ShipCountry":"CN","ShipAddress":"13005 Bultman Court","ShipName":"Stamm Group","OrderDate":"3/22/2017","TotalPayment":"$653958.68","Status":4,"Type":2},{"OrderID":"55154-8270","ShipCountry":"UG","ShipAddress":"6 Brentwood Place","ShipName":"Stroman, Schowalter and Bogan","OrderDate":"8/20/2016","TotalPayment":"$57166.20","Status":3,"Type":2},{"OrderID":"63736-002","ShipCountry":"ID","ShipAddress":"51 Banding Junction","ShipName":"Crona-Konopelski","OrderDate":"2/5/2017","TotalPayment":"$733681.16","Status":3,"Type":2},{"OrderID":"54868-5182","ShipCountry":"CN","ShipAddress":"629 Oxford Alley","ShipName":"Lindgren LLC","OrderDate":"5/21/2016","TotalPayment":"$921137.56","Status":3,"Type":2},{"OrderID":"55714-4529","ShipCountry":"JP","ShipAddress":"9 Melvin Point","ShipName":"Kris-Will","OrderDate":"4/29/2016","TotalPayment":"$184624.81","Status":1,"Type":2},{"OrderID":"63736-305","ShipCountry":"CN","ShipAddress":"84196 New Castle Junction","ShipName":"Lockman-Luettgen","OrderDate":"9/7/2016","TotalPayment":"$922821.30","Status":2,"Type":2}]},\n' +
            '{"RecordID":3,"FirstName":"Salatalýk","LastName":"Thake","Company":"Riffpath","Email":"fthake2@ifeng.com","Phone":"695-591-2075","Status":3,"Type":1,"Orders":[{"OrderID":"41250-166","ShipCountry":"PS","ShipAddress":"797 Crownhardt Junction","ShipName":"Eichmann and Sons","OrderDate":"3/16/2016","TotalPayment":"$241462.16","Status":2,"Type":3},{"OrderID":"51824-023","ShipCountry":"BR","ShipAddress":"3066 Emmet Drive","ShipName":"Strosin, Lehner and Gislason","OrderDate":"9/17/2016","TotalPayment":"$194555.85","Status":3,"Type":2},{"OrderID":"57520-0221","ShipCountry":"BR","ShipAddress":"2 Havey Trail","ShipName":"Lang, Anderson and Keebler","OrderDate":"6/18/2016","TotalPayment":"$386865.72","Status":2,"Type":1},{"OrderID":"56062-388","ShipCountry":"CN","ShipAddress":"9 Boyd Avenue","ShipName":"Hegmann-Kemmer","OrderDate":"7/1/2016","TotalPayment":"$837648.17","Status":1,"Type":1},{"OrderID":"35356-723","ShipCountry":"UA","ShipAddress":"35 Chive Lane","ShipName":"Konopelski-Cummings","OrderDate":"7/17/2017","TotalPayment":"$730238.90","Status":5,"Type":2},{"OrderID":"35356-491","ShipCountry":"SE","ShipAddress":"6343 Talmadge Street","ShipName":"Wolf Inc","OrderDate":"1/18/2017","TotalPayment":"$777918.32","Status":6,"Type":1},{"OrderID":"76369-4001","ShipCountry":"CN","ShipAddress":"8737 Dunning Plaza","ShipName":"Cruickshank, Gleichner and Gerlach","OrderDate":"9/20/2016","TotalPayment":"$1197505.61","Status":1,"Type":3},{"OrderID":"0378-5042","ShipCountry":"TH","ShipAddress":"1 Old Shore Plaza","ShipName":"Olson-Stark","OrderDate":"8/2/2016","TotalPayment":"$661232.02","Status":5,"Type":2}]},\n' +
            '{"RecordID":4,"FirstName":"Þeftali","LastName":"Frearson","Company":"Katz","Email":"vfrearson3@amazon.de","Phone":"197-717-7100","Status":4,"Type":2,"Orders":[{"OrderID":"41250-166","ShipCountry":"PS","ShipAddress":"0814 Briar Crest Plaza","ShipName":"Olson-Connelly","OrderDate":"4/8/2016","TotalPayment":"$494707.94","Status":3,"Type":2},{"OrderID":"76167-002","ShipCountry":"SE","ShipAddress":"7 Quincy Road","ShipName":"Heaney, Lemke and McCullough","OrderDate":"1/10/2017","TotalPayment":"$372281.64","Status":5,"Type":3},{"OrderID":"0517-9702","ShipCountry":"RU","ShipAddress":"948 Granby Lane","ShipName":"Abshire-Cartwright","OrderDate":"1/17/2017","TotalPayment":"$720235.30","Status":1,"Type":1},{"OrderID":"53499-7272","ShipCountry":"UA","ShipAddress":"2553 Ronald Regan Point","ShipName":"Hudson-Breitenberg","OrderDate":"4/29/2017","TotalPayment":"$590146.91","Status":3,"Type":3},{"OrderID":"23155-001","ShipCountry":"ID","ShipAddress":"0237 Larry Park","ShipName":"Fahey, Fritsch and Boyer","OrderDate":"12/7/2016","TotalPayment":"$918885.26","Status":6,"Type":3},{"OrderID":"24909-162","ShipCountry":"AR","ShipAddress":"338 Prentice Road","ShipName":"Yost-Kunde","OrderDate":"4/17/2016","TotalPayment":"$320952.62","Status":6,"Type":3},{"OrderID":"59078-031","ShipCountry":"CN","ShipAddress":"23409 Gale Court","ShipName":"Jenkins-Dickens","OrderDate":"9/28/2016","TotalPayment":"$374124.12","Status":1,"Type":3},{"OrderID":"30142-822","ShipCountry":"VE","ShipAddress":"64 Boyd Center","ShipName":"Bartell Group","OrderDate":"2/12/2016","TotalPayment":"$11592.95","Status":2,"Type":2},{"OrderID":"36987-3147","ShipCountry":"PK","ShipAddress":"66010 Express Pass","ShipName":"Cole, Wilkinson and Macejkovic","OrderDate":"1/28/2016","TotalPayment":"$594910.09","Status":3,"Type":2},{"OrderID":"65841-626","ShipCountry":"PH","ShipAddress":"9 West Way","ShipName":"Batz, Nienow and Spencer","OrderDate":"2/7/2016","TotalPayment":"$742058.75","Status":1,"Type":2},{"OrderID":"57520-0025","ShipCountry":"AU","ShipAddress":"18 Hanover Place","ShipName":"Bode, Upton and Christiansen","OrderDate":"3/28/2016","TotalPayment":"$555669.10","Status":2,"Type":2},{"OrderID":"24236-786","ShipCountry":"BG","ShipAddress":"29471 Kim Alley","ShipName":"Lakin-Murazik","OrderDate":"7/9/2016","TotalPayment":"$164304.08","Status":6,"Type":3}]},\n' +
            '{"RecordID":5,"FirstName":"Limon","LastName":"Stranger","Company":"Tavu","Email":"astranger4@sfgate.com","Phone":"165-466-2893","Status":2,"Type":3,"Orders":[{"OrderID":"53462-175","ShipCountry":"PS","ShipAddress":"6 Spohn Way","ShipName":"O\'Connell Inc","OrderDate":"2/3/2016","TotalPayment":"$749928.82","Status":1,"Type":3},{"OrderID":"53808-0733","ShipCountry":"VN","ShipAddress":"3 Warbler Point","ShipName":"Willms, Glover and O\'Keefe","OrderDate":"5/16/2016","TotalPayment":"$632155.47","Status":1,"Type":1},{"OrderID":"0054-0252","ShipCountry":"CN","ShipAddress":"65 Havey Alley","ShipName":"Deckow, Runolfsson and Kemmer","OrderDate":"4/10/2016","TotalPayment":"$1116585.99","Status":6,"Type":1},{"OrderID":"0093-9660","ShipCountry":"CN","ShipAddress":"2 Maple Drive","ShipName":"Padberg, Powlowski and Brekke","OrderDate":"4/11/2017","TotalPayment":"$513356.12","Status":3,"Type":3},{"OrderID":"63739-047","ShipCountry":"EC","ShipAddress":"0 Talmadge Junction","ShipName":"Rosenbaum-Yundt","OrderDate":"2/19/2016","TotalPayment":"$655497.21","Status":2,"Type":2},{"OrderID":"63323-370","ShipCountry":"ID","ShipAddress":"0 Ramsey Hill","ShipName":"Ankunding, Walsh and Stiedemann","OrderDate":"9/13/2017","TotalPayment":"$380382.26","Status":1,"Type":1},{"OrderID":"57237-040","ShipCountry":"CN","ShipAddress":"945 Golf View Junction","ShipName":"Gulgowski, Feil and Bosco","OrderDate":"2/3/2016","TotalPayment":"$545464.59","Status":3,"Type":1},{"OrderID":"62584-741","ShipCountry":"PY","ShipAddress":"82775 Prairieview Lane","ShipName":"Kihn-Barton","OrderDate":"10/16/2016","TotalPayment":"$571182.87","Status":3,"Type":2},{"OrderID":"0268-0196","ShipCountry":"RU","ShipAddress":"20712 Prentice Terrace","ShipName":"Spencer-Powlowski","OrderDate":"6/7/2017","TotalPayment":"$207925.11","Status":1,"Type":1},{"OrderID":"76214-002","ShipCountry":"US","ShipAddress":"587 Mccormick Parkway","ShipName":"King, O\'Hara and White","OrderDate":"11/14/2016","TotalPayment":"$751439.27","Status":1,"Type":1}]},\n' +
            '{"RecordID":6,"FirstName":"Muz","LastName":"Ferneley","Company":"Dabtype","Email":"tferneley9p@oakley.com","Phone":"284-728-5534","Status":6,"Type":2,"Orders":[{"OrderID":"13734-023","ShipCountry":"CN","ShipAddress":"3434 Gulseth Plaza","ShipName":"Hauck LLC","OrderDate":"7/12/2016","TotalPayment":"$707730.01","Status":3,"Type":2},{"OrderID":"64406-008","ShipCountry":"ID","ShipAddress":"4 Boyd Avenue","ShipName":"Dickens-Mann","OrderDate":"7/31/2016","TotalPayment":"$675692.10","Status":1,"Type":3},{"OrderID":"64117-596","ShipCountry":"IR","ShipAddress":"40 Katie Circle","ShipName":"Cremin, D\'Amore and Rowe","OrderDate":"12/4/2017","TotalPayment":"$479956.28","Status":1,"Type":2},{"OrderID":"0591-2784","ShipCountry":"CA","ShipAddress":"42 Sutherland Pass","ShipName":"Hermann-Schroeder","OrderDate":"6/25/2016","TotalPayment":"$242558.93","Status":3,"Type":2},{"OrderID":"55154-4029","ShipCountry":"PT","ShipAddress":"801 Badeau Alley","ShipName":"Cole, King and Crona","OrderDate":"10/12/2017","TotalPayment":"$641687.48","Status":6,"Type":2},{"OrderID":"65862-208","ShipCountry":"ID","ShipAddress":"325 Birchwood Alley","ShipName":"Anderson, Corkery and Gleason","OrderDate":"3/3/2016","TotalPayment":"$1180528.08","Status":5,"Type":3}]}]');

        var datatable = $('.kt-datatable').on('draw', function (e) {
            window.getComputedStyle($('#child_data_local tbody div.kt-datatable')[0], ':before')
                .setProperty('background-image', 'BURAYA URL GELECEK')
        }).KTDatatable({
            // datasource definition
            data: {
                type: 'local',
                source: dataJSONArray,
                pageSize: 10, // display 20 records per page
            },

            // layout definition
            layout: {
                scroll: false,
                height: null,
                footer: false,
            },

            sortable: true,

            filterable: false,

            pagination: true,

            detail: {

                title: 'Load sub table',
                content: subTableInit,
            },

            search: {
                input: $('#generalSearch'),
            },
            rowsGroup: [
                'first:name'
            ],

            columns: [
                {
                    field: 'RecordID',
                    title: '',
                    sortable: false,
                    width: 30,
                    textAlign: 'center',
                }, {
                    name: 'first',
                    field: 'FirstName',
                    title: 'ÜRÜN Grubu',
                }, {
                    field: 'LastName',
                    title: 'Ürün Kodu',
                }, {
                    field: 'Company',
                    title: 'Ürün Adý',
                }, {
                    field: 'Email',
                    title: 'Birim',
                }, {
                    field: 'Status',
                    title: 'Hal Sipariþi',
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: { 'title': 'Pending', 'class': 'kt-badge--brand' },
                            2: { 'title': 'Delivered', 'class': ' kt-badge--danger' },
                            3: { 'title': 'Canceled', 'class': ' kt-badge--primary' },
                            4: { 'title': 'Success', 'class': ' kt-badge--success' },
                            5: { 'title': 'Info', 'class': ' kt-badge--info' },
                            6: { 'title': 'Danger', 'class': ' kt-badge--danger' },
                            7: { 'title': 'Warning', 'class': ' kt-badge--warning' },
                        };
                        return '<span class="kt-badge ' + status[row.Status].class + ' kt-badge--inline kt-badge--pill">' + status[row.Status].title + '</span>';
                    },
                },
                {
                    field: 'Type',
                    title: 'Hal Depo Stok',
                    autoHide: false,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: { 'title': 'Online', 'state': 'danger' },
                            2: { 'title': 'Retail', 'state': 'primary' },
                            3: { 'title': 'Direct', 'state': 'success' },
                        };
                        return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' + status[row.Type].state +
                            '">' +
                            status[row.Type].title + '</span>';
                    },
                },
                {
                    field: 'Type',
                    title: 'Þube Sipariþleri',
                    autoHide: false,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: { 'title': 'Online', 'state': 'danger' },
                            2: { 'title': 'Retail', 'state': 'primary' },
                            3: { 'title': 'Direct', 'state': 'success' },
                        };
                        return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' + status[row.Type].state +
                            '">' +
                            status[row.Type].title + '</span>';
                    },
                },
                {
                    field: 'Type',
                    title: 'Sipariþ Stok Farký',
                    autoHide: false,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: { 'title': 'Online', 'state': 'danger' },
                            2: { 'title': 'Retail', 'state': 'primary' },
                            3: { 'title': 'Direct', 'state': 'success' },
                        };
                        return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' + status[row.Type].state +
                            '">' +
                            status[row.Type].title + '</span>';
                    },
                }
                ]
        });

        $('#kt_form_status').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
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
            mainTableInit();
        },
    };
}();

jQuery(document).ready(function () {
    KTDatatableChildDataLocalDemo.init();
});