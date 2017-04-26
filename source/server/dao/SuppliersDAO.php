<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/InsertableDAO.php");


// Data Access Object for the suppliers table
class SuppliersDAO extends InsertableDAO
{
    // Creates an interface for interacting with the 
    // suppliers table in the specified data base
    function __construct()
    {
        parent::__construct('suppliers');
    }


    // Returns an associative which contains the list of the codes of 
    // all the registered suppliers
    function selectCode()
    {
        return parent::select(
            [ "$this->table.id", 'code' ],
            [],
            [
                '[><]contact_info(i)' => [
                    'contact_info_id' => 'id'
                ]
            ]
        );
    }


    // Returns a list of all the suppliers registered
    function selectAll()
    {
        return parent::select(
            [ 
                "$this->table.id", 
                "i.company_name(name)",
                'i.contact_name(contact_name)',
                'i.phone_num(phone_num)',
                'i.email(email)',
                'code'
            ],
            [],
            [
                '[><]contact_info(i)' => [
                    'contact_info_id' => 'id'
                ]
            ]
        );
    }
}

?>