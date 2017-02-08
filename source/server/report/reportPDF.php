<?php

require_once realpath(dirname(__FILE__)."/../../../external/tcpdf/tcpdf.php");


// {
//     lang:string
//     style:string
//     content [
//         {
//             header:string
//             body:string
//             footer:string
//         }
//     ]
// }


// This class defines the necessary functions to create a PDF file
// report data in it from a log
class PDFCreator extends TCPDF
{
    // The translated texts to be used in the file
    private $texts;


    // Create an instance of the PDF file creator
    // [in]     lang: a string that contains the code of the language that we 
    //          going to use to display the text
    function __construct($lang) {
        // first, initialize a TCPDF instance
        parent::__construct(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, 
            true, 'UTF-8', false);

        // then, create the translated text depending on the language that is
        // going to be used
        switch ($lang) {
            case 'es':
                $this->texts = [
                    'page' => 'Página',
                    'of' => 'de'
                ];
            break;

            default:
                $this->texts = [
                    'page' => 'Page',
                    'of' => 'of'
                ];
            break;
        }

        // sets the metadata for the generated PDF file
        $this->SetCreator(PDF_CREATOR);
        $this->SetAuthor("Jacobs Farm, Del Cabo");
        $this->SetTitle("PDF Report");
        $this->SetSubject("PDF Report");
        $this->SetKeywords("Jacobs, Farm, Del, Cabo, Report, PDF");

        // set default monospaced font
        $this->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

        // set margins
        $this->SetMargins(PDF_MARGIN_LEFT, 26, PDF_MARGIN_RIGHT);
        $this->SetHeaderMargin(PDF_MARGIN_HEADER);
        $this->SetFooterMargin(PDF_MARGIN_FOOTER);

        // set auto page breaks
        $this->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

        // set image scale factor
        $this->setImageScale(PDF_IMAGE_SCALE_RATIO);

        // set default font subsetting mode
        $this->setFontSubsetting(true);

        // Set font
        // dejavusans is a UTF-8 Unicode font, if you only need to
        // print standard ASCII chars, you can use core fonts like
        // helvetica or times to reduce file size.
        $this->SetFont('helvetica', '', 10, '', true);
    }


    // Creates the page header of the PDF file
    public function Header() {
        // define the company info
        $logo = realpath(dirname(__FILE__)."/../../../data/images/logo.png");
        $companyName = "Jacobs Farm, Del Cabo";
        $companyAddress = "P.O. Box 508 Pescadero, CA. 94060";

        // sets the logo and the company info in the PDF file
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
    }


    // Creates the page footer of the PDF file
    public function Footer() {
        // position at 15 mm from bottom
        $this->SetY(-15);

        // set font
        $this->SetFont('helvetica', 'I', 8);

        // set the page number
        $this->Cell(
            0, 10, 
            $this->texts["page"]." ".$this->getAliasNumPage()." ".
            $this->texts["of"]." ".$this->getAliasNbPages(), 
            0, false, 'C', 0, '', 0, false, 'T', 'M'
        );
        $this->Line(15,$this->y,200,$this->y);
    }
}


// get the language that is going to be used to print the PDF file
$lang = (isset($_POST['lang']) && array_key_exists('lang', $_POST)) ?
    $_POST['lang'] : 'en';

// create new PDF document
$pdf = new PDFCreator($lang);

// initialize the storage for the HTML that will be displayed in the PDF file
$html = '';

// set the style of the content and the report data display in the page body
$style = (isset($_POST['style']) && array_key_exists('style', $_POST)) ?
    $_POST['style'] : '';

try {
    // check if the client sent the content to print to the PDF file
    $hasContent = 
        isset($_POST['content']) && array_key_exists('content', $_POST);

    // throw an exception if no content is available
    if (!$hasContent) {
        throw new Exception();
    }

    // parse the content sent from the client
    $reportData = json_decode($_POST['content']);

    // for every report to print...
    foreach ($reportData as $report) {
        // check that it has a page body
        $hasBody = isset($report->body) && strlen($report->body) > 0;

        // if not, throw an exception
        if (!$hasBody) {
            throw new Exception();
        }
    }

    // for each report to display in the document ...
    foreach ($reportData as $report) {
        // add a new page 
        $pdf->AddPage();

        // check if the header and the footer are set
        $header = (isset($report->header)) ? $report->header.'<br>' : '';
        $footer = (isset($report->footer)) ? '<br>'.$report->footer : '';

        // prepare the HTML to display in the body
        $html = $style.$header.$report->body.$footer;

        // print the result to the document
        $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
    }
} catch (Exception $e) {
    // if an exception was thrown, print an error PDF file
    $html = '<h1>:v</h1>';

    // add a new page 
    $pdf->AddPage();

    // print the result to the document
    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
} finally {
    // close and output PDF document
    $pdf->Output('report.pdf', 'I');
}

?>