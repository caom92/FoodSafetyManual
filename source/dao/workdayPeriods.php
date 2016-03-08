<?php

namespace espresso

require_once "dao.php"

class WorkdayPeriods extends DAO
{
    // Returns the element which has the specified id in the table; if the query
    // fails, an exception is thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] id: the id of the element that we want to look for in the 
    //      table
    // [return] The row read from the table ordered as an associative array
    //      using the column name as the key
    // [throws] If the query failed, an exception will be thrown
    function findById($dataBaseConnection, $id) 
    {
        return select($dataBaseConnection, "*", "id=?", array($id));
    }
    
    
    // Returns a list of elements which have the specified name;
    // if the query fails, an exception is thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] name: the name of the element that we want to look for in the 
    //      table
    // [return] The rows read from the table ordered as an associative array
    //      using the column name as the key
    // [throws] If the query failed, an exception will be thrown
    function findByName($dataBaseConnection, $name)
    {
        return select($dataBaseConnection, "*", "period_name=?", array($name));
    }
    
    
    // Deleted function
    function findByDate($dataBaseConnection, $date) {}
}

?>