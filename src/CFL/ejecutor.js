var gramatica = new Cfg();
var contador = 0;
window.onload = function() {
  document.getElementById("btnRegla").onclick = function() {addRegla()};
}

function addRegla(){
  if (contador==0) {
    console.log("setiando 4tuplas");
    gramatica.setNoTerminales();
    gramatica.setTerminales();
    gramatica.setInicial();
    document.getElementById("inputV").disabled = true;
    document.getElementById("inputE").disabled = true;
  }
  gramatica.setReglas();
  contador++;
}
