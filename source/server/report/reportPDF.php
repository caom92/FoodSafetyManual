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

            //Build the object
            $data = new stdClass();
            $data->{"zone"} = $this->stringArray[$this->lang]["zone"].": "."LAW";
            $data->{"program"} = $this->stringArray[$this->lang]["program"].": "."Packing";
            $data->{"module"} = $this->stringArray[$this->lang]["module"].": "."GMP";
            $data->{"log"} = $this->stringArray[$this->lang]["log"].": "."Pre-Operational Inspection";
            $data->{"date"} = $this->stringArray[$this->lang]["date"].": "."24/11/2016";
            $data->{"elaboration"} = $this->stringArray[$this->lang]["elaboration"].": "."Victor Miracle";
            $data->{"approval"} = $this->stringArray[$this->lang]["approval"].": "."God";

            return $data;
        }

        public function getReportData($zone, $module, $date){

        }
    }

    class HTMLElement {
        private $tag;
        private $classes = "";
        private $attributes = array();
        private $content = array();

        public function addClass($classes){
            if($this->classes=="")
                $this->classes .= $classes;
            else
                $this->classes .= " ".$classes;
        }

        public function attr($attribute, $value){
            $this->attributes[$attribute] = $value;
        }

        public function append($content){
            array_push($this->content, $content);
        }

        public function __construct($tag){
            $this->tag = $tag;
        }

        public function __toString(){
            $text = "";

            // Opening tag without a >, we must first append classes and attributes

            $text .= "&lt";
            $text .= $this->tag;

            // Append classes

            $text .= " class=\"".$this->classes."\"";

            // Add attributes

            foreach ($this->attributes as $key => $value) {
                $text .= " ".$key."=\"".$value."\"";
                // $text .= $key."lmao";
            }

            // Close opening tag

            $text .= "&gt";

            // Append contents

            foreach ($this->content as $value) {
                $text .= $value;
            }

            // Add closing tag

            $text .= "&lt/".$this->tag."&gt";

            return $text;
        }
    }
/*
    function reportTable(id, classes, header, body, footer){
        var table = new HTMLElement("table");

        table->addClass(classes);

        if(id)
            table->attr("id", id);

        table->append(header);
        table->append(body);
        // table->append(footer);

        return table;
    }

    function reportBody(id, classes, rowsArray){

        var body = new HTMLElement("tbody");

        body->addClass(classes);

        if(id)
            body->attr("id", id);

        rowsArray.forEach(function(index){
            body->append(reportRow(id, classes, index));
        });

        return body;
    }

    function reportFooter(){

    }

    function reportTitle(id, classes, titleArray){
        // Title Array must be as follows
        // An array of objects with attributes classes and colspan
        // Classes will be the classes added to the <th>
        // colspan will be the number of columns the <th> will span
        // {classes: "class", colspan: 2}

        var header = new HTMLElement("thead");
        var headerRow = new HTMLElement("tr");

        headerRow->addClass(classes);

        if(id)
            headerRow->attr("id", id);

        titleArray.forEach(function(index){
            var th = new HTMLElement("th");
            th->addClass(index.classes);

            if(index.colspan){
                th->attr("colspan", index.colspan);
            }

            headerRow->append(th);
        });

        header->append(headerRow);

        return header;
    }

    function reportRow(id, classes, columnArray){
        // Column Array must be as follows
        // An array of objects with attributes classes, rowspan and contents
        // Classes will be the classes added to the <td>
        // rowspan will be the rows the <td> will span
        // contents will be the contents to be shown on the <td>
        // {classes: "class", rowspan: 2, contents: "Hello World"}

        var row = new HTMLElement("tr");

        row->addClass(classes);

        if(id)
            row->attr("id", id);

        columnArray.forEach(function(column){
            row->append(reportRowColumn(column));
        });

        return row;
    }

    function reportRowColumn(columnObject){
        // Column Array must be as follows
        // A singlem object with attributes
        // Classes will be the classes added to the <td>
        // rowspan will be the rows the <td> will span
        // contents will be the contents to be shown on the <td>
        // {classes: "class", rowspan: 2, contents: "Hello World"}

        var column = new HTMLElement("td");

        column->addClass(columnObject.classes);

        if(columnObject.rowspan)
            column->attr("rowspan", columnObject.rowspan);

        column->append(columnObject.contents);

        return column;
    }*/

    // create new PDF document
    $pdf = new SSOPReport(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

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

.verticaltext{
    writing-mode:tb-rl;
    transform: rotate(90deg);
    white-space:nowrap;
    word-break:break-word;
    bottom:0;
}

.nameColumn{
    width:116px;
}

.numberColumn{
    width:30px;
}

.timeColumn{
    width:40px;
}

.statusColumn{
    width:85px;
}

.actionColumn{
    width:70px;
}

.commentColumn{
    width:200px;
}

</style>

<table class="lmao" id="testTable"><thead class=""><tr class="whatever"><th class="area_title areaColumn">Área</th><th class="time_title timeColumn">Hora</th><th class="number_title numberColumn">#</th><th class="name_title nameColumn">Nombre</th><th class="status_title statusColumn">Condiciones</th><th class="action_title actionColumn">Acción correctiva</th><th class="comment_title commentColumn">Comentarios</th></tr></thead><tbody class="whatever"><tr class="whatever"><td class="areaColumn" rowspan="7">Warehouse</td><td class="timeColumn" rowspan="7">12:09</td><td class="numberColumn">1</td><td class="nameColumn">Floors</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">2</td><td class="nameColumn">Ceiling Lights</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">3</td><td class="nameColumn">Trash Recepticales</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">4</td><td class="nameColumn">Equipment Tomatoes</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">5</td><td class="nameColumn">Stainless Table (5)</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">6</td><td class="nameColumn">Roll Up Loading Doors</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">7</td><td class="nameColumn">Forklift/Palletjack/Wave</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="areaColumn" rowspan="7">Cooler #1</td><td class="timeColumn" rowspan="7">12:09</td><td class="numberColumn">1</td><td class="nameColumn">Floors</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">2</td><td class="nameColumn">Cool Care Fans</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">3</td><td class="nameColumn">Ceiling Lights</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">4</td><td class="nameColumn">Trash Recepticales</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">5</td><td class="nameColumn">Walls</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">6</td><td class="nameColumn">Plastic Curtains</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">7</td><td class="nameColumn">Cooling Units</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="areaColumn" rowspan="6">Cooler #2</td><td class="timeColumn" rowspan="6">12:09</td><td class="numberColumn">1</td><td class="nameColumn">Floors</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">2</td><td class="nameColumn">Ceiling Lights</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">3</td><td class="nameColumn">Trash Recepticales</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">4</td><td class="nameColumn">Walls</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">5</td><td class="nameColumn">Plastic Curtains</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr><tr class="whatever"><td class="numberColumn">6</td><td class="nameColumn">Cooling Units</td><td class="green-text acceptable_tag statusColumn">Aceptable</td><td class="actionColumn">N/A</td><td class="commentColumn"></td></tr></tbody></table>
';

    // Print text using writeHTMLCell()
    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

    // ---------------------------------------------------------

    // Close and output PDF document
    $pdf->Output('report.pdf', 'I');
?>