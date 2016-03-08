<?php

namespace espresso;

require_once "dao.php";

class HandWashingWeeklyLogComments extends DAO
{
    function __construct()
    {
        parent::__construct("hand_washing_weekly_log_comments");
    }
    
    
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
    
    
    // Returns a list of the elements which have the specified date;
    // if the query fails, an exception is thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] date: a string defining the date of the element that we want to 
    //      look for in the table
    // [return] The rows read from the table ordered as an associative array
    //      using the column name as the key
    // [throws] If the query failed, an exception will be thrown 
    function findByDate($dataBaseConnection, $date) 
    {
        return select($dataBaseConnection, "*", "start_date=DATE(?)", 
            array($date));
    }
    
    
    // Deleted function
    function findByName($dataBaseConnection, $name) {}
}

?>