function FiniteStateMachine(){
   this.states = [];
   this.initialState = null;
   this.currentState = null;
   this.finalStates = [];
   this.transitions = [];
}

FiniteStateMachine.prototype.setInitialState = function (state) {
   if (this.states[state]===undefined){
      throw new ReferenceError("Invalid initial state!");
   }
   this.initialState = state;
   this.setCurrentState(this.initialState);
};

FiniteStateMachine.prototype.getInitialState = function () {
   return this.initialState;
};

FiniteStateMachine.prototype.addFinalState = function (state) {
   if (this.states[state]===undefined){
      throw new ReferenceError("Invalid final state:"+state+"!");
   }
   this.finalStates[state] = state;
};

FiniteStateMachine.prototype.getFinalStates = function () {
   return this.finalStates;
};

FiniteStateMachine.prototype.addState = function (state) {
   if (this.states[state]!==undefined){
      throw new ReferenceError("State already defined!");
   }
   this.states[state] = state;
   if (this.initialState===null){
      this.setInitialState(state);
   }
};

FiniteStateMachine.prototype.getState = function (state) {
   if (this.states[state]===undefined){
      throw new ReferenceError("State is not defined!");
   }
   return this.states[state];
};

FiniteStateMachine.prototype.addTransition = function (from, to, transition) {
   if(transition.push){
      for(var i=0; i<transition.length; i++){
         this.addTransition(from, to, transition[i]);
      }
   }
   if (this.states[from]===undefined){
      throw new ReferenceError("State "+from+" is not defined!");
   }
   if (this.states[to]===undefined){
      throw new ReferenceError("State "+to+" is not defined!");
   }
   if (this.transitions[from]===undefined){
      this.transitions[from] = [];
   }
   this.transitions[from][transition] = to;
};

FiniteStateMachine.prototype.testTransition = function (from, to, transition){
   try {
      if (this.transitions[from][transition]===to){
         return true;
      }
   } catch (e) {
      return false;
   }
};

FiniteStateMachine.prototype.getNextState = function (transition){
   try {
      if (this.transitions[this.getCurrentState()][transition]!==undefined){
         return this.transitions[this.getCurrentState()][transition];
      }
   } catch (e) {
      throw new ReferenceError("Transition "+transition+" is impossible from "+this.getCurrentState()+"!");
   }
};

FiniteStateMachine.prototype.getCurrentState = function (){
   return this.currentState;
};

FiniteStateMachine.prototype.setCurrentState = function (state) {
   if (this.states[state]===undefined){
      throw new ReferenceError("Invalid current state: "+state+"!");
   }
   this.currentState = state;
};

FiniteStateMachine.prototype.transition = function (q, alphabet) {
   if(alphabet.length===undefined){
      throw new TypeError("Alphabet should be an array: "+alphabet+"!");
   }
   this.setCurrentState(q);
   if(alphabet.length===0){
      return this.getCurrentState();
   }
   var t = alphabet.shift();
   return this.transition(this.getNextState(t), alphabet);
};

FiniteStateMachine.prototype.isAFinalState = function (state) {
   return this.finalStates[state]!==undefined;
};
FiniteStateMachine.prototype.isMatchArray = function (alphabet) {
   var state = this.transition(this.getInitialState(), alphabet);
   this.currentSymbolCounter=0;
   return this.isAFinalState(state);
};

FiniteStateMachine.prototype.isMatchString = function (text) {
   var alphabet = [];   
   for(var i=0; i<text.length; i++){
      alphabet.push(text[i]);
   }   
   return this.isMatchArray(alphabet);
};

FiniteStateMachine.prototype.transitionString = function (text) {
   var alphabet = [];   
   for(var i=0; i<text.length; i++){
      alphabet.push(text[i]);
   }   
   return this.transition(this.getInitialState(),alphabet);
};

FiniteStateMachine.prototype.moveToNextState = function (transition) {
      if (this.transitions[this.getCurrentState()][transition]!==undefined){
         this.setCurrentState(this.transitions[this.getCurrentState()][transition]);
      } else {
         throw new ReferenceError("Transition '"+transition+"' is impossible from state '"+this.getCurrentState()+"'!");
         
      }
};
