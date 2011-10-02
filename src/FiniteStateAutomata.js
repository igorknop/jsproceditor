function FiniteStateAutomata(){
   this.states = new Array();
   this.initialState = null;
}

FiniteStateAutomata.prototype.setInitialState = function (state) {
   if (this.states[state]===undefined){
      throw new ReferenceError("Initial value should Exist!");
   }
   this.initialState = state;
};

FiniteStateAutomata.prototype.getInitialState = function () {
   return this.initialState;
};

FiniteStateAutomata.prototype.addState = function (state) {
   if (this.states[state]!==undefined){
      throw new ReferenceError("State alread exist!");
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

