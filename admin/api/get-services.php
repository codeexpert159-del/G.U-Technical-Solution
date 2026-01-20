<?php
header('Content-Type: application/json');

$servicesFile = '../data/services.json';

// Get all services
if (file_exists($servicesFile)) {
    $services = json_decode(file_get_contents($servicesFile), true);
    echo json_encode($services);
} else {
    echo json_encode([]);
}
?>
