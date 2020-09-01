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
    empty($_POST['title']) ||
    empty($_POST['content'])
  ) {
    header("Location: ./../add_post.php?errCode=1");
    exit;
  }

  $user_id = getUser($username)['id'];
  $title = $_POST['title'];
  $category = $_POST['category'];
  $content = $_POST['content'];

  $sql = 'insert into krebikshaw_post(user_id, category_id, title, content)' .
    'values(?, ?, ?, ?)';
  $db->sqlQuery($sql, 'iiss', $user_id, $category, $title, $content);
  header("Location: ./../index.php");
  
?>