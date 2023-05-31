<?php

ini_set('display_errors', 1);
header('Content-Type: application/json');

require 'common/db_connection.php';
require 'common/send_email.php';

// Retrieve and decode JSON from POST data
$data = json_decode(file_get_contents('php://input'), true);

// Insert contact information
if (
    isset($data['firstName']) && 
    isset($data['lastName']) && 
    isset($data['phone']) && 
    isset($data['email']) && 
    isset($data['dealershipGroup']) && 
    isset($data['dealershipName']) && 
    isset($data['position']) && 
    isset($data['message'])) {

    $first = $data['firstName'];
    $last = $data['lastName'];
    $phone = $data['phone'];
    $email = $data['email'];
    $group = $data['dealershipGroup'];
    $name = $data['dealershipName'];
    $position = $data['position'];
    $message = $data['message'];

    $sql = "INSERT INTO contacts (first_name, last_name, phone, email, dealership_group, dealership_name, position, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    $stmt->bindValue(1, $first, SQLITE3_TEXT);
    $stmt->bindValue(2, $last, SQLITE3_TEXT);
    $stmt->bindValue(3, $phone, SQLITE3_TEXT);
    $stmt->bindValue(4, $email, SQLITE3_TEXT);
    $stmt->bindValue(5, $group, SQLITE3_TEXT);
    $stmt->bindValue(6, $name, SQLITE3_TEXT);
    $stmt->bindValue(7, $position, SQLITE3_TEXT);
    $stmt->bindValue(8, $message, SQLITE3_TEXT);

    if ($stmt->execute()) {
        send_email($data);

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->lastErrorMsg()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Incomplete data']);
}

$conn->close();

// ini_set('display_errors', 1);
// header('Content-Type: application/json');

// require 'common/db_connection.php';

// // Retrieve and decode JSON from POST data
// $data = json_decode(file_get_contents('php://input'), true);

// // Insert contact information
// if (
//     isset($data['firstName']) && 
//     isset($data['lastName']) && 
//     isset($data['phone']) && 
//     isset($data['email']) && 
//     isset($data['dealershipGroup']) && 
//     isset($data['dealershipName']) && 
//     isset($data['position']) && 
//     isset($data['message'])) {

//     $first = $data['firstName'];
//     $last = $data['lastName'];
//     $phone = $data['phone'];
//     $email = $data['email'];
//     $group = $data['dealershipGroup'];
//     $name = $data['dealershipName'];
//     $position = $data['position'];
//     $message = $data['message'];

//     $sql = "INSERT INTO contacts (first_name, last_name, phone, email, dealership_group, dealership_name, position, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
//     $stmt = $conn->prepare($sql);
//     $stmt->bind_param("ssssssss", $first, $last, $phone, $email, $group, $name, $position, $message);

//     if ($stmt->execute()) {
//         echo json_encode(['success' => true]);
//     } else {
//         echo json_encode(['success' => false, 'error' => $stmt->error]);
//     }
// } else {
//     echo json_encode(['success' => false, 'error' => 'Incomplete data']);
// }

// $conn->close();
?>