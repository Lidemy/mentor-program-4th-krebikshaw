<?php
	$totalComment = getTotalPage()['count'];
	$totalPage = ceil($totalComment / $limit);
?>

<div class="pages">
	<?php if ($page && $page != 1) { ?>
		<a href="index.php"><img src="./images/first.svg"></a>
		<a href="index.php?page=<?echo $page - 1?>"><img src="./images/previous.svg"></a>
	<?php } else { ?>
		<a href="#"><img src="./images/first.svg"></a>
		<a href="#"><img src="./images/previous.svg"></a>
	<? } ?>
	<p>頁碼： <?php echo $page ?> / <?php echo $totalPage ?></p>
	<?php if ($page && $page != $totalPage) { ?>
		<a href="index.php?page=<?echo $page + 1?>"><img src="./images/next.svg"></a>
		<a href="index.php?page=<?echo $totalPage?>"><img src="./images/last.svg"></a>
	<?php } else { ?>
		<a href="#"><img src="./images/next.svg"></a>
		<a href="#"><img src="./images/last.svg"></a>
	<? } ?>
</div>


<ul class="actions">
  <li><a href="#" class="button">Top</a></li>
</ul>
