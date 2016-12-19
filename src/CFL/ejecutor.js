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
  document.getElementById("inputR").value= "";
  contador++;
}

function probarCFG(){
  var inputCadena = document.getElementById("inputCadena").value;
  if (inputCadena != "") {
    for (var i = 0; i < inputCadena.length; i++) {
      var cadenaCorrecta =false;
      for (var j = 0; j < gramatica.getTerminales().length; j++) {
        if (inputCadena[i] == gramatica.getTerminales()[j]) {
          cadenaCorrecta =true;
        }
      }
      if (inputCadena[i] =='e') {
        cadenaCorrecta =true;
      }
      if (cadenaCorrecta) {
        ProbarCadenaPDA();

        swal("Accept", "Cadena aceptada", "success");
      }else{
        swal("Reject", "simbolo: "+inputCadena[i]+" desconocido" , "error");
      }
    }
  }else {
    swal("Input vacio", "Ingrese una cadena", "warning");
  }
}
