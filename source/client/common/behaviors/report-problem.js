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
            $("#module-selection__label").text("Módulo Defectuoso*");
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
            $("#module-selection__label").text("Defective Module*");
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
$(function() {
    // Hide the progress bar
    $(".progress").hide();
    
    // set the user name, employee id, email and preferred language
    $("#user-name").val(localStorage.login_name);
    $("#user-id").val(localStorage.employee_num);
    $("#user-email").val(localStorage.email);
    $("#lang").val(localStorage.defaultLanguage);

    if (isDefined(localStorage.zone_name)) {
        $('#zone-selection').val(localStorage.zone_name);
    } else {
        $('#zone-selection').val('N/A');
    }
    
    // hide the language and email fields
    $("#user-email").hide();
    $("#lang").hide();
    
    // change a previously invalid select field to valid when the user finally
    // selects a valid option
    // setOnChangeListenerToRequiredSelectField("#zone-selection");
    setOnChangeListenerToRequiredSelectField("#procedure-selection");
    setOnChangeListenerToRequiredSelectField("#module-selection");
    setOnChangeListenerToRequiredSelectField("#browser-selection");
    setOnChangeListenerToRequiredSelectField("#severity-selection");
    
    // change the language of the select input fields and the option 
    // elements before initializing materialize objects
    changeLanguageForSelectFields(localStorage.defaultLanguage);
    
    // Initialize text area character counters and select fields
    $("textarea").characterCounter();
    $("#browser-selection").material_select();
    $("#severity-selection").material_select();
    $("#module-selection").material_select();
    
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
        var zoneIsValid = isRequiredTextAreaValid("#zone-selection");
        var procedureIsValid = 
            isRequiredSelectFieldValid("#procedure-selection");
        var moduleIsValid = 
            isRequiredSelectFieldValid("#module-selection");
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
        if (!zoneIsValid || !procedureIsValid || !moduleIsValid 
            || !browserIsValid || !severityIsValid || !summaryIsValid 
            || !summaryLengthIsValid || !stepsLengthIsValid 
            || !expectationLengthIsValid || !realityLengthIsValid 
            || !attachmentIsValid) {
            loadToast("incorrect_fields", 
                3500, "rounded");
        } else {
            // retrieve the data from the form
            var formData = new FormData($("#bug-report")[0]);
            
            // show the progress bar
            $(".progress").show();
            
            // if all form fields are valid, send the data to the server
            $server.request({
                service: 'send-bug-report', 
                data: formData,
                success: function(response, message, xhr) {
                    // check that the result was successful
                    if (response.meta.return_code == 0) {
                        if (response.data.length > 0) {
                            $('#bug-report-warning .modal-content span#invalid-images').text(response.data.join());
                            $('#bug-report-warning').openModal();
                        } else {
                            loadToast(
                                "report_sent", 
                                3500, "rounded"
                            );
                        }
                    } else {
                        loadToast(
                            "report_failed",
                            3500, "rounded"
                        );
                        console.log("server says: " + response.meta.message);
                    }
                    $(".progress").hide();
                },
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

    $('#procedure-selection').on('change', function() {
        $server.request({
            service: 'get-modules-of-program',
            data: {
                program_id: $(this).val()
            },
            cache: false,
            success: function(response, message, xhr) {
                if (response.meta.return_code == 0) {
                    var html = 
                        '<option value="" disabled selected class="select_option"></option>';
                    for (mod of response.data) {
                        html += "<option value='" + mod.id + "'>"
                            + mod.name + "</option>";
                    }
                    $('#module-selection').html(html);
                    $("#module-selection").material_select();
                } else {
                    var privileges = JSON.parse(localStorage.privileges);

                    var html = 
                        '<option value="" disabled selected class="select_option"></option>';
                    for (program of privileges) {
                        for (mod of program.modules) {
                            html += "<option value='" + mod.id + "'>"
                            + mod.name + "</option>";
                        }
                    }
                    $('#module-selection').html(html);
                    $("#module-selection").material_select();
                }
            },
            error: function(xhr, status, message) {
                // print the message in the console
                console.log("server says: " + status + ", " + message);

                // finally, initialize the select field
                $("#zone-selection").material_select();
            }
        });
    });

    // Retrieve the zones from the server
    // $server.request({
    //     service: 'list-zones',
    //     cache: true,
    //     success: function(response, message, xhr) {
    //         // check if the response was positive
    //         if (response.meta.return_code == 0) {
    //             // if it was, store the retrieve zones into a list of HTML
    //             // option elements
    //             var html = "";
    //             for (zone of response.data) {
    //                 html += "<option value='" + zone.id + "'>"
    //                     + zone.name + "</option>";
    //             }

    //             // inject the list of options into the select field
    //             $("#zone-selection").html($("#zone-selection").html() + html);
    //         }

    //         // finally, initialize the select field
    //         $("#zone-selection").material_select();
    //     },
    //     error: function(xhr, status, message) {
    //         // print the message in the console
    //         console.log("server says: " + status + ", " + message);

    //         // finally, initialize the select field
    //         $("#zone-selection").material_select();
    //     }
    // });

    // Retrieve the programs from the server
    $server.request({
        service: 'list-programs',
        cache: true,
        success: function(response, message, xhr) {
            // check if the response was positive
            if (response.meta.return_code == 0) {
                // if it was, store the retrieve zones into a list of HTML
                // option elements
                var html = "";
                for (procedure of response.data) {
                    html += "<option value='" + procedure.id + "'>"
                        + procedure.name + "</option>";
                }

                // inject the list of options into the select field
                $("#procedure-selection").html(
                    $("#procedure-selection").html()+ html);
            } else {
                var privileges = JSON.parse(localStorage.privileges);

                var html = "";
                for (procedure of privileges) {
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
        error: function(xhr, status, message) {
            // print the message in the console
            console.log("server says: " + status + ", " + message);
            
            // finally, initialize the select field
            $("#procedure-selection").material_select();
        }
    }); 

    // change the language that is being displayed
    changeLanguage(localStorage.defaultLanguage);
});