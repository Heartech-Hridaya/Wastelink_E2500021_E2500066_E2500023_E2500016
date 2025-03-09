
<?php
// Use SQLite instead of MySQL
$dbname = "../../database.sqlite";

try {
    // Create a new PDO connection to SQLite
    $conn = new PDO("sqlite:$dbname");
    // Set error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
