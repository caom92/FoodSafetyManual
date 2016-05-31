// Entry point for the program that controls the login form view
$(function() {
    // hide the server status noticies
    $("#server-offline").hide();
    $("#server-online").hide();
    
    // as soon as the page is loaded, query the server to check it's status
    $.ajax({
        // the service we are requesting
        url: "/espresso/source/server/services/others/server-status.php",
        
        // on success callback
        success: function(result) {
            console.log("server says: " + result);
            
            // depending if the server is available or not, show the proper
            // icon
            if (result == "data base server is available") {
                $("#server-online").show();
            } else {
                $("#server-offline").show();
            }
        },
        
        // on error callback
        error: function(xhr, status, message) {
            console.log("server says: " + status + ". " + message);
            $("#server-offline").show();
        }
    });
    
    $("#form-submit").click(function(e) {
        // prevent default behavior
        e.preventDefault();
        
        $.ajax({
            method: "POST",
            url: "/espresso/source/server/services/session/authentication.php",
            data: {
                username : $("#username").val(),
                password: $.md5($("#password").val())
            },
            success: function(result) {
                console.log("server says: " + result);
            }
        })
    });
});