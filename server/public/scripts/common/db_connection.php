<?php
$db_info = file('../../dbInfo.txt', FILE_IGNORE_NEW_LINES);

$conn = mysqli_connect($db_info[0], $db_info[1], $db_info[2], $db_info[3]);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>