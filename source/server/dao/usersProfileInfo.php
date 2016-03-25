<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\table.php";
}
else {
    require_once dirname(__FILE__)."/table.php";
}

// Data Access Object for the users_profile_info table
class UsersProfileInfo extends Table
{
    // Creates an interface for interacting with the 
    // users_profile_info table in the specified data base
    function __construct($dataBaseConnection)
    {
        parent::__construct($dataBaseConnection, "users_profile_info");
    }
    
    
    // Inserts the data to the data base
    // [in]    items: an array of associative arrays which define the rows to
    //         be inserted, where the key is the column name
    // [out]   return: the ID of the last inserted item
    function saveItems($items)
    {
        return parent::insert($items);
    }
}

?>