  var estados = new Array();
  var alfabeto = new Array();
  var estadoInicial;
  var estadosFinales = new Array();
  var delta = new Array();
  var deltaT;
  var insertar;

  function probarDFA() {
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
          for (var i = 0; i < delta.length; i++) {
            console.log("DELTA "+i+".............");
            console.log("estado incial: "+delta[i].getInitialState().text);
            console.log("estado final"+delta[i].getFinalState().text);
            console.log("transicion: "+delta[i].getTransition());
          }

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
    insertar=true;
    if (estados.length == 0)
      estados[0]=Newstate;
    for (var i = 0; i < estados.length; i++) {
      if (estados[i]==Newstate || ""==Newstate)
        insertar=false;
    }
    if (insertar)
      estados.push(Newstate);
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
      alfabeto.push(Newsymbol);
  }

  function getFinalState(finalState) {
    insertar=true;
    if (estadosFinales.length == 0)
      estadosFinales[0]=finalState;
    for (var i = 0; i < estadosFinales.length; i++) {
      if (estadosFinales[i]==finalState || ""==finalState)
        insertar=false;
    }
    if (insertar)
      estadosFinales.push(finalState);
  }

  function llenarDelta(initialState,symbol,finalState) {
    if (initialState.txt == "" || symbol == "" || finalState.txt == "") {
      // console.log("no inserta..");
    }
    else {
      // console.log("entro en llenarDelta else..");
      deltaT = new Delta(initialState,symbol,finalState);
      insertar=true;
      for (var i = 0; i < delta.length; i++) {
        if (comparadorDeObjetos(deltaT,delta[i]))
          insertar=false;
      }
      if (insertar) {
          delta.push(deltaT);
          // console.log("elemento insertado");
      }
      else {
        // console.log("elemento NO insertado");
      }
    }
  }

  function getNextState(initialState,symbol) {

  }

  function comparadorDeObjetos(obj1,obj2) {
    if (JSON.stringify(obj1) === JSON.stringify(obj2))
      return true;
    return false;
  }
