<?php
  require_once('DB_conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (
    empty($_POST['content']) ||
    empty($_POST['all']) ||
    empty($_POST['active'])
  ) {
    header('HTTP/1.1 400 error: bad request');
    sendResponseMsg('fail', '新增失敗，參數不足');
    die();
  }

  $content = $_POST['content'];
  $all = $_POST['all'];
  $active = $_POST['active'];
  $completed = $_POST['completed'];

  $sql_insert = 'INSERT INTO krebikshaw_todo(content, count_all, count_active, count_completed) VALUES(?, ?, ?, ?)';
  $db->sqlQuery($sql_insert, 'siii', $content, $all, $active, $completed);


  $sql_select = 'SELECT id FROM krebikshaw_todo ORDER BY id DESC LIMIT ?';
  $db->sqlQuery($sql_select, 'i', 1);
  $save_id = $db->getResult()['id'];

  sendResponseMsg('success', '儲存成功', $save_id);


  function sendResponseMsg($status, $resMsg, $save_id = ''){
    $response = json_encode(array(
      'status' => $status,
      'message' => $resMsg,
      'save_id' => $save_id
    ), JSON_UNESCAPED_UNICODE);
    echo $response;
  }
?>