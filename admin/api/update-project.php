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
    
    // Find and update project
    $found = false;
    foreach ($projects as &$project) {
        if ($project['id'] == $id) {
            $project['title'] = $data['title'] ?? $project['title'];
            $project['category'] = $data['category'] ?? $project['category'];
            $project['description'] = $data['description'] ?? $project['description'];
            $project['details'] = $data['details'] ?? $project['details'];
            $project['image'] = $data['image'] ?? $project['image'];
            $project['video'] = $data['video'] ?? $project['video'];
            $project['status'] = $data['status'] ?? $project['status'];
            $found = true;
            break;
        }
    }
    
    if ($found) {
        if (file_put_contents($projectsFile, json_encode($projects, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
            echo json_encode(['success' => true, 'message' => 'Project updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update project']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Project not found']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
