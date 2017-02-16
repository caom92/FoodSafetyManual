function createDatePicker(){
    $("#report_date_start").html("");
    $("#report_date_end").html("");
    $("#report_date_start").append('<input id="start_date" type="date" class="datepicker"><label id="start_date_label" class="select_start_date active" for="start_date"></label>');
    $("#start_date").pickadate(datePicker("start_hidden", new Date(), new Date("2016-10-01T00:00:00")));
    $("#report_date_end").append('<input id="end_date" type="date" class="datepicker"><label id="end_date_label" class="select_end_date active" for="end_date"></label>');
    $("#end_date").pickadate(datePicker("end_hidden", new Date(), new Date("2016-10-01T00:00:00")));
}

// On load function, it executes the following:
// 1.- Load external scripts
// 2.- Adjust the tabs to the user role
// 2.- Init tabs
// 3.- Init datePicker
// 4.- If they don't exist, obtain corrective actions from server

$(function() {
    var getParams = getURLQueryStringAsJSON();

    if(!localStorage.correctiveActionsSSOP){
        $server.request({
            service: 'list-corrective-actions',
            success: function(response) {
                if (response.meta.return_code == 0) {
                    localStorage.correctiveActionsSSOP = JSON.stringify(response.data);
                } else {
                    Materialize.toast("Some error", 3000, "rounded");
                    throw response.meta.message;
                }
            }
        });
    }

    if(localStorage.role_id == "5"){
        changeLanguage(localStorage.defaultLanguage);
    } else {
        $("#logs_tab").remove();
        $(".logs_tab").parent().remove();
        $('ul.tabs').tabs();
        $('.indicator').addClass("green");
        changeLanguage(localStorage.defaultLanguage);
    }

    $.getScript( "source/client/common/scripts/logs/form-creator.js", function( data, textStatus, jqxhr ) {
        $.getScript( "source/client/common/scripts/logs/table-creator.js", function( data, textStatus, jqxhr ) {
            $.getScript( "source/client/common/scripts/logs/" + getParams._ + ".js", function( data, textStatus, jqxhr ) {
                console.log("Load of " +  getParams._);
                if(localStorage.role_id == "5"){
                    loadLogForm("#logs_tab");
                } else {
                    $("#logs_tab").remove();
                    $(".logs_tab").parent().remove();
                    $('ul.tabs').tabs();
                    $('.indicator').addClass("green");
                }
            });
        });
    });

    $("#request_report").click(function(){
        loadReports(
            $("input[name='start_hidden']").val(),
            $("input[name='end_hidden']").val(),
            getParams._
        );
        $("#report-tab-content").html("");
    });

    $('ul.tabs').tabs();
    $('.indicator').addClass("green");
    createDatePicker();
    changeLanguage();
    pdfUploader();
});

function pdfUploader() {
    // We load the tabs; we have 2 or 3 depending on the privileges of the user
    // Read means we can load the PDF manual and see past logs
    // Write means we can read and also submit a new log with the current date
    // add functionality to the file input so that the mime type of the file to 
    // be uploaded is checked so that only PDF files are accepted
    $('#manual_file').on('change', function() {
        var isInvalid = $('.file-path').hasClass('invalid');
        if (isInvalid) {
            $('.file-path').removeClass('invalid');
            $('.file-path').addClass('valid');
        }

        validateFileFormats(
            document.getElementById('manual_file').files,
            { pdf: true },
            function() {
                Materialize.toast(
                    'Only PDF files are accepted for upload',
                    3500, 'rounded'
                );
                $('.file-path').removeClass('valid');
                $('.file-path').addClass('invalid');
            }
        );
    })

    // check if the user is of the appropiate role
    var isAdminRole = 
        localStorage.role_name == 'Supervisor';

    if (isAdminRole) {
        // if she is, then display the upload file button
        $('#upload-manual-section-trigger').show();

        // and configure its behavior when the button is clicked
        $('#upload-manual').on('click', function(event) {
            // stop default button behavior
            event.preventDefault();

            // check if the upload manual section is being displayed
            var uploadManualSection = $('#upload-manual-section'); 
            var isFormVisible = uploadManualSection.is(':visible');
            var file = $('#manual_file').val();

            if (isFormVisible) {
                // if it is, check if the file filed is empty
                var isEmpty = file === '' || file  === null;

                if (isEmpty) {
                    // if it is, mark it as invalid
                    $('.file-path').removeClass('valid');
                    $('.file-path').addClass('invalid');
                }
                
                // if it's not, check if it has the invalid class
                var isInvalid = $('.file-path').hasClass('invalid');

                if (isInvalid) {
                    // if it does, notify the user
                    Materialize.toast(
                        'A PDF file must be provided',
                        3500,
                        'rounded'
                    );
                } else {
                    var formData = new FormData($('#upload-manual-form')[0]);
                    $('#progress-bar').show();
                    // if it doesn't, send the file to the server
                    $server.request({
                        service: 'upload-manual-gmp-packing-preop',
                        data: formData,
                        success: function(response) {
                            // check if the server responded successfully
                            if (response.meta.return_code == 0) {
                                // if it did, notify the user
                                Materialize.toast(
                                    'The file was uploaded successfully',
                                    3500,
                                    'rounded'
                                );

                                // and hide the file upload form
                                uploadManualSection.hide();

                                // and hide the progress bar
                                $('#progress-bar').hide();
                            } else {
                                // if not, notify the user
                                Materialize.toast(
                                    'There was an error and the file could ' +
                                    'not be uploaded',
                                    3500,
                                    'rounded'
                                );
                            }
                        }
                    });
                }
            } else {
                // if the upload manual section is hidden, display it
                uploadManualSection.show();
            }
        });
    }
}

function reportLoaderCard(data){
    var reportCard = $("<div>");
    var cardRow = $("<div>");
    var openIconWrapper = $("<div class='iconContainer col s1 m1 l1'>");
    var reportIconWrapper = $("<div class='iconContainer col offset-s4 offset-m4 offset-l4 s1 m1 l1'>");
    var openIcon = $('<i class="mdi mdi-file-document-box mdi-36px green-text"></i>');
    var reportIcon = $('<i class="mdi mdi-file-pdf-box mdi-36px red-text text-darken-4"></i>');
    reportIcon.hide();

    reportCard.addClass("card-panel white reportCard pdfReport");
    cardRow.addClass("row no-margin-bottom");

    var secretForm = $('<form id="secretForm_' + data.report_id + '" action="source/server/report/reportPDF.php" target="_blank" method="post" hidden>' +
            '<input id="contents_' +data.report_id + '"type="text" name="content" hidden>' + 
            '<input id="css_' +data.report_id + '"type="text" name="style" hidden>' + 
            '<input id="lang_' +data.report_id + '"type="text" name="lang" hidden>' + 
        '</form>');
    reportCard.append(secretForm);

    cardRow.append($("<div class='col s6 m6 l6' style='font-size: 24px;'>").append(data.creation_date));
    reportIconWrapper.append(reportIcon);
    openIconWrapper.append(openIcon);
    cardRow.append(reportIconWrapper);
    cardRow.append(openIconWrapper);

    reportCard.append(cardRow);

    reportCard.data("report", table(loadReport(data)));
    reportCard.data("raw_report", data);
    reportCard.data("header", reportHeader(data.zone_name, data.module_name, data.program_name, data.log_name, data.creation_date, data.created_by, data.approval_date, data.approved_by));
    reportCard.data("headerPDF", reportHeaderPDF(data.zone_name, data.module_name, data.program_name, data.log_name, data.creation_date, data.created_by, data.approval_date, data.approved_by));

    openIcon.css( 'cursor', 'pointer' );
    reportIcon.css( 'cursor', 'pointer' );

    openIcon.on("click", function(argument) {
        var iconParent = $(this).parent().parent().parent();
        if(iconParent.hasClass("reportCard")){
            console.log("Has report card");
            iconParent.removeClass("reportCard");
            $(this).removeClass("mdi-file-document-box green-text");
            $(this).addClass("mdi-close-box red-text");
            $(".reportCard").hide(300);
            var tempCard = $("<div>");
            tempCard.addClass("card-panel white");
            tempCard.attr("id", "sandboxWrapper_" + data.report_id);
            //$("#report-tab-content").hide();
            $("#report-tab-content").html("");
            tempCard.append(iconParent.data("report"));
            var tempHeader = iconParent.data("header");
            tempHeader.attr("id", "headerWrapper_" + data.report_id);
            var tempPDFHeader = iconParent.data("headerPDF");
            tempPDFHeader.attr("id", "headerPDFWrapper_" + data.report_id);
            tempPDFHeader.hide();
            $("#report-tab-content").append(tempHeader);
            $("#report-tab-content").append(tempPDFHeader);
            $("#report-tab-content").append(tempCard);
            changeLanguage(localStorage.defaultLanguage, function(){
                reportIcon.show(200);
            });
            //$("#report-tab-content").show(600);
        } else {
            console.log("No report card");
            iconParent.addClass("reportCard");
            $(this).removeClass("mdi-close-box red-text");
            $(this).addClass("mdi-file-document-box green-text");
            $(".reportCard").show(300);
            $("#report-tab-content").html("");
            reportIcon.hide(200);
        }
        console.log("lmao");
    });

    reportIcon.on("click", function(argument){
        var iconParent = $(this).parent().parent().parent();
        var contentObject = {};
        contentObject.header = $("#headerPDFWrapper_" + data.report_id).html();
        contentObject.body = $("#sandboxWrapper_" + data.report_id).html();
        contentObject.footer = "";
        $("#contents_" + data.report_id).val(JSON.stringify([contentObject]));
        $("#css_" + data.report_id).val(getCSS());
        $("#lang_" + data.report_id).val(localStorage.defaultLanguage);
        $("#secretForm_" + data.report_id).submit();
    });

    $("#request_pdf").off("click");
    $("#request_pdf").on("click", function(argument){
        var currentHTML = $("#report-tab-content").html();
        var htmlContent = [];
        $("#report-tab-content").html("");
        $(".pdfReport").each(function(argument){
            var contentObject = {};
            var tempCard = $("<div>");
            tempCard.addClass("card-panel white");
            tempCard.attr("id", "sandboxWrapper_" + $(this).data("raw_report").report_id);
            $("#report-tab-content").append($(this).data("header"));
            tempCard.append($(this).data("report"));
            var tempHeader = $(this).data("headerPDF");
            tempHeader.attr("id", "headerWrapper_" + $(this).data("raw_report").report_id);
            var tempPDFHeader = $(this).data("headerPDF");
            tempPDFHeader.attr("id", "headerPDFWrapper_" + $(this).data("raw_report").report_id);
            tempPDFHeader.hide();
            $("#report-tab-content").append(tempHeader);
            $("#report-tab-content").append(tempPDFHeader);
            $("#report-tab-content").append(tempCard);
            changeLanguage(localStorage.defaultLanguage);
            contentObject.header = $("#headerPDFWrapper_" + $(this).data("raw_report").report_id).html();;
            contentObject.body = $("#sandboxWrapper_" + $(this).data("raw_report").report_id).html();
            contentObject.footer = "";
            console.log(contentObject);
            //htmlContent.push(/*$("#headerWrapper_" + $(this).data("raw_report").report_id).html() + */$("#sandboxWrapper_" + $(this).data("raw_report").report_id).html());
            htmlContent.push(contentObject);
        });
        console.log(JSON.stringify(htmlContent));
        $("#contents_" + data.report_id).val(JSON.stringify(htmlContent));
        $("#css_" + data.report_id).val(getCSS());
        $("#lang_" + data.report_id).val(localStorage.defaultLanguage);
        $("#secretForm_" + data.report_id).submit();
        $("#report-tab-content").html(currentHTML);
    });

    return reportCard;
}

function loadReports(startDate, endDate, suffix){
    var data = new Object();
    data.start_date = startDate;
    data.end_date = endDate;

    $server.request({
        service: 'report-' +  suffix,
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                var pdfReportURL = "source/server/report/reportPDF.php";
                var pdfParams = "?start_date=" + startDate + "&end_date=" + endDate;
                $('#request_pdf').show();

                var wrapper = $("#report-tab-index");
                wrapper.html('');

                for (reportData of response.data) {
                    wrapper.append(reportLoaderCard(reportData));
                }

                $("#report-tab-index").append('<div class="divider"></div>');
            } else {
                Materialize.toast("No se encuentra un reporte para esa fecha", 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

// A generic div wrapper

function divWrapper(id, classes){
    var div = $("<div>");

    div.addClass(classes);
    
    if(id)
        div.attr("id", id);

    return div;
}

// A card title

function cardTitle(id, classes, contents){
    var title = $("<span>");

    title.addClass(classes);
    if(id)
        title.attr("id", id);

    title.append(contents);

    return title;
} 

// General Functions for report generation

function reportHeader(zone, program, module, log, elaborationDate, employeeName, approvalDate, supervisorName){
    var reportCard = divWrapper(null, "card-panel white");
    var titleRow = divWrapper(null, "row");
    var employeeRow = divWrapper(null, "row");
    var supervisorRow = divWrapper(null, "row");
    var moduleRow = divWrapper(null, "row");
    var logTitle = cardTitle(null, "col s12", log);
    var zoneTitle = cardTitle(null, "col s4", "<span class='zone_name'></span>: " + zone);
    var programTitle = cardTitle(null, "col s4", "<span class='program_name'></span>: " + program);
    var moduleTitle = cardTitle(null, "col s4", "<span class='module_name'></span>: " + module);
    var elaborationTitle = cardTitle(null, "col s6", "<span class='elaborated_name'></span>: " + elaborationDate);
    var employeeTitle = cardTitle(null, "col s6", "<span class='made_by'></span>: " + employeeName);
    var approvalTitle = cardTitle(null, "col s6", "<span class='approved_name'></span>: " + approvalDate);
    var supervisorTitle = cardTitle(null, "col s6", "<span class='approved_by'></span>: " + supervisorName);

    titleRow.append(logTitle);
    moduleRow.append(zoneTitle);
    moduleRow.append(programTitle);
    moduleRow.append(moduleTitle);
    employeeRow.append(elaborationTitle);
    employeeRow.append(employeeTitle);
    supervisorRow.append(approvalTitle);
    supervisorRow.append(supervisorTitle);

    reportCard.append(titleRow);
    reportCard.append(moduleRow);
    reportCard.append(employeeRow);
    reportCard.append(supervisorRow);

    return reportCard;
}

function reportHeaderPDF(zone, program, module, log, elaborationDate, employeeName, approvalDate, supervisorName){
    return $("<div><table><tr><td><span class='zone_name'></span>: " + zone + "<br><span class='program_name'></span>: " + program + "<br><span class='module_name'></span>: " + module + "<br><span class='name'></span>: " + log + "</td></tr><tr><td><span class='elaborated_name'></span>: " + elaborationDate + "<br><span class='made_by'></span>: " + employeeName + "<br><span class='approved_name'></span>: " + approvalDate + "<br><span class='approved_by'></span>: " + supervisorName + "</td></tr></table></div><br>");
}
