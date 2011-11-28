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
    	case Tag.BRACKETS_LEFT:
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
    	case Tag.BRACKETS_LEFT:
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
    		this.afirmacao1();
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

FEScriptParser.prototype.afirmacao1 = function(){
    switch(this.lookahead.tag){
    	case Tag.PARENTESIS_LEFT:
    	   this.match(Tag.PARENTESIS_LEFT);
    	   this.match(Tag.PARENTESIS_RIGHT);
      break;
    	case Tag.ATRIBUITION:
         this.atribuicao();
      break;
      default:
    		this.error("Syntax Error. Expected: (), =");
   }
}

FEScriptParser.prototype.atribuicao = function(){
   this.move();
   if(this.lookahead.tag === Tag.ID){
    	this.match(Tag.ID);
       this.match(Tag.PARENTESIS_LEFT);
       this.match(Tag.PARENTESIS_RIGHT);
   } else if(this.lookahead.tag === Tag.NUM){
    	this.match(Tag.NUM);
   }else {
       this.error("Syntax Error. Expected: ID(), NUM");
   }

}

FEScriptParser.prototype.processo = function(){
}

FEScriptParser.prototype.condicao = function(){
    if(this.lookahead.tag === Tag.BRACKETS_LEFT){
    		this.move();
    		this.comparacao();
    		this.match(Tag.THEN);
    		this.paralelo();
    		this.match(Tag.ELSE);
    		this.paralelo();
    		this.match(Tag.BRACKETS_RIGHT);
    }
};

FEScriptParser.prototype.comparacao = function(){
    		var t1 = this.termo();
    		var t2 = this.comparacao1();
            t2.addChild(t1);
            return t2;
};

FEScriptParser.prototype.comparacao1 = function(){
    var n = new Node();
    switch(this.lookahead.tag){
    	case Tag.EQ:
    		this.move();
    		var t = this.termo();
    	break;
    	case Tag.NEQ:
    		this.move();
    		var t = this.termo();
    	break;
    	case Tag.LT:
    		this.move();
    		var t = this.termo();
    	break;
    	case Tag.GT:
    		this.move();
    		var t = this.termo();
    	break;
    	case Tag.LEQ:
    		this.move();
    		var t = this.termo();
    	break;
    	case Tag.GEQ:
    		this.move();
    		var t = this.termo();
    	break;
        n.type = this.lookahead.tag;
        n.addChild(t);
        return n;
    }
};

FEScriptParser.prototype.termo = function(){
    switch(this.lookahead.tag){
    	case Tag.ID:
    		return this.termo1();
    	break;
    	case Tag.NUM:
    		this.match(Tag.NUM);
            var n = new Node();
            n.type = this.lookahead.tag;
            n.value = this.lookahead.lexeme;
            return n;
    	break;
    	default:
    		this.error("Syntax Error. Expected: ID, ID() or NUM");
    }
};

FEScriptParser.prototype.termo1 = function(){
    this.move();
    var n = new Node();
    n.type = this.lookahead.tag;
    n.value = this.lookahead.lexeme;
    if(this.lookahead.tag === Tag.PARENTESIS_LEFT){
        this.move();
        this.match(Tag.PARENTESIS_RIGHT);
        n.type = "process";
    }
    return n;
};
