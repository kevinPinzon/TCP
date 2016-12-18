function Regla(inicial,final) {
	this.inicial = inicial;
	this.final = final;

  this.getInicial = function() {
    return this.inicial;
  }
  this.getFinal = function() {
    return this.final;
  }
  this.toString = function() {
    return "REGLA: "+this.inicial+" -> "+this.final;
  }
}
