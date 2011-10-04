function FiniteStateMachine(){
   this.states = new Array();
   this.initialState = null;
   this.currentState = null;
   this.finalStates = new Array();
   this.transitions = new Array();
}

FiniteStateMachine.prototype.setInitialState = function (state) {
   if (this.states[state]===undefined){
      throw new ReferenceError("Invalid initial state!");
   }
   this.initialState = state;
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

FiniteStateMachine.prototype.testTransition = function (from, to, transition){
   try {
      if (this.transitions[from][transition]===to){
         return true;
      }
   } catch (e) {
      return false;
   }
};

FiniteStateMachine.prototype.nextState = function (current,transition){
   try {
      if (this.transitions[current][transition]!==undefined){
         return this.transitions[current][transition];
      }
   } catch (e) {
      throw new ReferenceError("Transition "+transition+" is impossible from "+current+"!");
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
   if(alphabet.length===0){
      return q;
   }
   var t = alphabet.shift();
   
   return this.transition(this.nextState(q,t), alphabet);
};

FiniteStateMachine.prototype.isMatchArray = function (alphabet) {
   var state = this.transition(this.initialState, alphabet);
   return this.finalStates[state]!==undefined;
};

FiniteStateMachine.prototype.isMatchString = function (text) {
   var alphabet = new Array();   
   for(var i=0; i<text.length; i++){
      alphabet.push(text[i]);
   }   
   return this.isMatchArray(alphabet);
};

FiniteStateMachine.prototype.transitionString = function (text) {
   var alphabet = new Array();   
   for(var i=0; i<text.length; i++){
      alphabet.push(text[i]);
   }   
   return this.transition(this.getInitialState(),alphabet);
};
