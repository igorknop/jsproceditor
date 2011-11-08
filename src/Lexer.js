function Lexer(){
    this.line = 1;
    this.peek = " ";
    this.words = {};
    this.currentPosition = 0;
    this.text = "";
    
    this.reserve(new Word(Tag.TRUE, "true"));
    this.reserve(new Word(Tag.FALSE, "false"));
}

Lexer.prototype.setText = function(text){
    this.line = 1;
    this.peek = " ";
    this.words = {};
    this.currentPosition = 0;
    this.text = text;
    
    this.reserve(new Word(Tag.TRUE, "true"));
    this.reserve(new Word(Tag.FALSE, "false"));
}

Lexer.prototype.reserve = function(word){
    this.words[word.lexeme] = word.tag;
};

Lexer.prototype.scan = function() {
    for (;; this.peek = this.text[this.currentPosition++]) {
        if (this.peek === " " || this.peek === "\t") {
            continue;
        }
        else if (this.peek === "\n") {
            this.line += 1;
        }
        else break;
    }
    if(this.isDigit(this.peek)){
        var v = 0;
        do {
            v = 10*v+parseInt(this.peek,10);
            this.peek = this.text[this.currentPosition++];
        }while(this.isDigit(this.peek));
		return new Num(v);
    }
    if(this.isLetter(this.peek)){
        var b = "";
        do {
            b = b + this.peek;
            this.peek = this.text[this.currentPosition++];
        }
        while (this.isLetter(this.peek) || this.isDigit(this.peek));
        w = this.words[b];
        if(w) return w;
        w = new Word(Tag.ID, b);
        this.reserve(w);
        return w;
    }
    t = new Token(this.peek);
    this.peek = ' ';
    return t;
};

Lexer.prototype.currentLine = function(){
	return this.line;
}

Lexer.prototype.isDigit = function(c){
	return (c!==undefined) && ("0".charCodeAt(0)<=c.charCodeAt(0)) && (c.charCodeAt(0) <= "9".charCodeAt(0));
}

Lexer.prototype.isLetter = function(c){
	return (c!==undefined) && ("A".charCodeAt(0)<=c.charCodeAt(0)) && (c.charCodeAt(0) <= "z".charCodeAt(0));
}