<?php
include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class Register extends DB {
    public function userRegister($username, $password, $email) {
        $username = $this->conn->real_escape_string($username);
        $password = $this->conn->real_escape_string($password);
        $email = $this->conn->real_escape_string($email);

        // Hash the password before storing it in the database
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (username, password, email, role) VALUES ('$username', '$hashedPassword', '$email', 'user')";
        $result = $this->conn->query($sql);

        return $result;
    }
}

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $register = new Register();

    // Extract data from POST request
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];

    // Check if all required fields are set
    if (!empty($username) && !empty($password) && !empty($email)) {
        // Perform user registration
        if ($register->userRegister($username, $password, $email)) {
            echo json_encode(["success" => true, "message" => "Registration successful!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Registration failed!"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Incomplete registration data"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
