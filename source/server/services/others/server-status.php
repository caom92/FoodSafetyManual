<?php

// Import the data base config file
require_once realpath(dirname(__FILE__)."/../../config.php");

// import the data access objects namespace
use espresso\dao as dao;

// try to connect to the database
try {
    // if the connection was successful, let the client know
    dao\connectToDataBase();
    echo "data base server is available";
} catch (Exception $e) {
    // otherwise send an error message
    echo $e->getMessage();
}

?>