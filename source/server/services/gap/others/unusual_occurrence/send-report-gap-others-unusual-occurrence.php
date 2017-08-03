<?php

require_once realpath(dirname(__FILE__).'/../../../../report/PDFCreator.php');
require_once realpath(dirname(__FILE__).'/../../../../Email.php');

use fsm\mail\Email;

$service = [
  'requirements_desc' => [
    'logged_in' => 'any',
    'style' => [
      'type' => 'string'
    ],
    'lang' => [
      'type' => 'string',
      'length' => 2
    ],
    'subject' => [
      'type' => 'string'
    ],
    'company' => [
      'type' => 'string'
    ],
    'address' => [
      'type' => 'string'
    ],
    'logo' => [
      'type' => 'string'
    ],
    'signature' => [
      'type' => 'string'
    ],
    'supervisor' => [
      'type' => 'string'
    ],
    'footer' => [
      'type' => 'string'
    ],
    'content' => [
      'type' => 'string'
    ]
  ],
  'callback' => function($scope, $request) {
    // create new PDF document
    $pdf = new PDFCreator(
      $request['lang'], 
      $request['logo'], 
      $request['company'], 
      $request['address'],
      $request['footer'],
      $request['signature'],
      $request['supervisor']
    );

    // initialize the storage for the HTML that will be displayed in the PDF file
    $html = '';

    try {
      // parse the content sent from the client
      $reportData = json_decode($request['content']);

      // for every report to print...
      foreach ($reportData as $report) {
        // check that the page has the proper parts
        $hasHeader = isset($report->header);
        $hasBody = isset($report->body);
        $hasFooter = isset($report->footer);

        //  if the page has a header, check that is a string
        if ($hasHeader) {
          if (!isString($report->header, 1, \PHP_INT_MAX)) 
          {
            throw new \Exception();
          }
        }

        // if the page has a footer, check that is a string
        if ($hasFooter) {
          if (!isString($report->footer, 1, \PHP_INT_MAX))
          {
            throw new \Exception();
          }
        }

        // if the page has a body, check that is a string with some content
        // in it
        if ($hasBody) {
          if (!stringHasLengthInterval($report->body, 1, \PHP_INT_MAX)) 
          {
            throw new \Exception();
          }
        } else {
          throw new \Exception();
        }
      }

      // for each report to display in the document ...
      foreach ($reportData as $report) {
        // add a new page 
        $pdf->AddPage();

        // check if the header and the footer are set
        $header = (isset($report->header)) ? $report->header.'<br><br>' : '';
        $footer = (isset($report->footer)) ? '<br><br>'.$report->footer : '';

        // prepare the HTML to display in the body
        $html = $request['style'].$header.$report->body.$footer;

        // print the result to the document
        $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
      }
      $pdf->closing($request['supervisor']);
    } catch (\Exception $e) {
      // if an exception was thrown, print an error PDF file
      $html = 
        '<h1>Error trying to create the PDF document!</h1>'.
        '<p>Your PDF document could not be created because the information '.
        'required to write it was not provided correctly.</p>';

      // add a new page 
      $pdf->AddPage();

      // print the result to the document
      $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
    } finally {
      $fileName = date('m/d/Y h:i:s a', time()) . ".pdf";
      $pdf->Output($fileName, 'F');

      $body = 
        "All,\n\n".
        "Please see attachment to review the NOUCA report. Also, note that \n".
        "all corrective actions regarding this incident has been completed. \n".
        "Other wise please consider to complete whatever is left to cover.\n\n".
        "Por favor revise el archivo NOUCA adjunto en este correo.  Tambien \n".
        "note que todas las acciones correctivas fueron hechas referente a \n".
        "este problema. Si no es asi, por favor considere terminar las \n".
        "acciones que esten pendientes.\n\n".
        "Sincerely/a la orden,\n\n".
        "Quality Assurance Group";

      $email = new Email(
        [
          'email' => 'QAgroup@delcabo.com',
          'name' => 'QA Group'
        ],
        $request['subject'],
        $body,
        'en'
      );

      $email->addAttachment($fileName, $fileName);
      $error = $email->send();

      if (strlen($error) == 0) {
        unlink($fileName);
      } else {
        throw new \Exception($error);
      }
    }
  }
];

?>