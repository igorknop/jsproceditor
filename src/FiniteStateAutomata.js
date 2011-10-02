function FiniteStateAutomata(){
   this.states = new Array();
   this.initialState = null;
   this.currentState = null;
   this.finalStates = new Array();
   this.transitions = new Array();
}

FiniteStateAutomata.prototype.setInitialState = function (state) {
   if (this.states[state]===undefined){
      throw new ReferenceError("Invalid initial state!");
   }
   this.initialState = state;
};

FiniteStateAutomata.prototype.getInitialState = function () {
   return this.initialState;
};

FiniteStateAutomata.prototype.addFinalState = function (state) {
   if (this.states[state]===undefined){
      throw new ReferenceError("Invalid final state:"+state+"!");
   }
   this.finalStates[state] = state;
};

FiniteStateAutomata.prototype.getFinalStates = function () {
   return this.finalStates;
};

FiniteStateAutomata.prototype.addState = function (state) {
   if (this.states[state]!==undefined){
      throw new ReferenceError("State already defined!");
   }
   this.states[state] = state;
   if (this.initialState===null){
      this.setInitialState(state);
   }
};

FiniteStateAutomata.prototype.getState = function (state) {
   if (this.states[state]===undefined){
      throw new ReferenceError("State is not defined!");
   }
   return this.states[state];
};

FiniteStateAutomata.prototype.addTransition = function (from, to, transition) {
   if (this.states[from]===undefined){
      throw new ReferenceError("State "+from+" is not defined!");
   }
   if (this.states[to]===undefined){
      throw new ReferenceError("State "+to+" is not defined!");
   }
   if (this.transitions[from]===undefined){
      this.transitions[from] = new Array();
   }
   this.transitions[from][transition] = to;
};

FiniteStateAutomata.prototype.testTransition = function (from, to, transition){
   try {
      if (this.transitions[from][transition]===to){
         return true;
      }
   } catch (e) {
      return false;
   }
};

FiniteStateAutomata.prototype.nextState = function (current,transition){
   try {
      if (this.transitions[current][transition]!==undefined){
         return this.transitions[current][transition];
      }
   } catch (e) {
      throw new ReferenceError("Transition "+transition+" is impossible from "+current+"!");
   }
};

FiniteStateAutomata.prototype.getCurrentState = function (){
   return this.currentState;
};

FiniteStateAutomata.prototype.setCurrentState = function (state) {
   if (this.states[state]===undefined){
      throw new ReferenceError("Invalid current state: "+state+"!");
   }
   this.currentState = state;
};

FiniteStateAutomata.prototype.transition = function (q, alphabet) {
   if(alphabet.length===undefined){
      throw new TypeError("Alphabet should be an array: "+alphabet+"!");
   }
   if(alphabet.length===0){
      return q;
   }
   var t = alphabet.shift();
   
   return this.transition(this.nextState(q,t), alphabet);
};


