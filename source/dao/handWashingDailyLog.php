<?php

namespace espresso;

require_once "workdayPeriods.php";

// Data Access Object for hand_washing_daily_log table
class HandWashingDailyLog extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("hand_washing_daily_log", "hwd");
    }
    
    
    // Returns the name of the 'workday_period_id' column
    function workdayPeriodId()
    {
        return $alias_.".workday_period_id";
    }
    
    
    // Returns the name of the 'date' column
    function date()
    {
        return $alias_.".date";
    }
    
    
    // Returns the name of the 'washed_hands' column
    function washedHands()
    {
        return $alias_.".washed_hands";
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
        $wp = new WorkdayPeriods();
        
        return innerJoin($dataBaseConnection, array($wp), 
            id().", ".date().", ".$wp->periodName().", ".$wp->startTime().
            ", ".$wp->endTime().", ".washedHands(), 
            array(workdayPeriodId()."=".$wp->id()), id()."=?", array($id));
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
        $wp = new WorkdayPeriods();
        
        return innerJoin($dataBaseConnection, array($wp), 
            id().", ".date().", ".$wp->periodName().", ".$wp->startTime().
            ", ".$wp->endTime().", ".washedHands(), 
            array(workdayPeriodId()."=".$wp->id()), "DATE(".date().")=DATE(?)",
            array($date));
    }
    
    
    // Deleted function
    function findByName($dataBaseConnection, $name) {}
}

?>