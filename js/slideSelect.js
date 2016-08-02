define(['jquery'],function($){
    /*
     * $('.room-time').slideSelect({
     *      init: 3,
     *      wrapper: $('.container'),
     *      data: ['14:00前','16:00前','18:00前','20:00前','22:00前'],
     *      title: '入住时间',
     *      renderTo: '.time',
     *      callback: function(a,b){
     *          alert(123);
     *      },
     *      cls: 'selected'
     * });
     */
    $.fn.slideSelect = function(option){
        var defaults = {
            data:[1,2,3,4],//待渲染的数据
            init:1,//初始值
            title:'information',
            wrapper: $('body'),
            renderTo: '',
            cls: 'selected',
            callback:function(){}
        };
        var settings = $.extend({},defaults,option); //合并继承参数

        //基本结构
        var baseHtml = '<div class="slide-selector hide"><div class="mask-layer mask-hide"></div><div class="slide-content slide-hide"></div></div>';

        //判断页面是否已经有slide-selector的架构，有的话不在生成新的
        if(settings.wrapper.find('.slide-selector').length==0){
            $(baseHtml).appendTo(settings.wrapper);
        }

        var slideList = $('.slide-selector .slide-content');

        //循环遍历当前的data，生成新的dom结构
        var tmpHtml = '<div class="slide-title">{title}<span class="slide-cancel">取消</span></div>' +
            '<ul>{content}</ul>';
        function render(target){
            var str = '', index = $(target).attr('data-value') || settings.init;
            if(settings.data && $.isArray(settings.data)){

                $.each(settings.data,function(i,v){
                    if(i == index-1){
                        str+='<li class="'+settings.cls+'" value="'+(i+1)+'">'+v+'</li>';
                    }else{
                        str+='<li value="'+(i+1)+'">'+v+'</li>';
                    }
                })
            }
            //将生成好的dom字符串返回
            return tmpHtml.replace(/\{content\}/, str).replace(/\{title\}/,settings.title);
        }

        //给options和取消按钮绑定事件

        function bindEvent(target){
            slideList.off()
                .on('click','li',function(){
                    $(this).addClass(settings.cls).siblings().removeClass(settings.cls);
                    var val = $(this).attr('value');

                    $(settings.renderTo).text($(this).text());

                    $(target).attr('data-value',val);

                    settings.callback && settings.callback(val,$(this).text());

                    hide();
                })
                .on('click','.slide-cancel',hide);
        }

        //绑定事件 this $(this)
        this.on('click',function(){
            //根据当前的数据更新dom
            slideList.html(render(this));
            //调用显示组件的方法
            show();

            bindEvent(this);
        });

        function show(){//控制组件的显示功能
            history.pushState({},settings.title,location.href+'?plugin_slideselect');
            settings.wrapper.find('.slide-selector').removeClass('hide');
            setTimeout(function(){
                settings.wrapper.find('.mask-layer').removeClass('mask-hide');
                settings.wrapper.find('.slide-content').removeClass('slide-hide');
            },10); //hack 解决动画执行时的bug

        }

        function hide(){//隐藏组件
            if(location.href.indexOf('plugin_slideselect')>0){
                var _href = location.href.replace(/(\?|&)plugin_slideselect/,'');
                history.replaceState({},'',_href);
            }
            settings.wrapper.find('.mask-layer').addClass('mask-hide');
            settings.wrapper.find('.slide-content').addClass('slide-hide');

            setTimeout(function(){
                settings.wrapper.find('.slide-selector').addClass('hide');
            },300);
        }

        window.addEventListener('popstate',function(){
            if(location.href.indexOf('plugin_slideselect')==-1){
                hide();
            }
        },false)
    }
});

