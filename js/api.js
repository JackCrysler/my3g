define(['jquery'],function($){
    return {
        getAccountInfo:function(data,callback){
            data = data || {
                    wechat_id: '123',
                    balance: 30,
                    phoneNum: 15805658192,
                    idCard: '12323123123123123'
                };
            $.ajax({
                url:'data/getValidCode.json',
                type:'get',
                data:data,
                beforeSend:function(){
                    //todo
                },
                success:function(data){
                    callback(data);
                },
                complete:function(data){
                    console.log(data);
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
        }
    }
});