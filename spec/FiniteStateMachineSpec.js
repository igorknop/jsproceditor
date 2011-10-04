describe ("Finite State Machine", function(){
   var fsm;
   beforeEach(function(){
      fsm = new FiniteStateMachine();
   });
   it("Should have a state on his state list after add a new state",function(){
      fsm.addState("1");
      expect(fsm.getState("1")).toBeDefined();
      expect(fsm.states["1"]).toBeDefined();
   });

   it("Should have a field to hold initial state", function(){
      fsm.addState("1");
      fsm.setInitialState("1");
      expect(fsm.initialState).toEqual("1");
   });

   it("Should throw an exception when set a the initial state to inexistant one", function(){
      expect(function(){ fsm.setInitialState("1") }).toThrow();
   });

   it("Should throw an exception  when a adding a already existant state", function(){
      fsm.addState(1);
      expect(function(){ fsm.addState(1) }).toThrow();
   });

   it("Should set the initial state to first added state when adding a state", function(){
      fsm.addState(1);
      expect(fsm.getInitialState()).toEqual(1);
      fsm.addState(2);
      expect(fsm.getInitialState()).toEqual(1);
   });

   it("Should have initial state null when created", function(){
      expect(fsm.getInitialState()).toBeNull();   
   });

   it("Should have final states empty when created", function(){
      expect(fsm.getFinalStates().length).toEqual(0);   
   });

   it("Should add a final state when adding a final state", function(){
      fsm.addState(1);
      fsm.addState(2);
      fsm.addFinalState(1);
      expect(fsm.getFinalStates()[1]).toEqual(1);
      fsm.addFinalState(2);
      expect(fsm.getFinalStates()[2]).toEqual(2);
   });

   it("Should throw an exception when adding a final state to inexistant one", function(){
      expect(function(){ fsm.addFinalState("1") }).toThrow();
   });
   
   it("Should have a empty transition list when created", function(){
      expect(fsm.transitions.length).toEqual(0);
   });

   it("Should throw an exception when setting a transition to an inexistant state", function(){
      fsm.addState(1);
      fsm.addState(2);
      expect(function(){fsm.addTransition(1,3,"t")}).toThrow();
   });

   it("Should return an array when looking for existing transitions", function(){
      fsm.addState(1);
      fsm.addState(2);
      fsm.addTransition(1, 2, "a");
      fsm.addTransition(1, 2, "b");
   });

   it("Should return true when test for a transition when the transition was added before", function(){
      fsm.addState(1);
      fsm.addState(2);
      fsm.addTransition(1, 2, "a");
      expect(fsm.testTransition(1,2,"a")).toBeTruthy();
   });

   it("Should return false when test for a transition when the transition wasnt added before", function(){
      fsm.addState(1);
      fsm.addState(2);
      fsm.addTransition(1, 2, "a");
      expect(fsm.testTransition(1,2,"b")).toBeFalsy();
   });

   
   it("Should return next state when asking for a transition", function(){
      fsm.addState(1);
      fsm.addState(2);
      fsm.addTransition(1, 2, "a");
      expect(fsm.moveToNextState("a")).toEqual(2);      
   });

   it("Should have current state null when created", function(){
      expect(fsm.getCurrentState()).toBeNull(); 
   });

   it("Should return current state when setting current state", function(){
      fsm.addState(1);
      fsm.addState(2);
      fsm.addState(3);
      fsm.setCurrentState(1);
      expect(fsm.getCurrentState()).toEqual(1);      
      fsm.setCurrentState(3);
      expect(fsm.getCurrentState()).not.toEqual(2);      
      fsm.setCurrentState(2);
      expect(fsm.getCurrentState()).toEqual(2);      
   });

   it("Should throw an exception when setting current state to an inexistant state", function(){
      expect(function(){fsm.setCurrentState(1)}).toThrow();
   });

   it("Should return initial state when alphabet are empty", function(){
      fsm.addState(1);
      fsm.addState(2);
      fsm.setInitialState(1);
      fsm.addFinalState(2);
      fsm.addTransition(1,2,"a");
      expect(fsm.transition(0, fsm.getInitialState(), [])).toEqual(1);
      expect(fsm.transition(0, fsm.getInitialState(), ["a"])).toEqual(2);
   });

   it("Should have current counter 2 when '001' tested", function(){
      fsm.addState(1);
      fsm.addState(2);
      fsm.addTransition(1,2,"0");
      fsm.addFinalState(2);
      try {
         fsm.isMatchString("001");
      } catch (e) {}
      expect(fsm.getCurrentSymbolCounter()).toEqual(2);
   });

   describe("Examples", function(){

      it("Should return true when final state is final", function(){
         fsm.addState(1);
         fsm.addState(2);
         fsm.setInitialState(1);
         fsm.addFinalState(2);
         fsm.addTransition(1,2,"a");
         expect(fsm.isMatchArray([])).toBeFalsy();
         expect(fsm.isMatchArray(["a"])).toBeTruthy();      
      });

      it("Should return true when array have a 'a','a' or 'b','b on it", function(){
         fsm.addState(1);
         fsm.addState(2);
         fsm.addState(3);
         fsm.addState(4);
         fsm.setInitialState(1);
         fsm.addFinalState(4);
         fsm.addTransition(1,2,"b");
         fsm.addTransition(1,3,"a");
         fsm.addTransition(3,2,"b");
         fsm.addTransition(2,3,"a");
         fsm.addTransition(2,4,"b");
         fsm.addTransition(3,4,"a");
         fsm.addTransition(3,4,"a");
         fsm.addTransition(4,4,"a");

         expect(fsm.isMatchArray([])).toBeFalsy();
         expect(fsm.isMatchArray(["a","b","a","b"])).toBeFalsy();
         expect(fsm.isMatchArray(["a"])).toBeFalsy();
         expect(fsm.isMatchArray(["b"])).toBeFalsy();
         expect(fsm.isMatchArray(["a","b"])).toBeFalsy();
         expect(fsm.isMatchArray(["a","a"])).toBeTruthy();      
         expect(fsm.isMatchArray(["a","b","a","a"])).toBeTruthy();      
         expect(fsm.isMatchArray(["a","b","b","a"])).toBeTruthy();      
         expect(fsm.isMatchArray(["a","b","a","b","a","a"])).toBeTruthy();      
      });

      it("Should return true when the string made by numbers have the last symbol multiple of 3", function(){
         fsm.addState(1);
         fsm.addState(2);
         fsm.addState(3);
         fsm.addFinalState(1);
         fsm.addTransition(1,1,"0");
         fsm.addTransition(1,1,"3");
         fsm.addTransition(1,1,"6");
         fsm.addTransition(1,1,"9");
         fsm.addTransition(1,2,"1");
         fsm.addTransition(1,2,"4");
         fsm.addTransition(1,2,"7");
         fsm.addTransition(1,3,"2");
         fsm.addTransition(1,3,"5");
         fsm.addTransition(1,3,"8");
         fsm.addTransition(2,1,"2");
         fsm.addTransition(2,1,"5");
         fsm.addTransition(2,1,"8");
         fsm.addTransition(2,2,"0");
         fsm.addTransition(2,2,"3");
         fsm.addTransition(2,2,"6");
         fsm.addTransition(2,2,"9");
         fsm.addTransition(2,3,"1");
         fsm.addTransition(2,3,"4");
         fsm.addTransition(2,3,"7");
         fsm.addTransition(3,1,"1");
         fsm.addTransition(3,1,"4");
         fsm.addTransition(3,1,"7");
         fsm.addTransition(3,2,"2");
         fsm.addTransition(3,2,"5");
         fsm.addTransition(3,2,"8");
         fsm.addTransition(3,3,"0");
         fsm.addTransition(3,3,"3");
         fsm.addTransition(3,3,"6");
         fsm.addTransition(3,3,"9");

         expect(fsm.isMatchString("1234")).toBeFalsy();
         expect(fsm.isMatchString("3122")).toBeFalsy();
         expect(fsm.isMatchString("7862")).toBeFalsy();
         expect(fsm.isMatchString("12857")).toBeFalsy();
         expect(fsm.isMatchString("312884")).toBeFalsy();
         expect(fsm.isMatchString("273789")).toBeTruthy();      
         expect(fsm.isMatchString("3")).toBeTruthy();      
         expect(fsm.isMatchString("2123616")).toBeTruthy();      
         expect(fsm.isMatchString("2139")).toBeTruthy();      
      });
      it("Should return true when final state is final", function(){
         fsm.addState(1);
         fsm.addState(2);
         fsm.addState(3);
         fsm.addState(4);
         fsm.setInitialState(1);
         fsm.addFinalState(4);
         fsm.addTransition(1,2,"b");
         fsm.addTransition(1,3,"a");
         fsm.addTransition(3,2,"b");
         fsm.addTransition(2,3,"a");
         fsm.addTransition(2,4,"b");
         fsm.addTransition(3,4,"a");
         fsm.addTransition(3,4,"a");
         fsm.addTransition(4,4,"a");

         expect(fsm.isMatchString("")).toBeFalsy();
         expect(fsm.isMatchString("abab")).toBeFalsy();
         expect(fsm.isMatchString("a")).toBeFalsy();
         expect(fsm.isMatchString("b")).toBeFalsy();
         expect(fsm.isMatchString("ab")).toBeFalsy();
         expect(fsm.isMatchString("aa")).toBeTruthy();      
         expect(fsm.isMatchString("abaa")).toBeTruthy();      
         expect(fsm.isMatchString("abba")).toBeTruthy();      
         expect(fsm.isMatchString("ababaa")).toBeTruthy();      
      });
      it("Should throw when there is a 0 in first state", function(){
         fsm.addState(1);
         fsm.addState(2);
         fsm.addState(3);
         fsm.addFinalState(1);
         fsm.addTransition(1,1,"3");
         fsm.addTransition(1,1,"6");
         fsm.addTransition(1,1,"9");
         fsm.addTransition(1,2,"1");
         fsm.addTransition(1,2,"4");
         fsm.addTransition(1,2,"7");
         fsm.addTransition(1,3,"2");
         fsm.addTransition(1,3,"5");
         fsm.addTransition(1,3,"8");
         fsm.addTransition(2,1,"2");
         fsm.addTransition(2,1,"5");
         fsm.addTransition(2,1,"8");
         fsm.addTransition(2,2,"0");
         fsm.addTransition(2,2,"3");
         fsm.addTransition(2,2,"6");
         fsm.addTransition(2,2,"9");
         fsm.addTransition(2,3,"1");
         fsm.addTransition(2,3,"4");
         fsm.addTransition(2,3,"7");
         fsm.addTransition(3,1,"1");
         fsm.addTransition(3,1,"4");
         fsm.addTransition(3,1,"7");
         fsm.addTransition(3,2,"2");
         fsm.addTransition(3,2,"5");
         fsm.addTransition(3,2,"8");
         fsm.addTransition(3,3,"0");
         fsm.addTransition(3,3,"3");
         fsm.addTransition(3,3,"6");
         fsm.addTransition(3,3,"9");

         expect(fsm.isMatchString("1234")).toBeFalsy();
         expect(function(){fsm.isMatchString("312021")}).toThrow();
         expect(fsm.isMatchString("7862")).toBeFalsy();
         expect(fsm.isMatchString("12857")).toBeFalsy();
         expect(fsm.isMatchString("312884")).toBeFalsy();
         expect(fsm.isMatchString("273789")).toBeTruthy();      
         expect(fsm.isMatchString("3")).toBeTruthy();      
         expect(fsm.isMatchString("2123616")).toBeTruthy();      
         expect(fsm.isMatchString("2139")).toBeTruthy();      
      });

      it("Should throw when is not is a id and a delimiter", function(){
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
      });

   });
   
});
