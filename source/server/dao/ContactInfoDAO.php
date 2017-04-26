<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/InsertableDAO.php");


// Data Access Object for the contact_info table
class ContactInfoDAO extends InsertableDAO
{
    // Creates an interface for interacting with the 
    // contact_info table in the specified data base
    function __construct()
    {
        parent::__construct('contact_info');
    }
}

?>