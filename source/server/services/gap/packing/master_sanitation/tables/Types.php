<?php

namespace fsm\database\gap\packing\masterSanitation;
require_once realpath(dirname(__FILE__).'/../../../../../dao/OrderedItemsTable.php');
use fsm\database as db;

class Types extends db\OrderedItemsTable
{
  function __construct() { 
    parent::__construct('gap_packing_master_sanitation_types');
  }

  function countByZoneID($zoneID) {
    return parent::count(['zone_id' => $zoneID]);
  }

  function hasByNameAndZoneID($name, $zoneID) {
    return parent::has([
      'AND' => [
        'name' => $name,
        'zone_id' => $zoneID
      ]
    ]);
  }

  function selectByZoneID($zoneID) {
    return parent::select('*', [ 'zone_id' => $zoneID, 'ORDER' => [ "$this->table.position" ]]);
  }

  function selectActiveByZoneID($zoneID) {
    return parent::select(
      [
        'id',
        'name'
      ],
      [
        'AND' => [
          'zone_id' => $zoneID,
          'is_active' => TRUE
        ],
        'ORDER' => [
          'position'
        ]
      ]
    );
  }

  function selectByAreaID($areaID) {
    return parent::$dataBase->query(
      "SELECT 
        i.id AS id, 
        i.is_active AS is_active, 
        i.position AS position, 
        i.name AS name, 
        t.id AS type_id, 
        t.name AS type_name
      FROM $this->table AS t
      LEFT JOIN gap_packing_master_sanitation_checks AS i 
        ON i.type_id = t.id AND i.area_id = $areaID
      ORDER BY area_id, type_id, position"
    )->fetchAll();
  }
}

?>
