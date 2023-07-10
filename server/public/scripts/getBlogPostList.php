<?php

ini_set('display_errors', 1);
header('Content-Type: application/json');

require 'common/db_connection.php';

// Prepare SQL statement
$sql = "SELECT id, title, created, slug, thumbnail_url, min_read  FROM blog_posts ORDER BY created ASC";
$stmt = $conn->prepare($sql);

$result = $stmt->execute();

if ($result) {
    // Fetch all rows as associative arrays
    $posts = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $posts[] = $row;
    }

    echo json_encode(['success' => true, 'data' => $posts]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->lastErrorMsg()]);
}

$conn = null; // Close connection

?>
