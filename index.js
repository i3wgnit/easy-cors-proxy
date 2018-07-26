var http = require('http'),
    request = require('request'),
    url = require('url');

var port = process.env.PORT || 8000,
    proxyURL = 'http://localhost:18332',
    allowOrigin = process.env.ALLOW_ORIGIN || '*',
    allowMethods = process.env.ALLOW_METHODS || '*',
    allowHeaders = process.env.ALLOW_HEADERS || '*'

http.createServer(function (req, res) {
  var r = request(url.resolve(proxyURL, req.url));

  // Add CORS Headers
  r.on('response', function(_r) {
    if (req.method === 'OPTIONS') {
      _r.statusCode = 200;
    }
    _r.headers['Access-Control-Allow-Origin'] = allowOrigin;
    _r.headers['Access-Control-Allow-Methods'] = allowMethods;
    _r.headers['Access-Control-Allow-Headers'] = allowHeaders;
  });

  // Stream the response
  req.pipe(r).pipe(res);
}).listen(port);

console.log('Proxying ' + proxyURL + ' on port ' + port);
