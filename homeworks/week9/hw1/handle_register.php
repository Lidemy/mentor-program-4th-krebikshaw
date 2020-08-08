<?php
  session_start();
  require_once('conn.php');

  if (
    empty($_POST['nickname']) ||
    empty($_POST['username']) ||
    empty($_POST['password'])
  ) {
    header("Location: register.php?errCode=1");
    die();
  }

  $sql = sprintf("insert into krebikshaw_users(nickname, username, password) values('%s', '%s', '%s')",
    $_POST['nickname'],
    $_POST['username'],
    $_POST['password']
  );

  $db->sqlQuery($sql);
  if (!$db->result) {
    $code = $db->conn->errno;
    if ($code === 1062) {
      header("Location: register.php?errCode=2");
    }
    die($db->conn->error);
  }

  $_SESSION['username'] = $_POST['username'];
  header("Location: index.php");
?>