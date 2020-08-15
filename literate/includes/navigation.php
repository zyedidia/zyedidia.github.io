<?php
$name = basename($_SERVER['SCRIPT_FILENAME']);
$a = " class=\"active\"";
?>
<div class="row">
    <div class="col-md-12">
        <nav class="navbar navbar-default navbar-static-top">
        <div class="container-fluid">
            <button class="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div class="collapse navbar-collapse navHeaderCollapse">
                <ul class="nav navbar-nav">
                    <?php echo '<li' . ($name == "index.php" ? $a : "") . '><a href="index.php">Home</a></li>';?>
                    <?php echo '<li' . ($name == "manual.php" ? $a : "") . '><a href="manual.php">Manual</a></li>';?>
                    <?php echo '<li' . ($name == "download.php" ? $a : "") . '><a href="download.php">Download</a></li>';?>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                <!-- Star button -->
                <li><iframe src="https://ghbtns.com/github-btn.html?user=zyedidia&amp;repo=Literate&amp;type=star&amp;count=false&amp;size=small"></iframe></li>
                <!-- Fork button -->
                <li><iframe src="https://ghbtns.com/github-btn.html?user=zyedidia&amp;repo=Literate&amp;type=fork&amp;count=false&amp;size=small"></iframe></li>
                </ul>
            </div>
        </div>
        </nav>
    </div>
</div>

