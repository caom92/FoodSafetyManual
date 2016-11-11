<?php
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
?>