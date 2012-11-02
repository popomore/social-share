;(function(global) {
    if (global.Share) return;

    var supportJquery = ($ === jQuery),
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
            if (DOMList && DOMList.length) {
                for (var i = 0, l = DOMList.length; i < l; i++) {
                    callback(i, DOMList[i]);
                }
            }
        }
    }

    function mix(target, object) {
        if (supportJquery) {
            return $.extend({}, target, object);
        } else {
            for (var i in object) {
                if (object.hasOwnProperty(i)) {
                    target[i] = object[i];
                }
            }
            return target;
        }
    }

    // Get DATA-API
    function getData(obj) {
        var data = {};
        for (var j in supportParam) {
            var a = obj.getAttribute('data-' + j);
            if (a) data[j] = a;
        }
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
