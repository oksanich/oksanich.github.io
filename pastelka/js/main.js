$('#carousel').carousel({
    interval: 3000
});

$('#carouselOffers').carousel({
    interval: 6000
});

$('#list').click(function(){
    var $this = $(this);
    $('#products .item').addClass('list-group-item');
    $this.parent($('.catalogRightSwitch')).addClass('listItem');
});
$('#grid').click(function(){
    var $this = $(this);
    $('#products .item').removeClass('list-group-item');
    $this.parent($('.catalogRightSwitch')).removeClass('listItem');
});