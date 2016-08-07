//-------------------------
// Show More/Less
//-------------------------

$(function () {
    var showMore = '._showMore',
        showLess = '._showLess',
        itemList = '._itemReview',
        size = $('._itemReview').length,
        x = 2;

    $('#myList li:lt(' + x + ')').show();

    $(showMore).click(function () {
        x = (x + 3 <= size) ? x + 3 : size;
        $('._itemReview:lt(' + x + ')').show();

        if (x > 2) {
            $(showLess).show();
        } else {
            $(showLess).hide();
        }

        if (x >= size) {
            $(showMore).hide();
        } else {
            $(showMore).show();
        }
    });

    $(showLess).click(function () {
        x = (x - 2 < 0) ? 2 : x - 3;
        $(itemList).not(':lt(' + x + ')').hide();

        if (x > 2) {
            $(showLess).show();
        } else {
            $(showLess).hide();
        }

        if (x >= size) {
            $(showMore).hide();
        } else {
            $(showMore).show();
        }
    });
})