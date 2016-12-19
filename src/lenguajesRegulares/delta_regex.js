function DeltaRegex(primero,symbol,segundo) {
	this.primero= primero;
	this.segundo = segundo;
	this.symbol = symbol;

  this.getInitialState = function() {
    return this.primero;
  }
  this.getFinalState = function() {
    return this.segundo;
  }
  this.getTransition = function() {
    return this.symbol;
  }
}
