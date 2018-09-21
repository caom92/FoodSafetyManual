<?php

$service = [
  'requirements_desc' => [
    'logged_in' => 'any'
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $userId = $segment->get('user_id');
    $zoneId = $segment->get('zone_id');
    $rows = $scope->daoFactory->get('MenuItems')->selectByUserId($userId);
    $files = $scope->daoFactory->get('MenuFiles')->selectByZoneId($zoneId);

    $items = [];
    $addChild = function(&$array, $child) use (&$addChild) {
      foreach ($array as &$parent) {
        if ($parent['type'] === 'directory') {
          if (!$addChild($parent['children'], $child)) {
            if ($parent['id'] === $child['parent_id']) {
              array_push($parent['children'], $child);
              unset($parent);
              return TRUE;
            }
          } else {
            unset($parent);
            return TRUE;
          }
        } else {
          continue;
        }
      }
      unset($parent);
      return FALSE;
    };
    
    foreach ($rows as $row) {
      $rowValues = [
        'id' => $row['id'],
        'parent_id' => $row['parent_id'],
        'type' => $row['type'],
        'name' => $row['name'],
        'icon' => $row['icon'],
        'image' => $row['image'],
        'url' => $row['url'],
        'file_id' => $row['file_id'],
        'path' => $row['path'],
        'children' => []
      ];

      if (isset($rowValues['parent_id'])) {
        $addChild($items, $rowValues);
      } else {
        array_push($items, $rowValues);
      }
    }

    $ret['menu'] = $items;
    $ret['files'] = $files;

    return $ret;
  }
];

?>