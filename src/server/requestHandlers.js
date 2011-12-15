var fs = require('fs'),
    formidable = require("formidable");

    var body = "<!doctype html>"+
         "<html>"+
         "  <head><meta charset='utf-8' />"+
         "     <title>JCMEditor</title></head>"+
         "  <body style='margin: auto; width: 450px;'>"+
         "     <h1>JCMEditor</h1>"+
         "  <form action='/parse' method='post' enctype='multipart/form-data'>"+
         "     <textarea name='script' cols='50' rows='5'>a();(b()||c());d()</textarea>"+
         "     <input type='submit' value='Run'/>"+
         "  </form>"+
         "  <pre><samp id='result'>${result}</samp></pre>"+
         "  </body>"+
         "</html>";

function start(response, request){
      console.log("Request handler 'start' was called!");
      
      response.writeHead(200, {"Content-Type": "text/html"});
      var html = body.replace("${result}","");
      response.write(html);
      response.end();
}

function parse(response, request){
      console.log("Request handler 'start' was called!");
      
      response.writeHead(200, {"Content-Type": "text/html"});
      var html = body.replace("${result}","No result");
      response.write(html);
      response.end();
}


function favicon (response){
   fs.readFile("favicon.ico", "binary", function(error, file){
      if(error){
         response.writeHead(500, {"Content-Type": "text/plain"});
         response.write(error + "\n");
         response.end();
      } else {
         response.writeHead(200, {"Content-Type": "image/ico"});
         response.write(file, "binary");
         response.end();
      }
   });
}

exports.start = start;
exports.parse = parse;
exports.favicon = favicon;

