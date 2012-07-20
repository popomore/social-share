define(function(require, exports, module) {

    var serviceParser = {
        
        parse: function(serviceId, option) {
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
    }

    module.exports = serviceParser;

});

