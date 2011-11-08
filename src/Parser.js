function Parser(){
	this.lookahead = "";
	this.text = "";
	this.currentPosition = 0;
}

Parser.prototype.expr = function(){
	this.term();
	while(true){
		if(this.lookahead=="+"){
			this.match("+");
			this.term();
			//console.log("+");
		} else if(this.lookahead=="-") {
			this.match("-");
			this.term();
			//console.log("+");
		} else {
			return;
		}
		
	}
};

Parser.prototype.term() = function(){
	if(this.isDigit(this.lookahead)){
		//console.log(this.lookahead);
		match(this.lookahead);
	}
};

Parser.prototype.match(t) = fucntion(){
	if(this.lookahead === t){
		this.lookahead = this.text[++this.currentPosition];
	} else {
		throw new Error("Syntax error");
	}
}

Parser.prototype.isDigit(c) = function() {
	return "0".charCodeAt(0)<=c && c <= "9".charCodeAt(0);
}

Parser.prototype.isLetter(c) = function() {
	return "A".charCodeAt(0)<=c && c <= "z".charCodeAt(0);
}