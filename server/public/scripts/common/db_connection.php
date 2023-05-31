<?php
$db_file = '../../db.sqlite3';

$conn = new SQLite3($db_file);

if (!$conn) {
  die("Connection failed: " . $conn->lastErrorMsg());
}
?>
