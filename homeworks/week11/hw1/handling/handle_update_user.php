<?php
  session_start();
  require_once('./../DB_conn.php');

  if (empty($_POST['nickname'])) {
    header("Location: ./../update_user.php?errCode=1");
    exit;
  }
  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];

  $sql = 'update krebikshaw_users set nickname=?, updated_at=now() where username=?';
  $db->sqlQuery($sql, 'ss', $nickname, $username);

  header("Location: ./../index.php");
?>