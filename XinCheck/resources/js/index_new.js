var conMainListBk4Flag = false;
var jcConMainListBk4Flag = false;
var zlConMainListBk4Flag = false;
$(function(){

    // 小屏兼容
    resizeWidth();
    $(window).resize(function () {
        resizeWidth();
    });
    function resizeWidth() {
        if($(window).width() >= 1875){
            $('html,body').css({backgroundPositionY:' -7%'});
            $('.head-nav-box').css({width:'1440px'});
            $('.head-nav-list').css({width: '1080px',marginLeft:'90px'});
            $('.banner-nr-r-box').css({width:'474px',height: '640px',transform: 'scale(1)'});
            $('.banner-nr').css({paddingBottom:'80px'});
            $('.banner-nr-l-wzboxt p').css({marginTop:'28px'});
            $('.signTab').css({width:'355px',height: '524px',marginTop: '27px',marginLeft:'89px'});
            $('.signTab .otherAccount').css({marginTop: '60px'});
            $('.banner-nr-l-t1').css({width: '854px'});
            $('.banner-nr-l-t2').css({width: '711px',marginTop: '-96px',left:'-4px'});
            $('.banner-nr-l').css({marginLeft: '160px'});
            $('.banner-box-l-img').css({width:'422px',bottom: '-37px',marginLeft:'56px'});
            $('.con-main-list-bk3').css({width: '1400px'});
            $('.sec_r_img1').css({width: '857px',marginTop: '0px'});
            $('.list-swiper-container').css({width: '874px',marginTop: '0px'});
            $('.sec_r_imgx1').css({width: '643px',marginTop: '160px'});

            $('.sec_r_img_icon1').css({width: '174px',right: '-35px',bottom: '90px'});
            $('.sec_r_img_icon2').css({width: '129px',right: '240px',bottom: '6px'});
            $('.sec-r-img1-app').css({right: '12%',top: '46%'});
            $('.sec-r-img1-xcx').css({right: '30%',top: '79%'});
            $('.list-bk3-box-r').css({right: '-500px',width: '857px'});
            $('.indexToClass').css({top: '55.5%',left: '42.5%'});
            $('.sec-img-slide-last').css({marginLeft: '111px'});
            $('.banner-nr').css({width: '1440px'});
            $('.index-icon1').css({right: '9%'});
            $('.con-main-list-bk1-icon').css({width: '372px',right: '18%',bottom: '-214px'});
            $('.signTab .log_code').css({paddingTop: '50px'});
            $('.signTab .ban-hd-pic').css({paddingTop: '65px'});
            $('.signTab .ban-hd-pic .user_class_img').css({top: '367px'});
            $('.btn-jc').css({marginTop: '30px'});

            $('.footer-box').css({width: '1400px'});
            $('.foo-di-box').css({width: '1400px'});
            $('.forget-new').css({top: '222px',left: '19px'});
            $('.foo-t div').css({marginRight: '100px'});
            $('.foo-t .foot-diov-box-lw').css({marginRight: '50px'});

            // 降重
            $('.jc-list-bk1-box').css({width: '1400px'});
            $('.jc-list-bk1-l').css({width: '859px'});
            $('.jc_bk1_icon1').css({width: '831px'});
            $('.jc-list-bk1-r').css({width: '444px'});
            $('.jc-bk1-xbt').css({width: '444px'});
            $('.jc-bk1-iconx1').css({top: '208px',right: '111px'});
            $('.jc-bk1-iconx2').css({bottom: '81px',left: '221px'});
            $('.jc-list-bk2-box').css({width: '1300px'});
            $('.jc-list-bk2-box-r').css({width: '934px'});
            $('.jc-bk2-icon1').css({width: '934px'});
            $('.jc-bk1-icon3').css({width: '624px',top: '0'});
            $('.jc-bk2-icon2').css({marginTop: '50px'});

            $('.personal-cen').css({right: '30px'});

            // 图大小
            $('.list-bk1-bg img').css({width: '282px'});
            $('.list-bk1-video').css({width: '926px'});
            $('.list-bk2-xbt img').css({width: '418px'});
            $('.jc-bk1-icon2').css({width: '322px'});
            $('.jc-list-bk1-r').css({marginTop: '135px'});
            $('.list-bk3-box-l-xbt img').css({width: '296px'});
            $('.bd').css({width: '319px'});
            $('.signTab .ban-balance').css({paddingLeft:'70px'});
            $('.signTab .ban-hd-pic .p-xbt').css({paddingLeft:'70px'});
            $('.header-nav').css({height:'120px'});
            $('.head-nav-box').css({lineHeight: '80px',height: '80px'});
            $('.top_img_jt').css({top: '-39px'});
            $('.personal-cen').css({top: '80px'});
            $('.head-go-login').css({marginTop: '24px'});
            $('.header-box').css({height: '802px'});

            $('.head-nav-list-l ul a').css({fontSize: '17px'});
            $('.head-nav-list-l .nav-more a').css({fontSize: '16px'});
            $('.head-nav-list-l ul li').css({marginRight: '40px',marginLeft:'0'});

        }else if($(window).width() >= 1610 && $(window).width() < 1875){
            $('html,body').css({backgroundPositionY:' -7%'});
            $('.head-nav-box').css({width:'1440px'});
            $('.head-nav-list').css({width: '1080px',marginLeft:'90px'});
            $('.banner-nr-r-box').css({width:'474px',height: '640px',transform: 'scale(0.95)'});
            $('.banner-nr').css({paddingBottom:'80px'});
            $('.banner-nr-l-wzboxt p').css({marginTop:'28px'});
            $('.signTab').css({width:'355px',height: '524px',marginTop: '27px',marginLeft:'89px'});
            $('.signTab .otherAccount').css({marginTop: '60px'});
            $('.banner-nr-l-t1').css({width: '854px'});
            $('.banner-nr-l-t2').css({width: '711px',marginTop: '-96px',left:'-4px'});
            $('.banner-nr-l').css({marginLeft: '160px'});
            $('.banner-box-l-img').css({width:'366px',bottom: '4px',marginLeft:'56px'});
            $('.con-main-list-bk3').css({width: '1400px'});
            $('.sec_r_img1').css({width: '857px',marginTop: '0px'});
            $('.list-swiper-container').css({width: '874px',marginTop: '0px'});
            $('.sec_r_imgx1').css({width: '643px',marginTop: '160px'});

            $('.sec_r_img_icon1').css({width: '174px',right: '-35px',bottom: '90px'});
            $('.sec_r_img_icon2').css({width: '129px',right: '240px',bottom: '6px'});
            $('.sec-r-img1-app').css({right: '12%',top: '46%'});
            $('.sec-r-img1-xcx').css({right: '30%',top: '79%'});
            $('.list-bk3-box-r').css({right: '-500px',width: '857px'});
            $('.indexToClass').css({top: '56%',left: '42.5%'});
            $('.sec-img-slide-last').css({marginLeft: '111px'});
            $('.banner-nr').css({width: '1440px'});
            $('.index-icon1').css({right: '9%'});
            $('.con-main-list-bk1-icon').css({width: '372px',right: '18%',bottom: '-214px'});
            $('.signTab .log_code').css({paddingTop: '50px'});
            $('.signTab .ban-hd-pic').css({paddingTop: '65px'});
            $('.signTab .ban-hd-pic .user_class_img').css({top: '367px'});
            $('.btn-jc').css({marginTop: '30px'});

            $('.footer-box').css({width: '1400px'});
            $('.foo-di-box').css({width: '1400px'});
            $('.forget-new').css({top: '222px',left: '19px'});
            $('.foo-t div').css({marginRight: '100px'});
            $('.foo-t .foot-diov-box-lw').css({marginRight: '50px'});

            // 降重
            $('.jc-list-bk1-box').css({width: '1400px'});
            $('.jc-list-bk1-l').css({width: '859px'});
            $('.jc_bk1_icon1').css({width: '831px'});
            $('.jc-list-bk1-r').css({width: '444px'});
            $('.jc-bk1-xbt').css({width: '444px'});
            $('.jc-bk1-iconx1').css({top: '208px',right: '111px'});
            $('.jc-bk1-iconx2').css({bottom: '81px',left: '221px'});
            $('.jc-list-bk2-box').css({width: '1300px'});
            $('.jc-list-bk2-box-r').css({width: '934px'});
            $('.jc-bk2-icon1').css({width: '934px'});
            $('.jc-bk1-icon3').css({width: '624px',top: '0'});
            $('.jc-bk2-icon2').css({marginTop: '50px'});

            $('.personal-cen').css({right: '30px'});

            // 图大小
            $('.list-bk1-bg img').css({width: '282px'});
            $('.list-bk1-video').css({width: '926px'});
            $('.list-bk2-xbt img').css({width: '418px'});
            $('.jc-bk1-icon2').css({width: '322px'});
            $('.jc-list-bk1-r').css({marginTop: '135px'});
            $('.list-bk3-box-l-xbt img').css({width: '296px'});
            $('.bd').css({width: '319px'});
            $('.signTab .ban-balance').css({paddingLeft:'70px'});
            $('.signTab .ban-hd-pic .p-xbt').css({paddingLeft:'70px'});
            $('.header-nav').css({height:'120px'});
            $('.head-nav-box').css({lineHeight: '80px',height: '80px'});
            $('.top_img_jt').css({top: '-39px'});
            $('.personal-cen').css({top: '80px'});
            $('.head-go-login').css({marginTop: '24px'});
            $('.header-box').css({height: '802px'});

            $('.head-nav-list-l ul a').css({fontSize: '15px'});
            $('.head-nav-list-l ul li').css({marginRight: '40px',marginLeft:'0px'});

        }else if($(window).width() >= 1285 && $(window).width() < 1610){
            $('html,body').css({backgroundPositionY:' -4%'});
            $('.head-nav-box').css({width:'1263px'});
            $('.head-nav-list').css({width:'866px',marginLeft:'90px'});
            $('.banner-nr-r-box').css({width:'475px',height: '600px',transform: 'scale(0.9)'});
            $('.banner-nr').css({paddingBottom:'80px'});
            $('.banner-nr-l-wzboxt p').css({marginTop:'22px'});
            $('.signTab').css({width:'355px',height: '524px',marginTop: '27px',marginLeft:'89px'});
            $('.signTab .otherAccount').css({marginTop: '30px'});
            $('.banner-nr-l-t1').css({width: '754px'});
            $('.banner-nr-l-t2').css({width: '605px',marginTop: '-88px',left:'-3px'});
            $('.banner-nr-l').css({marginLeft: '138px'});
            $('.banner-box-l-img').css({width:'322px',bottom: '20px',marginLeft:'0px'});
            $('.con-main-list-bk3').css({width: '1200px'});
            $('.sec_r_img1').css({width: '730px',marginTop: '62px'});
            $('.list-swiper-container').css({width: '730px',marginTop: '62px'});
            $('.sec_r_imgx1').css({width: '643px',marginTop: '160px'});

            $('.sec_r_img_icon1').css({width: '130px',right: '-16px',bottom: '78px'});
            $('.sec_r_img_icon2').css({width: '110px',right: '219px',bottom: '9px'});
            $('.sec-r-img1-app').css({right: '12%',top: '50%'});
            $('.sec-r-img1-xcx').css({right: '30%',top: '80%'});
            $('.list-bk3-box-r').css({right: '-460px',width: '730px'});
            $('.indexToClass').css({top: '60%',left: '42.6%'});
            $('.sec-img-slide-last').css({marginLeft: '90px'});
            $('.banner-nr').css({width: '1200px'});
            $('.index-icon1').css({right: '9%'});
            $('.con-main-list-bk1-icon').css({width: '272px',right: '10%',bottom: '-168px'});
            $('.signTab .log_code').css({paddingTop: '50px'});
            $('.signTab .ban-hd-pic').css({paddingTop: '45px'});
            $('.signTab .ban-hd-pic .user_class_img').css({top: '337px'});
            $('.btn-jc').css({marginTop: '30px'});

            $('.footer-box').css({width: '1200px'});
            $('.foo-di-box').css({width: '1200px'});
            $('.forget-new').css({top: '222px',left: '19px'});
            $('.foo-t div').css({marginRight: '50px'});
            $('.foo-t .foot-diov-box-lw').css({marginRight: '0px'});

            // 降重
            $('.jc-list-bk1-box').css({width: '1200px'});
            $('.jc-list-bk1-l').css({width: '783px'});
            $('.jc_bk1_icon1').css({width: '755px'});
            $('.jc-list-bk1-r').css({width: '397px'});
            $('.jc-bk1-xbt').css({width: '397px'});
            $('.jc-bk1-iconx1').css({top: '177px',right: '97px'});
            $('.jc-bk1-iconx2').css({bottom: '66px',left: '221px'});
            $('.jc-list-bk2-box').css({width: '1200px'});
            $('.jc-list-bk2-box-r').css({width: '835px'});
            $('.jc-bk2-icon1').css({width: '835px'});
            $('.jc-bk1-icon3').css({width: '532px',top: '170px'});
            $('.jc-bk2-icon2').css({marginTop: '-16px'});

            $('.personal-cen').css({right: '0px'});

            // 图大小
            $('.list-bk1-bg img').css({width: '270px'});
            $('.list-bk1-video').css({width: '900px'});
            $('.list-bk2-xbt img').css({width: '406px'});
            $('.jc-bk1-icon2').css({width: '300px'});
            $('.jc-list-bk1-r').css({marginTop: '135px'});
            $('.list-bk3-box-l-xbt img').css({width: '276px'});
            $('.bd').css({width: '319px'});
            $('.signTab .ban-balance').css({paddingLeft:'37px'});
            $('.signTab .ban-hd-pic .p-xbt').css({paddingLeft:'37px'});
            $('.header-nav').css({height:'120px'});
            $('.head-nav-box').css({lineHeight: '80px',height: '80px'});
            $('.top_img_jt').css({top: '-39px'});
            $('.personal-cen').css({top: '80px'});
            $('.head-go-login').css({marginTop: '24px'});
            $('.header-box').css({height: '802px'});

            $('.head-nav-list-l ul a').css({fontSize: '14px'});
            $('.head-nav-list-l ul li').css({marginRight: '25px',marginLeft:'0px'});

        }else{
            $('html,body').css({backgroundPositionY:' -3%'});
            $('.head-nav-box').css({width:'1100px'});
            $('.head-nav-list').css({width:'831px',marginLeft:'7px'});
            $('.head-nav-list-l ul a').css({fontSize: '14px'});
            $('.head-nav-list-l ul li').css({marginRight: '10px',marginLeft:'12px'});
            $('.banner-nr-r-box').css({width:'475px',height: '538px',transform: 'scale(0.95)'});
            $('.banner-nr').css({paddingBottom:'140px'});
            $('.banner-nr-l-wzboxt p').css({marginTop:'16px'});
            $('.signTab').css({width:'355px',height: '524px',marginTop: '49px',marginLeft:'89px'});
            $('.signTab .otherAccount').css({marginTop: '11px'});
            $('.banner-nr-l-t1').css({width: '654px'});
            $('.banner-nr-l-t2').css({width: '554px',marginTop: '-89px',left:'-7px'});
            $('.banner-nr-l').css({marginLeft: '168px'});
            $('.banner-box-l-img').css({width:'222px',bottom: '62px',marginLeft:'0px'});
            $('.con-main-list-bk3').css({width: '1100px'});
            $('.sec_r_img1').css({width: '600px',marginTop: '134px'});
            $('.list-swiper-container').css({width: '630px',marginTop: '134px'});
            $('.sec_r_imgx1').css({width: '643px',marginTop: '160px'});

            $('.sec_r_img_icon1').css({width: '110px',right: '15px',bottom: '63px'});
            $('.sec_r_img_icon2').css({width: '110px',right: '219px',bottom: '9px'});
            $('.sec-r-img1-app').css({right: '15%',top: '55%'});
            $('.sec-r-img1-xcx').css({right: '33%',top: '82%'});
            $('.list-bk3-box-r').css({right: '-460px',width: '630px'});
            $('.indexToClass').css({top: '64%',left: '40.5%'});
            $('.sec-img-slide-last').css({marginLeft: '20px'});
            $('.banner-nr').css({width: '1200px'});
            $('.index-icon1').css({right: '4%'});
            $('.con-main-list-bk1-icon').css({width: '239px',right: '7%',bottom: '-148px'});
            $('.signTab .log_code').css({paddingTop: '20px'});
            $('.signTab .ban-hd-pic').css({paddingTop: '3px'});
            $('.signTab .ban-hd-pic .user_class_img').css({top: '287px'});
            $('.btn-jc').css({marginTop: '14px'});

            $('.footer-box').css({width: '1100px'});
            $('.foo-di-box').css({width: '1100px'});
            $('.forget-new').css({top: '222px',left: '38px'});
            $('.foo-t div').css({marginRight: '40px'});
            $('.foo-t .foot-diov-box-lw').css({marginRight: '0px'});

            // 降重
            $('.jc-list-bk1-box').css({width: '1100px'});
            $('.jc-list-bk1-l').css({width: '652px'});
            $('.jc_bk1_icon1').css({width: '632px'});
            $('.jc-bk1-xbt').css({width: '360px'});
            $('.jc-bk1-iconx1').css({top: '149px',right: '82px'});
            $('.jc-bk1-iconx2').css({bottom: '52px',left: '221px'});
            $('.jc-list-bk2-box').css({width: '1100px'});
            $('.jc-list-bk2-box-r').css({width: '740px'});
            $('.jc-bk2-icon1').css({width: '740px'});
            $('.jc-bk1-icon3').css({width: '448px',top: '239px'});
            $('.jc-bk2-icon2').css({marginTop: '-56px'});

            $('.personal-cen').css({right: '0px'});

            // 图大小
            $('.list-bk1-bg img').css({width: '255px'});
            $('.list-bk1-video').css({width: '872px'});
            $('.list-bk2-xbt img').css({width: '376px'});
            $('.jc-bk1-icon2').css({width: '274px'});
            $('.jc-list-bk1-r').css({marginTop: '81px'});
            $('.list-bk3-box-l-xbt img').css({width: '256px'});
            $('.bd').css({width: '283px'});

            $('.list-bk3-box-l-select ul li').css({width:'350px',height:'85px',lineHeight:'85px'});
            $('.bk3-box-select-img').css({width:'50px',height:'50px',marginTop:'16px'});
            $('.list-bk3-box-l-xbt').css({marginTop:'136px',marginBottom:'36px'});
            $('.list-bk3-box-l').css({marginLeft:'27px'});
            $('.signTab .ban-balance').css({paddingLeft:'18px'});
            $('.signTab .ban-hd-pic .p-xbt').css({paddingLeft:'18px'});
            $('.header-nav').css({height:'90px'});
            $('.head-nav-box').css({lineHeight: '56px',height: '56px'});
            $('.top_img_jt').css({top: '-28px'});
            $('.personal-cen').css({top: '60px'});
            $('.head-go-login').css({marginTop: '12px'});
            $('.header-box').css({height: '690px'});

        }

        if($(window).width() > 1285 && $(window).width() < 1420){
            $('.banner-box-l-img').css({width:'251px',bottom:'67px'});
        }
        if($(window).width() > 1600 && $(window).width() < 1780){
            $('.banner-box-l-img').css({width:'270px',bottom:'63px'});
        }


    }

    // 首页obs文件数量提示
    setTimeout(function (){
       $('.index-ts').fadeOut();
    },15000);

    // 导航栏滚动
    //当滚动条的垂直位置距顶部100像素一下时，跳转链接出现，否则消失
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 10) {

                if($(window).width() < 1285){
                    $('.header-nav').css({
                        backgroundImage: 'url('+_cdn+'/static/images/index/nav_top_bg.png?'+_version+')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize:'cover',
                        backgroundPosition: 'left bottom',
                        height: '90px'
                    });
                    $('.head-nav-box').css({lineHeight: '56px',height: '56px'});
                    $('.top_img_jt').css({top: '-28px'});
                    $('.personal-cen').css({top: '60px'});
                    $('.head-go-login').css({marginTop: '12px'});
                }else {
                    $('.header-nav').css({
                        backgroundImage: 'url('+_cdn+'/static/images/index/nav_top_bg.png?'+_version+')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize:'cover',
                        backgroundPosition: 'left bottom',
                        height: '120px'
                    });
                    $('.head-nav-box').css({lineHeight: '80px',height: '80px'});
                    $('.top_img_jt').css({top: '-39px'});
                    $('.personal-cen').css({top: '80px'});
                    $('.head-go-login').css({marginTop: '24px'});
                }


        } else {
            $('.header-nav').css({
                background: 'none'
            });

        }
    });


    // 返回顶部
    $(window).scroll(function() {
        if ($(window).scrollTop() > 600) {
            $('.setup-box').fadeIn();
        } else {
            $(".setup-box").fadeOut();
        }
    });
    $('.setup-box-top,.list-bk4-box-r-btn').click(function (){
        $('html , body').animate({scrollTop: 0},'slow');
    });


    // 页面滚动动画
    // 导航动画
    $('.head-nav-box').animate({top:'0',opacity:'1'},"300");

    // banner 动画
    function intAni(){
        $('.banner-nr-l-t1').animate({top:'0',opacity:'1'},'3000','linear',function (){
            setTimeout(function (){
                $('.banner-nr-l-t2').animate({top:'0',opacity:'1'},'7000','linear');
                $('.banner-nr-l-wzboxt').animate({top:'-43px',opacity:'1'},'7000','linear');
            },200);
            setTimeout(function (){
                $('.banner-box-l-img').animate({left:'0',opacity:'1'},'15000','linear');
                $('.index-ts').animate({top:'65px',opacity:'1'},'15000','linear');
            },200);
        });
        $('.banner-nr-r-box').animate({marginRight:'0',opacity:'1'},'3000','linear');
        setTimeout(function (){
            $('.content-nav').animate({bottom:'0',opacity:'1'},'5000','linear');
            $('.index-icon1').fadeIn(1000);
        },200);

        setTimeout(function (){
            $('.list-bk1-bg').animate({opacity:'1'},'500','linear',function() {
                $('.list-bk1-bg img').animate({top: '0', opacity: '1'}, '500', 'linear');
            });
        },200);

    }
    setTimeout(function (){
        intAni();
    },300);


    $(window).scroll(function() {
        initPart()

    });

});
initPart()

function initPart(){
    
        //获取距离页面顶部的距离
        var toTop = document.documentElement.scrollTop || document.body.scrollTop;
        //div距离顶部的距离

        // 查重板块动画
        // 板块1滚动动画
        var conMainListBk1 = $(".con-main-list-bk1").offset().top - toTop;
        if(conMainListBk1 <= 300){
            setTimeout(function (){
                $('.list-bk1-video').animate({right:'0',opacity:'1'},'5000','linear',function (){
                    $('.con-main-list-bk1-icon').animate({marginRight:'0',opacity:'1'},'10000','linear');
                });

            },200)

        };

        // 板块2滚动动画
        var conMainListBk2 = $(".con-main-list-bk2").offset().top - toTop;
        if(conMainListBk2 <= 600){
            $('.list-bk2-xbt').animate({top:'0',opacity:'1'},'300','linear',function(){
                $('.list-bk2-icon2').fadeIn(500);
                $('.list-bk2-con ul li').eq(0).animate({top:'0',opacity:'1'},'300','linear',function(){
                    $('.list-bk2-con ul li').eq(1).animate({top:'0',opacity:'1'},'300','linear',function(){
                        $('.list-bk2-con ul li').eq(2).animate({top:'0',opacity:'1'},'4000','linear',function(){
                            $('.list-bk2-con ul li').eq(3).animate({top:'0',opacity:'1'},'8000','linear');
                        });
                    });
                });
            });
        };

        // 板块3滚动动画
        var conMainListBk3 = $(".con-main-list-bk3").offset().top - toTop;
        if(conMainListBk3 <= 600){
            $('.list-bk3-box-l-xbt').animate({top:'0',opacity:'1'},'500','linear',function(){
                $('.list-bk3-box-l-select').animate({top:'0',opacity:'1'},'1000','linear');
            });
            $('.sec_r_img1').animate({top:'0',opacity:'1'},'5000','linear',function(){
                $('.sec_r_img_icon1').fadeIn(500);
                $('.sec_r_img_icon2').fadeIn(500);
            });
        }
        if(conMainListBk3 <= 0){
            $('.list-bk3-box-l').css({position:'fixed',top:'0'});
        }
        if(conMainListBk3 > 100){
            $('.list-bk3-box-l').css({position:'absolute',top:'0'});
        }

        if(conMainListBk3 <= -2713){
            $('.list-bk3-box-l').css({position:'absolute',top:'initial',bottom:'80px'});
        }

        // 查重子导航滚动切换
        if($(".sec-img-slide-not1").offset().top - toTop <= 400 && $(".sec-img-slide-not1").offset().top - toTop >= -100){
            $(".cc-list-bk3-sel2").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon2.png?'+_version);
            $(".cc-list-bk3-sel3").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon3.png?'+_version);
            $(".cc-list-bk3-sel4").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon4.png?'+_version);
            $(".cc-list-bk3-sel1").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon1_on.png?'+_version);

            $(".cc-list-bk3-sel1").addClass('sel-active').siblings().removeClass('sel-active');
        }

        if($(".sec-img-slide-not2").offset().top - toTop <= 400 && $(".sec-img-slide-not2").offset().top - toTop >= -100){
            $(".cc-list-bk3-sel1").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon1.png?'+_version);
            $(".cc-list-bk3-sel3").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon3.png?'+_version);
            $(".cc-list-bk3-sel4").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon4.png?'+_version);
            $(".cc-list-bk3-sel2").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon2_on.png?'+_version);

            $(".cc-list-bk3-sel2").addClass('sel-active').siblings().removeClass('sel-active');

        }
        if($(".sec-img-slide-not3").offset().top - toTop <= 400 && $(".sec-img-slide-not3").offset().top - toTop >= -100){
            $(".cc-list-bk3-sel1").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon1.png?'+_version);
            $(".cc-list-bk3-sel2").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon2.png?'+_version);
            $(".cc-list-bk3-sel4").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon4.png?'+_version);
            $(".cc-list-bk3-sel3").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon3_on.png?'+_version);

            $(".cc-list-bk3-sel3").addClass('sel-active').siblings().removeClass('sel-active');

        }
        if($(".sec-img-slide-not4").offset().top - toTop <= 400 && $(".sec-img-slide-not4").offset().top - toTop >= -100){
            $(".cc-list-bk3-sel1").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon1.png?'+_version);
            $(".cc-list-bk3-sel2").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon2.png?'+_version);
            $(".cc-list-bk3-sel3").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon3.png?'+_version);
            $(".cc-list-bk3-sel4").find('img').attr('src',_cdn+'/static/images/index/index_list1_bk3_navIcon4_on.png?'+_version);

            $(".cc-list-bk3-sel4").addClass('sel-active').siblings().removeClass('sel-active');

        }


        // 板块4滚动动画
        var conMainListBk4 = $(".con-main-list-bk4").offset().top - toTop;

        var conMainListBk4Top = 600;
        if($(window).width() >= 1920){
            conMainListBk4Top = 2100;
        }else{
            conMainListBk4Top = 600;
        }

        if($(window).width() <= 2000){
            if(conMainListBk4 <= conMainListBk4Top){
                $('.list-bk4-box-l').animate({top:'0',opacity:'1'},'500','linear',function(){
                    $('.list-bk4-box-r-xbt').animate({top: '0', opacity: '1'},'500','linear',function () {
                        if(!conMainListBk4Flag){

                            // 用户量数字滚动
                            new CountUp('list-bk4-num', '0', '700', '0', '5', {
                                useEasing: true,//效果
                                separator: ''//数字分隔符
                            }).start();// target：目标元素id, startVal：你想要开始的值, endVal：你想要到达的值, decimals：小数位数，默认值为0, duration：动画持续时间为秒，默认值为2, options：选项的可选对象

                            conMainListBk4Flag = true;
                        }

                        $('.list-bk4-box-r-nr').animate({top: '0', opacity: '1'},'500','linear',function () {
                            $('.list-bk4-box-r-btn').animate({top: '0', opacity: '1'},'500','linear');
                            $('.footer-box').animate({top:'0',opacity:'1'},'500','linear');
                        });

                    });
                });
            };
        }else{
            // if($(document).scrollTop() >= $(document).height() - $(window).height()){
                $('.list-bk4-box-l').animate({top:'0',opacity:'1'},'500','linear',function(){
                    $('.list-bk4-box-r-xbt').animate({top: '0', opacity: '1'},'500','linear',function () {
                        if(!conMainListBk4Flag){

                            // 用户量数字滚动
                            new CountUp('list-bk4-num', '0', '700', '0', '5', {
                                useEasing: true,//效果
                                separator: ''//数字分隔符
                            }).start();// target：目标元素id, startVal：你想要开始的值, endVal：你想要到达的值, decimals：小数位数，默认值为0, duration：动画持续时间为秒，默认值为2, options：选项的可选对象

                            conMainListBk4Flag = true;
                        }

                        $('.list-bk4-box-r-nr').animate({top: '0', opacity: '1'},'500','linear',function () {
                            $('.list-bk4-box-r-btn').animate({top: '0', opacity: '1'},'500','linear');
                            $('.footer-box').animate({top:'0',opacity:'1'},'500','linear');
                        });

                    });
                });
            // }

        }
        // 查重板块动画  e

        // 降重板块动画
        // 板块1动画
        var jcConMainListBk1 = $(".jc-main-list-bk1").offset().top - toTop;
        if(jcConMainListBk1 <= 600){
            $('.jc_bk1_icon1').animate({opacity:'1',top:'0'},'300','linear',function(){
                $('.jc-bk1-iconx1').animate({marginTop:'0px',opacity:'1'},'500','linear',function(){
                    $('.jc-bk1-iconx2').animate({marginTop:'0px',opacity:'1'},'2000','linear');
                    $('.jc-bk1-iconx3').fadeIn(1000);
                    $('.jc-bk1-xbt').animate({top:'0px',opacity:'1'},'4000','linear',function (){
                        $('.jc_bk1_txt1').animate({top:'0px',opacity:'1'},'8000','linear',function (){
                            $('.jc-bk1-icon2').animate({top:'0px',opacity:'1'},'15000','linear');
                        });
                    });
                });
            });
        }

}



// 邀请好友
function classView(){
    classInfo();
}

function classInfo(){
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/group_buy/class/home_page/info?t=" + new Date().getTime(),
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            if (XmlHttpRequest.responseText != "") {
                alert(XmlHttpRequest.responseText);
            }
        },
        success: function (res) {
            if(res.code == 0){
                $(".class-my-box-con-l").setTemplateElement('myReferenceList', null, {filter_data: false});
                $(".class-my-box-con-l").processTemplate(res.data);
                $('.class-my-top-xbt').text('邀请好友加入我的班级：'+res.data.className);
                $('.class-box').show();
                $('.class-my-box').show();
            } else{
                PaperYYAlert(res.msg);
            }
        }
    });
}
// 关闭我的班级
function myClose(){
    $('.class-box').hide();
    $('.class-my-box').hide();
}
function copyClassSuceess(){
    $('.copyClass-suceess').show();
    var copyTimes = setTimeout(function (){
        $('.copyClass-suceess').hide();
        clearTimeout(copyTimes);
    },3000);
}
// 复制班级口令
function copyClass($id){
    if($id == "page-video-share-txt-lbom-inpt"){
        getBuried('video_link_button','share','index');
    }
    selectText($id);
    document.execCommand("copy");
    copyClassSuceess();
}
//选中文本
function selectText(element) {
    var text = document.getElementById(element);
    //做下兼容
    if (document.body.createTextRange) {  //如果支持
        var range = document.body.createTextRange(); //获取range
        range.moveToElementText(text); //光标移上去
        range.select();  //选择
    } else if (window.getSelection) {
        var selection = window.getSelection(); //获取selection
        var range = document.createRange(); //创建range
        range.selectNodeContents(text);  //选择节点内容
        selection.removeAllRanges(); //移除所有range
        selection.addRange(range);  //添加range
    } else {
        layer.msg("复制失败");
    }
}


// 切换班级名片
function classMp(){
    $('.banner_kpgr_bg2,.banner_kpgr_bg4').animate({
        right:'-100px'
    },800,function (){
        $('.banner-class-card').show();
        $('.banner-class-card').animate({
            right: '-17px',
        },700);
    });
    setTimeout(function (){
        $('.banner-personal-card,.signTab').fadeOut(400);
    },200);
}
// 切换个人名片
function personalMp(){
    $('.banner-class-card').animate({
        right: '-100px',
    },700,function (){
        $('.banner-personal-card').fadeIn();
        $('.banner_kpgr_bg2,.banner_kpgr_bg4').animate({
            right: '-17px',
        },800,function (){
            $('.signTab').fadeIn();
        });
    });

    $('.banner-class-card').fadeOut(200);

}



