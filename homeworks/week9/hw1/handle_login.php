<?php
  session_start();
  require_once('conn.php');

  if (
    empty($_POST['username']) ||
    empty($_POST['password'])
  ) {
    header("Location: login.php?errCode=1");
    die();
  }

  $sql = sprintf("select * from krebikshaw_users where username='%s' and password='%s'",
    $_POST['username'],
    $_POST['password']
  );

  $db->sqlQuery($sql);
  if (!$db->result) {
    die($db->conn->error);
  }

  if ($db->result->num_rows) {
    $_SESSION['username'] =  $_POST['username'];
    header("Location: index.php");
  } else {
    header("Location: login.php?errCode=1");
  }
  
?>