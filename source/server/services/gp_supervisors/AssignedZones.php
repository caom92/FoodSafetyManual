<?php

namespace fsm\database\gpSupervisors;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;

class AssignedZones extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('zones_under_charge');
  }

  function selectZoneIDByUserID($userID) {
    return parent::select(
      [
        'zone_id(id)'
      ],
      [
        'user_id' => $userID
      ],
      [
        '[><]zones(z)' => [
          'zone_id' => 'id'
        ]
      ]
    );
  }

  function selectZoneNamesByUserID($userID){
    return parent::select(
      [
        'zone_id(id)',
        'z.name(name)'
      ],
      [
        'user_id' => $userID
      ],
      [
        '[><]zones(z)' => [
          'zone_id' => 'id'
        ]
      ]
    );
  }

  function deleteByUserID($userID) {
    return parent::delete([
      'user_id' => $userID
    ]);
  }
}

?>