var fs = require('fs'),
    formidable = require("formidable"),
    sys = require("sys"),
    exec = require("child_process").exec,
    Barrier = require("./barrierpoints").Barrier;
    

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
   var content = [];

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
               "a": "echo '[A';date; sleep 2; date; echo 'A]'",
               "b": "echo '[B';date; sleep 1; date; echo 'B]'",
               "c": "echo '[C';date; sleep 4; date; echo 'C]'",
               "d": "echo '[D';date; sleep 3; date; echo 'D]'",
            }
            
            var running = 0;
            html = body.replace("${input}", fields.script);
            console.dir(content);
            var newBarrier = new Barrier(1, function(){
               console.log("Completed workflow execution.")
               response.writeHead(200, {"Content-Type": "text/html"});
               html = body.replace("${result}", content.join("\n")).replace("${input}", fields.script);
               response.write(html);
               response.end();
            }, function(){
               console.log("Aborted workflow execution.")
            });
            runTree(tree, response, content, processes, html, newBarrier);
         } catch(e){
            response.writeHead(200, {"Content-Type": "text/html"});
            html = body.replace("${result}", e.message).replace("${input}", fields.script);
            console.error("Parser error!");
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

            function runTree(root, response, content, processes, html, barrier){
               switch(root.type){
                  case FEScriptNodeType.PROCESS:
                     console.log("Execunting process "+
                           root.childNodes[0].value+"():"+
                           processes[root.childNodes[0].value]+
                           "\n"
                     );
                     exec(processes[root.childNodes[0].value], function(error, stdout, stderr){
                        console.log("Process executed.\nerror: "+error+"\nstdout:\n"+stdout+"\nstderr: "+stderr);
                        content.push(stdout);
                        barrier.submit();
                     });
                  break;
                  case FEScriptNodeType.SEQUENTIAL:
                     var newBarrier = new Barrier(1, function(){
                        console.log("Completed a sequential execution.")
                        runTree(root.childNodes[1], response, content, processes, html, barrier);
                     }, function(){
                        console.log("Aborted a sequential execution.")
                     });
                     runTree(root.childNodes[0], response, content, processes, html, newBarrier);
                  break;
                  case FEScriptNodeType.PARALLEL:
                     barrier.parties++;
                     runTree(root.childNodes[0], response, content, processes, html, barrier);
                     runTree(root.childNodes[1], response, content, processes, html, barrier);
                  break;
               }
            }
            function writeResponse(response, content, template){
      response.writeHead(200, {"Content-Type": "text/html"});
            var template2 = template.split("${result}");
            response.write(template2[0]);
               response.write(content);
            response.write(template2[1]);
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

