sharejs.pushService('sohu',{
    'apiUrl': 'http://t.sohu.com/third/post.jsp',
    'title': 'title',
    'url': 'url'
});

sharejs.before('sohu',function(option, service){
    option['content'] = 'utf-8';
})
