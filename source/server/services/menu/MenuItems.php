<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/DataBaseTable.php');


class MenuItems extends DataBaseTable
{
  function __construct() {
    parent::__construct('menu_items');
  }

  function selectByUserId($userId) {
    return parent::select('*',
      [
        'user_id' => $userId,
        'ORDER' => [
          'parent_id',
          'is_directory' => 'DESC',
          'name'
        ]
      ]
    );
  }

  function insert($row) {
    return parent::insert($row);
  }

  function deleteById($id) {
    return parent::delete([ 'id' => $id ]);
  }

  function isDirectory($id) {
    $rows = parent::select([ 'is_directory' ], [ 'id' => $id ]);
    if (count($rows) === 0) {
      return FALSE;
    }
    return intval($rows[0]['is_directory']) === 1;
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