<?php

require_once realpath(dirname(__FILE__)."/PDFCreator.php")

// get the language that is going to be used to print the PDF file
$lang = (isset($_POST['lang']) && array_key_exists('lang', $_POST)) ?
    ((isString($_POST['lang'])) ? $_POST['lang'] : 'en') 
    : 'en';

// create new PDF document
$pdf = new PDFCreator(
    $lang, 
    $_POST['logo'], 
    $_POST['company'], 
    $_POST['address'],
    $_POST['footer'],
    $_POST['signature'],
    $_POST['supervisor']
);

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
        // add a new page 
        $pdf->AddPage();

        // check if the header and the footer are set
        $header = (isset($report->header)) ? $report->header.'<br><br>' : '';
        $footer = (isset($report->footer)) ? '<br><br>'.$report->footer : '';

        // prepare the HTML to display in the body
        $html = $style.$header.$report->body.$footer;

        // print the result to the document
        $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
    }
    $pdf->closing($_POST['supervisor']);
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