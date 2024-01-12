<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db.php';

class Login extends DB {
    public function userLogin($username, $password) {
        $username = $this->conn->real_escape_string($username);

        $sql = "SELECT * FROM users WHERE username=?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $username);

        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $dbHashedPassword = $row['password'];

            if (password_verify($password, $dbHashedPassword)) {
                $response = [
                    'success' => true,
                    'message' => 'Login successful',
                    'id' => $row['id'],
                    'username' => $row['username'],
                    'email' => $row['email'],
                ];
            } else {
                $response = ['success' => false, 'message' => 'Invalid password'];
            }
        } else {
            $response = ['success' => false, 'message' => 'Invalid username or password'];
        }

        $stmt->close();

        echo json_encode($response);
    }
}

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = new Login();
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    try {
        $loginResult = $login->userLogin($username, $password);
        echo $loginResult;
    } catch (Exception $e) {
        $response = ['success' => false, 'message' => 'Error during login'];
        echo json_encode($response);
    }
}
?>
