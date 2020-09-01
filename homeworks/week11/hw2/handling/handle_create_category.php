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
    empty($_POST['text'])
  ) {
    header("Location: ./../category_manage.php");
    exit;
  }

  $name = $_POST['name'];
  $text = $_POST['text'];

  $sql = 'insert into krebikshaw_category(name, text) values(?, ?)';
  $db->sqlQuery($sql, 'ss', $name, $text);
  header("Location: ./../category_manage.php");

?>