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
			this.afirmacao();
			this.sequential1();
		break;
		default:
			this.error("Syntax Error. Expected: (, ID");
	}
};

FEScriptParser.prototype.sequential1 = function(){
	if(this.lookahead.tag===Tag.SEQUENTIAL){
			this.move();
			this.afirmacao();
			this.sequential1();		
	}
};

FEScriptParser.prototype.afirmacao = function(){
	switch(this.lookahead.tag){
		case Tag.ID:
			this.move();
			this.processo();
		break;
		case Tag.BRACKETS_LEFT:
         this.condicao();
      break;
		case Tag.PARENTESIS_LEFT:
			this.move();
			this.paralelo();
			this.match(Tag.PARENTESIS_RIGHT);
		break;
		default:
			this.error("Syntax Error. Expected: (, ID, NUM");
	}
};


FEScriptParser.prototype.atribuicao = function(){
	if(this.lookahead.tag === Tag.ID){
		this.match(Tag.ATRIBUITION);
		this.processo();
	}
}

FEScriptParser.prototype.processo = function(){
		this.match(Tag.PARENTESIS_LEFT);
		this.match(Tag.PARENTESIS_RIGHT);
}

FEScriptParser.prototype.condicao = function(){
	if(this.lookahead.tag === Tag.BRACKETS_LEFT){
			this.move();
			this.comparacao();
			this.match(Tag.THEN);
			this.afirmacao();
			this.match(Tag.ELSE);
			this.afirmacao();
			this.match(Tag.PARENTESIS_RIGHT);
	}
};

FEScriptParser.prototype.comparacao = function(){
			this.termo();
			this.comparacao1();
};

FEScriptParser.prototype.comparacao1 = function(){
	switch(this.lookahead.tag){
		case Tag.EQ:
			this.move();
			this.termo();
		break;
		case Tag.NEQ:
			this.move();
			this.termo();
		break;
		case Tag.LT:
			this.move();
			this.termo();
		break;
		case Tag.GT:
			this.move();
			this.termo();
		break;
		case Tag.LEQ:
			this.move();
			this.termo();
		break;
		case Tag.GEQ:
			this.move();
			this.termo();
		break;
	}
};

FEScriptParser.prototype.termo = function(){
	switch(this.lookahead.tag){
		case Tag.ID:
			this.termo1();
		break;
		case Tag.NUM:
      
		break;
		default:
			this.error("Syntax Error. Expected: ID");
	}
};

FEScriptParser.prototype.termo1 = function(){
	this.move();
	if(this.lookahead.tag === Tag.PARENTESIS_LEFT){
			this.match(Tag.PARENTESIS_RIGHT);
	}
};
