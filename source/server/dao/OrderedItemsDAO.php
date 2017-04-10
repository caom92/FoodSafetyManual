<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/ToggableItemsDAO.php");


// A data access object which table that represents includes a position column
// which contains an unsigned integer value that can be updated
class OrderedItemsDAO extends ToggableItemsDAO
{
    // Creates an interface for interacting with the especified table in the
    // data base
    function __construct($tableName)
    {
        parent::__construct($tableName);
    }


    // Updates the position of the specified item
    function updatePositionByID($id, $position)
    {
        return parent::update(
            [ 'position' => $position ], 
            [ 'id' => $id ]
        );
    }
}

?>