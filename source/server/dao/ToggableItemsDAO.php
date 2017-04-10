<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/../../../InsertableDAO.php");


// A data access object which table that represents includes a is_active column
// which contains a boolean value that can be toggled true or false
class ToggableItemsDAO extends InsertableDAO
{
    // Creates an interface for interacting with the especified table in the
    // data base
    function __construct($tableName)
    {
        parent::__construct($tableName);
    }


    // Toggle the activation status of the item with the especified ID
    function toggleActivationByID($itemID)
    {
        return parent::$dataBase->query(
            "UPDATE $this->table
            SET is_active = !is_active
            WHERE id = '$itemID'"
        )->fetchAll();
    }
}

?>