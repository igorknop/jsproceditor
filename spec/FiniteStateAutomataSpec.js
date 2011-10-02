describe ("Finite State Automata", function(){
   it("Should have a state on his state list after add a new state",function(){
      var fsa = new FiniteStateAutomata();
      fsa.addState("1");
      expect(fsa.getState("1")).toBeDefined();
      expect(fsa.states["1"]).toBeDefined();
   });

   it("Should have a field to hold initial state", function(){
      var fsa = new FiniteStateAutomata();
      fsa.addState("1");
      fsa.setInitialState("1");
      expect(fsa.initialState).toEqual("1");
   });

   it("Should throw an exception when set a the initial state to inexistant one", function(){
      var fsa = new FiniteStateAutomata();
      expect(function(){ fsa.setInitialState("1") }).toThrow();
   });

   it("Should throw an exception  when a adding a already existant state", function(){
      var fsa = new FiniteStateAutomata();
      fsa.addState(1);
      expect(function(){ fsa.addState(1) }).toThrow();
   });

});
