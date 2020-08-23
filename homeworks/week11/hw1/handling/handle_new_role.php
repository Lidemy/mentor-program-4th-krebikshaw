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

  $role_name = $_POST['role_name'];
  $create_comment = !empty($_POST['create_comment']) ? '1' : NULL ;  
  $update_oneself = !empty($_POST['update_oneself']) ? '1' : NULL ;
  $delete_oneself = !empty($_POST['delete_oneself']) ? '1' : NULL ;
  $update_all = !empty($_POST['update_all']) ? '1' : NULL ;
  $delete_all = !empty($_POST['delete_all']) ? '1' : NULL ;
  $is_admin = !empty($_POST['is_admin']) ? '1' : NULL ;

  $sql = 'insert into krebikshaw_roles( ' .
  'name, ' .
  'create_comment, ' .
  'update_oneself, ' .
  'delete_oneself, ' .
  'update_all, ' .
  'delete_all, ' .
  'is_admin ) ' .
  'values(?, ?, ?, ?, ?, ?, ?)';
  $db->sqlQuery($sql, 'sssssss', $role_name, $create_comment, $update_oneself, $delete_oneself, $update_all, $delete_all, $is_admin );

  header("Location: ./../role_manage.php");
?>