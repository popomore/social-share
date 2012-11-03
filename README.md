# Social Share

A simple and easy-to-use social share tool. It can be used in both browser and nodejs.

---

First of all, view the example.

## How to use

html

```
<script src="share.min.js"></script>
<a data-service="twitter">twitter</a>
<a data-service="facebook">facebook</a>
```

javascript

```
var list = document.getElementsByTagName('a');
Share.init(list, {
    title: 'share it',
    url: 'https://github.com/popomore/social-share'
});
```

### DATA-API

```
<a data-service="twitter" data-title="share twitter">twitter</a>
```

DATA-API is higher priority than options, then the share content will be "share twitter".

### Parameter

 -  title - share content
 -  url - share url
 -  pic - share picture
 
However, not all of the services support these parameter, view the [defference](https://github.com/popomore/social-share/wiki).

## Support service

Icon | Service
------ | ------
   | sina

[The difference between services](https://github.com/popomore/social-share/wiki)

## jQuery support

if you use jQuery, it's easy to use.

```
$('selector').share({
    title:'share it'
});
```

## Node.js support

install social-share by npm

```
npm install social-share
```

just use it

```
var share = require('social-share');
var url = share('twitter', {
    title:'share it'
});
```

if you use express, you can

```
app.get('/redirect', function(req, res) {
    var url = share(req.query.service, req.query);
    res.redirect(url);
});
```

you can clone the repo to view the example.

```
$ git clone https://github.com/popomore/$ social-share.git
make server
```

view `http://127.0.0.1:3000/`



