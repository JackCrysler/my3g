require.config({
    paths:{
        'jquery': 'lib/jquery/jquery-1.9.1.min',
        'fastClick':'lib/fastclick',
        'artTemplate':'lib/art-template/template-native'
    }
});
require(['fastClick','js/index','js/bind','js/choose'],function(fc){
    fc.attach(document.body);
});