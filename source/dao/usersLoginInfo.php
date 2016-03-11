<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the users_login_info table
class UsersLoginInfo extends Table
{
    // Default constructor
    function __construct()
    {
        parent::__construct("users_login_info");
    }
}

?>