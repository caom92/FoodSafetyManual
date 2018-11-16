<?php

require_once realpath(__DIR__.'/add-menu-item.php');

$arrayElementExists = function($array, $key) {
  return isset($array[$key]) && array_key_exists($key, $array);
};

$service = [
  'requirements_desc' => $requirementsDesc + [
    'url' => [
      'type' => 'string',
      'max_length' => 65535
    ]
  ],
  'callback' => $getAddMenuItemCallback('links', 
    function($request, $segment, $image, $scope) use ($arrayElementExists) {
    if ($arrayElementExists($request, 'parent_id')) {
      $parentId = (strlen($request['parent_id']) > 0) ?
        $request['parent_id'] : NULL;
    } else {
      $parentId = NULL;
    }

    // The local address for the server
    $localDomain = 'fsm.jfdc.us';
    $link = $request['url'];
    // By parsing a url, we break it in order to analyze it and store it properly in the DB
    $parsedUrl = parse_url($link);
    // If we don't have a scheme, we add the default and reparse our URL
    if(empty($parsedUrl['scheme'])) {
      $link = "http://".$link;
      $parsedUrl = parse_url($link);
    }
    if($parsedUrl === false) {
      // at this point, we could have received a invalid, unfixable URL, so we throw an error
    } else {
      $isSameDomain = strpos($parsedUrl['host'], $localDomain);
      if($isSameDomain !== false){
        // When we are inside the same domain, we only keep the url from the path onwards
        $link = (!empty($parsedUrl['path']) ? $parsedUrl['path'] : '') . (!empty($parsedUrl['query']) ? '?' . $parsedUrl['query'] : '') . (!empty($parsedUrl['fragment']) ? '#' . $parsedUrl['fragment'] : '');
        // If final is empty, we consider this as the root of our url
        if($link === '') {
          $link = '/';
        }
      }
    }

    return [
      'user_id' => $segment->get('user_id'),
      'parent_id' => $parentId,
      'type_id' => 2,
      'name' => $request['name'],
      'icon' => (isset($request['icon'])) ?
        $request['icon'] : NULL,
      'image' => $image,
      'url' => $link//$request['url']
    ];
  })
];

?>