<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="libs/bootstrap-5.1.3-dist/css/bootstrap.min.css" rel="stylesheet">

    <script type="text/javascript" src="libs/jquery/jquery-3.6.0.min.js"></script>

    <link rel="stylesheet" href="./css/batalla.css">
    <script src="./js/embarcacion.js"></script>
    <script src="./js/jugador.js"></script>
    <script src="./js/juego.js"></script>
    

    <title>Batalla Naval</title>

  </head>
  <body class="fondo" onload="generarTableros()">
    
    <header><u><b>Batalla Naval</b></u></header> <br><br>

    <section>
      <article>
        <div class="container">
          <div class="row">
            <div class="col-md-2 col-3">
              <h4>Nombre:</h4>
            </div>
            <div class="col-md-10 col-9">
              <input type="text" class="nombre" name="nombre" id="nombre" maxlength="15">
            </div>
          </div>
          <div class="row">
            <div class="col-10 p-3">
              <input type="button" class="btn btn-success opciones" value="Jugar" id="jugar" onclick="jugar()">
              <input type="button" class="btn btn-danger opciones" value="Abandonar" id="abandonar" onclick="abandonar()" disabled>
              <input type="button" class="btn btn-primary opciones" value="Configurar" id="configurar" data-bs-toggle="modal" data-bs-target="#configuraciones">
              <input type="button" class="btn btn-secondary opciones" value="Ver records" id="records" onclick="verRecords()" disabled> <br>
            </div>
            
          </div>
          <div class="turno" id="turno"></div>
        
          <div class="row">
            <div class = "col-md-6 mx-auto p-3">
              <h4 id="tabJugador">Tablero jugador</h4>
              <div id="tableroJugador"></div>
            </div> 
            <div class="col-md-6 mx-auto p-3">
              <h4>Tablero Máquina</h4>
              <div id="tableroMaquina"></div><br>
            </div> 
          </div>
        </div>

        <div class="container">
          <div class="row">
            <h2><u>Embarcaciones:</u></h2><br>
          </div>
        
          <div class="row">
            <div class="col-md-4 mx-auto p-3">
              <h3 id="cantAcorazados">Acorazados: 3 disponibles</h3>
              <button class="btn btn-danger p-1" id="acorazadoVertical" onclick="elegirBarco('acorazadoVertical')">
                <table>
                  <tr><td> </td></tr>
                  <tr><td> </td></tr>
                  <tr><td> </td></tr>
                </table>
              </button>

              <button class="btn btn-danger p-1" id="acorazadoHorizontal" onclick="elegirBarco('acorazadoHorizontal')">
                <table>
                  <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                </table>
              </button>  
            </div>
        
            <div class="col-md-4 mx-auto p-3">
              <h3 id="cantDestructores">Destructores: 4 disponibles</h3>
              <button class="btn btn-success p-1" id="destructorVertical" onclick="elegirBarco('destructorVertical')">
                <table>
                  <tr><td> </td></tr>
                  <tr><td> </td></tr>
                </table>
              </button>

              <button class="btn btn-success p-1" id="destructorHorizontal" onclick="elegirBarco('destructorHorizontal')">
                <table>
                  <tr>
                    <td> </td>
                    <td> </td>
                  </tr>
                </table>
              </button>
            </div>

            <div class="col-md-4 mx-auto p-3">
              <h3 id="cantSubmarinos">Submarinos: 5 disponibles</h3>
              <button class="btn btn-primary p-1" id="submarino" onclick="elegirBarco('submarino')">
                <table>
                  <tr><td> </td></tr>
                </table>
              </button>
            </div>  
          </div>
        </div><br>
      </article>
    </section>

    <footer><b><u>Desarrollado por: Alan Lautaro Uribe</u></b></footer><br>

    <div class="modal fade" id="configuraciones" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Seleccione el color de las Embarcaciones</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6">Acorazado</div>
                        <div class="col-6">
                            <input type="radio" name="acorazado" value="btn-primary"> Azul
                            <input type="radio" name="acorazado" value="btn-success"> Verde    
                            <input type="radio" name="acorazado" value="btn-danger" checked> Rojo
                        </div>
                        <div class="col-6">Destructor</div>
                        <div class="col-6">
                            <input type="radio" name="destructor" value="btn-primary"> Azul
                            <input type="radio" name="destructor" value="btn-success" checked> Verde
                            <input type="radio" name="destructor" value="btn-danger"> Rojo
                        </div>
                        <div class="col-6">Submarino</div>
                        <div class="col-6">
                            <input type="radio" name="submarino" value="btn-primary" checked> Azul
                            <input type="radio" name="submarino" value="btn-success"> Verde
                            <input type="radio" name="submarino" value="btn-danger"> Rojo
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="configurar()">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalRecords" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="recordsPersona"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div id="completar"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalRecordsHistoricos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titulo">Top 5 Mejores jugadores</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div id="recordsHistoricos"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="libs/bootstrap-5.1.3-dist/js/bootstrap.min.js"></script>
    
  </body>
</html>