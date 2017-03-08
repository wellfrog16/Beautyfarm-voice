require.config(
{
    baseUrl: "js/lib",
    map: {
            '*': {
                'css': 'css.min'
            }
    },

    paths: {
        'swiper': 'swiper-3.4.1.jquery.min',
        'jquery': 'jquery-3.1.0.min',
        'createjs': 'createjs-2015.11.26.min',
        //'jqHammer': 'jquery.hammer',
        //'jqCookie': 'jquery.cookie',
        'weixin': '//res.wx.qq.com/open/js/jweixin-1.0.0',
        //'hammer': '//cdn.bootcss.com/hammer.js/2.0.8/hammer.min',
        //'hammer': 'hammer.min',
        //"jquery": "jquery-1.10.2",
        //"jqueryMobile": "jquery.mobile-1.4.5.min"

    },

    shim: {
        'swiper': ['css!swiper-3.4.1.min.css'],
        'jquery': {  // 用依赖来加载插件
            deps: [
                'jquery-3.1.0.min',
                'jquery.hammer',
                'jquery.cookie',

                // 临时加载createjs
                //'createjs-2015.11.26.min'
            ]
        }
    },
    waitSeconds: 60
});


require(["jquery", 'script'], function ($, script) {

    // 禁止拉动
    $("body").on("touchmove", function (e) {
        e.preventDefault();
    });

    script.open();
});