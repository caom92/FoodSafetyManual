<?php

// Namespace for the project's Data Access Objects
namespace espresso\dao;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataBaseTable.php");

// Data Access Object for the recovering_passwords table
class RecoveringPasswords extends DataBaseTable
{
    // Creates an interface for interacting with the 
    // users_profile_info table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "recovering_passwords");
    }


    // Returns an associative array containing the data of the element which
    // has the especified recovery token
    // [in]        recoveryToken: the recovery token that we want to search
    //             for in the table
    // [out]       return: an associative array with the data of the element
    //             that contained the especified recovery token, or an empty 
    //             string in case none was found
    function searchItemsByRecoveryToken($recoveryToken)
    {
        return parent::select("*", ["recovery_token" => $recoveryToken]);
    }


    // Inserts the data to the data base
    // [in]    items: an array of associative arrays which define the rows to
    //         be inserted, where the key is the column name
    // [out]   return: the ID of the last inserted item
    function saveItems($items)
    {
        return parent::insert($items);
    }


    // Deletes from the table the items that have the especified ID
    // [in]    id: the ID of the item that we want to delete 
    // [out]   return: the number of rows that where deleted
    function deleteItemsByID($id)
    {
        return parent::delete(["id" => $id]);
    }


    // Deletes from the table the items that are associated with the especified
    // user ID
    // [in]    id: the ID of the user which items in this table we want to 
    //         delete 
    // [out]   return: the number of rows that where deleted
    function deleteItemsByUserID($userID)
    {
        return parent::delete(["user_id" => $userID]);
    }
}

?>