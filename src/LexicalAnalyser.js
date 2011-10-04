function LexicalAnalyser () {
   FiniteStateAutomata.call(this);
   this.automata = null;
};

LexicalAnalyser.prototype = new FiniteStateAutomata();
LexicalAnalyser.prototype.construtor = LexicalAnalyser();

LexicalAnalyser.prototype.parse = function(){

};

LexicalAnalyser.prototype.setAutomata = function (automata){
   this.automata = automata;
};

LexicalAnalyser.prototype.lexico = function (text){
   this.automata.transitionStr(text);
};

