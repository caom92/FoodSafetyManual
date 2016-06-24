// This function adds an onchange listener to the especified select input field 
// where we check if the user changed its value when it was previously missing 
// and, if she did, remove the invalid mark left on it
// [in]     id: the HTML tag ID for the select input field to which the 
//          listener is going to be added 
function setOnChangeListenerToRequiredSelectField(id) {
    $(id).on("change", function() {
        var label = "#" + $(this).attr("id") + "__label";
        if ($(this).val() 
            && $(label).hasClass("invalid-select")) {
            $(label).removeClass("invalid-select");
        }
    })
}


// This function checks if a required select input field is empty and if it is
// it marks it as invalid in the form
// [in]    id: the HTML tag ID of the input field which we want to 
//         validate
// [out]   return: true if the field was valid or false otherwise
function isRequiredSelectFieldValid(id) {
    // first check if the field is a multiple selection
    if (!$(id).attr("multiple")) {
        // if it is not, then just check if its value is empty
        if (!$(id).val()) {
            $(id + "__label").addClass("invalid-select");
            return false;
        }
    // if it is, then check that no option was selected
    } else if ($(id).val().length == 0) {
        $(id + "__label").addClass("invalid-select");
        return false;
    }
    return true;
}


// This function checks if the especified non-required text area input's 
// content is of the allowed length, returning true if this is the case or 
// false otherwise
// [in]    id: the HTML tag ID of the input field which we want to 
//         validate
// [out]   return: true if the field was valid or false otherwise
function isTextAreaLengthValid(id) {
    return !$(id).hasClass("invalid");
}


// This function checks if a the especified required text area input has 
// content or is empty, returning true if it has content or false otherwise
// [in]    id: the HTML tag ID of the input field which we want to 
//         validate
// [out]   return: true if the field has content of false otherwise
function isRequiredTextAreaValid(id) {
    if ($(id).val().length == 0) {
        $(id).addClass("invalid");
        return false;
    }
    return true;
}


// This function injects the proper messages to the select fields by brute force
// depending on the language that the user selected, we do it this way since
// Materialize takes the select fields and move them to different objects in
// order to create the proper select input field, also the language method 
// as for now cannot access the the option elements
function changeLanguageForSelectFields(lang) {
    switch (lang) {
        case "es":
            $("#zone-selection__label").text("Zona Defectuosa*");
            $("#procedure-selection__label").text("Procedimiento Defectuoso*");
            $("#browser-selection__label").text("Navegador Web que usa*");
            $("#severity-selection__label").text("Severidad del problema*");
            $("option:disabled").text("Selecciona una opción");
            $("#browser-selection > option:disabled").text(
                "Marca las opciones");
            $("option[value='other']").text("Otro");
            $("option[value='blocker']").text("Crash o bloqueo");
            $("option[value='no-workaround']").text("Sin solución alternativa");
            $("option[value='has-workaround']").text(
                "Con solución alternativa");
            $("option[value='doc-error']").text("Error de documentación");
            $("option[value='trivial']").text("Problema trivial");
            $("option[value='ui-error']").text("Defecto visual");
            $("option[value='enhancement']").text("Sugerencia de Mejora");
        break;
            
        case "en":
            $("#zone-selection__label").text("Defective Zone*");
            $("#procedure-selection__label").text("Defective Process*");
            $("#browser-selection__label").text("Web browser you use*");
            $("#severity-selection__label").text("Severity of the issue*");
            $("option:disabled").text("Select an option");
            $("#browser-selection > option:disabled").text(
                "Indicate which options");
            $("option[value='other']").text("Other");
            $("option[value='blocker']").text("Crash");
            $("option[value='no-workaround']").text("No workaround");
            $("option[value='has-workaround']").text(
                "Has workaround");
            $("option[value='doc-error']").text("Documentation error");
            $("option[value='trivial']").text("Trivial");
            $("option[value='ui-error']").text("Visual defect");
            $("option[value='enhancement']").text("Enhancement");
        break;
    }
}


// The main function which starts execution of this controller, call only
// when its corresponding view is ready
function onReportProblemViewReady() {
    // Hide the progress bar
    $(".progress").hide();
    
    // set the user name, employee id, email and preferred language
    $("#user-name").val(sessionStorage.account_nickname);
    $("#user-id").val(sessionStorage.employee_num);
    $("#user-email").val(sessionStorage.email);
    $("#lang").val(localStorage.defaultLanguage);
    
    // hide the language and email fields
    $("#user-email").hide();
    $("#lang").hide();
    
    // change a previously invalid select field to valid when the user finally
    // selects a valid option
    setOnChangeListenerToRequiredSelectField("#zone-selection");
    setOnChangeListenerToRequiredSelectField("#procedure-selection");
    setOnChangeListenerToRequiredSelectField("#browser-selection");
    setOnChangeListenerToRequiredSelectField("#severity-selection");
    
    // change the language of the select input fields and the option 
    // elements before initializing materialize objects
    changeLanguageForSelectFields(localStorage.defaultLanguage);
    
    // Initialize text area character counters and select fields
    $("textarea").characterCounter();
    $("#browser-selection").material_select();
    $("#severity-selection").material_select();
    
    // when the user uploads one or more screenshots, we must check the MIME 
    // type to make sure that the uploaded files are only images and not any
    // other kind of file; if any of the files are not an image, prevent upload
    $("#screenshot-attachment").on("change", function() {
        validateFileFormats(
            // pass the files uploaded by the user in the form
            document.getElementById("screenshot-attachment").files,

            // indicate which bitmap formats we wish to accept
            { png: true, gif: true, jpeg: true, bmp: true },

            // when the file format is invalid, visually notify the user
            function() {
                loadToast("only_images", 3500, "rounded");
                $(".file-path").removeClass("valid");
                $(".file-path").addClass("invalid");
            }
        );
    });
    
    // validate the form before submitting
    $("#send").on("click", function(event) {
        // prevent authomatic submission, we'll do it manually
        event.preventDefault();
        
        // check if the required select inputs have a value selected;
        // if any of those is empty, mark it on the form
        var zoneIsValid = isRequiredSelectFieldValid("#zone-selection");
        var procedureIsValid = 
            isRequiredSelectFieldValid("#procedure-selection");
        var browserIsValid = isRequiredSelectFieldValid("#browser-selection");
        var severityIsValid = isRequiredSelectFieldValid("#severity-selection");
        
        // check if the required text area inputs have text inside
        var summaryIsValid = isRequiredTextAreaValid("#summary");
        
        // check that all area inputs have the proper length
        var summaryLengthIsValid = isTextAreaLengthValid("#summary");
        var stepsLengthIsValid = isTextAreaLengthValid("#steps");
        var expectationLengthIsValid = isTextAreaLengthValid("#expectation");
        var realityLengthIsValid = isTextAreaLengthValid("#reality");
        
        // check if the user is attaching valid image files
        var attachmentIsValid = !$(".file-path").hasClass("invalid"); 
        
        // if there is at least one invalid missing, prevent submition and 
        // display the error mesage
        if (!zoneIsValid || !procedureIsValid || !browserIsValid 
            || !severityIsValid || !summaryIsValid || !summaryLengthIsValid 
            || !stepsLengthIsValid || !expectationLengthIsValid
            || !realityLengthIsValid || !attachmentIsValid) {
            loadToast("incorrect_fields", 
                3500, "rounded");
        } else {
            // retrieve the data from the form
            var formData = new FormData($("#bug-report")[0]);
            
            // show the progress bar
            $(".progress").show();
            
            // if all form fields are valid, send the data to the server
            $.ajax({
                // URL of the requested service
                url: "/espresso/bug-reports/send",

                // the HTTP method to use
                method: "POST",

                // the input data to be sent along with the request
                data: formData,

                // indicate that we expect to recieve a JSON as response
                dataType: "json",

                // indicate that we do not want the response to be stored in 
                // cache
                cache: false,

                // magic options required for FormData to work
                processData: false,
                contentType: false,

                // request successful callback
                success: function(response, message, xhr) {
                    // check that the result was successful
                    if (response.meta.return_code == 0) {
                        loadToast(
                            "report_sent", 
                            3500, "rounded"
                        );
                    } else {
                        loadToast(
                            "report_failed",
                            3500, "rounded"
                        );
                        console.log("server says: " + response.meta.message);
                    }
                    $(".progress").hide();
                },

                // request error callback
                error: function(xhr, status, message) {
                    // display the server result and the proper status icon
                    $(".progress").hide();
                    loadToast(
                        "report_failed", 
                        3500, "rounded"
                    );
                    console.log("server says: " + status + ", " + message);
                }
            });
        }
    });

    // Retrieve the zones from the server
    $.ajax({
        // the URL of the service that we are requesting from the server
        url: "/espresso/zones",

        // the HTTP method to use for communicating with the server
        method: "GET",

        // indicate that we expect to recieve a JSON object as response from 
        // the server
        dataType: "json",

        // indicate that we want to store the result in cache 
        cache: true,

        // the callback to invoque when the communication with the server was
        // established successfully
        success: function(response, message, xhr) {
            // check if the response was positive
            if (response.meta.return_code == 0) {
                // if it was, store the retrieve zones into a list of HTML
                // option elements
                var html = "";
                for (zone of response.data.zones) {
                    html += "<option value='" + zone.id + "'>"
                        + zone.name + "</option>";
                }

                // inject the list of options into the select field
                $("#zone-selection").html($("#zone-selection").html() + html);
            }

            // finally, initialize the select field
            $("#zone-selection").material_select();
        },

        // the callback to invoque when the communication with the server failed
        error: function(xhr, status, message) {
            // print the message in the console
            console.log("server says: " + status + ", " + message);

            // finally, initialize the select field
            $("#zone-selection").material_select();
        }
    });

    // Retrieve the procedures from the server 
    $.ajax({
        // the URL of the service that we are requesting from the server
        url: "/espresso/procedures",

        // the HTTP method to use for communicating with the server
        method: "GET",

        // indicate that we expect to recieve a JSON object as response from 
        // the server
        dataType: "json",

        // indicate that we want to store the result in cache 
        cache: true,

        // the callback to invoque when the communication with the server was
        // established successfully
        success: function(response, message, xhr) {
            // check if the response was positive
            if (response.meta.return_code == 0) {
                // if it was, store the retrieve zones into a list of HTML
                // option elements
                var html = "";
                for (procedure of response.data.procedures) {
                    html += "<option value='" + procedure.id + "'>"
                        + procedure.name + "</option>";
                }

                // inject the list of options into the select field
                $("#procedure-selection").html(
                    $("#procedure-selection").html()+ html);
            }

            // finally, initialize the select field
            $("#procedure-selection").material_select();
        },

        // the callback to invoque when the communication with the server failed
        error: function(xhr, status, message) {
            // print the message in the console
            console.log("server says: " + status + ", " + message);
            
            // finally, initialize the select field
            $("#procedure-selection").material_select();
        }
    });
}