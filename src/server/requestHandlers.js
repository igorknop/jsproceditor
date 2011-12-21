var fs = require('fs'),
    formidable = require("formidable"),
    sys = require("sys"),
    exec = require("child_process").exec;
    

    var body = "<!doctype html>"+
         "<html>"+
         "  <head><meta charset='utf-8' />"+
         "     <title>JCMEditor</title></head>"+
         "  <body style='margin: auto; width: 450px;'>"+
         "     <h1>JCMEditor</h1>"+
         "  <form action='/' method='post' enctype='multipart/form-data'>"+
         "     <textarea name='script' cols='50' rows='5'>${input}</textarea>"+
         "     <input type='submit' value='Run'/>"+
         "  </form>"+
         "  <pre><samp id='result'>${result}</samp></pre>"+
         "  </body>"+
         "</html>";

function start(response, request){
      console.log("Request handler 'start' was called!");
      
      response.writeHead(200, {"Content-Type": "text/html"});
      var html = body.replace("${result}","").replace("${input}","a();(b()||c());d()");
      response.write(html);
      response.end();
}

function parse(response, request){
   console.log("Request handler 'parse' was called!");
   var html = body;

   if(request.method.toLowerCase()==='post') {
      var Tag = require("../Tag").Tag,
          Token = require("../Token").Token,
          Num = require("../Token").Num,
          Word = require("../Token").Word,
          FEScriptLexer = require("../FEScriptLexer").FEScriptLexer,
          FEScriptNode = require("../FEScriptNode"),
          FEScriptParser = require("../FEScriptParser").FEScriptParser;
      
      var form = formidable.IncomingForm();
      console.log("Parsing form data...");
      form.parse(request, function(error, fields, files){
         sys.inspect(fields);
         console.log("Form data parsed.");
         console.log("Parsing script:'"+fields.script+"'");
         var lex = new FEScriptLexer();
         var psr = new FEScriptParser();
         psr.setLexer(lex);
         psr.setText(fields.script);
         try{
            var tree = psr.parse();
            console.log("Script parsed.");
            var processes = {
               "a": "bash -c 'date; sleep 2; date'",
               "b": "bash -c 'date; sleep 1; date'",
               "c": "bash -c 'date; sleep 4; date'",
               "d": "bash -c 'date; sleep 2; date'",
            }
            
            function runTree(root, response, content, callback){
               if(!root.parentNode){
                  response.writeHead(200, {"Content-Type": "text/html"});
               }
               switch(root.type){
                  case FEScriptNodeType.PROCESS:
                     console.log("Execunting process "+
                           root.childNodes[0].value+"():"+
                           processes[root.childNodes[0].value]+
                           "\n"
                     );
                     exec(processes[root.childNodes[0].value], function(error, stdout, stderr){
                        content+=stdout+"\n";
                        content+=stderr+"\n";
                        content+=error+"\n";
                        console.log("Process executed. error: "+error+"\nstdout:"+stdout+"\nstderr: "+stderr);
                     });
                  break;
                  case FEScriptNodeType.SEQUENTIAL:
                  break;
                  case FEScriptNodeType.PARALLEL:
                  break;
               }
               if(!root.parentNode){
                  html = body.replace("${result}", content);
                  response.write(html);
                  response.end();
               }
            }
            outx = runTree(tree, response, "");
         } catch(e){
            console.error("Parser error!");
            response.writeHead(200, {"Content-Type": "text/html"});
            html = body.replace("${result}", e.message).replace("${input}", fields.script);
            response.write(html);
            response.end();
         }
      });
   }
   else {
      response.writeHead(200, {"Content-Type": "text/html"});
      html = body.replace("${result}","").replace("${input}", "a();(b()||c());d()");
      response.write(html);
      response.end();
   }
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

