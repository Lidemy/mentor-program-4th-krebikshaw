<?php
  session_start();
  require_once('./../DB_conn.php');

  if (empty($_POST['username']) || empty($_POST['password'])) {
    header("Location: ./../login.php?errCode=1");
    exit;
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = 'select * from krebikshaw_users where username=?';
  $db->sqlQuery($sql, 's', $username);
  $result = $db->getResult();

  if (password_verify($password, $result['password'])) {
    // 登入成功
    $_SESSION['username'] = $username;
    header("Location: ./../index.php");
  } else {
    header("Location: ./../login.php?errCode=1");
  }

?>