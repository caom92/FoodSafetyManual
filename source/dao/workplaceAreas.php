<?php

namespace espresso;

require_once "companyDepartments.php";

// Data Access Object for the workplace_areas table
class WorkplaceAreas extends DAO
{
    // Default constructor
    function __construct()
    {
        parent::__construct("workplace_areas");
    }
    
    
    // Returns a string with the name of the 'company_department_id' column
    function companyDepartmentId()
    {
        return $alias_.".company_department_id";
    }
    
    
    // Returns a string with the name of the 'area_name' column
    function areaName()
    {
        return $alias_.".area_name";
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
        $cz = new CompanyZones();
        $cd = new CompanyDepartments();
        
        return innerJoin($dataBaseConnection, array($cz, $cd), 
            id().", ".$cz->zoneName().", ".$cd->departmentName().", "
            .areaName(), array($cd->companyZoneId()."=".$cz->id(),
            companyDepartmentId()."=".$cd->id()), 
            id()."=?", array($id)); 
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
        $cz = new CompanyZones();
        $cd = new CompanyDepartments();
        
        return innerJoin($dataBaseConnection, array($cz, $cd), 
            id().", ".$cz->zoneName().", ".$cd->departmentName().", "
            .areaName(), array($cd->companyZoneId()."=".$cz->id(),
            companyDepartmentId()."=".$cd->id()), 
            areaName()."=?", array($name)); 
    }
    
    
    // Deleted function
    function findByDate($dataBaseConnection, $date) {}
}

?>