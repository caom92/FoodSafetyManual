function loadSideMenu()
{
    // display the name of the user
    $("#account-name").text(
        `${localStorage.first_name}  ${localStorage.last_name}`
    );

    if (localStorage.role === 'Administrator') {
        // display the admin menu
        $('#actions-list').load($root + 'source/client/administrator/layouts/menu.html', function(){
            initMaterialize();
        });
    } else {
        // if the user is has a user role, we display the programs menu
        // for this, we first check if the menu is already defined
        if (!isDefined(localStorage.menu)) {
            // if it is not, we must created
            localStorage.menu = '';

            // first, we read the privilege JSON
            var privileges = JSON.parse(localStorage.privileges);
            console.log(privileges)

            // then, for every program...
            for (privilege of privileges) {
                // create the navigation menu item
                localStorage.menu += 
                    `<li><ul class="collapsible collapsible-accordion">
                    <li><a class="collapsible-header program-button"> 
                    <i class="mdi mdi-wrench md-dark md-24 field-icon">
                    </i><span>${privilege.name}</span></a>
                    <div class="collapsible-body"><ul>`;

                // and for every module...
                for (module of privilege.modules) {
                    // add an item to the program collapsible menu
                    localStorage.menu +=
                        `<li><a class="nav-link waves-effect waves-green" 
                        href="#"> 
                        ${ module.name }
                        </a></li>`;
                }

                // finally, we close this collapsible menu and repeat
                localStorage.menu += 
                    '</ul></div></li></ul></li>';
            }

            // show the menu items 
            $('#actions-list').html(localStorage.menu);
        }
        initMaterialize();
    }
}

function initMaterialize(){
    // Initialize the SideNav
    $("#page-content").addClass("with-side-menu");
    $("#slide-out").show();
    $('.button-collapse').show();
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible();

    // every time the user clicks a link to navigate to another page,
    // we load the corresponding layout to the current view, preventing
    // full-page reloading; we also make use of history API in order to preserve
    // browser's forward and backward buttons' functionality 
    $('a.nav-link').on('click', function(event) {
        // prevent normal navigation
        event.preventDefault();

        // get the layout that is being requested 
        var targetLayout = $(this).attr('href');

        // push the state to the history stack
        window.history.pushState({ layout: targetLayout }, '', targetLayout);

        // load the requested layout
        $app.load(targetLayout); 
    });
}

$(function() {
    // check if the user is logged in
    $server.request({
        service: 'check-session', 
        success: function(response, message, xhr) {
            // check if the reponse was an error
            if (response.meta.return_code == 0) {
                // Load the layout of the queried page into the page 
                // container this will preserve backward and forward 
                // buttons' functionality
                var layout = 
                    window.location.pathname.replace($root, "");

                if (response.data) {
                    // load the side menu items
                    loadSideMenu();

                    

                    // every time the forward or backward button is pressed to recover a 
                    // page state, we must manually load the requested layout to the current 
                    // view
                    window.onpopstate = function(event) {
                        // check that the page state is valid and not empty
                        var isStateObjNull = event.state == null;
                        if (!isStateObjNull) {
                            var isLayoutEmpty = event.state.layout.length == 0;
                            if (!isLayoutEmpty) {
                                // if the page state is valid, we load the layout that was 
                                // stored in it
                                $app.load(event.state.layout);
                                return;
                            } 
                        } 
                        
                        // otherwise, we default to the edit-profile layout
                        $app.load('edit-profile');
                    }

                    // When the user clicks the logout button, close the 
                    // session in both the client and the server
                    $("#logout").on("click", function(event) {
                        // prevent default behavior of redirecting to another 
                        // page
                        event.preventDefault();
                        
                        // tell the server to close the session as well
                        $server.request({
                            service: 'logout', 
                            success: function(response, message, xhr) {
                                // clear the session variables in the client
                                localStorage.clear();
                                
                                // finally redirect to the login page
                                window.location.href = $root;
                                console.log(
                                    "server says: " + response.meta.message
                                );
                            }
                        });
                    });
                    
                    // check if the layout is empty
                    var isLayoutEmpty = layout.length == 0;

                    // check if the layout is the log in page
                    var isLayoutLogin = layout == 'login';

                    // check if the layout is the password recovery page
                    var isLayoutPasswordRecovery = 
                        layout == 'password-recovery';

                    if (!isLayoutEmpty 
                        && !isLayoutLogin 
                        && !isLayoutPasswordRecovery) {
                        // if the layout is not empty, nor the log in page or 
                        // the password recovery page, then load the requested
                        // page 
                        $app.load(layout);
                    } else {
                        // otherwise load the edit profile page
                        $app.load('edit-profile');
                        loadToast('session_active', 3500, 
                            'rounded');
                    }
                } else {
                    // if it was, check if there is user data stored from
                    // a previous session
                    var isSessionDefined = isDefined(localStorage.login_name);

                    // and if there is, delete it
                    if (isSessionDefined) {
                        var lang = localStorage.defaultLanguage;
                        localStorage.clear();
                        localStorage.defaultLanguage = lang;
                    }

                    // then redirect to the login page
                    var isLayoutPasswordRecovery = 
                        layout == 'password-recovery';

                    if (isLayoutPasswordRecovery) {
                        $app.load(layout);
                    } else {
                        $app.load('login');
                    }
                }
            } else {
                console.log('server says: ' + response.meta.message);
            }
        }
    });
});