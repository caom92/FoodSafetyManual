<?php

namespace espresso;

require_once "companyZones.php";

// Data Access Object for the company_departments table
class CompanyDepartments extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("company_departments", "cd");
    }
    
    
    // Returns the name of the 'company_zone_id' column
    function companyZoneId()
    {
        return $alias_.".company_zone_id";
    }
    
    
    // Returns the name of the 'department_name' column
    function departmentName()
    {
        return $alias_.".department_name";
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
        $cz = new CompanyZones();
        
        return innerJoin($dataBaseConnection, array($cz),
            id().", ".$cz->zoneName().", ".departmentName(),
            array(companyZoneId()."=".$cz->id()), id()."=?", 
            array($id));
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
        $cz = new CompanyZones();
        
        return innerJoin($dataBaseConnection, array($cz),
            id().", ".$cz->zoneName().", ".departmentName(),
            array(companyZoneId()."=".$cz->id()), departmentName()."=?", 
            array($name));
    }
    
    
    // Deleted function
    function findByDate($dataBaseConnection, $date) {}
}

?>