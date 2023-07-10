<?php

ini_set('display_errors', 1);
header('Content-Type: application/json');

require 'common/db_connection.php';

// Check if slug is set
if (isset($_GET['slug'])) {
    // Sanitize slug
    $slug = $_GET['slug'];
    
    // Prepare SQL statement
    $sql = "SELECT * FROM blog_posts WHERE slug = :slug";
    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bindValue(':slug', $slug, SQLITE3_TEXT);

    // Execute SQL statement
    $result = $stmt->execute();

    if ($result) {
        // Fetch row as an associative array
        $post = $result->fetchArray(SQLITE3_ASSOC);
        
        // Check if a post was found
        if ($post) {
            echo json_encode(['success' => true, 'data' => $post]);
        } else {
            echo json_encode(['success' => false, 'error' => 'No post found']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => $conn->lastErrorMsg()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No slug provided']);
}

$conn->close(); // Close connection

?>
