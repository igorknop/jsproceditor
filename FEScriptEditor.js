window.addEventListener("load", init, false);

function init() {
	console.info("Initializing editor");
	loadScript([
		"Tag.js",
		"Token.js",
		"FEScriptNode.js",
		"FEScriptLexer.js",
		"FEScriptParser.js"
	]);

	var btnRun = document.getElementById("fscrun");
	btnRun.addEventListener("click", btnrunClick, false);
	
}

function loadScript(scripts){
	var head = document.getElementsByTagName("head")[0];
	var script;
	for(var s in scripts){
		script = document.createElement("script");
		script.setAttribute("src","src/"+scripts[s]);
		head.appendChild(script);
	}
}

function btnrunClick(){
	if(event.preventDefault){
		event.preventDefault();
	}
	event.result = false;
	var parser = new FEScriptParser();
	var lexer = new FEScriptLexer();
	parser.setLexer(lexer);
	console.info("Parsing: "+document.fscripteditor.fsctext.value);
	parser.setText(document.fscripteditor.fsctext.value);
	try {
		parser.parse();
	} catch (e){
		var errors = document.getElementById("errors");
		var error = document.createElement("dt");
		error.innerHTML = new Date()+": "+e.toLocaleString();
		error.setAttribute("class","error");
		errors.appendChild(error);
		return;
	}
	var errors = document.getElementById("errors");
	var error = document.createElement("dt");
	errors.innerHTML = "";
	error.innerHTML = new Date()+": OK";
	error.setAttribute("class","ok");
	errors.appendChild(error);
	
}
