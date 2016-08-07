//-------------------------
// Category Mobile Menu
//-------------------------

$(function () {

    'use strict'

    $('._headerCategoryList .headerCategoryItem').on('click', function () {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
        } else {
            $(this).addClass("open").siblings().removeClass('open');
        }
    });
});