function Node (parentNode){
	if(parentNode){
		this.parentNode = parentNode;
		this.parentNode.childNodes.push(this);
	} else {
		this.parentNode = null;
	}
	this.childNodes = [];
};

Node.prototype.addChild = function(child){
	this.childNodes.push(child);
	child.parentNode = this;
};
