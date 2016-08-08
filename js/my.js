define(['jquery','artTemplate'],function($,template){
    if(window.location.href.indexOf('my.html') == -1) return;

    var wrap = $('.tab-main-wrap section');
    var queryTpl = '<ul class="count">'+
    '<%for (var i=0; i<lists.length; i++){%>'+
    '<li><h4><%= lists[i].name %></h4><p><%= lists[i].info %></p></li>'+
    '<%}%>'+
    '</ul>';
    $('.tab-title').on('click','span',function(){
        $(this).addClass('on').siblings().removeClass('on');
        var id = $(this).attr('data');
        rend(id);
    });

    rend('query');
    function rend(id){
        var url = '';
        if(id=='query'){
            url = '../data/usedInfo.json';
        }else if(id =='pay'){
            var info = {
                userPhone: 13261556179
            };
            var html = template(id,info);
            wrap.html(html);
            return;
        }
        $.when($.ajax(url))
            .done(function(data){
                var tmp = {
                    queryData:data
                };
                /*var render = template.compile(queryTpl);
                 var html = render({
                 lists: data
                 });*/
                var html = template(id,tmp);
                wrap.html(html);
            })
            .fail(function(e){
                console.log(e)
            });
    }

    $('.tab-main').on('click','.fee-amount',function(){
        $(this).addClass('on').siblings().removeClass('on');
    })
});