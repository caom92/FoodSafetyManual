<?php

namespace fsm\database\capa;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;

class Files extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('capa_files');
  }

  function selectByFormID($formID) {
    return parent::select(
      [
        'id',
        'path'
      ],
      [
        'form_id' => $formID
      ]
    );
  }

  function deleteByID($fileID) {
    return parent::delete([
      'id' => $fileID
    ]);
  }

  function getPathByFileID($fileID) {
    $rows = parent::select([ 'path' ], [ 'id' => $fileID ]);

    if (count($rows) === 0) {
      return FALSE;
    }

    return $rows[0]['path'];
  }
}

?>