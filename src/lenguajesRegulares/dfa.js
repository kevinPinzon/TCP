  var states = new Array();

  function myFunction() {
    var cadenaEntrante = document.getElementById("inputCadena").value;
    for (var i = 0; i < states.length; i++)
      console.log("estado["+i+"]: "+states[i]);
    if (cadenaEntrante != "") {

    }else {
      console.log("Por favor digite una cadena");
    }
  }

  function getState(Newstate) {
    console.log("entrando");
    var insertar=true;
    if (states.length == 0)
      states[0]=Newstate;
    for (var i = 0; i < states.length; i++) {
      if (states[i]==Newstate || ""==Newstate)
        insertar=false;
    }
    if (insertar)
      states[states.length]=Newstate;
  }
