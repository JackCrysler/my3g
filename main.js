require.config({
    paths:{
        'jquery': 'lib/jquery/jquery-1.9.1.min',
        'fastClick':'lib/fastclick',
        'artTemplate':'lib/art-template/template-native'
    }
});
require(['fastClick','js/index','js/bind','js/choose','js/info','js/order','js/my'],function(fc){
    fc.attach(document.body);
});