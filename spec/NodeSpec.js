describe("A syntax tree node", function(){
	it("Should have a parentNode null when creating without paramenters", function(){
		var node = new Node();
		expect(node.parentNode).toBeNull();
	});

	it("Should have a empty childNodes array null when creating without paramenters", function(){
		var node = new Node();
		expect(0).toBe(node.childNodes.length);
	});


	it("Should have a parentNode when creating with another Node as paramenter", function(){
		var node = new Node();
		var nodeChild = new Node(node);
		expect(nodeChild.parentNode).toBe(node);
	});

	it("Should be in childNodes of parent when creating with another Node as paramenter", function(){
		var node = new Node();
		var nodeChild = new Node(node);
		var nodeChild2 = new Node(node);
		expect(node.childNodes.indexOf(nodeChild)).toBe(0);
		expect(node.childNodes.indexOf(nodeChild2)).toBe(1);
	});

	it("Should have all nodes added with addChild in childNodes", function(){
		var node = new Node();
		var nodeChild = new Node();
		var nodeChild2 = new Node();
		node.addChild(nodeChild);
		node.addChild(nodeChild2);
		expect(nodeChild.parentNode).toBe(node);
		expect(node.childNodes.indexOf(nodeChild)).toBe(0);
		expect(nodeChild2.parentNode).toBe(node);
		expect(node.childNodes.indexOf(nodeChild2)).toBe(1);
	});
});
