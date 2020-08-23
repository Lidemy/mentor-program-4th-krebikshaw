<?php
  session_start();
  require_once('./../DB_conn.php');
  require_once('./../utils_general.php');

  $id = $_GET['id'];
  $username = $_SESSION['username'];
  $cp = new CheckPermission($username, 'update', $id);
  if (!$cp->hasPermission()) {
    header("Location: index.php");
    exit;
  }

  $sql = 'update krebikshaw_comments set is_deleted=?, deleted_at=now() where id=?';
  $db->sqlQuery($sql, 'si', '1', $id);

  header("Location: ./../index.php");
?>