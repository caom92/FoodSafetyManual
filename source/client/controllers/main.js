// Entry point for the program that controls the main page layout
$(function() {
    // Initialize the SideNav
    $(".button-collapse").sideNav();
    
    // Load the view of the queried page into the content holder,
    // this will preserve backward and forward buttons' functionality
    $("#page-content").load("/espresso/views/" 
        + window.location.pathname.replace("/espresso/", ""));
});