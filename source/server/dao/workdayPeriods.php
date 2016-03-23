<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\table.php";
}
else {
    require_once dirname(__FILE__)."/table.php";
}

// Data Access Object for the workday_periods table
class WorkdayPeriods extends Table
{
    // Creates an interface for interacting with the workday_periods table in 
    // the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "workday_periods");
    }

    
    // Returns a list of elements which are associated with the company zone of 
    // the especified ID in the data base
    function searchItemsByZoneID($zoneID)
    {
        return parent::join([
            "[><]company_zones" => [
                "company_zone_id" => "id"
            ]
        ], [
            "workday_periods.id",
            "company_zones.zone_name",
            "workday_periods.start_time",
            "workday_periods.end_time",
            "workday_periods.period_name"
        ], [
            "workday_periods.company_zone_id" => $zoneID
        ]);
    }
}

?>