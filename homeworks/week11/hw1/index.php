<?php
  session_start();
  require_once('./utils_general.php');

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUser($username);
  }

?>


<!DOCTYPE HTML>
<html>
  <head>
    <title>week11-hw1|by krebikshaw</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
    <?php include './template/navbar.php'; ?>
    <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
        <section id="main">
          <div class="main__inner">
            <header>
              <span class="user__avatar"><img src="images/avatar.jpg" alt="" /></span>
              <h1>Welcome</h1>
              <p><?php echo $username ? $user['nickname'] : 'Front End Engineer'; ?></p>
            </header>

            <hr />
            <h2>comments</h2>

            <!-- Texarea -->
            <?php include './template/form.php'; ?>
            <hr>

            <!-- cards -->
            <?php include './template/comments.php'; ?>
            <?php include './template/page.php'; ?>
            <hr>
          </div>
        </section>
      </div>
  </body>
</html>

