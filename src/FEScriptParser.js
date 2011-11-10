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
	this.error("Syntax Error. Expected: ||, ;, (, ID");
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
	switch(this.lookahead.tag){
		case Tag.SEQUENTIAL:
		case Tag.PARENTESIS_LEFT:
		case Tag.ID:
			this.processo();
			this.sequencial1();	
	}
	this.error("Syntax Error. Expected: ;, (, ID");
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
				this.error("Syntax Error. Expected: )");
			}
	}else if(!this.match(Tag.ID)){
		this.error("Syntax Error. Expected: ID or (");
	}else if(!this.match(Tag.NUM)){
		this.error("Syntax Error.Expected: NUM");
	}
};

