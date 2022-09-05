<?php

namespace fsm\database\cropRegistry;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;

class Logs extends db\InsertableTable
{
  function __construct() {
    parent::__construct('crop_registry_form');
  }

  function selectByZoneID($zoneID) {
    return parent::select(
      [
        "$this->table.id",
        'u.first_name(submitter_first_name)',
        'u.last_name(submitter_last_name)',
        'z.name(zone_name)',
        'date',
        'crop',
        'variety',
        'section',
        'block',
        'weight',
        'people',
        'hours'
      ],
      [
        "$this->table.zone_id" => $zoneID,
        'ORDER' => [
          'date' => 'DESC'
        ]
      ],
      [
        '[><]users(u)' => [
          'submitter_id' => 'id'
        ],
        '[><]zones(z)' => [
          'zone_id' => 'id'
        ]
      ]
    );
  }

  function selectUniqueVarieties() {
    return parent::$dataBase->query(
      "SELECT DISTINCT
        variety
      FROM $this->table
      ORDER BY variety ASC;"
    )->fetchAll();
  }

  function selectUniqueCrops() {
    return parent::$dataBase->query(
      "SELECT DISTINCT
        crop
      FROM $this->table
      ORDER BY crop ASC;"
    )->fetchAll();
  }
}

?>