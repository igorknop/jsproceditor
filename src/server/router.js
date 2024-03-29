function route(handle, pathname, response, request){
   if(pathname!="/favicon.ico") {
      console.log("About to route a request for '"+pathname+"'");
   }
   if(typeof handle[pathname] === "function"){
      handle[pathname](response, request);
   } else {
      console.log("No request handler found: "+pathname);
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not found.");
      response.end();
   }
}

exports.route = route;
