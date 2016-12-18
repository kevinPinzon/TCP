var gramatica = new Cfg();
var contador = 0;
window.onload = function() {
  document.getElementById("btnRegla").onclick = function() {addRegla()};
  document.getElementById("btnProbarCFG").onclick = function() {probarCFG()};
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

function probarCFG(){
  var inputCadena = document.getElementById("inputCadena").value;
  if (inputCadena != "") {
    for (var i = 0; i < inputCadena.length; i++) {
for (var i = 0; i < gramatica.getTerminales().length; i++) {
  gramatica.getTerminales()[i]
}
      if (inputCadena[i] == ) {

      }
    }
  }else {
    swal("Input vacio", "Ingrese una cadena", "warning");
  }
}
