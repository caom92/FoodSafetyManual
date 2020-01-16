<?php

namespace fsm\database\capa;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;

class Logs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('capa_form');
  }

  function selectByDateIntervalAndZoneID($startDate, $endDate, $zoneID) {
    return parent::select(
      [
        "$this->table.id",
        'capa_number',
        'reference_number',
        'creator_id',
        'c.first_name(creator_first_name)',
        'c.last_name(creator_last_name)',
        'z.name(zone_name)',
        'capture_date',
        'reference',
        'description',
        'observer',
        'occurrence_date',
        'findings',
        'root_cause',
        'preventive_actions',
        'corrective_actions',
        'planned_date',
        'assigned_personnel',
        'follow_up',
        'actual_date',
        'status',
        'accepter_id',
        'a.first_name(accepter_first_name)',
        'a.last_name(accepter_last_name)',
        'closure_date',
        'link(url)'
      ],
      [
        'AND' => [
          'capture_date[>=]' => $startDate,
          'capture_date[<=]' => $endDate,
          "$this->table.zone_id" => $zoneID,
          'closure_date[!]' => null
        ]
      ],
      [
        '[><]users(c)' => [
          'creator_id' => 'id'
        ],
        '[>]users(a)' => [
          'accepter_id' => 'id'
        ],
        '[><]zones(z)' => [
          'zone_id' => 'id'
        ]
      ]
    );
  }

  // recuperar los datos de una sola bitácora
  function selectByLogID($logID) {
    return parent::select(
      [
        "$this->table.id",
        'capa_number',
        'reference_number',
        'creator_id',
        'c.first_name(creator_first_name)',
        'c.last_name(creator_last_name)',
        'capture_date',
        'reference',
        'description',
        'observer',
        'occurrence_date',
        'findings',
        'root_cause',
        'preventive_actions',
        'corrective_actions',
        'planned_date',
        'assigned_personnel',
        'follow_up',
        'actual_date',
        'status',
        'accepter_id',
        'a.first_name(accepter_first_name)',
        'a.last_name(accepter_last_name)',
        'closure_date',
        'link(url)'
      ],
      [
        "$this->table.id" => $logID
      ],
      [
        '[><]users(c)' => [
          'creator_id' => 'id'
        ],
        '[>]users(a)' => [
          'accepter_id' => 'id'
        ]
      ]
    );
  }

  function selectCapturingByZoneID($zoneID) {
    return parent::select(
      [
        "$this->table.id",
        'capa_number',
        'reference_number',
        'reference',
        'z.name(zone_name)',
        'c.first_name(creator_first_name)',
        'c.last_name(creator_last_name)',
        'capture_date'
      ],
      [
        'AND' => [
          "$this->table.zone_id" => $zoneID,
          'closure_date' => null
        ],
        'ORDER' => [
          'capture_date' => 'DESC',
          'id' => 'DESC'
        ]
      ],
      [
        '[><]users(c)' => [
          'creator_id' => 'id'
        ],
        '[><]zones(z)' => [
          'zone_id' => 'id'
        ]
      ]
    );
  }

  function deleteByID($formID) {
    return parent::delete([
      'id' => $formID
    ]);
  }

  function updateByID($changes, $logID) {
    return parent::update($changes, ['id ' => $logID]);
  }

  function isFormApproved($logID) {
    $rows = parent::get(['closure_date'], ['id' => $logID]);
    return (count($rows) > 0) ? ((!is_null($rows['closure_date'])) ? true : false) : NULL;
  }

  function approveByID($logID, $date) {
    return parent::update(['closure_date' => $date], ['id' => $logID]);
  }

  function selectCreatorIDByID($logID) {
    $rows = parent::get(['creator_id'], ['id' => $logID]);
    return (count($rows) > 0) ? $rows['creator_id'] : NULL;
  }
}

?>