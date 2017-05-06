<?php

$programs = [
  'tables' => [
    'Modules' => 
      realpath(dirname(__FILE__).'/services/programs/Modules.php'),
    'Programs' => 
      realpath(dirname(__FILE__).'/services/programs/Programs.php')
  ],
  'services' => [
    'get-modules-of-program' =>
      realpath(dirname(__FILE__).'/services/programs/get-modules-of-program.php'),
    'list-programs' =>
      realpath(dirname(__FILE__).'/services/programs/list-programs.php')
  ]
];

?>