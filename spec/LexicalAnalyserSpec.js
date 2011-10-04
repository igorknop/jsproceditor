describe("Lexical Analyser", function(){
   it("Should return a number when it reach a final state of fsa",function(){
         var fsa = new FiniteStateAutomata();
         fsa.addState(1);
         fsa.addState(2);
         fsa.addState(3);
         fsa.addState(4);
         fsa.addState(5);
         fsa.addState("id");
         fsa.addState("del");
         fsa.setInitialState(1);
         fsa.addFinalState("id");
         fsa.addFinalState("del");
         fsa.addTransition(1,2,"b");
         fsa.addTransition(1,3,"a");
         fsa.addTransition(3,2,"b");
         fsa.addTransition(2,3,"a");
         fsa.addTransition(2,4,"b");
         fsa.addTransition(3,4,"a");
         fsa.addTransition(3,4,"a");
         fsa.addTransition(4,4,"a");
         fsa.addTransition(4,4,"b");
         fsa.addTransition(1,5," ");
         fsa.addTransition(5,5," ");
        
         fsa.addTransition(4,"id"," ");
         fsa.addTransition(5,"del","a");
         fsa.addTransition(5,"del","b");
         
      var la = new LexicalAnalyser();
      la.setAutomata(fsa);
      expect(la.lexico("abaa ")).toEqual("id");
      expect(la.lexico("  abaa")).toEqual("del");

   });
   it("Should return a number when a string with beginning spaces are parsed", function(){
      var la = new LexicalAnalyser();
      la.addState(1);
      la.addState(2);
      la.addTransition(1,1," ");
      la.addTransition(1,2,"1");
      la.addTransition(1,2,"2");
      la.addTransition(2,2,"1");
      la.addTransition(2,2,"2");
      la.addFinalState(2);
      expect(la.parse("  121")).toEqual("121");
   });

});
