<?php

namespace fsm\database\customerComplaint;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;

class Sources extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('customer_complaint_sources');
  }

  function selectByFormID($formID) {
    return parent::select(
      [
        "$this->table.id",
        'zone_id',
        'z.name(zone_name)'
      ],
      [
        'form_id' => $formID
      ],
      [
        '[><]zones(z)' => [
          'zone_id' => 'id'
        ]
      ]
    );
  }

  function selectZoneIDByFormID($formID) {
    return parent::select(
      [
        'zone_id(id)'
      ],
      [
        'form_id' => $formID
      ],
      [
        '[><]zones(z)' => [
          'zone_id' => 'id'
        ]
      ]
    );
  }

  function deleteByID($detailsID) {
    return parent::delete([
      'id' => $detailsID
    ]);
  }

  function deleteByFormID($formID) {
    return parent::delete([
      'form_id' => $formID
    ]);
  }
}

?>