<?php
  session_start();
  require_once('./../DB_conn.php');
  require_once('./../utils_general.php');

  $username = $_SESSION['username'];
  $createPermission = new CheckPermission($username, 'create', NULL);
  if (!$createPermission->hasPermission()) {
    header("Location: ./../index.php");
    exit;
  }

  if (empty($_POST['comment'])) {
    header("Location: ./../index.php?errCode=1");
    exit;
  }
  
  $sql = 'select * from krebikshaw_users where username=?';
  $db->sqlQuery($sql, 's', $username);
  $user_id = $db->getResult()['id'];

  $comment = $_POST['comment'];
  $sql = 'insert into krebikshaw_comments(user_id, comment) values(?, ?)';
  $db->sqlQuery($sql, 'is', $user_id, $comment);

  header("Location: ./../index.php");
?>