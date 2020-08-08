<?php
  $msg = '';

  if (!empty($_GET['errCode'])) {
    $code = $_GET['errCode'];
    if ($code === '1') $msg = '帳號或密碼錯誤';
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
          <li><a href="index.php">首頁</a></li>
          <li><a href="register.php">註冊</a></li>
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
              <p>Front End Engineer</p>
            </header>

            <hr/>
            <h2>登入會員</h2>

            <!-- form -->
            <?php echo '<p class="strong">' . $msg . '</p>'; ?>
            <form class="form__login" method="post" action="handle_login.php">
              <input type="text" name="username" placeholder="帳號" />
              <input type="password" name="password" placeholder="密碼" />
              <input type="submit" value="送出" />
            </form>
            
            <hr>
          </div>
        </section>
      </div>
  </body>
</html>

