describe("AdHoc AHOInToPosParser", function(){
	it("Should not throw when passing 2+3", function(){
		var psr = new AHOInToPosParser();
		psr.setText("2+3");
		expect(function(){psr.expr();}).not.toThrow();
	});
	it("Should return 23+ when passing 2+3", function(){
		var psr = new AHOInToPosParser();
		psr.setText("2+3");
		psr.expr()
		expect(psr.resultText).toEqual("23+");
	});
});