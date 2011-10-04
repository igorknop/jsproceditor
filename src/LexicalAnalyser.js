function LexicalAnalyser () {
   this.machine = null;
};

LexicalAnalyser.prototype.getMachine = function (){
   return this.machine;
};
LexicalAnalyser.prototype.setMachine = function (machine){
   if(!machine instanceof FiniteStateMachine){
      throw new TypeError("Machine should be an FiniteStateMachine object!");
   }
   this.machine = machine;
};

LexicalAnalyser.prototype.isLexicalCorrect = function (text){
   try{
      this.machine.isMatchString(text);
   } catch(e){
      console.log("catch");
      console.log(this.machine.getCurrentState());
      console.log(this.machine.getCurrentSymbolCounter());
      console.log(text);
      console.log('"'+text.substr(this.machine.getCurrentSymbolCounter()-1, text.length)+'"');
      return this.isLexicalCorrect(text.substr(this.machine.getCurrentSymbolCounter()-1, text.length));
   }
      console.log(this.machine.getCurrentState());
      console.log(this.machine.getCurrentSymbolCounter());
   return true;
}

