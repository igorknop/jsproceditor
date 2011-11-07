describe("Context Free Grammar", function(){
    beforeEach(function(){
        /**
         *  E  -> TE1
         *  E1 -> +TE | e
         *  T  -> FT1
         *  T1 -> *FT1 | e
         *  F  -> (E) | id
         **/
        var g1 = new Grammar();
        g1.addProduction("E", [new NonTerminal("T"), new NonTerminal("E1")]);
        g1.addProduction("E1", [new Terminal("+"), new NonTerminal("T"), new NonTerminal("E")]);
        g1.addProduction("E1", new Terminal(""));
        g1.addProduction("T", [new NonTerminal("F"), new NonTerminal("T1")]);
        g1.addProduction("T1", [new Terminal("*"), new NonTerminal("F"), new NonTerminal("T1")]);
        g1.addProduction("T1", new Terminal(""));
        g1.addProduction("F", [new Terminal("("), new NonTerminal("E"), new Terminal(")"), new Terminal("id")]);


    });

	describe("Non terminal element", function(){
		it("Should have a name after creation", function(){
		    var nonterm = new NonTerminal("A");
            expect(nonterm.getName()).toEqual("A");
		});
	});

	describe("Terminal element", function(){
		it("Should have a symbol after creation", function(){
		    var term = new Terminal("a");
            expect(term.getSymbol()).toEqual("a");
		});
	});

    describe("Context Free Grammar", function(){
		it("Should have an empty productions after creation", function(){
		    var grammar = new Grammar();
            expect(grammar.getProductions()).toEqual([]);
		});
		it("Should have an production after adding a production", function(){
		    var grammar = new Grammar();
            grammar.addProduction("P", [new Terminal("")]);
            expect(grammar.getProductions()["P"][0][0].getSymbol()).toEqual("");
            grammar.addProduction("P", [new NonTerminal("A")]);
            expect(grammar.getProductions()["P"][1][0].getName()).toEqual("A");
		});
   		it("Should return a [(,id] for FIRST(F)", function(){

			var g1 = new Grammar();
			g1.addProduction("E", [new NonTerminal("T"), new NonTerminal("E1")]);
			g1.addProduction("E1", [new Terminal("+"), new NonTerminal("T"), new NonTerminal("E")]);
			g1.addProduction("E1", [new Terminal("")]);
			g1.addProduction("T", [new NonTerminal("F"), new NonTerminal("T1")]);
			g1.addProduction("T1", [new Terminal("*"), new NonTerminal("F"), new NonTerminal("T1")]);
			g1.addProduction("T1", [new Terminal("")]);
			g1.addProduction("F", [new Terminal("("), new NonTerminal("E"), new Terminal(")")]);
			g1.addProduction("F", [new Terminal("id")]);
			expect(g1.FIRST("F")[0].getSymbol()).toEqual("(");
			expect(g1.FIRST("F")[1].getSymbol()).toEqual("id");
			expect(g1.FIRST("E")[0].getSymbol()).toEqual("(");
			expect(g1.FIRST("E")[1].getSymbol()).toEqual("id");
			expect(g1.FIRST("T1")[0].getSymbol()).toEqual("*");
			expect(g1.FIRST("T1")[1].getSymbol()).toEqual("");
		}); 

		it("Should return 0 if syntaxically correct", function(){
			var g1 = new Grammar();
			g1.addProduction("E", [new NonTerminal("T"), new NonTerminal("E1")]);
			g1.addProduction("E1", [new Terminal("+"), new NonTerminal("T"), new NonTerminal("E")]);
			g1.addProduction("E1", [new Terminal("")]);
			g1.addProduction("T", [new NonTerminal("F"), new NonTerminal("T1")]);
			g1.addProduction("T1", [new Terminal("*"), new NonTerminal("F"), new NonTerminal("T1")]);
			g1.addProduction("T1", [new Terminal("")]);
			g1.addProduction("F", [new Terminal("("), new NonTerminal("E"), new Terminal(")")]);
			g1.addProduction("F", [new Terminal("id")]);
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

			var E = function(fsm, grammar){
				lex.run();
				var prox = lex.getLastState();
				var first = grammar.FIRST("T").indexOf(prox);
				if(first !==undefined){
					T(fsm, grammar);
					E1(fsm, grammar);
				} else {
					throw new RangeError("Expected: "+first);
				}
			}
			var T = function(fsm, grammar){
				lex.run();
				var prox = lex.getLastState();
				var first = grammar.FIRST("F").indexOf(prox);
				if(first !==undefined){
					F(fsm, grammar);
					T1(fsm, grammar);
				} else {
					throw new RangeError("Expected: "+first);
				}
			}
			var E1 = function(fsm, grammar){
				lex.run();
				var prox = lex.getLastState();
				if(prox == "+"){
					T(fsm, grammar);
					E(fsm, grammar);
				} 
			}
			var T1 = function(fsm, grammar){
				lex.run();
				var prox = lex.getLastState();
				if(prox == "*"){
					F(fsm, grammar);
					T1(fsm, grammar);
				} 
			}
			var F = function(fsm, grammar){
				lex.run();
				var prox = lex.getLastState();
				if(prox == "("){
					E(fsm, grammar);
					prox = lex.getLastState();
					if(prox !== ")"){
						throw new RangeError("Expected )");
					}
				} else if(prox !== "id"){
						throw new RangeError("Expected id or (");
				}
			}
			expect(function(){ E(lex, g1);}).not.toThrow();
			lex.setText("(a+b)");
			expect(function(){ E(lex, g1);}).not.toThrow();
			//expect(function(){ E(lex, g1);}).toThrow(new RangeError("Expected )"));

		


		});
    });


});
