
<?php
$servername = "0.0.0.0";  // Using 0.0.0.0 instead of localhost for Replit
$username = "root";       // Default username
$password = "";           // Default password
$dbname = "waste_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
