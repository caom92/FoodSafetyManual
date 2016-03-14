<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the certification_programs table
class CertificationPrograms extends Table
{
    // Creates an interface for interacting with the certification_programs 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "certification_programs");
    }
    
    
    // Returns a list of elements which have the specified name
    function findItemsByName($name)
    {
        return select(["*"], ["certification_program_name" => $name]);
    }
}

?>