<?php
  session_start();
  require_once('./../DB_conn.php');
  require_once('./../utils_general.php');

  $username = $_SESSION['username'];
  if (!isAdmin($username)) {
    header("Location: ./../index.php");
    exit;
  }

  if ( empty($_GET['id']) ) {
    header("Location: ./../index.php");
    exit;
  }

  $post_id = $_GET['id'];

  $sql = 'update krebikshaw_post set is_deleted=?, deleted_at=now() where id=?';
  $db->sqlQuery($sql, 'ii', 1, $post_id);
  header("Location: ". $_SERVER['HTTP_REFERER']);

?>