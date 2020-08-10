<?php
  session_start();
  require_once('conn.php');

  $nickname = trim($_POST['nickname']);
  $username = trim($_POST['username']);
  $password = trim($_POST['password']);

  if (
    empty($nickname) ||
    empty($username) ||
    empty($password)
  ) {
    header("Location: register.php?errCode=1");
    die();
  }

  $sql = sprintf("insert into krebikshaw_users(nickname, username, password) values('%s', '%s', '%s')",
    $nickname,
    $username,
    $password
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