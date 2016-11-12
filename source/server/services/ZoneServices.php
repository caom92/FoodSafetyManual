<?php

namespace fsm\services;

require_once realpath(dirname(__FILE__).'/Service.php');
require_once realpath(dirname(__FILE__).'/../dao/ZonesDAO.php');

use fsm\database as db;


// Service that returns a list of all zones
class ListAllZonesService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => ['Administrator']
        ];
    }


    // Starts execution of the service
    function execute()
    {
        $zones = new db\ZonesDAO();
        return $zones->selectAll();
    }
}


// Service that stores a new zone in the data base
class AddNewZoneService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => ['Administrator'],
            'new_zone' => [
                'type' => 'string',
                'length' => 3
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        // first we connect to the database
        $zones = new db\ZonesDAO();

        // then we check if the name is duplicated
        $isZoneNameDuplicated = $zones->hasByName($_POST['new_zone']);
        if (!$isZoneNameDuplicated) {
            // if it's not, store it
            $zones->insert($_POST['new_zone']);
            return [];
        } else {
            throw new \Exception('Cannot add new zone; name is already taken.');
        }
    }
}


// Service that checks if the zone name is duplicated
class CheckZoneNameDuplicationService implements Service
{
    // Returns an associative array of associative arrays which describe the 
    // user permission and input arguments values and formats that this service 
    // is expecting to recieve 
    function getRequirementsDescriptor()
    {
        return [
            'logged_in' => [ 'Administrator' ],
            'zone_name' => [
                'type'=> 'string',
                'length' => 3
            ]
        ];
    }


    // Starts execution of the service
    function execute()
    {
        // first we connect to the database
        $zones = new db\ZonesDAO();

        // then we check if the name is duplicated
        return $zone->hasByName($_POST['zone_name']);
    }
}

?>