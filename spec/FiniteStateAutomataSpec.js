describe ("Automato de Estados Finitos", function(){
   
   it("Deve possuir um campo para guardar o estado inicial", function(){
      var fsa = new FiniteStateAutomata();
      fsa.setInitialState("1");
      expect(fsa.initialState).toEqual("1");
   });

});
