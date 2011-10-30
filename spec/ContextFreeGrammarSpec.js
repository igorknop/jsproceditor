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
            grammar.addProduction("P", "");
            expect(grammar.getProductions()["P"][0]).toEqual("");
            grammar.addProduction("P", [new NonTerminal("A")]);
            expect(grammar.getProductions()["P"][1][0].getName()).toEqual("A");
		});
    
    });

});
