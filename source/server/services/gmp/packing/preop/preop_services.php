<?php

namespace fsm\services\gmp\packing\preop;

require_once realpath(dirname(__FILE__).
    '/../../../../data_validations.php');
require_once realpath(dirname(__FILE__).
    '/../../../../Session.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/gmp/packing/preop/CorrectiveActionsDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/gmp/packing/preop/AreasLogDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/gmp/packing/preop/ItemsLogDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/LogCaptureDatesDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/LogsDAO.php');
require_once realpath(dirname(__FILE__).
    '/../../../../dao/ItemsDAO.php');

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
        isset($_POST['area_logs']) && array_key_exists($_POST['area_logs']);

    if (!$isSet) {
        throw new \Exception("Input argument 'area_logs' is missing");
    }

    // check each per area log entry
    foreach ($_POST['area_logs'] as $areaLogEntry) {
        $isDateTime = val\isDateTime($areaLogEntry['time'], 'HH:MM');

        if (!$isDateTime) {
            throw new \Exception(
                'A time literal does not have the proper value'
            );
        }

        $isString = 
            val\stringHasLengthInterval($areaLogEntry['notes'], 0, 64);

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
        foreach ($areaLogEntry['item_logs'] as $itemsLogEntry) {
            $isInt = val\integerIsBetweenValues(
                $itemsLogEntry['item_id'], 1, \PHP_INT_MAX
            );

            if (!$isInt) {
                throw new \Exception(
                    'An item ID is not valid'
                );
            }

            $isBool = val\integerIsBetweenValues(
                $itemsLogEntry['is_acceptable'], 0, \PHP_INT_MAX
            );

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
                $itemsLogEntry['comments'], 0, 80
            );

            if (!$isString) {
                throw new \Exception(
                    'The comments section is not a string of the proper length'
                );
            }
        }
    }

    // if all validations where passed, connect to the data base
    $session = new fsm\Session();
    $log = new db\LogCaptureDatesDAO();
    $areasLog = new preop\AreasLogDAO();
    $itemsLog = new preop\ItemsLogDAO();
    $logs = new db\LogsDAO();

    // and first insert the capture date and the ID of the reportee user
    $logID = $log->insert([
        'user_id' => $session->get('id'),
        'log_id' => $logs->getIDByNames(
            'GMP', 'Packing', 'Pre-Operational Inspection'
        ),
        'date' => $_POST['date']
    ]);

    // create a temporal storage for the many entries to be inserted in 
    // the per item log
    $itemsLogEntries = [];

    // insert each per area log entry one at the time...
    foreach ($_POST['area_logs'] as $areaLogEntry) {
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
                'item_id' => $itemsLogEntry['item_id'],
                'is_acceptable' => $itemsLogEntry['is_acceptable'],
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


// Returns the pre-operational log entries of the working areas and their 
// items in a determined zone that where captured in the given date for
// presentation in a report
function getReportData()
{
    $session = new fsm\Session();
    $log = new db\LogCaptureDatesDAO();
    $areasLog = new preop\AreasLogDAO();
    $itemsLog = new preop\ItemsLogDAO();
    $logs = new db\LogsDAO();

    $logID = $log->getIDByDateLogIDAndZoneID(
        $_POST['date'], 
        $logs->getIDByNames(
            'GMP', 'Packing', 'Pre-Operational Inspection'
        ),
        $session->get('zone_id')
    );

    $areasLogEntries = [];
    $areas = $areasLog->selectByLogID($logID);

    foreach ($areas as $areaData) {
        $items = $itemsLog->selectByAreaLogID($areaData['id']);

        $tempAreaLogEntry = [
            'area_id' => $items[0]['area_id'],
            'area_name' => $items[0]['area_name'],
            'notes' => $areaData['person_performing_sanitation'],
            'time' => $areaData['time'],
            'items' => []
        ];

        foreach ($items as $item) {
            array_push($tempAreaLogEntry['items'], [
                'item_order' => $item['position'],
                'item_name' => $item['item_name'],
                'item_status' => $item['corrective_action'],
                'item_comments' => $item['comment']
            ]);
        }

        array_push($areasLogEntries, $tempAreaLogEntry);
    }

    return [
        'created_by' => 
            $session->get('first_name').' '.$session->get('last_name'),
        'approved_by' => 'God',
        'creation_date' => $logData['date'],
        'approval_date' => '1985-10-26',
        'zone_name' => $session->get('zone_name'),
        'program_name' => 'GMP',
        'module_name' => 'Packing',
        'log_name' => 'Pre-Operational Inspection',
        'areas' => $areasLogEntries
    ];
}


// [***]
// Returns a list of all the items in a zone grouped by working areas and item 
// type
function getItemsList()
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