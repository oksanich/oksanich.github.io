$(document).ready(function(){

    $('._mobileSearchBtn').click(function(){
        $('._headerSearchWrap').toggleClass('hidden-xs');
    });

    $('._mobileMenuBtn').click(function(){
        $('._mainMenu').slideToggle('fast');
    });

});