window.onload = function() {
  document.getElementById("btnProbarCFG").onclick = function() {probarCFG()};
}

function probarCFG(){
  console.log("setiando 4tuplas");
  var gramatica = new Cfg();
  gramatica.setNoTerminales();
  gramatica.setTerminales();
  
}
