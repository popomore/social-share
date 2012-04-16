describe("Share", function() {

    describe("Method before", function() {

        beforeEach(function() {
            sharejs._beforeFunc = {};
        });

        it("Method before: add a func", function() {
            var func = function(){};
            sharejs.before('weibo', func);
            expect(sharejs._beforeFunc['weibo']).toEqual(func);
        }); 

        it("Method before: isFunction", function() {
            sharejs.before('weibo', 1);
            expect(sharejs._beforeFunc).toEqual({});
            
            sharejs.before('weibo', 'a');
            expect(sharejs._beforeFunc).toEqual({});

            sharejs.before('weibo', {});
            expect(sharejs._beforeFunc).toEqual({});

            sharejs.before('weibo', new Date());
            expect(sharejs._beforeFunc).toEqual({});
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

        it("Method pushService: service can be override", function() {
            var service = {
                'apiUrl': 'http://v.t.sina.com.cn/share/share.php',
            'title': 'title',
            'url': 'url',
            'pic': 'pic'
            };
            sharejs.pushService('weibo', service);

            var service2 = {
                'apiUrl': 'http://v.t.sina.com.cn/share/share.php',
            'title': 'title',
            'url': 'url',
            'pic': 'pics'
            };

            sharejs.pushService('weibo', service2);

            expect(sharejs._service['weibo']).toEqual(service2);
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

        it("Method parse: before option", function() {
            sharejs.pushService('weibo',{
                'apiUrl': 'http://v.t.sina.com.cn/share/share.php',
                'title': 'title',
                'url': 'url',
                'pic': 'pic'
            });

            sharejs.before('weibo',function(option, service){
                option['title'] = 'tt';
            })

            var result = sharejs.parse('weibo',{
                title : '文案'
            });
            expect(result).toEqual('http://v.t.sina.com.cn/share/share.php?title=tt');
        });	

    });

});
