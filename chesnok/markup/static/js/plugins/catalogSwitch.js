//-------------------------
// Catalog switch
//-------------------------

$(function(){

    'use strict'

    $('#list').click(function(){
        var $this = $(this);
        $('#products .item').addClass('list-group-item');
        $this.parent($('.catalogRightSwitch')).removeClass('listItem');
    });

    $('#grid').click(function(){
        var $this = $(this);
        $('#products .item').removeClass('list-group-item');
        $this.parent($('.catalogRightSwitch')).addClass('listItem');
    });

});