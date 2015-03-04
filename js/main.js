$(function () {

    /* ---Active menu item--- */

    $('.headerNavLink').each(function () {    // получаем все нужные нам ссылки
        var location = window.location.href; // получаем адрес страницы
        var link = this.href;                // получаем адрес ссылки
        if(location === link) {               // при совпадении адреса ссылки и адреса окна
            $(this).addClass('_active');  //добавляем класс
        }
    });

    /* ---Change mobile menu icon And slide menu--- */

    $('._sandwichOpen').click(function() {
        $(this).toggleClass('sandwichClose');
        $('.wrapHeaderNav').slideToggle('slow');
    });

    /* ---For plugin easyPieChart--- */

    $('._chart').easyPieChart({
        scaleColor: false,
        lineWidth: 5,
        lineCap: 'butt',
        barColor: '#000',
        trackColor: '#9d9b9b',
        size: 100,
        animate: 2000,
        onStep: function(value) {
            this.$el.find('span').text(~~value);
        }
    });
});
