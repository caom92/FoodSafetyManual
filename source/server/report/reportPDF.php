<?php

require_once realpath(dirname(__FILE__)."/PDFCreator.php");
require_once realpath(__DIR__.'/../config/site_config.php');

// revisamos si el servidor esta configurado para ejercer CORS
if (SERVER_ALLOW_CORS_REQUESTS) {
    // si asi se, configuramos los encabezados necesarios
    header(
      'Access-Control-Allow-Headers: Content-Type'
    );
    header(
      'Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS'
    );
    
    // revisamos si el usuario necesita usar credenciales de 
    // identificacion de sesion junto con la comunicacion CORS 
    if (SERVER_ALLOW_CORS_CREDENTIALS) {
      // si es asi, necesitamos asegurarnos de que el cliente proviene 
      // de un origen autorizado, asi que primero obtenemos el origen
      $currentOrigin = rtrim($_SERVER['HTTP_REFERER'], '/');

      // inicializamos la bandera que indica si este origen esta 
      // autorizado
      $isOriginAllowed = FALSE;

      // tenemos que comparar el origen actual con la lista de origenes 
      // autorizados uno por uno
      foreach (SERVER_CORS_CREDENTIALS_ALLOWED_ORIGINS as $origin) {
        if ($currentOrigin == $origin) {
          $isOriginAllowed = TRUE;
          break;
        }
      }

      // si el origen actual esta autorizado para usar credenciales de 
      // autentificacion con CORS, inicializamos el resto de los 
      // encabezados necesarios
      if ($isOriginAllowed) {
        header(
          "Access-Control-Allow-Origin: $currentOrigin"
        );
        header(
          "Access-Control-Allow-Credentials: true"
        );
      }
    } else {
      // si no es necesario permitir CORS con credenciales de 
      // autentificacion, permitimos el acceso a cualquier origen
      $response = $response->withHeader(
        'Access-Control-Allow-Origin: *'
      );
    }
}

// get the language that is going to be used to print the PDF file
$lang = (isset($_POST['lang']) && array_key_exists('lang', $_POST)) ?
    ((isString($_POST['lang'])) ? $_POST['lang'] : 'en') 
    : 'en';

// Check if fontsize was sent from client; if not, default to 10

$fontsize = (isset($_POST['fontsize'])) ? (is_numeric($_POST['fontsize']) ? $_POST['fontsize'] : '10' ) : '10';

// Check if page orientation was sent from client; if not, default to portrait

$orientation = (isset($_POST['orientation'])) ? (isString($_POST['orientation']) ? $_POST['orientation'] : 'P' ) : 'P';

// create new PDF document
$pdf = new PDFCreator(
    $lang, 
    $_POST['logo'], 
    $_POST['company'], 
    $_POST['address'],
    $_POST['footer'],
    $_POST['signature'],
    $_POST['supervisor'],
    $fontsize,
    $orientation
);

// header('Content-Type: text/plain');
// $json = json_encode($_POST);
// echo "<pre>$json<pre>";

// initialize the storage for the HTML that will be displayed in the PDF file
$html = '';

// set the style of the content and the report data display in the page body
$style = (isset($_POST['style']) && array_key_exists('style', $_POST)) ?
    ((isString($_POST['style'])) ? $_POST['style'] : '')
    : '';

try {
    // check if the client sent the content to print to the PDF file
    $hasContent = 
        isset($_POST['content']) && array_key_exists('content', $_POST);

    // throw an exception if no content is available
    if (!$hasContent) {
        throw new \Exception();
    }

    // parse the content sent from the client
    $reportData = json_decode($_POST['content']);

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
        $hasImages = false;
        // add a new page 
        $pdf->AddPage($orientation);

        // check if the header and the footer are set
        $header = (isset($report->header)) ? $report->header.'<br><br>' : '';
        $footer = (isset($report->footer)) ? '<br><br>'.$report->footer : '';

        // prepare the HTML to display in the body
        $html = $style.$header.$report->body.$footer;

        // print the result to the document
        $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

        if (strlen($_POST['signature']) > 0) {
            $pdf->closing($_POST['supervisor']);
        }

        if(isset($_POST["images"])){
            if($_POST["images"] != "null"){
                $hasImages = true;
                
                foreach(json_decode($_POST["images"]) as $image){
                    list($w, $h) = getimagesize($image);

                    // Resize and padding
                    if($w >= $h){
                        $width = 200;
                        $height = 0;
                        $padding_x = 0;
                        $padding_y = (287 - (integer)((200*$h) / $w))/2;
                    } else {
                        $height = 287;
                        $width = 0;
                        $padding_x = (200 - (integer)((287*$w) / $h))/2;
                        $padding_y = 0;
                    }

                    $pdf->setPrintHeader(false);
                    $pdf->AddPage($orientation);
                    $pdf->setPrintFooter(false);
                    $bMargin = $pdf->getBreakMargin();
                    // disable auto-page-break
                    $pdf->SetAutoPageBreak(false, 0);
                    // set bacground image
                    $pdf->Image($image, 5 + $padding_x, 5 + $padding_y, $width, $height, '', '', '', false, 300, '', false, false, 0);
                    // set the starting point for the page content
                    $pdf->setPageMark();
                }
                /*$pdf->setPrintHeader(true);
                $pdf->AddPage($orientation);
                $pdf->setPrintFooter(true);*/
            }
        }
    }
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
    // close and output PDF document
    $pdf->Output('report.pdf', 'I');
}

?>