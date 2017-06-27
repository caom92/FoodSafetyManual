<?php

$footers = [
  'tables' => [
    'ReportFooters' => realpath(dirname(__FILE__).'/ReportFooters.php')
  ],
  'services' => [
    'add-report-footer' => realpath(dirname(__FILE__).'/add-report-footer.php'),
    'edit-report-footer' => 
      realpath(dirname(__FILE__).'/edit-report-footers.php'),
    'list-report-footers' => 
      realpath(dirname(__FILE__).'/list-report-footers.php'),
    'get-report-footer' => realpath(dirname(__FILE__).'get-report-footer.php')
  ]
]

?>