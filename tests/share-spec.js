describe('Share.init', function() {
    var expect = chai.expect;

    it('should generate data-shareurl', function() {
        var link = document.createElement('a');
        link.id = 'example';
        link.setAttribute('data-service', 'douban');
        document.body.appendChild(link);

        Share.init([document.getElementById('example')], {
            title: '中文',
            url: 'http://github.com?a=1&b=2'
        });

        expect(link.getAttribute('data-shareurl')).to.equal('http://shuo.douban.com/!service/share?name=%E4%B8%AD%E6%96%87&href=http%3A%2F%2Fgithub.com%3Fa%3D1%26b%3D2&image=');

        document.body.removeChild(link);
    });

    it('should not throw exception with no param', function() {
        function fn() {
            Share.init();
        }
        expect(fn).to.not.throw();
    });

    it('should have prority in data-api', function() {
        var link = document.createElement('a');
        link.id = 'example';
        link.setAttribute('data-service', 'douban');
        link.setAttribute('data-title', 'test');
        link.setAttribute('data-url', 'http://chuo.me');
        document.body.appendChild(link);

        Share.init([document.getElementById('example')], {
            title: '中文',
            url: 'http://github.com?a=1&b=2'
        });

        expect(link.getAttribute('data-shareurl')).to.equal('http://shuo.douban.com/!service/share?name=test&href=http%3A%2F%2Fchuo.me&image=');

        document.body.removeChild(link);
    });
});

