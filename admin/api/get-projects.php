<?php
header('Content-Type: application/json');

$projectsFile = '../data/projects.json';

// Get all projects
if (file_exists($projectsFile)) {
    $projects = json_decode(file_get_contents($projectsFile), true);
    echo json_encode($projects);
} else {
    echo json_encode([]);
}
?>
