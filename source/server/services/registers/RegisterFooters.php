<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla register_footers
class RegisterFooters extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('register_footers');
  }

  function getByZoneIDAndRegisterID($zoneID, $registerID) {
    return parent::get(
      [ 
        'footer'
      ],
      [
        'AND' => [
          'zone_id' => $zoneID,
          'register_id' => $registerID
        ]
      ]
    );
  }

  function updateByID($footerID, $footer) {
    return parent::update(
      [
        'footer' => $footer
      ],
      [
        'id' => $footerID
      ]
    );
  }

  function selectByZoneID($zoneID) {
    return parent::select(
      [
        "$this->table.id(id)",
        'z.id(zone_id)',
        'r.id(register_id)',
        'r.name_en(name_en)',
        'r.name_es(name_es)',
        'footer'
      ],
      [
        'z.id' => $zoneID,
      ],
      [
        '[><]zones(z)' => [
          'zone_id' => 'id'
        ],
        '[><]registers(r)' => [
          'register_id' => 'id'
        ]
      ]
    );
  }
}

?>