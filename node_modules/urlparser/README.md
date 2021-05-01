[![Build Status](https://travis-ci.org/kaerus-component/urlparser.png)](https://travis-ci.org/kaerus-component/urlparser)

  - [URL](#url)
  - [Examples:](#examples)
  - [UrlParser()](#urlparser)
  - [ret.host](#rethost)
  - [ret.path](#retpath)
  - [ret.query](#retquery)

## URL

  Provides with an Url parser that deconstructs an url into a managable object and back to a string.
  
## Examples:
   
```js
   url = require('urlparser');
   
   var u = url.parse('http://user:pass@kaerus.com/login?x=42');
   
   u.host.hostname = 'database.kaerus.com'
   u.host.password = 'secret';
   u.host.port = 8529;
   u.query.parts.push('a=13');
   u.toString(); // 'http://user:secret@database.kaerus.com:8529/login?x=42&a=13'
```

## UrlParser()

  @class  UrlParser

## ret.host

  Host attributes
  
```js
   host: {
       protocol: {String}
       username: {String}
       password: {String}
       hostname: {String}
       port: {String}
   }
```

## ret.path

  Path information
  
```js
   path: {
       base: {String} // base path without hash
       name: {String} // file or directory name
       hash: {String} // the #hash part in path
   }
```

## ret.query

  Query parameters
  
```js
   query: {
       parts: {Array}   // query segments ['a=3','x=2'] 
       params: {Object} // query parameters {a:3,x:2}
   }
```

