function Lexer(){
    this.line = 1;
    this.peek = " ";
    this.words = {};
    this.currentPosition = 0;
    this.text = "";
    
    this.reserve(new Word(Tag.TRUE, "true"));
    this.reserve(new Word(Tag.FALSE, "false"));
}

Lexer.prototype.reserve = function(word){
    this.words[word.lexeme] = word.tag;
};

Lexer.prototype.scan = function() {
    for (;; this.peek = this.text[i++]) {
        if (this.peek === " " || this.peek === "\t") {
            continue;
        }
        else if (this.peek === "\n") {
            this.line += 1;
        }
        else break;
    }
    if("0".charCodeAt(0)<=this.peek && this.peek <= "9".charCodeAt(0)){
        var v = 0;
        do {
            v = 10*v+parseInt(this.peek,10);
            this.peek = this.text[++this.currentPosition];
        }while("0".charCodeAt(0)<=this.peek && this.peek <= "9".charCodeAt(0));
    }
    if("A".charCodeAt(0)<=this.peek && this.peek <= "z".charCodeAt(0)){
        var b = "";
        do {
            b = b+(this.peek);
            this.peek = this.text[++this.currentPosition];
        }
        while (("A".charCodeAt(0) <= this.peek && this.peek <= "z".charCodeAt(0)) ||
        ("0".charCodeAt(0) <= this.peek && this.peek <= "9".charCodeAt(0)));
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

