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
function MakeCenterBranch() {
    var branchId = $('#BranchListForSettings').val();
    debugger
    $.ajax({
        type: "POST",
        url: '/GeneralSettings/MakeCenterBranch?branchId=' + branchId,
        //"language": {
        //    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
        //},
        success: function (data) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                }
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function getEditCoefficient() {
    debugger
    coefficientID = 10398;
    coefficientID2 = 47474;

    $.ajax({
        type: "POST",
        url: '/GeneralSettings/GetcoefficientByID?coefficientID=' + coefficientID,
        success: function (data) {
            $('#coefficient').val(data['SettingsVal']);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
    $.ajax({
        type: "POST",
        url: '/GeneralSettings/GetcoefficientByID?coefficientID=' + coefficientID2,
        success: function (data) {
            $('#SettingsCode').val(data['SettingsVal']);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function SaveCoefficientVal() {
    var coefficientVal = $('#coefficient').val();
    coefficientID = 10398;
    var coefficientVal2 = $('#SettingsCode').val();
    coefficientID2 = 47474;
    debugger
    $.ajax({
        type: "POST",
        url: '/GeneralSettings/SaveCoefficientVal?coefficientID=' + coefficientID + '&coefficientVal=' + coefficientVal,
        success: function (data) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                }
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
    $.ajax({
        type: "POST",
        url: '/GeneralSettings/SaveCoefficientVal?coefficientID=' + coefficientID2 + '&coefficientVal=' + coefficientVal2,
    });

};

function getEditLogoCompany() {
    companyLogoCode = 50598;
    compantNameCode = 100798;
    debugger
    $.ajax({
        type: "POST",
        url: '/GeneralSettings/CompanyLogoGet?companyLogoCode=' + companyLogoCode + '&compantNameCode=' + compantNameCode,
        success: function (data) {
            $('#kt_apps_user_add_avatar').append('<div id="backgroundImage" class="kt-avatar__holder" style="background-image: url(' + data['companyLogo'] + ');width: 250px; background-position: center; "></div>');
            $('#companyName').val(data['companyName']);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

$('#companyLogoInput').change(function myfunction() {
    debugger
    var fakeLogo = URL.createObjectURL(event.target.files[0]);

    $('#backgroundImage').closest('div').remove();
    $('#kt_apps_user_add_avatar').append('<div id="backgroundImage" class="kt-avatar__holder" style="background-image: url(' + fakeLogo + ');width: 250px; background-position: center; "></div>');
});

function getEditLogoCompany1() {
    companyLogoCode = 50598;
    debugger
    $.ajax({
        type: "POST",
        url: '/GeneralSettings/companyLogoLayout?companyLogoCode=' + companyLogoCode,
        success: function (data) {
            debugger
            $('#companyLogoLayout').attr('src', data['SettingsVal']);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};

function getOrderSettings() {
    $.ajax({
        type: "POST",
        url: '/GeneralSettings/getOrderSettings',
        success: function (data) {
            if (data['SettingsVal'] == 1) {
                $(" #isCheckedOrderSettings").prop("checked", true);
            }
            else {
                $(" #isCheckedOrderSettings").prop("checked", false);
            }
            if (data['SettingsVal2'] == 1) {
                $(" #isCheckedOrderSettings2").prop("checked", true);
            }
            else {
                $(" #isCheckedOrderSettings2").prop("checked", false);
            }
            if (data['SettingsVal3'] == 1) {
                $(" #isCheckedOrderSettings3").prop("checked", true);
            }
            else {
                $(" #isCheckedOrderSettings3").prop("checked", false);
            }
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function SaveOrderSettings() {
    debugger
    var a = $("#isCheckedOrderSettings").prop('checked');
    var OrderSettingsVal;
    if (a == true) {
        OrderSettingsVal = 1;
    }
    else {
        OrderSettingsVal = 0;
    }
    var settingsID = 7474;
    var a2 = $("#isCheckedOrderSettings2").prop('checked');
    var OrderSettingsVal2;
    if (a2 == true) {
        OrderSettingsVal2 = 1;
    }
    else {
        OrderSettingsVal2 = 0;
    }
    var settingsID2 = 1313;
    var a3 = $("#isCheckedOrderSettings3").prop('checked');
    var OrderSettingsVal3;
    if (a3 == true) {
        OrderSettingsVal3 = 1;
    }
    else {
        OrderSettingsVal3 = 0;
    }
    var settingsID3 = 7070;
    $.ajax({
        type: "POST",
        url: '/GeneralSettings/SaveAllForOrderSettings?settingsID=' + settingsID + '&OrderSettingsVal=' + OrderSettingsVal + '&settingsID2=' + settingsID2 + '&OrderSettingsVal2=' + OrderSettingsVal2 + '&settingsID3=' + settingsID3 + '&OrderSettingsVal3=' + OrderSettingsVal3,
        success: function (data) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                }
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};