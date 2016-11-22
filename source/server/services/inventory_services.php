<?php

namespace fsm\services\inventory;

require_once realpath(dirname(__FILE__).'/../dao/WorkingAreasDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ItemsDAO.php');
require_once realpath(dirname(__FILE__).'/../dao/ItemTypesDAO.php');

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


// List all the item types
function getAllItemTypes()
{
    $types = new db\ItemTypesDAO();
    return $types->selectAll();
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
    return $items->insert([
        'area_id' => $_POST['area_id'],
        'type_id' => $_POST['type_id'],
        'is_active' => TRUE,
        'position' => $numItemsInArea + 1,
        'name' => $_POST['name']
    ]);
}


// Changes the position of the specified item
function changeItemPosition()
{
    $items = new db\ItemsDAO();
    $items->updatePositionByID($_POST['item_id'], $_POST['position']);
    return [];
}


// [***]
// Returns a list of all the items in a zone grouped by working areas and item 
// type
function getItemsOfZone()
{
    // first, connect to the data base and get all the items by zone
    $itemsTable = new db\ItemsDAO();
    $rows = $itemsTable->selectByZoneID($_SESSION['zone_id']);

    // final array where the working areas are going to be stored
    $areas = [];

    // temporary storage for a single working area
    $area = [
        'id' => 0,
        'name' => '',
        'types' => []
    ];

    // temporary storage for a single item type
    $type = [
        'id' => 0,
        'name' => '',
        'items' => []
    ];

    // for each row obtained from the data base...
    foreach ($rows as $row) {
        // check if the working area has changed
        $hasAreaChanged = $row['area_id'] != $area['id'];
        if ($hasAreaChanged) {
            // if it has, first, check if the current working area info is not 
            // empty
            if ($area['id'] != 0) {
                // if it's not, then push it to the final array
                array_push($area['types'], $type);
                array_push($areas, $area);
            }

            // then, store the new item, item type and working area info in 
            // their corresponding temporal storage 
            $item = [
                'id' => $row['item_id'],
                'name' => $row['item_name'],
                'order' => $row['item_order']
            ];
            $type = [
                'id' => $row['type_id'],
                'name' => $row['type_name'],
                'items' => [ $item ]
            ];
            $area = [
                'id' => $row['area_id'],
                'name' => $row['area_name'],
                'types' => []
            ];
        } else {
            // if the current working area has not changed, check if the 
            // current item type group has
            $hasTypeChanged = $row['type_id'] != $type['id'];
            if ($hasTypeChanged) {
                // if it has, push the current item type info to the current 
                // working area temporal storage
                array_push($area['types'], $type);

                // then store the new item and item type info in their 
                // corresponding temporal storage
                $item = [
                    'id' => $row['item_id'],
                    'name' => $row['item_name'],
                    'order' => $row['item_order']
                ];
                $type = [
                    'id' => $row['type_id'],
                    'name' => $row['type_name'],
                    'items' => [ $item ]
                ];
            } else {
                // if the current item type info has not changed, then push the 
                // new item info to the current item type info temporal storage
                array_push($type['items'], [
                    'id' => $row['item_id'],
                    'name' => $row['item_name'],
                    'order' => $row['item_order']
                ]);
            }   // if ($hasTypeChanged)
        } // if ($hasAreaChanged)
    } // foreach ($rows as $row)

    // don't forget to push the last entries to the final array
    if ($type['id'] != 0) {
        array_push($area['types'], $type);
    }

    if ($area['id'] != 0) {
        array_push($areas, $area);
    }

    // return the resulting info
    return [
        'zone_name' => $_SESSION['zone_name'],
        'program_name' => 'GMP',
        'module_name' => 'Packing',
        'log_name' => 'Pre-Operational Inspection',
        'areas' => $areas
    ];
}

?>