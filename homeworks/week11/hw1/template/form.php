<?php
  $msg = '';

  if (!empty($_GET['errCode'])) {
    $code = $_GET['errCode'];
    if ($code === '1') {
      $msg = '請輸入內容';
    }
  }
  if ($username) {
    $createPermission = new CheckPermission($username, 'create', NULL);
  }
?>

<form method="post" action="handling/handle_add_comment.php">
  <?php if ($username) { ?>
    <?php if ($createPermission->hasPermission()) { ?>
    	<textarea name="comment" rows="5" placeholder="<?php echo $msg ?>"></textarea>
    	<input type="submit" value="送出" />
    <? } else { ?>
      <div style="width: 100%; display: flex; flex-direction: column; justify-content: center;">
        <textarea style="margin:0 auto; width: 350px;" name="comment" rows="5" placeholder="<?php echo $msg ?>"></textarea>
        <p>你已被停權</p>
      </div>
    <?php } ?>
  <? } else { ?>
    <div style="width: 100%; display: flex; flex-direction: column; justify-content: center;">
      <textarea style="margin:0 auto; width: 350px;" name="comment" rows="5" placeholder="<?php echo $msg ?>"></textarea>
      <p>請登入發佈留言</p>
    </div>
  <? } ?>
</form>