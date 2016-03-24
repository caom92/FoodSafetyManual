<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\table.php";
}
else {
    require_once dirname(__FILE__)."/table.php";
}

// Data Access Object for the certification_programs table
class CertificationPrograms extends Table
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
}

?>