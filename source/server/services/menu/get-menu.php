<?php

require_once realpath(__DIR__.'/../../categories.php');
use Core\Utilities as util; 


$service = [
  'requirements_desc' => [
    'logged_in' => 'any'
  ],
  'callback' => function($scope, $request) {
    $segment = $scope->session->getSegment('fsm');
    $userId = $segment->get('user_id');
    $rows = $scope->daoFactory->get('MenuItems')->selectByUserId($userId);

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
        'type' => (boolval($row['is_directory'])) ? 'directory' : 'link',
        'name' => $row['name'],
        'icon' => $row['icon'],
        'image' => $row['image'],
        'url' => $row['url'],
        'children' => []
      ];

      if (isset($rowValues['parent_id'])) {
        $addChild($items, $rowValues);
      } else {
        array_push($items, $rowValues);
      }
    }

    return $items;
  }
];

?>