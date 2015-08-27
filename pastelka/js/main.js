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