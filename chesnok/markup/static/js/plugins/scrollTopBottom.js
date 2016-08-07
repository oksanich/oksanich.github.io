//-------------------------
// Scroll Top/Bottom
//-------------------------

$(function(){

    'use strict'

    var top = '._scrollTop',
        bottom = '._scrollBottom';

    $(top).click(function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
    $(bottom).click(function(){
        $('html,body').animate({scrollTop: $(document).height()}, 1000);
        return false;
    });
});