<?php
  $post = getAllPost($limit, $offset);
?>

<div class="main__inner">
  <div class="heading">
    <div class="avatar"><img/></div>
    <div class="info">
      <h2><?php echo htmlspecialchars($post[sizeof($post)-1]['nickname'])?></h2>
      <hr>
      <ul class="heading__list">
        <li><a href="./category.php">分類文章</a></li>
        <li><a href="./list.php">全文列表</a></li>
        <?php if ($username && isAdmin($username)) { ?>
          <li><a class="add_post_btn" href="add_post.php">發表文章</a></li>
        <? } ?>
      </ul>
    </div>
  </div>
  <div class="content">
    <?php for ($i = 0; $i < sizeof($post); $i++) { ?>
      <div class="card">
        <div class="post__title">
          <a href="post.php?id=<?php echo htmlspecialchars($post[$i]['id']) ?>"><h2><?php echo htmlspecialchars($post[$i]['title']) ?></h2></a>
          <?php if ($username && isAdmin($username)) { ?>
            <div class="option__btn">
              <a href="update_post.php?id=<?php echo htmlspecialchars($post[$i]['id']) ?>">編輯</a>
              <a href="./handling/handle_delete_post.php?id=<?php echo htmlspecialchars($post[$i]['id']) ?>">刪除</a>
            </div>
          <?php } ?>
        </div>
        <hr> 
        <div class="post__content">
          <p><?php echo mb_substr($post[$i]['content'], 0, 200); ?></p>
        </div>
        <div>
          <ul class="post__info">
            <li><img/></li>
            <li><?php echo htmlspecialchars($post[$i]['nickname']) ?></li>
            <li><?php echo htmlspecialchars($post[$i]['updated_at']?$post[$i]['updated_at']:$post[$i]['created_at']) ?></li>
            <li class="read__more__btn"><a href="post.php?id=<?php echo htmlspecialchars($post[$i]['id']) ?>">Read more</a></li>
          </ul>
        </div>
      </div>
    <?php } ?>
  </div>
</div>

