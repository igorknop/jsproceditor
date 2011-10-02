describe ("Automato de Estados Finitos", function(){
   it("Deve ter um estado na sua lista após adicionar um novo estado",function(){
      var fsa = new FiniteStateAutomata();
      fsa.addState("1");
      expect(fsa.getState("1")).toBeDefined();
      expect(fsa.states["1"]).toBeDefined();
   });

   it("Deve possuir um campo para guardar o estado inicial", function(){
      var fsa = new FiniteStateAutomata();
      fsa.addState("1");
      fsa.setInitialState("1");
      expect(fsa.initialState).toEqual("1");
   });

   it("Deve disparar uma exceção se o estado inicial for inexistente", function(){
      var fsa = new FiniteStateAutomata();
      expect(function(){ fsa.setInitialState("1") }).toThrow();
   });

   it("Deve disparar uma exceção se o estado já foi definido anteriormente", function(){
      var fsa = new FiniteStateAutomata();
      fsa.addState(1);
      expect(function(){ fsa.addState(1) }).toThrow();
   });

});
