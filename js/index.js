define(['jquery','js/valid','js/api','js/common'],function($,V,api,common){
    var Id = $('.Id'),
        Code = $('.Code'),
        validBtn = $('.code');

    var IdVal = $.trim(Id.val());
    var CodeVal = $.trim(Code.val());
    var validCode =null;
    validBtn.on('click',function(){
        if(V.idCard(IdVal)){
            common.countDown(validBtn);
            api.getAccountInfo({
                 wechat_id: common.getUrlParams('wechat_id'),
                 idcard: $.trim(Id.val())
            },function(data){
                 validCode = data.code
            });
         return;
        }
        alert('请输入正确格式的证件号码')
    });


    function check(){
        IdVal = $.trim(Id.val());
        CodeVal = $.trim(Code.val());
        if(IdVal && CodeVal){
            if(V.idCard(IdVal) && /\d{6}/.test(CodeVal)){
                $('.login-btn').removeClass('btn-dis');
            }else{
                $('.login-btn').addClass('btn-dis');
            }
        }
    }
    Id.on('input propertychange',function(){
        check();
    });
    Code.on('input propertychange',function(){
        check();
    });

    $('.login-btn').on('click',function(){
         if($.trim(Code.val()) == validCode){
             location.href = '';
         }else{
             alert('验证码输入有误。')
         }
    })


});