<?php
include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class Register extends DB {
    public function isUsernameTaken($username) {
        $username = $this->conn->real_escape_string($username);

        $sql = "SELECT * FROM users WHERE username = '$username'";
        $result = $this->conn->query($sql);

        return $result->num_rows > 0;
    }

    public function isEmailTaken($email) {
        $email = $this->conn->real_escape_string($email);

        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = $this->conn->query($sql);

        return $result->num_rows > 0;
    }

    public function userRegister($username, $password, $email) {
        $username = $this->conn->real_escape_string($username);
        $password = $this->conn->real_escape_string($password);
        $email = $this->conn->real_escape_string($email);

        // Check if the username is already taken
        if ($this->isUsernameTaken($username) && $this->isEmailTaken($email)) {
            return ["success" => false, "message" => "Username and Email are already taken"];
        }
    
        // Check if the username is already taken
        if ($this->isUsernameTaken($username)) {
            return ["success" => false, "message" => "Username is already taken"];
        }
    
        // Check if the email is already taken
        if ($this->isEmailTaken($email)) {
            return ["success" => false, "message" => "Email is already taken"];
        }

        // Hash the password before storing it in the database
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (username, password, email, role) VALUES ('$username', '$hashedPassword', '$email', 'user')";
        $result = $this->conn->query($sql);

        if ($result) {
            return ["success" => true, "message" => "Registration successful!"];
        } else {
            return ["success" => false, "message" => "Registration failed!"];
        }
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
        $registrationResult = $register->userRegister($username, $password, $email);

        echo json_encode($registrationResult);
    } else {
        echo json_encode(["success" => false, "message" => "Incomplete registration data"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
