<?php

namespace espresso;

require_once "companyZones.php"

// Data Access Object for the company_departments table
class CompanyDepartments extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("company_departments");
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
        return innerJoin($dataBaseConnection, array(new CompanyZones()), 
            "o.id, t0.zone_name, o.department_name", 
            array("o.company_zone_id=t0.id"), "o.id=?", array($id));
    }
    
    
    // Returns a list of elements which have the specified department name;
    // if the query fails, an exception is thrown
    // [in] dataBaseConnection: the object representing a connection to the
    //      data base to be queried
    // [in] name: the name of the department that we want to look for in the 
    //      table
    // [return] The rows read from the table ordered as an associative array
    //      using the column name as the key
    // [throws] If the query failed, an exception will be thrown
    function findByName($dataBaseConnection, $name)
    {   
        return innerJoin($dataBaseConnection, array(new CompanyZones()), 
            "o.id, t0.zone_name, o.department_name", 
            array("o.company_zone_id=t0.id"), "o.department_name=?", 
            array($name));
    }
    
    
    // Deleted function
    function findByDate($dataBaseConnection, $date) {}
}

?>