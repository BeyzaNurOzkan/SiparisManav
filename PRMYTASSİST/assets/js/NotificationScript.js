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
                        List = List + `<a href="/Branch/UpdateOrder?id=` + data[i]['OrderID'] + `" class="kt-notification__item">
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
                        List = List + `<a href="/Center/StateOrderListViewOffForBranch?id=` + data[i]['OrderID'] + `" class="kt-notification__item">
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
                        List = List + `<a href="/Center/StateOrderListViewOffForBranch?id=` + data[i]['OrderID'] + `" class="kt-notification__item">
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

function NotificationSend(id, currentUserID) {
    debugger
    $.ajax({
        type: "POST",
        url: '/Notification/NotificationSend?orderid=' + id + '&userId=' + currentUserID,
        success: function (data) {

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
};

function NotificationRead(id) {
    debugger
    $.ajax({
        type: "POST",
        url: '/Notification/NotificationRead?userId=' + id,
        success: function (data) {

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
};