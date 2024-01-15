<?php
session_start();

$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
$username = isset($_SESSION['username']) ? $_SESSION['username'] : null;
$email = isset($_SESSION['email']) ? $_SESSION['email'] : null;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

error_reporting(E_ALL);

error_log("User ID: " . $user_id);
error_log("Username: " . $username);
error_log("Email: " . $email);

if ($user_id !== null) {
    $userData = [
        'id' => $user_id,
        'username' => $username,
        'email' => $email,
    ];

    $response = ['success' => true, 'user' => $userData, 'sessionId' => session_id()];
} else {
    error_log("User not logged in");

    $response = ['success' => false, 'message' => 'User not logged in', 'sessionId' => session_id()];
}
echo json_encode($response);

?>
