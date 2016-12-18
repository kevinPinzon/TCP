function Cfg(noTerminales,terminales,reglas,inicial) {
  this.noTerminales=noTerminales;
  this.terminales=terminales;
  this.reglas=reglas;
  this.inicial=inicial;

  this.setNoTerminales = function(){
    this.reglas = new Array();

    var inputV = document.getElementById("inputV").value;
    var entradaIncorrecta=false;
    if (inputV != "") {
      for (var i = 0; i < inputV.length; i++) {
        if (inputV[i] == '0' || inputV[i] == '1' || inputV[i] == '2' || inputV[i] == '3' ||
        inputV[i] == '4' || inputV[i] == '5' || inputV[i] == '6' || inputV[i] == '7' || inputV[i] == '8' ||
        inputV[i] == '9' ) {
          entradaIncorrecta=true;
        }
      }
      if (!entradaIncorrecta) {
        this.noTerminales = inputV.split(",");
        console.log("Variables no terminales");
        for (var i = 0; i < this.noTerminales.length; i++) {
          console.log(this.noTerminales[i]);
        }
      }else {
        alert("Entada incorrecta, revise las variables no terminales");
      }
    }else
      alert("Por favor digite variables no terminales");
  }

  this.setTerminales=function(){
    var entradaIncorrecta=false;
    var inputE = document.getElementById("inputE").value;
    if (inputE != "") {
      this.terminales = inputE.split(",");
      console.log("Variables terminales");
      for (var i = 0; i < this.terminales.length; i++)
        console.log(this.terminales[i]);
    }else
      alert("Por favor digite variables terminales");
  }

  this.setInicial = function(){
    if (this.noTerminales != null)
      this.inicial = this.noTerminales[0];
  }

  this.setReglas = function(){
    var reglaTemporal = new Regla("","");
    var inputR = document.getElementById("inputR").value;
    if (inputR != "" || inputR.length > 1) {
      if (this.noTerminales != null || this.terminales != null || this.inicial != null) {
        if (inputR[1] == '>') {
          for (var i = 0; i < this.noTerminales.length; i++) {
            if (inputR[0]==this.noTerminales[i]) {
              reglaTemporal.inicial = inputR[0];
            }
          }
        }else {
          alert("formato de regla incorrecto, input vacio");
        }
      }
      for (var i = 2; i < inputR.length; i++) {
        for (var j = 0; j < this.noTerminales.length; j++) {
          if (inputR[i]==this.noTerminales[j]) {
            reglaTemporal.final += inputR[i];
          }
        }
        for (var j = 0; j < this.terminales.length; j++) {
          if (inputR[i]==this.terminales[j]) {
            reglaTemporal.final += inputR[i];
          }
        }
      }
      console.log( reglaTemporal.toString() );
      if ( (reglaTemporal.final != "" || reglaTemporal.final != null)
        && (reglaTemporal.inicial != "" || reglaTemporal.inicial != null ) ) {
        console.log( reglaTemporal.toString() );
        this.reglas.push(reglaTemporal);
        console.log("Reglas guardadas:");
        for (var i = 0; i < this.reglas.length; i++) {
          console.log( this.reglas[i].toString() );
        }
      }else {
        alert("formato de regla incorrecto, no se ha guardado");
      }

    }else {
      alert("formato de regla incorrecto, no se ha guardado");
    }

  }

  this.getNoTerminales = function(){
    return this.noTerminales;
  }

  this.getTerminales = function(){
    return this.terminales;
  }

  this.getInicial = function(){
    return this.inicial;
  }
}
