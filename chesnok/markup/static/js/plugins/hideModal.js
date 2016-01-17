//-------------------------
// Hide modal
//-------------------------

$(function () {

    'use strict'

    $('.linkForgotPassword').on('click', function () {
        $('#modalSignIn').css("display", "none");
        $('.modal-backdrop').css("display", "none");
    });

    $('._btnNotify').on('click', function () {
        $('#modalPreview').css("visibility", "hidden");
        $('#modalPreview').css("display", "none");
        $('.modal-backdrop').css("display", "none");
    });

    $('#modalEntrance').on('click', function(){
        $('#modalPreview').css("visibility", "visible");
    });

    $('.mobileMenuItem').click(function(e) {
        e.stopPropagation();
        if ($(e.target).is('[data-toggle=modal]')) {
            $($(e.target).data('target')).modal()
        }
    });

    $('._btnNotify').click(function(e) {
        e.stopPropagation();
        if ($(e.target).is('[data-toggle=modal]')) {
            $($(e.target).data('target')).modal()
        }
    });
});