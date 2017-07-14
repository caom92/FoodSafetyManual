<?php

$docControl = [
  'tables' => [
    'gmp\docControl\docControl\Documents' =>
      realpath(dirname(__FILE__).'/Documents.php'),
    'gmp\docControl\docControl\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
  ],
  'services' => [
    'upload-manual-gmp-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/upload-manual-gmp-doc-control-doc-control.php'),
    'log-gmp-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/log-gmp-doc-control-doc-control.php'),
    'capture-gmp-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/capture-gmp-doc-control-doc-control.php'),
    'report-gmp-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/report-gmp-doc-control-doc-control.php'),
    'inventory-gmp-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/inventory-gmp-doc-control-doc-control.php'),
    'add-gmp-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/add-gmp-doc-control-doc-control.php'),
    'toggle-gmp-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/toggle-gmp-doc-control-doc-control.php'),
    'update-gmp-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/update-gmp-doc-control-doc-control.php'),
    'report-gmp-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/authorization-report-gmp-doc-control-doc-control.php'),
  ]
];

?>