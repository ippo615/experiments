<!--
	Note this has NOT been tested and is just a staring point
	http://php.net/manual/en/features.file-upload.php
-->

<h1> <?php $_FILES['form_something_file']['name'] ?> </h1>
<p> <b>Mime Type:</b> <?php $_FILES['form_something_file']['type'] ?> </p>
<p> <b>Size:</b> <?php $_FILES['form_something_file']['size'] ?> </p>
<h2>Contents:</h2>
<pre><code>
<?php

	# The server stores the files in a temporary location:
	# $_FILES['form_something_file']['tmp_name']
	# You can read it and work with that data
	# Here, I'm just reading and outputting it's contents
	readfile( $_FILES['form_something_file']['tmp_name'] )
?>
</code></pre>
