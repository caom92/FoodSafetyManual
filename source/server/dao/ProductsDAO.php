<?php

// Namespace for the project's Data Access Objects
namespace fsm\database;

// Importing required classes
require_once realpath(dirname(__FILE__)."/InsertableDAO.php");


// Data Access Object for the products table
class ProductsDAO extends db\InsertableDAO
{
    // Creates an interface for interacting with the 
    // products table in the specified data base
    function __construct()
    {
        parent::__construct('products');
    }


    // Returns an associative which contains the list all the registered 
    // products
    function selectCode()
    {
        return parent::select(['id', 'code']);
    }
}

?>