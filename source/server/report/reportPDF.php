<?php
<<<<<<< HEAD
    require_once realpath(dirname(__FILE__)."/../../../external/tcpdf/tcpdf.php");

    if(isset($_GET["lang"])){
        if($_GET["lang"] == "es" || $_GET["lang"] == "en")
            $lang = $_GET["lang"];
        else
            $lang = "es";
    } else {
        $lang = "es";
    }

    $esArray = array(
        "zone" => "Zona",
        "program" => "Programa",
        "module" => "Módulo",
        "page" => "Página",
        "of" => "de",
        "date" => "Fecha",
        "elaboration" => "Elaboró",
        "approval" => "Aprobó",
    );

    $enArray = array(
        "zone" => "Zone",
        "program" => "Program",
        "module" => "Module",
        "page" => "Page",
        "of" => "of",
        "date" => "Date",
        "elaboration" => "Made by",
        "approval" => "Approved by",
    );

    $stringArray = array(
        "es" => $esArray,
        "en" => $enArray,
    );

    class Report extends TCPDF {
        // Sets the metadata for the generated PDF file
        public function initialize(){
            $author = "Jacobs Farm, Del Cabo";
            $title = "PDF Report";
            $subject = "PDF Report";
            $keywords = "Jacobs, Farm, Del, Cabo, Report, PDF";

            $this->SetCreator(PDF_CREATOR);
            $this->SetAuthor($author);
            $this->SetTitle($title);
            $this->SetSubject($subject);
            $this->SetKeywords($keywords);

            $this->stringArray = $GLOBALS["stringArray"];
            $this->lang = $GLOBALS["lang"];
        }

        // Logo, name and address of the company
        public function getCompanyInfo(){
            $data = new stdClass();
            $data->{"logo"} = realpath(dirname(__FILE__).
                "/../../../data/images/logo.png");
            $data->{"companyName"} = "Jacobs Farm, Del Cabo";
            $data->{"companyAddress"} = "P.O. Box 508 Pescadero, CA. 94060";
            return $data;
        }

        // Page footer
        public function Footer() {
            // Position at 15 mm from bottom
            $this->SetY(-15);
            // Set font
            $this->SetFont('helvetica', 'I', 8);
            // Page number
            $this->Cell(0, 10, $this->stringArray[$this->lang]["page"]." ".$this->getAliasNumPage()." ".$this->stringArray[$this->lang]["of"]." ".$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
            $this->Line(15,$this->y,200,$this->y);
        }
    }

    class SSOPReport extends Report{
        public function Header(){
            // assign company data to variables
            $company = $this->getCompanyInfo(null);
            $reportHeader = $this->getReportHeader(1, 1, null);

            $logo = $company->logo;
            $companyName = $company->companyName;
            $companyAddress = $company->companyAddress;
            $zone = $reportHeader->zone;
            $program = $reportHeader->program;
            $module = $reportHeader->module;
            $date = $reportHeader->date;
            $elaboration = $reportHeader->elaboration;
            $approval = $reportHeader->approval;

            $this->Image($logo, 5, 5, 40, '', 'PNG', '', 'T', false, 300, '', 
                false, false, 0, false, false, false);
            $this->ln(0);
            $this->SetFont('helvetica', 'B', 15);
            $this->Cell(0, 12, $companyName, 0, false, 'C', 0, '', 0, false, 
                'T', 'M');
            $this->ln(5);
            $this->SetFont('helvetica', 'B', 10);
            $this->Cell(0, 12, $companyAddress, 0, false, 'C', 0, '', 0, false, 
                'T', 'M');
            $this->ln(9);
            $moduleInfo = '
            <div style="text-align:justify;">
                '.$zone.'<br>
                '.$program.'<br>
                '.$module.'
            </div>
            ';
            $reportInfo = '
            <div style="text-align:justify;">
                '.$date.'<br>
                '.$elaboration.'<br>
                '.$approval.'
            </div>
            ';
            $this->writeHTMLCell(null, null, null, 25, $moduleInfo, 1, 0, false, true);
            $this->writeHTMLCell(null, null, null, 38.5, $reportInfo, 1, 0, false, true);
        }

        public function getReportHeader($zone, $module, $date){
            // Sending the zone, module and date to the DAO we obtain the data
            // about the program, who made the report and who approved it

            //Build the object
            $data = new stdClass();
            $data->{"zone"} = $this->stringArray[$this->lang]["zone"].": "."BCN";
            $data->{"program"} = $this->stringArray[$this->lang]["program"].": "."SSOP";
            $data->{"module"} = $this->stringArray[$this->lang]["module"].": "."Sanitation Preop";
            $data->{"date"} = $this->stringArray[$this->lang]["date"].": "."01/01/2016";
            $data->{"elaboration"} = $this->stringArray[$this->lang]["elaboration"].": "."Victor Miracle";
            $data->{"approval"} = $this->stringArray[$this->lang]["approval"].": "."Carlos Oliva";

            return $data;
        }

        public function getReportData($zone, $module, $date){

        }
    }

    // create new PDF document
    $pdf = new SSOPReport(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    $pdf->initialize();

    // set default monospaced font
    $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

    // $pdf->AddPage();

    // set margins
    $pdf->SetMargins(PDF_MARGIN_LEFT, 55, PDF_MARGIN_RIGHT);
    $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
    $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

    // set auto page breaks
    $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

    // set image scale factor
    $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

    // set some language-dependent strings (optional)
    if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
        require_once(dirname(__FILE__).'/lang/eng.php');
        $pdf->setLanguageArray($l);
    }

    // ---------------------------------------------------------

    // set default font subsetting mode
    $pdf->setFontSubsetting(true);

    // Set font
    // dejavusans is a UTF-8 Unicode font, if you only need to
    // print standard ASCII chars, you can use core fonts like
    // helvetica or times to reduce file size.
    $pdf->SetFont('helvetica', '', 12, '', true);

    // Add a page
    // This method has several options, check the source code documentation for more information.
    $pdf->AddPage();

// Set some content to print
    $html = '
<style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td {
    border: 1px solid #000000;
    text-align: left;
}

th {
    border: 1px solid #000000;
    text-align: left;
    font-weight: bold;
    background-color: #4CAF50;
}

.even {
    background-color: #b8e0b9;
}

.approved {
    color: green;
}

.notApproved {
    color: red;
}
</style>

<table>
  <tr>
    <th>Elemento</th>
    <th>Estado</th>
    <th>Comentarios</th>
  </tr>
  <tr>
    <td>Mesas de trabajo</td>
    <td class="approved">Aprobado</td>
    <td>Se encontraba limpia y libre de polvo</td>
  </tr>
  <tr class="even">
    <td>Cajas</td>
    <td class="approved">Aprobado</td>
    <td>Estaban acomodadas en su lugar y no se notó ninguna anomalía</td>
  </tr>
  <tr>
    <td>Pisos</td>
    <td class="notApproved">No aprobado</td>
    <td>El suelo se encontraba húmedo. Inmediatamente se limpio antes de comenzar con el trabajo del dia</td>
  </tr>
  <tr class="even">
    <td>Montacargas</td>
    <td class="approved">Aprobado</td>
    <td>El tanque de gasolina estaba lleno hasta la mitad, se encomendó rellenarlo al terminar la jornada.</td>
  </tr>
</table>
';

    // Print text using writeHTMLCell()
    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

    // ---------------------------------------------------------

    // Close and output PDF document
    $pdf->Output('report.pdf', 'I');
=======

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

$orientation = (isset($_POST['orientation'])) ? ((isString($_POST['orientation']) && ($_POST['orientation'] == 'P' || $_POST['orientation'] == 'L')) ? $_POST['orientation'] : 'P' ) : 'P';

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
        throw new \Exception('No content JSON was provided');
    }

    // parse the content sent from the client
    $reportData = json_decode($_POST['content']);
    $jsonError = json_last_error();
    if ($jsonError != JSON_ERROR_NONE) {
        throw new \Exception(json_last_error_msg());
    }

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
                throw new \Exception('No header was provided inside the content JSON');
            }
        }

        // if the page has a footer, check that is a string
        if ($hasFooter) {
            if (!isString($report->footer, 1, \PHP_INT_MAX))
            {
                throw new \Exception('No footer was provided inside the content JSON');
            }
        }

        // if the page has a body, check that is a string with some content
        // in it
        if ($hasBody) {
            if (!stringHasLengthInterval($report->body, 1, \PHP_INT_MAX)) 
            {
                throw new \Exception('The body in the content JSON is an empty string');
            }
        } else {
            throw new \Exception('No body was provided inside the content JSON');
        }
    }

    // for each report to display in the document ...
    foreach ($reportData as $report) {
        $hasImages = false;
        // add a new page, check if current report has a set orientation
        $reportOrientation = (isset($report->orientation)) ? ((isString($report->orientation) && ($report->orientation == 'P' || $report->orientation == 'L')) ? $report->orientation : $orientation ) : $orientation;
        $pdf->AddPage($reportOrientation);
        
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
            if($_POST["images"] != "null" && $_POST["images"] != ""){
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
                    $pdf->AddPage($reportOrientation);
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
                $pdf->AddPage($reportOrientation);
                $pdf->setPrintFooter(true);*/
            }
        }
    }
} catch (\Exception $e) {
    // if an exception was thrown, print an error PDF file
    $html = 
        '<h1>Error trying to create the PDF document!</h1>'.
        '<p>Your PDF document could not be created because the information '.
        'required to write it was not provided correctly.</p>'.
        '<p>Exception: '.$e->getMessage().'</p>';

    // add a new page 
    $pdf->AddPage();

    // print the result to the document
    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
} finally {
    // close and output PDF document
    $pdf->Output('report.pdf', 'I');
}

>>>>>>> carlos
?>