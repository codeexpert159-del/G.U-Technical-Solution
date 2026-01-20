<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = '../uploads/projects/';
    
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $filename = basename($file['name']);
        $uploadPath = $uploadDir . $filename;
        
        // Check file type (image or video)
        $allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
        if (!in_array($file['type'], $allowedMimes)) {
            echo json_encode(['success' => false, 'message' => 'Invalid file type']);
            exit;
        }
        
        // Check file size (max 100MB)
        if ($file['size'] > 100 * 1024 * 1024) {
            echo json_encode(['success' => false, 'message' => 'File too large']);
            exit;
        }
        
        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            echo json_encode(['success' => true, 'filename' => $filename, 'path' => 'admin/uploads/projects/' . $filename]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload file']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No file provided']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
