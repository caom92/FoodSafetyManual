<?php

namespace fsm\services\gmp\packing\glass;

require_once realpath(dirname(__FILE__).'/../../../globals.php');

use fsm;

$gmpPackingGlassServices = [
    'upload-manual-gmp-packing-glass-brittle' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Glass & Brittle Plastic Inspection'
            ],
            'files' => [
                'name' => 'manual_file',
                'format' => 'document'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\glass\uploadManualFile'
    ],
    'toggle-gmp-packing-glass-brittle' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Glass & Brittle Plastic Inspection'
            ],
            'id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 
            'fsm\services\gmp\packing\glass\toggleItemActivation'
    ],
    'add-item-gmp-packing-glass-brittle' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Glass & Brittle Plastic Inspection'
            ],
            'area_id' => [
                'type' => 'int',
                'min' => 1
            ],
            'name' => [
                'type' => 'string',
                'max_length' => 64
            ],
            'quantity' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\glass\addGlassItem'
    ],
    'inventory-gmp-packing-glass-brittle' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Glass & Brittle Plastic Inspection'
            ],
            'area_id' => [
                'type' => 'int',
                'min' => 1
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\glass\getAllItemsOfArea'
    ]
];



// Recieves a PDF file and stores it as the new manual for the Pre-Op log
function uploadManualFile($scope, $request)
{
    fsm\uploadManualFile('gmp', 'packing', 'glass');
}


// Toggles the activation status of an item with the especified ID
function toggleItemActivation($scope, $request)
{
    $scope->areaGlass->toggleActivationByID($request['id']);
}


// Adds a new inventory item to the specified area
function addGlassItem($scope, $request)
{
    // count the number of items in this area
    // so we can compute the position of this item and add it
    // in the last position
    $numItemsInArea = $scope->areaGlass->countByAreaID($request['area_id']);

    // store the item in the data base 
    return $scope->areaGlass->insert([
        'area_id' => $request['area_id'],
        'is_active' => TRUE,
        'position' => $numItemsInArea + 1,
        'quantity' => $request['quantity'],
        'name' => $request['name']
    ]);
}


// Returns a list of all the items inside the working area with the especified 
// ID
function getAllItemsOfArea($scope, $request)
{
    // get the items from the data base
    return $scope->areaGlass->selectByAreaID($request['area_id']);
}

?>