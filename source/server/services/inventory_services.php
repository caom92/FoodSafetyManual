<?php

namespace fsm\services\inventory;

require_once realpath(dirname(__FILE__).'/../dao/WorkingAreasDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ItemsDAO.php');

use fsm\database as db;


// Lists the areas of the specified zone
function getWorkingAreasOfZone() 
{
    $areas = new db\WorkingAreasDAO();
    return $areas->selectByZoneID($_POST['zone_id']);
}


// Lists the items in the specified area
function getItemsOfWorkingArea() 
{
    $items = new db\ItemsDAO();
    return $items->selectByAreaID($_POST['area_id']);
}


// Toggles the activation of the specified item
function toggleActivationOfItem() 
{
    $items = new db\ItemsDAO();
    $items->toggleActivationByID($_POST['item_id']);
    return [];
}


// Adds a new inventory item to the specified area
function addNewItem() 
{
    // first connect to the data base
    $items = new db\ItemsDAO();

    // count the number of items in this area
    // so we can compute the position of this item and add it
    // in the last position
    $numItemsInArea = $items->countByAreaID($_POST['area_id']);

    // store the item in the data base 
    return $items->insert(
        $_POST['area_id'],
        $numItemsInArea + 1,
        $_POST['name']
    );
}

?>