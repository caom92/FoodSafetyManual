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
    ],
    'log-gmp-packing-glass-brittle' => [
        'requirements_desc' => [
            'logged_in' => ['Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Glass & Brittle Plastic Inspection'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\glass\getActiveAreaItems'
    ],
    'capture-gmp-packing-glass-brittle' => [
        'requirements_desc' => [
            'logged_in' => ['Employee'],
            'has_privileges' => [
                'privilege' => 'Write',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Glass & Brittle Plastic Inspection'
            ],
            'date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ],
            'time' => [
                'type' => 'datetime',
                'format' => 'G:i'
            ],
            'notes' => [
                'type' => 'string',
                'max_length' => 256,
                'optional' => true
            ],
            'areas' => [
                'type' => 'array',
                'values' => [
                    'id' => [
                        'type' => 'int',
                        'min' => 1
                    ],
                    'items' => [
                        'type' => 'array',
                        'values' => [
                            'id' => [
                                'type' => 'int',
                                'min' => 1
                            ],
                            'is_acceptable' => [
                                'type' => 'bool'
                            ]
                        ]
                    ]
                ]
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\glass\registerLogEntry'
    ],
    'report-gmp-packing-glass-brittle' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor', 'Employee'],
            'has_privileges' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Glass & Brittle Plastic Inspection'
            ],
            'start_date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ],
            'end_date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\glass\getReportData'
    ],
    'reorder-gmp-packing-glass-brittle' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Glass & Brittle Plastic Inspection',
                'privilege' => 'Read'
            ],
            'item_id' => [
                'type' => 'int',
                'min' => 1
            ],
            'position' => [
                'type' => 'int'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\glass\changeItemPosition'
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


// Returns a list of all active items organized per working area
function getActiveAreaItems($scope, $request)
{
    // get session segment
    $segment = $scope->session->getSegment('fsm'); 
    $rows = $scope->areaGlass->selectActiveByZoneID($segment->get('zone_id'));

    // final array where the working areas are going to be stored
    $areas = [];

    // temporary storage for a single working area
    $area = [
        'id' => 0,
        'name' => '',
        'items' => []
    ];

    // [***]
    // for each row obtained from the data base...
    foreach ($rows as $row) {
        // check if the working area has changed
        $hasAreaChanged = $row['area_id'] != $area['id'];
        if ($hasAreaChanged) {
            // if it has, first, check if the current working area info is not 
            // empty
            if ($area['id'] != 0) {
                // if it's not, then push it to the final array
                array_push($area['items'], [
                    'id' => $row['item_id'],
                    'name' => $row['item_name'],
                    'order' => $row['order'],
                    'quantity' => $row['quantity']
                ]);
                array_push($areas, $area);
            }

            // then, store the new item, item type and working area info in 
            // their corresponding temporal storage 
            $area = [
                'id' => $row['area_id'],
                'name' => $row['area_name'],
                'items' => [[
                    'id' => $row['item_id'],
                    'name' => $row['item_name'],
                    'order' => $row['order'],
                    'quantity' => $row['quantity']
                ]]
            ];
        } else {
            // if the current area has not changed, then push the 
            // new item info to the current area's temporal storage
            array_push($area['items'], [
                'id' => $row['item_id'],
                'name' => $row['item_name'],
                'order' => $row['order'],
                'quantity' => $row['quantity']
            ]);
        } // if ($hasAreaChanged)
    } // foreach ($rows as $row)

    // don't forget to push the last entries to the the end of the array
    if ($area['id'] != 0) {
        array_push($areas, $area);
    }

    // return the resulting info
    return [
        'zone_name' => $segment->get('zone_name'),
        'program_name' => 'GMP',
        'module_name' => 'Packing',
        'log_name' => 'Glass & Brittle Plastic Inspection',
        'areas' => $areas
    ];
}


// Saves a new log entry to the database
function registerLogEntry($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // get the ID of the log that we are working with
    $logID = $scope->logs->getIDByNames(
        'GMP', 'Packing', 'Glass & Brittle Plastic Inspection'
    );

    // insert the capture date and the ID of the reportee user
    $logID = $scope->capturedLogs->insert([
        'employee_id' => $segment->get('user_id'),
        'log_id' => $logID,
        'capture_date' => $request['date'],
        'extra_info1' => $request['time'],
        'extra_info2' => $request['notes']
    ]);

    // initialize the array of rows to be inserted to the database
    $rows = [];

    // then visit each area
    foreach ($request['areas'] as $area) {
        foreach ($area['items'] as $item) {
            // store the group info to the array of rows
            array_push($rows, [
                'capture_date_id' => $logID,
                'area_glass_id' => $item['id'],
                'is_acceptable' => $item['is_acceptable']
            ]);
        }
    }

    // finally insert the rows to the database
    $scope->glassLogs->insert($rows);
}


// Returns the report data for this log on the specified date interval
function getReportData($scope, $request)
{
    // first, we get the session segment
    $segment = $scope->session->getSegment('fsm');

    // then, we get the captured logs' date info 
    $logDates = $scope->capturedLogs->selectByDateIntervalLogIDAndZoneID(
        $request['start_date'],
        $request['end_date'],
        $scope->logs->getIDByNames(
            'GMP', 'Packing', 'Glass & Brittle Plastic Inspection'
        ),
        $segment->get('zone_id')
    );

    // if no logs where captured, throw an exception
    if (!isset($logDates)) {
        throw new \Exception('No logs where captured at that date.', 2);
    }

    // initialize the storage for the reports
    $reports = [];

    // visit each date log that was obtained earlier
    foreach ($logDates as $logDate) {
        // retrieve the per group log corresponding to this date
        $rows = $scope->glassLogs->selectByCaptureDateID($logDate['id']);

        // final array where the working areas are going to be stored
        $areas = [];

        // temporary storage for a single working area
        $area = [
            'id' => 0,
            'name' => '',
            'items' => []
        ];

        // [***]
        // visit each row of items retrieved from the database
        foreach ($rows as $row) {
            // check if the working area has changed
            $hasAreaChanged = $row['area_id'] != $area['id'];
            if ($hasAreaChanged) {
                // if it has, first, check if the current working area info is not 
                // empty
                if ($area['id'] != 0) {
                    // if it's not, then push it to the final array
                    array_push($area['items'], [
                        'id' => $row['item_id'],
                        'name' => $row['item_name'],
                        'order' => $row['item_order'],
                        'quantity' => $row['item_quantity'],
                        'status' => $row['item_status']
                    ]);
                    array_push($areas, $area);
                }

                // then, store the new item, item type and working area info in 
                // their corresponding temporal storage 
                $area = [
                    'id' => $row['area_id'],
                    'name' => $row['area_name'],
                    'items' => [[
                        'id' => $row['item_id'],
                        'name' => $row['item_name'],
                        'order' => $row['item_order'],
                        'quantity' => $row['item_quantity'],
                        'status' => $row['item_status']
                    ]]
                ];
            } else {
                // if the current area has not changed, then push the 
                // new item info to the current area's temporal storage
                array_push($area['items'], [
                    'id' => $row['item_id'],
                    'name' => $row['item_name'],
                    'order' => $row['item_order'],
                    'quantity' => $row['item_quantity'],
                    'status' => $row['item_status']
                ]);
            } // if ($hasAreaChanged)
        } // foreach ($rows as $row)

        // don't forget to push the last entries to the the end of the array
        if ($area['id'] != 0) {
            array_push($areas, $area);
        }

        // then retrieve the name of the employee and supervisor that worked on 
        // this log
        $supervisor = $scope->users->getNameByID($logDate['supervisor_id']);
        $employee = $scope->users->getNameByID($logDate['employee_id']);
        
        // push the report data to the array
        array_push($reports, [
            'report_id' => $logDate['id'],
            'created_by' => $employee['first_name'].' '.$employee['last_name'],
            'approved_by' => (isset($supervisor['first_name'])) ?
                $supervisor['first_name'].' '.$supervisor['last_name'] : 'N/A',
            'creation_date' => $logDate['capture_date'],
            'approval_date' => (isset($logDate['approval_date'])) ?
                $logDate['approval_date'] : 'N/A',
            'zone_name' => $segment->get('zone_name'),
            'program_name' => 'GMP',
            'module_name' => 'Packing',
            'log_name' => 'Glass & Brittle Plastic Inspection',
            'time' => $logDate['extra_info1'],
            'notes' => $logDate['extra_info2'],
            'areas' => $areas
        ]); 
    }

    // finally return the list of reports
    return $reports;
}


// Changes the position of the specified scale
function changeScalePosition($scope, $request)
{
    $scope->areaGlass->updatePositionByID(
        $request['item_id'], 
        $request['position']
    );
}


?>