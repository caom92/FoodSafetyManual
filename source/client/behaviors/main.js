// Adds items to the side menu depending on the user role and permissions
function loadSideMenu()
{
    // display the name of the user
    $("#account-name").text(localStorage.first_name + ' ' 
        + localStorage.last_name);

    // load the appropiate menu items depending on the role of the user
    if (localStorage.isUser === 'true') {
        // if the user is has a user role, we display the programs menu
        // for this, we first check if the menu is already defined
        if (!isDefined(localStorage.menu)) {
            // if it is not, we must created
            localStorage.menu = '';

            // first, we read the privilege JSON
            var privileges = JSON.parse(localStorage.privileges);

            // then, for every program...
            for (privilege of privileges) {
                // create the navigation menu item
                localStorage.menu += 
                    '<li><ul class="collapsible collapsible-accordion">' +
                    '<li><a class="collapsible-header program-button">' + 
                    '<i class="mdi mdi-wrench md-dark md-24 field-icon">' +
                    '</i><span>' + privilege.program_name + '</span></a>' +
                    '<div class="collapsible-body"><ul>';

                // and for every module...
                for (module of privilege.modules) {
                    // add an item to the program collapsible menu
                    localStorage.menu +=
                        '<li><a class="waves-effect waves-green" href="#">' +
                        module.module_name +
                        '</a></li>';
                }

                // finally, we close this collapsible menu and repeat
                localStorage.menu += 
                    '</ul></div></li></ul></li>';
            }
        }

        // show the menu items 
        $('#actions-list').html(localStorage.menu);
    } else {
        // if the user has an admin role, display the admin menu
        $('#actions-list').load($root + '/layouts/admin-menu');
    }

    // Initialize the SideNav
    $("#page-content").addClass("with-side-menu");
    $("#slide-out").show();
    $('.button-collapse').show();
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible();
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
                window.location.href = $root + '/';
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
                if (response.data) {
                    // load the side menu items
                    loadSideMenu();

                    // Load the layout of the queried page into the page 
                    // container this will preserve backward and forward 
                    // buttons' functionality
                    var layout = 
                        window.location.pathname.replace($root + "/", "");
                    
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
                }
            } else {
                console.log('server says: ' + response.meta.message);
            }
        }
    });

    // change the language that is being displayed
    changeLanguage(localStorage.defaultLanguage);
});
