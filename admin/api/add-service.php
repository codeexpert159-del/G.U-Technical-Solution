<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $servicesFile = '../data/services.json';
    
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Get existing services
    $services = [];
    if (file_exists($servicesFile)) {
        $services = json_decode(file_get_contents($servicesFile), true);
    }
    
    // Get next ID
    $nextId = 1;
    if (!empty($services)) {
        $nextId = max(array_column($services, 'id')) + 1;
    }
    
    // Create new service
    $newService = [
        'id' => $nextId,
        'title' => $data['title'] ?? '',
        'description' => $data['description'] ?? '',
        'details' => $data['details'] ?? '',
        'icon' => $data['icon'] ?? 'bi-gear',
        'image' => $data['image'] ?? '',
        'video' => $data['video'] ?? ''
    ];
    
    $services[] = $newService;
    
    // Save to file
    if (file_put_contents($servicesFile, json_encode($services, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
        echo json_encode(['success' => true, 'id' => $nextId, 'message' => 'Service added successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add service']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
