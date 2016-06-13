<?php

// This script straightforwardly closes the current session
session_start();
session_unset();
session_destroy();
header("Content-Type: application/json");
echo json_encode([
    "meta" => [
        "return_code" => 0,
        "message" => "User has logged out. Good bye."
    ],
    "data" => []
]);

?>