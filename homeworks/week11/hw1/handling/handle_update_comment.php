<?php
  session_start();
  require_once('./../DB_conn.php');
  require_once('./../utils_general.php');

  $id = $_POST['id'];
  $username = $_SESSION['username'];
  $cp = new CheckPermission($username, 'update', $id);
  if (!$cp->hasPermission()) {
    header("Location: index.php");
    exit;
  }

  if (empty($_POST['comment'])) {
    header("Location: ./../update_comment.php?id=". $id . "&errCode=1");
    exit;
  }
  
  $comment = $_POST['comment'];
  $sql = 'update krebikshaw_comments set comment=?, updated_at=now() where id=?';
  $db->sqlQuery($sql, 'si', $comment, $id);

  header("Location: ./../index.php");
?>