;(function(global) {
    if (global.Share) return;

    var supportJquery = (typeof $ !== 'undefined' && $ === jQuery),
        supportParam = ['service', 'title', 'url', 'pic'];

    var Share = global.Share = {
        init: function(DOMList, options) {
            each(DOMList, function(i, o) {
                var data = getData(o);
                data = mix(options, data);
                bindEvent(o, 'click', function(e) {
                    window.open(Share.parser(data.service, data));
                });
            });
        }
    };

    // Helper
    // ------

    function each(arr, callback) {
        if (supportJquery) {
            $.each(arr, callback);
        } else {
            if (arr && arr.length) {
                for (var i = 0, l = arr.length; i < l; i++) {
                    callback(i, arr[i]);
                }
            }
        }
    }

    function mix(target, object) {
        if (supportJquery) {
            return $.extend({}, target, object);
        } else {
            var t = {};
            for (var i in target) {
                if (target.hasOwnProperty(i)) {
                    t[i] = target[i];
                }
            }
            for (var i in object) {
                if (object.hasOwnProperty(i)) {
                    t[i] = object[i];
                }
            }
            return t;
        }
    }

    // Get DATA-API
    function getData(obj) {
        var data = {};
        each(supportParam, function(i, o) {
            var a = obj.getAttribute('data-' + o);
            if (a) data[o] = a;
        });
        return data;
    }

    function bindEvent(elem, type, handler) {
        if (supportJquery) {
            $(elem).on(type, handler);
        } else {
            if (elem.addEventListener) {
                elem.addEventListener(type, handler, false);
            } else if (elem.attachEvent) {
                elem.attachEvent('on' + type, handler);
            }
        }
    }

    // Support jQuery
    // --------------

    if (supportJquery) {
        $.fn.share = function(options) {
            Share.init(this, options);
        };
    }
})(this);
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
