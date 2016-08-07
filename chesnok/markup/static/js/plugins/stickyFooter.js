//-------------------------
// Sticky Footer
//-------------------------

$(function () {

    'use strict'


    if ($(document).height() <= $(window).height())
        $('._footerMain').addClass('navbar-fixed-bottom');
});