<?php
  session_start();
  require_once('./DB_conn.php');
  require_once('./utils_general.php');

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  
  $limit = 5;
  $offset = ($page - 1) * $limit;
  $totalPost = getTotalPage()['count'];
  $totalPage = ceil($totalPost / $limit);

?>

<!DOCTYPE HTML>
<html>
  <head>
    <title>week11-hw2|by krebikshaw</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <script src="https://cdn.ckeditor.com/ckeditor5/[version.number]/[distribution]/ckeditor.js"></script>
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
    <?php include './template/navbar.php'; ?>
    <!-- Wrapper -->
      <div class="wrapper">
        <!-- Main -->
        <section class="main">
          <?php include './template/content.php'; ?>
          <?php include './template/page.php'; ?>
        </section>
      </div>
      <footer>
        <p>Design by krebikshaw</p>
      </footer>
  </body>
</html>

