<?php

namespace fsm\services\zone;

require_once realpath(dirname(__FILE__).'/../dao/ZonesDAO.php');

use fsm\database as db;


$zoneServices = [
    'list-zones' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator', 'Director']
        ],
        'callback' => 'fsm\services\zone\getAllZones'
    ],
    'is-zone-name-duplicated' => [
        'requirements_desc' => [
            'logged_in' => [ 'Administrator' ],
            'zone_name' => [
                'type'=> 'string',
                'length' => 3
            ]
        ],
        'callback' => 'fsm\services\zone\isZoneNameDuplicated'
    ],
    'add-zone' => [
        'requirements_desc' => [
            'logged_in' => ['Administrator'],
            'new_zone' => [
                'type' => 'string',
                'length' => 3
            ]
        ],
        'callback' => 'fsm\services\zone\addNewZone'
    ]
];

// Returns a list of all zones
function getAllZones() 
{
    $zones = new db\ZonesDAO();
    return $zones->selectAll();
}


// Checks if the zone name is duplicated
function isZoneNameDuplicated() 
{
    // first we connect to the database
    $zones = new db\ZonesDAO();

    // then we check if the name is duplicated
    return $zone->hasByName($_POST['zone_name']);
}


// Stores a new zone in the data base
function addNewZone() 
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

?>