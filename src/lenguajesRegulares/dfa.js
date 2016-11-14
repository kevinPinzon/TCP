  var estados = new Array();
  var alfabeto = new Array();

  function myFunction() {
    var cadenaEntrante = document.getElementById("inputCadena").value;
    for (var i = 0; i < estados.length; i++)
      console.log("estado["+i+"]: "+estados[i]);
    for (var i = 0; i < alfabeto.length; i++)
      console.log("alfabeto["+i+"]: "+alfabeto[i]);
    if (cadenaEntrante != "") {
      if (estados.length != 0) {
        if (alfabeto.length != 0) {

        }else
          alert("Por favor asigne valores a las aristar");
      }else
        alert("Por favor asigne estados a los nodos");
    }else
      alert("Por favor digite una cadena");
  }

  function getState(Newstate) {
    var insertar=true;
    if (estados.length == 0)
      estados[0]=Newstate;
    for (var i = 0; i < estados.length; i++) {
      if (estados[i]==Newstate || ""==Newstate)
        insertar=false;
    }
    if (insertar)
      estados[estados.length]=Newstate;
  }

  function getAlfabeto (Newsymbol) {
    var insertar=true;
    if (alfabeto.length == 0)
      alfabeto[0]=Newsymbol;
    for (var i = 0; i < alfabeto.length; i++) {
      if (alfabeto[i]==Newsymbol || ""==Newsymbol)
        insertar=false;
    }
    if (insertar)
      alfabeto[alfabeto.length]=Newsymbol;
  }
