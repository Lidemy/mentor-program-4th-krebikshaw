<?
  session_start();
  require_once('./utils_general.php');
  
  $username = $_SESSION['username'];
  $id = $_GET['id'];
  $cp = new CheckPermission($username, 'update', $id);
  if (!$cp->hasPermission()) {
    header("Location: index.php");
    exit;
  }

  $msg = '';
  if (!empty($_GET['errCode'])) {
    $code = $_GET['errCode'];
    if ($code === '1') $msg = '請將資料填寫完整';
  }

  $user = getUser($username); 
  $sql = 'select * from krebikshaw_comments where id=?';
  $db->sqlQuery($sql, 'i', $id);
  $comment = $db->getResult()['comment'];

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
      <nav class="navbar">
        <ul class="nav__list">
          <li><a href="index.php">首頁</a></li>
          <li><a href="./handling/handle_logout.php">登出</a></li>
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
              <p><?echo htmlspecialchars($user['nickname']); ?></p>
            </header>

            <hr />
            <h2>修改留言</h2>

            <!-- form -->
            <?php echo '<p class="strong">' . $msg . '</p>'; ?>
            <form class="form__regist" method="post" action="handling/handle_update_comment.php">
              <textarea style="margin:0 auto; width: 350px;" name="comment" rows="5" placeholder="<?php echo $msg ?>"><?php echo htmlspecialchars($comment); ?></textarea>
              <input type="hidden" name="id" value="<?php echo $id; ?>">
              <div class="two__btn">
                <input type="submit" value="送出" />
                <a href="index.php"><input type="button" value="取消" /></a>
              </div>
             
            </form>
            
            <hr>
          </div>
        </section>
      </div>
  </body>
</html>