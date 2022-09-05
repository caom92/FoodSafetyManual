<?php

namespace fsm\database\workOrder;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;

class Logs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('work_order_form');
  }

  function selectByDateIntervalAndZoneID($startDate, $endDate, $zoneID) {
    return parent::$dataBase->query(
      "SELECT
        $this->table.id,
        work_order_number,
        creator_id,
        c.first_name AS creator_first_name,
        c.last_name AS creator_last_name,
        z.name AS zone_name,
        capture_date,
        department,
        description,
        received_by,
        assigned_to,
        repair_date,
        DATE_FORMAT(repair_time, '%H:%i') AS repair_time,
        repair_duration,
        repair_work_order_type,
        maintenance_task_performer,
        repair_start_date,
        DATE_FORMAT(repair_start_time, '%H:%i') AS repair_start_time,
        repair_finish_date,
        DATE_FORMAT(repair_finish_time, '%H:%i') AS repair_finish_time,
        repair_comments,
        sanitation_task_performer,
        sanitation_date,
        DATE_FORMAT(sanitation_start_time, '%H:%i') AS sanitation_start_time,
        DATE_FORMAT(sanitation_finish_time, '%H:%i') AS sanitation_finish_time,
        sanitation_corrective_action,
        cleaning_verification,
        accepter_id,
        a.first_name AS accepter_first_name,
        a.last_name AS accepter_last_name,
        closing_date
      FROM $this->table
      INNER JOIN users AS c
        ON $this->table.creator_id = c.id
      LEFT JOIN users AS a
        ON $this->table.accepter_id = a.id
      INNER JOIN zones AS z
        ON $this->table.zone_id = z.id
      WHERE capture_date BETWEEN '$startDate' AND '$endDate' AND $this->table.zone_id = $zoneID AND closing_date IS NOT NULL"
    )->fetchAll();
    /*return parent::select(
      [
        "$this->table.id",
        'work_order_number',
        'creator_id',
        'c.first_name(creator_first_name)',
        'c.last_name(creator_last_name)',
        'z.name(zone_name)',
        'capture_date',
        'department',
        'description',
        'received_by',
        'assigned_to',
        'repair_date',
        'repair_time',
        'repair_duration',
        'repair_work_order_type',
        'maintenance_task_performer',
        'repair_start_date',
        'repair_start_time',
        'repair_finish_date',
        'repair_finish_time',
        'repair_comments',
        'sanitation_task_performer',
        'sanitation_date',
        'sanitation_start_time',
        'sanitation_finish_time',
        'sanitation_corrective_action',
        'cleaning_verification',
        'accepter_id',
        'a.first_name(accepter_first_name)',
        'a.last_name(accepter_last_name)',
        'closing_date'
      ],
      [
        'AND' => [
          'capture_date[>=]' => $startDate,
          'capture_date[<=]' => $endDate,
          "$this->table.zone_id" => $zoneID,
          'closing_date[!]' => null
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
    );*/
  }

  // recuperar los datos de una sola bitácora
  function selectByLogID($logID) {
    return parent::$dataBase->query(
      "SELECT
        $this->table.id,
        work_order_number,
        creator_id,
        c.first_name AS creator_first_name,
        c.last_name AS creator_last_name,
        z.name AS zone_name,
        capture_date,
        department,
        description,
        received_by,
        assigned_to,
        repair_date,
        DATE_FORMAT(repair_time, '%H:%i') AS repair_time,
        repair_duration,
        repair_work_order_type,
        maintenance_task_performer,
        repair_start_date,
        DATE_FORMAT(repair_start_time, '%H:%i') AS repair_start_time,
        repair_finish_date,
        DATE_FORMAT(repair_finish_time, '%H:%i') AS repair_finish_time,
        repair_comments,
        sanitation_task_performer,
        sanitation_date,
        DATE_FORMAT(sanitation_start_time, '%H:%i') AS sanitation_start_time,
        DATE_FORMAT(sanitation_finish_time, '%H:%i') AS sanitation_finish_time,
        sanitation_corrective_action,
        cleaning_verification,
        accepter_id,
        a.first_name AS accepter_first_name,
        a.last_name AS accepter_last_name,
        closing_date
      FROM $this->table
      INNER JOIN users AS c
        ON $this->table.creator_id = c.id
      RIGHT JOIN users AS a
        ON $this->table.accepter_id = a.id
      INNER JOIN zones AS z
        ON $this->table.zone_id = z.id
      WHERE $this->table.id = $logID"
    )->fetchAll();
    /*return parent::select(
      [
        "$this->table.id",
        'work_order_number',
        'creator_id',
        'c.first_name(creator_first_name)',
        'c.last_name(creator_last_name)',
        'capture_date',
        'department',
        'description',
        'received_by',
        'assigned_to',
        'repair_date',
        'repair_time',
        'repair_duration',
        'repair_work_order_type',
        'maintenance_task_performer',
        'repair_start_date',
        'repair_start_time',
        'repair_finish_date',
        'repair_finish_time',
        'repair_comments',
        'sanitation_task_performer',
        'sanitation_date',
        'sanitation_start_time',
        'sanitation_finish_time',
        'sanitation_corrective_action',
        'cleaning_verification',
        'accepter_id',
        'a.first_name(accepter_first_name)',
        'a.last_name(accepter_last_name)',
        'closing_date'
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
    );*/
  }

  function selectCapturingByZoneID($zoneID) {
    return parent::select(
      [
        "$this->table.id",
        'work_order_number',
        'z.name(zone_name)',
        'c.first_name(creator_first_name)',
        'c.last_name(creator_last_name)',
        'capture_date'
      ],
      [
        'AND' => [
          "$this->table.zone_id" => $zoneID,
          'closing_date' => null
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
    $rows = parent::get(['closing_date'], ['id' => $logID]);
    return (count($rows) > 0) ? ((!is_null($rows['closing_date'])) ? true : false) : NULL;
  }

  function approveByID($logID, $date, $userID) {
    return parent::update(['closing_date' => $date, 'accepter_id' => $userID], ['id' => $logID]);
  }

  function selectCreatorIDByID($logID) {
    $rows = parent::get(['creator_id'], ['id' => $logID]);
    return (count($rows) > 0) ? $rows['creator_id'] : NULL;
  }
}

?>