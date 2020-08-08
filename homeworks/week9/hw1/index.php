<?php
  session_start();
  require_once('conn.php');
  $msg = '';
  $username = NULL;
  $nickname = NULL;

  if (!empty($_GET['errCode'])) {
    $code = $_GET['errCode'];
    if ($code === '1') {
      $msg = '* 請輸入內容';
    }
  }

  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $nickname = $db->getNickname($username);
  }

  $sql = 'SELECT * FROM krebikshaw_comments ORDER BY created_at DESC';
  $db->sqlQuery($sql);
  if (!$db->result) {
    die($db->conn->error);
  }

?>

<!DOCTYPE HTML>
<html>
  <head>
    <title>week9-hw1|by krebikshaw</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
      <nav class="navbar">
        <ul class="nav__list">
          <?php if($username) { ?>
            <li><a href="handle_logout.php">登出</a></li>
          <?php } else { ?>
            <li><a href="register.php">註冊</a></li>
            <li><a href="login.php">登入</a></li>
          <?php } ?>  
        </ul>
      </nav>
    <!-- Wrapper -->
      <div id="wrapper">

        <!-- Main -->
        <section id="main">
          <div class="main__inner">
            <header>
              <span class="user__avatar"><img src="images/avatar.jpg" alt="" /></span>
              <h1>Welcome</h1>
              <p><?php echo $nickname?$nickname:'Front End Engineer'; ?></p>
            </header>

            <hr />
            <h2>comments</h2>

            <!-- Texarea -->
            <?php if($username) { ?>
            <form method="post" action="handle_add_comment.php">
              <textarea name="comment" rows="5" <?php echo 'placeholder=" '. $msg . '"' ?>></textarea>
              <input type="submit" value="送出" />
            </form>
            <?php } else { ?>
              <form style="display: block;">
                <textarea rows="5" style="width: 90%; margin:0 auto;"></textarea>
                <div><p>請登入發佈留言</p></div>
              </form>
            <?php } ?>
            <hr>

            <!-- cards -->
            <div class="cards">
              <?php
                while ($row = $db->result->fetch_assoc()) {
              ?>
              <div class="card">
                <div class="avatar">
                </div>
                <div>
                  <div class="author">
                    <span><?php echo $row['nickname']; ?></span>
                    <span><?php echo $row['created_at']; ?></span>
                  </div>
                  <p><?php echo $row['comment']; ?></p>
                </div>
              </div>
              <?php } ?>
            </div>
            <ul class="actions">
              <li><a href="#" class="button">Top</a></li>
            </ul>
            <hr>
          </div>
        </section>
      </div>
  </body>
</html>
