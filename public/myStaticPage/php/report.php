
<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $location = $_POST['location'];
    $message = $_POST['message'];

    $sql = "INSERT INTO reports (name, email, location, message) VALUES ('$name', '$email', '$location', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Report submitted successfully!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }
}
?>
