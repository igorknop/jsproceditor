describe("Analyser Sintatic", function(){

	it(" Teste de sintatico", function(){
	 var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	 var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	 var fsmEq = new FiniteStateMachine();
         fsmEq.addState("initial");

         fsmEq.addState("delimiter");
         fsmEq.addFinalState("delimiter");
         fsmEq.addTransition("initial","delimiter",[" ","\t","\n"]);
         fsmEq.addTransition("delimiter","delimiter",[" ","\t","\n"]);

         fsmEq.addState("id");
         fsmEq.addFinalState("id");
	 fsmEq.addTransition("initial","id", letters);
	 fsmEq.addTransition("initial","id", "_");
         fsmEq.addTransition("id","id", letters);
         fsmEq.addTransition("id","id", numbers);
         fsmEq.addTransition("id","id", "_");

         fsmEq.addState("parentesis left");
         fsmEq.addFinalState("parentesis left");
         fsmEq.addState("parentesis right");
         fsmEq.addFinalState("parentesis right");
         fsmEq.addTransition("initial", "parentesis left",["("]);
         fsmEq.addTransition("initial", "parentesis right",[")"]);
	 
         fsmEq.addState("integer");
         fsmEq.addFinalState("integer");
	 fsmEq.addTransition("initial","integer", numbers);
	 fsmEq.addTransition("integer","integer", numbers);

         fsmEq.addState("float");
         fsmEq.addState("float dot");
         fsmEq.addFinalState("float");
	 fsmEq.addTransition("integer","float dot", ".");
	 fsmEq.addTransition("float dot", "float", numbers);
	 fsmEq.addTransition("float", "float", numbers);


         fsmEq.addState("plus");
         fsmEq.addFinalState("plus");
	 fsmEq.addTransition("initial","plus", "+");

         fsmEq.addState("minus");
         fsmEq.addFinalState("minus");
	 fsmEq.addTransition("initial","minus", "-");

         fsmEq.addState("asterisk");
         fsmEq.addFinalState("asterisk");
	 fsmEq.addTransition("initial","asterisk", "*");

         fsmEq.addState("slash");
         fsmEq.addFinalState("slash");
	 fsmEq.addTransition("initial","slash", "/");

	var lex = new LexicalAnalyser();
	lex.setText("a+b*c");
	var fsm = new FiniteStateMachine();
	lex.setMachine(fsmEq);

	lex.run();
	var prox = lex.getLastState();
	expect(prox).toEqual("id");
	});
});

