<?php
include_once("batalla.class.php");
$date1 = new DateTime($_GET['tiempoInicio']);
$date2 = new DateTime($_GET['tiempoFin']);
$intervalo = $date1->diff($date2);
if ($intervalo->i < 10 && $intervalo->s < 10) {
    $tiempo = $intervalo->format('0%h:0%i:0%s');
} elseif ($intervalo->i < 10 && $intervalo->s >= 10) {
    $tiempo = $intervalo->format('0%h:0%i:%s');
} elseif ($intervalo->i >= 10 && $intervalo->s < 10) {
    $tiempo = $intervalo->format('0%h:%i:0%s');
} else{
    $tiempo = $intervalo->format('0%h:%i:%s');
}
$fecha = $date2->format('Y-m-d');
batalla::registrarJuego($_GET['nombre'], $tiempo, $fecha); 
?>