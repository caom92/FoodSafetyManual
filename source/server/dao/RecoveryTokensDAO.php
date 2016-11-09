<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/DataAccessObject.php");

// Data Access Object for the recovery_tokens table
class RecoveryTokensDAO extends DataAccessObject
{
    // Creates an interface for interacting with the 
    // recovery_tokens table in the specified data base
    function __construct()
    {
        parent::__construct("recovery_tokens");
    }


    // Returns an associative array containing the data of the element which
    // has the especified recovery token
    // [in]        token: the recovery token that we want to search
    //             for in the table
    // [out]       return: an associative array with the data of the element
    //             that contained the especified recovery token, or an empty 
    //             string in case none was found
    function getByToken($token)
    {
        return parent::get("*", ["token" => $token]);
    }


    // Inserts the data to the data base
    // [in]    items: an array of associative arrays which define the rows to
    //         be inserted, where the key is the column name
    // [out]   return: the ID of the last inserted item
    function insert($items)
    {
        return parent::insert($items);
    }


    // Deletes from the table the items that have the especified ID
    // [in]    id: the ID of the item that we want to delete 
    // [out]   return: the number of rows that where deleted
    function deleteByID($id)
    {
        return parent::delete(["id" => $id]);
    }


    // Deletes from the table the items that are associated with the especified
    // user ID
    // [in]    id: the ID of the user which items in this table we want to 
    //         delete 
    // [out]   return: the number of rows that where deleted
    function deleteByUserID($userID)
    {
        return parent::delete(["user_id" => $userID]);
    }
}

?>