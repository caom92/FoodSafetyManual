<?php

namespace espresso;

require_once "dao.php";

// Data Access Object for the access_permitions table
class AccessPermitions extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("access_permitions");
    }
    
    
    // Returns a list of elements which have the specified name
    function findByName($name)
    {
        return select(["*"], ["permission_name" => $name]);
    }
}

?>