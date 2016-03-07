<?php
    // This file simply saves information necessary for connecting to the 
    // SQL database of the project

    // The main namespace for the project's functions and classes
    namespace espresso;
    
    // Database connection information
    const HOST = "localhost";
    const DATA_BASE = "del_cabo";
    const USER = "admin";
    const PASSWORD = "awesomesupersecretcode";
    
    // Attempts to connect to the database and returns the connection if
    // succeeded
    function getDataBase()
    {
        $dataBaseConnection = new PDO("mysql:host=".HOST
            ."dbname=".DATA_BASE, USER, PASSWORD);
            
        $dataBaseConnection->setAttribute(PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION);
            
        $dataBaseConnection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        
        return $dataBaseConnection;
    }
?>