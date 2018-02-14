<?php

$programs = [
  'tables' => [
    'Modules' => 
      realpath(dirname(__FILE__).'/Modules.php'),
    'Programs' => 
      realpath(dirname(__FILE__).'/Programs.php')
  ],
  'services' => [
    'get-modules-of-program' =>
      realpath(dirname(__FILE__).'/get-modules-of-program.php'),
    'list-programs' =>
      realpath(dirname(__FILE__).'/list-programs.php')
  ]
];

?>