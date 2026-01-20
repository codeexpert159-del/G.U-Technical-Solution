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
    
    // Find and remove service
    $found = false;
    foreach ($services as $key => &$service) {
        if ($service['id'] == $id) {
            unset($services[$key]);
            $found = true;
            break;
        }
    }
    
    if ($found) {
        // Reindex array
        $services = array_values($services);
        if (file_put_contents($servicesFile, json_encode($services, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
            echo json_encode(['success' => true, 'message' => 'Service deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete service']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Service not found']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
