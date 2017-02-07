<?php

require_once realpath(dirname(__FILE__)."/../../../external/tcpdf/tcpdf.php");
require_once realpath(dirname(__FILE__).'/htmlManager.php');

use fsm\report\html as html;


class PDFReport extends tcpdf
{
    // Sets the metadata for the generated PDF file
    function initialize() {
        $this->SetCreator(PDF_CREATOR);
        $this->SetAuthor("Jacobs Farm, Del Cabo");
        $this->SetTitle("PDF Report");
        $this->SetSubject("PDF Report");
        $this->SetKeywords("Jacobs, Farm, Del, Cabo, Report, PDF");

        $this->companyInfo = new stdClass();
        $this->companyInfo->{"logo"} = realpath(dirname(__FILE__).
            "/../../../data/images/logo.png");
        $this->companyInfo->{"companyName"} = "Jacobs Farm, Del Cabo";
        $this->companyInfo->{"companyAddress"} = 
            "P.O. Box 508 Pescadero, CA. 94060";

        $this->styles = [
            'gmp-packing-preop' => '<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%;}td { border: 1px solid #000000; text-align: left;}th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50;}.even { background-color: #b8e0b9;}.verticaltext{ writing-mode:tb-rl; transform: rotate(90deg); white-space:nowrap; word-break:break-word; bottom:0;}.typeTitle{ background-color: yellow; width:501px;}.fullColumn{ background-color: #D3D3D3;width:501px;}.nameColumn{ width:116px;}.numberColumn{ width:30px;}.timeColumn{ width:40px;}.statusColumn{ width:85px;}.actionColumn{ width:70px;}.commentColumn{ width:200px;}</style>'
        ];
    }


    
}

?>