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
        var $this = $(this);
        $this.parent($('.infoItem')).toggleClass('open').parent($('.itemGroup')).find($('.detailsItem')).slideToggle(0);
    });

    /* ---Header desktop change search--- */

    $('._dropdown').click(function(){
        $('._searchTopDropdownWrap').toggleClass('open');
        $('._dropdownList').slideToggle('slow');
    });

    $('._dropdownList').on('click', 'li', function () {
        var $this = $(this);

        // выключили один, появился другой
        $('.hidden').removeClass('hidden');
        $this.addClass('hidden');

        // передаем значение вверх
        $('._dropdown').text($this.children('a').text());

        $('._searchTopDropdownWrap').toggleClass('open');
        $('._dropdownList').slideToggle('slow');

    });
});

