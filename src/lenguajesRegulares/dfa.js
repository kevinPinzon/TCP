  var estados = new Array();
  var alfabeto = new Array();
  var estadoInicial;
  var estadosFinales = new Array();

  function myFunction() {
    var cadenaEntrante = document.getElementById("inputCadena").value;

    for (var i = 0; i < estados.length; i++)
      console.log("estado["+i+"]: "+estados[i]);

    for (var i = 0; i < alfabeto.length; i++)
      console.log("alfabeto["+i+"]: "+alfabeto[i]);

    console.log("estado inicial: "+ estadoInicial);

    for (var i = 0; i < estadosFinales.length; i++)
      console.log("estados Finales["+i+"]: "+estadosFinales[i]);

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

  function getInitialState(initial) {
      estadoInicial = initial.text;
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

  function getFinalState(Finalstate) {
    var insertar=true;
    if (estadosFinales.length == 0)
      estadosFinales[0]=Finalstate;
    for (var i = 0; i < estadosFinales.length; i++) {
      if (estadosFinales[i]==Finalstate || ""==Finalstate)
        insertar=false;
    }
    if (insertar)
      estadosFinales[estadosFinales.length]=Finalstate;
  }
