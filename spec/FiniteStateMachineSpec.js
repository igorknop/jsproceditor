describe ("Finite State Machine", function(){
   var fsa;
   beforeEach(function(){
      fsa = new FiniteStateMachine();
   });
   it("Should have a state on his state list after add a new state",function(){
      fsa.addState("1");
      expect(fsa.getState("1")).toBeDefined();
      expect(fsa.states["1"]).toBeDefined();
   });

   it("Should have a field to hold initial state", function(){
      fsa.addState("1");
      fsa.setInitialState("1");
      expect(fsa.initialState).toEqual("1");
   });

   it("Should throw an exception when set a the initial state to inexistant one", function(){
      expect(function(){ fsa.setInitialState("1") }).toThrow();
   });

   it("Should throw an exception  when a adding a already existant state", function(){
      fsa.addState(1);
      expect(function(){ fsa.addState(1) }).toThrow();
   });

   it("Should set the initial state to first added state when adding a state", function(){
      fsa.addState(1);
      expect(fsa.getInitialState()).toEqual(1);
      fsa.addState(2);
      expect(fsa.getInitialState()).toEqual(1);
   });

   it("Should have initial state null when created", function(){
      expect(fsa.getInitialState()).toBeNull();   
   });

   it("Should have final states empty when created", function(){
      expect(fsa.getFinalStates().length).toEqual(0);   
   });

   it("Should add a final state when adding a final state", function(){
      fsa.addState(1);
      fsa.addState(2);
      fsa.addFinalState(1);
      expect(fsa.getFinalStates()[1]).toEqual(1);
      fsa.addFinalState(2);
      expect(fsa.getFinalStates()[2]).toEqual(2);
   });

   it("Should throw an exception when adding a final state to inexistant one", function(){
      expect(function(){ fsa.addFinalState("1") }).toThrow();
   });
   
   it("Should have a empty transition list when created", function(){
      expect(fsa.transitions.length).toEqual(0);
   });

   it("Should throw an exception when setting a transition to an inexistant state", function(){
      fsa.addState(1);
      fsa.addState(2);
      expect(function(){fsa.addTransition(1,3,"t")}).toThrow();
   });

   it("Should return an array when looking for existing transitions", function(){
      fsa.addState(1);
      fsa.addState(2);
      fsa.addTransition(1, 2, "a");
      fsa.addTransition(1, 2, "b");
   });

   it("Should return true when test for a transition when the transition was added before", function(){
      fsa.addState(1);
      fsa.addState(2);
      fsa.addTransition(1, 2, "a");
      expect(fsa.testTransition(1,2,"a")).toBeTruthy();
   });

   it("Should return false when test for a transition when the transition wasnt added before", function(){
      fsa.addState(1);
      fsa.addState(2);
      fsa.addTransition(1, 2, "a");
      expect(fsa.testTransition(1,2,"b")).toBeFalsy();
   });

   
   it("Should return next state when asking for a transition", function(){
      fsa.addState(1);
      fsa.addState(2);
      fsa.addTransition(1, 2, "a");
      expect(fsa.moveToNextState("a")).toEqual(2);      
   });

   it("Should have current state null when created", function(){
      expect(fsa.getCurrentState()).toBeNull(); 
   });

   it("Should return current state when setting current state", function(){
      fsa.addState(1);
      fsa.addState(2);
      fsa.addState(3);
      fsa.setCurrentState(1);
      expect(fsa.getCurrentState()).toEqual(1);      
      fsa.setCurrentState(3);
      expect(fsa.getCurrentState()).not.toEqual(2);      
      fsa.setCurrentState(2);
      expect(fsa.getCurrentState()).toEqual(2);      
   });

   it("Should throw an exception when setting current state to an inexistant state", function(){
      expect(function(){fsa.setCurrentState(1)}).toThrow();
   });

   it("Should return initial state when alphabet are empty", function(){
      fsa.addState(1);
      fsa.addState(2);
      fsa.setInitialState(1);
      fsa.addFinalState(2);
      fsa.addTransition(1,2,"a");
      expect(fsa.transition(fsa.getInitialState(), [])).toEqual(1);
      expect(fsa.transition(fsa.getInitialState(), ["a"])).toEqual(2);
   });

   describe("Examples", function(){

      it("Should return true when final state is final", function(){
         fsa.addState(1);
         fsa.addState(2);
         fsa.setInitialState(1);
         fsa.addFinalState(2);
         fsa.addTransition(1,2,"a");
         expect(fsa.isMatchArray([])).toBeFalsy();
         expect(fsa.isMatchArray(["a"])).toBeTruthy();      
      });

      it("Should return true when final state is final", function(){
         fsa.addState(1);
         fsa.addState(2);
         fsa.addState(3);
         fsa.addState(4);
         fsa.setInitialState(1);
         fsa.addFinalState(4);
         fsa.addTransition(1,2,"b");
         fsa.addTransition(1,3,"a");
         fsa.addTransition(3,2,"b");
         fsa.addTransition(2,3,"a");
         fsa.addTransition(2,4,"b");
         fsa.addTransition(3,4,"a");
         fsa.addTransition(3,4,"a");
         fsa.addTransition(4,4,"a");

         expect(fsa.isMatchArray([])).toBeFalsy();
         expect(fsa.isMatchArray(["a","b","a","b"])).toBeFalsy();
         expect(fsa.isMatchArray(["a"])).toBeFalsy();
         expect(fsa.isMatchArray(["b"])).toBeFalsy();
         expect(fsa.isMatchArray(["a","b"])).toBeFalsy();
         expect(fsa.isMatchArray(["a","a"])).toBeTruthy();      
         expect(fsa.isMatchArray(["a","b","a","a"])).toBeTruthy();      
         expect(fsa.isMatchArray(["a","b","b","a"])).toBeTruthy();      
         expect(fsa.isMatchArray(["a","b","a","b","a","a"])).toBeTruthy();      
      });

      it("Should return true when final state is final", function(){
         fsa.addState(1);
         fsa.addState(2);
         fsa.addState(3);
         fsa.addState(4);
         fsa.setInitialState(1);
         fsa.addFinalState(4);
         fsa.addTransition(1,2,"b");
         fsa.addTransition(1,3,"a");
         fsa.addTransition(3,2,"b");
         fsa.addTransition(2,3,"a");
         fsa.addTransition(2,4,"b");
         fsa.addTransition(3,4,"a");
         fsa.addTransition(3,4,"a");
         fsa.addTransition(4,4,"a");

         expect(fsa.isMatchString("")).toBeFalsy();
         expect(fsa.isMatchString("abab")).toBeFalsy();
         expect(fsa.isMatchString("a")).toBeFalsy();
         expect(fsa.isMatchString("b")).toBeFalsy();
         expect(fsa.isMatchString("ab")).toBeFalsy();
         expect(fsa.isMatchString("aa")).toBeTruthy();      
         expect(fsa.isMatchString("abaa")).toBeTruthy();      
         expect(fsa.isMatchString("abba")).toBeTruthy();      
         expect(fsa.isMatchString("ababaa")).toBeTruthy();      
      });
   });
   
});
