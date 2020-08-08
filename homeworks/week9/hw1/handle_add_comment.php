<?php
  session_start();
  require_once('conn.php');

  if (empty($_POST['comment'])) {
    header("Location: index.php?errCode=1");
    die();
  }

  $username = $_SESSION['username'];
  $nickname = $db->getNickname($username);

  $sql = sprintf("insert into krebikshaw_comments(nickname, comment) values('%s', '%s')",
    $nickname,
    $_POST['comment']
  );

  $db->sqlQuery($sql);
  if (!$db->result) {
    die($db->conn->error);
  }

  header("Location: index.php");

?>