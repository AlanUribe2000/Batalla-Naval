class Embarcacion {
    constructor(tipo, orientacion, largo, color) {
      this.tipo = tipo;
      this.orientacion = orientacion;
      this.largo = largo;
      this.color = color;
      this.embarcacion;
    }

    insertarEmbarcacion = function(embarcacion, id){
        this.embarcacion = embarcacion;
        var fila = parseInt(id.substring(0,id.indexOf(";"))); 
        var columna = parseInt(id.substring(id.indexOf(";")+1,id.lastIndexOf(";")));

        if (this.embarcacion.orientacion == "horizontal") {
            if (this.embarcacion.tipo == "acorazado") {
                if (columna + parseInt(this.embarcacion.largo) <= 16) {   
                    this.probarEntra(fila, columna, "horizontal", embarcacion, id);
                } else {  
                    if (id.indexOf("usuario") != -1) {
                        alert("No entra el acorazado, se sale fuera de los límites");
                    } else {
                        id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";pc";
                        this.insertarEmbarcacion(embarcacion, id);
                    }  
                }
            } else{                                                       //En horizontal solo puede ir el destructor
                if (columna + parseInt(this.embarcacion.largo) <= 16) {   
                    this.probarEntra(fila, columna, "horizontal", embarcacion, id);
                } else {  
                    if (id.indexOf("usuario") != -1) {
                        alert("No entra el destructor, se sale fuera de los límites");
                    } else {
                        id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";pc";
                        this.insertarEmbarcacion(embarcacion, id);
                    }  
                }
            } 
        } else if (this.embarcacion.orientacion == "vertical"){
            if (this.embarcacion.tipo == "acorazado") {
                if (fila + parseInt(this.embarcacion.largo) <= 16) {   
                    this.probarEntra(fila, columna, "vertical", embarcacion, id);
                } else {  
                    if (id.indexOf("usuario") != -1) {
                        alert("No entra el acorazado, se sale fuera de los límites");
                    } else {
                        id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";pc";
                        this.insertarEmbarcacion(embarcacion, id);
                    }  
                }
            } else{                                                       //En horizontal solo puede ir el destructor
                if (fila + parseInt(this.embarcacion.largo) <= 16) {  
                    this.probarEntra(fila, columna, "vertical", embarcacion, id);
                } else {  
                    if (id.indexOf("usuario") != -1) {
                        alert("No entra el destructor, se sale fuera de los límites");
                    } else {
                        id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";pc";
                        this.insertarEmbarcacion(embarcacion, id);
                    }  
                }
            } 
        } else{
            this.probarEntra(fila, columna, "cuadrado", embarcacion, id);
        }
    }

    rellenar = function(fila, columna, direccion, cant, jugador, embarcacion, tablero){
        if (direccion == "horizontal") {
            for (var i = 0; i < cant; i++) {
                if (jugador == "usuario") {
                    var celda = document.getElementById(fila + ";" + columna + ";" + jugador);
                    celda.style.backgroundColor = this.color;
                } 
                tablero[fila][columna] = embarcacion;              
                ++columna;                
            }
        } else if (direccion == "vertical"){
            for (var i = 0; i < cant; i++) {
                if (jugador == "usuario") {
                    var celda = document.getElementById(fila + ";" + columna + ";" + jugador);
                    celda.style.backgroundColor = this.color;
                } 
                tablero[fila][columna] = embarcacion;              
                ++fila;              
            }
        } else{
            if (jugador == "usuario") {
                var celda = document.getElementById(fila + ";" + columna + ";" + jugador);
                celda.style.backgroundColor = this.color;
            }
            tablero[fila][columna] = embarcacion; 
        }
    }

    probarEntra = function(fila, columna, direccion, embarcacion, id){
        if (direccion == "horizontal") {
            if (embarcacion.tipo == "acorazado") {
                if (id.indexOf("usuario") != -1) {          //Quien entra es el jugador
                    if (tableroJugador[fila][columna] == null && tableroJugador[fila][columna+1] == null && tableroJugador[fila][columna+2] == null) {
                        this.rellenar(fila, columna, direccion, 3, "usuario", this.embarcacion, tableroJugador); //Se rellena el espacio con el color de la embarcación
                        incrementarEmbarcacionSeleccionada(this.embarcacion);   //Incrementa en uno la embarcación colocada 
                        embarques.push(this.embarcacion);
                    } else{
                        alert("No entra el acorazado, hay una embarcación obstruyendo");
                    }
                } else if (tableroPc[fila][columna] == null && tableroPc[fila][columna+1] == null && tableroPc[fila][columna+2] == null) {  //Quien entra es la pc
                    this.rellenar(fila, columna, direccion, 3, "pc", this.embarcacion, tableroPc);
                } else {
                    id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";pc";
                    this.insertarEmbarcacion(embarcacion, id);
                }

            } else{                                         //Si no es el acorazado solo el destructor puede ir horizontal
                if (id.indexOf("usuario") != -1) {          //Quien entra es el jugador
                    if (tableroJugador[fila][columna] == null && tableroJugador[fila][columna+1] == null) {
                        this.rellenar(fila, columna, direccion, 2, "usuario", this.embarcacion, tableroJugador); //Se rellena el espacio con el color de la embarcación
                        incrementarEmbarcacionSeleccionada(this.embarcacion);   //Incrementa en uno la embarcación colocada 
                        embarques.push(this.embarcacion);
                    } else{
                        alert("No entra el destructor, hay una embarcación obstruyendo");
                    }
                } else if (tableroPc[fila][columna] == null && tableroPc[fila][columna+1] == null) {  //Quien entra es la pc
                    this.rellenar(fila, columna, direccion, 2, "pc", this.embarcacion, tableroPc);
                } else {
                    id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";pc";
                    this.insertarEmbarcacion(embarcacion, id);
                }
            } 

        } else if (direccion == "vertical") {
            if (embarcacion.tipo == "acorazado") {
                if (id.indexOf("usuario") != -1) {          //Quien entra es el jugador
                    if (tableroJugador[fila][columna] == null && tableroJugador[fila+1][columna] == null && tableroJugador[fila+2][columna] == null) {
                        this.rellenar(fila, columna, direccion, 3, "usuario", this.embarcacion, tableroJugador); //Se rellena el espacio con el color de la embarcación
                        incrementarEmbarcacionSeleccionada(this.embarcacion);   //Incrementa en uno la embarcación colocada 
                        embarques.push(this.embarcacion);
                    } else{
                        alert("No entra el acorazado, hay una embarcación obstruyendo");
                    }
                } else if (tableroPc[fila][columna] == null && tableroPc[fila+1][columna] == null && tableroPc[fila+2][columna] == null) {  //Quien entra es la pc
                    this.rellenar(fila, columna, direccion, 3, "pc", this.embarcacion, tableroPc);
                } else {
                    id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";pc";
                    this.insertarEmbarcacion(embarcacion, id);
                }

            } else{
                if (id.indexOf("usuario") != -1) {          //Quien entra es el jugador
                    if (tableroJugador[fila][columna] == null && tableroJugador[fila+1][columna] == null) {
                        this.rellenar(fila, columna, direccion, 2, "usuario", this.embarcacion, tableroJugador); //Se rellena el espacio con el color de la embarcación
                        incrementarEmbarcacionSeleccionada(this.embarcacion);   //Incrementa en uno la embarcación colocada 
                        embarques.push(this.embarcacion);
                    } else{
                        alert("No entra el destructor, hay una embarcación obstruyendo");
                    }
                } else if (tableroPc[fila][columna] == null && tableroPc[fila+1][columna] == null) {  //Quien entra es la pc
                    this.rellenar(fila, columna, direccion, 2, "pc", this.embarcacion, tableroPc);
                } else {
                    id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";pc";
                    this.insertarEmbarcacion(embarcacion, id);
                }
            } 
            
        } else{                                             //Es el submarino
            if (id.indexOf("usuario") != -1) {          //Quien entra es el jugador
                if (tableroJugador[fila][columna] == null) {
                    this.rellenar(fila, columna, direccion, 1, "usuario", this.embarcacion, tableroJugador); //Se rellena el espacio con el color de la embarcación
                    incrementarEmbarcacionSeleccionada(this.embarcacion);   //Incrementa en uno la embarcación colocada 
                    embarques.push(this.embarcacion);
                } else{
                    alert("No entra el submarino, hay una embarcación obstruyendo");
                }
            } else if (tableroPc[fila][columna] == null) {  //Quien entra es la pc
                this.rellenar(fila, columna, direccion, 1, "pc", this.embarcacion, tableroPc);
            } else {
                id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";pc";
                this.insertarEmbarcacion(embarcacion, id);
            }
        }
    }
}