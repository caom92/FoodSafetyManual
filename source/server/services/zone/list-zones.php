<?php

$service = [
  'requirements_desc' => [],
  'callback' => function($scope, $request) {
    // obtenemos la lista de zonas
    $rows = $scope->daoFactory->get('Zones')->selectAll();

    // preparamos almacenamiento temporal
    $zones = [];

    // visitamos renglon por renglon
    foreach ($rows as $row) {
      // guardamos uno por uno en el almacenamiento temporal
      array_push($zones, [
        'id' => $row['id'],
        'name' => $row['name'],
        'company_name' => $row['company_name'],
        'address' => $row['address'],
        'logo_path' => (strlen($row['logo_path']) > 0) ?
          $row['logo_path'] : 'default.png'
      ]);
    }

    // retornamos las zonas recuperadas
    return $zones;
  }
];

?>