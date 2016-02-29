<?php
/* This file contains the necessary code to construct the header of an HTML
page which uses the Materialize library to display the interface. The idea is 
that when writing a piece of PHP code that will display the resulting web page,
it should include this file BEFORE displaying the results, so that the 
programmer writing that code can only focus in the results that the webpage will display and forget about linking the necessary files and building aspects of the UI that should be shown in every page (like the navigation menu, etc.). This file should be included alongside footer.php */ 

require_once "paths.php"; 
?>

<!DOCTYPE html>
<html>
    <head>
        <!-- Import Google Icons -->
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet">
        
        <!-- Import Materialize CSS -->
        <link type="text/css" rel="stylesheet"
            href="<?=\espresso\MATERIALIZE?>css/materialize.min.css"
            media="screen, projection"/>
        
        <!-- Let the browser know the website is optimized for mobile -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        
        <!-- Import jQuery before Materialize JS -->
        <script type="text/javascript"
            src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        
        <!-- Import Materialize JS -->
        <script type="text/javascript"
            src="<?=\espresso\MATERIALIZE?>js/materialize.min.js"></script>
        
        <!-- Now let's write some data about the project -->
        <meta charset="UTF-8">
        <meta name="company" content="Jacobs Farm Del Cabo">
        <meta name="authors" content="Victor Miracle & Carlos Oliva">
        <meta name="version" content="0">
        <meta name="revision" content="0">
        <meta name="date" content="28-02-2016">
    </head>
    
    <body>