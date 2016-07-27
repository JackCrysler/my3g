define(['jquery','js/common','js/dialog'],function($,common,dialog){
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
    $('.code').on('click',function(){
        var phone = $('.phone-number').val(),
            imgCode = $('.img-code').val();
        var reg_phone = /^1[3578]\d{9}$/g,
            reg_imgcode = /[a-zA-Z0-9]{4}/g;
        if(!reg_phone.test(phone)){
            Dialog.alert('请输入正确格式的手机号码',function(){
                $('.phone-number').focus();
            });
            return;
        }
        if(!reg_imgcode.test(imgCode)){
            Dialog.alert('请输入验证码',function(){
                $('.img-code').focus();
            })
        }

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
                        })
                    }
                }
            })
        }

    })
});