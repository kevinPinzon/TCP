var estados = new Array();
var alfabeto = [];
var estadoInicial = '';
var estadosFinales = new Array();
var pila = [];
var pilavacia;
var transiciones = new Array();
var pathsTOaccept = [[]];
var paths = [];
var input = '';
var hayInicial = false;

function ProbarCadenaPDA(){
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
		if(links.length == 0){
			window.alert("No hay transiciones");
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
					pila = [];
					console.log("Va a Build el Path")
					paths = Paths();
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
	for (var i = 0; i < pathsTOaccept.length; i++) {
		currentState =  estadoInicial;
		var StackFAIL = false;
		clearPila();
		var contInput = 0;
		for (var j = 0; j < pathsTOaccept[i].length; j++) {
			if(((pathsTOaccept[i])[j])[0] == currentState){
				console.log("CURRENT PATH "+((pathsTOaccept[i])[j]));
				console.log("CURRENT STATE "+currentState);
				console.log("CURRENT PATH INPUT "+((pathsTOaccept[i])[j])[1]);
				console.log("INPUT PUTSIDE "+input[contInput]);
				console.log("QUE HAY PILA ")
				if(((pathsTOaccept[i])[j])[1] == input[contInput]){
					if(stackAction(((pathsTOaccept[i])[j])[2],((pathsTOaccept[i])[j])[3]) == true){
						console.log("PILA");
						console.log(pila);
						console.log("INPUT "+input[contInput])	
						console.log("INPUT AFTER "+input[contInput])
						console.log("CURRENT STATE INSIDE IF "+currentState);
						if(currentState == ((pathsTOaccept[i])[j])[4] && input[contInput+1] == ((pathsTOaccept[i])[j])[1]){
							j--;
						}
						contInput++;
						currentState = ((pathsTOaccept[i])[j])[4];
					}else{
						StackFAIL = true;
					}
				}else if(((pathsTOaccept[i])[j])[1] == ' '){
					if(stackAction(((pathsTOaccept[i])[j])[2],((pathsTOaccept[i])[j])[3]) == true){
						console.log("PILA");
						console.log(pila);
						currentState = ((pathsTOaccept[i])[j])[4];
					}else{
						StackFAIL = true;
					}
				}
				console.log("NEXT STATE "+currentState);
			}
			if(StackFAIL == true){
				console.log("ETNRO A FALI");
				console.log(StackFAIL)
				break;
			}
		}
		//IF que verifica si ya se recorrio toda la cadena, la pila quedo vacia y si el estado alcanzado es de aceptación
		console.log("STATE FINAL "+currentState);
		console.log("CONT "+contInput);
		console.log("INPUT L "+input.length);
		console.log("PILA L "+pila.length);
		if(pila.length == 0 && contInput == input.length && ReachedFinalState(currentState) == true){
			IsAccepted = true;
			break;
		}
	}
	
	return IsAccepted;
}

function clearPila(){
	var newPila = []
	pila = newPila;
}

function stackAction(pop,push){
	var newpila = [];
	var CorrectUse = true;
	if(pop == ' '){
		if(push != ' '){
			pila.length++;
			pila[pila.length-1] = push;
		}else{
			for (var i = 0; i < pila.length-1; i++) {
				newpila[i] = pila[i];
			}
			pila = newpila;
		}
	}else if(pila[pila.length-1] == pop){
		if(push != ' '){
			pila[pila.length-1] = push;	
		}else{
			for (var i = 0; i < pila.length-1; i++) {
				newpila[i] = pila[i];
			}
			pila = newpila;
		}
	}else{
		CorrectUse = false;
	}

	return CorrectUse
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
						currentState = (paths[i])[4];	
						contcurrent_accepted_path++;
						if(ReachedFinalState(currentState) == true){
							reachedFinalstate = true;		
						}
					}
				}else{
					if(ReachedFinalState(currentState) == true){
							reachedFinalstate = true;
							current_accepted_path[contcurrent_accepted_path] = (paths[i])[0]+"   "+(paths[i])[0];
							currentState = (paths[i])[4];
							contcurrent_accepted_path++;
							
					}else{
						current_accepted_path[contcurrent_accepted_path] = paths[i];
						currentState = (paths[i])[4];
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
		if((paths[i])[0] == RecievedcurrentState && (paths[i])[4] == RecievedcurrentState){
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
		 	if((paths[j])[4] == estadosFinales[i] && (paths[j])[4] != (paths[j])[0]){
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
			posIntercambio++;
			if((temppaths[i])[0] == (temppaths[i])[4]){
				temppath = temppaths[i-posIntercambio];
				temppaths[i-posIntercambio] = temppaths[i];
				temppaths[i] = temppath;
			}
		}else{
			currentState = (temppaths[i])[0];
			posIntercambio = 0;
			if((temppaths[i])[0] == (temppaths[i])[4]){
				temppath = temppaths[i-posIntercambio];
				temppaths[i-posIntercambio] = temppaths[i];
				temppaths[i] = temppath;
			}
		}
	}
	return 	temppaths;
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

function Paths(){
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
		if(transiciones[i].text.length != 5 && transiciones[i] instanceof Link){
			valTransicionCorrecta = false;
			break;
		}
	}

	if(valTransicionCorrecta == true){
		var cantStateANDTransition = 0;
		while(cantStateANDTransition < transiciones.length && hayInicial == true){
			//for para moverse entre los diferentes estados posibles
			for (var i = 0; i < cantNextStates; i++) {
				visitedStates[cantVisitedStates] = nextStates[i];
				//For para recorrer todas las transiciones
				for (var j = 0; j < transiciones.length; j++) {
					//IF para ver si es LINK
					if(transiciones[j] instanceof Link){
						//IF para ver si el nodo izquierdo es igual al estado en el que estamos
						if(transiciones[j].nodeA.text == nextStates[i]){
							//se revisa si el nodo derecho ya esta dentro de los estados visitados
							var truefalse = false;
							for (var k = 0; k < visitedStates.length; k++) {
								if(visitedStates[k] == transiciones[j].nodeB.text){
									truefalse = true;
									break;
								}
							}
							//IF para ingresar un estado siguiente o no
							if(truefalse == false){
								nextStates[cantNextStates] = transiciones[j].nodeB.text;
								cantNextStates++;
							}
							stateANDtransition[cantStateANDTransition] = nextStates[i]+""+transiciones[j].text[0]+""+transiciones[j].text[2]+""+transiciones[j].text[4]+""+transiciones[j].nodeB.text;
							cantStateANDTransition++;
						}
					//ELSE IF para ver si es SELFLINK
					}else if(transiciones[j] instanceof SelfLink){
						if(transiciones[j].node.text == nextStates[i]){
							//se revisa si el nodo derecho ya esta dentro de los estados visitados
							var truefalse = false;
							for (var k = 0; k < visitedStates.length; k++) {
								if(visitedStates[k] == transiciones[j].node.text){
									truefalse = true;
									break;
								}
							}
							//IF para ingresar un estado siguiente o no
							if(truefalse == false){
								nextStates[cantNextStates] = transiciones[j].node.text;
								cantNextStates++;
							}
							stateANDtransition[cantStateANDTransition] = nextStates[i]+""+transiciones[j].text[0]+""+transiciones[j].text[2]+""+transiciones[j].text[4]+""+transiciones[j].node.text;
							cantStateANDTransition++;
						}
					}
				}
				cantVisitedStates++;
			}
		}
		for (var i = 0; i < (stateANDtransition.length/2); i++) {
			modifiedStateANDTransition[i] = stateANDtransition[i];
		}
		console.log("MOD AND TRANS");
		console.log(modifiedStateANDTransition);
		return modifiedStateANDTransition;
	}else{
		window.alert("Posee una o mas trancisiones incorrectas, estas deben de ser escritas de esta manera \"1,0,0\" input,pop,push y para transiciones epsilon dejar espacio en blanco \"1, ,0\"");
		return null;
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
