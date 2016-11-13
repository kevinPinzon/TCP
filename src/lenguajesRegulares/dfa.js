  var states = new Array();

  function myFunction() {
    var cadenaEntrante = document.getElementById("inputCadena").value;
    if (cadenaEntrante != "") {

    }else {
      console.log("Por favor digite una cadena");
    }
  }

  function getState(Newstate) {
    var insertar=true;
    if (states.length == 0) {
      states[0]=Newstate;
    }
    for (var i = 0; i < states.length; i++) {
      if (states[i]==Newstate)
        insertar=false;
    }
    if (insertar)
      states[states.length+1]=state;
    for (var i = 0; i < states.length; i++)
      console.log("estado: "+states[i]);
    console.log(states.length);
  }
