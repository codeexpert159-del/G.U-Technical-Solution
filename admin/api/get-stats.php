<?php
header('Content-Type: application/json');

// Get projects count
$projectsFile = '../data/projects.json';
$servicesFile = '../data/services.json';

$projectCount = 0;
$serviceCount = 0;

if (file_exists($projectsFile)) {
    $projects = json_decode(file_get_contents($projectsFile), true);
    $projectCount = count($projects);
}

if (file_exists($servicesFile)) {
    $services = json_decode(file_get_contents($servicesFile), true);
    $serviceCount = count($services);
}

echo json_encode([
    'projectCount' => $projectCount,
    'serviceCount' => $serviceCount
]);
?>
