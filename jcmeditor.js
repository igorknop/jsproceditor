var server = require('./src/server/server'),
    router = require('./src/server/router'),
    requestHandlers = require('./src/server/requestHandlers');

var handle = {};

handle['/'] = requestHandlers.parse;
handle["/favicon.ico"] = requestHandlers.favicon;

server.start(router.route, handle);
