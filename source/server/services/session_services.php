<?php

namespace fsm\services\session;

require_once realpath(dirname(__FILE__).'/../Session.php');

use fsm;


$sessionServices = [
    'login' => [
        'requirements_desc' => [
            'username' => [
                'type' => 'string',
                'min_length' => 3
            ],
            'password' => [
                'type' => 'string',
                'min_length' => 6
            ]
        ],
        'callback' => 'fsm\services\session\logIn'
    ],
    'logout' => [
        'requirements_desc' => [],
        'callback' => 'fsm\services\session\logOut'
    ],
    'check-session' => [
        'requirements_desc' => [],
        'callback' => 'fsm\services\session\isLoggedIn'
    ]
];

// Logs the user into her account and starts a session
function logIn($request) 
{
    $session = new fsm\Session();
    $userInfo = $session->start($request['username'], $request['password']);
    
    if (isset($userInfo)) {
        return $userInfo;
    } else {
        throw new \Exception('Log in credentials where incorrect.');
    }
}


// Logs the user out from her account and ends the session
function logOut($request) 
{
    $session = new fsm\Session();
    $session->close();
    return [];
}


// Checks if the user is logged in
function isLoggedIn($request) 
{
    $session = new fsm\Session();
    try {
        $session->check();
    } catch (\Exception $e) {
        if ($e->getMessage() == 'The user is not logged in') {
            return false;
        }
        throw $e;
    }
    return true;
}

?>