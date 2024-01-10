<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

class Login extends DB {
    public function userLogin($username, $password) {
        $username = $this->conn->real_escape_string($username);
        $password = $this->conn->real_escape_string($password);

        $hashedPassword = hash('sha256', $password);

        $sql = "SELECT * FROM users WHERE username='$username' AND `password`='$hashedPassword'";
        $result = $this->conn->query($sql);

        if ($result->num_rows == 1) {
            return true;
        } else {
            return false;
        }
    }
}

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = new Login();
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($login->userLogin($username, $password)) {
        $_SESSION['username'] = $username;
        $response = ['success' => true, 'message' => 'Login successful'];
        echo json_encode($response);
    } else {
        $response = ['success' => false, 'message' => 'Invalid username or password'];
        echo json_encode($response);
    }
}
?>
