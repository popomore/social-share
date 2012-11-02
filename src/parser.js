;(function(global) {
    var services = {
        'douban': 'http://shuo.douban.com/!service/share?name={{title}}&href={{url}}&image={{pic}}',
        'facebook': 'http://www.facebook.com/sharer.php?t={{title}}&u={{url}}',
        'kaixin': 'http://www.kaixin001.com/repaste/bshare.php?rtitle={{title}}&rurl={{url}}',
        'netease': 'http://t.163.com/article/user/checkLogin.do?info={{title}}',
        'qq_t': 'http://v.t.qq.com/share/share.php?title={{title}}&url={{url}}&pic={{pic}}',
        'qq_zone': 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title={{title}}&url={{url}}&pics={{pic}}',
        'renren': 'http://share.renren.com/share/buttonshare.do?title={{title}}&link={{url}}',
        'sina': 'http://v.t.sina.com.cn/share/share.php?title={{title}}&url={{url}}&pic={{pic}}',
        'twitter': 'https://twitter.com/intent/tweet?text={{title}}&url={{url}}',
        'sohu': 'http://t.sohu.com/third/post.jsp?title={{title}}&url={{url}}&content=utf-8'
    };

    function parser(serviceId, option) {
        var service = services[serviceId];

        // Should specify serviceId
        if (!service) {
            throw new Error('No Service "' + serviceId + '" Configuration');
        }

        return service.replace(/{{(.*?)}}/g, function(a, m) {
            return option[m] ?
                encodeURIComponent(option[m]) : '';
        });
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = parser;
    }

    if (global.Share) {
        global.Share.parser = parser;
    }
})(this);
