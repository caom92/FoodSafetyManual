<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/DataBaseTable.php');


class MenuItems extends DataBaseTable
{
  function __construct() {
    parent::__construct('menu_items');
  }

  function selectByUserId($userId) {
    return parent::select(
      [
        "$this->table.id",
        "$this->table.user_id",
        'parent_id','type_id',
        "$this->table.name",
        'icon',
        'image',
        'url',
        'file_id',
        't.name(type)',
        'path'
      ],
      [
        "$this->table.user_id" => $userId,
        'ORDER' => [
          'parent_id',
          'type_id',
          "$this->table.name"
        ]
      ],
      [
        '[><]menu_item_types(t)' => [ 'type_id' => 'id' ],
        '[>]menu_files(f)' => [ 'file_id' => 'id' ]
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
    $rows = parent::select([ 'type_id' ], [ 'id' => $id ]);
    if (count($rows) === 0) {
      return FALSE;
    }
    return intval($rows[0]['type_id']) === 1;
  }

  function isFile($id) {
    $rows = parent::select([ 'type_id' ], [ 'id' => $id ]);
    if (count($rows) === 0) {
      return FALSE;
    }
    return intval($rows[0]['type_id']) === 3;
  }

  function getImageDirectory($id) {
    $rows = parent::select([ 'type_id' ], [ 'id' => $id ]);
    if (count($rows) === 0) {
      return FALSE;
    }
    
    $imageDirectory = NULL;

    switch($rows[0]['type_id']) {
      case 1: $imageDirectory = 'directories'; break;
      case 2: $imageDirectory = 'links'; break;
      case 3: $imageDirectory = 'files'; break;
    }

    return $imageDirectory;
  }

  function updateById($id, $newValues) {
    return parent::update($newValues, [ 'id' => $id ]);
  }

  function getById($id) {
    $rows = parent::select(
      [
        "$this->table.id",
        "$this->table.user_id",
        'parent_id',
        'type_id',
        "$this->table.name",
        'icon',
        'image',
        'url',
        'file_id',
        't.name(type)',
        'path'
      ],
      [
        "$this->table.id" => $id
      ],
      [
        '[><]menu_item_types(t)' => [ 'type_id' => 'id' ],
        '[>]menu_files(f)' => [ 'file_id' => 'id' ]
      ]
    );
    return (count($rows) > 0) ? $rows[0] : NULL;
  }
}

?>