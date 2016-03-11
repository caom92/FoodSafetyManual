<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the access_permitions table
class AccessPermissions extends Table
{
    // Default constructor
    function __construct()
    {
        parent::__construct("access_permissions");
    }
    
    
    // Returns a list of elements which have the specified name
    function findItemByName($name)
    {
        return select(["*"], ["permission_name" => $name]);
    }
}

?>