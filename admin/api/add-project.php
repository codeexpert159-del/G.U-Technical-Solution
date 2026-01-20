<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $projectsFile = '../data/projects.json';
    
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Get existing projects
    $projects = [];
    if (file_exists($projectsFile)) {
        $projects = json_decode(file_get_contents($projectsFile), true);
    }
    
    // Get next ID
    $nextId = 1;
    if (!empty($projects)) {
        $nextId = max(array_column($projects, 'id')) + 1;
    }
    
    // Create new project
    $newProject = [
        'id' => $nextId,
        'title' => $data['title'] ?? '',
        'category' => $data['category'] ?? '',
        'description' => $data['description'] ?? '',
        'details' => $data['details'] ?? '',
        'image' => $data['image'] ?? '',
        'video' => $data['video'] ?? '',
        'status' => $data['status'] ?? 'pending',
        'date' => date('Y-m-d')
    ];
    
    $projects[] = $newProject;
    
    // Save to file
    if (file_put_contents($projectsFile, json_encode($projects, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
        echo json_encode(['success' => true, 'id' => $nextId, 'message' => 'Project added successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add project']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
