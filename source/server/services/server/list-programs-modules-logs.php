<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator']
  ],
  'callback' => function($scope, $request) {
    // first, connect to the data base and get the logs data
    $rows = $scope->daoFactory->get('Logs')->selectAll();

    // then create the final storage where the programs are going to be stored
    $programs = [];

    // and create temporal storage for the programs and modules
    $program = [
      'id' => 0,
      'name' => '',
      'modules' => []
    ];
    $modules = [
      'id' => 0,
      'name' => '',
      'logs' => []
    ];
    $module = [
      'id' => 0,
      'name' => '',
      'logs' => []
    ];

    // then visit each row obtained from the data base ...
    foreach ($rows as $row) {
      // check if the program has changed
      $hasProgramChanged = $row['program_id'] != $program['id'];
      if ($hasProgramChanged) {
        // if it has, check if the program info is empty
        if ($program['id'] != 0) {
          // if it's not, store the current program info in the program 
          // info and this last one is stored in the final array
          array_push($program['modules'], $module);
          array_push($programs, $program);
        }

        // then store the current row's info in new temporal holders
        $log = [
          'id' => $row['log_id'],
          'name' => $row['log_name']
        ];
        $module = [
          'id' => $row['module_id'],
          'name' => $row['module_name'],
          'logs' => [ $log ]
        ];
        $program = [
          'id' => $row['program_id'],
          'name' => $row['program_name'],
          'modules' => []
        ];
      } else {
        // if the program haven't changed, check if the module has changed
        $hasModuleChanged = $row['module_id'] != $module['id'];
        if ($hasModuleChanged) {
          // if it has, then store the current module info in the 
          // program storage
          array_push($program['modules'], $module);
          $log = [
            'id' => $row['log_id'],
            'name' => $row['log_name']
          ];
          $module = [
            'id' => $row['module_id'],
            'name' => $row['module_name'],
            'logs' => [ $log ]
          ];
        } else {
          // if nor the program nor the module have changed, 
          // simply add a new log to the module structure
          array_push($module['logs'], [
            'id' => $row['log_id'],
            'name' => $row['log_name']
          ]);
        }
      } // if ($hasProgramChanged)
    } // foreach ($rows as $row)

    // push the last entries of an array into the final array
    if ($module['id'] != 0) {
      array_push($program['modules'], $module);
    }

    if ($program['id'] != 0) {
      array_push($programs, $program);
    }

    return $programs;
  }
];

?>