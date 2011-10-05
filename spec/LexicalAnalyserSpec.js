describe("Lexical Analyser", function(){
   var fsmIDandDel;
   beforeEach(function(){
         fsmIDandDel = new FiniteStateMachine();
         fsmIDandDel.addState(1);
         fsmIDandDel.addState("del");
         fsmIDandDel.addFinalState("del");
         fsmIDandDel.addState("id");
         fsmIDandDel.addFinalState("id");
         fsmIDandDel.addTransition(1,"del",[" ","\t","\n"]);
         fsmIDandDel.addTransition("del","del",[" ","\t","\n"]);
         fsmIDandDel.addTransition(1,"id",["a","b","c"]);
         fsmIDandDel.addTransition("id","id",["a","b","c"]);

   });
      /*
      it("Should throw when there is a 0 in first state", function(){
         var fsm = new FiniteStateMachine();
         fsm.addState(1);
         fsm.addState("del");
         fsm.addFinalState("del");
         fsm.addState("id");
         fsm.addFinalState("id");
         fsm.addState(3);
         fsm.addFinalState(1);
         fsm.addTransition(1,"del",[" ","\t","\n"]);
         fsm.addTransition("del","del",[" ","\t","\n"]);
         fsm.addTransition(1,"id",["a","b","c"]);
         fsm.addTransition("id","id",["a","b","c"]);

         expect(function(){fsm.isMatchString(" ")}).not.toThrow();
         expect(function(){fsm.isMatchString(" \t")}).not.toThrow();
         expect(function(){fsm.isMatchString("\n \t")}).not.toThrow();
         expect(function(){fsm.isMatchString("a")}).not.toThrow();
         expect(function(){fsm.isMatchString("abc")}).not.toThrow();
         expect(function(){fsm.isMatchString("cba")}).not.toThrow();
         expect(function(){fsm.isMatchString(" cba")}).toThrow();
         expect(function(){fsm.isMatchString("cb a")}).toThrow();

         var la = new LexicalAnalyser();
         la.setMachine(fsm);
         expect(la.isLexicalCorrect("abc\taba")).toBeTruthy();
         //expect(la.machine.getCurrentSymbolCounter()).toEqual(4);
         expect(la.isLexicalCorrect("  abc  a")).toBeTruthy();
         //expect(la.machine.getCurrentSymbolCounter()).toEqual(3);
         expect(la.isLexicalCorrect("abc")).toBeTruthy();
         expect(la.isLexicalCorrect(" aa")).toBeTruthy();
         expect(la.isLexicalCorrect(" aa")).toBeTruthy();
         expect(la.isLexicalCorrect(" xa")).toBeFalsy();

      });*/

      it("It should throw if machine isnt a FiniteStateMachine",function(){
         var la = new LexicalAnalyser();
         expect(function(){la.setMachine("string")}).toThrow();
      });

      it("It should have an empty text when created", function(){
         var la = new LexicalAnalyser();
         expect(la.getText()).toBe("")
      });

      it("It should have a non empty text when setting the text", function(){
         var la = new LexicalAnalyser();
         la.setText("(a|b);c")
         expect(la.getText()).toBe("(a|b);c");
      });

      it("It should return 0 as First Symbol Position when created", function(){
         var la = new LexicalAnalyser();
         expect(la.getFirstSymbolPosition()).toBe(0);
      });

      it("It should return 0 as Last Symbol Position when created", function(){
         var la = new LexicalAnalyser();
         expect(la.getLastSymbolPosition()).toBe(0);
      });

      it("It should have Last an First Symbol Position equals when setting first symbol position", function(){
         var la = new LexicalAnalyser();
         la.setText("(a|b);c");
         la.setFirstSymbolPosition(3);
         expect(la.getFirstSymbolPosition()).toBe(3);
         expect(la.getLastSymbolPosition()).toBe(3);
      });

      it("it should throw when setting a first symbol position do a negative or greater than text size", function(){
         var la = new LexicalAnalyser();
         la.setText("(a|b);c");
         expect(function(){la.setFirstSymbolPosition(-3)}).toThrow();
         expect(function(){la.setFirstSymbolPosition(13)}).toThrow();
      });

      it("It should return incremented Last Symbol Position when consuming symbol", function(){
         var la = new LexicalAnalyser();
         expect(la.getLastSymbolPosition()).toEqual(0);
         la.setText("(a|b);c");
         la.consumeSymbol();
         expect(la.getLastSymbolPosition()).toEqual(1);
         la.consumeSymbol();
         la.consumeSymbol();
         la.consumeSymbol();
         expect(la.getLastSymbolPosition()).toEqual(4);
      });

      it("It should return a corresponding Symbol in text pointed by las symbol counter when consuming symbol", function(){
         var la = new LexicalAnalyser();
         la.setText("(a|b);c");
         expect(la.consumeSymbol()).toEqual("(");
         expect(la.consumeSymbol()).toEqual("a");
         expect(la.consumeSymbol()).toEqual("|");
      });

      it("Should increment column when consuming a symbol",function(){

         var la = new LexicalAnalyser();
         la.setText("(a|b);c");
         expect(la.getColumn()).toEqual(0);
         la.consumeSymbol();
         expect(la.getColumn()).toEqual(1);
         la.consumeSymbol();
         la.consumeSymbol();
         expect(la.getColumn()).toEqual(3);
      });
      it("Should increment row, set column to 0 when consuming a \\n symbol", function(){

         var la = new LexicalAnalyser();
         la.setText("(\na\n|b);c");
         expect(la.getColumn()).toEqual(0);
         expect(la.getRow()).toEqual(0);
         la.consumeSymbol();
         expect(la.getColumn()).toEqual(1);
         expect(la.getRow()).toEqual(0);
         la.consumeSymbol();
         la.consumeSymbol();
         expect(la.getColumn()).toEqual(1);
         expect(la.getRow()).toEqual(1);
         la.consumeSymbol();
         expect(la.getColumn()).toEqual(0);
         expect(la.getRow()).toEqual(2);
      });

      it("Should return 'id' when execute for first time on 'a   a'", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmIDandDel);
         la.setText("a   a");
         la.run();
         expect(la.getLastState()).toEqual("id");
      });

      it("Should return have last symbol position 1 when execute for first time on 'a   a'", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmIDandDel);
         la.setText("a   a");
         la.run();
         expect(la.getLastSymbolPosition()).toEqual(1);
      });

      it("Should return 'del' when execute for first time on '   a'", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmIDandDel);
         la.setText("   a");
         la.run();
         expect(la.getLastState()).toEqual("del");
      });

      it("Should return 'del' when execute for second time on 'a   a'", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmIDandDel);
         la.setText("aa   aa");
         la.run();
         expect(la.getLastState()).toEqual("id");
         la.run();
         expect(la.getLastState()).toEqual("del");
      });
      //it("",function(){});
});

