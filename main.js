require.config({
    paths:{
        'jquery': 'lib/jquery/jquery-1.9.1.min',
        'fastClick':'lib/fastclick'
    }
})
require(['fastClick','js/index'],function(fc){
    fc.attach(document.body);
})