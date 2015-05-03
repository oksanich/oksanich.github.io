$(document).ready(function(){
    $('._dropdown').click(function(){
        var $this = $(this);
        $this.siblings().slideToggle('fast');
        $this.children().toggleClass('arrow-down').toggleClass('arrow-up');
    });

    $('._headerSearchBtnMobile').click(function(){
        $('._headerSearchWrap').toggleClass('hidden-xs');
    });

    $('._headerMenuBtnMobile').click(function(){
        $('._topMenu').slideToggle('fast');
    });

});