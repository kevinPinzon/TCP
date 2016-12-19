var estados = new Array();
var alfabeto = [];
var estadoInicial = '';
var estadosFinales = new Array();
var transiciones = new Array();
var pathsTOaccept = [[]];
var paths = [];
var input = '';
var hayInicial = false;

function ProbarCadenaNFA(){
  var valEstados = true;
  var valTransiciones = true;
  var valEstadoInicial = true;
  var valEstadosFinales = true;
  estados = nodes;
  for (var i = 0; i < estados.length; i++) {
    if(estados[i].text.length > 1 || estados[i].text == ' ' ||estados[i].text == ''){
      valEstados = false;
      window.alert("Los estados deben de contener almenos 1 caracter y no estar vacios");
      break;
    }
  }
  if(estados.length == 0){
    window.alert("No hay Estados");
    valEstados = false;
  }
  if(valEstados == true){
    transiciones = links;
    if(links.length < 2){
      window.alert("La cantidad de transiciones no es adecuada");
      valTransiciones =  false;
    }
    if(valTransiciones == true){
      alfabeto = getAlfabeto();
      estadoInicial = getIntialState();
      if(hayInicial == false){
        window.alert("No hay Estado Inicial");
        valEstadoInicial = false;
      }
      if(valEstadoInicial == true){
        estadosFinales = getFinalStates();
        if(estadosFinales.length == 0){
          window.alert("No hay Estados Finales");
          valEstadosFinales = false;
        }
        if(valEstadosFinales == true){
          input = document.getElementById("inputCadena").value;
          console.log("Va a Build el Path")
          paths = CreacionPath();
          console.log("BUILDED")
          if(paths != null){
            console.log("Va a ordenar")
            paths = OrderNormalPaths();
            console.log(paths);
            pathsTOaccept = buildPathsToAccept();
            console.log(pathsTOaccept)
            if(RecorrerCadena() == true){
              window.confirm("La cadena es aceptada");
              console.log("La cadena es aceptada");
            }else{
              window.confirm("La cadena es RECHAZADA");
              console.log("La cadena es rechazada");
            }
            console.log(paths);
            console.log("Alfabeto "+ alfabeto);
            console.log("Estado Incial "+ estadoInicial);
            console.log("Estado Final "+ estadosFinales);
          }
        }
      }
    }
  }
}

function RecorrerCadena(){
  console.log("ENTRO A RECORRER "+input);
  var IsAccepted = false;
  var currentState = '';
  
  //Matriz de todos los posibles caminos para un estado final
  console.log("pahts2accept "+pathsTOaccept.length);
  var pathTry = 0;
  while(pathTry < pathsTOaccept.length && IsAccepted == false){
    currentState = estadoInicial;
    var Fail =  false;
    var InputCont = 0;
    while(InputCont <= input.length && Fail == false){
      console.log("WHILE INPUt CONT");
      console.log(InputCont);
      console.log("CUrrent State");
      console.log(currentState);
      var contErr = 0;
      var CambioDeEstado = false;
      for (var i = 0; i < pathsTOaccept[pathTry].length; i++) {
        if(((pathsTOaccept[pathTry])[i])[0] == currentState && ((pathsTOaccept[pathTry])[i])[1] == input[InputCont]){
          console.log("ACTUAL PATH");
          console.log(((pathsTOaccept[pathTry])[i]));
            currentState = ((pathsTOaccept[pathTry])[i])[2];
            CambioDeEstado = true;
            InputCont++;
            break;
        }else if(((pathsTOaccept[pathTry])[i])[0] == currentState && ((pathsTOaccept[pathTry])[i])[1] == ' '){
          console.log("ACTUAL PATH EPSILOOOON");
          console.log(((pathsTOaccept[pathTry])[i]));
          if(((pathsTOaccept[pathTry])[i])[2] == estadoInicial && ReachedFinalState(((pathsTOaccept[pathTry])[i])[2]) == true){
            if(input.length == 1 && input[0] == ' '){
              IsAccepted  = true; 
              break;
            }else{
              Fail = true;
              break;
            }
          }else{
            currentState = ((pathsTOaccept[pathTry])[i])[2];
            CambioDeEstado = true;
            break;
          }
        }else{
          contErr++;
        }
        if(CambioDeEstado == true){
          break;
        }
      }
      if(contErr >= pathsTOaccept[pathTry].length){
        console.log("Entro SUPER FAIL")
        Fail =  true;
        break;
      }
    }
    console.log(InputCont)
    console.log(currentState)
    console.log(ReachedFinalState(currentState))
    if(InputCont == input.length&& ReachedFinalState(currentState) == true){
      IsAccepted = true;
      break;
    }
    pathTry++;
  }
  return IsAccepted;

}

function buildPathsToAccept(){
  var currentState = '';
  var initialState = '';
  var pathsToaccept = [];
  var contador = ContadorCaminosHaciaEstadosFinales();
  for (var i = 0; i < contador; i++) {
    pathsToaccept[i] = [];
  }
  //identifica el estado inicial
  for (var i = 0; i < estados.length; i++) {
    if(estados[i].text == estadoInicial){
      currentState = estados[i].text;
      initialState = estados[i].text;
      break;
    }
  }
  var rowAcceptedPath = 0;
  while(rowAcceptedPath < contador){
    var current_accepted_path = [];
    var contcurrent_accepted_path = 0;
    var reachedFinalstate = false;
    for(var i = 0; i < paths.length; i++){
      if((paths[i])[0] == currentState){
        if(rowAcceptedPath > 0){
          if(PathCheck(pathsToaccept,paths[i]) == true){
            current_accepted_path[contcurrent_accepted_path] = paths[i];
            currentState = (paths[i])[2]; 
            contcurrent_accepted_path++;
            if(ReachedFinalState(currentState) == true){
              reachedFinalstate = true;   
            }
          }
        }else{
          if(ReachedFinalState(currentState) == true){
              reachedFinalstate = true;
              current_accepted_path[contcurrent_accepted_path] = (paths[i])[0]+"   "+(paths[i])[0];
              currentState = (paths[i])[2];
              contcurrent_accepted_path++;
              
          }else{
            current_accepted_path[contcurrent_accepted_path] = paths[i];
            currentState = (paths[i])[2];
            contcurrent_accepted_path++;
            if(ReachedFinalState(currentState) == true){
              reachedFinalstate = true;
              
            }
          } 
        }
        if(reachedFinalstate == true){
            break;
        }
      }
      if(reachedFinalstate == true){
        break;
      }
    }
    if(reachedFinalstate == true){
      if(ReachedFinalState(currentState) == true){
        current_accepted_path = CheckSelfLinksinFinal(current_accepted_path,currentState);
      }
      for (var j = 0; j < current_accepted_path.length; j++) {
        pathsToaccept[rowAcceptedPath][j] = current_accepted_path[j];   
      }
      rowAcceptedPath++;
    }
    currentState = initialState;
  }
  return pathsToaccept;
}

function CheckSelfLinksinFinal(Recievedcurrent_accepted_path,RecievedcurrentState){
  var lengthOfcurrent_accepted_path = Recievedcurrent_accepted_path.length;
  for (var i = 0; i < paths.length; i++) {
    if((paths[i])[0] == RecievedcurrentState && (paths[i])[2] == RecievedcurrentState){
      Recievedcurrent_accepted_path[lengthOfcurrent_accepted_path] = paths[i];
      lengthOfcurrent_accepted_path++;
    }
  }
  return Recievedcurrent_accepted_path;
}

function PathCheck(receivedpathsToaccept, receivedpath){
  var AcceptedPath = false;
  var yaExiste = false;
  for (var i = 0; i < receivedpathsToaccept.length; i++) {
    for (var j = 0; j < receivedpathsToaccept[i].length; j++) {
      if((receivedpathsToaccept[i])[j] == receivedpath){
        yaExiste = true;
        break;
      }
    }
    if(yaExiste == true){
      break;
    }
  }
  var RevisarDespues = false;
  var encontradoDespues = false;

  if(yaExiste == true){
    for (var i = 0; i < paths.length; i++) {
      if(RevisarDespues == true){
        if((paths[i])[0] == receivedpath[0]){
          encontradoDespues = true;
          break;
        }
      }
      if( paths[i] == receivedpath){
        RevisarDespues = true;
      }
    }
    if(encontradoDespues == true){
      AcceptedPath = false;
    }else{
      AcceptedPath = true;
    }
  }else{
    AcceptedPath = true;
  }
  
  return AcceptedPath;
}

function ContadorCaminosHaciaEstadosFinales(){
  var contador = 0;
  for (var i = 0; i < estadosFinales.length; i++) {
    for (var j = 0; j < paths.length; j++) {
      if((paths[j])[2] == estadosFinales[i] && (paths[j])[2] != (paths[j])[0]){
        contador++;
      }
    }
  }

  for (var i = 0; i < estados.length; i++) {
    if(estados[i].text == estadoInicial && estados[i].isAcceptState == true){
      contador++;
    }
  }
  return contador;
}

function OrderNormalPaths(){
  var temppaths = [];
  var tempstates = [];
  var tempstate = '';
  for (var i = 0; i < estados.length; i++) {
    tempstates[i] = estados[i].text;
  }
  for (var i = 0; i < tempstates.length; i++) {
    if(tempstates[i] == estadoInicial){
      tempstate = tempstates[0];
      tempstates[0] = tempstates[i];
      tempstates[i] = tempstate;
      break;
    }
  }
  var contTempPaths = 0;
  while(contTempPaths < paths.length){
    for (var i = 0; i < tempstates.length; i++) {
      for (var j = 0; j < paths.length; j++) {
        if((paths[j])[0] == tempstates[i]){
          temppaths[contTempPaths] = paths[j];
          contTempPaths++;
        }
      }
    }
  }
  currentState = estadoInicial;
  var posIntercambio = 0;
  var temppath = '';
  for(var i = 0; i < temppaths.length; i++){
    if((temppaths[i])[0] == currentState){
      
      if((temppaths[i])[0] == (temppaths[i])[2]){
        temppath = temppaths[i-posIntercambio];
        temppaths[i-posIntercambio] = temppaths[i];
        temppaths[i] = temppath;
      }
      posIntercambio++;
    }else{
      currentState = (temppaths[i])[0];
      posIntercambio = 0;
      if((temppaths[i])[0] == (temppaths[i])[2]){
        temppath = temppaths[i-posIntercambio];
        temppaths[i-posIntercambio] = temppaths[i];
        temppaths[i] = temppath;
      }
    }
  }

  currentState = estadoInicial;
  posIntercambio = 0;
  temppath = '';
  for(var i = 0; i < temppaths.length; i++){
    if((temppaths[i])[0] == currentState){
      posIntercambio++;
      if((temppaths[i])[0] == (temppaths[i])[2] && temppaths[i-posIntercambio] != null){
        temppath = temppaths[i-posIntercambio];
        temppaths[i-posIntercambio] = temppaths[i];
        temppaths[i] = temppath;
      }
      
    }else{
      currentState = (temppaths[i])[0];
      posIntercambio = 0;
      if((temppaths[i])[0] == (temppaths[i])[2] && temppaths[i-posIntercambio] != null){
        temppath = temppaths[i-posIntercambio];
        temppaths[i-posIntercambio] = temppaths[i];
        temppaths[i] = temppath;
      }
    }
  }
  return  temppaths;
}

function ReachedFinalState(recievedState){
  var reachedFinal = false;
  for (var i = 0; i < estadosFinales.length; i++) {
    if(recievedState == estadosFinales[i]){
      reachedFinal = true;
      break;
    }
  }

  return reachedFinal;
}

function CreacionPath(){
  var stateANDtransition = [];
  var visitedStates = [];
  var cantVisitedStates = 0;
  var nextStates = [];
  var cantNextStates = 1;
  var modifiedStateANDTransition = [];
  var hayInicial = false;
  var valTransicionCorrecta = true;
  //empieza por el estado INICIAL
  console.log("ESTADO INCI "+estadoInicial);
  for (var i = 0; i < estados.length; i++) {
    if(estados[i].text == estadoInicial){
      hayInicial = true;
      nextStates[0] = estados[i].text;
      break;
    }
  }

  for (var i = 0; i < transiciones.length; i++) {
    if(transiciones[i].text.length != 1){
      if(transiciones[i] instanceof Link || transiciones[i] instanceof SelfLink ){
        valTransicionCorrecta = false;
      }
      break;
    }
  }
  console.log("CANT TRANS PATH");
  console.log(transiciones.length);
  if(valTransicionCorrecta == true){
    var pos = 0;
    for (var i = 0; i < transiciones.length; i++) {
      if(transiciones[i] instanceof Link){
        modifiedStateANDTransition[pos] = transiciones[i].nodeA.text+""+transiciones[i].text[0]+""+transiciones[i].nodeB.text;
        pos++;
      }else if(transiciones[i] instanceof SelfLink){
        modifiedStateANDTransition[pos] = transiciones[i].node.text+""+transiciones[i].text[0]+""+transiciones[i].node.text;
        pos++;
      }
      
    }
    console.log("MOD SHIT")
    console.log(modifiedStateANDTransition)
    return modifiedStateANDTransition;
  }else{
    window.alert("Posee una o mas trancisiones incorrectas, estas deben de contener solamente un caracter");
  }
}

function getAlfabeto(){
  var newalfabeto = [];
  var posicionAlfabeto = 0;
  var sybmoltext='';

  for (var i = 0; i <transiciones.length; i++) {
    if(transiciones[i].text!=''){
      sybmoltext = transiciones[i].text;
      var symbolEqual = false;
      for (var j = 0; j < newalfabeto.length; j++) {
        if(newalfabeto[j] == sybmoltext[0]){
          symbolEqual = true;
          break;
        }
      }
      if(symbolEqual == false){
        newalfabeto[posicionAlfabeto]=sybmoltext[0];
        posicionAlfabeto++;
      }
    }
  }
  return newalfabeto;
}

function getIntialState(){
  var newestadoInicial;
  var contEntrada = 0;
  console.log("Entra Inicial")
  for (var i = 0; i < nodes.length; i++) {
    if(nodes[i].isInitial == true && contEntrada == 0){
      contEntrada++;
      newestadoInicial = nodes[i].text;
      console.log("SI HAY");
      hayInicial = true;
    }
  }
  console.log("INCIAL "+hayInicial);
  if(contEntrada > 1){
    hayInicial = false;
    window.alert("No puede existir mas de un estado Inicial");
    return null;
  }else{
    return newestadoInicial;
  }
  
}

function getFinalStates(){
  var newestadoFinalArray = new Array();
  var newestadoFinal;
  for (var i = 0; i < nodes.length; i++) {
    if(nodes[i].isAcceptState == true){
      newestadoFinal = nodes[i].text;
      newestadoFinalArray.push(newestadoFinal);
    }
  }
  return newestadoFinalArray;
}
