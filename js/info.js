define(['jquery','js/common','js/valid','js/dialog'],function($,common,validate,dialog){
     if(window.location.href.indexOf('info.html') == -1) return;
     //初始化dialog组件
     var Dialog = new dialog();

     //从url链接中取到参数值
     var iccid = common.getUrlParams('ICCID');
     var phone = common.getUrlParams('phone');
     var prestore = common.getUrlParams('prestore');
     var packages = common.getUrlParams('packages');
     var showCaller = common.getUrlParams('showCaller');
     var formatPhone = phone.replace(/^(\d{3})(\d{4})(\d+)$/g,function(a,b,c,d){
          return b+" "+c+" "+d
     });

     $('.box-info').html(prestore+'预存/'+(packages=='p1'?'0元月租':'30元月租')+'/'+formatPhone);

     //验证文本框
     function valid(ele,reg){
          if(common.getType(reg) == '[object RegExp]' ){
               return reg.test(ele.val());
          }else if(common.getType(reg) == '[object Function]'){
               return reg(ele.val())
          }
     }
     function check(){
          var btn = $('#submit .next-btn');
          if(
              valid($('.info-name'),/\S/)
              && valid($('.info-id'),validate.idCard)
              && valid($('.info-id-location'),/^[\u4E00-\u9FA5]+$/)
              && valid($('.info-phone'),/^1[3578]\d{9}$/)
               && $('#upload').hasClass('high')
               && $('#info-ck').prop('checked')
          ){
               btn.removeClass('btn-dis');
          }else{
               btn.addClass('btn-dis');
          }
     }
     $('.info-name').on('input propertychange',function(){
          check();
     });
     $('.info-id').on('input propertychange',function(){
          check();
     });
     $('.info-id-location').on('input propertychange',function(){
          check();
     });
     $('.info-phone').on('input propertychange',function(){
          check();
     });

     //图片上传

     $('#upload').on('click',function(){
          var pa = $('.plus-area');
          pa.removeClass('right-hide');
          if(pa.children().length==0){
              pa.html($('#upload-tpl').html()).trigger('page-show');
          }

          $('.pic1').on('change',function(){
               uploadimg($(this))
          });
          $('.pic2').on('change',function(){
               uploadimg($(this))
          });
          $('.pic3').on('change',function(){
               uploadimg($(this))
          });
          history.pushState({},'upload',location.href+'&__PLU__upload');
     });

     function uploadimg(ele){
          var reader = new FileReader();
          var file = ele[0].files[0];
          if(file.size/(1024*1024)>1){
               Dialog.alert('请上传小于1MB的图片',function (){});
               return;
          }
          var cur = ele;
          reader.readAsDataURL(file);
          reader.onload=function(){
               cur.prev().attr('src',this.result);//base64
               cur.parents('.photo-item').attr('done',1);
               //上传图片
               //$.when($.ajax('',this.result).done(function(){}));
               if(checkUploaded()){
                    $('.plus-area .over-btn').removeClass('btn-dis');
               }
          }
     }

     function checkUploaded(){
          var i=0;
          $('.photo-item').each(function(){
               console.log($(this).attr('done'));
               if($(this).attr('done')){
                    i++;
               }
          });

          return i >= 3 ? !0 : !1;

     }


     //图片上传区域的现实和隐藏
     $(window).on('popstate',function(){
          if(location.href.indexOf('__PLU__upload')==-1){
               $('.plus-area').addClass('right-hide');
          }else{
               $('.plus-area').removeClass('right-hide');
          }
     });

     //上传图片区域绑定隐藏功能
     $('.plus-area').on('page-show',function(){
          $('.over-btn').off().on('click',function(){
               if($(this).hasClass('btn-dis')) return;
               $('.plus-area').addClass('right-hide');
               $('#upload').text('照片已上传').addClass('high');
               check();
          })
     });

     $('#info-ck').on('click',function(){
          check();
     });


     $('#submit .next-btn').on('click',function(){
          window.location.href='order.html';
     })
});
