<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the access_permitions table
class AccessPermissions extends Table
{
    // Creates an interface for interacting with the access_permitions table in 
    // the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "access_permissions");
    }
    
    
    // Returns a list of elements which have the specified name
    function findItemsByName($name)
    {
        return select(["*"], ["permission_name" => $name]);
    }
}

?>