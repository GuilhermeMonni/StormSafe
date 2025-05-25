<?php
require 'config.php';

// Se foi digitada uma cidade, busca via PHP
if (isset($_GET['cidade']) && !empty($_GET['cidade'])) {
    $cidade = urlencode(mb_convert_encoding($_GET['cidade'], 'UTF-8', 'auto'));
    $urlGeo = "http://api.openweathermap.org/geo/1.0/direct?q=$cidade&limit=1&appid=$apiKey";
    $respostaGeo = file_get_contents($urlGeo);
    $dadoGeo = json_decode($respostaGeo, true);

    if (!empty($dadoGeo) && isset($dadoGeo[0]['lat']) && isset($dadoGeo[0]['lon'])) {
        $lat = $dadoGeo[0]['lat'];
        $lon = $dadoGeo[0]['lon'];
        
        $urlClima = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&appid=$apiKey&lang=pt_br&units=metric";
        $respostaClima = file_get_contents($urlClima);
        
        header('Content-Type: application/json');
        echo $respostaClima;
        exit;
    }
}

http_response_code(404);
echo json_encode(['erro' => 'Cidade não encontrada']);
?>