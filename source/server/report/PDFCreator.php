<?php

require_once realpath(dirname(__FILE__)."/../../../external/tcpdf/tcpdf.php");
require_once realpath(dirname(__FILE__).'/../data_validations.php');


// This class defines the necessary functions to create a PDF file
// report data in it from a log
class PDFCreator extends TCPDF
{
    // The translated texts to be used in the file
    private $texts;
    private $logo;
    private $company;
    private $address;


    // Create an instance of the PDF file creator
    // [in]     lang: a string that contains the code of the language that we 
    //          going to use to display the text
    function __construct($lang, $logo, $company, $address, $footer, $signature, $supervisor) {
        $this->logo = $logo;
        $this->company = $company;
        $this->address = $address;
        $this->footer = $footer;
        $this->signature = $signature;
        $this->supervisor = $supervisor;

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
        $logo = realpath(dirname(__FILE__)."/../../../data/logos/$this->logo");
        $companyName = $this->company;
        $companyAddress = $this->address;

        list($w, $h) = getimagesize($logo);

        if($w > ($h*2)){
            $width = 36;
            $height = 0;
            $padding_x = 0;
        } else {
            $height = 18;
            $width = 0;
            $padding_x = (integer)(((18 * $h) / $w) / 2);
        }

        // sets the logo and the company info in the PDF file
        $this->Image($logo, 5 + $padding_x, 5, $width, $height, '', '', 'M', false, 300, '', 
            false, false, 0, false, false, false);
        $this->ln(0);
        $this->SetFont('helvetica', 'B', 15);
        $this->SetX(5);
        $this->SetY(5);
        $this->Cell(0, 12, $companyName, 0, false, 'C', 0, '', 0, false, 
            'T', 'M');
        $this->ln(5);
        $this->SetFont('helvetica', 'B', 10);
        $this->Cell(0, 12, $companyAddress, 0, false, 'C', 0, '', 0, false, 
            'T', 'M');
        $this->ln(9);
    }

    public function closing(){
        //$this->SetY(-35);
        //$this->SetX(-60);

        $signature = realpath(dirname(__FILE__)."/../../../data/signatures/$this->signature");

        $this->Image($signature, $this->x + 120, $this->y, 50, 30, '', '', 'T', false, 300, '', 
            false, false, 0, false, false, false);

        $this->ln(30);
        $this->Line($this->x + 120,$this->y,$this->x + 170,$this->y);
        /*$this->Cell(
                50, 0,
                "Supervisor", 
                1, 1, 'C', 0, null, 0
            );*/
        $this->writeHTMLCell(
                50, 0, $this->x + 120, $this->y,
                "<div style='width:50px;'>Supervisor</div>", 
                0, 1, 0, true, 'C', false
            );
        $this->writeHTMLCell(
                50, 0, $this->x + 120, $this->y,
                "<div style='width:50px;'>" . $this->supervisor . "</div>", 
                0, 1, 0, true, 'C', false
            );
    }


    // Creates the page footer of the PDF file
    public function Footer() {
        // position at 15 mm from bottom
        $this->SetY(-15);

        // set font
        $this->SetFont('helvetica', 'I', 8);

        // If there is a footer, add it

        if(isset($this->footer)){
            $this->writeHTMLCell(
                0, 0, '', '',
                $this->footer, 
                0, 1, 0, true, 'C', true
            );
        }

        // set the page number
        $this->Cell(
            0, 10, 
            $this->texts["page"]." ".$this->getAliasNumPage()." ".
            $this->texts["of"]." ".$this->getAliasNbPages(), 
            0, false, 'C', 0, '', 0, false, 'T', 'M'
        );
        $this->Line(15,$this->y,197,$this->y);
    }
}