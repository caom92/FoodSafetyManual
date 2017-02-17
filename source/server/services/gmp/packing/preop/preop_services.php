<?php

namespace fsm\services\gmp\packing\preop;

require_once realpath(dirname(__FILE__).
    '/../../../../dao/gmp/packing/preop/CorrectiveActionsDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/gmp/packing/preop/AreasLogDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/gmp/packing/preop/ItemsLogDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/CapturedLogsDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/LogsDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/UsersDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../globals.php');


use fsm;
use fsm\database\gmp\packing\preop as preop;
use fsm\database as db;


$gmpPackingPreopServices = [
    'list-corrective-actions' => [
        'requirements_desc' => [
            'logged_in' => 'any'
        ],
        'callback' => 'fsm\services\gmp\packing\preop\getAllCorrectiveActions'
    ],
    'capture-gmp-packing-preop' => [
        'requirements_desc' => [
            'logged_in' => ['Employee'],
            'has_privilege' => [
                'privilege' => 'Write',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Pre-Operational Inspection'
            ],
            'date' => [
                'type' => 'datetime',
                'format' => 'Y-m-d'
            ],
            'notes' => [
                'type' => 'string',
                'max_length' => 80
            ],
            'album_url' => [
                'type' => 'string',
                'max_length' => 256
            ],
            'areas' => [
                'type' => 'array',
                'values' => [
                    'time' => [
                        'type' => 'datetime',
                        'format' => 'G:i'
                    ],
                    'notes' => [
                        'type' => 'string',
                        'optional' => true,
                        'max_length' => 256
                    ],
                    'person_performing_sanitation' => [
                        'type' => 'string',
                        'optional' => true,
                        'max_length' => 64
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
                            ],
                            'corrective_action_id' => [
                                'type' => 'int',
                                'min' => 1
                            ],
                            'comment' => [
                                'type' => 'string',
                                'optional' => true,
                                'max_length' => 80
                            ]
                        ]
                    ]
                ]
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\preop\registerLogEntry'
    ],
    'report-gmp-packing-preop' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor', 'Employee'],
            'has_privilege' => [
                'privilege' => ['Read', 'Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Pre-Operational Inspection'
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
        'callback' => 'fsm\services\gmp\packing\preop\getReportData'
    ],
    'upload-manual-gmp-packing-preop' => [
        'requirements_desc' => [
            'logged_in' => ['Director', 'Manager', 'Supervisor'],
            'has_privilege' => [
                'privilege' => 'Read',
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Pre-Operational Inspection'
            ],
            'files' => [
                'name' => 'manual_file',
                'format' => 'document'
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\preop\uploadManualFile'
    ],
    'update-gmp-packing-preop' => [
        'requirements_desc' => [
            'logged_in' => ['Supervisor', 'Employee'],
            'has_privilege' => [
                'privilege' => ['Read','Write'],
                'program' => 'GMP',
                'module' => 'Packing',
                'log' => 'Pre-Operational Inspection'
            ],
            'report_id' => [
                'type' => 'int',
                'min' => 1
            ],
            'notes' => [
                'type' => 'string',
                'max_length' => 256
            ],
            'album_url' => [
                'type' => 'string',
                'max_length' => 256
            ],
            'areas' => [
                'type' => 'array',
                'values' => [
                    'notes' => [
                        'type' => 'string',
                        'optional' => true,
                        'max_length' => 256
                    ],
                    'person_performing_sanitation' => [
                        'type' => 'string',
                        'optional' => true,
                        'max_length' => 64
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
                            ],
                            'corrective_action_id' => [
                                'type' => 'int',
                                'min' => 1
                            ],
                            'comment' => [
                                'type' => 'string',
                                'optional' => true,
                                'max_length' => 128
                            ]
                        ]
                    ]
                ]
            ]
        ],
        'callback' => 'fsm\services\gmp\packing\preop\editLogEntry'
    ]
];

// Lists all the corrective actions
function getAllCorrectiveActions($request)
{
    $correctiveActions = new preop\CorrectiveActionsDAO();
    return $correctiveActions->selectAllButNone();
}


// Adds a new entry to the pre-op log
function registerLogEntry($request)
{
    // if all validations passed, connect to the data base
    $logDate = new db\CapturedLogsDAO();
    $areasLog = new preop\AreasLogDAO();
    $itemsLog = new preop\ItemsLogDAO();
    $logs = new db\LogsDAO();

    // get the ID of the log that we are working with
    $logID = $logs->getIDByNames(
        'GMP', 'Packing', 'Pre-Operational Inspection'
    );

    // before inserting into the data base, check that there is no entry of
    // this log already
    // $isLogEntryDuplicated = $logDate->hasByDateAndLogID(
    //     $request['date'], $logID, $_SESSION['zone_id']);
    // if ($isLogEntryDuplicated) {
    //     throw new \Exception('A log entry was already registered today.', 2);
    // }

    // insert the capture date and the ID of the reportee user
    $logID = $logDate->insert([
        'employee_id' => $_SESSION['user_id'],
        'log_id' => $logID,
        'capture_date' => $request['date'],
        'extra_info1' => $request['notes'],
        'extra_info2' => $request['album_url']
    ]);

    // create a temporal storage for the many entries to be inserted in
    // the per item log
    $itemsLogEntries = [];

    // insert each per area log entry one at the time...
    foreach ($request['areas'] as $areaLogEntry) {
        // save the resulting ID for later use
        $areaID = $areasLog->insert([
            'capture_date_id' => $logID,
            'time' => $areaLogEntry['time'],
            'notes' => $areaLogEntry['notes'],
            'person_performing_sanitation' =>
                $areaLogEntry['person_performing_sanitation']
        ]);

        // then store each per item log entry in the temporal storage
        foreach ($areaLogEntry['items'] as $itemsLogEntry) {
            array_push($itemsLogEntries, [
                'area_log_id' => $areaID,
                'item_id' => $itemsLogEntry['id'],
                'is_acceptable' => $itemsLogEntry['is_acceptable'] === 'true',
                'corrective_action_id' =>
                    $itemsLogEntry['corrective_action_id'],
                'comment' => $itemsLogEntry['comment']
            ]);
        }
    }

    // finally, store all the per item log entries in the data base in a
    // single query
    $itemsLog->insert($itemsLogEntries);

    return [];
}


// [***]
// Returns the pre-operational log entries of the working areas and their
// items in a determined zone that where captured in the given date for
// presentation in a report
function getReportData($request)
{
    $capturedLogs = new db\CapturedLogsDAO();
    $areasLog = new preop\AreasLogDAO();
    $itemsLog = new preop\ItemsLogDAO();
    $users = new db\UsersDAO();
    $logs = new db\LogsDAO();

    $logDates = $capturedLogs->selectByDateIntervalLogIDAndZoneID(
        $request['start_date'],
        $request['end_date'],
        $logs->getIDByNames(
            'GMP', 'Packing', 'Pre-Operational Inspection'
        ),
        $_SESSION['zone_id']
    );

    if (!isset($logDates)) {
        throw new \Exception('No logs where captured at that date.', 2);
    }

    $reports = [];

    foreach ($logDates as $logDate) {
        $areasLogEntries = [];
        $areas = $areasLog->selectByLogID($logDate['id']);

        foreach ($areas as $areaData) {
            $items = $itemsLog->selectByAreaLogID($areaData['id']);
            $tempAreaLogEntry = [
                'id' => $items[0]['area_id'],
                'name' => $items[0]['area_name'],
                'person_performing_sanitation' =>
                    $areaData['person_performing_sanitation'],
                'notes' => $areaData['notes'],
                'time' => $areaData['time'],
                'types' => []
            ];

            $currentType = $items[0]['type_id'];
            $tempItems = [
                'id' => $items[0]['type_id'],
                'name' => $items[0]['type_name'],
                'items' => []
            ];

            foreach ($items as $item) {
                $hasTypeChanged = $tempItems['id'] != $item['type_id'];
                if (!$hasTypeChanged) {
                    array_push($tempItems['items'], [
                        'id' => $item['item_id'],
                        'order' => $item['position'],
                        'name' => $item['item_name'],
                        'status' => $item['is_acceptable'],
                        'corrective_action_id' => 
                            $item['corrective_action_id'],
                        'corrective_action' => $item['corrective_action'],
                        'comment' => $item['comment']
                    ]);
                } else {
                    array_push($tempAreaLogEntry['types'], $tempItems);
                    $tempItems = [
                        'id' => $item['type_id'],
                        'name' => $item['type_name'],
                        'items' => [[
                            'id' => $item['item_id'],
                            'order' => $item['position'],
                            'name' => $item['item_name'],
                            'status' => $item['is_acceptable'],
                            'corrective_action_id' => 
                                $item['corrective_action_id'],
                            'corrective_action' => $item['corrective_action'],
                            'comment' => $item['comment']
                        ]]
                    ];
                }
            }

            array_push($tempAreaLogEntry['types'], $tempItems);
            array_push($areasLogEntries, $tempAreaLogEntry);
        }

        $supervisor = $users->getNameByID($logDate['supervisor_id']);
        $employee = $users->getNameByID($logDate['employee_id']);

        array_push($reports, [
            'report_id' => $logDate['id'],
            'created_by' => 
                $employee['first_name'].' '.$employee['last_name'],
            'approved_by' => (isset($supervisor['first_name'])) ?
                $supervisor['first_name'].' '.$supervisor['last_name'] :
                'N/A',
            'creation_date' => $logDate['capture_date'],
            'approval_date' => (isset($logDate['approval_date'])) ?
                $logDate['approval_date'] :
                'N/A',
            'zone_name' => $_SESSION['zone_name'],
            'program_name' => 'GMP',
            'module_name' => 'Packing',
            'log_name' => 'Pre-Operational Inspection',
            'notes' => $logDate['extra_info1'],
            'album_url' => $logDate['extra_info2'],
            'areas' => $areasLogEntries
        ]);
    }

    return $reports;
}


// Recieves a PDF file and stores it as the new manual for the Pre-Op log
function uploadManualFile($request)
{
    fsm\uploadManualFile('gmp', 'packing', 'preop');
    return [];
}


// This function updates the info in the database of the log with the especified
// ID
function editLogEntry($request)
{
    // connect to the database
    $capturedLogs = new db\CapturedLogsDAO();
    $areasLog = new preop\AreasLogDAO();
    $itemsLog = new preop\ItemsLogDAO();

    // update the captured log info
    $capturedLogs->updateByID(
        [
            'extra_info1' => $request['notes'],
            'extra_info2' => $request['album_url']
        ], 
        $request['report_id']
    );

    // for each area in the input array...
    foreach ($request['areas'] as $area) {
        // update the area log 
        $areasLog->updateByCapturedLogID(
            [
                'notes' => $area['notes'],
                'person_performing_sanitation' => 
                    $area['person_performing_sanitation']
            ],
            $request['report_id']
        );

        // the for each item in the area
        foreach ($area['items'] as $item) {
            // update the item log
            $itemsLog->updateByCapturedLogIDAndItemID(
                [
                    'is_acceptable' => $item['is_acceptable'],
                    'corrective_action_id' => $item['corrective_action_id'],
                    'comment' => $item['comment']
                ],
                $request['report_id'],
                $item['id']
            );
        }
    }
}

?>
