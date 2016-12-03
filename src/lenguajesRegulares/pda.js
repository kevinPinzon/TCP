var estados = new Array();
var alfabeto = [];
var estadoInicial = false
var existeInicial = false;
var estadosFinales = new Array();
var pila = new Array();
var pilavacia = '$';
var transiciones = new Array();

function ProbarCadenaPDA(){
	estados = nodes;
	transiciones = links;
	alfabeto = getAlfabeto();
	estadoInicial = false
	existeInicial = false;
	estadosFinales = new Array();
	pila = new Array();
	console.log("Alfabeto "+ alfabeto);
}

function getAlfabeto(){
	var newalfabeto = [];
	var posicionAlfabeto = 0;

	for (var i = 0; i <transiciones.length; i++) {
		if(transiciones[i].text!=''){
			var symbolEqual = false;
			for (var j = 0; j < newalfabeto.length; j++) {
				if(newalfabeto[j]==transiciones[i].text){
					symbolEqual = true;
					break;
				}
			}
			if(symbolEqual == false){
				newalfabeto[posicionAlfabeto]=transiciones[i].text;
				posicionAlfabeto++;
			}
		}
	}
	return newalfabeto;
}
