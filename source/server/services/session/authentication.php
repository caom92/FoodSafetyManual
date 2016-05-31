<?php

require_once realpath(dirname(__FILE__)."/../../dao/UsersProfileInfo.php");

use espresso\dao as dao;

try {
    $dataBaseConnection = dao\connectToDataBase();
    $usersProfileTable = new dao\UsersProfileInfo($dataBaseConnection);
    
    $byLogin = count($usersProfileTable->searchItemsByLogInNameAndPassword($_POST["username"], $_POST["password"]));
    
    $byID = count($usersProfileTable->searchItemsByEmployeeIDAndPassword($_POST["username"], $_POST["password"]));
    
    $byEmail = count($usersProfileTable->searchItemsByEmailAndPassword($_POST["username"], $_POST["password"]));
    
} catch (Exception $e) {
    echo $e->getMessage();
}

if ($byLogin > 0 || $byID > 0 || $byEmail > 0) {
    echo "OK";
} else {
    echo ":'v";
}

?>