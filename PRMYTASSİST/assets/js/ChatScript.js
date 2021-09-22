function LayoutOnlineUserInfoModal(id) {
    $.ajax({
        type: "POST",
        url: '/Chat/GetOnlineUserList/' + id,
        success: function (data) {

            var CurrentUserChat = $('#CurrentUserChat').val();
            var List = "";
            var c = data.length;
            var controlOne = $('#OnlineUserCount').text();
            if (controlOne == c) {

            }
            else {
                $('#LayoutOnlineUserInfo').empty();
                $('#OnlineUserCount').text(c);
                $('#OnlineUserCountFast').text(c);
                for (var i = 0; i < c; i++) {
                    if (i % 2 == 0) {
                        var name = data[i]['UserNameFirst'];
                        List = List + `             <div class="kt-mycart__item pt-1 pb-1" style="background-color:#f4f4f7;">
                                                <div class="kt-mycart__container pt-0 pb-0">
                                                    <div class="kt-mycart__info">
                                                        <a class="kt-mycart__title" style="font-size:11px;color:black;" ><b>
                                                           ` + data[i]['UserName'] + `</b>
                                                        </a>
                                                            <span class="kt-mycart__price" style="color:#003366;font-size:9px;">
                                                            <span style="color:#fd397a;  font-size:11px;  display: inline-flex;">` + data[i]['UserBranch'] + ` ŞUBE </span> - ` + moment(data[i]['LoginDate']).format('DD.MM.YYYY - HH:mm ') + `
                                                            </span>

                                                    </div>
                                                    <a class="kt-mycart__pic">
                                                            <div style="justify-content: center;" class="kt-user-card-v2">
                                                                <div class="kt-user-card-v2__pic">
                                                                <div class="kt-badge kt-badge--sm kt-badge--`+ data[i]['dot'] + `" style="height: 24px;width: 24px;"><span style="font-size: 12px;">` + name + `</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>`;
                        $('#OflineUserCount').text(data[i]['UserCount'] - c);
                    }
                    else {
                        var name = data[i]['UserNameFirst'];
                        List = List + `      <div class="kt-mycart__item pt-1 pb-1">
                                                <div class="kt-mycart__container pt-0 pb-0">
                                                    <div class="kt-mycart__info">
                                                        <a class="kt-mycart__title" style="font-size:11px;color:black;"><b>
                                                           ` + data[i]['UserName'] + `</b>
                                                        </a>
                                                            <span class="kt-mycart__price" style="color:#003366;font-size:9px;">
                                                            <span style="color:#fd397a; font-size:11px;   display: inline-flex;">` + data[i]['UserBranch'] + ` ŞUBE </span> - ` + moment(data[i]['LoginDate']).format('DD.MM.YYYY - HH:mm ') + `
                                                            </span>
                                                    </div>
                                                    <a class="kt-mycart__pic">
                                                            <div style="justify-content: center;" class="kt-user-card-v2">
                                                                <div class="kt-user-card-v2__pic">
                                                                <div class="kt-badge kt-badge--sm kt-badge--`+ data[i]['dot'] + `" style="height: 24px;width: 24px;"><span style="font-size: 12px;">` + name + `</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>`;
                        $('#OflineUserCount').text(data[i]['UserCount'] - c);
                    }
                }
                $('#LayoutOnlineUserInfo').append(List);
            }
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function MyChatUserList(id) {
    $.ajax({
        type: "POST",
        url: '/Chat/GetUSerChatList/' + id,
        success: function (data) {
            $('#myChatsUserList').empty();
            var CurrentUserChat = $('#CurrentUserChat').val();
            var List = "";
            var c = data.length;
            for (var i = 0; i < c; i++) {
                if (i % 2 == 0) {

                    var dott = data[i]['dot'];
                    if (dott == "") {
                        dott = "false";
                    }
                    else {
                        dott = "true";
                    }
                    var name = data[i]['UserNameFirst'];
                    var ID = data[i]['ID'];
                    var dateFor = data[i]['time'];
                    var Minute = data[i]['Minute'];
                    if (data[i]['Minute'] < 10)
                        Minute = "0" + data[i]['Minute'];
                    if (dateFor == 0) {
                        if (dateFor == 0 && Minute == 0) {
                            List = List + `<div class="kt-widget__item pl-3 pr-3 mt-0 mb-1 pb-1 pt-1"  style="background-color: #f4f4f7;">
                <div style="justify-content: center;cursor:pointer;" class="kt-user-card-v2">
<a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">
                           <div class="kt-user-card-v2__pic">
                                      <div class="kt-badge kt-badge--xl kt-badge--brand"><span style="font-size: 20px;">` + name + `</div>
                            </div>
</a>
                     </div>
                    <div class="kt-widget__info">
                        <div class="kt-widget__section">
                            <a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">` + data[i]['UserName'] + `</a>
                            <span class="kt-badge kt-badge--`+ dott + ` kt-badge--dot"></span>
                        </div>
                        <span class="kt-widget__desc" style="text-align: left;">`+ data[i]['Message'] + `</span>
                    </div>
                    <div class="kt-widget__action">
                        <span class="kt-widget__date"></span>
                        <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                    </div>
                </div>`;
                        }
                        else if (dateFor == 0 && Minute != 0) {

                            List = List + `<div class="kt-widget__item pl-3 pr-3 mt-0 mb-1 pb-1 pt-1"  style="background-color: #f4f4f7;">
                        <div style="justify-content: center;" class="kt-user-card-v2">
<a  style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">
                            <div class="kt-user-card-v2__pic">
                                <div class="kt-badge kt-badge--xl kt-badge--brand"><span style="font-size: 20px;">` + name + `</div>
                            </div>
</a>
                        </div>
                        <div class="kt-widget__info">
                            <div class="kt-widget__section">
                                <a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">` + data[i]['UserName'] + `</a>
                                <span class="kt-badge kt-badge--`+ dott + ` kt-badge--dot"></span>
                            </div>
                            <span class="kt-widget__desc" style="text-align: left;">`+ data[i]['Message'] + `</span>
                        </div>
                        <div class="kt-widget__action">
                            <span class="kt-widget__date">Bugün - ` + data[i]['Hour'] + ":" + Minute + `</span>
                            <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                        </div>
                    </div>`;
                        }


                    }
                    else if (dateFor == 1) {
                        List = List + `<div class="kt-widget__item pl-3 pr-3 mt-0 mb-1 pb-1 pt-1"  style="background-color: #f4f4f7;">
                     <div style="justify-content: center;" class="kt-user-card-v2">
<a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">
                           <div class="kt-user-card-v2__pic">
                                      <div class="kt-badge kt-badge--xl kt-badge--brand"><span style="font-size: 20px;">` + name + `</div>
                            </div>
</a>
                     </div>
                    <div class="kt-widget__info">
                        <div class="kt-widget__section">
                            <a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">` + data[i]['UserName'] + `</a>
                            <span class="kt-badge kt-badge--`+ dott + ` kt-badge--dot"></span>
                        </div>
                        <span class="kt-widget__desc" style="text-align: left;">`+ data[i]['Message'] + `</span>
                    </div>
                    <div class="kt-widget__action">
                        <span class="kt-widget__date"> Dün -` + data[i]['Hour'] + ":" + Minute + `</span>
                        <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                    </div>
                </div>`;
                    }
                    else {
                        List = List + `<div class="kt-widget__item pl-3 pr-3 mt-0 mb-1 pb-1 pt-1"  style="background-color: #f4f4f7;">
                   <div style="justify-content: center;" class="kt-user-card-v2">
<a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">
                           <div class="kt-user-card-v2__pic">
                                <div class="kt-badge kt-badge--xl kt-badge--brand"><span style="font-size: 20px;">` + name + `</div>
                            </div></a>
                     </div>
                    <div class="kt-widget__info">
                        <div class="kt-widget__section">
                            <a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">` + data[i]['UserName'] + `</a>
                            <span class="kt-badge kt-badge--`+ dott + ` kt-badge--dot"></span>
                        </div>
                        <span class="kt-widget__desc" style="text-align: left;">`+ data[i]['Message'] + `</span>
                    </div>
                    <div class="kt-widget__action">
                        <span class="kt-widget__date">` + dateFor + ` Gün Önce -` + data[i]['Hour'] + ":" + Minute + `</span>
                        <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                    </div>
                </div>`;
                    }
                }
                else {

                    var dott = data[i]['dot'];
                    if (dott == "") {
                        dott = "false";
                    }
                    else {
                        dott = "true";
                    }
                    var name = data[i]['UserNameFirst'];
                    var ID = data[i]['ID'];
                    var dateFor = data[i]['time'];
                    var Minute = data[i]['Minute'];
                    if (data[i]['Minute'] < 10)
                        Minute = "0" + data[i]['Minute'];
                    if (dateFor == 0) {
                        if (dateFor == 0 && Minute == 0) {
                            List = List + `<div class="kt-widget__item pl-3 pr-3 mt-0 mb-1 pb-1 pt-1">
                <div style="justify-content: center;cursor:pointer;" class="kt-user-card-v2">
<a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">
                           <div class="kt-user-card-v2__pic">
                                      <div class="kt-badge kt-badge--xl kt-badge--brand"><span style="font-size: 20px;">` + name + `</div>
                            </div>
</a>
                     </div>
                    <div class="kt-widget__info">
                        <div class="kt-widget__section">
                            <a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">` + data[i]['UserName'] + `</a>
                            <span class="kt-badge kt-badge--`+ dott + ` kt-badge--dot"></span>
                        </div>
                        <span class="kt-widget__desc" style="text-align: left;">`+ data[i]['Message'] + `</span>
                    </div>
                    <div class="kt-widget__action">
                        <span class="kt-widget__date"></span>
                        <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                    </div>
                </div>`;
                        }
                        else if (dateFor == 0 && Minute != 0) {

                            List = List + `<div class="kt-widget__item pl-3 pr-3 mt-0 mb-1 pb-1 pt-1">
                        <div style="justify-content: center;" class="kt-user-card-v2">
<a  style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">
                            <div class="kt-user-card-v2__pic">
                                <div class="kt-badge kt-badge--xl kt-badge--brand"><span style="font-size: 20px;">` + name + `</div>
                            </div>
</a>
                        </div>
                        <div class="kt-widget__info">
                            <div class="kt-widget__section">
                                <a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">` + data[i]['UserName'] + `</a>
                                <span class="kt-badge kt-badge--`+ dott + ` kt-badge--dot"></span>
                            </div>
                            <span class="kt-widget__desc" style="text-align: left;">`+ data[i]['Message'] + `</span>
                        </div>
                        <div class="kt-widget__action">
                            <span class="kt-widget__date">Bugün - ` + data[i]['Hour'] + ":" + Minute + `</span>
                            <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                        </div>
                    </div>`;
                        }


                    }
                    else if (dateFor == 1) {
                        List = List + `<div class="kt-widget__item pl-3 pr-3 mt-0 mb-1 pb-1 pt-1">
                     <div style="justify-content: center;" class="kt-user-card-v2">
<a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">
                           <div class="kt-user-card-v2__pic">
                                      <div class="kt-badge kt-badge--xl kt-badge--brand"><span style="font-size: 20px;">` + name + `</div>
                            </div>
</a>
                     </div>
                    <div class="kt-widget__info">
                        <div class="kt-widget__section">
                            <a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">` + data[i]['UserName'] + `</a>
                            <span class="kt-badge kt-badge--`+ dott + ` kt-badge--dot"></span>
                        </div>
                        <span class="kt-widget__desc" style="text-align: left;">`+ data[i]['Message'] + `</span>
                    </div>
                    <div class="kt-widget__action">
                        <span class="kt-widget__date"> Dün -` + data[i]['Hour'] + ":" + Minute + `</span>
                        <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                    </div>
                </div>`;
                    }
                    else {
                        List = List + `<div class="kt-widget__item pl-3 pr-3 mt-0 mb-1 pb-1 pt-1">
                   <div style="justify-content: center;" class="kt-user-card-v2">
<a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">
                           <div class="kt-user-card-v2__pic">
                                <div class="kt-badge kt-badge--xl kt-badge--brand"><span style="font-size: 20px;">` + name + `</div>
                            </div></a>
                     </div>
                    <div class="kt-widget__info">
                        <div class="kt-widget__section">
                            <a style="cursor:pointer;" onclick="MyChatUserBodyChange(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username">` + data[i]['UserName'] + `</a>
                            <span class="kt-badge kt-badge--`+ dott + ` kt-badge--dot"></span>
                        </div>
                        <span class="kt-widget__desc" style="text-align: left;">`+ data[i]['Message'] + `</span>
                    </div>
                    <div class="kt-widget__action">
                        <span class="kt-widget__date">` + dateFor + ` Gün Önce -` + data[i]['Hour'] + ":" + Minute + `</span>
                        <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                    </div>
                </div>`;
                    }
                }
            }
            $('#myChatsUserList').append(List);
            var value = $("#myInput2").val().toLowerCase();
            $("#myChatsUserList div").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }

    });
    $("#myInput2").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myChatsUserList div").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
};

function UserForChatModal(id) {
    $.ajax({
        type: "POST",
        url: '/Chat/GetUSerChatList/' + id,
        success: function (data) {
            var CurrentUserChat = $('#CurrentUserChat').val();
            $('#getUserForChatModal').empty();
            var List = "";
            var c = data.length;
            var dontShowCount = 0;

            for (var i = 0; i < c; i++) {
                if (i % 2 == 0) {
                    var name = data[i]['UserNameFirst'];
                    var Minute = data[i]['Minute'];
                    if (data[i]['Minute'] < 10)
                        Minute = "0" + data[i]['Minute'];
                    var dott = data[i]['dot'];
                    if (dott == "") {
                        dott = "false";
                    }
                    else {
                        dott = "true";
                    }
                    var dateFor = 0 /*data.data[i]['time'].toFixed(0)*/;
                    dontShowCount = dontShowCount + parseInt(data[i]['dontshow']);
                    if (dateFor == 0) {
                        if (dateFor == 0 && Minute == 0) {
                            List = List + `
                    <div clas="row" style="background-color: #f4f4f7; ">
                        <div clas="col-sm-12">
                             <div class="kt-widget__item pl-2 pr-2 pt-2 pb-2 mt-0" style="    align-items: center;">
                                  <div class="kt-widget__info">
                                     <div class="kt-widget__section">
                                          <a onclick="MyChatUserBodyChangeModal(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username" class="kt-widget__username" style="font-size:10px;">` + data[i]['UserName'] + `</a>
                                     </div>
                                         <span class="kt-widget__date"></span>
                                  </div>
                              <div class="kt-widget__action" style="flex: 0.3">
                                <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                  `;
                        }
                        else if (dateFor == 0 && Minute != 0) {
                            List = List + `
                    <div clas="row" style="background-color: #f4f4f7; ">
                        <div clas="col-sm-12">
                             <div class="kt-widget__item pl-2 pr-2 pt-2 pb-2 mt-0" style="    align-items: center;">
                                  <div class="kt-widget__info">
                                     <div class="kt-widget__section">
                                          <a onclick="MyChatUserBodyChangeModal(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username" class="kt-widget__username" style="font-size:10px;">` + data[i]['UserName'] + `</a>
                                     </div>
                                         <span class="kt-widget__date">Bugün -` + data[i]['Hour'] + ":" + Minute + `</span>
                                  </div>
                              <div class="kt-widget__action" style="flex: 0.3">
                                <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                  `;
                        }
                    }
                    else if (dateFor == 1) {
                        List = List + `
                    <div clas="row" style="background-color: #f4f4f7; ">
                        <div clas="col-sm-12">
                             <div class="kt-widget__item pl-2 pr-2 pt-2 pb-2 mt-0">
                                  <div class="kt-widget__info">
                                     <div class="kt-widget__section">
                                          <a onclick="MyChatUserBodyChangeModal(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username" style="font-size:10px;">` + data[i]['UserName'] + `</a>
                                              <span class="kt-badge kt-badge--`+ dott + ` kt-badge--dot"></span>
                                     </div>
                                         <span class="kt-widget__date">Dün -` + data[i]['Hour'] + ":" + Minute + `</span>
                                  </div>
                              <div class="kt-widget__action">
                                <span class="kt-badge kt-badge--success kt-font-bold">` + data[i]['dontshow'] + `</span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                  `;
                    }
                    else {
                        List = List + `
                    <div clas="row" style="background-color: #f4f4f7;>
                        <div clas="col-sm-12">
                             <div class="kt-widget__item pl-2 pr-2 pt-2 pb-2 mt-0">
                                  <div class="kt-widget__info">
                                     <div class="kt-widget__section">
                                          <a onclick="MyChatUserBodyChangeModal(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username" style="font-size:10px;">` + data[i]['Name'] + `</a>
                                              <span class="kt-badge kt-badge--`+ data[i]['dot'] + ` kt-badge--dot"></span>
                                     </div>
                                         <span class="kt-widget__date">` + dateFor + ` Gün Önce -` + data[i]['Hour'] + ":" + Minute + `</span>
                                  </div>
                              <div class="kt-widget__action">
                                <span class="kt-badge kt-badge--success kt-font-bold">` + data[i]['dontshow'] + `</span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                  `;
                    }
                }
                else {
                    var name = data[i]['UserNameFirst'];
                    var Minute = data[i]['Minute'];
                    if (data[i]['Minute'] < 10)
                        Minute = "0" + data[i]['Minute'];
                    var dott = data[i]['dot'];
                    if (dott == "") {
                        dott = "false";
                    }
                    else {
                        dott = "true";
                    }
                    var dateFor = 0 /*data.data[i]['time'].toFixed(0)*/;
                    dontShowCount = dontShowCount + parseInt(data[i]['dontshow']);
                    if (dateFor == 0) {
                        if (dateFor == 0 && Minute == 0) {
                            List = List + `
                    <div clas="row">
                        <div clas="col-sm-12">
                             <div class="kt-widget__item pl-2 pr-2 pt-2 pb-2 mt-0" style="    align-items: center;">
                                  <div class="kt-widget__info">
                                     <div class="kt-widget__section">
                                          <a onclick="MyChatUserBodyChangeModal(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username" class="kt-widget__username" style="font-size:10px;">` + data[i]['UserName'] + `</a>
                                     </div>
                                         <span class="kt-widget__date"></span>
                                  </div>
                              <div class="kt-widget__action" style="flex: 0.3">
                                <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                  `;
                        }
                        else if (dateFor == 0 && Minute != 0) {
                            List = List + `
                    <div clas="row">
                        <div clas="col-sm-12">
                             <div class="kt-widget__item pl-2 pr-2 pt-2 pb-2 mt-0" style="    align-items: center;">
                                  <div class="kt-widget__info">
                                     <div class="kt-widget__section">
                                          <a onclick="MyChatUserBodyChangeModal(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username" class="kt-widget__username" style="font-size:10px;">` + data[i]['UserName'] + `</a>
                                     </div>
                                         <span class="kt-widget__date">Bugün -` + data[i]['Hour'] + ":" + Minute + `</span>
                                  </div>
                              <div class="kt-widget__action" style="flex: 0.3">
                                <span class="kt-badge kt-badge--`+ dott + ` kt-font-bold">` + data[i]['dontshow'] + `</span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                  `;
                        }
                    }
                    else if (dateFor == 1) {
                        List = List + `
                    <div clas="row">
                        <div clas="col-sm-12">
                             <div class="kt-widget__item pl-2 pr-2 pt-2 pb-2 mt-0">
                                  <div class="kt-widget__info">
                                     <div class="kt-widget__section">
                                          <a onclick="MyChatUserBodyChangeModal(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username" style="font-size:10px;">` + data[i]['UserName'] + `</a>
                                              <span class="kt-badge kt-badge--`+ dott + ` kt-badge--dot"></span>
                                     </div>
                                         <span class="kt-widget__date">Dün -` + data[i]['Hour'] + ":" + Minute + `</span>
                                  </div>
                              <div class="kt-widget__action">
                                <span class="kt-badge kt-badge--success kt-font-bold">` + data[i]['dontshow'] + `</span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                  `;
                    }
                    else {
                        List = List + `
                    <div clas="row">
                        <div clas="col-sm-12">
                             <div class="kt-widget__item pl-2 pr-2 pt-2 pb-2 mt-0">
                                  <div class="kt-widget__info">
                                     <div class="kt-widget__section">
                                          <a onclick="MyChatUserBodyChangeModal(`+ data[i]['ID'] + `,` + CurrentUserChat + `)" class="kt-widget__username" style="font-size:10px;">` + data[i]['Name'] + `</a>
                                              <span class="kt-badge kt-badge--`+ data[i]['dot'] + ` kt-badge--dot"></span>
                                     </div>
                                         <span class="kt-widget__date">` + dateFor + ` Gün Önce -` + data[i]['Hour'] + ":" + Minute + `</span>
                                  </div>
                              <div class="kt-widget__action">
                                <span class="kt-badge kt-badge--success kt-font-bold">` + data[i]['dontshow'] + `</span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                  `;
                    }
                }
            }
            $('#IsReadFalseCount').text(dontShowCount);
            $('#getUserForChatModal').append(List);

            var value = $("#myInput1").val().toLowerCase();
            $("#getUserForChatModal div").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
    $("#myInput1").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#getUserForChatModal div").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

};

function MyChatUserBodyChange(UserID, MyID) {
    $.ajax({
        type: "POST",
        url: '/Chat/ChatUserBodyChange?UserID=' + UserID + '&MyID=' + MyID,
        success: function (data) {

            var List = "";
            var controlOne = $('#MessageCount').val();
            var ChatID = $('#GetChatIDforChat').val();
            var UserIDChange = $('#GetUserIDforChat').val();

            var c = data.data.length;
            debugger
            if (controlOne != undefined && controlOne == c && ChatID != undefined && UserIDChange == UserID) {

            }
            else {
                debugger
                $('#chatBodyChange').empty();
                for (var i = 0; i < c; i++) {
                    var name = data.data[i]['NameSub'];
                    var dateFor = data.data[i]['time'].toFixed(0);
                    var Minute = data.data[i]['Minute'].toFixed(0);
                    var Hour = data.data[i]['Hour'].toFixed(0);
                    //if (data.data[i]['Minute'] < 10)
                    //    Minute = "0" + data.data[i]['Minute'];
                    $('#ChatUserNameText').text(data.data[i]['NameUser']);
                    var dott = data.data[i]['dot'];
                    if (dott == "") {
                        dott = "false";
                    }
                    else {
                        dott = "true";
                    }
                    var ChatIDDet = data.data[i]['ChatID'];
                    if (data.data[i]['ChatID'] == undefined) {
                        ChatIDDet = 0;
                    }
                    if (dott == "false") {

                        var result = ` <span id="ChatUserActiveDot" class="kt-badge kt-badge--dot kt-badge--danger"></span> Çevrim Dışı
                                   <input hidden id="GetUserIDforChat" value="` + data.data[i]['userID'] + `" >
                                   <input hidden id="GetMYIDforChat" value="` + data.data[i]['MyID'] + `">
                                   <input hidden id="GetChatIDforChat" value="` + ChatIDDet + `">
                                   <input hidden id="MessageCount" value="` + data.data[i]['MessageCount'] + `">


                                    `;
                        $('#ChatUserActive').empty();
                        $('#ChatUserActive').append(result);
                    }
                    else {
                        var result = `<span id="ChatUserActiveDot" class="kt-badge kt-badge--dot kt-badge--success"></span> Çevrimiçi
                                   <input hidden id="GetUserIDforChat" value="` + data.data[i]['userID'] + `" >
                                   <input hidden id="GetMYIDforChat" value="` + data.data[i]['MyID'] + `">
                                   <input hidden id="GetChatIDforChat" value="` + ChatIDDet + `">
                                   <input hidden id="MessageCount" value="` + data.data[i]['MessageCount'] + `">

                                  `;
                        $('#ChatUserActive').empty();
                        $('#ChatUserActive').append(result);
                    }

                    if (data.data[i]['ID'] == UserID && data.data[i]['Message'] != undefined) {


                        List = List + `<div class="kt-chat__message">
                                        <div class="kt-chat__user pl-1 pt-1">
                                          <div style="justify-content: left;" class="kt-user-card-v2">
                                           <span class="kt-userpic kt-userpic--circle kt-userpic--sm">
												<img src="./assets/media/users/default.jpg" alt="image">
									       </span>
                                            <a href="#" class="kt-chat__username">`+ data.data[i]['Name'] + `</span></a>`;
                        if (Hour == 0 && dateFor == 0 && Minute > 0) {
                            List = List + `<span class="kt-chat__datetime">` + Minute + ` Dakika</span>`;
                        }
                        else if (Hour > 0 && dateFor == 0) {
                            List = List + `<span class="kt-chat__datetime">` + Hour + ` Saat</span>`;
                        }
                        else if (dateFor > 0) {
                            List = List + `<span class="kt-chat__datetime">` + dateFor + ` Gün</span>`;
                        }

                        List = List + `</div>
                                        <div class="kt-chat__text kt-bg-light-success">
                                            `+ data.data[i]['Message'] + `
                                        </div>
                                    </div>`;


                    }
                    else if (data.data[i]['ID'] == MyID) {
                        List = List + `<div class="kt-chat__message kt-chat__message--right">
                                        <div class="kt-chat__user">`;

                        if (Hour == 0 && dateFor == 0 && Minute > 0) {
                            List = List + `<span class="kt-chat__datetime">` + Minute + ` Dakika</span>`;
                        }
                        else if (Hour > 0 && dateFor == 0) {
                            List = List + `<span class="kt-chat__datetime">` + Hour + ` Saat</span>`;
                        }
                        else if (dateFor > 0) {
                            List = List + `<span class="kt-chat__datetime">` + dateFor + ` Gün</span>`;
                        }

                        List = List + `<a href="#" class="kt-chat__username">Ben</span></a>
                                            <span class="kt-userpic kt-userpic--circle kt-userpic--sm">
												<img src="./assets/media/users/default.jpg" alt="image">
											</span>
                                          </div>
                                        <div class="kt-chat__text kt-bg-light-brand">
                                            `+ data.data[i]['Message'] + `
                                        </div>
                                    </div>`;
                    }
                }
                $('#chatBodyChange').append(List);
                elb = document.getElementById('chatBodyChange');
                elb.scrollIntoView(false);
            }
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

var SendMessages = function () {
    var textarea = $('#SendMessageToMe').val();
    var ChatID = $('#GetChatIDforChat').val();
    var UserID = $('#GetUserIDforChat').val();
    var MyID = $('#GetMYIDforChat').val();

    if (textarea.length === 0) {
        return;
    }
    else {
        $.ajax({
            type: "POST",
            url: '/Chat/ChatSendMessage?UserID=' + UserID + '&ChatID=' + ChatID + '&MyID=' + MyID + '&Message=' + textarea,
            success: function (data) {
                $('#SendMessageToMe').val("");
                MyChatUserBodyChange(UserID, MyID);
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};
var denemmm = function () {
    var ChatID = $('#GetChatIDforChat').val();
    var UserID = $('#GetUserIDforChat').val();
    var MyID = $('#GetMYIDforChat').val();

    if ((MyID != undefined) && (ChatID != undefined) && (ChatID != undefined)) {
        MyChatUserBodyChange(UserID, MyID);
    }
};

var SendMessages2 = function () {
    var textarea = $('#SendMessageToMeModal').val();
    var ChatID = $('#GetChatIDforChatModal').val();
    var UserID = $('#GetUserIDforChatModal').val();
    var MyID = $('#GetMYIDforChatModal').val();
    if (textarea.length === 0) {
        return;
    }
    else {
        $.ajax({
            type: "POST",
            url: '/Chat/ChatSendMessage?UserID=' + UserID + '&ChatID=' + ChatID + '&MyID=' + MyID + '&Message=' + textarea,
            success: function (data) {
                $('#SendMessageToMeModal').val("");
                MyChatUserBodyChangeModal(UserID, MyID);
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
            }
        });
    }
};
var denemmm2 = function () {
    var ChatID = $('#GetChatIDforChatModal').val();
    var UserID = $('#GetUserIDforChatModal').val();
    var MyID = $('#GetMYIDforChatModal').val();

    if ((MyID != undefined) && (ChatID != undefined) && (ChatID != undefined)) {
        MyChatUserBodyChangeModal(UserID, MyID);
    }
};
function MyChatUserBodyChangeModal(UserID, MyID) {
    $.ajax({
        type: "POST",
        url: '/Chat/ChatUserBodyChange?UserID=' + UserID + '&MyID=' + MyID,
        success: function (data) {
            var controlOne = $('#MessageCount1').val();
            var ChatID = $('#GetChatIDforChatModal').val();
            var UserIDChange = $('#GetUserIDforChatModal').val();
            var List = "";
            var c = data.data.length;
            debugger
            if (controlOne != undefined && controlOne == c && ChatID != undefined && UserIDChange == UserID) {

            }
            else {
                $('#chatModalBodyChange').empty();
                for (var i = 0; i < c; i++) {
                    var name = data.data[i]['NameSub'];
                    var dateFor = data.data[i]['time'].toFixed(0);
                    var Minute = data.data[i]['Minute'].toFixed(0);
                    var Hour = data.data[i]['Hour'].toFixed(0);
                    //if (data.data[i]['Minute'] < 10)
                    //    Minute = "0" + data.data[i]['Minute'];
                    $('#ChatUserNameTextModal').text(data.data[i]['NameUser']);
                    var ChatIDDetModal = data.data[i]['ChatID'];
                    if (data.data[i]['ChatID'] == undefined) {
                        ChatIDDetModal = 0;
                    }
                    if (data.data[i]['dot'] == false) {
                        var result = ` <span id="ChatUserActiveDot" class="kt-badge kt-badge--dot kt-badge--danger"></span> Çevrim Dışı
                                   <input hidden id="GetUserIDforChatModal" value="` + data.data[i]['userID'] + `" >
                                   <input hidden id="GetMYIDforChatModal" value="` + data.data[i]['MyID'] + `">
                                   <input hidden id="GetChatIDforChatModal" value="` + ChatIDDetModal + `">
                                   <input hidden id="MessageCount1" value="` + data.data[i]['MessageCount'] + `">`;
                        $('#ChatUserActiveModal').empty();
                        $('#ChatUserActiveModal').append(result);
                    }
                    else {
                        var result = `<span id="ChatUserActiveDot" class="kt-badge kt-badge--dot kt-badge--success"></span> Çevrimiçi
                                   <input hidden id="GetUserIDforChatModal" value="` + data.data[i]['userID'] + `" >
                                   <input hidden id="GetMYIDforChatModal" value="` + data.data[i]['MyID'] + `">
                                   <input hidden id="GetChatIDforChatModal" value="` + ChatIDDetModal + `">
                                   <input hidden id="MessageCount1" value="` + data.data[i]['MessageCount'] + `">`;
                        $('#ChatUserActiveModal').empty();
                        $('#ChatUserActiveModal').append(result);
                    }

                    if (data.data[i]['ID'] == MyID) {
                        List = List + `<div class="kt-chat__message kt-chat__message--right kt-bg-light-brand mt-0 mb-2 pt-1 pb-1" style="min-width: 250px;">
                                            <div class="kt-chat__user">`;
                        if (Hour == 0 && dateFor == 0 && Minute > 0) {
                            List = List + `<span class="kt-chat__datetime">` + Minute + ` Dakika</span>`;
                        }
                        else if (Hour > 0 && dateFor == 0) {
                            List = List + `<span class="kt-chat__datetime">` + Hour + ` Saat</span>`;
                        }
                        else if (dateFor > 0) {
                            List = List + `<span class="kt-chat__datetime">` + dateFor + ` Gün</span>`;
                        }
                        List = List + ` <a href="#" class="kt-chat__username">Ben</span></a>
                                                <span class="kt-userpic kt-userpic--circle kt-userpic--sm">
                                                    <img src="./assets/media/users/default.jpg" alt="image">
                                                </span>
                                            </div>
                                            <div class="kt-chat__text">
                                            `+ data.data[i]['Message'] + `
                                        </div>
                                    </div>`;
                    }
                    else if (data.data[i]['ID'] == UserID && data.data[i]['Message'] != undefined) {
                        List = List + `<div class="kt-chat__message kt-bg-light-success ml-3 mt-0 mb-1 pt-1 pb-1" style="min-width: 250px;">
                                    <div class="kt-chat__user">
                                       <span class="kt-userpic kt-userpic--circle kt-userpic--sm">
                                            <img src="./assets/media/users/default.jpg" alt="image">
                                       </span>
                                       <a class="kt-chat__username">` + data.data[i]['Name'] + `</span></a>`;
                        if (Hour == 0 && dateFor == 0 && Minute > 0) {
                            List = List + `<span class="kt-chat__datetime">` + Minute + ` Dakika</span>`;
                        }
                        else if (Hour > 0 && dateFor == 0) {
                            List = List + `<span class="kt-chat__datetime">` + Hour + ` Saat</span>`;
                        }
                        else if (dateFor > 0) {
                            List = List + `<span class="kt-chat__datetime">` + dateFor + ` Gün</span>`;
                        }
                        List = List + `     </div>
                                        <div class="kt-chat__text">
                                            `+ data.data[i]['Message'] + `
                                        </div>
                                    </div>`;
                    }
                }
                $('#chatModalBodyChange').append(List);
                elb = document.getElementById('chatModalBodyChange');
                elb.scrollIntoView(false);
            }
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
$(document).ready(function () {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#LayoutOnlineUserInfo div").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
function SendMessagesEnter(e) {
    e = e || window.event;
    if (event.keyCode === 13) {
        $("#MessagesEnterButton").click();
    }
};
function SendMessagesEnter2(e) {
    e = e || window.event;
    if (event.keyCode === 13) {
        $("#MessagesEnterButton2").click();
    }
};