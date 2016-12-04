var estados = new Array();
var alfabeto = [];
var estadoInicial = false
var existeInicial = false;
var estadosFinales = new Array();
var pila = [];
var pilavacia = '$';
var transiciones = new Array();
var paths = new Array();
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
	paths = new Array();
	console.log("IGUAL? "+ truefalse);
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
	var newpath = new Array(); 
	var currentState = '';
	var transicionToNextState = '';
	var cantEstados = estados.length;
	var cantTrans = transiciones.length;
	//empieza por el estado INICIAL
	for (var i = 0; i < estados.length; i++) {
		if(estados[i].text == estadoInicial){
			currentState = estados[i].text;
			break;
		}
	}
	for (var i = 0; i < transiciones.length; i++) {
		if(transiciones[i].nodeA.text == currentState)
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
