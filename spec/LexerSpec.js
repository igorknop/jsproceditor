describe("A adhoc lexical analiser", function(){
    it("Should start at position 0 on creation", function(){
        var lex = new Lexer();
        expect(lex.currentPosition).toEqual(0);
        expect(lex.peek).toEqual(" ");
        expect(lex.words[0].lexeme).toEqual("true");
        expect(lex.words[1].lexeme).toEqual("false");
    });
    
});