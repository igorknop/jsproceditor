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
    var root = this.paralelo();
    if(this.lookahead.lexeme!==undefined){
    	this.error("Syntax Error. Not expected: "+ this.lookahead.lexeme);	
    }
    return root;
}

FEScriptParser.prototype.setLeftMostNode = function(nodeTarget, node){
    if(!nodeTarget){
        return;
    }
    if(nodeTarget.childNodes[0]){
        this.setLeftMostNode(nodeTarget.childNodes[0], node);
    }else{
        nodeTarget.childNodes[0] = node;
    }
};
FEScriptParser.prototype.paralelo = function(){
    switch(this.lookahead.tag){
    	case Tag.PARENTESIS_LEFT:
    	case Tag.BRACKETS_LEFT:
    	case Tag.ID:
    		var s = this.sequential();
    		var p1 = this.paralelo1();
            if(p1){
                this.setLeftMostNode(p1,s);
                return p1;
            }else{
                return s;
            }
    	break;
    	default:
    		this.error("Syntax Error. Expected: (, ID");
    }
};

FEScriptParser.prototype.paralelo1 = function(){
    if(this.lookahead.tag===Tag.PARALLEL){
            var p= new FEScriptNode();
            p.type = FEScriptNodeType.PARALLEL;
    		this.move();
    		var s = this.sequential();
            p.childNodes[0] = null;        
            p.addChild(s);
    		var p1 = this.paralelo1();
            if(p1){
                this.setLeftMostNode(p1,p);
                return p1;
            }else{
                return p;
            }
    }
};

FEScriptParser.prototype.sequential = function(){
    switch(this.lookahead.tag){
    	case Tag.BRACKETS_LEFT:
    	case Tag.PARENTESIS_LEFT:
    	case Tag.ID:
    		var a = this.afirmacao();
    		var s1 = this.sequential1();
            if(s1){
                this.setLeftMostNode(s1,a);
                return s1;
            } else {
                return a;
            }
    	break;
    	default:
    		this.error("Syntax Error. Expected: (, ID");
    }
};

FEScriptParser.prototype.sequential1 = function(){
    if(this.lookahead.tag===Tag.SEQUENTIAL){
            var s = new FEScriptNode();
            s.type = FEScriptNodeType.SEQUENTIAL;
    		this.move();
    		var a = this.afirmacao();
    		var s1 = this.sequential1();
            s.childNodes[0] = null;
            s.addChild(a);
            if(s1){
                this.setLeftMostNode(s1,s);
                return s1;
            } else {
                return s;
            }
    }
};

FEScriptParser.prototype.afirmacao = function(){
    switch(this.lookahead.tag){
    	case Tag.ID:
            var id = new FEScriptNode();
            id.value = this.lookahead.lexeme;
            id.type = FEScriptNodeType.ID;
    		this.move();
    		var a1 = this.afirmacao1();
            if(a1.type === FEScriptNodeType.PROCESS){
                a1.addChild(id);
                return a1;
            } else if(a1.type === FEScriptNodeType.ATRIBUITION){
                a1.childNodes[0] = id;
                return a1;
            }
            return a;
    	break;
    	case Tag.BRACKETS_LEFT:
         return this.condicao();
      break;
    	case Tag.PARENTESIS_LEFT:
    		this.move();
    		var p = this.paralelo();
    		this.match(Tag.PARENTESIS_RIGHT);
            return p;
    	break;
    	default:
    		this.error("Syntax Error. Expected: (, ID, NUM. Found: "+this.lookahead.lexeme);
    }
};

FEScriptParser.prototype.afirmacao1 = function(){
    switch(this.lookahead.tag){
    	case Tag.PARENTESIS_LEFT:
    	   this.match(Tag.PARENTESIS_LEFT);
    	   this.match(Tag.PARENTESIS_RIGHT);
           var p = new FEScriptNode();
           p.type = FEScriptNodeType.PROCESS;
           return p;
      break;
    	case Tag.ATRIBUITION:
         var at = new FEScriptNode();
         at.type = FEScriptNodeType.ATRIBUITION;
         at.childNodes[0] = null;
         this.move();
         var t = this.termo();
         at.addChild(t);
         return at;
      break;
      default:
    		this.error("Syntax Error. Expected: (), =");
   }
}

FEScriptParser.prototype.condicao = function(){
    if(this.lookahead.tag === Tag.BRACKETS_LEFT){
            var cond = new FEScriptNode();
            cond.type = this.lookahead.tag;
            cond.value = this.lookahead.lexeme;

    		this.move();
    		var t1 = this.comparacao();
    		this.match(Tag.THEN);
    		var t2 = this.paralelo();
    		this.match(Tag.ELSE);
    		var t3 = this.paralelo();
    		this.match(Tag.BRACKETS_RIGHT);

            cond.addChild(t1);
            cond.addChild(t2);
            cond.addChild(t3);
            return cond;
    }
};

FEScriptParser.prototype.comparacao = function(){
    		var t1 = this.termo();
    		var t2 = this.comparacao1();
            t2.addChild(t1);
            return t2;
};

FEScriptParser.prototype.comparacao1 = function(){
    var n = new FEScriptNode();
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
    }
    n.type = this.lookahead.tag;
    n.addChild(t);
    return n;
};

FEScriptParser.prototype.termo = function(){
    switch(this.lookahead.tag){
    	case Tag.ID:
    		return this.termo1();
    	break;
    	case Tag.NUM:
    		this.match(Tag.NUM);
            var n = new FEScriptNode();
            n.type = FEScriptNodeType.NUM;
            n.value = parseInt(this.lookahead.lexeme);
            return n;
    	break;
    	default:
    		this.error("Syntax Error. Expected: ID, ID() or NUM");
    }
};

FEScriptParser.prototype.termo1 = function(){
    var n = new FEScriptNode();
    n.type = FEScriptNodeType.ID;
    n.value = this.lookahead.lexeme;
    this.move();
    if(this.lookahead.tag === Tag.PARENTESIS_LEFT){
        this.move();
        this.match(Tag.PARENTESIS_RIGHT);
        var p = new FEScriptNode();
        p.type = FEScriptNodeType.PROCESS;
        p.addChild(n);
        return p;
    }
    return n;
};
