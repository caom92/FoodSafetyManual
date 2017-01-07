<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the zones table
class ZonesDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // zones table in the specified data base
    function __construct()
    {
        parent::__construct("zones");
    }


    // Returns the data of the zone with the given id if it exists in 
    // the data base or NULL otherwise
    function getByID($zoneID)
    {
        return parent::get('*', [ 'id' => $zoneID ]);
    }


    // Returns an associative array containing all the data elements
    // of the table
    // [out]    return: an associative array with the data contained in
    //          the data base table
    function selectAll()
    {
        return parent::select("*", [ 'ORDER' => 'id' ]);
    }


    // Searches a zone with the given name and returns its data if it 
    // found it or NULL otherwise
    function hasByName($zoneName)
    {
        return parent::has([
            'name' => $zoneName
        ]);
    }


    // Inserts a new zone in the table with the given zone name
    function insert($zoneName)
    {
        return parent::insert([ 'name' => $zoneName ]);
    }
}

?>