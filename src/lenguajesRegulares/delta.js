function Delta(initialNode,symbol,finalNode) {
	this.initialNode = initialNode;
	this.finalNode = finalNode;
	this.symbol = symbol;

  this.getInitialState = function() {
    return this.initialNode;
  }
  this.getFinalState = function() {
    return this.finalNode;
  }
  this.getTransition = function() {
    return this.symbol;
  }
  this.toString = function() {
    return "nodo incial: "+this.initialNode.text+", nodo final: "+this.finalNode.text+", simbolo: "+this.symbol;
  }
}
