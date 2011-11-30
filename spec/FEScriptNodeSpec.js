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
	});
});
