<?php

// Resets the session ID for the current session
function resetSessionID($session, $segment)
{
  $userID = $segment->get('user_id');
  $segment->set('user_id', NULL);
  $session->regenerateId();
  $segment->set('user_id', $userID);
}

?>