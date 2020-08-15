<!-- manual.php -->
<!DOCTYPE html>
<html>
    <head>
        <title>Literate Manual</title>

        <!-- Include the standard jquery, bootstrap, and custom css -->
        <?php include 'includes/head.php';?>

        <!-- CSS styling for the navbar -->
        <style>
            ul.nav-tabs {
                font-size: 9pt;
                width: 130px;
                margin-top: 15px;
                border-radius: 4px;
                border: 1px solid #ddd;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);
            }
            ul.nav-tabs li {
                margin: 0;
                border-top: 1px solid #ddd;
            }
            ul.nav-tabs li:first-child {
                border-top: none;
            }
            ul.nav-tabs li a{
                margin: 0;
                padding: 2px 12px;
                border-radius: 0;
            }
            ul.nav-tabs li.active a, ul.nav-tabs li.active a:hover {
                color: #fff;
                background: #0088cc;
                border: 1px solid #0088cc;
            }
            ul.nav-tabs li:first-child a{
                border-radius: 4px 4px 0 0;
            }
            ul.nav-tabs li:last-child a{
                border-radius: 0 0 4px 4px;
            }
            ul.nav-tabs.affix{
                top: 30px; /* Set the top position of pinned element */
            }
        </style>


        <!-- Script to construct the navbar -->
        <script>
            function constructNavbar() {
                // Create the initial ul element
                html = '<ul class=\"nav navbar sidebar nav-tabs nav-stacked\" id=\"navbar\">\n'
                // Go through each h2
                $('h2').each(function(i, obj) {
                    // Add a new list item link to the id of the h2 element
                    html += "<li><a href=\"#" + $(obj).attr('id') + "\">" + $(obj).text() + "</a></li>\n"
                });
                // Close the list
                html += "</ul>"
                // Add the HTML
                $('#nav-container').html(html);
            }
        
            $(document).ready(function() {
                constructNavbar();
        
                // Call affix on the navbar so it will be pinned when the user scrolls 80 pixels down
                $("#navbar").affix({
                    offset: { 
                        top: 80 
                    }
                });
            });
        </script>

        <?php include 'includes/google_analytics.php';?>
    </head>

    <body data-spy="scroll" data-target="#nav-container">
        <div class="container">
            <!-- Include the top navigation bar -->
            <?php include 'includes/navigation.php';?>

            <div class="row">
                <div class="col-sm-10">
                    <!-- The manual itself -->
                    <?php include 'manual_explanation.php'?>

                </div>
            
                <div id="nav-container" class="col-sm-2 hidden-xs">
                    <!-- Empty for now, but javascript will generate the navbar -->
                </div>
            </div>
        </div>
    </body>
</html>

