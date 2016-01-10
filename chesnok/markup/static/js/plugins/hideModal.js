//-------------------------
// Hide modal
//-------------------------

$(function () {

    'use strict'

    $('.linkForgotPassword').on('click', function () {
        $('#modalSignIn').css("display", "none");
        $('.modal-backdrop').css("display", "none");
    })

    $('.mobileMenuItem').click(function(e) {
        e.stopPropagation();
        if ($(e.target).is('[data-toggle=modal]')) {
            $($(e.target).data('target')).modal()
        }
    });
});