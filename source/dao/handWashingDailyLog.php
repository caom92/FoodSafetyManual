<?php

namespace espresso;

require_once "workdayPeriods.php"

// Data Access Object for hand_washing_daily_log table
class HandWashingDailyLog extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("hand_washing_daily_log");
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
        return innerJoin($dataBaseConnection, array(new WorkdayPeriods()), 
            "o.id, o.date, t0.period_name, t0.start_time, t0.end_time, ".
            "o.washed_hands", array("o.workday_period_id=t0.id"), 
            "o.id=?", array($id));
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
        return innerJoin($dataBaseConnection, array(new WorkdayPeriods()), 
            "o.id, o.date, t0.start_time, t0.end_time, t0.period_name, ".
            "o.washed_hands", array("o.workday_period_id=t0.id"), 
            "DATE(o.date)=DATE(?)", array($date));
    }
    
    
    // Deleted function
    function findByName($dataBaseConnection, $name) {}
}

?>