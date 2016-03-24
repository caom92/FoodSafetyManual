<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\table.php";
}
else {
    require_once dirname(__FILE__)."/table.php";
}

// Data Access Object for the pdf_file_paths table
class PDFFilePaths extends Table
{
    // Creates an interface for interacting with the pdf_file_paths_table 
    // table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "pdf_file_paths");
    }
    
    
    // Returns a list of elements that have the especified certification program
    // ID and section title
    function searchItemsByProgramIDAndTitleName($id, $title)
    {
        return parent::select(["file_name"], [
            "AND" => [
                "program_id" => $id,
                "title_name" => $title
            ]
        ]);
    }
}

?>