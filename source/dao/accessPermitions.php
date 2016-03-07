<?php

namespace espresso;

require_once "dao.php"

// Data Access Object for the access_permitions table
class AccessPermitions extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("access_permitions");
    }
    
    
    // Returns a list of elements which have the specified permission name;
    // if the query fails, an exception is thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] name: the name of the permission that we want to look for in the 
    //      table
    // [return] The rows read from the table ordered as an associative array
    //      using the column name as the key
    // [throws] If the query failed, an exception will be thrown
    function find($dataBaseConnection, $name)
    {
        return select($dataBaseConnection, "*", "permission_name=?", 
            array($name));
    }
}

?>