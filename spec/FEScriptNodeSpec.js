describe("A syntax tree node", function(){
	it("Should have a parentNode null when creating without paramenters", function(){
		var node = new FEScriptNode();
		expect(node.parentNode).toBeNull();
	});

	it("Should have a empty childNodes array null when creating without paramenters", function(){
		var node = new FEScriptNode();
		expect(0).toBe(node.childNodes.length);
	});


	it("Should have all nodes added with addChild in childNodes", function(){
		var node = new FEScriptNode();
		var nodeChild = new FEScriptNode();
		var nodeChild2 = new FEScriptNode();
		node.addChild(nodeChild);
		node.addChild(nodeChild2);
		expect(nodeChild.parentNode).toBe(node);
		expect(node.childNodes.indexOf(nodeChild)).toBe(0);
		expect(nodeChild2.parentNode).toBe(node);
		expect(node.childNodes.indexOf(nodeChild2)).toBe(1);
	});

	it("Should have a process id tree when passing 'a()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a()");
		var tree = psr.parse();
		
		expect(FEScriptNodeType.PROCESS).toEqual(tree.type);
		expect(FEScriptNodeType.ID).toEqual(tree.childNodes[0].type);
		expect("a").toEqual(tree.childNodes[0].value);
	})
	
	it("Should have a process tree with two nodes when passing 'a()||b()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a()||b()");
		
		var tree = psr.parse();
		
		expect(FEScriptNodeType.PARALLEL).toEqual(tree.type);
		var ltree = tree.childNodes[0];
		expect(FEScriptNodeType.PROCESS).toEqual(ltree.type);
		var rtree = tree.childNodes[1];
		expect(FEScriptNodeType.PROCESS).toEqual(rtree.type);
		expect(FEScriptNodeType.ID).toEqual(ltree.childNodes[0].type);
		expect("a").toEqual(ltree.childNodes[0].value);
		expect(FEScriptNodeType.ID).toEqual(rtree.childNodes[0].type);
		expect("b").toEqual(rtree.childNodes[0].value);
	});
	
	it("Should have a process tree with three nodes when passing 'a()||b()||c()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a()||b()||c()");
		
		var tree = psr.parse();
		
		expect(FEScriptNodeType.PARALLEL).toEqual(tree.type);
		var ltree = tree.childNodes[0];
		expect(FEScriptNodeType.PARALLEL).toEqual(ltree.type);
		var rtree = tree.childNodes[1];
		expect(FEScriptNodeType.PROCESS).toEqual(rtree.type);
		expect(FEScriptNodeType.ID).toEqual(rtree.childNodes[0].type);
		expect("c").toEqual(rtree.childNodes[0].value);
	});
	it("Should have a process tree with four nodes when passing 'a()||b()||c()||d()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a()||b()||c()||d()");
		
		var tree = psr.parse();
		
		expect(FEScriptNodeType.PARALLEL).toEqual(tree.type);
		var ltree = tree.childNodes[0];
		expect(FEScriptNodeType.PARALLEL).toEqual(ltree.type);
		var rtree = tree.childNodes[1];
		expect(FEScriptNodeType.PROCESS).toEqual(rtree.type);
		expect(FEScriptNodeType.ID).toEqual(rtree.childNodes[0].type);
		expect("d").toEqual(rtree.childNodes[0].value);
		var ltreechild = ltree.childNodes[1];
		expect(FEScriptNodeType.PROCESS).toEqual(ltreechild.type);
		expect("c").toEqual(ltreechild.childNodes[0].value);
	});
	
	it("Should have a process tree with three nodes when passing 'a();b();c()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a();b();c()");
		
		var tree = psr.parse();
		
		expect(FEScriptNodeType.SEQUENTIAL).toEqual(tree.type);
		var ltree = tree.childNodes[0];
		expect(FEScriptNodeType.SEQUENTIAL).toEqual(ltree.type);
		var rtree = tree.childNodes[1];
		expect(FEScriptNodeType.PROCESS).toEqual(rtree.type);
		expect(FEScriptNodeType.ID).toEqual(rtree.childNodes[0].type);
		expect("c").toEqual(rtree.childNodes[0].value);
	});

	it("Should have a process tree with three nodes when passing 'a()||b();c()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a()||b();c()");
		
		var tree = psr.parse();
		
		expect(FEScriptNodeType.PARALLEL).toEqual(tree.type);
		var ltree = tree.childNodes[0];
		expect(FEScriptNodeType.PROCESS).toEqual(ltree.type);
		expect("a").toEqual(ltree.childNodes[0].value);
		var rtree = tree.childNodes[1];
		expect(FEScriptNodeType.SEQUENTIAL).toEqual(rtree.type);
		expect(FEScriptNodeType.PROCESS).toEqual(rtree.childNodes[0].type);
		expect("b").toEqual(rtree.childNodes[0].childNodes[0].value);
		expect(FEScriptNodeType.PROCESS).toEqual(rtree.childNodes[1].type);
		expect("c").toEqual(rtree.childNodes[1].childNodes[0].value);
	});
	it("Should have a process tree with three nodes when passing 'a();b()||c()' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText("a();b()||c()");
		
		var tree = psr.parse();
		
		expect(FEScriptNodeType.PARALLEL).toEqual(tree.type);
		var ltree = tree.childNodes[0];
		expect(FEScriptNodeType.SEQUENTIAL).toEqual(ltree.type);
		expect(FEScriptNodeType.PROCESS).toEqual(ltree.childNodes[0].type);
		expect("a").toEqual(ltree.childNodes[0].childNodes[0].value);
		expect(FEScriptNodeType.PROCESS).toEqual(ltree.childNodes[1].type);
		expect("b").toEqual(ltree.childNodes[1].childNodes[0].value);
		var rtree = tree.childNodes[1];
		expect(FEScriptNodeType.PROCESS).toEqual(rtree.type);
		expect("c").toEqual(rtree.childNodes[0].value);
	});

	it("Should have a process tree with eleven nodes when passing '[ n>m ?a():b()]' to it", function(){
		var psr = new FEScriptParser();
		var lex = new FEScriptLexer();
		psr.setLexer(lex);
		psr.setText('[ n>m ?a():b()]');
		
		var tree = psr.parse();
		
		expect(FEScriptNodeType.PARALLEL).toEqual(tree.type);
		var ltree = tree.childNodes[0];
		expect(FEScriptNodeType.PROCESS).toEqual(ltree.type);
		expect("a").toEqual(ltree.childNodes[0].value);
		var rtree = tree.childNodes[1];
		expect(FEScriptNodeType.SEQUENTIAL).toEqual(rtree.type);
		expect(FEScriptNodeType.PROCESS).toEqual(rtree.childNodes[0].type);
		expect("b").toEqual(rtree.childNodes[0].childNodes[0].value);
		expect(FEScriptNodeType.PROCESS).toEqual(rtree.childNodes[1].type);
		expect("c").toEqual(rtree.childNodes[1].childNodes[0].value);
	});
});
