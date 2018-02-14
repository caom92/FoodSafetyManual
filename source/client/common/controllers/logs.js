var orientation = "P";
var fontsize = "10";

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

function clearLog(htmlElement){
    $(".clearable:text").val("");
    $("textarea.clearable").val("");
    $("textarea.clearable").trigger("autoresize");
    $(".clearable[type='date']").val("");
    $("select").material_select("destroy");
    $("select.clearable").each(function() {
        $(this).val($(this).find("option:first").val());
    });
    $("select").material_select();
    $(".clearable:radio").prop("checked", false);
    $(".clearable:checkbox").prop("checked", false);
    specialClearLog();
}

$(function() {
    var getParams = getURLQueryStringAsJSON();

    if(localStorage.role_id == "5" || localStorage.role_id == "3"){
        if(!localStorage.correctiveActionsGMPSSOP){
            $server.request({
                service: 'list-corrective-actions-gmp-packing-preop',
                success: function(response) {
                    if (response.meta.return_code == 0) {
                        localStorage.correctiveActionsGMPSSOP = JSON.stringify(response.data);
                    } else {
                        /*Materialize.toast(response.meta.message, 3000, "rounded");
                        throw response.meta.message;*/
                    }
                }
            });
        }
        if(!localStorage.correctiveActionsGAPSSOP){
            $server.request({
                service: 'list-corrective-actions-gap-packing-preop',
                success: function(response) {
                    if (response.meta.return_code == 0) {
                        localStorage.correctiveActionsGAPSSOP = JSON.stringify(response.data);
                    } else {
                        /*Materialize.toast(response.meta.message, 3000, "rounded");
                        throw response.meta.message;*/
                    }
                }
            });
        }
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
                loadManual("#manual_tab", "#log_title", getParams._);
                if(localStorage.role_id == "5"){
                    loadLogForm("#logs_wrapper");
                    if($.isFunction(additionalLoadReportControls)){
                        additionalLoadReportControls("#additional_controls");
                    }
                } else {
                    $("#logs_tab").remove();
                    $(".logs_tab").parent().remove();
                    $('ul.tabs').tabs();
                    $('.indicator').addClass("green");
                    if($.isFunction(additionalLoadReportControls)){
                        additionalLoadReportControls("#additional_controls");
                    }
                }
                if($.isFunction(pdfReportOrientation)){
                    orientation = pdfReportOrientation()
                }
                if($.isFunction(pdfReportFontsize)){
                    fontsize = pdfReportFontsize()
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
        $("#report-tab-footer").html("");
        $("#report-tab-subject").html("");
    });

    $('ul.tabs').tabs();
    $('.indicator').addClass("green");
    createDatePicker();
    changeLanguage();
    pdfUploader(getParams._);
});

function loadManual(htmlElement, titleElement, suffix){
    $server.request({
        service: 'get-log-manual-url',
        data: {"log-suffix":suffix},
        success: function(response){
            $(titleElement).html(response.data.log_name);
            $(htmlElement).append('<iframe src = "' + $root + 'external/ViewerJS/#../../' + response.data.manual_location + localStorage.zone_name.toLowerCase()  + '/actual_manual.pdf" width="100%" height="100%" style="min-height: 300px" allowfullscreen webkitallowfullscreen></iframe>');
            console.log(response);
            $("#master_wrapper").fadeIn(1000);
        }
    });
}

function pdfUploader(suffix) {
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
                        service: 'upload-manual-' + suffix,
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

function reportLoaderCard(data, footer){
    console.log("REPORT DATA");
    console.log(data);
    var reportCard = $("<div>");
    var cardRow = $("<div>");
    var openIconWrapper = $("<div class='iconContainer col s1 m1 l1'>");
    var reportIconWrapper = $("<div class='iconContainer col s1 m1 l1'>");
    var emailIconWrapper = $("<div class='iconContainer col s1 m1 l1'>");
    var openIcon = $('<i class="mdi mdi-file-document-box mdi-36px green-text"></i>');
    var reportIcon = $('<i class="mdi mdi-file-pdf-box mdi-36px red-text text-darken-4"></i>');
    var emailIcon = $('<i class="mdi mdi-email mdi-36px blue-text"></i>');
    reportIcon.hide();
    emailIcon.hide();

    reportCard.addClass("card-panel white reportCard pdfReport");
    cardRow.addClass("row no-margin-bottom");

    var secretForm = $('<form id="secretForm_' + data.report_id + '" action="source/server/report/reportPDF.php" target="_blank" method="post" hidden>' +
            '<input id="contents_' + data.report_id + '"type="text" name="content" hidden>' + 
            '<input id="css_' + data.report_id + '"type="text" name="style" hidden>' + 
            '<input id="lang_' + data.report_id + '"type="text" name="lang" hidden>' + 
            '<input id="company_' + data.report_id + '"type="text" name="company" hidden>' + 
            '<input id="address_' + data.report_id + '"type="text" name="address" hidden>' + 
            '<input id="logo_' + data.report_id + '"type="text" name="logo" hidden>' + 
            '<input id="signature_' + data.report_id + '"type="text" name="signature" hidden>' + 
            '<input id="supervisor_' + data.report_id + '"type="text" name="supervisor" hidden>' + 
            '<input id="footer_' + data.report_id + '"type="text" name="footer" hidden>' + 
            '<input id="subject_' + data.report_id + '"type="text" name="subject" hidden>' + 
            '<input id="fontsize_' + data.report_id + '"type="text" name="fontsize" hidden>' + 
            '<input id="orientation_' + data.report_id + '"type="text" name="orientation" hidden>' + 
            '<input id="images_' + data.report_id + '"type="text" name="images" hidden>' + 
        '</form>');
    reportCard.append(secretForm);

    var dateDisplay;

    if(data.display_date){
        dateDisplay = data.display_date;
    } else {
        dateDisplay = data.creation_date;
    }

    cardRow.append($("<div class='col s9 m9 l9' style='font-size: 24px;'>").append(dateDisplay));
    reportIconWrapper.append(reportIcon);
    openIconWrapper.append(openIcon);
    emailIconWrapper.append(emailIcon);
    cardRow.append(emailIconWrapper);
    cardRow.append(reportIconWrapper);
    cardRow.append(openIconWrapper);

    reportCard.append(cardRow);
    reportCard.data("report", table(loadReport(data)));
    reportCard.data("raw_report", data);
    reportCard.data("header", reportHeader(data.zone_name, data.module_name, data.program_name, data.log_name, data.creation_date, data.created_by, data.approval_date, data.approved_by));
    reportCard.data("headerPDF", reportHeaderPDF(data.zone_name, data.module_name, data.program_name, data.log_name, data.creation_date, data.created_by, data.approval_date, data.approved_by));
    reportCard.data("images", JSON.stringify(loadImageArray(data)));

    openIcon.css( 'cursor', 'pointer' );
    reportIcon.css( 'cursor', 'pointer' );
    emailIcon.css( 'cursor', 'pointer' );

    openIcon.on("click", function(argument) {
        var iconParent = reportCard;
        console.log("iconParent");
        console.log(iconParent);
        $("#report-tab-footer").html("");
        if(iconParent.hasClass("reportCard")){
            console.log("Has report card");
            iconParent.removeClass("reportCard");
            $(this).removeClass("mdi-file-document-box green-text");
            $(this).addClass("mdi-close-box red-text");
            $(".reportCard").hide(300);
            var tempCard = $("<div>");
            var imageCard = $("<div>");
            tempCard.addClass("card-panel white");
            tempCard.attr("id", "sandboxWrapper_" + data.report_id);
            imageCard.attr("id", "imagesWrapper_" + data.report_id);
            //$("#report-tab-content").hide();
            $("#report-tab-content").html("");
            tempCard.append(iconParent.data("report"));
            console.log("raw_report");
            console.log(iconParent.data("raw_report"));
            if(loadImageArray(iconParent.data("raw_report")) != null){
                imageCard.addClass("card-panel white");
                var imageArray = loadImageArray(iconParent.data("raw_report"));
                console.log("imageArray");
                console.log(imageArray);
                for(var singleImage of imageArray){
                    console.log("singleImage");
                    console.log(singleImage);
                    var tempImage = $("<img>");
                    tempImage.attr("src", singleImage);
                    tempImage.attr("width", "100%");
                    imageCard.append(tempImage);
                }
            }
            var tempHeader = iconParent.data("header");
            tempHeader.attr("id", "headerWrapper_" + data.report_id);
            var tempPDFHeader = iconParent.data("headerPDF");
            tempPDFHeader.attr("id", "headerPDFWrapper_" + data.report_id);
            tempPDFHeader.hide();
            var footerCard = $("<div>");
            footerCard.addClass("card-panel white");
            footerCard.append(footer);
            if(logHasEmail != undefined){
                if(logHasEmail()){
                    $("#report-tab-subject").append($(`<div class="row"><div id="subject_wrapper" class="input-field col s12">
                    <input id="subject" type="text"><label id="subject_label" class="subject" for="subject"></label>
                    </div></div>`));
                }
            }
            $("#report-tab-content").append(tempHeader);
            $("#report-tab-content").append(tempPDFHeader);
            $("#report-tab-content").append(tempCard);
            $("#report-tab-content").append(imageCard);
            $("#report-tab-footer").append(footerCard);
            changeLanguage(localStorage.defaultLanguage, function(){
                reportIcon.show(200);
                if(logHasEmail != undefined){
                    if(logHasEmail()){
                        emailIcon.show(200);
                    }
                }
            });
            //$("#report-tab-content").show(600);
        } else {
            console.log("No report card");
            iconParent.addClass("reportCard");
            $(this).removeClass("mdi-close-box red-text");
            $(this).addClass("mdi-file-document-box green-text");
            $(".reportCard").show(300);
            $("#report-tab-content").html("");
            $("#report-tab-footer").html("");
            $("#report-tab-subject").html("");
            reportIcon.hide(200);
            emailIcon.hide(200);
        }
    });

    reportIcon.on("click", function(argument){
        var iconParent = reportCard;
        var contentObject = {};
        contentObject.header = $("#headerPDFWrapper_" + data.report_id).html();
        contentObject.body = $("#sandboxWrapper_" + data.report_id).html();
        contentObject.footer = "";
        $("#contents_" + data.report_id).val(JSON.stringify([contentObject]));
        $("#css_" + data.report_id).val(getCSS());
        $("#lang_" + data.report_id).val(localStorage.defaultLanguage);
        $("#company_" + data.report_id).val(localStorage.company);
        $("#address_" + data.report_id).val(localStorage.address);
        $("#logo_" + data.report_id).val(localStorage.logo);
        $("#signature_" + data.report_id).val(data.signature_path);
        $("#supervisor_" + data.report_id).val(data.approved_by);
        $("#footer_" + data.report_id).val(footer);
        $("#orientation_" + data.report_id).val(orientation);
        $("#fontsize_" + data.report_id).val(fontsize);
        $("#images_" + data.report_id).val(iconParent.data("images"));
        $("#secretForm_" + data.report_id).submit();
    });

    emailIcon.on("click", function(argument) {
        var emailData = {};
        var contentObject = {};
        contentObject.header = $("#headerPDFWrapper_" + data.report_id).html();
        contentObject.body = $("#sandboxWrapper_" + data.report_id).html();
        contentObject.footer = "";
        emailData.content = JSON.stringify([contentObject]);
        emailData.style = getCSS();
        emailData.lang = localStorage.defaultLanguage;
        emailData.company = localStorage.company;
        emailData.address = localStorage.address;
        emailData.logo = localStorage.logo;
        emailData.signature = data.signature_path;
        emailData.supervisor = data.approved_by;
        emailData.footer = footer;
        emailData.orientation = orientation;
        emailData.fontsize = fontsize;
        emailData.subject = $("#subject").val();
        //$("#images_" + data.report_id).val(images);
        console.log(emailData);
        sendEmail(emailData);
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
        $("#company_" + data.report_id).val(localStorage.company);
        $("#address_" + data.report_id).val(localStorage.address);
        $("#logo_" + data.report_id).val(localStorage.logo);
        $("#signature_" + data.report_id).val(data.signature_path);
        $("#supervisor_" + data.report_id).val(data.approved_by);
        $("#footer_" + data.report_id).val(footer);
        $("#orientation_" + data.report_id).val(orientation);
        $("#fontsize_" + data.report_id).val(fontsize);
        //$("#images_" + data.report_id).val(iconParent.data("images"));
        $("#secretForm_" + data.report_id).submit();
        $("#report-tab-content").html(currentHTML);
    });

    return reportCard;
}

function loadReports(startDate, endDate, suffix){
    var data = new Object();
    data.start_date = startDate;
    data.end_date = endDate;

    console.log("loadReports");

    $(".report_param").each(function() {
        if($(this).data("param_name"))
            data[$(this).data("param_name")] = parseInt($(this).val());
    });

    $("#report-tab-index").html("");
    $("#request_pdf").hide();
    $("#loading_reports").show();

    $server.request({
        service: 'report-' +  suffix,
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                var reports = response.data.reports;
                if(typeof reports != "undefined" && reports != null && reports.length > 0){
                    var pdfReportURL = "source/server/report/reportPDF.php";
                    var pdfParams = "?start_date=" + startDate + "&end_date=" + endDate;
                    $('#request_pdf').show();

                    var wrapper = $("#report-tab-index");
                    wrapper.html('');

                    for (reportData of response.data.reports) {
                        wrapper.append(reportLoaderCard(reportData, response.data.pdf_footer));
                    }

                    $("#loading_reports").hide();
                } else {
                    loadToast("no_approved_reports",3000 ,"rounded");
                    $("#loading_reports").hide();
                }
            } else {
                loadToast("no_approved_reports",3000 ,"rounded");
                $("#loading_reports").hide();
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
    return $("<div><table><tr><td><span class='zone_name'></span>: " + zone + "<br><span class='program_name'></span>: " + program + "<br><span class='module_name'></span>: " + module + "<br><span class='name'></span>: " + log + "</td><td><span class='elaborated_name'></span>: " + elaborationDate + "<br><span class='made_by'></span>: " + employeeName + "<br><span class='approved_name'></span>: " + approvalDate + "<br><span class='approved_by'></span>: " + supervisorName + "</td></tr></table></div><br>");
}
