<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/DataBaseTable.php');


class MenuFiles extends DataBaseTable
{
  function __construct() {
    parent::__construct('menu_files');
  }

  function selectByZoneId($zoneId) {
    return parent::select(
      [
        "$this->table.id",
        "$this->table.name",
        'u.first_name',
        'u.last_name',
        "$this->table.upload_date",
        "$this->table.zone_id",
        "$this->table.path"
      ],
      [
        "$this->table.zone_id" => $zoneId,
        'ORDER' => [
          'id'
        ]
      ],
      [
        '[><]users(u)' => [ 'user_id' => 'id' ]
      ]
    );
  }

  function insert($row) {
    return parent::insert($row);
  }

  function deleteById($id) {
    return parent::delete([ 'id' => $id ]);
  }

  function updateById($id, $newValues) {
    return parent::update($newValues, [ 'id' => $id ]);
  }

  function getById($id) {
    $rows = parent::select('*', [ 'id' => $id ]);
    return (count($rows) > 0) ? $rows[0] : NULL;
  }
}

?>