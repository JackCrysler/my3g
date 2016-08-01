define(['jquery','artTemplate','js/api'],function($,tpl,api){


	var qp = $('.question-page');
	$('.choose-qtn').on('click',function(){
		qp.removeClass('hide');	

	})
	qp.on('click',function(){
		$(this).addClass('hide');
	})
	

	api.getNumber({},function(data){
		
		var str = '';
		if(data){
			data.result.forEach(function(v,i){
				str += '<span class="number">'+v.svcNumber+'</span>';
			})
		}
		$('.tel-number').html(str);
	})

	var _href = location.href;
	$('.choose-tel').on('click',function(){
		$('.tel-number').removeClass('right-hide');
		history.pushState({},'choose phone number',_href+'?__PLU__cpn');
	})

	$(window).on('popstate',function(){
		$('.tel-number').addClass('right-hide');
	})

	$('.tel-number').on('click','span',function(){
		$(this).addClass('num-high').siblings().removeClass('num-high');
		$('.tel-number').addClass('right-hide');
		var tel = $(this).text();
		tel = tel.replace(/^(\d{3})(\d{4})(\d+)$/g,function(a,b,c,d){
			return b+" "+c+" "+d
		})	
		$('.choose-tel').html('已选：'+tel);
		history.replaceState({},'choose phone number',_href)
	})

	$('.box input').on('input propertychange',function(){
		var tmp = $(this).val();
		tmp = tmp.replace(/(\d{5})+$/g,function(a,b){
			return b.substr(0,4)+" "+b.substr(4)
		});
		$(this).val(tmp);
		var reg = /^[\d{4}\s]{5}/;
		console.log(reg.test(tmp));
	})

})