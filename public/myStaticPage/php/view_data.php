
<?php
include 'db.php';

// Fetch reports
$sql = "SELECT * FROM reports ORDER BY created_at DESC";
$reports = $conn->query($sql);

// Fetch contacts
$sql = "SELECT * FROM contacts ORDER BY created_at DESC";
$contacts = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WasteLink Data</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1, h2 {
            color: #2d8a56;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            background-color: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #2d8a56;
            color: white;
        }
        tr:hover {
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .tab-buttons {
            margin-bottom: 20px;
        }
        .tab-button {
            padding: 10px 20px;
            background-color: #ddd;
            border: none;
            cursor: pointer;
            font-size: 16px;
            margin-right: 5px;
        }
        .tab-button.active {
            background-color: #2d8a56;
            color: white;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>WasteLink Dashboard</h1>
        
        <div class="tab-buttons">
            <button class="tab-button active" onclick="openTab('reports')">Waste Reports</button>
            <button class="tab-button" onclick="openTab('contacts')">Contact Messages</button>
        </div>
        
        <div id="reports" class="tab-content active">
            <h2>Waste Reports</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Message</th>
                    <th>Created At</th>
                </tr>
                <?php if ($reports->num_rows > 0): ?>
                    <?php while($row = $reports->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $row["id"]; ?></td>
                            <td><?php echo $row["name"]; ?></td>
                            <td><?php echo $row["email"]; ?></td>
                            <td><?php echo $row["location"]; ?></td>
                            <td><?php echo $row["message"]; ?></td>
                            <td><?php echo $row["created_at"]; ?></td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="6">No reports available</td>
                    </tr>
                <?php endif; ?>
            </table>
        </div>
        
        <div id="contacts" class="tab-content">
            <h2>Contact Messages</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Created At</th>
                </tr>
                <?php if ($contacts->num_rows > 0): ?>
                    <?php while($row = $contacts->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo $row["id"]; ?></td>
                            <td><?php echo $row["name"]; ?></td>
                            <td><?php echo $row["email"]; ?></td>
                            <td><?php echo $row["subject"]; ?></td>
                            <td><?php echo $row["message"]; ?></td>
                            <td><?php echo $row["created_at"]; ?></td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="6">No contact messages available</td>
                    </tr>
                <?php endif; ?>
            </table>
        </div>
    </div>

    <script>
        function openTab(tabName) {
            // Hide all tab contents
            var tabContents = document.getElementsByClassName("tab-content");
            for (var i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove("active");
            }
            
            // Deactivate all tabs
            var tabButtons = document.getElementsByClassName("tab-button");
            for (var i = 0; i < tabButtons.length; i++) {
                tabButtons[i].classList.remove("active");
            }
            
            // Show the selected tab content
            document.getElementById(tabName).classList.add("active");
            
            // Activate the clicked button
            event.currentTarget.classList.add("active");
        }
    </script>
</body>
</html>
