<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

include 'db.php';

class Register extends DB {
    public function userRegistration($username, $email, $password) {
        $username = $this->conn->real_escape_string($username);
        $email = $this->conn->real_escape_string($email);
        $password = $this->conn->real_escape_string($password);

        $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";

        if ($this->conn->query($sql) === TRUE) {
            return true;
        } else {
            return false;
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $register = new Register();
    $username = $_POST['username']; 
    $email = $_POST['email'];
    $password = $_POST['password'];

    if ($register->userRegistration($username, $email, $password)) {
        header("Location: login.php");
        exit();
    } else {
        echo "Registration failed. Please try again.";
    }
}
?>
