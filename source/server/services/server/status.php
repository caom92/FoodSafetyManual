<?php

$service = [
  'requirements_desc' => [
  ],
  'callback' => function($scope, $request) {
    include_once realpath(dirname(__FILE__).'/../../dao/DataBaseTable.php');
    return fsm\database\DataBaseTable::isDataBaseConnectionEstablished();
  }
];

?>