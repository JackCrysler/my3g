define(['jquery','js/common','js/dialog','js/api'],function($,common,dialog,api){
    if(window.location.href.indexOf('bind.html') == -1) return;
    var url = 'https://ticwear-account.mobvoi.com/captcha/img?origin=ticwatch-service';
    var arr = [];

    function randNum(max,min){
        var tmp = Math.floor(Math.random()*(max-min))+min;

        while(arr.indexOf(tmp)>-1 && arr.length<(max-min)){
            tmp = Math.floor(Math.random()*(max-min))+min;
        }
        if(arr.length<=(max-min)){
            arr.push(tmp);
            return tmp;
        }else{
            return false;
        }
    }
    $('#randomImg').on('click',function(){
        var tmp = randNum(9999,1000) || 'error';
        url = url + '&random_code=' + tmp;
        $(this).attr('src',url).attr('data-random-code',tmp);
    });


    var Dialog = new dialog();
    var flag = true;
    var _code = '';
    $('.code').on('click',function(){
        var phone = $('.phone-number').val(),
            imgCode = $('.img-code').val();
        var reg_phone = /^1[3578]\d{9}$/g,
            reg_imgcode = /[a-zA-Z0-9]{4}/g;
        if(!reg_phone.test(phone)){
            Dialog.alert('请输入正确格式的手机号码',function(){
                $('.phone-number').focus();
                flag =false;
            });
            return;
        }
        if(!reg_imgcode.test(imgCode)){
            Dialog.alert('请输入验证码',function(){
                $('.img-code').focus();
                flag =false;
            });
            return;
        }
        flag = true;

        if(!flag) return;
        common.countDown($(this));
        api.getVerifyCode({id:1},function(data){
            console.log(data);
            if(data[1] == 'success'){
                _code = data[0].code;
            }

        })
    });

    $('.img-code').on('input propertychange',function(){
        var self = $(this);
        var val = self.val();
        if(val.length>4){
            val = val.substr(0,4);
            self.val(val);
        }
    }).on('blur',function(){
        var self = $(this);
        if($(this).val().length==4){
            $.ajax({
                url:'../data/imgcodeverify.json?code'+$(this).val(),
                success:function(data){
                    if(!data.res){
                        Dialog.alert('验证码输入有误',function(){
                            $('#randomImg').click();
                            self.focus();
                            flag =false;
                        });
                    }else{
                        flag =true;
                    }

                }
            })
        }

    });

    $('.verify-code').on('input propertychange',function(){
        var val = $(this).val();
        if(val.length == 6){
            $('.btn-dis').removeClass('btn-dis');
        }
    });
    $('.bind-btn').on('click',function(){
        if($(this).hasClass('btn-dis')) return;
        if($('.verify-code').val() != _code){
            Dialog.alert('验证码输入有误',function(){
                $('.verify-code').focus();
            });
            return;
        }
        window.location.href = '../pages/choose.html';
    })

});