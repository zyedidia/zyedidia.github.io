<!-- index.php -->
<!DOCTYPE html>
<html>
    <head>
        <title>Literate</title>

        <!-- Include the head php. This brings in jquery, bootstrap, and some custom CSS -->
        <?php include 'includes/head.php';?>
        <?php include 'includes/google_analytics.php';?>
    </head>

    <body>
        <div class="container">
            <!-- This adds the top navigation bar -->
            <?php include 'includes/navigation.php';?>

            <!-- Jumbotron -->
            <div class="jumbotron">
                <h1>Literate</h1>
                <p style="text-align: center;">A Flexible Literate Programming System</p>
            </div>

            <!-- What is Literate Programming -->
            <p>View the literate <a href="literate-source">source code</a> for Literate!
            <p>View the literate <a href="website-source">source code</a> for this website!
            <p>See the <a href="http://github.com/zyedidia/Literate">Github page</a>.</p>
            
            <h2>What is Literate Programming?</h2>
            <p>Literate programming is a style of programming invented by Donald Knuth, where the main idea is
            that a program's source code is made primarily to be read and understood by other people, and
            secondarily to be executed by the computer.</p>
            
            <p>This frees the programmer from the structure of a program imposed by the computer and means that
            the programmer can develop programs in the order of the flow of their thoughts.</p>
            
            <p>A Literate program consists of explanation of the code in a natural language such as English, interspersed
            with snippets of code to be executed. This means that Literate programs are very easy to understand and share,
            as all the code is well explained.</p>
            
            <p>Literate, a tool for literate programming, will allow you to take a literate source file (<code>*.lit</code>) and
            either <em>tangle</em> the source file which will create a file with executable code, or <em>weave</em> the
            source file, which will generate an HTML document to be read as formatted documentation.</p>

            <!-- What are the features of lit -->
            <h2>Features of this tool</h2>
            Literate works with any programming language, generates HTML as output (<a href="http://wkhtmltopdf.org">which can be converted to pdf</a>),
            and generates readable code. The code that is generated is indented properly and is automatically commented using the titles you have written
            for the code blocks.<br><br>
            Here is the full list of features:<br>
            <ul>
                <li>Supports any language including syntax highlighting and pretty printing in HTML</li>
                <li>Generates HTML as output</li>
                <li>Generates readable code and commented in the target language</li>
                <li>Reports syntax errors back from the compiler to the right line in the literate source</li>
                <li>Runs fast -- wc.lit compiled for me in 7ms for both code and html output</li>
                <li>Markdown based -- very easy to read and write Literate source.</li>
                <li>Automatically generates hyperlinks between code sections</li>
                <li>Formatted output similar to CWEB</li>
                <li>Creates an index with identifiers used (you need to have exuberant or universal ctags installed to use this feature)</li>
                <li>Supports TeX equations with <code>$</code> notation</li>
                <li>Compatible with Vim (<a href="https://github.com/zyedidia/literate.vim" target="_blank">literate.vim</a>)</li>
                <li>Highly customizable</li>
            </ul>
            
            You can get started by taking a look at the <a href="manual.php">manual</a>.
            In addition, this website is made with Literate, and the source can be read
            <a href="precompiled">here</a>.

        </div>
    </body>
</html>

