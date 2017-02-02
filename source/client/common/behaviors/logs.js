function createDatePicker(){
    $("#report_date_start").html("");
    $("#report_date_end").html("");
    $("#report_date_start").append('<input id="start_date" type="date" class="datepicker"><label id="start_date_label" class="select_start_date active" for="start_date"></label>');
    $("#start_date").pickadate(datePicker("start_hidden", new Date(), new Date("2016-10-01T00:00:00")));
    $("#report_date_end").append('<input id="end_date" type="date" class="datepicker"><label id="end_date_label" class="select_end_date active" for="end_date"></label>');
    $("#end_date").pickadate(datePicker("end_hidden", new Date(), new Date("2016-10-01T00:00:00")));
}

$(function (){
    // First we change the title to that of the current

    var getParams = getURLQueryStringAsJSON();
    $.getScript( "source/client/common/scripts/logs/form-creator.js", function( data, textStatus, jqxhr ) {
        $.getScript( "source/client/common/scripts/logs/" + getParams._ + ".js", function( data, textStatus, jqxhr ) {
            console.log("Load of " +  getParams._);
            loadLogForm("#logs_tab");
        });
    });    

    $('ul.tabs').tabs();
    $('.indicator').addClass("green");
    createDatePicker();

    $server.request({
        service: 'list-corrective-actions',
        success: function(response) {
            if (response.meta.return_code == 0) {
                localStorage.correctiveActionsSSOP = JSON.stringify(response.data);
                console.log(response.data);
                console.log(JSON.stringify(response.data));
            } else {
                Materialize.toast("Some error", 3000, "rounded");
                throw response.meta.message;
            }
        }
    });

    if(localStorage.role_id == "3" || localStorage.role_id == "4" || localStorage.role_id == "5"){
        changeLanguage(localStorage.defaultLanguage);
    } else {
        $("#logs_tab").remove();
        $(".logs_tab").parent().remove();
        $('ul.tabs').tabs();
        $('.indicator').addClass("green");
        $(".log_title").html("Pre-Operational Inspection");
        changeLanguage(localStorage.defaultLanguage);
    }

    $("#request_report").click(function(){
        loadSSOPReport(
            $("input[name='start_hidden']").val(),
            $("input[name='end_hidden']").val()
        );
    });

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
});

// Function array

function reportTable(id, classes, header, body, footer){
    var table = $("<table>");

    table.addClass(classes);

    if(id)
        table.attr("id", id);

    table.append(header);
    table.append(body);
    // table.append(footer);

    return table;
}

function reportBody(id, classes, rowsArray){

    var body = $("<tbody>");

    body.addClass(classes);

    if(id)
        body.attr("id", id);

    rowsArray.forEach(function(index){
        body.append(reportRow(id, classes, index));
    });

    return body;
}

function reportFooter(){

}

function reportTitle(id, classes, titleArray){
    // Title Array must be as follows
    // An array of objects with attributes classes and colspan
    // Classes will be the classes added to the <th>
    // colspan will be the number of columns the <th> will span
    // {classes: "class", colspan: 2}

    var header = $("<thead>");
    var headerRow = $("<tr>");

    headerRow.addClass(classes);

    if(id)
        headerRow.attr("id", id);

    titleArray.forEach(function(index){
        var th = $("<th>");
        th.addClass(index.classes);

        if(index.colspan){
            th.attr("colspan", index.colspan);
        }

        headerRow.append(th);
    });

    header.append(headerRow);

    return header;
}

function reportRow(id, classes, columnArray){
    // Column Array must be as follows
    // An array of objects with attributes classes, rowspan and contents
    // Classes will be the classes added to the <td>
    // rowspan will be the rows the <td> will span
    // contents will be the contents to be shown on the <td>
    // {classes: "class", rowspan: 2, contents: "Hello World"}

    var row = $("<tr>");

    row.addClass(classes);

    if(id)
        row.attr("id", id);

    columnArray.forEach(function(column){
        row.append(reportRowColumn(column));
    });

    return row;
}

function reportRowColumn(columnObject){
    // Column Array must be as follows
    // A singlem object with attributes
    // Classes will be the classes added to the <td>
    // rowspan will be the rows the <td> will span
    // contents will be the contents to be shown on the <td>
    // {classes: "class", rowspan: 2, contents: "Hello World"}

    var column = $("<td>");

    column.addClass(columnObject.classes);

    if(columnObject.rowspan)
        column.attr("rowspan", columnObject.rowspan);

    if(columnObject.colspan)
        column.attr("colspan", columnObject.colspan);

    column.append(columnObject.contents);

    return column;
}

function loadSSOPReport(startDate, endDate){
    var report = new Object();
    report.start_date = startDate;
    report.end_date = endDate;

    $server.request({
        service: 'report-gmp-packing-preop',
        data: report,
        success: function(response) {
            if (response.meta.return_code == 0) {
                $('#request_pdf').attr(
                    'href', 
                    'source/server/report/reportPDF.php?' + 
                    'start_date=' + startDate +
                    '&end_date=' + endDate
                );
                $('#request_pdf').show();

                var wrapper = $('#report-tab-index');
                wrapper.html('');
                wrapper.append('<div class="card"><div class="card-content>"')
                wrapper.append('<ul>');
                sessionStorage.reportData = JSON.stringify(response.data);
                for (reportData of response.data) {
                    wrapper.append(
                        '<li><a href="#!" class="log-button">' + 
                        reportData.creation_date + 
                        '</a></li>'
                    );
                }
                wrapper.append('</div></div></ul>');
                $("#report_tab").append(wrapper);
                $('a.log-button').on('click', function(event) {
                    event.preventDefault();
                    var wrapper = divWrapper(null, null);
                    var reportWrapper = divWrapper(null, "card-panel white");

                    var date = $(this).text();
                    var reportData = null;
                    var reports = JSON.parse(sessionStorage.reportData);
                    for (report of reports) {
                        if (report.creation_date == date) {
                            reportData = report;
                            break;
                        }
                    }

                    console.log(reportData);

                    wrapper.append(reportHeader(reportData.zone_name, reportData.module_name, reportData.program_name, reportData.log_name, reportData.creation_date, reportData.created_by, reportData.approval_date, reportData.approved_by));

                    $('#report-tab-index').hide();
                    $("#report-tab-content").html(wrapper);

                    var report = divWrapper(null, null);
                    
                    var headers = [
                        {"classes":"area_title areaColumn"},
                        {"classes":"time_title timeColumn"},
                        {"classes":"number_title numberColumn"},
                        {"classes":"name_title nameColumn"},
                        {"classes":"status_title statusColumn"},
                        {"classes":"action_title actionColumn"},
                        {"classes":"comment_title commentColumn"}
                    ];

                    var reportContents = new Array(); // Type Row Array

                    reportData.areas.forEach(function(area) {
                        var isFirst = true;
                        var firstRow = new Array(); // Type Row

                        var areaRows = 0;

                        area.types.forEach(function(type) {
                            areaRows += type.items.length + 1;
                        });

                        console.log(areaRows);

                        firstRow.push({rowspan: areaRows, contents: area.name, classes: "areaColumn"});
                        firstRow.push({rowspan: areaRows, contents: area.time, classes: "timeColumn"});

                        console.log(area.area_name);
                        area.types.forEach(function(type) {
                            if (isFirst) {
                                firstRow.push({colspan: headers.length - 2,  contents: type.name, classes: "typeTitle"});
                                reportContents.push(firstRow);
                                isFirst = false;
                            } else {
                                reportContents.push([{colspan: headers.length - 2, contents: type.name, classes: "typeTitle"}]);
                            }
                            console.log(type.name);
                            type.items.forEach(function(item){
                                var tempRow = new Array();

                                tempRow.push({contents: item.order, classes: "numberColumn"});
                                tempRow.push({contents: item.name, classes: "nameColumn"});

                                if(item.status == 1){
                                    tempRow.push({classes: "acceptable_tag statusColumn"});
                                } else {
                                    tempRow.push({classes: "unacceptable_tag statusColumn"});
                                }

                                tempRow.push({contents: item.corrective_action, classes: "actionColumn"});
                                tempRow.push({contents: item.comment, classes: "commentColumn"});

                                reportContents.push(tempRow);
                                console.log(item.name);
                            });
                        });
                        var notesRow = new Array();
                        var personRow = new Array();

                        notesRow.push({colspan: headers.length, contents: "<span class='bold notes_title'></span>: " + area.notes, classes: "fullColumn"});
                        personRow.push({colspan: headers.length, contents: "<span class='bold person_performing_sanitation_title'></span>: " + area.person_performing_sanitation, classes: "fullColumn"});

                        reportContents.push(notesRow);
                        reportContents.push(personRow);
                    });
                    
                    console.log("IMPRIMIR CONTENIDOS");
                    console.log(reportContents);
                    console.log(JSON.stringify(reportContents));

                    // Append everything

                    var repTable = reportTable(null, "bordered", reportTitle(null, null, headers), reportBody(null, null, reportContents), null);

                    reportWrapper.append(repTable);
                    var reportLink = divWrapper(null, null);
                    //reportLink.append($('<div class="center-align"><a target="_blank" href="source/server/report/reportPDF.php?start_date=' + startDate + '&end_date=' + endDate + '" class="waves-effect waves-light btn"><span class="view_pdf"></span>  <i class="mdi mdi-file-pdf mdi-18px"></i></a><div>'));
                    wrapper.append(reportWrapper);
                    wrapper.append(reportLink);
                    wrapper.append(
                        '<a id="log-return" href="#!" class="waves-effect ' +
                        'waves-light btn">' +
                        '<i class="mdi mdi-arrow-left"></i>Go Back' +
                        '</a>'
                    );
                    $('a#log-return').on('click', function(event) {
                        event.preventDefault();
                        $('#report-tab-index').show();
                        $('#report-tab-content').html('');
                    });

                    $('#request_pdf').attr(
                        'href', 
                        'source/server/report/reportPDF.php?' + 
                        'start_date=' + date +
                        '&end_date=' + date
                    );
                    changeLanguage(localStorage.defaultLanguage);
                });
            } else {
                Materialize.toast("No se encuentra un reporte para esa fecha", 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

<<<<<<< HEAD
function testReportService(){
    var report = new Object();
    report.start_date = "2016-11-24";
    report.end_date = "2016-11-24";
    console.log(report);
    $server.request({
        service: 'report-gmp-packing-preop',
        data: report,
        success: function(response) {
            if (response.meta.return_code == 0) {
                console.log(response.data);
                console.log(JSON.stringify(response.data));
            } else {
                Materialize.toast("Reporte no enviado, verifique la red", 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function sendSSOPReport(){
    var report = new Object();
    var hardware_log = new Array();
    var area_log = new Array();
    report.user_id = localStorage.user_id;
    report.date = getISODate(new Date());
    
    var idArray = new Array();
    var areaArray = new Array();


    // Get Area IDs
    $("div[id^='area_report_']").each(function(index){
        var tag = $(this).attr("id");
        var id = tag.match(/[0-9]+/g);
        areaArray.push(id[0]);
    });

    areaArray.forEach(function(areaID){
        var area = new Object();

        area.time = $("#area_time_" + areaID).val();
        area.area_id = Number(areaID);
        area.item_logs = new Array();

        idArray = new Array();
        hardware_log = new Array();

        // We get all item id, we treat each one with their respective area
        $("input[id^='acceptable_']").each(function(index){
            var tag = $(this).attr("id");
            var id = tag.match(/[0-9]+/g);
            if(areaID == id[1]){
                var hardware = new Object();

                hardware.item_id = Number(id[0]);
                hardware.is_acceptable = getBool($("input:radio[name='radio_" + id[0] +"_" + id[1] +"']:checked").val());
                if(hardware.is_acceptable === false) {
                    hardware.is_acceptable = false;
                    hardware.corrective_action_id = Number($("#select_" + id[0] + "_" + id[1]).val());
                } else {
                    hardware.is_acceptable = true;
                    hardware.corrective_action_id = 1;
                }
                hardware.comment = $("#comment_" + id[0] + "_" + id[1]).val();

                hardware_log.push(hardware);
            }
        });

        area.item_logs = hardware_log;

        area.notes = $("#area_notes_" + areaID).val();
        area.person_performing_sanitation = $("#area_sanitation_" + areaID).val();

        area_log.push(area);
    });

    report.area_log = area_log;

    $server.request({
        service: 'capture-gmp-packing-preop',
        data: report,
        success: function(response) {
            if (response.meta.return_code == 0) {
                Materialize.toast("Reporte enviado con exito", 3000, "rounded");
            } else {
                Materialize.toast(
                    response.meta.message,
                    //"Reporte no enviado, verifique la red", 
                    3000, 
                    "rounded"
                );
                //throw response.meta.message;
            }
        }
    });

    console.log(report);
    console.log(JSON.stringify(report));
}

function SSOPTypeTitle(type){
    var title = $("<div>");
    title.attr("style", "font-weight: bold;");
    title.append(type);
    return title;
}

function SSOPPreoperativeItem(item, areaID){
    var cActions = JSON.parse(localStorage.correctiveActionsSSOP);

    var itemCard = divWrapper(null, "card-panel white");
    var firstRow = divWrapper(null, "row");
    var secondRow = divWrapper(null, "row");
    var title = cardTitle(null, "card-title col s4", item.name);
    var acceptable = logRadioButtonInput("acceptable_" + item.id + "_" + areaID, null, logLabel(null, "col s4", "acceptable_" + item.id + "_" + areaID, '<i class="mdi mdi-checkbox-marked-circle mdi-18px green-text"></i>'), "radio_" + item.id + "_" + areaID, true);
    var unacceptable = logRadioButtonInput("unacceptable_" + item.id + "_" + areaID, null, logLabel(null, "col s4", "unacceptable_" + item.id + "_" + areaID, '<i class="mdi mdi-close-circle mdi-18px red-text"></i>'), "radio_" + item.id + "_" + areaID, false);
    var status = logRadioButtonGroup("radio_" + item.id + "_" + areaID, "col s4", [acceptable, unacceptable]);
    var actionOptions = new Array();
    var actionEmpty = logSelectOption(null, "select_corrective_action", "", true, true, null);
    actionOptions.push(actionEmpty);
    cActions.forEach(function(option){
        var tempAction = logSelectOption(null, null, String(option.id), false, false, option.name);
        actionOptions.push(tempAction);
    });
    //var actionNone = logSelectOption(null, null, cActions[0].id, false, false, cActions[0].name);
    //var actionRC = logSelectOption(null, null, cActions[1].id, false, false, cActions[1].name);
    //var actionWSR = logSelectOption(null, null, cActions[2].id, false, false, cActions[2].name);
    var actionsSelect = logSelectInput("select_" + item.id + "_" + areaID, "input-field col s4", actionOptions, logLabel(null, "action_title", "select_" + item.id + "_" + areaID, 'Acción correctiva'));
    var comments = logTextField("comment_wrapper_" + item.id + "_" + areaID, logTextInput("comment_" + item.id + "_" + areaID, "validate", "text", null), logLabel(null, null, "comment_" + item.id + "_" + areaID, "Comentarios"), "input-field col s12");

    // console.log("Ay lmao" + item["item_name"]);
    comments.hide();
    actionsSelect.hide();

    firstRow.append(title);
    firstRow.append(status);
    firstRow.append(actionsSelect);

    secondRow.append(comments);

    itemCard.append(firstRow);
    itemCard.append(secondRow);

    return itemCard;
}

// General functions for date/time formatting

function getISODate(date){
    var ISODate = "";

    ISODate += date.getFullYear() + "-";

    if((date.getMonth() + 1) < 9){
        ISODate += "0" + (date.getMonth() + 1)+ "-";
    } else {
        ISODate += (date.getMonth() + 1) + "-";
    }

    if(date.getDate()<9){
        ISODate += "0" + date.getDate();
    } else {
        ISODate += date.getDate();
    }

    return ISODate;
}

function getISOTime(date){
    var ISOTime = "";

    if(date.getHours()<10){
        ISOTime += "0" + date.getHours() + ":";
    } else {
        ISOTime += date.getHours() + ":";
    }

    if(date.getMinutes()<10){
        ISOTime += "0" + date.getMinutes();
    } else {
        ISOTime += date.getMinutes();
    }
/*
    if(date.getSeconds()<10){
        ISOTime += "0" + date.getSeconds();
    } else {
        ISOTime += date.getSeconds();
    }*/
    
    return ISOTime;
}

function getBool(val) {
    var num;
    return val != null && (!isNaN(num = +val) ? !!num : !!String(val).toLowerCase().replace(!!0, ''));
}

// General functions for form creation

// A header containing the information of the current report, including who made it, the date,
// Zone and program

function logHeader(zone, program, module, log, date, employeeName){
    var reportCard = divWrapper(null, "card-panel white");
    var titleRow = divWrapper(null, "row");
    var infoRow = divWrapper(null, "row");
    var moduleRow = divWrapper(null, "row");
    var logTitle = cardTitle(null, "col s12", log);
    var zoneTitle = cardTitle(null, "col s4", "<span class='zone_name'></span>: " + zone);
    var programTitle = cardTitle(null, "col s4", "<span class='program_name'></span>: " + program);
    var moduleTitle = cardTitle(null, "col s4", "<span class='module_name'></span>: " + module);
    var date = cardTitle(null, "col s4", "<span class='date_name'></span>: " + date);
    var employeeName = cardTitle(null, "col s4", "<span class='made_by'></span>: " + employeeName);

    titleRow.append(logTitle);
    moduleRow.append(zoneTitle);
    moduleRow.append(programTitle);
    moduleRow.append(moduleTitle);
    infoRow.append(date);
    infoRow.append(employeeName);

    reportCard.append(titleRow);
    reportCard.append(moduleRow);
    reportCard.append(infoRow);

    return reportCard;
}

=======
>>>>>>> miracle
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

// A generic send button. This function only returns 

function sendButton(id){
    return $('<div class="center-align"><a id="' + id + '" class="waves-effect waves-light btn"><span class="send_button"></span>  <i class="mdi mdi-send mdi-18px"></i></a><div>');
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

function table(id, classes){
    var table = $("<table>");

    table.addClass(classes);

    if(id)
        table.attr("id", id);

    return table;
}

function tableRow(id, classes, contents){
    var row = $("<tr>");

    row.addClass(classes);

    if(id)
        row.attr("id", id);

    contents.forEach(function(index){
        row.append(rowColumn(null, null, index));
    });

    return row;
}

function rowColumn(id, classes, contents){
    var row = $("<td>");

    row.addClass(classes);

    if(id)
        row.attr("id", id);

    row.append(contents);

    return row;
}

function headerColumn(id, classes, contents){
    var row = $("<th>");

    row.addClass(classes);

    if(id)
        row.attr("id", id);

    row.append(contents);

    return row;
}

function tableHeader(id, classes, contents){
    var col = $("<tr>");

    col.addClass(classes);

    if(id)
        col.attr("id", id);

    contents.forEach(function(index){
        col.append(headerColumn(null, null, index));
    });

    return col;
}