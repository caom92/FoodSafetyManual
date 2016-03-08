<?php

namespace espresso;

require_once "dao.php";

// Data Access Object for the company_zones table
class AccessPermitions extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("company_zones", "cz");
    }
    
    
    // Returns the name of the 'zone_name' column
    function zoneName()
    {
        return $alias_.".zone_name";
    }
    
    
    // Returns the element which has the specified id in the table; if the query
    // fails, an exception is thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] id: the id of the permission that we want to look for in the 
    //      table
    // [return] The row read from the table ordered as an associative array
    //      using the column name as the key
    // [throws] If the query failed, an exception will be thrown
    function findById($dataBaseConnection, $id)
    {
        return select($dataBaseConnection, "*", "id=?", array($id));
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
    function findByName($dataBaseConnection, $name)
    {
        return select($dataBaseConnection, "*", "zone_name=?", array($name));
    }
    
    
    // Deleted function
    function findByDate($dataBaseConnection, $date) {}
}

?>