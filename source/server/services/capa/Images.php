<?php

namespace fsm\database\capa;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;

class Images extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('capa_images');
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

  function deleteByID($imageID) {
    return parent::delete([
      'id' => $imageID
    ]);
  }

  function getPathByFileID($imageID) {
    $rows = parent::select([ 'path' ], [ 'id' => $imageID ]);

    if (count($rows) === 0) {
      return FALSE;
    }

    return $rows[0]['path'];
  }
}

?>