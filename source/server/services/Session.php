<?php

// The namespace of the services of the project
namespace fsm\services;

// Import the required DAOs
require_once realpath(dirname(__FILE__).'/../dao/UsersDAO.php');

// Alias the namespaces for ease of use
use fsm\database as db;


// Interface for managing user session in the server; provides methods for
// logging in and out and for checking if the user is logged in
class Session
{
    // Constructor starts the session library
    function __construct()
    {
        session_start();
    }


    // Starts a new session for the user with the provided username and password
    // combination
    function start($username, $password)
    {
        // if there is a session already opened, close it before openning the 
        // new one
        if ($this->isOpen()) {
            $this->close();
        }

        // attempt to connect to the data base to retrieve the user information
        $users = new db\UsersDAO(db\connectToDataBase());
        $userInfo = $users->selectByIdentifier($username, $password);

        // check if the query was successful
        if (count($userInfo) > 0) {
            // if it was, there is the (very small) possibility that there might
            // be more than 1 entry in the DB with the given username and 
            // password combination, so if this is the case, we just return the
            // first hit
            $_SESSION = $userInfo[0];
            return $userInfo[0];
        } else {
            // if the query failed, it may be because the given username and 
            // password combination does not exist in the data base
            return NULL;
        }
    }


    // Returns true if a session is already open or false otherwise
    function isOpen()
    {
        return isset($_SESSION['id']);
    }


    // Returns the ID of the user which session is open
    function getID()
    {
        return (isset($_SESSION['id'])) ? $_SESSION[' id'] : -1;
    }


    // Closes the existing session 
    function close()
    {
        session_unset();
        session_destroy();
    }
}

?>