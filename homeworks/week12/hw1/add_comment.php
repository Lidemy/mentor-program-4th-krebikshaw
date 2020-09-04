<?php
  require_once('DB_conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  
  if (
    empty($_POST['nickname']) ||
    empty($_POST['content']) ||
    empty($_POST['siteKey'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing fields"
    );
    $response = json_encode($json);
    echo $response;
    die();
  } 

  $siteKey = $_POST['siteKey'];
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];

  $sql = "insert into krebikshaw_discussion(site_key, nickname, content) values(?, ?, ?)";
  $db->sqlQuery($sql, "sss", $siteKey, $nickname, $content);

  $json = array(
    "ok" => true,
    "message" => "success"
  );

  $response = json_encode($json);
  echo $response;

?>