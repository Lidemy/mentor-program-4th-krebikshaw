
<nav class="navbar">
  <ul class="nav__list">
    <?php if ($username) { ?>
    	<?php
    		$cp = new CheckPermission($username, NULL, NULL);
    		if ($cp->isAdmin()) {
    	?>
				<li style="width: 100px;"><a href="backstage.php">後台管理</a></li>
      	<?php } ?>
      <li><a href="update_user.php">會員</a></li>
      <li><a href="handling/handle_logout.php">登出</a></li>
    <?php } else { ?>
      <li><a href="register.php">註冊</a></li>
      <li><a href="login.php">登入</a></li> 
    <? } ?>
  </ul>
</nav>
