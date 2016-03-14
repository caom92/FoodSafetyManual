<?php

require_once dirname(__FILE__)."\\table.php";

// Data Access Object for the users_login_info table
class UsersLoginInfo extends Table
{
    // Creates an interface for interacting with the users_login_info table in 
    // the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "users_login_info");
    }
}

?>