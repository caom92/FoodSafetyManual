<?php

namespace fsm\database\customerComplaint;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;

class Details extends db\InsertableTable
{
  function __construct() { 
    parent::__construct('customer_complaint_product_details');
  }

  function selectByFormID($formID) {
    return parent::select(
      [
        'id',
        'form_id',
        'entry_num',
        'product',
        'cost',
        'quantity'
      ],
      [
        'form_id' => $formID
      ]
    );
  }

  function hasByFormIDAndEntry($formID, $entryNumber) {
    return parent::has([
      'AND' => [
        'form_id' => $formID,
        'entry_num' => $entryNumber
      ]
    ]);
  }

  function selectHigherEntryByFormID($formID, $entryNumber) {
    return parent::select(
      [
        'id'
      ],
      [
        'AND' => [
          'form_id' => $formID,
          'entry_num[>]' => $entryNumber
        ]
      ]
    );
  }

  function updateByFormIDAndEntry($changes, $formID, $entryNumber) {
    return parent::update($changes, [
      'AND' => [
        'form_id' => $formID,
        'entry_num' => $entryNumber
      ]
    ]);
  }

  function deleteByID($detailsID) {
    return parent::delete([
      'id' => $detailsID
    ]);
  }

  function delete($where) {
    return parent::delete($where);
  }
}

?>