<?php
  require_once('DB_conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (
    empty($_POST['id'])
  ) {
    header('HTTP/1.1 400 error: bad request');
    sendResponseMsg('fail', '失敗，你的參數勒～～～～');
    die();
  }

  $id = $_POST['id'];

  $sql_select = 'SELECT * FROM krebikshaw_todo WHERE id = ?';
  $db->sqlQuery($sql_select, 'i', $id);
  $data = $db->getResult();

  if (!$data) {
    sendResponseMsg('fail', '載入失敗，您帶入的參數不對喔～～');
    die();
  }

  $result = array(
    'content' => $data['content'],
    'all' => $data['count_all'],
    'active' => $data['count_active'],
    'completed' => $data['count_completed']
  );
  sendResponseMsg('success', '載入成功', $result);

  function sendResponseMsg($status, $resMsg, $result = ''){
    $response = json_encode(array(
      'status' => $status,
      'message' => $resMsg,
      'result' => $result
    ), JSON_UNESCAPED_UNICODE);
    echo $response;
  }
?>