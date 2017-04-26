<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;


// Data Access Object for the quality_types table
class QualityTypesDAO
{
    // Creates an interface for interacting with the 
    // quality_types table in the specified data base
    function __construct()
    {
        parent::__construct('quality_types');
    }


    // Returns an associative which contains the list of quality types
    function selectAll()
    {
        return parent::select('*');
    }
}

?>