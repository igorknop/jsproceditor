function LexicalAnalyser () {
   this.machine = null;
   this.text = '';
   this.firstSymbolPosition = 0;
   this.lastSymbolPosition = 0;
};

LexicalAnalyser.prototype.getMachine = function (){
   return this.machine;
};
LexicalAnalyser.prototype.setMachine = function (machine){
   if(!machine.addState||!machine.isMatchString){
      throw new TypeError("Machine should be an FiniteStateMachine object!");
   }
   this.machine = machine;
};

LexicalAnalyser.prototype.isLexicalCorrect = function (text){
   this.machine.setCurrentState(this.machine.getInitialState());
   var i = 0;
   var c = text[i];
   while(i<text.length){
      this.machine.moveToNextState(c);
      c = text[++i];
   }
   return this.machine.isAFinalState(this.machine.setCurrentState());
};

LexicalAnalyser.prototype.getText = function (){
   return this.text;
};

LexicalAnalyser.prototype.setText = function (newText){
   return this.text = newText;
};

LexicalAnalyser.prototype.setFirstSymbolPosition = function (newFirstPos){
   if(newFirstPos<0 || this.text.length<newFirstPos){
      throw new RangeError("First symbol should be beetween 0 and "+this.text.length-1+"!");
   }
   this.firstSymbolPosition = newFirstPos;
   this.lastSymbolPosition = this.firstSymbolPosition;
};

LexicalAnalyser.prototype.getFirstSymbolPosition = function (){
   return this.firstSymbolPosition;
};

LexicalAnalyser.prototype.getLastSymbolPosition = function (){
   return this.lastSymbolPosition;
};

LexicalAnalyser.prototype.consumeSymbol = function (){
   return this.text[this.lastSymbolPosition++];
};
