// Gets the number of pending notifications for the user 
function getNumPendingAuthorizations()
{
    // request the service to the server
    $server.request({
        service: 'get-num-pending-logs',
        success: function(response) {
            // if the server responded successfully to the client ...
            if (response.meta.return_code == 0) {
                // get the current number of pendings that the user has
                var currentPendings = parseInt(
                    $('span#notifications').text()
                ) || 0;

                // check if the current number of pendings differs from the 
                // number of pendings retrieved from the server
                if (response.data != currentPendings) {
                    // if they are different
                    // compute the difference between the two
                    var newPendings = 0;
                    newPendings = response.data - currentPendings;

                    if (newPendings > 0) {
                        // if the user has additional pendings incoming
                        // notify the user
                        loadToast(
                            'pending_alert', 
                            4000, 
                            'rounded', 
                            newPendings
                        );

                        if (currentPendings == 0) {
                            // if the user originally had no pendings, add the 
                            // proper classes
                            $('span#notifications').addClass('green accent-4 badge');
                        }

                        // update the number of pendings for the client
                        $('span#notifications').text(response.data);
                    } else {
                        // if the user has less pendings incoming
                        if (response.data != 0) {
                            // and the incoming number of pendings is not 0
                            // update the number of pendings for the client
                            $('span#notifications').text(response.data);
                        } else {
                            // if the incoming number of pendings is 0
                            // remove the proper classes
                            $('span#notifications').removeClass('green accent-4 badge');

                            // and any text available in the UI
                            $('span#notifications').text('');
                        }
                    }
                }
            }
        }
    });
}


function loadZoneSelectionMenu()
{
    // if the user is a director, we need to display a zone 
    // selection menu

    // check if the menu already exists in the local session data
    if (typeof localStorage.zoneSelectionMenu != 'undefined') {
        // if it does, simply load it
        $('#zone-menu').append(localStorage.zoneSelectionMenu);
        $('select#zone-selection').val(localStorage.zone_id);
    } else {
        // if it does not, we need to create it from the server 
        $server.request({
            service: 'list-zones',
            success: function(response) {
                // check if the server responded successfully
                if (response.meta.return_code == 0) {
                    // if it did, create the zone selection menu
                    var zonesHTML = 
                        '<select id="zone-selection" class="black-text browser-default">';
                    // for each zone retrieved from the server
                    for (zone of response.data) {
                        // add it to the selection menu
                        zonesHTML += 
                            '<option value="' + zone.id + 
                            '">' + zone.name + '</option>';
                    }
                    // add the menu to the DOM
                    zonesHTML += '</select>';
                    $('#zone-menu').append(zonesHTML);

                    // add the menu to the local session storage
                    localStorage.zoneSelectionMenu = zonesHTML;

                    // add a callback for when the user changes 
                    // zones
                    console.log($('select#zone-selection'))
                    $('select#zone-selection').on('change', 
                        function(event) {
                            // notify the server of the zone change
                            $server.request({
                                service: 'director-change-zones',
                                data: {
                                    zone_id: $(this).val()
                                },
                                success: successCallback
                            })
                        }
                    );
                } else {
                    // if the server responded with error, notify 
                    // the user with a message
                    Materialize.toast(
                        'Error retrieving zones', 
                        4000, 
                        'rounded'
                    );
                    console.log(
                        'server says: ' + response.meta.message
                    );
                }
            }
        });
    }

    // create the callback function to execute when
    // the user changed zones successfully
    var successCallback = function(response) {
        // check if the server answered successfully
        if (response.meta.return_code == 0) {
            // if the operation was successfull,
            // update the local session data
            localStorage.zone_id = response.data.id;
            localStorage.zone_name = 
                response.data.name;
        } else {
            // if the server answered with error,
            // notify the user with a message
            Materialize.toast(
                'Error changing zones', 
                4000, 
                'rounded'
            );
            console.log(
                'server says: ' + 
                response.meta.message
            );
        }
    };
}


function loadSideMenu()
{
    // display the name of the user
    $("#account-name").text(
        `${localStorage.first_name}  ${localStorage.last_name}`
    );

    if (localStorage.role_name === 'Administrator') {
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

            // check if the user is a supervisor or an employee
            if (localStorage.role_name === 'Supervisor') {
                localStorage.menu += `
                    <li><a class="nav-link waves-effect waves-green" 
                        href="${(localStorage.role_name === 'Supervisor')?
                        'authorizations' : '#!'}">
                    <i class="mdi mdi-comment-check md-dark md-24 field-icon">
                    </i>
                    <span class="auth">
                    </span>
                    <span id='notifications' class="white-text"></span>
                    </a></li>
                `;

                getNumPendingAuthorizations();
            }

            // first, we read the privilege JSON
            var privileges = JSON.parse(localStorage.privileges);

            // and check if the user has any privileges associated
            var hasPrivileges = privileges.zones.length > 0;

            // add the link to the PreOp inventory if the user is a supervisor
            // and has read privileges to that log
            if (hasPrivileges) {
                if (localStorage.role_name === 'Supervisor') {
                    localStorage.menu += 
                        '<li"><a class="nav-link waves-effect ' +
                        'waves-green" href="manage-inventory"><i ' +
                        'class="mdi mdi-briefcase md-dark md-24 ' + 
                        'field-icon"></i><span class="inventory">' +
                        '</span></a></li>';
                }

                // then, for every program...
                for (var program of privileges.zones[0].programs) {
                    // create the navigation menu item
                    localStorage.menu += 
                        '<li><ul class="collapsible collapsible-accordion">' +
                        '<li><a class="collapsible-header program-button">' + 
                        '<i class="mdi mdi-wrench md-dark md-24 field-icon">' +
                        '</i><span>' + program.name + '</span></a>' +
                        '<div class="collapsible-body"><ul>';

                    // and for every module...
                    for (var module of program.modules) {
                        // add an item to the program collapsible menu
                        if (isDefined(module.name)) {
                            localStorage.menu +=
                                `<li><a class="nav-link waves-effect waves-green" 
                                href="modules?_p=${ program.name }&_m=${ module.suffix }"> 
                                ${ module.name }
                                </a></li>`;
                        }
                    }

                    // finally, we close this collapsible menu and repeat
                    localStorage.menu += 
                        '</ul></div></li></ul></li>';
                }
            }
        }

        // check if the user is a director
        if (localStorage.role_name === 'Director') {
            // if it is, load the zone selection menu
            loadZoneSelectionMenu();
        }

        // show the menu items 
        $('#actions-list').html(localStorage.menu);
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
    //$('.dropdown-button').dropdown();
    //$('select').material_select();

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

                    if (localStorage.role_name == 'Supervisor'
                        || localStorage.role_name == 'Employee') {
                        setInterval(getNumPendingAuthorizations, 60000);
                    }

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