function Cfg(noTerminales,terminales,reglas,inicial) {
  this.noTerminales=noTerminales;
  this.terminales=terminales;
  this.reglas=reglas;
  this.inicial=inicial;

  this.setNoTerminales = function(){
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
    this.inicial = this.noTerminales[0];
  }

  this.getNoTerminales = function(){
    return this.noTerminales;
  }

  this.getTerminales = function(){
    return this.terminales;
  }

}
