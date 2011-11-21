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

FEScriptParser.prototype.error = function(e){
		throw new Error(e+" at line:"+this.lexer.line+" column: "+this.lexer.column);
	
}

FEScriptParser.prototype.match = function(t){
	if(this.lookahead.tag === t){
		this.move();
	} else {
		this.error("Syntax Error. Not expect '"+this.lookahead.lexeme+"'");
	}
}

FEScriptParser.prototype.isDigit = function(c) {
	return ("0".charCodeAt(0)<=c.charCodeAt(0)) && (c.charCodeAt(0) <= "9".charCodeAt(0));
}

FEScriptParser.prototype.isLetter = function(c) {
	return ("A".charCodeAt(0)<=c.charCodeAt(0)) && (c.charCodeAt(0) <= "z".charCodeAt(0));
}

FEScriptParser.prototype.parse = function(){
	this.move();
	this.paralelo();
	if(this.lookahead.lexeme!==undefined){
		this.error("Syntax Error. Not expected: "+ this.lookahead.lexeme);	
	}
}

FEScriptParser.prototype.paralelo = function(){
	switch(this.lookahead.tag){
		case Tag.PARENTESIS_LEFT:
		case Tag.ID:
			this.sequential();
			this.paralelo1();
		break;
		default:
			this.error("Syntax Error. Expected: (, ID");
	}
};

FEScriptParser.prototype.paralelo1 = function(){
	if(this.lookahead.tag===Tag.PARALLEL){
			this.move();
			this.sequential();
			this.paralelo1();		
	}
};

FEScriptParser.prototype.sequential = function(){
	switch(this.lookahead.tag){
		case Tag.PARENTESIS_LEFT:
		case Tag.ID:
			this.processo();
			this.sequential1();
		break;
		default:
			this.error("Syntax Error. Expected: (, ID");
	}
};

FEScriptParser.prototype.sequential1 = function(){
	if(this.lookahead.tag===Tag.SEQUENTIAL){
			this.move();
			this.processo();
			this.sequential1();		
	}
};

FEScriptParser.prototype.processo = function(){
	if(this.lookahead.tag === Tag.PARENTESIS_LEFT){
			this.move();
			this.paralelo();
			this.match(Tag.PARENTESIS_RIGHT);
	}else if(this.lookahead.tag === Tag.ID){
		this.move();
	}else if(this.lookahead.tag === Tag.NUM){
		this.move();
	} else {
		this.error("Syntax Error. Expected: (, ID, NUM");
	}
};

