define(['jquery','artTemplate'],function($,template){
    if(window.location.href.indexOf('my.html') == -1) return;

    var wrap = $('.tab-main-wrap section');
    var queryTpl = '<ul class="count">'+
    '<%for (var i=0; i<lists.length; i++){%>'+
    '<li><h4><%= lists[i].name %></h4><p><%= lists[i].info %></p></li>'+
    '<%}%>'+
    '</ul>';
    $('.tab-title').on('click','span',function(){
        var id = $(this).attr('data');
        rend(id);



    });

    function rend(id){
        $.when($.ajax('../data/usedInfo.json'))
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
});