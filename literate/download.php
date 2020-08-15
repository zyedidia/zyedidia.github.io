<!-- download.php -->
<!DOCTYPE html>
<html>
    <head>
        <title>Download Literate</title>

        <!-- Include the head to bring in jquery, bootstrap and custom CSS -->
        <?php include 'includes/head.php';?>

        <?php include 'includes/google_analytics.php'?>
    </head>

    <body>
        <div class="container">
            <!-- Include the top navigation bar -->
            <?php include 'includes/navigation.php';?>

<!-- Installation instructions -->
<h2>Installation</h2>
Installation is quite simple.<br/>

You can install Literate by downloading a binary if a binary is provided for your
system. Otherwise you can also build from source by downloading the source code
or cloning the github respository.
<hr>

<h3>Prebuilt binaries</h3>

<!-- Download table -->
<table>
<tr>
<th>Download</th>
</tr>
<tr>
<td><a href="./binaries/literate-osx.tar.gz" download>Mac OS X</a></td>
</tr>
<tr>
<td><a href="./binaries/literate-linux64.tar.gz" download>64 bit Linux</a></td>
</tr>
<tr>
<td><a href="./binaries/literate-linux32.tar.gz" download>32 bit Linux</a></td>
</tr>
<tr>
<td><a href="./binaries/literate-linux-arm.tar.gz" download>Arm Linux</a></td>
</tr>
<tr>
<td><a href="./binaries/literate.tar.gz" download>Source Code</a></td>
</tr>
</table>


<hr>

<h3>Building from source</h3>

<!-- Building from source -->
<h4>Mac</h4>

<p>On Mac you can use brew to build Literate from source:</p>
<pre>
$ brew tap zyedidia/literate
$ brew install --HEAD literate
</pre>
<p>For now, Literate is head only.</p>

<hr>

<p>Literate is made with the <a href="http://dlang.org">D programming language</a> so you must
install <a href="dlang.org/download.html">dmd</a> (D compiler) and <a href="https://code.dlang.org/download">dub</a> (D package manager).

Then you should download the source code or clone the repository and run the following commands:

<pre>
$ cd Literate
$ make
</pre>

You can find the binary in <code>path/to/Literate/bin</code> (you may want to add this
to your path).


            <!-- Installing the Vim plugin -->
            <h2>Vim Plugin</h2>
            In addition, there is also a vim plugin which adds syntax highlighting. You can get it <a href="https://github.com/zyedidia/literate.vim">here</a>.
            
            I recommend you install it with Pathogen or Vundle or whichever plugin manager you use.
            See the <a href="manual.php#vim-plugin">manual</a> for some extra tips on making Literate work even better with Vim.

        </div>
    </body>
</html>

