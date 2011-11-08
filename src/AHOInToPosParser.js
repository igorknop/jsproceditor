function AHOInToPosParser(){
	this.lookahead = "";
	this.text = "";
	this.currentPosition = 0;
	this.resultText = ""
}

AHOInToPosParser.prototype.setText = function (text){
	this.text = text;
	this.currentPosition = 0;
	this.lookahead = this.text[this.currentPosition++];
	this.resultText = ""
}

AHOInToPosParser.prototype.expr = function(){
	this.term();
	while(true){
		if(this.lookahead=="+"){
			this.match("+");
			this.term();
			this.resultText += "+";
		} else if(this.lookahead=="-") {
			this.match("-");
			this.term();
			this.resultText += "-";
		} else {
			return;
		}
		
	}
};

AHOInToPosParser.prototype.term = function(){
	if(this.isDigit(this.lookahead)){
		this.resultText += this.lookahead;
		this.match(this.lookahead);
	} else {
		throw new Error("Syntax error. Expected a digit at char: "+this.currentPosition+". Got: '"+this.lookahead+"'");
	}
};

AHOInToPosParser.prototype.match = function(t){
	if(this.lookahead == t){
		this.lookahead = this.text[this.currentPosition++];
	} else {
		throw new Error("Syntax Error. Not expect '"+this.lookahead+"' at char: "+this.currentPosition);
	}
}

AHOInToPosParser.prototype.isDigit = function(c) {
	return ("0".charCodeAt(0)<=c.charCodeAt(0)) && (c.charCodeAt(0) <= "9".charCodeAt(0));
}

AHOInToPosParser.prototype.isLetter = function(c) {
	return ("A".charCodeAt(0)<=c.charCodeAt(0)) && (c.charCodeAt(0) <= "z".charCodeAt(0));
}