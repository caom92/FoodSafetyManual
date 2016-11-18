<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the logs table
class LogsDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // users table in the specified data base
    function __construct()
    {
        parent::__construct("logs");
    }


    // Returns an associative array containing a list of all the logs stored
    // in the data base alongside the program they belong to and the 'read'
    // privilege data
    // [out]    return: an associative array if there are any logs or NULL
    //          otherwise
    function selectAllWithReadPrivilege()
    {
        return parent::$dataBase->query(
            "SELECT 
                p.id AS program_id,
                p.name AS program_name,
                m.id AS module_id,
                m.name AS module_name,
                l.id AS log_id,
                l.name AS log_name,
                r.id AS privilege_id,
                r.name AS privilege_name
            FROM $this->table AS l
                INNER JOIN modules AS m
                    ON l.module_id = m.id 
                INNER JOIN programs AS p
                    ON m.program_id = p.id
                INNER JOIN `privileges` AS r
                    ON r.name = 'Read'
            WHERE 1
            ORDER BY p.id, m.id, l.id"
        )->fetchAll();
    }
}

?>