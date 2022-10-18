<?php
include_once("batalla.class.php");
$batallas = batalla::getHistorialJugador($_GET['nombre']); 
if (count($batallas)>0) {
    $arreglo = array();
    for ($i=0; $i < count($batallas); $i++) {
    $arregloTemp = array('id' => $batallas[$i]->getId(),
                    'nombre' => $batallas[$i]->getNombre(),
                    'fecha' => $batallas[$i]->getFecha(),
                    'tiempo' => $batallas[$i]->getTiempo());
        $arreglo[] = $arregloTemp;
    }
} else{
    $arreglo[] = "";
}
$myJSON = json_encode($arreglo);
echo $myJSON;
?>