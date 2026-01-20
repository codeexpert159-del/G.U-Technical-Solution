<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $projectsFile = '../data/projects.json';
    
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? null;
    
    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'Project ID required']);
        exit;
    }
    
    // Get existing projects
    $projects = [];
    if (file_exists($projectsFile)) {
        $projects = json_decode(file_get_contents($projectsFile), true);
    }
    
    // Find and remove project
    $found = false;
    foreach ($projects as $key => &$project) {
        if ($project['id'] == $id) {
            unset($projects[$key]);
            $found = true;
            break;
        }
    }
    
    if ($found) {
        // Reindex array
        $projects = array_values($projects);
        if (file_put_contents($projectsFile, json_encode($projects, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
            echo json_encode(['success' => true, 'message' => 'Project deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete project']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Project not found']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
