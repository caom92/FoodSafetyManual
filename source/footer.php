<?php 
// This file contains the necessary code to construct the footer of an HTML
// page which uses the Materialize library to display the interface. The idea 
// is that when writing a piece of PHP code that will display the resulting web 
// page, it should include this file AFTER displaying the results, so that the 
// programmer writing that code can only focus in the results that the webpage 
// will display and forget about linking the necessary files and building 
// aspects of the UI that should be shown in every page (like the navigation 
// menu, etc.). This file should be included alongside header.php 

require_once "paths.php" 
?>
        <!--Import jQuery before Materialize JS -->
        <script type="text/javascript" src="<?=\espresso\JQUERY?>"></script>
            
        <!-- Import Materialize JS -->
        <script type="text/javascript" 
            src="<?=\espresso\MATERIALIZE_JS?>"></script>
    </body>
</html>