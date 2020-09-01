<?php
  session_start();
  require_once('./../DB_conn.php');
  require_once('./../utils_general.php');

  $username = $_SESSION['username'];
  if (!isAdmin($username)) {
    header("Location: ./../index.php");
    exit;
  }

  if (
    empty($_POST['name']) ||
    empty($_POST['text']) ||
    empty($_POST['id'])
  ) {
    header("Location: ./../category_manage.php");
    exit;
  }

  $name = $_POST['name'];
  $text = $_POST['text'];
  $id = $_POST['id'];

  $sql = 'update krebikshaw_category set name=?, text=?, updated_at=now() where id=?';
  $db->sqlQuery($sql, 'ssi', $name, $text, $id);
  header("Location: ./../category_manage.php");

?>