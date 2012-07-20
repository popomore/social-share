;(function($){
		
	var defaults = {
	    title : '',
        url : '',
        pic : ''
	};
	
	$.fn.share = function(options){
        var options = $.extend({}, defaults, options);

		this.each(function(i, o){
            var url, serviceDom = $(o), service = serviceDom.attr('data-share');
            if (service) {
                url = sharejs.parse(service, options);
                console.log(url);
                serviceDom.click(function(){
                    window.open(url); 
                });
            }
		});
	};
	
})(jQuery);
