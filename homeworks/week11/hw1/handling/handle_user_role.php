<?php
  session_start();
  require_once('./../DB_conn.php');
  require_once('./../utils_general.php');

  $username = $_SESSION['username'];
  $cp = new CheckPermission($username, NULL, NULL);
  if (!$cp->isAdmin()) {
    header("Location: index.php");
    exit;
  }

  $user_id = $_POST['id'];
  $role_id = $_POST['role'];

  $sql = 'update krebikshaw_users set role=?, updated_at=now() where id=?';
  $db->sqlQuery($sql, 'ii', $role_id, $user_id);

  header("Location: ./../backstage.php");
?>