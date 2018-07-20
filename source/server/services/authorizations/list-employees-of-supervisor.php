<?php

$service = [
  'requirements_desc' => [
    'logged_in' => ['Administrator'],
    'supervisor_id' => [
      'type' => 'int',
      'min' => 1
    ]
  ],
  'callback' => function($scope, $request) {
    // obtenemos la lista de empleados
    $rows = $scope->daoFactory->get('SupervisorsEmployees')
      ->selectEmployeesBySupervisorID($request['supervisor_id']);
    
    // preparamos el almacenamiento temporal que sera enviado al cliente
    $employees = [];

    // visitamos cada renglon obtenido de la tabla y preparamos los datos
    foreach ($rows as $row) {
      array_push($employees, [
        'id' => $row['id'],
        'employee_num' => $row['employee_num'],
        'full_name' => "{$row['first_name']} {$row['last_name']}",
        'is_active' => $row['is_active']
      ]);
    }

    // enviamos los datos finales al cliente
    return $employees;
  }
];

?>