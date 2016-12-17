function Delta(initialNode,symbol,finalNode,rejectNode) {
	this.initialNode = initialNode;
	this.finalNode = finalNode;
	this.symbol = symbol;
	this.rejectNode = rejectNode;

  this.getInitialState = function() {
    return this.initialNode.text;
  }
  this.getFinalState = function() {
    return this.finalNode.text;
  }
  this.getTransition = function() {
    return this.symbol;
  }
}
