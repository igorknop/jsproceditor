function FiniteStateAutomata(){
   this.states = new Array();
   this.initialState = null;
   this.finalState = null;
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

