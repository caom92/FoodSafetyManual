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

?>