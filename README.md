# mini-file
mini-route static file handler extension.

Example:
```javascript
var http = require('http');
var MiniRoute = require('mini-route');
var miniFile = require('mini-file');

var server = http.createServer();
var router = new MiniRoute(server);

miniFile(router, __dirname + '/public');

server.listen(8080);
```
