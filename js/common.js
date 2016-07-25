define([],function(){
    return {
        getUrlParams:function(target){
            var reg = new RegExp("(&|^)"+target+"=([^&]*)(&|$)",'i');
            var res = location.search.substr(1).match(reg);
            console.log(res);
            return res[2];
        },
        countDown:function(ele){
            if(window._timer){
                clearInterval(_timer);
            }
            var leftTime = 10;
            var timer;
            timer = setInterval(function(){
                leftTime --;
                if(leftTime<=0){
                    ele.text('获取验证码');
                    clearInterval(timer)
                }else{
                    ele.text(leftTime+'s后重发')
                }
            },1000);
            window._timer = timer;
        }
    }
});