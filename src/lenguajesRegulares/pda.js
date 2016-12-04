var estados = new Array();
var alfabeto = [];
var estadoInicial = false
var existeInicial = false;
var estadosFinales = new Array();
var pila = [];
var pilavacia = '$';
var transiciones = new Array();
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
	console.log(paths);
	console.log("Alfabeto "+ alfabeto);
	console.log("Estado Incial "+ estadoInicial);
	console.log("Estado Final "+ estadosFinales);
}

function stackAction(pop,push){
	var newpila = [];
	if(pila.length == 0 && pop == ' '){
		pila[pila.length-1] = push;
	}else{
		if(pila[pila.length-1] == pop){
			if(push != ' '){
				pila[pila.length-1] = push;
			}else{
				for (var i = 0; i < pila.length-1; i++) {
					newpila[i] = pila[i]
				}
			}
		}else if(pila[pila.length-1] == ' '){
			if(push != ' '){
				pila[pila.length-1] = push;
			}else{
				for (var i = 0; i < pila.length-1; i++) {
					newpila[i] = pila[i]
				}
			}
		} 
	}
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
