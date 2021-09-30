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

function getOrderStatusWeek() {
    $('#SelectedTimeZone').text('Bu Hafta');
    debugger
    var date = new Date();
    var date2 = new Date();
    date.setDate(date.getDate() + 1);
    var DayName = date2.getDay();
    while (DayName != 1) {
        date2.setDate(date2.getDate() - 1);
        DayName = date2.getDay();
    }
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
    var week = day + "/" + month + "/" + year;

    getOrderStatusAll(week, today);
}

function getOrderStatusLastMonth() {
    debugger
    var date = new Date();
    var date2 = new Date();
    date2.setDate(1)
    date.setDate(date.getDate() + 1)


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
    var Month = day + "/" + month + "/" + year;

    if (month == 01) {
        $('#SelectedTimeZone').text('Ocak');
    }
    else if (month == 02) {
        $('#SelectedTimeZone').text('Şubat');
    }
    else if (month == 03) {
        $('#SelectedTimeZone').text('Mart');
    }
    else if (month == 04) {
        $('#SelectedTimeZone').text('Nisan');
    }
    else if (month == 05) {
        $('#SelectedTimeZone').text('Mayıs');
    }
    else if (month == 06) {
        $('#SelectedTimeZone').text('Haziran');
    }
    else if (month == 07) {
        $('#SelectedTimeZone').text('Temmuz');
    }
    else if (month == 08) {
        $('#SelectedTimeZone').text('Ağustos');
    }
    else if (month == 09) {
        $('#SelectedTimeZone').text('Eylül');
    }
    else if (month == 10) {
        $('#SelectedTimeZone').text('Ekim');
    }
    else if (month == 11) {
        $('#SelectedTimeZone').text('Kasım');
    }
    else if (month == 12) {
        $('#SelectedTimeZone').text('Aralık');
    }
    getOrderStatusAll(Month, today);
}

function getOrderStatusSelectMonth(Month) {
    debugger
    var date = new Date();
    var date2 = new Date();
    date2.setMonth(Month);
    date2.setDate(1);
    date.setMonth(Month);
    date.setDate(1);
    date2.setMonth(date2.getMonth() + 1)

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var StartDate = day + "/" + month + "/" + year;

    var day = date2.getDate();
    var month = date2.getMonth() + 1;
    var year = date2.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var EndDate = day + "/" + month + "/" + year;


    if (Month == 0) {
        $('#SelectedTimeZone').text('Ocak');
    }
    else if (Month == 1) {
        $('#SelectedTimeZone').text('Şubat');
    }
    else if (Month == 2) {
        $('#SelectedTimeZone').text('Mart');
    }
    else if (Month == 3) {
        $('#SelectedTimeZone').text('Nisan');
    }
    else if (Month == 4) {
        $('#SelectedTimeZone').text('Mayıs');
    }
    else if (Month == 5) {
        $('#SelectedTimeZone').text('Haziran');
    }
    else if (Month == 6) {
        $('#SelectedTimeZone').text('Temmuz');
    }
    else if (Month == 7) {
        $('#SelectedTimeZone').text('Ağustos');
    }
    else if (Month == 8) {
        $('#SelectedTimeZone').text('Eylül');
    }
    else if (Month == 9) {
        $('#SelectedTimeZone').text('Ekim');
    }
    else if (Month == 10) {
        $('#SelectedTimeZone').text('Kasım');
    }
    else if (Month == 11) {
        $('#SelectedTimeZone').text('Aralık');
    }

    getOrderStatusAll(StartDate, EndDate);
}

function getOrderStatusSelectQuarter(Month) {
    debugger
    var date = new Date();
    var date2 = new Date();
    date2.setMonth(Month);
    date2.setDate(1);
    date.setMonth(Month);
    date.setDate(1);
    date2.setMonth(date2.getMonth() + 3)

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var StartDate = day + "/" + month + "/" + year;

    var day = date2.getDate();
    var month = date2.getMonth() + 1;
    var year = date2.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var EndDate = day + "/" + month + "/" + year;

    if (Month == 0) {
        $('#SelectedTimeZone').text('1. Çeyrek');
    }
    else if (Month == 3) {
        $('#SelectedTimeZone').text('2. Çeyrek');
    }
    else if (Month == 6) {
        $('#SelectedTimeZone').text('3. Çeyrek');
    }
    else if (Month == 9) {
        $('#SelectedTimeZone').text('4. Çeyrek');
    }
    getOrderStatusAll(StartDate, EndDate);
}
function getOrderStatusLastYear() {
    debugger
    var date = new Date();
    var date2 = new Date();
    date2.setMonth(0);
    date2.setDate(1);
    date.setMonth(0);
    date.setDate(1);
    date2.setFullYear(date2.getFullYear() + 1)

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var StartDate = day + "/" + month + "/" + year;
    $('#SelectedTimeZone').text(year);

    var day = date2.getDate();
    var month = date2.getMonth() + 1;
    var year = date2.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var EndDate = day + "/" + month + "/" + year;

    getOrderStatusAll(StartDate, EndDate);
}

function getOrderStatusAll(dateOne, dateTwo) {
    debugger
    $.ajax({
        type: "POST",
        url: '/Definition/GetOrderStatusToday?dateforStatus=' + dateOne + '&dateforStatus1=' + dateTwo,
        success: function (data) {

            $('#orderSuccess').text(data['appcount1']);
            $('#orderWait').text(data['appcount0']);
            $('#orderDanger').text(data['appcount2']);
            $('#orderTotal').text(data['appcount2'] + data['appcount1'] + data['appcount0']);

            var SuccessRate = (data['appcount1'] * 100) / (data['appcount2'] + data['appcount1'] + data['appcount0']);
            var WaitRate = (data['appcount0'] * 100) / (data['appcount2'] + data['appcount1'] + data['appcount0']);
            var DangerRate = (data['appcount2'] * 100) / (data['appcount2'] + data['appcount1'] + data['appcount0']);
            if (data['appcount0'] == 0 && data['appcount0'] == 0 && data['appcount0'] == 0) {
                $('#waitRate').text('0 %');
                $('#dangerRate').text('0 %');
                $('#successRate').text('0 %');
            }
            else {
                $('#waitRate').text(WaitRate.toFixed(1) + ' %');
                $('#dangerRate').text(DangerRate.toFixed(1) + ' %');
                $('#successRate').text(SuccessRate.toFixed(1) + ' %');
            }
            new Morris.Donut({
                element: 'myfirstchart',
                data: [{
                    label: "Onaylandı",
                    value: data['appcount1'],
                    color: "#34bfa3"
                },
                {
                    label: "Reddedildi",
                    value: data['appcount2'],
                    color: "#fd3995"
                },
                {
                    label: "Beklemede",
                    HTMLLabelElement: "12px;",
                    value: data['appcount0'],
                    color: "#5d78ff",
                }
                ],
                labelColor: "black",
            });
            $("#myfirstchart tspan:nth-child(1)").css("font-size", "12px");

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }

    });
};


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
function waitingOrderCountScrpt() {
    debugger
    $.ajax({
        type: "POST",
        url: '/Definition/GetOrderCountByWaiting',
        success: function (data) {
            debugger

            if (data['OrderCountW8'] != 0) {
                debugger
                $('#waitingOrderCount').text(data['OrderCountW8']);
                $('#waitingOrderCount').addClass('kt-badge--success');
                $('#waitingOrderCount').removeClass('kt-badge--zero');
                $('#ringCenter').addClass('kt-pulse__ring');

            }
            else {
                $('#waitingOrderCountring').removeClass('kt-pulse__ring');
                $('#waitingOrderCount').text(data['OrderCountW8']);
                $('#waitingOrderCount').removeClass('kt-badge--success');
                $('#waitingOrderCount').addClass('kt-badge--zero');



            }
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function openaside() {
    debugger

    var a =$('#kt_aside_toggler')[0].className;
    if (a == "kt-aside__brand-aside-toggler")
        $('#ringCenter').removeClass('kt-pulse__ring');
    else
        $('#ringCenter').addClass('kt-pulse__ring');


};
function getOrderDescForDashBoard() {
    $.ajax({
        type: "POST",
        url: '/Definition/getOrderDescForDashBoard',
        success: function (data) {
            $('#getOrderDescForDashBoard_product').text(data['count1']);
            $('#getOrderDescForDashBoard_productt').text(data['count7']);
            $('#getOrderDescForDashBoard_producttt').text(data['count8']);
            $('#getOrderDescForDashBoard_productGroup').text(data['count2']);
            $('#getOrderDescForDashBoard_User').text(data['count3']);
            $('#getOrderDescForDashBoard_Branch').text(data['count4']);
            $('#getOrderDescForDashBoard_Region').text(data['count5']);
            $('#getOrderDescForDashBoard_Format').text(data['count6']);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

