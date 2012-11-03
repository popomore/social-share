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
