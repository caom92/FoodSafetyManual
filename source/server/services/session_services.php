<?php

namespace fsm\services\session;

require_once realpath(dirname(__FILE__).'/../Session.php');


// Logs the user into her account and starts a session
function logIn() 
{
    $session = new fsm\Session();
    $userInfo = $session->start($_POST['username'], $_POST['password']);
    
    if (isset($userInfo)) {
        return $userInfo;
    } else {
        throw new \Exception('Log in credentials where incorrect.');
    }
}


// Logs the user out from her account and ends the session
function logOut() 
{
    $session = new fsm\Session();
    $session->close();
    return [];
}


// Checks if the user is logged in
function isLoggedIn() 
{
    $session = new fsm\Session();
    return $session->isOpen();
}

?>