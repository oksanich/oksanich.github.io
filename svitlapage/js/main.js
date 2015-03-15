$(document).ready(function(){

    /* ---Show mobile menu--- */

    $('._nav_M').click(function(){
        $('._navList_M').slideToggle('slow');
    });

    /* ---Show mobile search--- */

    $('.formIconHolder').click(function(){
        $('.hidden').slideToggle('slow');
    });

    /* ---Slide back mobile search--- */

    $('.icon-back').click(function(){
        $('.hidden').slideToggle('slow');
    });

    /* ---Show section item details--- */

    $('._infoItemDetails').click(function(){
        $('.infoItem').toggleClass('open');
        $('.detailsItem').slideToggle('fast');
    });

    /* ---Header desktop change search--- */

    $('._dropdown').click(function(){
        $('._searchTopDropdownWrap').toggleClass('open');
        $('._dropdownList').slideToggle('slow');
    });
});

