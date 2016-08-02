define([], function () {
    return {
        getUrlParams: function (target) {
            var reg = new RegExp("(&|^)" + target + "=([^&]*)(&|$)", 'i');
            var res = location.search.substr(1).match(reg);
            return res[2];
        },
        countDown: function (ele) {
            if(ele.hasClass('counting')) return;
            if (window._timer) {
                clearInterval(_timer);
            }
            var leftTime = 10;
            var timer;
            timer = setInterval(function () {
                leftTime--;
                if (leftTime <= 0) {
                    ele.text('获取验证码');
                    ele.removeClass('counting');
                    clearInterval(timer)
                } else {
                    ele.text(leftTime + 's后重发');
                    ele.addClass('counting');
                }
            }, 1000);
            window._timer = timer;
        },
        getAgentType: function () {
            var browser={
                versions:function(){
                    var u = navigator.userAgent, app = navigator.appVersion;
                    return {//移动终端浏览器版本信息
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                    };
                }(),
                language:(navigator.browserLanguage || navigator.language).toLowerCase()
            };


            return {
                lan:browser.language,
                isMobile:browser.versions.mobile,
                isAndroid:browser.versions.android,
                isIos:browser.versions.ios,
                isIphone:browser.versions.iPhone,
                isiPad:browser.versions.iPad
            }
        },
        transitionEnd:function(){
            var el = document.createElement('bootstrap'),t;
            console.log(el);
            var transitions = {
                'WebkitTransform': 'webkitTransitionEnd',
                'OTransform': 'oTransitionEnd',
                'MozTransform': 'TransitionEnd',
                'MsTransform': 'msTransitionEnd',
                'transform': 'transitionEnd'
            };
            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    this.transform = t;
                    return transitions[t];
                }
            }

        },
        uniqueArray:function(arr){
            var obj = {},_arr=[];
            arr.forEach(function(v,i){
                if(!obj[v]){
                    obj[v] = 1;
                    _arr.push(v);
                }
            });
            return _arr;
        }
    }
});

