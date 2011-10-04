describe("Lexical Analyser", function(){
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

      });

});
