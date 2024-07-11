<?php 
    // Database connection
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "school_db";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    $conn->set_charset("utf8");
    date_default_timezone_set('Asia/Bangkok');

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    } else {
        $conn_sussess = "Connection sucessted";
    }
?>
