describe("A adhoc Fisiocomp Environment Script lexical analiser", function(){
    it("Should start at position 0 on creation", function(){
        var lex = new FEScriptLexer();
        expect(lex.currentPosition).toEqual(0);
        expect(lex.peek).toEqual(" ");
        expect(lex.words["true"]).toEqual({tag:Tag.TRUE, lexeme:"true"});
        expect(lex.words["false"]).toEqual({tag:Tag.FALSE, lexeme:"false"});
    });
	it("Should increment line after scan a \n", function(){
		var lex = new FEScriptLexer();
		lex.setText("\n");
		lex.scan();
		expect(2).toEqual(lex.currentLine());
		lex.setText("\n\n\n");
		lex.scan();
		expect(4).toEqual(lex.currentLine());
	});
	it("Should return 123 after scan a '123'", function(){
		var lex = new FEScriptLexer();
		lex.setText("123");
		var o = lex.scan();
		expect({tag: Tag.NUM, value:123}).toEqual(o);
	});
	it("Should return 'name' after scan a 'name'", function(){
		var lex = new FEScriptLexer();
		lex.setText("name");
		var o = lex.scan();
		expect({tag: Tag.ID, lexeme:"name"}).toEqual(o);
	});
	it("Should return true after scan a ' true'", function(){
		var lex = new FEScriptLexer();
		lex.setText(" true");
		var o = lex.scan();
		expect({tag:Tag.TRUE, lexeme:"true"}).toEqual(o);
	});	
	it("Should return false, 321, 'test' and true after scan a 'false 321 test true'", function(){
		var lex = new FEScriptLexer();
		lex.setText("false 321 test true");
		var o = lex.scan();
		expect({tag:Tag.FALSE, lexeme:"false"}).toEqual(o);
		o = lex.scan();
		expect({tag: Tag.NUM, value:321}).toEqual(o);
		o = lex.scan();
		expect({tag: Tag.ID, lexeme:"test"}).toEqual(o);
		o = lex.scan();
		expect({tag:Tag.TRUE, lexeme:"true"}).toEqual(o);
	});
	
	it("Should return parallel, atribuition, equality, inequality ( and ) after scan a '|| = == != ( )'", function(){
		var lex = new FEScriptLexer();
		lex.setText("|| = == != ( )");
		var o = lex.scan();
		expect({tag:Tag.PARALLEL, lexeme:"||"}).toEqual(o);
		o = lex.scan();
		expect({tag:Tag.ATRIBUITION, lexeme:"="}).toEqual(o);
		o = lex.scan();
		expect({tag: Tag.EQ, lexeme:"=="}).toEqual(o);
		o = lex.scan();
		expect({tag:Tag.NEQ, lexeme:"!="}).toEqual(o);
	});
	
	it("Should return '(' and ')' after scan a '( )'", function(){
		var lex = new FEScriptLexer();
		lex.setText("(\na\n) ");
		var o = lex.scan();
		expect({tag:Tag.PARENTESIS_LEFT, lexeme:"("}).toEqual(o);	
		o = lex.scan();
		expect({tag: Tag.ID, lexeme:"a"}).toEqual(o);
		o = lex.scan();
		expect({tag:Tag.PARENTESIS_RIGHT, lexeme:")"}).toEqual(o);
	});

	it("Should throw Exception when scan a 'a!b'", function(){
		var lex = new FEScriptLexer();
		lex.setText("a!b");
		lex.scan();
		expect(function(){lex.scan();}).toThrow();	
	});

	it("Should not throw Exception when scan a 'a!=b'", function(){
		var lex = new FEScriptLexer();
		lex.setText("a!=b");
		lex.scan();
		expect(function(){lex.scan();}).not.toThrow();	
	});
	

	it("Should throw Exception when scan a 'a|b'", function(){
		var lex = new FEScriptLexer();
		lex.setText("a|b");
		lex.scan();
		expect(function(){lex.scan();}).toThrow();	
	});

	it("Should not throw Exception when scan a 'a||b'", function(){
		var lex = new FEScriptLexer();
		lex.setText("a||b");
		lex.scan();
		expect(function(){lex.scan();}).not.toThrow();	
	});
	
});