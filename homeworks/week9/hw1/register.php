<?php
  $msg = '';

  if (!empty($_GET['errCode'])) {
    $code = $_GET['errCode'];
    if ($code === '1') $msg = '請將資料填寫完整';
    if ($code === '2') $msg = '帳號已被註冊';
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
          <li><a href="login.php">登入</a></li>
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

            <hr />
            <h2>註冊會員</h2>

            <!-- form -->
            <?php echo '<p class="strong">' . $msg . '</p>'; ?>
            <form class="form__regist" method="post" action="handle_register.php">
              <input type="text" name="nickname" placeholder="暱稱" />
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