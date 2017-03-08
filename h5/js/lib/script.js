// 剧本

define(['jquery', 'weixin', 'swiper', 'frameplayer', 'createjs'], function ($, wx, swiper, frameplayer) {
    var self = {}

    self.open = function () {



        // 绑定页面动作
        self.bindAction();

        self.fixPosition();
        self.fix();

        // loading界面
        self.preload();

    }

    self.preload = function () {
        var loader = new createjs.LoadQueue(true);

        // 关键！----设置并发数  
        loader.setMaxConnections(5);
        // 关键！---一定要将其设置为 true, 否则不起作用。  
        loader.maintainScriptOrder = true;

        var source = [
          { "src": "loading/bg.jpg" },
          { "src": "loading/fingerprint.png" },
          { "src": "loading/letter-body.png" },
          { "src": "loading/letter-title-down.png" },
          { "src": "loading/letter-title-up.png" },
          { "src": "loading/logo-green.png" },
          { "src": "loading/logo-line.png" },
          { "src": "loading/logo-white.png" },
          { "src": "loading/ticket.png" },
          { "src": "loading/words.png" },
          { "src": "loading/words2.png" }
        ]

        loader.on("complete", onComplete);
        loader.loadManifest(source, true, 'img/');

        function onComplete() {
            $('.preload').hide();
            self.load();
        }
    }

    self.loader = null;
    self.load = function () {
        var loader = new createjs.LoadQueue(true);

        // 关键！----设置并发数  
        loader.setMaxConnections(5);
        // 关键！---一定要将其设置为 true, 否则不起作用。  
        loader.maintainScriptOrder = true;

        var source = [
          { "src": "airport/fly.png" },
          { "src": "airport/open.png" },
          { "src": "airport/wait.png" },
          { "src": "airport/walk.png" },
          //{ "src": "frame/frameL1.jpg" },
          //{ "src": "frame/framefilter1.jpg" }
        ]

        loader.on("progress", onProgress);
        loader.on("complete", onComplete);
        loader.installPlugin(createjs.Sound);
        loader.loadFile({ id: "airport-open", src: "audio/airport/open.mp3" });
        loader.loadFile({ id: "airport-walk", src: "audio/airport/walk.mp3" });
        loader.loadFile({ id: "airport-wait", src: "audio/airport/wait.mp3" });
        loader.loadFile({ id: "airport-fly", src: "audio/airport/fly.mp3" });

        loader.loadFile({ id: "scene-amazon", src: "audio/scene/amazon.mp3" });
        loader.loadFile({ id: "scene-egypt", src: "audio/scene/egypt.mp3" });
        loader.loadFile({ id: "scene-geneva", src: "audio/scene/geneva.mp3" });
        loader.loadFile({ id: "scene-japan", src: "audio/scene/japan.mp3" });
        loader.loadFile({ id: "scene-moon", src: "audio/scene/moon.mp3" });
        loader.loadFile({ id: "scene-singapore", src: "audio/scene/singapore.mp3" });
        loader.loadManifest(source, true, 'img/');

        self.loader = loader;

        var h = $('.logo1').height();

        $('.ready > .finger').hammer().on("tap", function () {
            self.scene.airport.open();
        });

        function onComplete(e) {
            console.log("complete");
            setTimeout(function () {
                $('.loading .percent').fadeOut();
                $('.loading > .words').fadeOut('normal', function () {
                    $('.logo1, .logo2').fadeOut('normal', function () {
                        $('.letter-down').fadeOut('normal', function () {
                            $('.letter-up').fadeIn('normal', function () {
                                $('.ticket img').animate({ 'margin-top': '-40vh' }, 'normal', function () {
                                    $('.ready').fadeIn();
                                });
                            });
                        });
                    })
                });

            }, 3000)


            //self.scene.airport.open();
        }

        function onProgress(e) {
            //console.log(loader.progress * 100 | 0);
            $('.loading .percent').text((loader.progress * 100 | 0) + " %");

            if (h) {
                $('.logo2').css('height', h * (1 - loader.progress) + 'px');
            }
            //console.log(loader.progress);
        }
    }

    self.fix = function () {
        var scaleNum = document.documentElement.clientWidth / 640;
        var ele = $('.jsfix2');

        ele.each(function () {
            var o = $(this);
            var mode = o.attr('data-mode');

            switch (mode) {

                case 'top-right':
                    o.css({
                        'top': scaleNum * parseInt(o.css('top')),
                        'right': scaleNum * parseInt(o.css('right'))
                    });
                    break;

                case 'bottom-left':
                    o.css({
                        'bottom': scaleNum * parseInt(o.css('bottom')),
                        'left': scaleNum * parseInt(o.css('left'))
                    });
                    break;

                case 'bottom-right':
                    o.css({
                        'bottom': scaleNum * parseInt(o.css('bottom')),
                        'right': scaleNum * parseInt(o.css('right'))
                    });
                    break;


                default:
                    o.css({
                        'top': scaleNum * parseInt(o.css('top')),
                        'left': scaleNum * parseInt(o.css('left'))
                    });
                    break;
            }
        });
    }

    // 坐标修正
    self.fixPosition = function () {

        var scaleNum = document.documentElement.clientWidth / 640;
        var ele = $('.jsfix, .jsfixChild>div');

        ele.each(function () {
            var o = $(this);
            var mode = o.attr('data-mode');

            //o.css("transform", "scale(" + scaleNum + ")");

            o.css({
                'width': parseInt(scaleNum * parseInt(o.css('width'))),
                'height': parseInt(scaleNum * parseInt(o.css('height')))
            });

            switch (mode) {

                case 'top-right':
                    o.css({
                        'top': scaleNum * parseInt(o.css('top')),
                        'right': scaleNum * parseInt(o.css('right'))
                    });
                    break;

                case 'bottom-left':
                    o.css({
                        'bottom': scaleNum * parseInt(o.css('bottom')),
                        'left': scaleNum * parseInt(o.css('left'))
                    });
                    break;

                case 'bottom-right':
                    o.css({
                        'bottom': scaleNum * parseInt(o.css('bottom')),
                        'right': scaleNum * parseInt(o.css('right'))
                    });
                    break;


                default:
                    o.css({
                        'top': scaleNum * parseInt(o.css('top')),
                        'left': scaleNum * parseInt(o.css('left'))
                    });
                    break;
            }
        });
    }

    // 交互动作绑定
    self.bindAction = function () {
        $('.retry').hammer().on("tap", function (e) {
            location.href = location.href;
        });

        $('.over').hammer().on("tap", function (e) {
            self.swiper.unlockSwipes();
            self.swiper.slideTo(13);
            self.swiper.lockSwipes();
        });
    }


    self.countdown = {

        totalTime: 20,
        currentTime: 20,
        timer: null,

        start: function (args) {
            var _self = self.countdown;

            _self.timer = setInterval(function () {
                if (_self.currentTime > 0) {
                    _self.currentTime--;

                    $('.geneva .timer').text(_self.currentTime);
                    //$(".scene1 .bg").css('opacity', (70 / totalTime * (totalTime - currentTime)) / 100);
                    //$(".scene1 .cover").css('opacity', (40 / totalTime * currentTime) / 100);   // 0 除，最后1秒完全不可见

                    // 10px 模糊半径
                    $(".geneva .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');
                }
                else {
                    clearInterval(_self.timer);
                    $(".geneva .bg").css('filter', 'blur(0px)');
                    self.finished[0] = 1;

                    $('.geneva .timer').hide();
                    $('.geneva .answer').fadeOut();
                    self.scene.geneva.movie.play();

                    //self.scenePlay($('.geneva .bg'));
                }
            }, 1000)
        },

        reset : function(){
            var _self = self.countdown;
            _self.currentTime = 20;
            _self.timer = null;
        },

        clear: function () {

        }
    }

    self.score = 0;

    self.s = 1;

    self.slide = null;
    self.slideFlag = false;

    self.scene = {

        // 日本 日内瓦 亚马逊 月球 埃及 新加坡

        // 机场场景
        airport: {
            open: function () {
                console.log('准备出发');

                var mySwiper = new swiper('#airport', {
                    direction: 'horizontal',
                    loop: false,
                    onInit: function (swiper) {
                        swiperAnimateCache(swiper); //隐藏动画元素 

                        $('.loading').hide();
                        swiperAnimate(swiper); //初始化完成开始动画

                        // 绑定动作
                        self.scene.airport.bindAction();

                        //swiper.slideTo(9);
                    }
                });
            },

            close: function () {
                $('#airport').hide();
            },

            bindAction: function () {
                $('.airport .ani:eq(0)').on('webkitAnimationStart', function () {
                    createjs.Sound.play("airport-open");
                });

                $('.airport .ani:eq(1)').on('webkitAnimationStart', function () {                    
                    createjs.Sound.stop();
                    createjs.Sound.play("airport-walk");
                });

                $('.airport .ani:eq(2)').on('webkitAnimationStart', function () {
                    createjs.Sound.stop();
                    createjs.Sound.play("airport-wait");
                });

                $('.airport .ani:eq(3)').on('webkitAnimationStart', function () {
                    createjs.Sound.stop();
                    createjs.Sound.play("airport-fly");
                });

                $('.airport .ani:eq(3)').on('webkitAnimationEnd', function () {
                    
                    createjs.Sound.stop();

                    // 场景参数初始化
                    self.finished = [0, 0, 0, 0, 0, 0];

                    // 开启日本场景
                    self.scene.japan.open();
                    self.scene.airport.close();
                });
            }
        },

        // 日本场景
        japan: {
            open: function () {

                console.log('进入日本');
                createjs.Sound.play("scene-japan", { loop: -1 });
                //self.slider.reset();

                // 第一个场景负责初始化
                self.swiper = new swiper('#scene', {
                    direction: 'horizontal',
                    loop: false,
                    effect: 'fade',
                    onInit: function (swiper) {
                        swiperAnimateCache(swiper); //隐藏动画元素 

                        $('.japan .timer').hide();


                        var i = 3;

                        var t = setInterval(function () {

                            if (i == 0) {
                                clearInterval(t);
                                $('.japan .timer').show();
                                $('.japan .ready').hide();
                                $('.disc').show();

                                swiperAnimate(swiper); //初始化完成开始动画

                                self.scene.japan.countdown.start();
                                self.scene.japan.bindAction();

                                return null;
                            }

                            console.log(i);
                            $('.ready img').attr('src', 'img/ready/' + i-- + '.png');
                        }, 1000)


                        function x() {
                            $('.disc .left').animate({ 'background-position-x': '-100%' }, 5000, 'linear', function () {
                                $('.disc .left').css({ 'background-position-x': '100%' });
                                x();
                            });
                        }

                        function y() {
                            $('.disc .right').animate({ 'background-position-x': '200%' }, 5000, 'linear', function () {
                                $('.disc .right').css({ 'background-position-x': '0%' });
                                y();
                            });
                        }

                        y();
                        x();


                        //var tt = setInterval(function () {

                        //    var x = $('.japan .disc .left').css('background-position-x');

                        //    //console.log($('.japan .disc .left').css('background-position-x'))
                        //    //$('.japan .disc .left').css({ 'background-position-x': '100px' });

                        //    $('.japan .disc .left').animate({ 'background-position-x': '0' })

                        //}, 1000)


                        //swiperAnimate(swiper); //初始化完成开始动画

                        //self.scene.japan.countdown.start();
                        //self.scene.japan.bindAction();

                        //swiper.lockSwipes();

                        //$('#scene .japan .bg').css("transform", "scale(" + $('body').width() / 320 + ")");

                        //createjs.Sound.play("sound1");

                        //swiper.slideTo(13);
                    },
                    onSlideChangeEnd: function (swiper) {
                        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                        console.log(swiper.activeIndex);

                        if (swiper.activeIndex == 12) {
                            //setTimeout(function () {
                            //    swiper.unlockSwipes();
                            //    swiper.slideTo(13);
                            //    swiper.lockSwipes();
                            //}, 3000);
                        }

                    },
                    onSlideChangeStart: function (swiper) {

                    }
                });


                function ready() {

                }
            },

            bindAction: function () {
                var _self = self.scene.japan.countdown;
                var target = $('.japan .answer img');

                target.eq(0).hammer().on("tap", error);
                target.eq(2).hammer().on("tap", error);

                target.eq(1).hammer().on("tap", function (e) {
                    console.log('回答正确');
                    $(".japan .bg").css('filter', 'blur(0px)');

                    self.scene.japan.movie.play();
                    $('.disc').hide();

                    //self.scenePlay($('.japan .bg'));
                    clearInterval(_self.timer);
                    $('.japan .timer').fadeOut();
                    $('.japan .answer').fadeOut();

                    self.score += _self.currentTime;

                    self.finished[0] = 1;
                });

                // 下个场景
                $('.japan .product').hammer().on("tap", function (e) {
                    if (self.finished[0]) {

                        self.swiper.unlockSwipes();
                        self.swiper.slideTo(1);
                        self.swiper.lockSwipes();
                        self.s = 2;

                        $('#slide-wrapper').show();
                    }
                });

                //$('.japan-result').hammer().on("tap", function (e) {
                //    if (self.finished[0]) {
                //        self.swiper.unlockSwipes();
                //        self.swiper.slideTo(2);
                //        self.scene.japan.close();
                //        self.scene.geneva.open();
                //    }
                //});

                var flag = false;

                $(function () {
                    self.slider = new SliderUnlock("#slider", { max: '100px', labelTip: '　' }, function () {


                        //alert('success');
                    }, function () {

                        console.log(self.slider.index)

                        if (self.slider.index > 60 && !self.slideFlag) {

                            if (self.s == 2) {

                                self.slideFlag = true;

                                $('#slide-wrapper').hide();

                                setTimeout(function () {
                                    self.swiper.unlockSwipes();
                                    self.swiper.slideTo(2);
                                    self.swiper.lockSwipes();
                                    self.scene.japan.close();
                                    self.scene.geneva.open();
                                }, 500)
                            }

                            if (self.s == 3) {
                                self.slideFlag = true;

                                $('#slide-wrapper').hide();

                                setTimeout(function () {
                                    self.swiper.unlockSwipes();
                                    self.swiper.slideTo(4);
                                    self.swiper.lockSwipes();
                                    self.scene.geneva.close();
                                    self.scene.amazon.open();
                                }, 500)
                            }

                            if (self.s == 4) {
                                self.slideFlag = true;
                                $('#slide-wrapper').hide();

                                setTimeout(function () {
                                    self.swiper.unlockSwipes();
                                    self.swiper.slideTo(6);
                                    self.swiper.lockSwipes();
                                    self.scene.amazon.close();
                                    self.scene.moon.open();
                                }, 500)
                            }

                            if (self.s == 5) {
                                self.slideFlag = true;
                                $('#slide-wrapper').hide();

                                setTimeout(function () {
                                    self.swiper.unlockSwipes();
                                    self.swiper.slideTo(8);
                                    self.swiper.lockSwipes();
                                    self.scene.moon.close();
                                    self.scene.egypt.open();
                                }, 500)
                            }

                            if (self.s == 6) {
                                self.slideFlag = true;
                                $('#slide-wrapper').hide();

                                setTimeout(function () {
                                    self.swiper.unlockSwipes();
                                    self.swiper.slideTo(10);
                                    self.swiper.lockSwipes();
                                    self.scene.egypt.close();
                                    self.scene.singapore.open();
                                }, 500)
                            }

                            if (self.s == 7) {
                                self.slideFlag = true;
                                $('#slide-wrapper').hide();

                                setTimeout(function () {
                                    createjs.Sound.stop();
                                    self.swiper.unlockSwipes();
                                    self.swiper.slideTo(12);
                                    self.swiper.lockSwipes();
                                    self.scene.singapore.close();
                                    //self.scene.singapore.open();
                                }, 500)
                            }

                        }

                        //$(".warn").text("index:" + slider.index + "， max:" + slider.max + ",lableIndex:" + slider.lableIndex + ",value:" + $("#lockable").val() + " date:" + new Date().getUTCDate());
                    });
                    self.slider.init();

                })

                function error() {
                    _self.currentTime = self.punish(_self.currentTime);
                    $('.japan .timer span').text(_self.currentTime);
                    $(".japan .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');

                    $('#scene .error').show();
                    setTimeout(function () { $('#scene .error').fadeOut(); }, 1000);

                    if (_self.currentTime == 0) {
                        $(".japan .bg").css('filter', 'blur(0px)');
                        $('.japan .timer').hide();
                        $('.japan .answer').fadeOut();

                        clearInterval(_self.timer);
                        self.scene.japan.movie.play();
                        $('.disc').hide();

                        self.finished[0] = 1;
                    }
                }
            },

            countdown: {

                totalTime: 20,
                currentTime: 20,
                timer: null,

                start: function () {
                    var _self = self.scene.japan.countdown;

                    $('.disc').show();

                    _self.timer = setInterval(function () {
                        if (_self.currentTime > 0) {
                            _self.currentTime--;

                            $('.japan .timer span').text(_self.currentTime);
                            $('.japan .timer').css('background-position-x', $('.japan .timer').width() * ((20 - _self.currentTime) / 20) * -1 + 'px')
                            //$(".scene1 .bg").css('opacity', (70 / totalTime * (totalTime - currentTime)) / 100);
                            //$(".scene1 .cover").css('opacity', (40 / totalTime * currentTime) / 100);   // 0 除，最后1秒完全不可见

                            // 10px 模糊半径
                            $(".japan .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');
                        }
                        else {
                            clearInterval(_self.timer);
                            $(".japan .bg").css('filter', 'blur(0px)');
                            self.finished[0] = 1;

                            $('.japan .timer').hide();
                            $('.japan .answer').fadeOut();
                            self.scene.japan.movie.play();
                            $('.disc').hide();
                            //self.scenePlay($('.geneva .bg'));
                        }
                    }, 1000)
                }
            },

            movie: {

                timer: [null, null],

                play: function () {

                    console.log('开始播放动画')

                    var _self = self.scene.japan.movie;
                    _self.flower();
                    _self.shark();
                },

                shark: function () {
                    self.scene.japan.movie.timer[0] = setInterval(function () {
                        $('.japan .bg .product').addClass('shake');

                        setTimeout(function () { $('.japan .bg .product').removeClass('shake'); }, 2800)
                    }, 3800)
                },

                // 樱花
                flower: function () {

                    self.scene.japan.movie.timer[1] = frameplayer({
                        target: $(".japan .bg .flower"),
                        total: 24,
                        row: 6,
                        loop: true,
                        fps: 6,
                        width: 457,
                        height: 666
                    });
                }

            },

            close: function () {
                var _self = self.scene.japan.movie;
                clearInterval(self.scene.japan.movie.timer[0]);
                clearInterval(self.scene.japan.movie.timer[1]);
                //self.finished[0] = 1;
            }
        },

        geneva: {
            open: function () {
                console.log('进入日内瓦')
                createjs.Sound.stop();
                createjs.Sound.play("scene-geneva");
                self.slider.reset();
                self.slideFlag = false;

                self.scene.geneva.countdown.start();
                self.scene.geneva.bindAction();
            },

            bindAction: function () {
                var _self = self.scene.geneva.countdown;
                var target = $('.geneva .answer img');

                target.eq(1).hammer().on("tap", error);
                target.eq(2).hammer().on("tap", error);

                target.eq(0).hammer().on("tap", function (e) {
                    console.log('回答正确');
                    $(".geneva .bg").css('filter', 'blur(0px)');
                    //self.scenePlay($('.japan .bg'));
                    self.scene.geneva.movie.play();
                    $('.disc').hide();

                    clearInterval(_self.timer);
                    $('.geneva .timer').hide();
                    $('.geneva .answer').fadeOut();

                    self.score += _self.currentTime;

                    self.finished[0] = 1;
                });

                // 下个场景
                $('.geneva .product').hammer().on("tap", function (e) {
                    if (self.finished[0]) {
                        self.swiper.unlockSwipes();
                        self.swiper.slideTo(3);
                        self.swiper.lockSwipes();
                        self.s = 3;

                        self.slider.reset();
                        $('#slide-wrapper').show();
                    }
                });

                //$('.geneva-result img').hammer().on("tap", function (e) {

                //    console.log('继续')
                //    self.swiper.slideTo(4);
                //    self.scene.geneva.close();
                //    self.scene.amazon.open();

                //});

                function error() {
                    _self.currentTime = self.punish(_self.currentTime);
                    $('.geneva .timer span').text(_self.currentTime);
                    $(".geneva .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');

                    $('#scene .error').show();
                    setTimeout(function () { $('#scene .error').fadeOut(); }, 1000);

                    if (_self.currentTime == 0) {
                        $(".geneva .bg").css('filter', 'blur(0px)');
                        $('.geneva .timer').hide();
                        $('.geneva .answer').fadeOut();

                        clearInterval(_self.timer);
                        //self.scenePlay($('.geneva .bg'));
                        self.scene.geneva.movie.play();
                        $('.disc').hide();

                        self.finished[0] = 1;
                    }
                }
            },

            countdown: {

                totalTime: 20,
                currentTime: 20,
                timer: null,

                start: function () {
                    var _self = self.scene.geneva.countdown;

                    $('.disc').show();

                    _self.timer = setInterval(function () {
                        if (_self.currentTime > 0) {
                            _self.currentTime--;

                            $('.geneva .timer span').text(_self.currentTime);
                            $('.geneva .timer').css('background-position-x', $('.geneva .timer').width() * ((20 - _self.currentTime) / 20) * -1 + 'px')
                            //$(".scene1 .bg").css('opacity', (70 / totalTime * (totalTime - currentTime)) / 100);
                            //$(".scene1 .cover").css('opacity', (40 / totalTime * currentTime) / 100);   // 0 除，最后1秒完全不可见

                            // 10px 模糊半径
                            $(".geneva .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');
                        }
                        else {
                            clearInterval(_self.timer);
                            $(".geneva .bg").css('filter', 'blur(0px)');
                            self.finished[0] = 1;

                            $('.geneva .timer').hide();
                            $('.geneva .answer').fadeOut();
                            self.scene.geneva.movie.play();
                            $('.disc').hide();

                            //self.scenePlay($('.geneva .bg'));
                        }
                    }, 1000)
                }
            },

            movie: {

                timer:[null, null, null, null, true],


                play: function () {

                    console.log('开始播放动画')

                    var _self = self.scene.geneva.movie;
                    _self.swan();
                    _self.boat();
                    _self.skiing();
                    _self.shark();
                },

                shark: function () {
                    self.scene.geneva.movie.timer[0] = setInterval(function () {
                        $('.geneva .bg .product').addClass('shake');

                        setTimeout(function () { $('.geneva .bg .product').removeClass('shake'); }, 2800)
                    }, 3800)
                },

                // 天鹅
                swan: function () {

                    self.scene.geneva.movie.timer[1] = frameplayer({
                        target: $(".geneva .bg .swan"),
                        total: 12,
                        row: 4,
                        loop: true,
                        fps: 6
                    });
                },

                // 滑雪
                skiing: function () {
                    self.scene.geneva.movie.timer[2] = frameplayer({
                        target: $(".geneva .bg .skiing"),
                        total: 28,
                        row: 4,
                        loop: true,
                        fps: 8
                    });
                },

                // 船
                boat: function () {

                    self.scene.geneva.movie.timer[3] = frameplayer({
                        target: $(".geneva .bg .boat"),
                        total: 16,
                        row: 2,
                        loop: true,
                        fps: 8
                    });

                    var left = $(".geneva .bg .boat").css('left');

                    var x = function () {
                        $(".geneva .bg .boat").animate({ left: document.documentElement.clientWidth + "px" }, 40000, 'swing', function () {
                            $(".geneva .bg .boat").css({ left: left });

                            if (self.scene.geneva.movie.timer[4]) { x(); }
                        });
                    }

                    x();
                }

            },

            close: function () {
                var _self = self.scene.geneva.movie;
                clearInterval(self.scene.geneva.movie.timer[0]);
                clearInterval(self.scene.geneva.movie.timer[1]);
                clearInterval(self.scene.geneva.movie.timer[2]);
                clearInterval(self.scene.geneva.movie.timer[3]);
                $(".geneva .bg .boat").stop();
                self.scene.geneva.movie.timer[4] = false;
                //self.finished[0] = 1;
            }
        },

        amazon: {
            open: function () {
                console.log('进入亚马逊')
                createjs.Sound.stop();
                createjs.Sound.play("scene-amazon");
                self.slider.reset();
                self.slideFlag = false;

                self.scene.amazon.countdown.start();
                self.scene.amazon.bindAction();
            },

            bindAction: function () {
                var _self = self.scene.amazon.countdown;
                var target = $('.amazon .answer img');

                target.eq(1).hammer().on("tap", error);
                target.eq(2).hammer().on("tap", error);

                target.eq(0).hammer().on("tap", function (e) {
                    console.log('回答正确');
                    $(".amazon .bg").css('filter', 'blur(0px)');
                    //self.scenePlay($('.japan .bg'));
                    self.scene.amazon.movie.play();
                    $('.disc').hide();

                    clearInterval(_self.timer);
                    $('.amazon .timer').hide();
                    $('.amazon .answer').fadeOut();

                    self.score += _self.currentTime;

                    self.finished[0] = 1;
                });

                // 下个场景
                $('.amazon .product').hammer().on("tap", function (e) {
                    if (self.finished[0]) {
                        self.swiper.unlockSwipes();
                        self.swiper.slideTo(5);
                        self.swiper.lockSwipes();
                        self.s = 4;

                        self.slider.reset();
                        $('#slide-wrapper').show();
                    }
                });

                //$('.amazon-result img').hammer().on("tap", function (e) {
                //    if (self.finished[0]) {
                //        self.swiper.slideTo(6);
                //        self.scene.moon.open();
                //    }
                //});

                function error() {
                    _self.currentTime = self.punish(_self.currentTime);
                    $('.amazon .timer span').text(_self.currentTime);
                    $(".amazon .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');

                    $('#scene .error').show();
                    setTimeout(function () { $('#scene .error').fadeOut(); }, 1000);

                    if (_self.currentTime == 0) {
                        $(".amazon .bg").css('filter', 'blur(0px)');
                        $('.amazon .timer').hide();
                        $('.amazon .answer').fadeOut();

                        clearInterval(_self.timer);
                        //self.scenePlay($('.amazon .bg'));
                        self.scene.amazon.movie.play();
                        $('.disc').hide();

                        self.finished[0] = 1;
                    }
                }
            },

            countdown: {

                totalTime: 20,
                currentTime: 20,
                timer: null,

                start: function () {
                    var _self = self.scene.amazon.countdown;

                    $('.disc').show();

                    _self.timer = setInterval(function () {
                        if (_self.currentTime > 0) {
                            _self.currentTime--;

                            $('.amazon .timer span').text(_self.currentTime);
                            $('.amazon .timer').css('background-position-x', $('.amazon .timer').width() * ((20 - _self.currentTime) / 20) * -1 + 'px')
                            //$(".scene1 .bg").css('opacity', (70 / totalTime * (totalTime - currentTime)) / 100);
                            //$(".scene1 .cover").css('opacity', (40 / totalTime * currentTime) / 100);   // 0 除，最后1秒完全不可见

                            // 10px 模糊半径
                            $(".amazon .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');
                        }
                        else {
                            clearInterval(_self.timer);
                            $(".amazon .bg").css('filter', 'blur(0px)');
                            self.finished[0] = 1;

                            $('.amazon .timer').hide();
                            $('.amazon .answer').fadeOut();
                            self.scene.amazon.movie.play();
                            $('.disc').hide();
                        }
                    }, 1000)
                }
            },

            movie: {

                timer: [null, null, null, null, null, true],

                play: function () {

                    console.log('开始播放动画')

                    var _self = self.scene.amazon.movie;
                    _self.water();
                    _self.monkey();
                    _self.bird1();
                    _self.bird2();
                    _self.shark();
                },

                shark: function () {
                    self.scene.amazon.movie.timer[0] = setInterval(function () {
                        $('.amazon .bg .product').addClass('shake');

                        setTimeout(function () { $('.amazon .bg .product').removeClass('shake'); }, 2800)
                    }, 3800)
                },

                // 水花
                water: function () {
                    self.scene.amazon.movie.timer[1] = frameplayer({
                        target: $(".amazon .bg .water"),
                        total: 9,
                        row: 2,
                        loop: true,
                        fps: 9
                    });
                },

                // 猴子
                monkey: function () {
                    self.scene.amazon.movie.timer[2] = frameplayer({
                        target: $(".amazon .bg .monkey"),
                        total: 11,
                        row: 1,
                        loop: true,
                        fps: 6
                    });
                },

                // 黄鸟
                bird1: function () {
                    self.scene.amazon.movie.timer[3] = frameplayer({
                        target: $(".amazon .bg .bird1"),
                        total: 5,
                        row: 1,
                        loop: true,
                        fps: 5
                    });
                },

                // 黑鸟
                bird2: function () {

                    self.scene.amazon.movie.timer[4] = frameplayer({
                        target: $(".amazon .bg .bird2"),
                        total: 5,
                        row: 1,
                        loop: true,
                        fps: 5
                    });

                    var left = $(".amazon .bg .bird2").css('left');

                    var x = function () {
                        $(".amazon .bg .bird2").animate({ left: (document.documentElement.clientWidth + 200) + "px" }, 20000, 'swing', function () {
                            $(".amazon .bg .bird2").css({ left: left });

                            if (self.scene.amazon.movie.timer[5]) { x(); }
                        });
                    }

                    x();
                }

            },

            close: function () {
                var _self = self.scene.amazon.movie;
                clearInterval(_self.timer[0]);
                clearInterval(_self.timer[1]);
                clearInterval(_self.timer[2]);
                clearInterval(_self.timer[3]);
                clearInterval(_self.timer[4]);
                $(".amazon .bg .bird2").stop();
                _self.timer[5] = false;
                self.finished[0] = 1;
            }
        },

        moon: {
            open: function () {
                console.log('进入月球')
                createjs.Sound.stop();
                createjs.Sound.play("scene-moon");
                self.slider.reset();
                self.slideFlag = false;

                self.scene.moon.countdown.start();
                self.scene.moon.bindAction();
            },

            bindAction: function () {
                var _self = self.scene.moon.countdown;
                var target = $('.moon .answer img');

                target.eq(1).hammer().on("tap", error);
                target.eq(2).hammer().on("tap", error);

                target.eq(0).hammer().on("tap", function (e) {
                    console.log('回答正确');
                    $(".moon .bg").css('filter', 'blur(0px)');
                    //self.scenePlay($('.japan .bg'));
                    self.scene.moon.movie.play();
                    $('.disc').hide();

                    clearInterval(_self.timer);
                    $('.moon .timer').hide();
                    $('.moon .answer').fadeOut();

                    self.score += _self.currentTime;

                    self.finished[0] = 1;
                });

                // 下个场景
                $('.moon .product').hammer().on("tap", function (e) {
                    if (self.finished[0]) {
                        self.swiper.unlockSwipes();
                        self.swiper.slideTo(7);
                        self.swiper.lockSwipes();
                        self.s = 5;

                        self.slider.reset();
                        $('#slide-wrapper').show();
                    }
                });

                //$('.moon-result img').hammer().on("tap", function (e) {

                //    console.log('继续')
                //    self.swiper.slideTo(8);
                //    self.scene.egypt.open();

                //});

                function error() {
                    _self.currentTime = self.punish(_self.currentTime);
                    $('.moon .timer span').text(_self.currentTime);
                    $(".moon .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');

                    $('#scene .error').show();
                    setTimeout(function () { $('#scene .error').fadeOut(); }, 1000);

                    if (_self.currentTime == 0) {
                        $(".moon .bg").css('filter', 'blur(0px)');
                        $('.moon .timer').hide();
                        $('.moon .answer').fadeOut();

                        clearInterval(_self.timer);
                        //self.scenePlay($('.moon .bg'));
                        self.scene.moon.movie.play();
                        $('.disc').hide();

                        self.finished[0] = 1;
                    }
                }
            },

            countdown: {

                totalTime: 20,
                currentTime: 20,
                timer: null,

                start: function () {
                    var _self = self.scene.moon.countdown;
                    $('.disc').show();

                    _self.timer = setInterval(function () {
                        if (_self.currentTime > 0) {
                            _self.currentTime--;

                            $('.moon .timer span').text(_self.currentTime);
                            $('.moon .timer').css('background-position-x', $('.moon .timer').width() * ((20 - _self.currentTime) / 20) * -1 + 'px')
                            //$(".scene1 .bg").css('opacity', (70 / totalTime * (totalTime - currentTime)) / 100);
                            //$(".scene1 .cover").css('opacity', (40 / totalTime * currentTime) / 100);   // 0 除，最后1秒完全不可见

                            // 10px 模糊半径
                            $(".moon .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');
                        }
                        else {
                            clearInterval(_self.timer);
                            $(".moon .bg").css('filter', 'blur(0px)');
                            self.finished[0] = 1;

                            $('.moon .timer').hide();
                            $('.moon .answer').fadeOut();
                            self.scene.moon.movie.play();
                            $('.disc').hide();


                            //self.scenePlay($('.moon .bg'));
                        }
                    }, 1000)
                }
            },

            movie: {

                timer : [null, null],

                play: function () {

                    console.log('开始播放动画')

                    var _self = self.scene.moon.movie;
                    _self.earth();
                    _self.shark();
                    //_self.skiing();



                },

                shark: function () {
                    self.scene.moon.movie.timer[0] = setInterval(function () {
                        $('.moon .bg .product').addClass('shake');

                        setTimeout(function () { $('.moon .bg .product').removeClass('shake'); }, 2800)
                    }, 3800)
                },

                // 天鹅
                earth: function () {

                    self.scene.moon.movie.timer[1] = frameplayer({
                        target: $(".moon .bg .earth"),
                        total: 24,
                        row: 6,
                        loop: true,
                        fps: 6
                    });
                }

            },

            close: function () {
                var _self = self.scene.moon.movie;
                clearInterval(self.scene.moon.movie.timer[0]);
                clearInterval(self.scene.moon.movie.timer[1]);
                self.finished[0] = 1;
            }
        },

        egypt: {
            open: function () {
                console.log('进入埃及')
                createjs.Sound.stop();
                createjs.Sound.play("scene-egypt");
                self.slider.reset();
                self.slideFlag = false;

                self.scene.egypt.countdown.start();
                self.scene.egypt.bindAction();
            },

            bindAction: function () {
                var _self = self.scene.egypt.countdown;
                var target = $('.egypt .answer img');

                target.eq(0).hammer().on("tap", error);
                target.eq(2).hammer().on("tap", error);

                target.eq(1).hammer().on("tap", function (e) {
                    console.log('回答正确');
                    $(".egypt .bg").css('filter', 'blur(0px)');
                    //self.scenePlay($('.japan .bg'));
                    self.scene.egypt.movie.play();
                    $('.disc').hide();

                    clearInterval(_self.timer);
                    $('.egypt .timer').hide();
                    $('.egypt .answer').fadeOut();

                    self.score += _self.currentTime;

                    self.finished[0] = 1;
                });

                // 下个场景
                $('.egypt .product-press').hammer().on("tap", function (e) {
                    if (self.finished[0]) {
                        self.swiper.unlockSwipes();
                        self.swiper.slideTo(9);
                        self.swiper.lockSwipes();
                        self.s = 6;

                        self.slider.reset();
                        $('#slide-wrapper').show();
                    }
                });

                //$('.egypt-result img').hammer().on("tap", function (e) {

                //    console.log('继续')
                //    self.swiper.slideTo(10);
                //    self.scene.singapore.open();

                //});

                function error() {
                    _self.currentTime = self.punish(_self.currentTime);
                    $('.egypt .timer span').text(_self.currentTime);
                    $(".egypt .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');

                    $('#scene .error').show();
                    setTimeout(function () { $('#scene .error').fadeOut(); }, 1000);

                    if (_self.currentTime == 0) {
                        $(".egypt .bg").css('filter', 'blur(0px)');
                        $('.egypt .timer').hide();
                        $('.egypt .answer').fadeOut();

                        clearInterval(_self.timer);
                        //self.scenePlay($('.egypt .bg'));
                        self.scene.egypt.movie.play();
                        $('.disc').hide();

                        self.finished[0] = 1;
                    }
                }
            },

            countdown: {

                totalTime: 20,
                currentTime: 20,
                timer: null,

                start: function () {
                    var _self = self.scene.egypt.countdown;
                    $('.disc').show();

                    _self.timer = setInterval(function () {
                        if (_self.currentTime > 0) {
                            _self.currentTime--;

                            $('.egypt .timer span').text(_self.currentTime);
                            $('.egypt .timer').css('background-position-x', $('.egypt .timer').width() * ((20 - _self.currentTime) / 20) * -1 + 'px')
                            //$(".scene1 .bg").css('opacity', (70 / totalTime * (totalTime - currentTime)) / 100);
                            //$(".scene1 .cover").css('opacity', (40 / totalTime * currentTime) / 100);   // 0 除，最后1秒完全不可见

                            // 10px 模糊半径
                            $(".egypt .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');
                        }
                        else {
                            clearInterval(_self.timer);
                            $(".egypt .bg").css('filter', 'blur(0px)');
                            self.finished[0] = 1;

                            $('.egypt .timer').hide();
                            $('.egypt .answer').fadeOut();
                            self.scene.egypt.movie.play();
                            $('.disc').hide();

                            //self.scenePlay($('.egypt .bg'));
                        }
                    }, 1000)
                }
            },

            movie: {
                timer:[null, null],

                play: function () {

                    console.log('开始播放动画')

                    var _self = self.scene.egypt.movie;
                    _self.camel();
                    _self.shark();
                    //_self.skiing();
                },

                shark: function () {
                    self.scene.egypt.movie.timer[0] = setInterval(function () {
                        $('.egypt .bg .product').addClass('shake');

                        setTimeout(function () { $('.egypt .bg .product').removeClass('shake'); }, 2800)
                    }, 3800)
                },

                // 骆驼
                camel: function () {

                    self.scene.egypt.movie.timer[1] = frameplayer({
                        target: $(".egypt .bg .camel"),
                        total: 54,
                        row: 6,
                        loop: true,
                        fps: 6
                    });
                }

            },

            close: function () {
                var _self = self.scene.egypt.movie;
                clearInterval(self.scene.egypt.movie.timer[0]);
                clearInterval(self.scene.egypt.movie.timer[1]);
                self.finished[0] = 1;
            }
        },

        singapore: {
            open: function () {
                console.log('进入新加坡')
                createjs.Sound.stop();
                createjs.Sound.play("scene-singapore");
                self.slider.reset();
                self.slideFlag = false;

                self.scene.singapore.countdown.start();
                self.scene.singapore.bindAction();
            },

            bindAction: function () {
                var _self = self.scene.singapore.countdown;
                var target = $('.singapore .answer img');

                target.eq(0).hammer().on("tap", error);
                target.eq(1).hammer().on("tap", error);

                target.eq(2).hammer().on("tap", function (e) {
                    console.log('回答正确');
                    $(".singapore .bg").css('filter', 'blur(0px)');
                    //self.scenePlay($('.japan .bg'));
                    self.scene.singapore.movie.play();
                    $('.disc').hide();

                    clearInterval(_self.timer);
                    $('.singapore .timer').hide();
                    $('.singapore .answer').fadeOut();

                    console.log('分数计算')

                    self.score += _self.currentTime;

                    console.log(self.score);

                    $('.result .score span').text(120 - self.score);
                    $('.result .rank span').text( (parseInt((self.score/120) * 20) + 80) + '%' );

                    self.finished[0] = 1;
                });

                // 下个场景
                $('.singapore .product').hammer().on("tap", function (e) {
                    if (self.finished[0]) {
                        self.swiper.unlockSwipes();
                        self.swiper.slideTo(11);
                        self.swiper.lockSwipes();
                        self.s = 7;

                        self.slider.reset();
                        $('#slide-wrapper').show();
                    }
                });

                //$('.singapore-result img').hammer().on("tap", function (e) {
                //    if (self.finished[0]) {
                //        self.swiper.slideTo(12);
                //    }
                //});

                function error() {
                    _self.currentTime = self.punish(_self.currentTime);
                    $('.singapore .timer span').text(_self.currentTime);
                    $(".singapore .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');

                    $('#scene .error').show();
                    setTimeout(function () { $('#scene .error').fadeOut(); }, 1000);

                    if (_self.currentTime == 0) {
                        $(".singapore .bg").css('filter', 'blur(0px)');
                        $('.singapore .timer').hide();
                        $('.singapore .answer').fadeOut();

                        clearInterval(_self.timer);
                        //self.scenePlay($('.singapore .bg'));
                        self.scene.singapore.movie.play();
                        $('.disc').hide();

                        self.finished[0] = 1;
                    }
                }
            },

            countdown: {

                totalTime: 20,
                currentTime: 20,
                timer: null,

                start: function () {
                    var _self = self.scene.singapore.countdown;

                    $('.disc').show();

                    _self.timer = setInterval(function () {
                        if (_self.currentTime > 0) {
                            _self.currentTime--;

                            $('.singapore .timer span').text(_self.currentTime);
                            $('.singapore .timer').css('background-position-x', $('.singapore .timer').width() * ((20 - _self.currentTime) / 20) * -1 + 'px')
                            //$(".scene1 .bg").css('opacity', (70 / totalTime * (totalTime - currentTime)) / 100);
                            //$(".scene1 .cover").css('opacity', (40 / totalTime * currentTime) / 100);   // 0 除，最后1秒完全不可见

                            // 10px 模糊半径
                            $(".singapore .bg").css('filter', 'blur(' + (10 / _self.totalTime * _self.currentTime) + 'px)');
                        }
                        else {
                            clearInterval(_self.timer);
                            $(".singapore .bg").css('filter', 'blur(0px)');
                            self.finished[0] = 1;

                            $('.singapore .timer').hide();
                            $('.singapore .answer').fadeOut();
                            self.scene.singapore.movie.play();
                            $('.disc').hide();

                            //self.scenePlay($('.singapore .bg'));
                        }
                    }, 1000)
                }
            },

            movie: {

                timer :[null, null, null, true],

                play: function () {

                    console.log('开始播放动画')

                    var _self = self.scene.singapore.movie;
                    _self.water();
                    _self.fountain();
                    _self.ship();
                    _self.shark();
                },

                shark: function () {
                    self.scene.singapore.movie.timer[0] = setInterval(function () {
                        $('.singapore .bg .product').addClass('shake');

                        setTimeout(function () { $('.singapore .bg .product').removeClass('shake'); }, 2800)
                    }, 3800)
                },

                // 小船
                ship: function () {

                    var left = $(".singapore .bg .ship").css('left');
                    console.log(left);

                    var x = function () {
                        $(".singapore .bg .ship").animate({ left: "-400px" }, 20000, 'swing', function () {
                            $(".singapore .bg .ship").css({ left: left });
                            if (self.scene.singapore.movie.timer[3]) { x(); }
                        });
                    }

                    x();
                },

                // 水花
                water: function () {

                    self.scene.singapore.movie.timer[1] = frameplayer({
                        target: $(".singapore .bg .water"),
                        total: 11,
                        row: 1,
                        loop: true,
                        fps: 11
                    });
                },

                // 喷泉
                fountain: function () {
                    self.scene.singapore.movie.timer[2] = frameplayer({
                        target: $(".singapore .bg .fountain"),
                        total: 9,
                        row: 3,
                        loop: true,
                        fps: 9
                    });
                },

                // 气球
                balloon: function () {

                }

            },

            close: function () {
                var _self = self.scene.singapore.movie;
                clearInterval(self.scene.singapore.movie.timer[0]);
                clearInterval(self.scene.singapore.movie.timer[1]);
                clearInterval(self.scene.singapore.movie.timer[2]);
                $(".singapore .bg .ship").stop();
                self.scene.singapore.movie.timer[3] = false;
                self.finished[0] = 1;
            }
        },
    }

    self.punishment = 3;
    self.punish = function (num) {
        num -= self.punishment;
        if (num < 0) { num = 0; }

        return num;
    }
    self.swiper = null;

    // 记录场景是否完成
    self.finished = [0, 0, 0, 0, 0, 0];

    // 微信分享
    self.share = function () {

        $.ajax({
            type: 'post',
            url: 'https://www.tron-m.com/wx/jssdk',
            data: { m: "getWxConfig", url: window.location.href },
            dataType: 'json',
            success: function (json) {
                args = json.result;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: args.appId, // 必填，公众号的唯一标识
                    timestamp: args.timestamp, // 必填，生成签名的时间戳
                    nonceStr: args.nonceStr, // 必填，生成签名的随机串
                    signature: args.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function () {
                    var url = document.location.href,
                        title = '',
                        desc = '',
                        imgUrl = ''

                    wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQQ({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareWeibo({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQZone({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });

                wx.error(function (res) {
                    console.log("wx has error:" + res);
                });
            }
        });
    };

    return self;

});





















