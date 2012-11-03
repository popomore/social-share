# Social Share

A simple and easy-to-use social share tool. It can be used in both browser and nodejs.

---

First of all, view the [example](http://popomore.github.com/social-share/examples/).

## How to use

Html

```
<script src="share.min.js"></script>
<a data-service="twitter">twitter</a>
<a data-service="facebook">facebook</a>
```

Javascript

```
var list = document.getElementsByTagName('a');
Share.init(list, {
    title: 'share it',
    url: 'https://github.com/popomore/social-share'
});
```

Find the DOM and bind event, popup the window and redirect to the service when DOM is clicked. 

`data-service` must be specified. See [Support service](#Support service)

### DATA-API

```
<a data-service="twitter" data-title="share twitter">twitter</a>
```

DATA-API is higher priority than options, then the share content will be "share twitter".

### Parameter

 -  **title** - share content
 -  **url** - share url
 -  **pic** - share picture
 
However, not all of the services support these parameter, view the [defference](https://github.com/popomore/social-share/wiki).

## Support service

Icon | Service
------ | ------
   | sina

[The difference between services](https://github.com/popomore/social-share/wiki)

## jQuery support

If you use jQuery, it's easy to use.

```
$('selector').share({
    title:'share it'
});
```

[jQuery Example](http://popomore.github.com/social-share/examples/index.jquery.html)

## Node.js support

Install social-share by npm

```
npm install social-share
```

Just use it

```
var share = require('social-share');
var url = share('twitter', {
    title:'share it'
});
```

If you use express, you can

```
app.get('/redirect', function(req, res) {
    var url = share(req.query.service, req.query);
    res.redirect(url);
});
```

You can clone the repo to view the example.

```
$ git clone https://github.com/popomore/$ social-share.git
make server
```

View `http://127.0.0.1:3000/`



