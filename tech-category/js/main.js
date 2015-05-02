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

    // Color switch

    (function($) {
        $.fn.removeClassWild = function(mask) {
            return this.removeClass(function(index, cls) {
                var re = mask.replace(/\*/g, '\\S+');
                return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
            });
        };
    })(jQuery);

    $('._topMenu ._colorElectronics').on('click', function(){
        var wrap = '.wrapper';
        $(wrap).removeClassWild('_*');
        $(wrap).addClass('_colorElectronics');
    });

    $('._topMenu ._colorInternet').click(function(){
        var wrap = '.wrapper';
        $(wrap).removeClassWild('_*');
        $(wrap).addClass('_colorInternet');
    });

    $('._topMenu ._colorEntertainment').click(function(){
        var wrap = '.wrapper';
        $(wrap).removeClassWild('_*');
        $(wrap).addClass('_colorEntertainment');
    });

    $('._topMenu ._colorInnovation').click(function(){
        var wrap = '.wrapper';
        $(wrap).removeClassWild('_*');
        $(wrap).addClass('_colorInnovation');
    });
});