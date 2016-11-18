<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Service.php');
require_once realpath(dirname(__FILE__).'/../dao/InventoryDAO.php');

use fsm\database as db;


// Service for listing the inventory items for an specified module in an 
// specified zone
class ListInventoryItemsService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => ['Administrator'],
            'zone_id' => [
                'type' => 'int'
            ],
            'module_id' => [
                'type' => 'int'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $inventory = new db\InventoryDAO();
        return $inventory->selectByZoneIDAndModuleID(
            $_POST['zone_id'], 
            $_POST['module_id']
        );
    }
}


// Service for discharging an inventory item
class DischargeInventoryItemService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => [ 'Administrator'],
            'item_id' => [
                'type' => 'int'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $inventory = new db\InventoryDAO();
        $inventory->updateStatusByID($_POST['item_id'], 0);
        return [];
    }
}


// Service for adding a new inventory item to the data base
class AddNewInventoryItemService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => ['Administrator'],
            'zone_id' => [
                'type' => 'int'
            ],
            'module_id' => [
                'type' => 'int'
            ],
            'name' => [
                'type' => 'string'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $inventory = new db\InventoryDAO();
        return $inventory->insert([
            'zone_id' => $_POST['zone_id'], 
            'module_id' => $_POST['module_id'], 
            'name' => $_POST['name'],
            'is_active' => 1
        ]);
    }
}


// Service that lists all the available inventory items of the specified 
// module in the specified zone
class ListAvailableInventoryItemsService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => 'any',
            'zone_id' => [
                'type' => 'int'
            ],
            'module_id' => [
                'type' => 'int'
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $inventory = new InventoryDAO();
        return $inventory->selectActiveByZoneIDAndModuleID(
            $_POST['zone_id'], 
            $_POST['module_id']
        );
    }
}

?>