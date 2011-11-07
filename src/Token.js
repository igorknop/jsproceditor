function Token(tag){
    this.tag = tag;
}

function Num(v) {
    this.value = v;
    this.tag = Tag.NUM;
}

function Word(tag, lexeme){
    this.lexeme = lexeme;    
    this.tag = tag;
}

