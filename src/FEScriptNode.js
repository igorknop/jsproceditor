FEScriptNodeType = {
    "ID"          : "ID"          /* 01 */ ,
    "NUM"         : "NUM"         /* 02 */ ,
    "PROCESS"     : "PROCESS"     /* 03 */ ,
    "PARALLEL"    : "PARALLEL"    /* 04 */ ,
    "SEQUENTIAL"  : "SEQUENTIAL"  /* 05 */ ,
    "ATRIBUITION" : "ATRIBUITION" /* 06 */ ,
    "CONDITIONAL" : "CONDITIONAL" /* 06 */ ,
};

function FEScriptNode (type){
    

    this.type = type;
    this.value = null
    this.parentNode = null;
	this.childNodes = [];
};

FEScriptNode.prototype.insertChild = function(child){
    var n = this.childNodes.length;
    for(var i=0; i<n; i++){
	    this.childNodes[i+1] = this.childNodes[i];
    }
    this.childNodes[0] = child;
	child.parentNode = this;
};

FEScriptNode.prototype.addChild = function(child){
	this.childNodes.push(child);
	child.parentNode = this;
};

if(exports){
   exports.FEScriptNode = FEScriptNode;
   exports.FEScriptNodeType = FEScriptNodeType;
}
