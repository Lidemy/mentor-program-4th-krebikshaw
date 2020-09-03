<?php
  require_once('DB_conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (
    empty($_GET['siteKey'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please input siteKey in url"
    );
    $response = json_encode($json);
    echo $response;
    die();
  } 

  $siteKey = $_GET['siteKey'];

  if (empty($_GET['before'])) {
    $sql = "select id, nickname, content, created_at from krebikshaw_discussion where site_key=? order by id desc limit 5";
    $db->sqlQuery($sql, "s", $siteKey);
  } else {
    $sql = "select id, nickname, content, created_at from krebikshaw_discussion where site_key=? and id < ? order by id desc limit 5";
    $db->sqlQuery($sql, "si", $siteKey, $_GET['before']);
  }
  

  $discussion = array();
  while ($row = $db->getResult()) {
    array_push($discussion, array(
      "id" => $row['id'],
      "nickname" => $row['nickname'],
      "content" => $row['content'],
      "created_at" => $row['created_at']
    ));
  }

  $json = array(
    "ok" => true,
    "discussion" => $discussion,
  );

  $response = json_encode($json);
  echo $response;

?>