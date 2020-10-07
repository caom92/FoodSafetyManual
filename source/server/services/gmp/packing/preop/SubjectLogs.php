<?php

namespace fsm\database\gmp\packing\preop;
require_once realpath(dirname(__FILE__).'/../../../../dao/LogTable.php');
use fsm\database as db;

class SubjectLogs extends db\LogTable
{
  function __construct() { 
    parent::__construct('gmp_packing_preop_subject_log');
  }

  function selectByCaptureDateID($dateID) {
    return parent::select(
      [
        'id',
        'capture_date_id',
        'subject'
      ],
      [
        'capture_date_id' => $dateID
      ]
    );
  }

  function updateByCapturedLogID($changes, $logID) {
      return parent::update($changes, [
        'AND' => [
          'capture_date_id' => $logID
        ]
      ]);
  }
}

?>