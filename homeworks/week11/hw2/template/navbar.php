
<nav class="navbar">
  <div class="nav__left">
    <a href="index.php"><h2>Who's Blog</h2></a>
  </div>
  <div class="nav__right">
    <ul class="nav__list">
      <?php if ($username && isAdmin($username)) { ?>
        <li><a href="backstage.php">後台管理</a></li>
        <li><a href="./handling/handle_logout.php">登出</a></li>
      <? } else { ?>
        <li><a href="login.php">登入</a></li>
      <? } ?>
    </ul>
  </div>
</nav>