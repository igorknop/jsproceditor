describe("AdHoc FEScriptParser", function(){
	it("Should have a lexer when pass a lexer to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		expect(psr.lexer).not.toEqual(null);
	});
	it("Should not throw a exception when passing 'a' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a")
		expect(function(){psr.move()}).not.toThrow();
	});
	it("Should have a id when passing 'a' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a");
		psr.move();
		expect({tag:Tag.ID, lexeme:"a"}).toEqual(psr.lookahead);
	});
	it("Should not throw a exception when passing 'a()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a()");
		
		expect(function(){psr.parse();}).not.toThrow();
	});
	it("Should not throw a exception when passing 'a();b()||c()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a();b()||c()");
		
		expect(function(){psr.parse();}).not.toThrow();
	});
	it("Should not throw a exception when passing 'a()||b()||c()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a()||b()||c()");
		var r;
		expect(function(){r = psr.parse();}).not.toThrow();
	});
	it("Should not throw a exception when passing 'a()||(b();c())' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a()||(b();c())");
		var r;
		expect(function(){r = psr.parse();}).not.toThrow();
	});
	it("Should throw a exception when passing 'a();b())' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a();b())");
		
		expect(function(){psr.parse();}).toThrow();
	});

	it("Should not throw a exception when passing an attribuition 'a = b()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("x = b()");
		
		expect(function(){psr.parse();}).not.toThrow();
	});

	it("Should not throw a exception when passing an attribuition '[ n>m ?a():b()]' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("[ n>m ?a():b()]");
		
		expect(function(){psr.parse();}).not.toThrow();
	});
	
	it("Should throw a exception when passing an attribuition '9 = t' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("9 = y");
		
		expect(function(){psr.parse();}).toThrow();
	});

	it("Should not throw a exception when passing an attribuition 'a = a(); [a>2?b()||c(): b();c()]' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a = a(); [a>2 ? b()||c() : b();c()]");
		
		expect(function(){psr.parse();}).not.toThrow();
	});

	it("Should not throw a exception when passing an attribuition 'a = a(); [a>2 ? b = b()||c() : b();c()]; a = b()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a = a(); [a>2 ? b = b()||c() : b();c()]; a = b()");
		
		expect(function(){psr.parse();}).not.toThrow();
	});

});
