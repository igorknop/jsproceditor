describe("Lexical Analyser", function(){
   var fsmIDandDel;
   var fsmPar;

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

         fsmPar = new FiniteStateMachine();
         fsmPar.addState(1);
         fsmPar.addState("delimiter");
         fsmPar.addFinalState("delimiter");
         fsmPar.addState("id");
         fsmPar.addFinalState("id");
         fsmPar.addState("sequence");
         fsmPar.addFinalState("sequence");
         fsmPar.addState("lParentesis");
         fsmPar.addFinalState("lParentesis");
         fsmPar.addState("rParentesis");
         fsmPar.addFinalState("rParentesis");
         fsmPar.addState("pipe");
         fsmPar.addState("parallel");
         fsmPar.addFinalState("parallel");
         fsmPar.addTransition(1,"delimiter",[" ","\t","\n"]);
         fsmPar.addTransition("delimiter","delimiter",[" ","\t","\n"]);
         fsmPar.addTransition(1,"id",["a","b","c"]);
         fsmPar.addTransition("id","id",["a","b","c"]);
         fsmPar.addTransition(1,"sequence",[";"]);
         fsmPar.addTransition("pipe","parallel",["|"]);
         fsmPar.addTransition(1, "pipe",["|"]);
         fsmPar.addTransition(1, "lParentesis",["("]);
         fsmPar.addTransition(1, "rParentesis",[")"]);

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

      it("Should return 'del' when execute for second time on 'aa   aa'", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmIDandDel);
         la.setText("aa   aa");
         la.run();
         expect(la.getLastState()).toEqual("id");
         la.run();
         expect(la.getLastState()).toEqual("del");
      });

      it("Should return 'id' when execute for third time on 'aa   aa'", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmIDandDel);
         la.setText("aa   aa");
         la.run();
         expect(la.getLastState()).toEqual("id");
         la.run();
         expect(la.getLastState()).toEqual("del");
         la.run();
         expect(la.getLastState()).toEqual("id");
      });

      it("Should return false when execute for second time on 'abx'", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmIDandDel);
         la.setText("abx");
         la.run();
         expect(la.isLastStateValid()).toBeTruthy();
         la.run();
         expect(la.isLastStateValid()).toBeFalsy();
      });

      it("Should return false when execute for third time on 'ab x ba'", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmIDandDel);
         la.setText("ba x ab");
         la.run();
         expect(la.isLastStateValid()).toBeTruthy();
         la.run();
         expect(la.isLastStateValid()).toBeTruthy();
         la.run();
         expect(la.isLastStateValid()).toBeFalsy();
      });

      it("Should return false when execute for sixth time on 'aaa bbab  bax'", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmIDandDel);
         la.setText("aaa bbab  bax");
         la.run();
         expect(la.isLastStateValid()).toBeTruthy();
         la.run();
         expect(la.isLastStateValid()).toBeTruthy();
         la.run();
         expect(la.isLastStateValid()).toBeTruthy();
         la.run();
         expect(la.isLastStateValid()).toBeTruthy();
         la.run();
         expect(la.isLastStateValid()).toBeTruthy();
         la.run();
         expect(la.isLastStateValid()).toBeFalsy();
      });

      it("Should return true when setence are lexicaly valid", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmIDandDel);
         expect(la.isLexicalyValid("aaa bbab")).toBeTruthy();
         expect(la.isLexicalyValid("aaba")).toBeTruthy();
         expect(la.isLexicalyValid("  ")).toBeTruthy();
         expect(la.isLexicalyValid(" bbab  ")).toBeTruthy();
         expect(la.isLexicalyValid("aax ")).toBeFalsy();
         expect(la.isLexicalyValid(" axaa")).toBeFalsy();
         expect(la.isLexicalyValid("aaa bxbab")).toBeFalsy();
         expect(la.isLexicalyValid("aaa bbab  ba x")).toBeFalsy();
         
      });

      it("Should return true when setence are lexicaly valid", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmPar);
         expect(la.isLexicalyValid("a")).toBeTruthy();
         expect(la.isLexicalyValid("a b")).toBeTruthy();
         expect(la.isLexicalyValid("a;b")).toBeTruthy();
         expect(la.isLexicalyValid("a;b;c")).toBeTruthy();
         expect(la.isLexicalyValid("a||b")).toBeTruthy();
         expect(la.isLexicalyValid("a||b;c")).toBeTruthy();
         expect(la.isLexicalyValid("(a||b);c")).toBeTruthy();
         expect(la.isLexicalyValid("a || ( b;c )")).toBeTruthy();
         expect(la.isLexicalyValid("/")).toBeFalsy();
         expect(la.isLexicalyValid("a,a")).toBeFalsy();
         expect(la.isLexicalyValid("a|b")).toBeFalsy();
         expect(la.isLexicalyValid("a ; b | c")).toBeFalsy();
         
      });
      it("Should return symbol position when setence are lexicaly invalid", function(){
         var la = new LexicalAnalyser();
         la.setMachine(fsmPar);
         expect(la.isLexicalyValid("a")).toBeTruthy();
         expect(la.isLexicalyValid("a b")).toBeTruthy();
         expect(la.isLexicalyValid("a;b")).toBeTruthy();
         expect(la.isLexicalyValid("a;b;c")).toBeTruthy();
         expect(la.isLexicalyValid("a||b")).toBeTruthy();
         expect(la.isLexicalyValid("a||b;c")).toBeTruthy();
         expect(la.isLexicalyValid("/")).toBeFalsy();
         expect(la.getColumn()).toEqual(0);
         expect(la.getRow()).toEqual(0);
         expect(la.isLexicalyValid("a,a")).toBeFalsy();
         expect(la.getColumn()).toEqual(1);
         expect(la.getRow()).toEqual(0);
         expect(la.isLexicalyValid("a|b")).toBeFalsy();
         expect(la.getColumn()).toEqual(2);
         expect(la.getRow()).toEqual(0);
         expect(la.isLexicalyValid("a ;\nb | c")).toBeFalsy();
         
      });
      //it("",function(){});
});

