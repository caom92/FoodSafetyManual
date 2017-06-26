<?php

namespace fsm\database;
require_once realpath(dirname(__FILE__).'/../../dao/InsertableTable.php');
use fsm\database as db;


// Interfaz para la tabla report_footers
class ReportFooters extends db\InsertableTable
{
  // Crea una instancia de una interfaz a la base de datos para modificar 
  // la tabla report_footers
  function __construct() { 
    parent::__construct('report_footers');
  }

  // Retorna el pie de pagina que tenga registrado la zona y la bitacora 
  // especificados
  function selectByZoneIDAndLogID($zoneID, $logID) {
    return parent::get(
      [ 
        'capture_form_footer(form_footer)', 
        'report_document_footer(report_footer)'
      ],
      [
        'AND' => [
          'zone_id' => $zoneID,
          'log_id' => $logID
        ]
      ]
    );
  }

  // Modifica los pies de pagina de la bitacora con el ID especificado
  function updateByID($footerID, $captureFooter, $reportFooter) {
    return parent::update(
      [
        'capture_form_footer' => $captureFooter,
        'report_document_footer' => $reportFooter
      ],
      [
        'id' => $footerID
      ]
    );
  }

  // Retorna una lista de todos los pies de pagina registrados en la zona
  // con el ID especificado 
  function selectByZoneID($zoneID) {
    return parent::select(
      [
        "$this->table.id(id)",
        'z.name(zone_name)',
        'l.name(log_name)',
        'capture_form_footer(html_footer)',
        'report_document_footer(pdf_footer)'
      ],
      [
        'zone_id' => $zoneID
      ],
      [
        '[><]zones(z)' => [
          'zone_id' => 'id'
        ],
        '[><]logs(l)' => [
          'log_id' => 'id'
        ]
      ]
    );
  }
}

?>