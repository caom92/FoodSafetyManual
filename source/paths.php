<?php
    /* This file defines constants which store relative paths to folders 
    inside the project folder that contain files that are frequently 
    required by other source files of the project to simplify coding and 
    abstract the structure and organization of the project files. If the
    structure of the source files was changed, remember to modify the paths
    in this folder to prevent the project from breaking. */
    
    // The main project namespace
    namespace espresso;
    
    // Folder where are the source files are stored
    define(__NAMESPACE__."\SOURCE", "./");
    
    // Folder where the fatfree framework source files are stored 
    define(__NAMESPACE__."\F3", "../external/fatfree/");
    
    // Folder where the materialize library source files are stored
    define(__NAMESPACE__."\MATERIALIZE", "../external/materialize/");
    
    // Folder where the images for the website are stored
    define(__NAMESPACE__."\IMAGES", "../data/images/");
    
    // Folder where the CSS stylesheets for the website are stored
    define(__NAMESPACE__."\STYLESHEETS", "../data/stylesheets/");
?>