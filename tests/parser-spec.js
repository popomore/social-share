describe('Share.parser', function() {
    var parser = require('../src/parser.js');
    var chai = require('chai');
    var expect = chai.expect;

    it('should specify serviceId', function() {
        function fn() {
            parser();
        }
        expect(fn).to.throw(/Should specify serviceId/);
    });

    it('should specify a exist serviceId', function() {
        function fn() {
            parser('notexist', {});
        }
        expect(fn).to.throw(/"notexist" do not exist/);
    });

    it('should encode', function() {
        var url = parser('douban', {
            title: '中文',
            url: 'http://github.com?a=1&b=2'
        });
        expect(url).to.equal('http://shuo.douban.com/!service/share?name=%E4%B8%AD%E6%96%87&href=http%3A%2F%2Fgithub.com%3Fa%3D1%26b%3D2&image=');
    });
});
