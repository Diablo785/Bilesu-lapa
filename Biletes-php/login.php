<?php
include 'db.php';

class Login extends DB {
    public function userLogin($username, $password) {
        $username = $this->conn->real_escape_string($username);
        $password = $this->conn->real_escape_string($password);

        $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
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
        header("Location: dashboard.php");
        exit();
    } else {
        echo "Invalid username or password";
    }
}
?>