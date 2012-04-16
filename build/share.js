;window.sharejs || (function(w){

    /**
     * 检测添加模型的有效性
     * @Parameter <Object>service
     * @Return <Boolean>isValid
     */
    var checkServiceValid = function(service){
        var i, s = ['apiUrl'];
        //每个服务必须配置apiUrl和url
        for( i in s){
            if(!service.hasOwnProperty(s[i])){
                throw new Error('Service must specify the key "' + s[i] + '"');
                return false;
            }
        }

        return true;
    };

    /**
     * 对象混入
     * @Parameter <Object>service 服务的关系配置
     * @Parameter <Object>option 用户个性化的参数
     * @Return <Object>object 混入后的对象
     */
    var mixin = function(service, option){
        var newone = {}, j;
        for( j in service){
            if(service.hasOwnProperty(j)){
                newone[j] = '';
            }
        }
        for( j in option){
            if(option.hasOwnProperty(j)){
                newone[j] = option[j];
            }
        }
        return newone;
    };

    /**
     * 判断是否为函数
     */
    var isFunction = function(f){
        try { 
            return /^\s*\bfunction\b/.test(f) ;
        } catch (x) {   
            return false ;
        }
    };

    var sharejs = w.sharejs = {

        _service : {}, //储存所有服务的配置

        _beforeFunc : {}, //储存所有预处理的函数

        /**
         * 将指定服务解析成url的方法
         * _此方法面向最终开发者_
         * @Parameter <String>serviceId 需要解析的服务名，如不存在会抛出异常 
         * @Parameter <Object>options 解析时需要用户自定义的参数
         * @Return <String>url
         */
        parse : function(serviceId, option){

            var service = this._service[serviceId], func = this._beforeFunc[serviceId];

            //调用的服务必须已配置
            if (!service){
                throw new Error('No Service "' + serviceId +'" Configuration');
            }

            var param = [], i, nOption = mixin(service, option), url = service['apiUrl'];

            //在解析前先调用自定义方法
            if(func){
                func(nOption, service);
            }

            if(nOption) {
                for (i in nOption){
                    if(nOption[i]){
                        var key = service[i] ? service[i] : i;
                        var value = encodeURIComponent(nOption[i]);
                        param.push(key + '=' + value);
                    }
                }
            }

            return url + '?' + param.join('&');
        },

        /**
         * 添加服务，后添加的id会覆盖前面
         * _此方法面向服务提供方_
         * @Parameter <String>serviceId 添加的服务名，如有重复会覆盖以前的
         * @Parameter <Object>service 添加匹配关系，apiUrl和url为必填
         * @Return <Void>
         */
        pushService : function(serviceId, service){

            if(checkServiceValid(service)){
                this._service[serviceId] = service;
            }
        },

        /**
         * 添加服务的预处理，可处理mixin后的参数对象
         * @Parameter <String>serviceId 添加的服务名，如有重复会覆盖以前的
         * @Parameter <Function>func 预处理的回调函数
         *            func有两个参数
         *            1. option 混入后的参数对象
         *            2. service 服务的配置对象
         * @Return <Void>
         */
        before : function(serviceId, func){
            if(isFunction(func)){
                this._beforeFunc[serviceId] = func;  
            }
        }
    };

})(window);
sharejs.pushService('douban',{
	'apiUrl': 'http://shuo.douban.com/!service/share',
	'title': 'name',
	'url': 'href',
	'pic': 'image'
});
sharejs.pushService('kaixin',{
	'apiUrl': 'http://www.kaixin001.com/repaste/bshare.php',
	'title': 'rtitle',
	'url': 'rurl'
});
sharejs.pushService('netease',{
    'apiUrl': 'http://t.163.com/article/user/checkLogin.do',
    'title': 'info'
});

sharejs.before('netease',function(option, service){
    option['title'] = option['title'] + ' ' + option['url']; 
})
sharejs.pushService('qq_t',{
	'apiUrl': 'http://v.t.qq.com/share/share.php',
	'title': 'title',
	'url': 'url',
	'pic': 'pic'
});
sharejs.pushService('qq_zone',{
	'apiUrl': 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey',
	'title': 'title',
	'url': 'url',
	'pic': 'pics'
});
sharejs.pushService('renren',{
	'apiUrl': 'http://share.renren.com/share/buttonshare.do',
	'title': 'title',
	'url': 'link'
});
sharejs.pushService('sina',{
	'apiUrl': 'http://v.t.sina.com.cn/share/share.php',
	'title': 'title',
	'url': 'url',
	'pic': 'pic'
});
sharejs.pushService('sohu',{
    'apiUrl': 'http://t.sohu.com/third/post.jsp',
    'title': 'title',
    'url': 'url'
});

sharejs.before('sohu',function(option, service){
    option['content'] = 'utf-8';
})
