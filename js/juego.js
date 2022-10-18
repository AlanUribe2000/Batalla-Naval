var acorazadosColocados = 0;
var destructoresColocados = 0;
var submarinosColocados = 0;

var acorazadoSeleccionado = false;  //Indica si ya se eligió alguna posición (horizontal o vertical) para el acorazado 
var destructorSeleccionado = false; //Indica si ya se eligió alguna posición (horizontal o vertical) para el destructor 
var submarinoSeleccionado = false;  

var tableroJugador = new Array(16);
var tableroPc = new Array(16);

var embarcacion;       //Es la embarcación seleccionada
var embarques = new Array();
var jugador1 = new Jugador("usuario");
var jugador2 = new Jugador("pc");

var colorAcorazado = "red";
var colorDestructor = "green";
var colorSubmarino = "blue";

var tiempoInicio;
var tiempoFin;

function jugar(){       // se debe cambiar todos los onclick del tablero del jugador para que ya no haga el colocar
    if (document.getElementById("nombre").value == "") {
        alert("Ingrese su nombre por favor");
    } else if (acorazadosColocados >= 1 && destructoresColocados >= 2 && submarinosColocados >= 3) {    //Cumple los requisitos mínimos, se llena el tablero de la pc
        for (var i = 0; i < embarques.length; i++) {
            id = (Math.floor(Math.random() * 15) + 1) + ";" + (Math.floor(Math.random() * 15) + 1) + ";pc";
            embarcacion = embarques[i];
            colocar(id);
        }
        document.getElementById("jugar").disabled = true;
        document.getElementById("abandonar").disabled = false;
        document.getElementById("configurar").disabled = true;
        document.getElementById("nombre").disabled = true;
        document.getElementById("records").disabled = false;

        for (var i = 1; i < 16; i++) {
            for (var j = 1; j < 16; j++) {
                document.getElementById(i+";"+j+";usuario").removeAttribute("onclick");
                document.getElementById(i+";"+j+";usuario").classList.remove('cursor');
                document.getElementById(i+";"+j+";pc").setAttribute("onclick", "atacar(id)");
                document.getElementById(i+";"+j+";pc").classList.add('cursor');
            }
        }

        document.getElementById("acorazadoVertical").disabled = true;
        document.getElementById("acorazadoHorizontal").disabled = true;
        document.getElementById("destructorVertical").disabled = true;
        document.getElementById("destructorHorizontal").disabled = true;
        document.getElementById("submarino").disabled = true;

        alert("COMIENZA EL JUEGO!!");
        tiempoInicio = new Date();      //Inicia el tiempo

        document.getElementById("turno").textContent = "Turno de: "+document.getElementById("nombre").value;
        document.getElementById("tabJugador").textContent = "Tablero de "+document.getElementById("nombre").value;

    } else {
        alert("Ingrese las embarcaciones mínimas: 1 acorazado, 2 destructores y 3 submarinos");
    }
}

function abandonar() {
    var respuesta = confirm("¿Está seguro que desea rendirse?");
    if (respuesta) {
        respuesta = confirm("Que lástima que se haya rendido, ¿Desea volver a jugar?");
        if (respuesta) {
            resetear("juegaDeNuevo");
        } else {
            resetear("nuevoJugador");
        }
    } 
}

function configurar() {
    var acorazado = document.getElementsByName("acorazado");
    var destructor = document.getElementsByName("destructor");
    var submarino = document.getElementsByName("submarino");

    for (var i = 0; i < acorazado.length; i++) {
        if (acorazado[i].checked) {
            var cAcorazado = acorazado[i].value;
        }
    }
    for (var i = 0; i < destructor.length; i++) {
        if (destructor[i].checked) {
            var cDestructor = destructor[i].value;
        }
    }
    for (var i = 0; i < submarino.length; i++) {
        if (submarino[i].checked) {
            var cSubmarino = submarino[i].value;
        }
    }

    if (cAcorazado != cDestructor && cAcorazado != cSubmarino && cDestructor != cSubmarino) {
        document.getElementById("acorazadoVertical").classList.remove("btn-primary", "btn-success", "btn-danger");
        document.getElementById("acorazadoVertical").classList.add(cAcorazado);
        document.getElementById("acorazadoHorizontal").classList.remove("btn-primary", "btn-success", "btn-danger");
        document.getElementById("acorazadoHorizontal").classList.add(cAcorazado);
        colorAcorazado = colorEquivalente(cAcorazado);

        document.getElementById("destructorVertical").classList.remove("btn-primary", "btn-success", "btn-danger");
        document.getElementById("destructorVertical").classList.add(cDestructor);
        document.getElementById("destructorHorizontal").classList.remove("btn-primary", "btn-success", "btn-danger");
        document.getElementById("destructorHorizontal").classList.add(cDestructor);
        colorDestructor = colorEquivalente(cDestructor);

        document.getElementById("submarino").classList.remove("btn-primary", "btn-success", "btn-danger");
        document.getElementById("submarino").classList.add(cSubmarino);
        colorSubmarino = colorEquivalente(cSubmarino); 

        alert("Cambios aplicados");
    } else {
        alert("No se pueden realizar los cambios, las embarcaciones deben tener colores distintos");
    }

    function colorEquivalente(color) {
        if (color == "btn-primary") {
            return "blue";
        } else if (color == "btn-success") {
            return "green";
        } else {
            return "red";
        }
    }
}

function verRecords() {
    document.getElementById("recordsPersona").innerHTML = "Records de "+document.getElementById("nombre").value;
    jugador1.obtenerRecordsJugador(document.getElementById("nombre").value);
}

function generarTableros() {
    tabla("usuario");
    tabla("pc");
}

function tabla(usuario){            //Los id se guardan bien, primero fila y después columna
    for (let i = 0; i < 16; i++) {
        tableroJugador[i] = new Array(16);
        tableroPc[i] = new Array(16);
    }
    var html = "";
    for (var i = 0; i < 16; i++) {
        html += "<tr class='tabla'>";
        for (var j = 0; j < 16; j++) {
            if (i==0 && j==0) {
                if (usuario == "usuario") {
                    html += "<td class='tabla' id = '"+i+";"+j+";usuario'> </td>";
                } else {
                    html += "<td class='tabla' id = '"+i+";"+j+";pc'> </td>";
                }  
            } else if (i!=0 && j==0){       
                if (usuario == "usuario") {
                    html += "<td class='tabla' id = '"+i+";"+j+";usuario'>"+i+"</td>";
                } else {
                    html += "<td class='tabla' id = '"+i+";"+j+";pc'>"+i+"</td>";
                }     
            } else if (i==0 && j!=0){ 
                if (usuario == "usuario") {
                    html += "<td class='tabla' id = '"+i+";"+j+";usuario'>"+j+"</td>";
                } else {
                    html += "<td class='tabla' id = '"+i+";"+j+";pc'>"+j+"</td>";
                }
            } else{
                if (usuario == "usuario") {
                    html += "<td class='tabla cursor' id = '"+i+";"+j+";usuario' onclick = 'colocar(id)'> </td>";
                } else {
                    html += "<td class='tabla' id = '"+i+";"+j+";pc'> </td>";
                }               
            }
        }
        html += "</tr>";
    }
    if (usuario == "usuario") {
        var tabla = document.getElementById("tableroJugador");
        var table = "<table class = 'table-light table-bordered border-dark' id = 'tJugador'>";
        table += html + "</table>";
        tabla.innerHTML = table;
    } else {
        var tabla = document.getElementById("tableroMaquina");
        var table = "<table class = 'table-light table-bordered border-dark' id = 'tPc'>";
        table += html + "</table>";
        tabla.innerHTML = table;
    } 
}

function colocar(id){
    if (id.indexOf("usuario") != -1) {
        if (comprobarLimiteEmbarcaciones()) {
            alert("Ya colocó todas las embarcaciones permitidas, presione en JUGAR");
        } else {
            if (!acorazadoSeleccionado && !destructorSeleccionado && !submarinoSeleccionado) {
                alert("Por favor seleccione una embarcación");
            } else {
                if (comprobarMaximo(embarcacion)) {
                    embarcacion.insertarEmbarcacion(embarcacion, id);   //Mando el tablero ya sea del jugador o de la pc                    
                } else if (embarcacion.tipo == "destructor") {
                    alert("Llegó al limite de destructores, no puede colocar más");
                } else {
                    alert("Llegó al limite de "+embarcacion.tipo+"s no puede colocar más");
                }
            }
        }
    } else {
        embarcacion.insertarEmbarcacion(embarcacion, id);
    }
}

function comprobarMaximo(embarcacion){//Permite poner un tope a la cantidad de embarcaciones que puedo poner por tipo de acorazado, retorna falso si no se puede poner mas embarcaciones de ese tipo, caso contrario devuelve true
    if ((embarcacion.tipo == "acorazado" && acorazadosColocados == 3) || (embarcacion.tipo == "destructor" && destructoresColocados == 4) || (embarcacion.tipo == "submarino" && submarinosColocados == 5)) {
        return false;
    } else {
        return true;
    }
}

function incrementarEmbarcacionSeleccionada(embarcacion){   //Incrementa en uno la embarcación colocada
    if (embarcacion.tipo == "acorazado") {
        acorazadosColocados += 1;
        document.getElementById("cantAcorazados").innerText = "Acorazados: "+ (3-acorazadosColocados) +" disponibles";
        if (acorazadosColocados == 3) {
            document.getElementById("acorazadoHorizontal").setAttribute("disabled", true);
            document.getElementById("acorazadoVertical").setAttribute("disabled", true);
        }
    } else if (embarcacion.tipo == "destructor") {
        destructoresColocados += 1;
        document.getElementById("cantDestructores").innerText = "Destructores: "+ (4-destructoresColocados) +" disponibles";
        if (destructoresColocados == 4) {
            document.getElementById("destructorHorizontal").setAttribute("disabled", true);
            document.getElementById("destructorVertical").setAttribute("disabled", true);
        }
    } else{
        submarinosColocados += 1;
        document.getElementById("cantSubmarinos").innerText = "Submarinos: "+ (5-submarinosColocados) +" disponibles";
        if (submarinosColocados == 5) {
            document.getElementById("submarino").setAttribute("disabled", true);
        }
    }       
}

function comprobarLimiteEmbarcaciones(){    //Compruebo si ya coloqué el límite de embarcaciones permitidas para el tipo seleccionado, en caso de ser asi se bloque la posibilidad de seleccionar esa embarcacion
    var limite = 0; //Variable de control, si llega a 3 entonces se colocaron todas las embarcaciones permitidas
    if (acorazadosColocados == 3) {
        limite+=1;
    }

    if (destructoresColocados == 4) {
        limite+=1;
    }

    if (submarinosColocados == 5) {
        limite+=1;
    }

    if (limite == 3) {
        return true;
    } else{
        return false;
    }
}

function elegirBarco(barco){            
    if (!(((barco == "acorazadoVertical" || barco == "acorazadoHorizontal") && acorazadoSeleccionado) || ((barco == "destructorHorizontal" || barco == "destructorVertical") && destructorSeleccionado))) { //Se evalua que el tipo de embarcación elegida no tenga ya una dirección definida, en caso de no tenerla se bloquea la otra dirección
        if (barco == "submarino") {
            if (embarques.length == 0) {
                var respuesta = confirm("¿Está seguro de elegir el submarino? Si acepta ya no podrá configurar el color de los embarques");
            } else{
                var respuesta = true;
            }
        } else if (embarques.length != 0){
            var respuesta = confirm("¿Está seguro de elegir esta orientación? Si acepta ya no podrá seleccionar la otra orientación para esta embarcación");    //Si llega acá significa que la embarcación seleccionada no tiene confirmada su orientación (horizontal o vertical)
        } else{
            var respuesta = confirm("¿Está seguro de elegir esta orientación? Si acepta ya no podrá seleccionar la otra orientación para esta embarcación, además, ya no podrá configurar el color de los embarques");    
        }
        if (respuesta) {
            document.getElementById("configurar").disabled = true;  //Se bloquea el botón configuración para que ya no pueda cambiar el color de las embarcaciones  
            switch (barco) {
                case "acorazadoVertical":
                    document.getElementById("acorazadoHorizontal").setAttribute("disabled", true);
                    acorazadoSeleccionado = true;
                    break;
                case "acorazadoHorizontal":
                    document.getElementById("acorazadoVertical").setAttribute("disabled", true);
                    acorazadoSeleccionado = true;
                    break;
                case "destructorVertical":
                    document.getElementById("destructorHorizontal").setAttribute("disabled", true);
                    destructorSeleccionado = true;
                    break;
                case "destructorHorizontal":
                    document.getElementById("destructorVertical").setAttribute("disabled", true);
                    destructorSeleccionado = true;
                    break;
                default:
                    submarinoSeleccionado = true;
                    break;
            }
            seleccion(barco);
        }
    } else{                 //Si entra acá significa que ya está confirmada la orientación de la embarcación
        seleccion(barco);
    }
}

function seleccion(barco){
    switch (barco) {
        case "acorazadoVertical":
            alert("Seleccionó el acorazado en posición vertical");
            embarcacion = new Embarcacion("acorazado", "vertical", 3, colorAcorazado);
            break;
        case "acorazadoHorizontal":
            alert("Seleccionó el acorazado en posición horizontal");
            embarcacion = new Embarcacion("acorazado", "horizontal", 3, colorAcorazado);
            break;
        case "destructorVertical":
            alert("Seleccionó el destructor en posición vertical");
            embarcacion = new Embarcacion("destructor", "vertical", 2, colorDestructor);
            break;
        case "destructorHorizontal":
            alert("Seleccionó el destructor en posición horizontal");
            embarcacion = new Embarcacion("destructor", "horizontal", 2, colorDestructor);
            break;
        default:
            alert("Seleccionó el submarino");
            embarcacion = new Embarcacion("submarino", "cuadrado", 1, colorSubmarino);
            break;
    }
}

function atacar(id) {
   jugador1.atacar(id);
}

function resetear(situacion) {
    acorazadosColocados = 0;
    destructoresColocados = 0;
    submarinosColocados = 0;
    acorazadoSeleccionado = false;  
    destructorSeleccionado = false; 
    submarinoSeleccionado = false;  
    tableroJugador = new Array(16);
    tableroPc = new Array(16);
    embarcacion = "";       
    embarques = new Array();

    document.getElementById("acorazadoVertical").disabled = false;
    document.getElementById("acorazadoHorizontal").disabled = false;
    document.getElementById("destructorVertical").disabled = false;
    document.getElementById("destructorHorizontal").disabled = false;
    document.getElementById("submarino").disabled = false;

    document.getElementById("cantAcorazados").innerText = "Acorazados: 3 disponibles";
    document.getElementById("cantDestructores").innerText = "Destructores: 4 disponibles";
    document.getElementById("cantSubmarinos").innerText = "Submarinos: 5 disponibles";

    document.getElementById("jugar").disabled = false;
    document.getElementById("abandonar").disabled = true;
    document.getElementById("configurar").disabled = false;

    document.getElementById("turno").textContent = "";

    tiempoInicio = "";
    tiempoFin = "";

    if (situacion == "nuevoJugador") {
        colorAcorazado = "red";
        colorDestructor = "green";
        colorSubmarino = "blue";

        document.getElementById("acorazadoVertical").classList.remove("btn-primary", "btn-success", "btn-danger");
        document.getElementById("acorazadoVertical").classList.add("btn-danger");
        document.getElementById("acorazadoHorizontal").classList.remove("btn-primary", "btn-success", "btn-danger");
        document.getElementById("acorazadoHorizontal").classList.add("btn-danger");

        document.getElementById("destructorVertical").classList.remove("btn-primary", "btn-success", "btn-danger");
        document.getElementById("destructorVertical").classList.add("btn-success");
        document.getElementById("destructorHorizontal").classList.remove("btn-primary", "btn-success", "btn-danger");
        document.getElementById("destructorHorizontal").classList.add("btn-success");

        document.getElementById("submarino").classList.remove("btn-primary", "btn-success", "btn-danger");
        document.getElementById("submarino").classList.add("btn-primary");

        document.getElementById("nombre").disabled = false;
        document.getElementById("nombre").value = "";
        document.getElementById("records").disabled = true;

        document.getElementById("tabJugador").textContent = "Tablero jugador";
    } 
    generarTableros();
}