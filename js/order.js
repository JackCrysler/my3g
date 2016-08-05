define(['jquery'],function($){
    if(window.location.href.indexOf('order.html') == -1) return;

    $('.pay-btn').on('click',function(){
        location.href = 'my.html';
    })
});