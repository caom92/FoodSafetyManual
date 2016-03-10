<?php
    // This file simply saves information necessary for connecting to the 
    // SQL database of the project

    // The main namespace for the project's functions and classes
    namespace espresso;
    
    require_once "../../external/medoo/medoo.php";
    
    // Database connection information
    const HOST = "localhost";
    const DATA_BASE = "del_cabo";
    const USER = "admin";
    const PASSWORD = "awesomesupersecretcode";
    
    // Attempts to connect to the database and returns the connection if
    // succeeded
    function getDataBase()
    {
        return new medoo([
            "database_type" => "mysql",
            "database_name" => DATA_BASE,
            "server" => HOST,
            "username" => USER,
            "password" => PASSWORD,
            "charset" => "utf8",
            "option" => [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false
            ] 
        ]);
    }
?>