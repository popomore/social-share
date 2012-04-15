;(function(w, s){
	
	if(!w.sharejs){
		new Error('no sharejs');
	}
	
	function bind(t,c){
		util.each(util.getElements(c.triggerClass, t),function(o, i){
			var serviceId = c.service[i];
			if(serviceId){
				util.addEvent(o,'click',function(e){
					e.preventDefault();
					var finalUrl = makeUrl(serviceId,c);
					window.open(finalUrl, '_blank', 'top=100,left=200,width=1000,height=618');
				});
			}
		});
	}
	
	s.dom = function(param){
		
	};
	
	s.dom.prototype = {
		
	};
	
	s.dom.init = function(){
		return new s.dom(arguments[0]);
	};

})(window, sharejs);