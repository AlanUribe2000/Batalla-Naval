<?php
class batalla{
    private $id;
    private $nombre;
    private $tiempo;
    private $fecha;

    public function __construct($id = 0, $nombre = "", $tiempo = "", $fecha = "")
    {
        $this->setId($id);
        $this->setNombre($nombre);
        $this->setTiempo($tiempo);
        $this->setFecha($fecha);
    }

    public function getId()
	{	return $this->id;	}
	
	public function setId($newId)
	{	$this->id = $newId;	}

    public function getNombre()
	{	return $this->nombre;	}
	
	public function setNombre($newNombre)
	{	$this->nombre = $newNombre;	}

    public function getTiempo()
	{	return $this->tiempo;	}
	
	public function setTiempo($newTiempo)
	{	$this->tiempo = $newTiempo;	}

    public function getFecha()
	{	return $this->fecha;	}
	
	public function setFecha($newFecha)
	{	$this->fecha = $newFecha;	}

    public static function registrarJuego($nombre, $tiempo, $fecha){
		$con = new mysqli("localhost", "root", "", "batallanaval") or die("No es posible conectarse al motor de BD");
        $consulta = "INSERT INTO historial (nombre, tiempo, fecha) VALUES ('".$nombre."','".$tiempo."', '".$fecha."')";
        $con->query($consulta) or die("No se pudo realizar la consulta");
		$con->close();
    }

    public static function getMejoresJugadores(){   //Top 5 mejores jugadores
        $listaJuegos = array();
		$con = new mysqli("localhost", "root", "", "batallanaval") or die("No es posible conectarse al motor de BD");
        $consulta = "SELECT * FROM historial ORDER BY tiempo LIMIT 5";
        $listado = $con->query($consulta) or die("No se pudo realizar la consulta");
		while ($registro = $listado->fetch_object()){
            $unaBatalla = new batalla();
            $unaBatalla->setId($registro->id);
            $unaBatalla->setNombre($registro->nombre);
            $unaBatalla->setTiempo($registro->tiempo);
            $unaBatalla->setFecha($registro->fecha);
            $listaJuegos[]=$unaBatalla;
        }
		$listado->free();
		$con->close();
		return $listaJuegos;
    }

    public static function getHistorialJugador($nombre){
        $listaJuegos = array();
		$con = new mysqli("localhost", "root", "", "batallanaval") or die("No es posible conectarse al motor de BD");
        $consulta = "SELECT * FROM historial WHERE nombre = '".$nombre."' ORDER BY tiempo";
        $listado = $con->query($consulta) or die("No se pudo realizar la consulta");
		while ($registro = $listado->fetch_object()){
            $unaBatalla = new batalla();
            $unaBatalla->setId($registro->id);
            $unaBatalla->setNombre($registro->nombre);
            $unaBatalla->setTiempo($registro->tiempo);
            $unaBatalla->setFecha($registro->fecha);
            $listaJuegos[]=$unaBatalla;
        }
		$listado->free();
		$con->close();
		return $listaJuegos;
    }
}
?>