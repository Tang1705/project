
$(document).ready(function () {

    $("#login_mpweixin_img").click(function () {
        clearTimeout(_v_t_i);
        clearTimeout(_c_t_i);
        login_qrcode_get();
    });
    $('body').on('click','.codeImg-bk canvas',function (){
        clearTimeout(_v_t_i);
        clearTimeout(_c_t_i);
        login_qrcode_get();
    });
    login_qrcode_get();
    typeTxt(loginQrcodeType);
});
var _c_t_i = null; //记录过期
var _v_t_i = null; //验证
var _l_g_s = "";  // 登录字符串
var _l_t_count = 0;
var _l_t_max = 5;
var _l_t_maxs = 90;
var _l_t_counts = 0;
var _l_ticket = "";
function login_qrcode_get() {
    $(".codeImg-bk").removeClass('codeImg-bk-app');
    $(".codeImg-bk canvas").remove();
    $("#login_mpweixin_img").attr('src', _cdn + '/static/picture/qrcode_loading.gif?' + _version);
    login_ticket();
}

function utf16to8(str) { //转码
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

function login_ticket() {
    if (_v_t_i) {
        clearTimeout(_v_t_i);
    }
    if (_c_t_i) {
        clearTimeout(_c_t_i);
    }
    var _t = new Date().getTime();
    if (_l_t_count > _l_t_max) {
        $("#login_mpweixin_img").attr('src', _cdn + '/static/picture/lose.png?' + _version);
        clearTimeout(_v_t_i);
        clearTimeout(_c_t_i);
        _l_t_count = 0;
        return false;
    } else {
        clearTimeout(_v_t_i);
        clearTimeout(_c_t_i);
        var ajasUrl1 = "";
        if(loginQrcodeType == 'weixin' && loginQrcodeWeixinType == 'wx'){
            // 微信
            ajasUrl1 = '/weixin/ajax.aspx?oper=login_ticket&t=' + _t;
        }
        if(loginQrcodeType == 'weixin' && loginQrcodeWeixinType == 'xcx'){
            // 小程序
            ajasUrl1 = '/login/xcx/qrcode?t=' + _t;
        }
        if(loginQrcodeType == 'app'){
            // app
            ajasUrl1 = '/app/login-qrcode?t=' + _t;
        }
        $.ajax({
            type: 'get',
            url: ajasUrl1,
            dataType: 'json',
            async: true,
            success: function (data) {
                if(loginQrcodeType == 'weixin' && loginQrcodeWeixinType == 'wx'){
                    // 微信
                    if (data.result == 1) {
                        clearTimeout(_v_t_i);
                        clearTimeout(_c_t_i);
                        _l_g_s = data.extra;
                        _l_t_count++;
                        _l_ticket = data.returnval;
                        var img_url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + _l_ticket + '&t=' + _t;
                        $("#login_mpweixin_img").attr('src', img_url);
                        _c_t_i = setTimeout("login_core_expire();", 180000);
                        _v_t_i = setTimeout("login_verify();", 2000);
                    } else {
                        //login_qrcode_get();
                        $("#login_mpweixin_img").attr('src', _cdn + '/static/picture/qrcode_invalid.jpg?' + _version);
                    }
                }
                if(loginQrcodeType == 'weixin' && loginQrcodeWeixinType == 'xcx'){
                    // 小程序
                    if (data.code == 0) {
                        clearTimeout(_v_t_i);
                        clearTimeout(_c_t_i);
                        _l_g_s = data.data.loginId;
                        _l_t_count++;
                        // _l_ticket = data.returnval;
                        // var img_url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + _l_ticket + '&t=' + _t;
                        $("#login_mpweixin_img").attr('src', data.data.qrcodeBytes);
                        _c_t_i = setTimeout("login_core_expire();", 180000);
                        _v_t_i = setTimeout("login_verify();", 2000);
                    } else {
                        //login_qrcode_get();
                        $("#login_mpweixin_img").attr('src', _cdn + '/static/picture/qrcode_invalid.jpg?' + _version);
                    }
                }
                if(loginQrcodeType == 'app') {
                    // app
                    if (data.code == 0) {
                        clearTimeout(_v_t_i);
                        clearTimeout(_c_t_i);
                        if(data.data){
                            _l_g_s = data.data.split('=')[1];
                        }
                        _l_t_count++;
                        $(".codeImg-bk").addClass('codeImg-bk-app');

                        $(".codeImg-bk").qrcode({
                            render: !!document.createElement('canvas').getContext ? 'canvas' : 'table',
                            width: 210,
                            height: 210,
                            text: data.data,
                            src: downDomain + '/static/website/app_logo.png'
                        });

                        _c_t_i = setTimeout(login_core_expire, 180000);
                        _v_t_i = setTimeout(login_verify, 2000);
                    } else {
                        //login_qrcode_get();
                        $(".codeImg-bk").removeClass('codeImg-bk-app');
                        $(".codeImg-bk canvas").remove();
                        $("#login_mpweixin_img").attr('src', _cdn + '/static/picture/qrcode_invalid.jpg?' + _version);
                    }
                }


            },
            error: function () {
                $(".codeImg-bk").removeClass('codeImg-bk-app');
                $(".codeImg-bk canvas").remove();
                $("#login_mpweixin_img").attr('src', _cdn + '/static/picture/qrcode_invalid.jpg?' + _version);
            }
        });
    }
}

function loginSuccess() { top.location.href =  $("#txtRefer").val(); }

function login_core_expire() {
    if (_v_t_i) {
        $(".codeImg-bk").removeClass('codeImg-bk-app');
        $(".codeImg-bk canvas").remove();
        $("#login_mpweixin_img").attr('src', _cdn + '/static/picture/lose.png?' + _version);
        _l_t_counts = 0;
        clearTimeout(_v_t_i);
    }
    // login_qrcode_get();
}

function login_core_success() {
    if (_v_t_i) {
        clearTimeout(_v_t_i);
    }
    if (_c_t_i) {
        clearTimeout(_c_t_i);
    }
    loginSuccess();
}

function login_verify() {
    if(_l_t_counts > _l_t_maxs){
        $("#login_mpweixin_img").attr('src', _cdn + '/static/picture/lose.png?' + _version);
        clearTimeout(_v_t_i);
        clearTimeout(_c_t_i);
        _l_t_counts = 0;
        return false;
    }else{
        if ($("#login_mpweixin_img").is(':hidden')) {
            _v_t_i = setTimeout("login_verify();", 2000);
            return;
        }
        var _t = new Date().getTime();
        var ajasUrl2 = '';
        if(loginQrcodeType == 'weixin' && loginQrcodeWeixinType == 'wx'){
            // 微信
            ajasUrl2 = '/weixin/ajax.aspx?oper=login_verify&t=' + _t + '&login_s=' + _l_g_s;
        }
        if(loginQrcodeType == 'weixin' && loginQrcodeWeixinType == 'xcx'){
            // 小程序
            ajasUrl2 = '/login/xcx/check-login?loginId='+_l_g_s+'&t=' + _t;
        }
        if(loginQrcodeType == 'app') {
            // app
            ajasUrl2 = '/app/login-qrcode/verify?token='+_l_g_s+'&t=' + _t;
        }
        $.ajax({
            type: 'get',
            url: ajasUrl2,
            dataType: 'json',
            async: true,
            success: function (data) {
                if(loginQrcodeType == 'weixin' && loginQrcodeWeixinType == 'wx') {
                    // 微信
                    if (data.result == 1) {
                        login_core_success();
                    } else {
                        _l_t_counts ++;
                        _v_t_i = setTimeout("login_verify();", 2000);
                    }
                }
                if((loginQrcodeType == 'weixin' && loginQrcodeWeixinType == 'xcx') || loginQrcodeType == 'app'){
                    // 小程序
                    if (data.code == 0) {
                        if(data.data.status == -1){
                            // 失效
                            $(".codeImg-bk").removeClass('codeImg-bk-app');
                            $(".codeImg-bk canvas").remove();
                            $("#login_mpweixin_img").attr('src', _cdn + '/static/picture/lose.png?' + _version);
                            clearTimeout(_v_t_i);
                            clearTimeout(_c_t_i);
                            _l_t_counts = 0;
                        }else if(data.data.status == 0){
                            // 未扫码
                            _l_t_counts ++;
                            _v_t_i = setTimeout("login_verify();", 2000);
                        }else if(data.data.status == 1){
                            //  已扫码未确认
                            $(".codeImg-bk").removeClass('codeImg-bk-app');
                            $(".codeImg-bk canvas").remove();
                            if(entranceType == 'index'){
                                $("#login_mpweixin_img").attr('src', _cdn + '/static/picture/sucess1.png?' + _version);
                            }
                            if(entranceType == 'login'){
                                $("#login_mpweixin_img").attr('src', _cdn + '/static/picture/sucess2.png?' + _version);
                            }
                            _l_t_counts ++;
                            _v_t_i = setTimeout("login_verify();", 2000);
                        }else if(data.data.status == 2){
                            //  已扫码已确认
                            login_core_success();
                        }

                    } else {
                        _l_t_counts ++;
                        _v_t_i = setTimeout("login_verify();", 2000);
                    }
                }

            },
            error: function () {
                _l_t_counts ++;
                _v_t_i = setTimeout("login_verify();", 2000);
            }
        });
    }

}

// 状态文案修改
function typeTxt(loginQrcodeTypes){
    if(loginQrcodeTypes != 'app'){
        $(".log-code-txt").html('<span>微信</span>扫码，立即登录');
        $('.log-code-btn-img1').attr('src', _cdn + '/static/images/login_app_icon.png?' + _version).removeClass('log-code-btn-imgwx');
        $('.log-code-btn-txt').html('使用APP扫码登录');
    }else{
        $(".log-code-txt").html('使用<span><a href="/yy-app-api/app/api/index" target="_blank" style="color: #3370FF;">'+siteName+' APP</a></span>扫码登录');
        $('.log-code-btn-img1').attr('src', _cdn + '/static/images/login_wx_icon.png?' + _version).addClass('log-code-btn-imgwx');
        $('.log-code-btn-txt').html('使用微信扫码登录');
    }
}

// 登录切换
function loginType(){
    if(loginQrcodeType != 'app'){
        loginQrcodeType = 'app';
    }else{
        loginQrcodeType = 'weixin';
    }
    typeTxt(loginQrcodeType);

    clearTimeout(_v_t_i);
    clearTimeout(_c_t_i);
    _l_t_counts = 0;
    _l_t_count = 0;
    login_qrcode_get();
}

