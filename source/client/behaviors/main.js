// Adds items to the side menu depending on the user role and permissions
function loadSideMenu()
{
    // Initialize the SideNav
    $("#page-content").addClass("with-side-menu");
    $("#slide-out").show();
    $('.button-collapse').show();
    $(".button-collapse").sideNav();

    // display the name of the user
    $("#account-name").text(localStorage.first_name + ' ' 
        + localStorage.last_name);

    // load the appropiate menu items depending on the role of the
    // user
    if (localStorage.isUser === 'true') {

    } else {
        $('#actions-list').load('/espresso/layouts/admin-menu');
    }
}


// Entry point for the program that controls the main page layout
$(function() {
    // When the user clicks the logout button, close the session in both
    // the client and the server
    $("#logout").on("click", function(event) {
        // prevent default behavior of redirecting to another page
        event.preventDefault();
        
        // tell the server to close the session as well
        $server.request({
            service: 'logout', 
            success: function(response, message, xhr) {
                // clear the session variables in the client
                localStorage.clear();
                
                // finally redirect to the login page
                window.location.href = '/espresso/';
                console.log("server says: " + response.meta.message);
            }
        });
    });
        
    // check if the user is logged in
    $server.request({
        service: 'check-session', 
        success: function(response, message, xhr) {
            // check if the reponse was an error
            if (response.meta.return_code == 0) {
                // load the side menu items
                loadSideMenu();

                // Load the layout of the queried page into the page 
                // container this will preserve backward and forward 
                // buttons' functionality
                var layout = 
                    window.location.pathname.replace("/espresso/", "");
                
                if (layout.length > 0) {
                    $app.load(layout);
                } else {
                    $app.load('edit-profile');
                }
            } else {
                // if it was, check if there is user data stored from
                // a previous session
                var isSessionDefined = isDefined(localStorage.login_name)
                    && isDefined(localStorage.login_password);

                // and if there is, delete it
                if (isSessionDefined) {
                    var lang = localStorage.defaultLanguage;
                    localStorage.clear();
                    localStorage.defaultLanguage = lang;
                }

                // then redirect to the login page
                $app.load('login');
                console.log("server says: " + response.meta.message);
            }
        }
    });

    // change the language that is being displayed
    changeLanguage(localStorage.defaultLanguage);
});
