var showErrorMsg = function (form, type, msg) {
    var alert = $('<div class="kt-alert kt-alert--outline alert alert-' + type + ' alert-dismissible" role="alert">\
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\
			<span></span>\
		</div>');

    form.find('.alert').remove();
    alert.prependTo(form);
    //alert.animateClass('fadeIn animated');
    KTUtil.animateClass(alert[0], 'fadeIn animated');
    alert.find('span').html(msg);
}

$('#kt_login_signin_submit').click(function (e) {
    e.preventDefault();
    var btn = $(this);
    var form = $(this).closest('form');
    form.validate({
        rules: {
            email: {
                required: true
            },
            password: {
                required: true
            }
        }
    });
    if (!form.valid()) {
        return;
    }
    btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
    form.ajaxSubmit({
        url: '/Login/CheckLogin',
        success: function (response, status, xhr, $form) {
            if (response['FirstName'] == "") {
                // similate 2s delay
                setTimeout(function () {
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    showErrorMsg(form, 'danger', 'Hatali kullanici adi veya parola girdiniz.');
                }, 2000);
            }
            else {
                window.location.href = "/Home/Index";
            }
            

        }
    });
});

function sessionTimeForever() {
    $.get('/Login/GetSessionTime/', function (data) {
        console.log(data);
    });
}
window.setInterval(sessionTimeForever, 30000);