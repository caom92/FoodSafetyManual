<?php

namespace fsm\database\gmp\packing\preop;
require_once realpath(dirname(__FILE__).'/../../../../dao/ToggableItemsTable.php');
use fsm\database as db;

class SubjectControl extends db\ToggableItemsTable
{
  function __construct() { 
    parent::__construct('gmp_packing_preop_subject_control');
  }

  // Checks if the field exists in a zone
  function hasByZoneID($zoneID) {
    return parent::has([
      'zone_id' => $zoneID
    ]);
  }

  // Check if the field is active in a zone
  function isActiveByZoneID($zoneID) {
    return parent::has([
      'AND' => [
        'zone_id' => $zoneID,
        'is_active' => TRUE
      ]
    ]);
  }

  // Return the row for a given zone
  function selectByZoneID($zoneID) {
    return parent::select('*', [ 'zone_id' => $zoneID ]);
  }
}

?>