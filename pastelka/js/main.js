// Carousel home page

$('#carousel').carousel({
    interval: 3000
});

// Carousel special offers

$('#carouselOffers').carousel({
    interval: 6000
});

$('._moreLess').click(function(){
    var $this = $(this);
    $this.parent().toggleClass('showMore');
});

// Switch button

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

// Open/close mobile category item

$('._headerCategoryList .headerCategoryItem').on('click', function () {
    if($(this).hasClass("open")){
        $(this).removeClass("open");
    }else{
        $(this).addClass("open").siblings().removeClass('open');
    }
});

// Slider

$('.uislide').slider({
    min:0,
    max:100,
    values: [0,100],
    step:1,
    range:true,
    slide:function(event, ui){
        $('.uislide').prev().val(ui.values[0]);
        $('.uislide').next().val(ui.values[1]);

        var offset1 = $('.ui-slider-handle:eq(0)').offset();
        var offset2 = $('.ui-slider-handle:eq(1)').offset();
        $('.uislide').prev().css({'left':offset1.left-7});
        $('.uislide').next().css({'left':offset2.left-7});

    },

    start: function(event, ui) {
        var offset1 = $('.ui-slider-handle:eq(0)').offset();
        var offset2 = $('.ui-slider-handle:eq(1)').offset();
        $('.uislide').prev().css({'position':'relative'});
        $('.uislide').next().css({'position':'relative'});
        $('.uislide').prev().animate({'left':offset1.left-"7"},100);
        $('.uislide').next().animate({'left':offset2.left-"7"},100);
    },

    stop: function(event, ui) {
        var offset1 = $('.ui-slider-handle:eq(0)').eq(0).offset();
        var offset2 = $('.ui-slider-handle:eq(1)').eq(1).offset();

        $('.uislide').prev().css({'position':'relative'});
        $('.uislide').next().css({'position':'relative'});
        $('.uislide').prev().animate({'left':0},100);
        $('.uislide').next().animate({'left':0},100);
    }
});

jQuery(document).ready(function($) {
    $('#gallery-1').royalSlider({
        fullscreen: {
            enabled: true,
            nativeFS: true
        },
        controlNavigation: 'thumbnails',
        autoScaleSlider: true,
        autoScaleSliderWidth: 500,
        autoScaleSliderHeight: 400,
        loop: false,
        imageScaleMode: 'fit-if-smaller',
        navigateByClick: true,
        numImagesToPreload:6,
        arrowsNav:true,
        arrowsNavAutoHide: true,
        arrowsNavHideOnTouch: true,
        keyboardNavEnabled: true,
        fadeinLoadedSlide: true,
        globalCaption: true,
        globalCaptionInside: false,
        thumbs: {
            appendSpan: true,
            firstMargin: true,
            paddingBottom: 4
        }
    });
});

// This button will increment the value
$('.qtyplus').click(function(e){
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr('field');
    // Get its current value
    var currentVal = parseInt($('input[name='+fieldName+']').val());
    // If is not undefined
    if (!isNaN(currentVal)) {
        // Increment
        $('input[name='+fieldName+']').val(currentVal + 1);
    } else {
        // Otherwise put a 0 there
        $('input[name='+fieldName+']').val(0);
    }
});
// This button will decrement the value till 0
$(".qtyminus").click(function(e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr('field');
    // Get its current value
    var currentVal = parseInt($('input[name='+fieldName+']').val());
    // If it isn't undefined or its greater than 0
    if (!isNaN(currentVal) && currentVal > 0) {
        // Decrement one
        $('input[name='+fieldName+']').val(currentVal - 1);
    } else {
        // Otherwise put a 0 there
        $('input[name='+fieldName+']').val(0);
    }
});

// Brand-page mobile

(function($) {
    var $window = $(window),
        $html = $('._wrapBrandsName');

    function resize() {
        if ($window.width() < 768) {
            return $html.addClass('mobile');
        }

        $html.removeClass('mobile');
    }

    $window.resize(resize).trigger('resize');

})(jQuery);

