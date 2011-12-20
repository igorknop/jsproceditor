var http = require('http'),
    url  = require('url');

var port = 8888;

function start(route, handle){

   function onRequest(request, response){
      var pathname = url.parse(request.url).pathname;
      route(handle, pathname, response, request);
   }

   http.createServer(onRequest).listen(port);
   console.log("Server started on: http://localhost:"+port);
}

exports.start = start;
