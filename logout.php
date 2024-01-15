<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Assuming you have some additional cleanup or logging to do during logout
// For example, you might want to log the user out of your application or perform other tasks.

// Unset all session variables
$_SESSION = array();

// Destroy the session
session_destroy();

// Return a success response
$response = ['success' => true, 'message' => 'Logout successful'];
echo json_encode($response);
?>
