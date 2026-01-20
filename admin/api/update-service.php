<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $servicesFile = '../data/services.json';
    
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? null;
    
    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'Service ID required']);
        exit;
    }
    
    // Get existing services
    $services = [];
    if (file_exists($servicesFile)) {
        $services = json_decode(file_get_contents($servicesFile), true);
    }
    
    // Find and update service
    $found = false;
    foreach ($services as &$service) {
        if ($service['id'] == $id) {
            $service['title'] = $data['title'] ?? $service['title'];
            $service['description'] = $data['description'] ?? $service['description'];
            $service['details'] = $data['details'] ?? $service['details'];
            $service['icon'] = $data['icon'] ?? $service['icon'];
            $service['image'] = $data['image'] ?? $service['image'];
            $service['video'] = $data['video'] ?? $service['video'];
            $found = true;
            break;
        }
    }
    
    if ($found) {
        if (file_put_contents($servicesFile, json_encode($services, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
            echo json_encode(['success' => true, 'message' => 'Service updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update service']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Service not found']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
