function LexicalAnalyser () {
   this.machine = null;
   this.text = '';
   this.firstSymbolPosition = 0;
   this.lastSymbolPosition = 0;
   this.column = 0;
   this.row = 0;
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
   if(this.lastSymbolPosition >= this.text.length){
      throw new RangeError("Cannot consume more symbols: end of text reached!");
   }
   var c = this.text[this.lastSymbolPosition++];
   if(c==="\n"){
      this.column = 0
      this.row++;
   } else {
      this.column++;
   }
   return c;
};

LexicalAnalyser.prototype.getColumn = function (){
   return this.column;
};

LexicalAnalyser.prototype.getRow = function (){
   return this.row;
};

LexicalAnalyser.prototype.run = function (){
   var c;
   this.machine.setCurrentState(this.machine.getInitialState());
   while(true){
         c = this.consumeSymbol();
      try {
         this.machine.moveToNextState(c);
      } catch(e) {
         this.setFirstSymbolPosition(this.getLastSymbolPosition()-1);
         return;
      }
   }
};

LexicalAnalyser.prototype.getLastState = function (){
   return this.machine.getCurrentState();
};
