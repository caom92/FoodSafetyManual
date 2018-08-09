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
}

?>