<?php

require_once realpath(__DIR__.'/add-menu-item.php');

$service = [
  'requirements_desc' => $requirementsDesc + [
    'url' => [
      'type' => 'string',
      'max_length' => 65535
    ]
  ],
  'callback' => $getAddMenuItemCallback(function($request, $segment, $image) {
    if ($arrayElementExists($request, 'parent_id')) {
      $parentId = (strlen($request['parent_id']) > 0) ?
        $request['parent_id'] : NULL;
    }

    return [
      'user_id' => $segment->get('user_id'),
      'parent_id' => $parentId,
      'is_directory' => FALSE,
      'name' => $request['name'],
      'icon' => (isset($request['icon'])) ?
        $request['icon'] : NULL,
      'image' => $image,
      'url' => $request['url']
    ];
  })
];

?>