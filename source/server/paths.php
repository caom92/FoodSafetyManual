<?php    
    // The main project namespace
    namespace espresso;
    
    // The following constants define relative paths inside the project folder 
    // to folders which contents will be frequently accessed by the application
    // in order to provide a shorthand for writing code and minimizing the
    // risk of breaking the application when refactoring or migrating the
    // source files 
    
    // Folder where are the source files are stored
    define(__NAMESPACE__."\SOURCE", "./");
    
    // Folder where the images for the website are stored
    define(__NAMESPACE__."\IMAGES", "../data/images/");
    
    // Folder where the CSS stylesheets for the website are stored
    define(__NAMESPACE__."\STYLESHEETS", "../data/stylesheets/");
    
    // The following constants define CDN links to library files that the 
    // application consumes
    
    // jQuery
    define(__NAMESPACE__."\JQUERY",
        "http://code.jquery.com/jquery-1.12.0.min.js");
    
    // Google Material Design Icons
    define(__NAMESPACE__."\GOOGLE_ICONS", 
        "http://fonts.googleapis.com/icon?family=Material+Icons");
    
    // Materialize CSS
    define(__NAMESPACE__."\MATERIALIZE_CSS", 
        "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/mat".
        "erialize.min.css");
        
    // Materialize JS
    define(__NAMESPACE__."\MATERIALIZE_JS", 
        "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/material".
        "ize.min.js");
?>