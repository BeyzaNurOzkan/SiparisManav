function getLayoutCompanyName() {
    compantNameCode = 100798;
    debugger
    $.ajax({
        type: "POST",
        url: '/GeneralSettings/getLayoutCompanyName?compantNameCode=' + compantNameCode,
        success: function (data) {
            $('#companyNameLayout').text(data['companyName']);
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
            if (data['OrderCountW8'] != 0) {
                $('#waitingOrderCount').text(data['OrderCountW8']);
                $('#waitingOrderCount').addClass('kt-badge--success');
                $('#waitingOrderCount').removeClass('kt-badge--zero');
            }
            else {
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
function LayoutNotificationList(id) {
    debugger
    $.ajax({
        type: "POST",
        url: '/Notification/LayoutNotificationList/' + id,
        success: function (data) {
            var List = "";
            var c = data.length;
            var controlOne = $('#NotificationCount').text();
            if (controlOne == c) {

            }
            else {
                $('#NotificationBodyChange').empty();
                for (var i = 0; i < c; i++) {
                    $('#NotificationCount').text(data[i]['notReadCount']);
                    if (data[i]['Control'] == 0) {
                        List = List + `<a href="/Center/StateOrderListViewOff?id=` + data[i]['OrderID'] + `" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="icon-2x text-dark-50 flaticon-refresh"></i>
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div class="kt-notification__item-title">` + data[i]['Content'] + `</div>
                                            <div class="kt-notification__item-time">` + moment(data[i]['lastNotTime']).format('DD.MM.YYYY - HH:mm ') + `</div>
                                        </div>
                                    </a>`;
                    }
                    else if (data[i]['Control'] == 1) {
                        List = List + `<a href="/Center/StateOrderListViewOff?id=` + data[i]['OrderID'] + `" class="kt-notification__item">
                                        <div class="kt-notification__item-icon ">
                                            <i class="icon-2x text-dark-50 flaticon2-check-mark " style="color:#0abb87;"></i>
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div class="kt-notification__item-title">` + data[i]['Content'] + `</div>
                                            <div class="kt-notification__item-time">` + moment(data[i]['lastNotTime']).format('DD.MM.YYYY - HH:mm ') + `</div>
                                        </div>
                                    </a>`;
                    }
                    else if (data[i]['Control'] == 2) {
                        List = List + `<a href="/Center/StateOrderListViewOff?id=` + data[i]['OrderID'] + `" class="kt-notification__item">
                                        <div class="kt-notification__item-icon ">
                                            <i class="icon-2x text-dark-50 flaticon2-cross kt-font-danger"></i>
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div class="kt-notification__item-title">` + data[i]['Content'] + `</div>
                                            <div class="kt-notification__item-time">` + moment(data[i]['lastNotTime']).format('DD.MM.YYYY - HH:mm ') + `</div>
                                        </div>
                                    </a>`;
                    }
                }
                $('#NotificationBodyChange').append(List);
            }
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function ChangeDateRange() {
    var StartDate = $('#StartDate').val();
    var EndDate = $('#EndDate').val();
    var UserID = $('#UserID').val();
    getBranchOrderList(StartDate, EndDate, UserID);
};
function cancelToNewOrder() {
    var branchID = $("#branch").val();
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

            $.ajax({
                type: "POST",
                url: '/Order/cancelToNewOrder?id=' + branchID,
                success: function (data) {
                    window.location.reload();
                },
            });

        } else if (result.dismiss === 'cancel') {
            swal.fire(
                "İptal!", "Silme İşlemi İptal Edildi!", "error"
            )
        }
    });
};
