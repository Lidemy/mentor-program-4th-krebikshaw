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
    empty($_POST['content']) ||
    empty($_POST['post_id'])
  ) {
    header("Location: ./../update_post.php?id=". $_POST['post_id'] ."&errCode=1");
    exit;
  }

  $post_id = $_POST['post_id'];
  $title = $_POST['title'];
  $category = $_POST['category'];
  $content = $_POST['content'];
  $page = $_POST['page'];

  $sql = 'update krebikshaw_post set title=?, category_id=?, content=?, updated_at=now() where id=?';
  $db->sqlQuery($sql, 'sssi', $title, $category, $content, $post_id);
  header("Location: ". $page);

?>