function Token(tag){
    this.tag = tag;
}

function Num(v) {
    this.tag = Tag.NUM;
    this.value = v;
}

function Word(tag, lexeme){
    this.lexeme = lexeme;    
    this.tag = tag;
}

