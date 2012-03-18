;window.sharejs || (function(w){
	
	/**
	 * 检测添加模型的有效性
	 * @Parameter <Object>service
	 * @Return <Boolean>isValid
	 */
	var checkServiceValid = function(service){
		var i, s = ['apiUrl','url'];
		//每个服务必须配置apiUrl和url
		for( i in s){
			if(!service.hasOwnProperty(s[i])){
				throw new Error('Service must specify the key "' + s[i] + '"');
				return false;
			}
		}
		
		//检测参数是否支持
		for( i in service){
			if(!sharejs._containSupportKey(i)){
				throw new Error('Key "' + i + '" is not supported');
				return false;
			}
		}
		
		return true;
	};
		
 	var sharejs = w.sharejs = {
		
		_service : {}, //储存所有服务的配置

		_supportKey : ['apiUrl','title','url','pic','source'], //服务支持的参数

		_containSupportKey : function(key){
			var i;
			for (i=0,l=this._supportKey.length; i < l; i++){
				if(key == this._supportKey[i]){
					return true;
				}
			}			
			return false;
		},
		
		/**
		 * 
		 * @Parameter <String>modelName
		 * @Return <String>url
		 */
		parse : function(serviceId, config){

			var service = sharejs._service[serviceId];
			
			if (!service){
				throw new Error('No Service "' + serviceId +'" Configuration');
			}

			var param = [], i, url = service['apiUrl'];
			
			if(config) {
				for (i in config){
					if(this._containSupportKey(i) && service.hasOwnProperty(i)){
						param.push(service[i] + '=' + encodeURIComponent(config[i]));
					}
				}
			}

			return service['apiUrl'] + '?' + param.join('&');
		},
		
		/**
		 * 
		 * @Parameter <Object>service
		 * @Return <Void>
		 */
		pushService : function(serviceId, service){

			if(checkServiceValid(service)){
				this._service[serviceId] = service;
			}
		}
	};
	
})(window);