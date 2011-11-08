describe("A adhoc lexical analiser", function(){
    it("Should start at position 0 on creation", function(){
        var lex = new Lexer();
        expect(lex.currentPosition).toEqual(0);
        expect(lex.peek).toEqual(" ");
        expect(lex.words["true"]).toEqual(Tag.TRUE);
        expect(lex.words["false"]).toEqual(Tag.FALSE);
    });
    
});