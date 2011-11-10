function FEScriptParser(){
	this.lexer;
	this.lookahead;
	this.top;
	this.used = 0;
}

FEScriptParser.prototype.setLexer = function(lexer){
	this.lexer = lexer; 
}

FEScriptParser.prototype.setText = function (text){
	this.lexer.setText(text);
}

FEScriptParser.prototype.move = function (){
	this.lookahead = this.lexer.scan();
}

FEScriptParser.prototype.match = function(t){
	if(this.lookahead.tag == t){
		this.move();
	} else {
		throw new Error("Syntax Error. Not expect '"+this.lookahead.lexeme+"' at line:"+this.lexer.line+" column: "+this.lexer.column);
	}
}

FEScriptParser.prototype.isDigit = function(c) {
	return ("0".charCodeAt(0)<=c.charCodeAt(0)) && (c.charCodeAt(0) <= "9".charCodeAt(0));
}

FEScriptParser.prototype.isLetter = function(c) {
	return ("A".charCodeAt(0)<=c.charCodeAt(0)) && (c.charCodeAt(0) <= "z".charCodeAt(0));
}

/*
FEScriptParser.prototype.expr = function(){
	this.term();
	while(true){
		if(this.lookahead=="+"){
			this.match("+");
			this.term();
			this.resultText += "+";
		} else if(this.lookahead=="-") {
			this.match("-");
			this.term();
			this.resultText += "-";
		} else {
			return;
		}
		
	}
};

FEScriptParser.prototype.term = function(){
	if(this.isDigit(this.lookahead)){
		this.resultText += this.lookahead;
		this.match(this.lookahead);
	} else {
		throw new Error("Syntax error. Expected a digit at char: "+this.currentPosition+". Got: '"+this.lookahead+"'");
	}
};
*/
FEScriptParser.prototype.parse = function(){
	this.paralelo();
}

FEScriptParser.prototype.paralelo = function(){
	this.move();
	if(this.lookahead===undefined) return;
	switch(this.lookahead.tag){
		case Tag.PARALLEL:
		case Tag.SEQUENTIAL:
		case Tag.PARENTESIS_LEFT:
		case Tag.ID:
			this.sequencial();
			this.paralelo1();	
	}
	throw new Error("Syntax Error on line:"+this.lexer.line+" col:"+this.lexer.column+". Expected: ||, ;, (, ID");
};

FEScriptParser.prototype.paralelo1 = function(){
	this.move();
	if(this.match(Tag.PARALLEL)){
			this.sequencial();
			this.paralelo1();		
	}
};

FEScriptParser.prototype.sequencial = function(){
	this.move();
	if(this.lookahead===undefined) return;
	switch(this.lookahead.tag){
		case Tag.SEQUENTIAL:
		case Tag.PARENTESIS_LEFT:
		case Tag.ID:
			this.processo();
			this.sequencial1();	
	}
	throw new Error("Syntax Error on line:"+this.lexer.line+" col:"+this.lexer.column+". Expected: ;, (, ID");
};

FEScriptParser.prototype.sequencial1 = function(){
	this.move();
	if(this.match(Tag.SEQUENTIAL)){
			this.processo();
			this.sequential1();		
	}
};

FEScriptParser.prototype.processo = function(){
	this.move();
	if(this.match(Tag.PARENTESIS_LEFT)){
			this.paralelo();
			if(!this.match(Tag.PARENTESIS_RIGHT)){
				throw new Error("Syntax Error on line:"+this.lexer.line+" col:"+this.lexer.column+". Expected: )");
			}
	}else if(!this.match(Tag.ID)){
		throw new Error("Syntax Error on line:"+this.lexer.line+" col:"+this.lexer.column+". Expected: ID or (");
	}else if(!this.match(Tag.NUM)){
		throw new Error("Syntax Error on line:"+this.lexer.line+" col:"+this.lexer.column+". Expected: ID or (");
	}
};

