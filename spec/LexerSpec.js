describe("A adhoc lexical analiser", function(){
    it("Should start at position 0 on creation", function(){
        var lex = new Lexer();
        expect(lex.currentPosition).toEqual(0);
        expect(lex.peek).toEqual(" ");
        expect(lex.words["true"]).toEqual(Tag.TRUE);
        expect(lex.words["false"]).toEqual(Tag.FALSE);
    });
	it("Should increment line after scan a \n", function(){
		var lex = new Lexer();
		lex.setText("\n");
		lex.scan();
		expect(2).toEqual(lex.currentLine());
		lex.setText("\n\n\n");
		lex.scan();
		expect(4).toEqual(lex.currentLine());
	});
	it("Should return 123 after scan a '123'", function(){
		var lex = new Lexer();
		lex.setText("123");
		var o = lex.scan();
		expect({tag: Tag.NUM, value:123}).toEqual(o);
	});
	it("Should return 'name' after scan a 'name'", function(){
		var lex = new Lexer();
		lex.setText("name");
		var o = lex.scan();
		expect({tag: Tag.ID, lexeme:"name"}).toEqual(o);
	});
	it("Should return true after scan a ' true'", function(){
		var lex = new Lexer();
		lex.setText(" true");
		var o = lex.scan();
		expect(Tag.TRUE).toEqual(o);
	});	
	it("Should return false, 321, 'test' and true after scan a 'false 321 test true'", function(){
		var lex = new Lexer();
		lex.setText("false 321 test true");
		var o = lex.scan();
		expect(Tag.FALSE).toEqual(o);
		o = lex.scan();
		expect({tag: Tag.NUM, value:321}).toEqual(o);
		o = lex.scan();
		expect({tag: Tag.ID, lexeme:"test"}).toEqual(o);
		o = lex.scan();
		expect(Tag.TRUE).toEqual(o);
	});
    
});