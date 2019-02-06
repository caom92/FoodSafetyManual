<?php

$gapDocControl = [
  'tables' => [
    'gap\docControl\docControl\Documents' =>
      realpath(dirname(__FILE__).'/Documents.php'),
    'gap\docControl\docControl\Logs' =>
      realpath(dirname(__FILE__).'/Logs.php'),
  ],
  'services' => [
    'upload-manual-gap-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/upload-manual-gap-doc-control-doc-control.php'),
    'log-gap-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/log-gap-doc-control-doc-control.php'),
    'capture-gap-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/capture-gap-doc-control-doc-control.php'),
    'report-gap-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/report-gap-doc-control-doc-control.php'),
    'inventory-gap-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/inventory-gap-doc-control-doc-control.php'),
    'add-gap-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/add-gap-doc-control-doc-control.php'),
    'toggle-gap-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/toggle-gap-doc-control-doc-control.php'),
    'update-gap-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/update-gap-doc-control-doc-control.php'),
    'authorization-report-gap-doc-control-doc-control' =>
      realpath(dirname(__FILE__).'/authorization-report-gap-doc-control-doc-control.php'),
  ]
];

?>