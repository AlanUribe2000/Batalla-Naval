class Jugador {
    constructor(nombre) {
      this.nombre = nombre;
    }

    atacar = function(id) { 
      var fila = parseInt(id.substring(0,id.indexOf(";"))); 
      var columna = parseInt(id.substring(id.indexOf(";")+1,id.lastIndexOf(";")));

      if (this.nombre == "usuario") {
        document.getElementById(id).removeAttribute("onclick");
        if (tableroPc[fila][columna] != null) {  //Se golpeo a una embarcación
          tableroPc[fila][columna] = "acierto";
          document.getElementById(id).setAttribute("class", "bg-warning");  //Tocado en amarillo
          this.verificarEmbarques("acierto");
        } else {
          tableroPc[fila][columna] = "agua";
          document.getElementById(id).setAttribute("class", "bg-info");  //Agua en celeste
          this.verificarEmbarques("agua");
        }

      } else if (tableroJugador[fila][columna] != null && tableroJugador[fila][columna] != "agua" && tableroJugador[fila][columna] != "acierto") { //Solo la pc puede golpear una casilla en agua o en acierto, en este caso da en una embarcación
        tableroJugador[fila][columna] = "acierto";
        document.getElementById(id).setAttribute("class", "bg-warning");
        this.verificarEmbarques("acierto");
        this.espera();

      } else if(tableroJugador[fila][columna] == null){          //La pc golpea en el agua
        tableroJugador[fila][columna] = "agua";
        document.getElementById(id).setAttribute("class", "bg-info");
        this.verificarEmbarques("agua"); 

      } else{                                                    //La pc golpea en un casillero con acierto o con agua, vuelve a atacar
        id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";usuario";
        this.atacar(id);
      }
    }

    espera = async function(){
      await sleep(800);
      id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";usuario";
      jugador2.atacar(id);
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
    }

    cambioTurno = async function() {
      if (this.nombre == "usuario") {
        document.getElementById("turno").textContent = "Turno de: Pc";
        await sleep(800);
        id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";usuario";
        jugador2.atacar(id);
      } else {
        document.getElementById("turno").textContent = "Turno de: "+document.getElementById("nombre").value;
      }

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
    }

    verificarEmbarques = function(ocasion){
      var gano = true;  //verifica si el jugador o la pc ganó
      if (this.nombre == "usuario") {
        for (var i = 1; i < 16; i++) {
          for (var j = 1; j < 16; j++) {
            if (tableroPc[i][j] != null && tableroPc[i][j] != "acierto" && tableroPc[i][j] != "agua") {
              gano = false;
            }
          }
        }
      } else{
        for (var i = 1; i < 16; i++) {
          for (var j = 1; j < 16; j++) {
            if (tableroJugador[i][j] != null && tableroJugador[i][j] != "acierto" && tableroJugador[i][j] != "agua") {
              gano = false;
            }
          }
        }
      }

      if (gano) {   //Al no haber mas embarcaciones en el tablero, ya sea el jugador o la pc gana el juego
        if (this.nombre == "usuario") {
          alert("FELICIDADES!!! USTED GANÓ LA PARTIDA");
          tiempoFin = new Date();
          var inicio = tiempoInicio.getHours()+":"+tiempoInicio.getMinutes()+":"+tiempoInicio.getSeconds();
          var fin = tiempoFin.getHours()+":"+tiempoFin.getMinutes()+":"+tiempoFin.getSeconds();
          this.registrarJuego(document.getElementById("nombre").value, inicio, fin);        //Registra pero no actualiza el juego
        } else {
          alert("MALA SUERTE!!! GANÓ LA PC");
        }

        jugador1.obtenerRecordsHistoricos();

        var respuesta = confirm("¿Desea volver a jugar?");
        if (respuesta) {
            resetear("juegaDeNuevo");
        } else {
            resetear("nuevoJugador");
        }

      } else if (ocasion == "agua") {                       //Si da en el agua cambia el turno, sino sigue atacando
        this.cambioTurno();
      } 
    } 

    registrarJuego = function(nombre, tiempoInicio, tiempoFin){
      var peticion = new XMLHttpRequest();
      peticion.open("GET", "./php/registrarJuegoPeticion.php?nombre="+nombre+"&tiempoInicio="+tiempoInicio+"&tiempoFin="+tiempoFin, true);
      peticion.send(null);
    }

    obtenerRecordsJugador = function(nombre){         //Segun el nombre, debo buscar en la base de datos si tiene partidas jugadas y las muestra
      var peticion = new XMLHttpRequest();
      peticion.open("GET", "./php/historialJugadorPeticion.php?nombre="+nombre, true);
      peticion.onreadystatechange = cargoHistorialJugador;
      peticion.send(null);

      function cargoHistorialJugador(){
          if ((peticion.readyState == 4) && (peticion.status==200)){
              var myObj = JSON.parse(peticion.responseText);
              if (myObj == "") {
                alert("Jugador nuevo, no posee partidas");
              } else {
                var html = "<table class = 'table-light table-bordered border-dark tablero'>";
                html += "<td>Puesto</td>";
                html += "<td>Nombre</td>";
                html += "<td>Fecha</td>";
                html += "<td>Tiempo</td></tr>";
                for (var i = 0; i < myObj.length; i++) {
                    html += "<td>"+(i+1)+"</td>";
                    html += "<td>"+myObj[i].nombre+"</td>";
                    html += "<td>"+myObj[i].fecha+"</td>";
                    html += "<td>"+myObj[i].tiempo+"</td></tr>";
                }
                html += "</table><br>";
                document.getElementById("completar").innerHTML = html;
                $("#modalRecords").modal("show"); // abre el modal
              }
          }
      }
    }

    obtenerRecordsHistoricos = function(){
      var peticion = new XMLHttpRequest();
      peticion.open("GET", "./php/mejoresJugadoresPeticion.php?", true);
      peticion.onreadystatechange = cargoMejoresJugadores;
      peticion.send(null);

      function cargoMejoresJugadores(){
          if ((peticion.readyState == 4) && (peticion.status==200)){
              var myObj = JSON.parse(peticion.responseText);
              var html = "<table class = 'table-light table-bordered border-dark tablero'>";
              html += "<td>Puesto</td>";
              html += "<td>Nombre</td>";
              html += "<td>Fecha</td>";
              html += "<td>Tiempo</td></tr>";
              for (var i = 0; i < myObj.length; i++) {
                  html += "<tr><td>"+(i+1)+"</td>";
                  html += "<td>"+myObj[i].nombre+"</td>";
                  html += "<td>"+myObj[i].fecha+"</td>";
                  html += "<td>"+myObj[i].tiempo+"</td></tr>";
              }
              html += "</table><br>";

              document.getElementById("recordsHistoricos").innerHTML = html;
              $("#modalRecordsHistoricos").modal("show"); // abre el modal
          }
      }
    }
}