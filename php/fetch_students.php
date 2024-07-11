<?php
include 'db.php';

$search = $_GET['search'];
$sql = "SELECT * FROM students WHERE name LIKE '%$search%' ORDER BY created_at DESC";
$result = $conn->query($sql);

$students = array();
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

echo json_encode($students);
?>
