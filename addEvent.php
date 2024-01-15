<?php
include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class AddEvent extends DB {
    public function addEvent($name, $description, $location, $startDate, $endDate, $startTime, $endTime, $price) {
        $name = $this->conn->real_escape_string($name);
        $description = $this->conn->real_escape_string($description);
        $location = $this->conn->real_escape_string($location);
        $startDate = $this->conn->real_escape_string($startDate);
        $endDate = $this->conn->real_escape_string($endDate);
        $startTime = $this->conn->real_escape_string($startTime);
        $endTime = $this->conn->real_escape_string($endTime);
        $price = $this->conn->real_escape_string($price);

        $sql = "INSERT INTO events (name, description, location, start_date, end_date, start_time, end_time, price, status) 
                VALUES ('$name', '$description', '$location', '$startDate', '$endDate', '$startTime', '$endTime', '$price', 'upcoming')";

        $result = $this->conn->query($sql);

        if ($result) {
            return ["success" => true, "message" => "Event added successfully"];
        } else {
            return ["success" => false, "message" => "Error adding event: " . $this->conn->error];
        }
    }
}

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $addEvent = new AddEvent();

    // Extract data from POST request
    $name = $_POST['name'];
    $description = $_POST['description'];
    $location = $_POST['location'];
    $startDate = $_POST['start_date'];
    $endDate = $_POST['end_date'];
    $startTime = $_POST['start_time'];
    $endTime = $_POST['end_time'];
    $price = $_POST['price'];

    // Check if all required fields are set
    if (!empty($name) && !empty($description) && !empty($location) && !empty($startDate) && !empty($endDate) && !empty($startTime) && !empty($endTime) && !empty($price)) {
        // Perform event addition
        $result = $addEvent->addEvent($name, $description, $location, $startDate, $endDate, $startTime, $endTime, $price);
        echo json_encode($result);
    } else {
        echo json_encode(["success" => false, "message" => "All fields are required"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
