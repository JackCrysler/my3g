define(['jquery','artTemplate','js/api','js/common','js/slideSelect'],function($,tpl,api,common){
	if(window.location.href.indexOf('choose.html') == -1) return;

	if(localStorage.getItem('selected-phone')&&localStorage.getItem('selected-phone')!='undefined'){
		var tel = JSON.parse(localStorage.getItem('selected-phone'));
		$('.choose-tel').text('已选：'+tel);
		$('<input type="hidden" value="'+tel+'">').appendTo($('.choose-tel'));
	}

	var qp = $('.question-page');
	$('.choose-qtn').on('click',function(){
		qp.removeClass('hide');	

	});
	qp.on('click',function(){
		$(this).addClass('hide');
	});

	$('.pre-box .pre').slideSelect({
		  init: 3,
	      wrapper: $('.container'),
	      data: ['10元','20元','30元','50元','100元'],
	      title: '预存金额',
	      renderTo: '.pre-box .pre',
	      callback: function(a,b){
	          console.log('success')
	      },
	      cls: 'selected'
	 });

	api.getNumber({},function(data){
		
		var str = '';
		if(data){
			data.result.forEach(function(v,i){
				str += '<span class="number">'+v.svcNumber+'</span>';
			})
		}
		$('.tel-number').html(str);
	});

	var _href = location.href;
	$('.choose-tel').on('click',function(){
		$('.tel-number').removeClass('right-hide');
		history.pushState({},'choose phone number',_href+'?__PLU__cpn');
	});

	$(window).on('popstate',function(){
		$('.tel-number').addClass('right-hide');
	});

	$('.tel-number').on('click','span',function(){
		$(this).addClass('num-high').siblings().removeClass('num-high');
		$('.tel-number').addClass('right-hide');
		var tel = $(this).text();
		tel = tel.replace(/^(\d{3})(\d{4})(\d+)$/g,function(a,b,c,d){
			return b+" "+c+" "+d
		});
		$('.choose-tel').html('已选：'+tel);
		history.replaceState({},'choose phone number',_href);
		check($('.box input').val());
		$('<input type="hidden" value="'+tel+'">').appendTo($('.choose-tel'));
	});

	$('.box input').on('input propertychange',function(){
		var tmp = $(this).val();
		tmp = tmp.replace(/(\d{5})+$/g,function(a,b){
			return b.substr(0,4)+" "+b.substr(4)
		});
		if(tmp.length>=24){
			tmp = tmp.substring(0,24);
		}
		$(this).val(tmp);
		check(tmp)
	});

	function check(tmp) {
		var reg = /^(\d{4}\s){4}(\d{4})$/,
			ele = $('.next-btn');
		if($('.choose-tel').text().indexOf("已选")>-1 && reg.test(tmp)){
			ele.removeClass('btn-dis');
		}else{
			ele.addClass('btn-dis');
		}
	}

	function collectInformation(){
		var str='';
		var ICCID = $('.box input').val();
		var phone = $('.choose-tel input').val();
		var prestore = $('.pre-box .pre').text();
		var packages = $('.choose-package .checked-item').attr('data');
		var showCaller = $('.open-high').index();
		ICCID = ICCID.replace(/\s/g,'');
		phone = phone.replace(/\s/g,'');
		str+='?ICCID='+ICCID;
		str+='&phone='+phone;
		str+='&prestore='+prestore;
		str+='&packages='+packages;
		str+='&showCaller='+showCaller;
		return decodeURI(str);
	}


	$('.next-btn').on('click',function(){
		if($(this).hasClass('btn-dis')) return;
		localStorage.setItem('selected-phone',JSON.stringify($('.choose-tel input').val()));

		location.href='../pages/info.html'+collectInformation();
	})
});