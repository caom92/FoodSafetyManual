<?php

namespace fsm\services\gmp\packing\preop;

require_once realpath(dirname(__FILE__).
    '/../../../../data_validations.php');
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

use fsm\validations as val;
use fsm\database\gmp\packing\preop as preop;
use fsm\database as db;


// Lists all the corrective actions
function getAllCorrectiveActions()
{
    $correctiveActions = new preop\CorrectiveActionsDAO();
    return $correctiveActions->selectAll();
}


// Adds a new entry to the pre-op log
function registerLogEntry()
{
    // first, let's check if the client sent the values to be inserted
    // in the proper array format
    $isSet =
        isset($_POST['areas']) && array_key_exists('areas', $_POST);

    if (!$isSet) {
        throw new \Exception("Input argument 'areas' is missing");
    }

    // check each per area log entry
    foreach ($_POST['areas'] as $areaLogEntry) {
        $isDateTime = val\isDateTime($areaLogEntry['time'], 'G:i');

        if (!$isDateTime) {
            throw new \Exception(
                'A time literal does not have the proper value'
            );
        }

        $isString =
            val\stringHasLengthInterval($areaLogEntry['notes'], 0, 256);

        if (!$isString) {
            throw new \Exception(
                'A notes argument is not a string of the proper length'
            );
        }

        $isString =
            val\stringHasLengthInterval(
                $areaLogEntry['person_performing_sanitation'], 0, 64
            );

        if (!$isString) {
            throw new \Exception(
                'The name of the person performing sanitation is not of the proper length'
            );
        }

        // check each per item log entry
        foreach ($areaLogEntry['items'] as $itemsLogEntry) {
            $isInt = val\integerIsBetweenValues(
                $itemsLogEntry['id'], 1, \PHP_INT_MAX
            );

            if (!$isInt) {
                throw new \Exception(
                    'An item ID is not valid'
                );
            }
            
            $isBool = val\isBoolean($itemsLogEntry['is_acceptable']);

            if (!$isBool) {
                throw new \Exception(
                    'An is_acceptable flag is not a boolean'
                );
            }

            $isInt = val\integerIsBetweenValues(
                $itemsLogEntry['corrective_action_id'], 1, \PHP_INT_MAX
            );

            if (!$isInt) {
                throw new \Exception(
                    'A corrective action ID is not valid'
                );
            }

            $isString = val\stringHasLengthInterval(
                $itemsLogEntry['comment'], 0, 80
            );

            if (!$isString) {
                throw new \Exception(
                    'The comments section is not a string of the proper length'
                );
            }
        }
    }

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
    $isLogEntryDuplicated = $logDate->hasByDateAndLogID($_POST['date'], $logID);
    if ($isLogEntryDuplicated) {
        throw new \Exception('A log entry was already registered today.', 2);
    }

    // insert the capture date and the ID of the reportee user
    $logID = $logDate->insert([
        'employee_id' => $_SESSION['user_id'],
        'log_id' => $logID,
        'capture_date' => $_POST['date'],
        'extra_info1' => $_POST['notes'],
        'extra_info2' => $_POST['album_url']
    ]);

    // create a temporal storage for the many entries to be inserted in
    // the per item log
    $itemsLogEntries = [];

    // insert each per area log entry one at the time...
    foreach ($_POST['areas'] as $areaLogEntry) {
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
function getReportData()
{
    $capturedLogs = new db\CapturedLogsDAO();
    $areasLog = new preop\AreasLogDAO();
    $itemsLog = new preop\ItemsLogDAO();
    $logs = new db\LogsDAO();
    $users = new db\UsersDAO();

    $logDates = $capturedLogs->selectByDateIntervalLogIDAndZoneID(
        $_POST['start_date'],
        $_POST['end_date'],
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
function uploadManualFile()
{
    // first, check if the uploaded file is a PDF
    $isDocument = val\isDocumentFile($_FILES['manual_file']['tmp_name']);

    if ($isDocument) {
        // if it was, compute the full directory path where the file will be 
        // stored
        $uploadDir = realpath(
            dirname(__FILE__).'/../../../../../../'.
            'data/documents/manuals/gmp/packing/actual_manual.pdf'
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
    } else {
        // if the uploaded file was not a PDF, notify the user
        throw new \Exception(
            'The file '.$_FILES['manual_file']['name'].' is not a PDF file.'
        );
    }

    return [];
}


// This function updates the info in the database of the log with the especified
// ID
function editLogEntry()
{
    // first, let's check if the client sent the values to be inserted
    // in the proper array format
    $isSet =
        isset($_POST['areas']) && array_key_exists('areas', $_POST);

    if (!$isSet) {
        throw new \Exception("Input argument 'areas' is missing");
    }

    // check each per area log entry
    foreach ($_POST['areas'] as $areaLogEntry) {
        $isString =
            val\stringHasLengthInterval($areaLogEntry['notes'], 0, 256);

        if (!$isString) {
            throw new \Exception(
                'A notes argument is not a string of the proper length'
            );
        }

        $isString =
            val\stringHasLengthInterval(
                $areaLogEntry['person_performing_sanitation'], 0, 64
            );

        if (!$isString) {
            throw new \Exception(
                'The name of the person performing sanitation is not of the proper length'
            );
        }

        // check each per item log entry
        foreach ($areaLogEntry['items'] as $itemsLogEntry) {
            $isInt = val\integerIsBetweenValues(
                $itemsLogEntry['id'], 1, \PHP_INT_MAX
            );

            if (!$isInt) {
                throw new \Exception(
                    'An item ID is not valid'
                );
            }
            
            // $isBool = val\isBoolean($itemsLogEntry['is_acceptable']);

            // if (!$isBool) {
            //     throw new \Exception(
            //         'An is_acceptable flag is not a boolean'
            //     );
            // }

            $isInt = val\integerIsBetweenValues(
                $itemsLogEntry['corrective_action_id'], 1, \PHP_INT_MAX
            );

            if (!$isInt) {
                throw new \Exception(
                    'A corrective action ID is not valid'
                );
            }

            $isString = val\stringHasLengthInterval(
                $itemsLogEntry['comment'], 0, 80
            );

            if (!$isString) {
                throw new \Exception(
                    'The comments section is not a string of the proper length'
                );
            }
        }
    }

    // connect to the database
    $areasLog = new preop\AreasLogDAO();
    $itemsLog = new preop\ItemsLogDAO();

    // for each area in the input array...
    foreach ($_POST['areas'] as $area) {
        // update the area log 
        $areasLog->updateByCapturedLogID(
            [
                'notes' => $area['notes'],
                'person_performing_sanitation' => 
                    $area['person_performing_sanitaiton']
            ],
            $_POST['report_id']
        );

        // the for each item in the area
        foreach ($area['items'] as $item) {
            // update the item log
            $itemsLog->updateByCapturedLogIDAndItemID(
                [
                    'corrective_action_id' => $item['corrective_action_id'],
                    'comment' => $item['comment']
                ],
                $_POST['report_id'],
                $item['id']
            );
        }
    }
}

?>
