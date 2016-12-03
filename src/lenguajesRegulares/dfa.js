  var estados = new Array();
  var alfabeto = new Array();
  var estadoInicial,existeInicial=false;
  var estadosFinales = new Array();
  var delta = new Array();
  var deltaT;
  var insertar;
  var transicionEntrantes;
  var cont = 0;
  var matrix = [];


  function probarDFA() {
    estados = new Array();
    alfabeto = new Array();
    estadosFinales = new Array();
    delta = new Array();

    get5tuplas();
    var cadenaEntrante = document.getElementById("inputCadena").value;
    if (cadenaEntrante != "") {
      if (estados.length != 0) {
        if (alfabeto.length != 0) {
      // IMPRESION DE LAS 5TUPLAS-----------------------------------
          console.log("PRUEBA INICIANDO--------------------------------");
          console.log("estado inicial: "+ estadoInicial);

          for (var i = 0; i < estados.length; i++){
            console.log("estado["+i+"]: "+estados[i]);
	    cont++;
	  }

          for (var i = 0; i < alfabeto.length; i++)
            console.log("alfabeto["+i+"]: "+alfabeto[i]);

          for (var i = 0; i < estadosFinales.length; i++)
            console.log("estados Finales["+i+"]: "+estadosFinales[i]);

          for (var i = 0; i < delta.length; i++) {
            console.log("DELTA "+i+".............");
            console.log("estado incial: "+delta[i].getInitialState());
            console.log("estado final: "+delta[i].getFinalState());
            console.log("transicion: "+delta[i].getTransition());
          }
      // FINAL DE IMPRESION DE LAS 5TUPLAS-----------------------------------
		console.log("cont"+cont);
		for(var i=0; i<cont; i++) {
   			matrix[i] = [];
    			for(var j=0; j<cont; j++) {
    	  		  matrix[i][j] = 999999;
    			}
		}
		console.log("IMPRIMIENDO MATRIZ");
		for(var i = 0; i < cont; i++){
			for(var j=0; j<cont; j++){
				console.log("["+matrix[i][j]+"]");
				console.log("que putas aqui");
			}
			console.log("\n");
		}	

		for(var i = 0; i < delta.length; i ++){
			for(var j = 0; j < cont; j++){
        			if (comparadorDeObjetos(estados[j],delta[i].getInitialState())){
					for(var k = 0; k < cont; k++){
						if(comparadorDeObjetos(estados[k], delta[i].getFinalState())){
							matrix[j][k] = delta[i].getTransition();
						}
					}
				}
			}
		}
		console.log("IMPRIMIENDO MATRIZ");
		for(var i = 0; i < cont; i++){
			for(var j=0; j<cont; j++){
				console.log("["+matrix[i][j]+"]");
				console.log("Matriz Con Transiciones");
			}
			console.log("\n");
		}

            console.log("VERIFICANDO CADENA------------------------------------------------");
            transicionEntrantes = cadenaEntrante.split("-");

            for (var i = 0; i < transicionEntrantes.length; i++) {
              console.log("transicionEntrantes: "+transicionEntrantes[i]);
            }

            if (entradaCorrecta(transicionEntrantes)) {
              if (existeInicial) {
                if (estadosFinales.length > 0) {

                  var estadoActual = estadoInicial;

                  for (var i = 0; i < transicionEntrantes.length; i++) {
                    console.log("estado actual: "+estadoActual);
                    estadoActual = getNextState(estadoActual,transicionEntrantes[i]);
                    console.log("estado actual(despues del get): "+estadoActual);
                  }

                  if (verificadorDeAceptacion(estadoActual)) {
                    alert("cadena aceptada");
                  }else {
                    alert("cadena rechazada");
                  }

                }else
                  alert("Por favor asigne estados finales");
              }else
                alert("Por favor asigne estado incial");
            }else
              alert("Alfabeto ingresado no reconocido");

        }else
          alert("Por favor asigne valores a las aristar");
      }else
        alert("Por favor asigne estados a los nodos");
    }else
      alert("Por favor digite una cadena");
  }


  function getInitialState(initial) {
    estadoInicial=initial.text;
    existeInicial=true;
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
    if (initialState == "" || symbol == "" || finalState == "") {
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


  function comparadorDeObjetos(obj1,obj2) {
    if (JSON.stringify(obj1) === JSON.stringify(obj2))
      return true;
    return false;
  }

  function entradaCorrecta(cadena) {
    var reconocido;
    for (var i = 0; i < cadena.length; i++) {
      reconocido = false;
      for (var j = 0; j < alfabeto.length; j++) {
        if (alfabeto[j] == cadena[i])
          reconocido=true;
      }
      if(!reconocido)
        return false;
    }
    return true;
  }

  function getNextState(initialState,symbol) {
    console.log("simbolo entrante:"+symbol);
    console.log("estado recivido:"+initialState);
    for (var i = 0; i < delta.length; i++) {
      if ( comparadorDeObjetos(initialState,delta[i].getInitialState()) && comparadorDeObjetos(symbol,delta[i].getTransition()) ){
         return delta[i].getFinalState();
         console.log("concidencia encontrda");
       }
    }
    return "no encontrado";
  }

  function verificadorDeAceptacion(estadoActual) {
    for (var i = 0; i < estadosFinales.length; i++) {
      if(comparadorDeObjetos(estadoActual,estadosFinales[i]))
        return true;
    }
    return false;
  }
