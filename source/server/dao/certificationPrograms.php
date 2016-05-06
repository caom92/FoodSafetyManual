<?php

// Namespace for the project's Data Access Objects
namespace espresso\dao;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataBaseTable.php");

// Data Access Object for the certification_programs table
class CertificationPrograms extends DataBaseTable
{
    // Creates an interface for interacting with the certification_programs 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "certification_programs");
    }
    
    
    // Returns a list of elements that have the especified certification program
    // ID 
    function searchItemsByID($id)
    {
        return parent::select("*", ["id" => $id]);
    }
    
    
    // Updates the information of the entries in the data base table that have
    // the especified ID
    function updateItemDataByID($id, $newData)
    {
        return parent::update($newData, [ "id" => $id ]);
    }
}

?>