var estados = new Array();
var alfabeto = [];
var estadoInicial = '';
var existeInicial = false;
var estadosFinales = new Array();
var pila = [];
var transiciones = new Array();
var pathsTOaccept = [[]];
var paths = [];
var input = '';

function ProbarCadenaPDA(){
	estados = nodes;
	transiciones = links;
	alfabeto = getAlfabeto();
	estadoInicial = getIntialState();
	existeInicial = false;
	estadosFinales = getFinalStates();
	input = document.getElementById("inputCadena").value;
	pila = [];
	paths = Paths();
	paths = OrderNormalPaths();
	pathsTOaccept = buildPathsToAccept();
	console.log(pathsTOaccept);
	if(RecorrerCadena() == true){
		console.log("La cadena es aceptada");
	}else{
		console.log("La cadena es rechazada");
	}
	console.log(paths);
	console.log("Alfabeto "+ alfabeto);
	console.log("Estado Incial "+ estadoInicial);
	console.log("Estado Final "+ estadosFinales);
}

function RecorrerCadena(){
	console.log("ENTRO A RECORRER "+input);
	var IsAccepted = false;
	var currentState = '';
	
	//Matriz de todos los posibles caminos para un estado final
	console.log("pahts2accept "+pathsTOaccept.length);
	for (var i = 0; i < pathsTOaccept.length; i++) {
		//identifica el estado inicial
		currentState = estadoInicial;
		for (var j = 0; j < input.length; j++) {
			var EpsilonPath = false;
			for (var k = 0; k < pathsTOaccept[i].length; k++) {
				//IF para ver que path tiene el current State
				if(currentState == ((pathsTOaccept[i])[k])[0]){
					//IF que verifica si el input esta dentro del state en el path
					if(input[j] == ((pathsTOaccept[i])[k])[1]){
						stackAction(((pathsTOaccept[i])[k])[2],((pathsTOaccept[i])[k])[3]);
						currentState = ((pathsTOaccept[i])[k])[4];
						EpsilonPath = false;
						break;
					}else if(((pathsTOaccept[i])[k])[1] == ' '){
						stackAction(((pathsTOaccept[i])[k])[2],((pathsTOaccept[i])[k])[3]);
						currentState = ((pathsTOaccept[i])[k])[4];
						EpsilonPath = true;
						break;
					}
				}
				if(EpsilonPath == true){
					break;
				}
			}
		}
		if(pila.length == 0 && ReachedFinalState(currentState) == true){
			IsAccepted = true;
			break;
		}
		clearPila();
	}
	return IsAccepted;
}

function clearPila(){
	var newPila = []
	pila = newPila;
}

function stackAction(pop,push){
	var newpila = [];
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
	}
	return newpila;
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
	console.log(paths);
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
							break;
						}
					}
				}else{
					if(ReachedFinalState(currentState) == true){
							reachedFinalstate = true;
							current_accepted_path[contcurrent_accepted_path] = (paths[i])[0]+"   "+(paths[i])[0];
							currentState = (paths[i])[4];
							contcurrent_accepted_path++;
							break;
					}else{
						current_accepted_path[contcurrent_accepted_path] = paths[i];
						currentState = (paths[i])[4];
						contcurrent_accepted_path++;
						if(ReachedFinalState(currentState) == true){
							reachedFinalstate = true;
							break;
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
			for (var j = 0; j < current_accepted_path.length; j++) {
				pathsToaccept[rowAcceptedPath][j] = current_accepted_path[j];		
			}
			rowAcceptedPath++;
		}
		currentState = initialState;
	}
	return pathsToaccept;
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
		 	if((paths[j])[4] == estadosFinales[i]){
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
	//empieza por el estado INICIAL
	for (var i = 0; i < estados.length; i++) {
		if(estados[i].text == estadoInicial){
			hayInicial = true;
			nextStates[0] = estados[i].text;
			break;
		}
	}

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
	return modifiedStateANDTransition;
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
	for (var i = 0; i < nodes.length; i++) {
		if(nodes[i].isInitial == true){
			newestadoInicial = nodes[i].text;
		}
	}
	return newestadoInicial;
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
