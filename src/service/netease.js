sharejs.pushService('netease',{
    'apiUrl': 'http://t.163.com/article/user/checkLogin.do',
    'title': 'info'
});

sharejs.before('netease',function(option, service){
    option['title'] = option['title'] + ' ' + option['url']; 
})
