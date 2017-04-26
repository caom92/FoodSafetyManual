<?php

namespace fsm;


// Recieves a PDF file and stores it as the new manual for the especified log
function uploadManualFile($program, $module, $log)
{
    // if it was, compute the full directory path where the file will be 
    // stored
    $uploadDir = realpath(
        dirname(__FILE__)."/../../../".
        "data/documents/manuals/$program/$module/$log/actual_manual.pdf"
    );

    // then, compute the name that will be assigned to the current manual 
    // file so that we keep a backup copy of it
    $backupFile = date('Y-m-d_H-i-s').'.pdf';

    // rename the current manual file to keep a backup copy
    $backupFile = str_replace('actual_manual.pdf', $backupFile, $uploadDir);
    rename($uploadDir, $backupFile);

    // finally save the uploaded file as the current manual file
    $wasMoveSuccessful = move_uploaded_file(
        $_FILES['manual_file']['tmp_name'], 
        $uploadDir
    );

    // and check if the file was saved successfully
    if (!$wasMoveSuccessful) {
        // if it wasn't, restore the last backup copy as the current manual 
        // file
        rename($backupFile, $uploadDir);

        // and notify the user of the error
        throw new \Exception(
            'The file '.$_FILES['manual_file']['name'].' could not be '.
            'uploaded.'
        );
    }
}


// This function creates the service descriptor array for the specified log 
// with several frequently used services using the provided information
// [in]     program: a string that contains the name of the program which log 
//          services are going to be created
// [in]     module: a string that contains the name of the module which log 
//          services are going to be created
// [in]     log: a string that contains the name of the log which services are
//          going to be created
// [in]     suffix: a string that contains the suffix to be added to the name
//          of the services that will be created
// [in]     manualFileDir: a string that contains the directory path for finding
//          the manual file inside the documents directory
// [in]     services: an associative array which contains the necessary info.
//          for setting up each individual service 
// [out]    returns: an associative array that contains the description and 
//          callback for each service that was created for the log 
function createServiceDescriptionFromTemplate($program, $module, $log, $suffix, 
    $manualFileDir, $services) 
{
    // first, create some helper functions

    // this function will allow us to create a strategy object for the service
    // with the specified name using the information provided by the service 
    // list
    $createStrategy = function($serviceName, $requiresItemsName = TRUE) 
        use ($services) {
        // check if the user will use a custom callback for this service
        $useCustomCallback = 
            isset($services[$serviceName]['callback']) 
            && array_key_exists('callback', $services[$serviceName]);
            
        // then initialize the strategy object
        $strategy = [
            'is_usable' => !$useCustomCallback,
            'items_name' => NULL,
            'function' => function($scope, $segment) { return NULL; }
        ];

        // if the user won't use a custom callback...
        if (!$useCustomCallback) {
            // check if the function that reads the data from the database
            // was provided (called 'data view')
            $isStrategySet = 
                isset($services[$serviceName]['data_view'])
                && array_key_exists('data_view', $services[$serviceName]);

            // if it was, store it in the final strategy object
            if ($isStrategySet) {
                $strategy['function'] = $services[$serviceName]['data_view'];
            }

            // now, check if a name was provided for the data retrieve from the
            // database using the data view
            $hasItemsName = 
                isset($services[$serviceName]['items_name'])
                && array_key_exists('items_name', $services[$serviceName]);
            
            // if it was, store it in the final strategy object, otherwise
            // throw an exception
            if ($hasItemsName) {
                $strategy['items_name'] = $services[$serviceName]['items_name'];    
            } else if ($requiresItemsName) {
                throw new \Exception(
                    "Failed to create service descriptor; ".
                    "items_name is missing for $serviceName"
                );
            }
        }

        // finally, return the resulting strategy object
        return $strategy;
    };

    // this function checks if a value witht the specified name can be found in 
    // the info structure for the service with the specified name
    $hasValue = function($service, $value) use ($services) {
        return isset($services[$service][$value])
            && array_key_exists($value, $services[$service]);
    };

    // using the previously created helper functions, create the different 
    // strategy objects for each service

    // create the strategy object for the log service
    $logStrategy = $createStrategy('log');

    // create the strategy object for the report service
    $reportStrategy = $createStrategy('report');
    $reportStrategy['extra_info'] = ($hasValue('report', 'extra_info')) ?
        $services['report']['extra_info']
        : [ NULL, NULL ];

    // create the strategy object for the capture service
    $captureStrategy = $createStrategy('capture', FALSE);
    $captureStrategy['extra_info'] = ($hasValue('capture', 'extra_info')) ?
        $services['capture']['extra_info']
        : [ NULL, NULL ];
    $captureRequirementsDesc = [
        'logged_in' => ['Employee'],
        'has_privileges' => [
            'privilege' => 'Write',
            'program' => $program,
            'module' => $module,
            'log' => $log
        ],
        'date' => [
            'type' => 'datetime',
            'format' => 'Y-m-d'
        ]
    ];

    // now create the service descriptor for those services that are NOT 
    // optional
    $serviceRequirements = [
        "upload-manual-$suffix" => [
            'requirements_desc' => [
                'logged_in' => ['Director', 'Manager', 'Supervisor'],
                'has_privileges' => [
                    'privilege' => 'Read',
                    'program' => $program,
                    'module' => $module,
                    'log' => $log
                ],
                'files' => [
                    'name' => 'manual_file',
                    'format' => 'document'
                ]
            ],
            'callback' => function($scope, $request) use ($manualFileDir) {
                // if it was, compute the full directory path where the file
                // will be stored
                $uploadDir = realpath(
                    dirname(__FILE__)."/../../../data/documents/".
                    "manuals/{$manualFileDir}actual_manual.pdf"
                );

                // then, compute the name that will be assigned to the 
                // current manual file so that we keep a backup copy of it
                $backupFile = date('Y-m-d_H-i-s').'.pdf';

                // rename the current manual file to keep a backup copy
                $backupFile = str_replace('actual_manual.pdf', $backupFile, 
                    $uploadDir);
                rename($uploadDir, $backupFile);

                // finally save the uploaded file as the current manual file
                $wasMoveSuccessful = move_uploaded_file(
                    $_FILES['manual_file']['tmp_name'], 
                    $uploadDir
                );

                // and check if the file was saved successfully
                if (!$wasMoveSuccessful) {
                    // if it wasn't, restore the last backup copy as the 
                    // current manual file
                    rename($backupFile, $uploadDir);

                    // and notify the user of the error
                    throw new \Exception(
                        'The file '.$_FILES['manual_file']['name'].
                        ' could not be uploaded.'
                    );
                }
            }
        ],
        "log-$suffix" => [
            'requirements_desc' => [
                'logged_in' => ['Manager', 'Supervisor', 'Employee'],
                'has_privileges' => [
                    'privilege' => ['Read', 'Write'],
                    'program' => $program,
                    'module' => $module,
                    'log' => $log
                ]
            ],
            'callback' => ($logStrategy['is_usable']) ?
                function($scope, $request) use ($program, $module, $log, 
                    $logStrategy) {
                    // first, get the session segment
                    $segment = $scope->session->getSegment('fsm');

                    // retrieve the list of log items from the database
                    $items = $logStrategy['function']($scope, $segment);

                    // prepare the response JSON
                    return [
                        'zone_name' => $segment->get('zone_name'),
                        'program_name' => $program,
                        'module_name' => $module,
                        'log_name' => $log,
                        $logStrategy['items_name'] => $items
                    ];
                } : $services['log']['callback']
        ],
        "capture-$suffix" => [
            'requirements_desc' => 
                $captureRequirementsDesc + $services['capture']['requirements'],
            'callback' => ($captureStrategy['is_usable']) ?
                function($scope, $request) use ($program, $module, $log, 
                    $captureStrategy) {
                    // get the session segment
                    $segment = $scope->session->getSegment('fsm');

                    // get the ID of the log that we are working with
                    $logID = $scope->logs->getIDByNames(
                        $program, $module, $log
                    );

                    // insert the capture date and the ID of the reportee user
                    $logID = $scope->capturedLogs->insert([
                        'employee_id' => $segment->get('user_id'),
                        'log_id' => $logID,
                        'capture_date' => $request['date'],
                        'extra_info1' => 
                            (isset($captureStrategy['extra_info'][0])) ?
                                $request[$captureStrategy['extra_info'][0]]
                                : NULL,
                        'extra_info2' => 
                            (isset($captureStrategy['extra_info'][1])) ?
                                $request[$captureStrategy['extra_info'][1]]
                                : NULL
                    ]);

                    // using the ID of the capture date, collect the data to be 
                    // stored in the data base and store it 
                    return $captureStrategy['function']($scope, $segment, 
                        $request, $logID);
                } : $services['capture']['callback']
        ],
        "report-$suffix" => [
            'requirements_desc' => [
                'logged_in' => ['Director', 'Manager', 'Supervisor', 'Employee'],
                'has_privileges' => [
                    'privilege' => ['Read', 'Write'],
                    'program' => $program,
                    'module' => $module,
                    'log' => $log
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
            'callback' => ($reportStrategy['is_usable']) ?
                function($scope, $request) use ($program, $module, $log, 
                    $reportStrategy) {
                    // first, we get the session segment
                    $segment = $scope->session->getSegment('fsm');

                    // then, we get the captured logs' date info 
                    $logDates = 
                        $scope->capturedLogs->selectByDateIntervalLogIDAndZoneID(
                            $request['start_date'],
                            $request['end_date'],
                            $scope->logs->getIDByNames($program, $module, $log),
                            $segment->get('zone_id')
                        );

                    // if no logs where captured, throw an exception
                    if (!isset($logDates)) {
                        throw new \Exception(
                            'No logs where captured at that date.', 2);
                    }

                    // initialize the storage for the reports
                    $reports = [];

                    // visit each date log that was obtained earlier
                    foreach ($logDates as $logDate) {
                        // retrieve the per characteristic log corresponding to 
                        // this date
                        $items = $reportStrategy['function']($scope, $segment, 
                            $logDate);

                        // then retrieve the name of the employee and supervisor
                        // that worked on this log
                        $supervisor = $scope->users->getNameByID(
                            $logDate['supervisor_id']);
                        $employee = $scope->users->getNameByID(
                            $logDate['employee_id']);
                        
                        // push the report data to the array
                        $reportInfo = [
                            'report_id' => $logDate['id'],
                            'created_by' => 
                                $employee['first_name'].' '.
                                $employee['last_name'],
                            'approved_by' => 
                                (isset($supervisor['first_name'])) ?
                                    $supervisor['first_name'].' '.
                                    $supervisor['last_name'] 
                                    : 'N/A',
                            'creation_date' => $logDate['capture_date'],
                            'approval_date' => 
                                (isset($logDate['approval_date'])) ?
                                    $logDate['approval_date'] : 'N/A',
                            'zone_name' => $segment->get('zone_name'),
                            'program_name' => $program,
                            'module_name' => $module,
                            'log_name' => $log
                        ];

                        // check if the extra fields are being used and if they
                        // are, add them to the final report info structure
                        if (isset($reportStrategy['extra_info'][0])) {
                            $reportInfo[$reportStrategy['extra_info'][0]] = 
                                $logDate['extra_info1'];
                        }

                        if (isset($reportStrategy['extra_info'][1])) {
                            $reportInfo[$reportStrategy['extra_info'][1]] = 
                                $logDate['extra_info2'];
                        }

                        // add the actual log items to the report info structure
                        $reportInfo[$reportStrategy['items_name']] = $items;

                        // and push the report to the final report list
                        array_push($reports, $reportInfo); 
                    }

                    // finally return the list of reports
                    return $reports;
                } : $services['report']['callback']
        ]
    ];

    // check if the inventory service should be created
    $hasInventory = 
        isset($services['inventory']) 
        && array_key_exists('inventory', $services);

    // if this is the case ...
    if ($hasInventory) {
        // create the requirements descriptor
        $inventoryRequirementsDesc = [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => $program,
                'module' => $module,
                'log' => $log
            ]
        ];

        // add the service to the services array and append any additional
        // input requirements provided by the user
        $serviceRequirements["inventory-$suffix"] = [
            'requirements_desc' => ($hasValue('inventory', 'requirements')) ?
                $inventoryRequirementsDesc 
                + $services['inventory']['requirements'] 
                : $inventoryRequirementsDesc,
            'callback' => $services['inventory']['callback']
        ];
    }

    // check if the add item service should be created
    $hasAddItem =
        isset($services['add']) && array_key_exists('add', $services);
    
    // if this is the case ...
    if ($hasAddItem) {
        // create the requirements descriptor
        $addRequirementsDesc = [
            'logged_in' => ['Supervisor'],
            'has_privileges' => [
                'privilege' => 'Read',
                'program' => $program,
                'module' => $module,
                'log' => $log
            ]
        ];

        // add the service to the services array and append any additional
        // input requirements provided by the user
        $serviceRequirements["add-item-$suffix"] = [
            'requirements_desc' => ($hasValue('add', 'requirements')) ?
                $addRequirementsDesc 
                + $services['add']['requirements'] 
                : $addRequirementsDesc,
            'callback' => $services['add']['callback']
        ];
    }

    // check if the toggle activation service should be provided
    $hasToggle = 
        isset($services['toggle']) && array_key_exists('toggle', $services);

    // if this is the case
    if ($hasToggle) {
        // make sure that the user provided a DAO for where the inventory items
        // are stored
        if (!$hasValue('toggle', 'dao')) {
            throw new \Exception(
                'Failed to create service descriptor; DAO for toggle service '.
                'is missing'
            );
        }

        // save the DAO name for later
        $daoName = $services['toggle']['dao'];

        // create the service's requirements descriptor
        $serviceRequirements["toggle-$suffix"] = [
            'requirements_desc' => [
                'logged_in' => ['Supervisor'],
                'has_privileges' => [
                    'privilege' => 'Read',
                    'program' => $program,
                    'module' => $module,
                    'log' => $log
                ],
                'id' => [
                    'type' => 'int',
                    'min' => 1
                ]
            ],
            'callback' => function($scope, $request) use ($daoName) {
                $dao = new $daoName;
                $dao->toggleActivationByID($request['id']);
            }
        ];
    }

    // check if the reorder service should be provided
    $hasReorder = 
        isset($services['reorder']) && array_key_exists('reorder', $services);

    // if this is the case ...
    if ($hasReorder) {
        // make sure the user provided the name of the DAO where the inventory
        // items are stored
        if (!$hasValue('reorder', 'dao')) {
            throw new \Exception(
                'Failed to create service descriptor; DAO for reorder service '.
                'is missing'
            );
        }

        // save the DAO name for later
        $daoName = $services['reorder']['dao'];

        // create the service's requirements descriptor
        $serviceRequirements["reorder-$suffix"] = [
            'requirements_desc' => [
                'logged_in' => ['Supervisor'],
                'has_privileges' => [
                    'privilege' => 'Read',
                    'program' => $program,
                    'module' => $module,
                    'log' => $log
                ],
                'item_id' => [
                    'type' => 'int',
                    'min' => 1
                ],
                'position' => [
                    'type' => 'int'
                ]
            ],
            'callback' => function($scope, $request) use ($daoName) {
                $dao = new $daoName;
                $dao->updatePositionByID($request['item_id'], 
                    $request['position']);
            }
        ];
    }

    // finally, return the resulting service descriptor
    return $serviceRequirements;
}

?>