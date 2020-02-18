<?php

namespace fsm\database\customerComplaint;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;

class Logs extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('customer_complaint_form');
  }

  function selectByDateIntervalAndZoneID($startDate, $endDate, $zoneID) {
    return parent::select(
      [
        "$this->table.id",
        'subject',
        'corrective_action',
        'customer',
        'c.first_name(creator_first_name)',
        'c.last_name(creator_last_name)',
        'complaint_date',
        'sales_order_number',
        'account_manager',
        'shipped_to',
        'complaint_reason',
        'root_cause',
        'shipping_point',
        'notes',
        'a.first_name(accepter_first_name)',
        'a.last_name(accepter_last_name)',
        'closure_date'
      ],
      [
        'AND' => [
          'complaint_date[>=]' => $startDate,
          'complaint_date[<=]' => $endDate,
          's.zone_id' => $zoneID,
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
        '[><]customer_complaint_sources(s)' => [
          'id' => 'form_id'
        ]
      ]
    );
  }

  function selectByDateInterval($startDate, $endDate) {
    return parent::select(
      [
        "$this->table.id",
        'subject',
        'corrective_action',
        'customer',
        'c.first_name(creator_first_name)',
        'c.last_name(creator_last_name)',
        'complaint_date',
        'sales_order_number',
        'account_manager',
        'shipped_to',
        'complaint_reason',
        'root_cause',
        'shipping_point',
        'notes',
        'a.first_name(accepter_first_name)',
        'a.last_name(accepter_last_name)',
        'closure_date'
      ],
      [
        'AND' => [
          'complaint_date[>=]' => $startDate,
          'complaint_date[<=]' => $endDate,
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
        '[><]customer_complaint_sources(s)' => [
          'id' => 'form_id'
        ]
      ]
    );
  }

  function selectByDateIntervalAndZones($startDate, $endDate, $zones) {
    return parent::$dataBase->query(
      "SELECT DISTINCT
        $this->table.id,
        subject,
        corrective_action,
        customer,
        c.first_name AS creator_first_name,
        c.last_name AS creator_last_name,
        complaint_date,
        sales_order_number,
        account_manager,
        shipped_to,
        complaint_reason,
        root_cause,
        shipping_point,
        notes,
        a.first_name AS accepter_first_name,
        a.last_name AS accepter_last_name,
        closure_date
      FROM $this->table
        INNER JOIN users AS c
        ON c.id = creator_id
        INNER JOIN users AS a
        ON a.id = accepter_id
        INNER JOIN customer_complaint_sources AS s
        ON $this->table.id = form_id
      WHERE s.zone_id IN ($zones) AND complaint_date >= '$startDate' AND complaint_date <= '$endDate'
      ORDER BY complaint_date DESC, $this->table.id DESC;
      "
    )->fetchAll();
  }

  function selectByLogID($logID) {
    return parent::select(
      [
        "$this->table.id",
        'subject',
        'corrective_action',
        'customer',
        'c.first_name(creator_first_name)',
        'c.last_name(creator_last_name)',
        'complaint_date',
        'sales_order_number',
        'account_manager',
        'shipped_to',
        'complaint_reason',
        'root_cause',
        'shipping_point',
        'notes',
        'a.first_name(accepter_first_name)',
        'a.last_name(accepter_last_name)',
        'closure_date'
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
        'sales_order_number',
        'complaint_date',
        'c.first_name(creator_first_name)',
        'c.last_name(creator_last_name)',
      ],
      [
        'AND' => [
          's.zone_id' => $zoneID,
          'closure_date' => null
        ],
        'ORDER' => [
          'complaint_date' => 'DESC',
          'id' => 'DESC'
        ]
      ],
      [
        '[><]users(c)' => [
          'creator_id' => 'id'
        ],
        '[><]customer_complaint_sources(s)' => [
          'id' => 'form_id'
        ]
      ]
    );
  }

  function selectCapturingByZoneIDOrCapturerID($zoneID, $capturerID) {
    return parent::$dataBase->query(
      "SELECT DISTINCT
        $this->table.id,
        subject,
        sales_order_number,
        complaint_date,
        c.first_name AS creator_first_name,
        c.last_name AS creator_last_name
      FROM $this->table
        INNER JOIN users AS c
        ON c.id = creator_id
        INNER JOIN customer_complaint_sources AS s
        ON $this->table.id = form_id
      WHERE closure_date IS NULL AND (s.zone_id = $zoneID OR creator_id = $capturerID)
      ORDER BY complaint_date DESC, $this->table.id DESC;
      "
    )->fetchAll();
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