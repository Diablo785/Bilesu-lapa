<?php
include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class Events extends DB {
    public function getAllEvents() {
        $sql = "SELECT * FROM events";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $events = array();

            while ($row = $result->fetch_assoc()) {
                $events[] = $row;
            }

            return $events;
        } else {
            return array();
        }
    }
}

// Handle GET request
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $eventsInstance = new Events();
    $events = $eventsInstance->getAllEvents();

    echo json_encode($events);
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
