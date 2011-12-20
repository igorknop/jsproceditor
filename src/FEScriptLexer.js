if(typeof exports !== 'undefined'){
   var Token = require("./Token").Token;
   var Word = require("./Token").Word;
   var Num = require("./Token").Num;
   var Tag = require("./Tag").Tag;
}

function FEScriptLexer(){
    this.line = 1;
	this.column = 1;
    this.peek = " ";
    this.words = {};
    this.currentPosition = 0;
    this.text = "";
    
    this.reserve(new Word(Tag.TRUE, "true"));
    this.reserve(new Word(Tag.FALSE, "false"));
    this.reserve(new Word(Tag.LT, "<"));
    this.reserve(new Word(Tag.GT, ">"));
    this.reserve(new Word(Tag.BRACKETS_LEFT, "["));
    this.reserve(new Word(Tag.BRACKETS_RIGHT, "]"));
    this.reserve(new Word(Tag.EQ, "=="));
    this.reserve(new Word(Tag.LEQ, "<="));
    this.reserve(new Word(Tag.GEQ, ">="));
    this.reserve(new Word(Tag.NEQ, "!="));
    this.reserve(new Word(Tag.SEQUENTIAL, ";"));
    this.reserve(new Word(Tag.PARALLEL, "||"));
    this.reserve(new Word(Tag.ATRIBUITION, "="));
}

FEScriptLexer.prototype.setText = function(text){
    this.line = 1;
	this.column = 1;
    this.peek = " ";
    this.words = {};
    this.currentPosition = 0;
    this.text = text;
    
    this.reserve(new Word(Tag.TRUE, "true"));
    this.reserve(new Word(Tag.FALSE, "false"));
}

FEScriptLexer.prototype.readch = function(c){
	this.peek = this.text[this.currentPosition++];
	if(c===undefined){
		return;
	}
	this.column += 1;
	if(this.peek != c){
		return false;
	}
	this.peek = ' ';
	return true;
}
FEScriptLexer.prototype.reserve = function(word){
    this.words[word.lexeme] = word;
};

FEScriptLexer.prototype.scan = function() {
    for (;; this.readch()) {
        if (this.peek === " " || this.peek === "\t") {
            continue;
        }
        else if (this.peek === "\n") {
			this.column = 1;
            this.line += 1;
        }
        else break;
    }
	switch(this.peek){
		case "|":
			if( this.readch("|")){
				return new Word(Tag.PARALLEL, "||");
			} else {
				throw new Error("Lexical Error on line:"+this.line+" column:"+this.column);
			}
		break;
		case "=":
			if( this.readch("=")){
				return new Word(Tag.EQ, "==");
			} else {
				return new Word(Tag.ATRIBUITION, "=");
			}
		break;
		case "!":
			if( this.readch("=")){
				return new Word(Tag.NEQ, "!=");
			} else {
				throw new Error("Lexical Error on line:"+this.line+" column:"+this.column);
			}
		break;
		case "?":
			this.readch();
			return new Word(Tag.THEN, "?");
		break;
		case ":":
			this.readch();
			return new Word(Tag.ELSE, ":");
		break;
		case "(":
			this.readch();
			return new Word(Tag.PARENTESIS_LEFT, "(");
		break;
		case ")":
			this.readch();
			return new Word(Tag.PARENTESIS_RIGHT, ")");
		break;
		case "[":
			this.readch();
			return new Word(Tag.BRACKETS_LEFT, "[");
		break;
		case "]":
			this.readch();
			return new Word(Tag.BRACKETS_RIGHT, "]");
		break;
		case ";":
			this.readch();
			return new Word(Tag.SEQUENTIAL, ";");
		break;
		case "<":
			if( this.readch("=")){
				return new Word(Tag.LEQ, "<=");
			} else {
				return new Word(Tag.LT, "<");
			}
		break;
		case ">":
			if( this.readch("=")){
				return new Word(Tag.GEQ, ">=");
			} else {
				return new Word(Tag.GT, ">");
			}
		break;

	}
    if(this.isDigit(this.peek)){
        var v = 0;
        do {
            v = 10*v+parseInt(this.peek,10);
            this.readch();
        }while(this.isDigit(this.peek));
		return new Num(v);
    }
    if(this.isLetter(this.peek)){
        var b = "";
        do {
            b = b + this.peek;
            this.readch();
        }
        while (this.isLetter(this.peek) || this.isDigit(this.peek));
        w = this.words[b];
        if(w) return w;
        w = new Word(Tag.ID, b);
        this.reserve(w);
        return w;
    }
	if(this.peek===undefined){
		var t = new Token(this.peek);
		this.peek = ' ';
		return t;
	}
	throw new Error("Lexical Error on line:"+this.line+" column:"+this.column);

};

FEScriptLexer.prototype.currentLine = function(){
	return this.line;
}

FEScriptLexer.prototype.isDigit = function(c){
	return (c!==undefined) && ("0".charCodeAt(0)<=c.charCodeAt(0)) && (c.charCodeAt(0) <= "9".charCodeAt(0));
}

FEScriptLexer.prototype.isLetter = function(c){
	return (c!==undefined) && ("A".charCodeAt(0)<=c.charCodeAt(0)) && (c.charCodeAt(0) <= "z".charCodeAt(0));
}

if(typeof exports!=='undefined'){
   exports.FEScriptLexer = FEScriptLexer;
}
