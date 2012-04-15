describe("Share", function() {
	
	describe("Method _containSupportKey", function() {
		
		it("Method _containSupportKey: add a service", function() {
			expect(sharejs._containSupportKey('title')).toBeTruthy();
			expect(sharejs._containSupportKey('notsupport')).toBeFalsy();
		});
		
	});
	

	describe("Method pushService", function() {

	    beforeEach(function() {
	        sharejs._service = {};
	    });
		
		it("Method pushService: add a service", function() {
	        var service = {
	            'apiUrl': 'http://v.t.sina.com.cn/share/share.php',
	            'title': 'title',
	            'url': 'url',
	            'pic': 'pic'
	        };
	        sharejs.pushService('weibo', service);

	        expect(sharejs._service['weibo']).toEqual(service);

	    });

		it("Method pushService: without parameter apiUrl", function() {
	        var service = {
	            'url': 'url'
	        };

			expect(function(){
				sharejs.pushService('weibo', service);
			}).toThrow(new Error('Service must specify the key "apiUrl"'));
	    });
	
		it("Method pushService: key not support", function() {
	        var service = {
	            'apiUrl': 'http://v.t.sina.com.cn/share/share.php',
				'url': 'url',
				'notsupportkey': 'notsupportvalue'
	        };

			expect(function(){
				sharejs.pushService('weibo', service);
			}).toThrow(new Error('Key "notsupportkey" is not supported'));
	    });	
	    
	});

	describe("Method parse", function() {
		
		beforeEach(function() {
	        sharejs.pushService('weibo',{
				'apiUrl': 'http://v.t.sina.com.cn/share/share.php',
				'title': 'title',
				'url': 'url',
				'pic': 'pic'
			});
	    });
	
		it("Method parse: no service configuration", function() {

			expect(function(){
				sharejs.parse('weibo2',{});
			}).toThrow(new Error('No Service "weibo2" Configuration'));
	    });	

		it("Method parse: no param", function() {
			var result = sharejs.parse('weibo');
			expect(result).toEqual('http://v.t.sina.com.cn/share/share.php?');
	    });	

		it("Method parse: parse weibo", function() {
			var result = sharejs.parse('weibo',{
				title : '文案'
			});
			expect(result).toEqual('http://v.t.sina.com.cn/share/share.php?title='+encodeURIComponent('文案'));
	    });	
		
		it("Method parse: not support key", function() {
			var result = sharejs.parse('weibo',{
				title : '文案',
				newkey : 'newkey'
			});
			expect(result).toEqual('http://v.t.sina.com.cn/share/share.php?title='+encodeURIComponent('文案'));
	    });	
		
	});
	
});
