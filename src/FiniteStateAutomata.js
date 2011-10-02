function FiniteStateAutomata(){
   this.states = new Array();
   this.initialState = null;
   this.finalState = null;
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

FiniteStateAutomata.prototype.setFinalState = function (state) {
   if (this.states[state]===undefined){
      throw new ReferenceError("Invalid final state!");
   }
   this.finalState = state;
};

FiniteStateAutomata.prototype.getFinalState = function () {
   return this.finalState;
};

FiniteStateAutomata.prototype.addState = function (state) {
   if (this.states[state]!==undefined){
      throw new ReferenceError("State already defined!");
   }
   this.states[state] = state;
   if (this.initialState===null){
      this.setInitialState(state);
   }
   this.setFinalState(state);
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
   if (!this.transitions[from].length){
      this.transitions[from] = new Array();
   }
   this.transitions[from][to] = transition;
};

