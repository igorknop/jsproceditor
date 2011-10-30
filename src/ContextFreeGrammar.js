/**
 *  Grammar
 **/
function Grammar(){
    this.productions = [];
}

Grammar.prototype.getProductions = function(){
    return this.productions;
};

Grammar.prototype.addProduction = function(prodName, prod){
    if(!this.productions[prodName]){
        this.productions[prodName] = [];
    }
    this.productions[prodName].push(prod);
};

/**
 *  Terminal
 **/
function Terminal(symbol){
    if(symbol===undefined) {
        throw new TypeError("You should pass a symbol to create a terminal");
    }
    this.symbol = symbol;
}

Terminal.prototype.getSymbol = function(){
    return this.symbol;
};

/**
 *  Non Terminal
 **/
function NonTerminal(name){
    if(name===undefined) {
        throw new TypeError("You should pass a name to create a non terminal");
    }
    this.name = name;
};

NonTerminal.prototype.getName = function(){
    return this.name;
};
