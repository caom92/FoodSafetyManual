<?php

    require_once realpath(dirname(__FILE__)."/../../../external/tcpdf/tcpdf.php");
    require_once realpath(dirname(__FILE__)."/../services/gmp/packing/preop/preop_services.php");
    require_once realpath(dirname(__FILE__).'/../Session.php');
    require_once realpath(dirname(__FILE__).'/htmlManager.php');

    use fsm as session;
    use fsm\validations as val;
    use fsm\database\gmp\packing\preop as preop;
    use fsm\database as db;
    use fsm\services\gmp\packing\preop as preopService;
    use fsm\report\html as html;

    $_POST['start_date'] = $_GET['start_date'];
    $_POST['end_date'] = $_GET['end_date'];

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
        "log" => "Bitácora",
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
        "log" => "Log",
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

        // Prototype for CSS Stylesheet

        public function getCSS() {
            return '';
        }
    }

    class SSOPPreopReport extends Report{
        private $report;

        public function setReportData($reportData) {
            $this->report = $reportData;
        }

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
            $log = $reportHeader->log;
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
                '.$module.'<br>
                '.$log.'
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
            $this->writeHTMLCell(null, null, null, 43, $reportInfo, 1, 0, false, true);
        }

        public function getReportHeader($zone, $module, $date){
            // Sending the zone, module and date to the DAO we obtain the data
            // about the program, who made the report and who approved it

            //$report = $this->getReportData();
            $report = $this->report;

            //Build the object
            $data = new stdClass();
            $data->{"zone"} = $this->stringArray[$this->lang]["zone"].": ".$report['zone_name'];
            $data->{"program"} = $this->stringArray[$this->lang]["program"].": ".$report['program_name'];
            $data->{"module"} = $this->stringArray[$this->lang]["module"].": ".$report['module_name'];
            $data->{"log"} = $this->stringArray[$this->lang]["log"].": ".$report['log_name'];
            $data->{"date"} = $this->stringArray[$this->lang]["date"].": ".$report['creation_date'];
            $data->{"elaboration"} = $this->stringArray[$this->lang]["elaboration"].": ".$report['created_by'];
            $data->{"approval"} = $this->stringArray[$this->lang]["approval"].": ".$report['approved_by'];

            return $data;
        }

        public function getCSS() {
            return '<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%;}td { border: 1px solid #000000; text-align: left;}th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50;}.even { background-color: #b8e0b9;}.verticaltext{ writing-mode:tb-rl; transform: rotate(90deg); white-space:nowrap; word-break:break-word; bottom:0;}.typeTitle{ background-color: yellow; width:501px;}.fullColumn{ background-color: #D3D3D3;width:501px;}.nameColumn{ width:116px;}.numberColumn{ width:30px;}.timeColumn{ width:40px;}.statusColumn{ width:85px;}.actionColumn{ width:70px;}.commentColumn{ width:200px;}</style>';
        }

        public function getReportData(){
            return preopService\getReportData();
        }

        public function tableArray(){
            //$report = $this->getReportData();
            $report = $this->report;
            $reportContents = [];

            foreach ($report['areas'] as $area) {
                $isFirst = true;
                $firstRow = [];

                $areaRows = 2;

                foreach ($area['types'] as $type) {
                    $areaRows += count($type['items']) + 1;
                }

                array_push($firstRow, (object) array("rowspan" => $areaRows, "contents" => $area['name'], "classes" => "areaColumn"));
                array_push($firstRow, (object) array("rowspan" => $areaRows, "contents" => substr($area['time'], 0, -3), "classes" => "timeColumn"));

                foreach ($area['types'] as $type) {
                    if($isFirst){
                        array_push($firstRow, (object) array("colspan" => 5, "contents" => $type["name"], "classes" => "typeTitle"));
                        array_push($reportContents, $firstRow);
                        $isFirst = false;
                    } else {
                        $temp = [];
                        array_push($temp, (object) array("colspan" => 5, "contents" => $type["name"], "classes" => "typeTitle"));
                        array_push($reportContents, $temp);
                    }
                    foreach ($type['items'] as $item) {
                        $temp = [];
                        array_push($temp, (object) array("contents" => $item["order"], "classes" => "numberColumn"));
                        array_push($temp, (object) array("contents" => $item["name"], "classes" => "nameColumn"));

                        if($item["status"] == 1) {
                            array_push($temp, (object) array("contents" => "Aceptable", "classes" => "acceptable_tag statusColumn"));
                        } else {
                            array_push($temp, (object) array("contents" => "Aceptable", "classes" => "unacceptable_tag statusColumn"));
                        }

                        array_push($temp, (object) array("contents" => $item["corrective_action"], "classes" => "actionColumn"));
                        array_push($temp, (object) array("contents" => $item["comment"], "classes" => "commentColumn"));

                        array_push($reportContents, $temp);
                    }
                }
                $notesRow = [];
                $personRow = [];

                array_push($notesRow, (object) array("colspan" => 5, "contents" => "Notas: ".$area["notes"], "classes" => "fullColumn"));
                array_push($personRow, (object) array("colspan" => 5, "contents" => "Persona a cargo de la sanitizacion: ".$area["person_performing_sanitation"], "classes" => "fullColumn"));

                array_push($reportContents, $notesRow);
                array_push($reportContents, $personRow);
            }

            return $reportContents;
        }
    }

    // Start session

    $session = new session\Session();

    // create new PDF document
    $pdf = new SSOPPreopReport(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    $pdf->initialize();

    // set default monospaced font
    $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

    // $pdf->AddPage();

    // set margins
    $pdf->SetMargins(PDF_MARGIN_LEFT, 60, PDF_MARGIN_RIGHT);
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
    $pdf->SetFont('helvetica', '', 10, '', true);

    $reportData = $pdf->getReportData();
    foreach ($reportData as $report) {
        // Add a page
        // This method has several options, check the source code documentation for more information.
        $pdf->setReportData($report);
        $pdf->AddPage();
        // Call the proper functions to get both the style and the data
        $html = $pdf->getCSS().html\reportTable("testTable", "lmao", html\reportTitle(null, "whatever", html\headerTestData()), html\reportBody(null, "whatever", $pdf->tableArray()), null);
        //$html = $pdf->getCSS().json_encode($pdf->getReportData()).json_encode($pdf->tableArray());
        //$html = json_encode($pdf->tableArray());

        // Print text using writeHTMLCell()
        $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
    }

    // ---------------------------------------------------------

    // Close and output PDF document
    $pdf->Output('report.pdf', 'I');
?>