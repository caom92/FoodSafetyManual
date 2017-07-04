// Wrapper for loading a Log Form. For convenience's sake, this name will
// be shared among all log types

function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-packing-scissors-knives',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingScissorsKnivesLog(report, htmlElement);
                loadFunctionality({"isPrefilled":false});
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    sendGmpPackingScissorsKnivesReport();
                });
                $('.log_title').html($("#log_name").text());
                $("input").characterCounter();
                $(htmlElement).append(report.html_footer);
                changeLanguage();
            } else {
                Materialize.toast("Some error", 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadPrefilledLogForm(htmlElement, data){
    $server.request({
        service: 'authorization-report-gmp-packing-scissors-knives',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                $(htmlElement).html("");
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":report.creation_date},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":report.created_by}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingScissorsKnivesLog(report, htmlElement);
                loadFunctionality({"isPrefilled":true});
                $("#send_report").click(function(){
                    updateGmpPackingScissorsKnivesReport(parseInt(data.report_id));
                });
                changeLanguage();
                $("input").characterCounter();
            } else {
                Materialize.toast("Some error", 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadManual(htmlElement, titleElement){
    $server.request({
        service: 'get-log-manual-url',
        data: {"log-suffix":"gmp-packing-scissors-knives"},
        success: function(response){
            $(titleElement).html(response.data.log_name);
            $(htmlElement).append('<iframe src = "' + $root + 'external/ViewerJS/#../../' + response.data.manual_location + 'actual_manual.pdf" width="100%" height="100%" style="min-height: 300px" allowfullscreen webkitallowfullscreen></iframe>');
            console.log(response);
        }
    });
}

function loadFunctionality(data){
    gmpPackingScissorsKnivesFunctionality(data);
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(data){
    return gmpPackingScissorsKnivesReport(data);
}

function validateLog(){
    var errorCounter = 0;
    var returnValue = false;

    $('.formValidator').each(function(){
        if(!$(this).validate()){
            console.log("Invalid input");
            errorCounter++;
        }
    });

    if(errorCounter == 0){
        returnValue = true;
        Materialize.toast("Bitacora valida", 2500, "rounded");
    } else {
        Materialize.toast("Bitacora no valida", 2500, "rounded");
    }

    return returnValue;
}

function specialClearLog(){
    return;
}

/******************************************************************************
A collection of functions to display the Log Form. This will be related to the
name of the log, located in the name_suffix field on the database. Usually, we
are going to divide them into full log, area log and individual item log.
******************************************************************************/

function sendGmpPackingScissorsKnivesReport(){
    var report = new Object();

    report.date = getISODate(new Date());
    report.notes = $("#report_comment").val();
    report.items = new Array();

    if(validateLog()){
        console.log("Entered group Knives");
        $(".group-card").each(function(){
            console.log("Entered group card");
            var group = new Object();
            var groupID = $(this).data("id");
            group.id = groupID;
            group.time = $("#time_" + groupID).val();
            group.approved = getBool($("input:radio[name='radio_" + groupID + "']:checked").val());
            if($("input[id='returnConditions_" + groupID + "']:checked").length == 1){
                group.condition = true;
            } else {
                group.condition = false;
            }
            group.corrective_action = $("#correctiveAction_" + groupID).val();
            if($("input[id='sanitized_" + groupID + "']:checked").length == 1){
                group.is_sanitized = true;
            } else {
                group.is_sanitized = false;
            }
            report.items.push(group);
        });

        console.log(report);

        $server.request({
            service: 'capture-gmp-packing-scissors-knives',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                    clearLog();
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
                $("#send_report").removeAttr("disabled");
            }
        });
    } else {
        $("#send_report").removeAttr("disabled");
    }
}

function updateGmpPackingScissorsKnivesReport(reportID){
    var report = new Object();

    report.report_id = reportID;
    report.notes = $("#report_comment").val();
    report.items = new Array();

    if(validateLog()){
        console.log("Entered group Knives");
        $(".group-card").each(function(){
            console.log("Entered group card");
            var group = new Object();
            var groupID = $(this).data("id");
            group.id = groupID;
            group.time = $("#time_" + groupID).val();
            group.approved = getBool($("input:radio[name='radio_" + groupID + "']:checked").val());
            if($("input[id='returnConditions_" + groupID + "']:checked").length == 1){
                group.condition = true;
            } else {
                group.condition = false;
            }
            group.corrective_action = $("#correctiveAction_" + groupID).val();
            if($("input[id='sanitized_" + groupID + "']:checked").length == 1){
                group.is_sanitized = true;
            } else {
                group.is_sanitized = false;
            }
            report.items.push(group);
        });

        $server.request({
            service: 'update-gmp-packing-scissors-knives',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte actualizado con exito", 3000, "rounded");
                    $("#content_wrapper").hide();
                    $("#authorizations_wrapper").show();
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
            }
        });
    }
}

function gmpPackingScissorsKnivesLog(data, htmlElement){
    var log = $("<div>");
    var groupsCard = $("<div>");
    var additionalData = $("<div>");

    for(var group of data.items){
        groupsCard.append(gmpPackingScissorsKnivesGroup(group));
    }

    groupsCard.addClass("card-panel white");
    additionalData.addClass("card-panel white");

    additionalData.append(createText({"type":"text","classes":"report_additional_info"}));
    additionalData.append(createInputRow({"columns":[gmpPackingScissorsKnivesComment(data.notes)]}));

    log.append(groupsCard);
    log.append(additionalData);
    log.append($("<div class='row'>").append(createButton(gmpPackingScissorsKnivesSendButton())));

    $(htmlElement).append(log);
}

function gmpPackingScissorsKnivesComment(reportComment){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"comment_title"}};
    var commentInput = {"type":"textarea","id": "report_comment", "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":65535}}};
    var commentFullInput = {"id":"reportCommentWrapper","classes":"input-field col s12 m12 l12","field":commentInput,"label":commentLabel};

    if(reportComment){
        commentInput.value = reportComment;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function gmpPackingScissorsKnivesSendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}}};

    return button;
}

function gmpPackingScissorsKnivesGroup(group){
    var groupCard = $("<div>");
    var titleRow = new Object();
    var topRow = new Object();
    var bottomRow = new Object();

    titleRow.columns = [gmpPackingScissorKnivesTitle(group)];
    topRow.columns = [gmpPackingScissorsKnivesTime(group), gmpPackingScissorsKnivesApproved(group),gmpPackingScissorsKnivesConditions(group)];
    bottomRow.columns = [gmpPackingScissorKnivesGroupCorrectiveAction(group), gmpPackingScissorsKnivesSanitized(group)];

    groupCard.append(createInputRow(titleRow).attr("style", "margin-top:15px;"));
    groupCard.append(createInputRow(topRow).attr("style", "margin-top:15px;"));
    groupCard.append(createInputRow(bottomRow).attr("style", "margin-top:15px;"));

    groupCard.addClass("group-card");
    groupCard.data("id", group.id);
    groupCard.append($("<div class='divider'>"));

    return groupCard;
}

function gmpPackingScissorKnivesTitle(group){
    var groupTitle = {"type":"text","id":"title_" + group.id,"classes":"blue-text", "text":"<span class='group_title'></span> " + group.name + " <span class='with_title'>con</span> " + group.quantity + " <span class='elements_title'>elemento(s)</span>"};
    var titleInput = {"id":"titleWrapper_" + group.id,"classes":"card-title col s12 m12 l12","field": groupTitle};

    return titleInput;
}

function gmpPackingScissorsKnivesTime(group, time){
    var timeLabel = {"type":"label","contents":{"type":"text","classes":"time_title"},"for":"time_" + group.id,"classes":"active"};
    var timeInput = {"type":"input","id": "time_" + group.id, "classes": "validate", "fieldType":"text","disabled":true,"data":{"group_id":group.id},"value":getISOTime(new Date()),"isClearable":false};
    var timeFullInput = {"id":"timeWrapper_" + group.id,"classes":"input-field col s4 m4 l4","field":timeInput,"label":timeLabel};

    if(time){
        timeInput.value = time;
    }

    return timeFullInput;
}

function gmpPackingScissorsKnivesApproved(group){
    var acceptableIcon = {"type":"text","classes":"approved_tag big"};
    var unacceptableIcon = {"type":"text","classes":"unapproved_tag big"};
    var radioApproved = {"type":"radio","id":"approved_" + group.id,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"approved_" + group.id,"contents": acceptableIcon},"data":{"group_id":group.id}};
    var radioUnapproved = {"type":"radio","id":"unapproved_" + group.id,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"unapproved_" + group.id,"contents": unacceptableIcon},"data":{"group_id":group.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"radioGroup_"  + group.id,"classes":"col s12 m12 l12","group":"radio_" + group.id,"radioArray":[radioApproved, radioUnapproved],"validations":{"type":"radio","required":{"value":true},"groupName":"radio_" + group.id}};
    var groupInput = {"id":"radioWrapper_" + group.id,"classes":"col s6 m3 l3","field":itemRadioGroup};

    if(group.approved == 1){
        radioApproved.checked = true;
    } else if (group.approved == 0){
        radioUnapproved.checked = true;
    }

    return groupInput;
}

function gmpPackingScissorsKnivesConditions(group){
    var checkboxLabel = {"type":"label","contents":{"type":"text","classes":"returned_conditions_title"},"for":"returnConditions_" + group.id};
    var checkboxField = {"type":"checkbox", "id":"returnConditions_" + group.id,"classes":"filled-in timeChanger", "data":{"group_id":group.id}};
    var checkboxFullInput = {"field":checkboxField, "label":checkboxLabel,"classes":"col s4 m4 l4"};

    if(group.condition == 1){
        checkboxField.checked = true;
    }

    return checkboxFullInput;
}

function gmpPackingScissorKnivesGroupCorrectiveAction(group){
    var actionLabel = {"type":"label","contents":{"type":"text","classes":"action_title"}};
    var actionInput = {"type":"input","id": "correctiveAction_" + group.id, "classes": "validate timeChanger", "fieldType":"text","data":{"group_id":group.id},"validations":{"type":"text","max":{"value":255}}};
    var actionFullInput = {"id":"correctiveActionWrapper_" + group.id,"classes":"input-field col s8 m8 l8","field":actionInput,"label":actionLabel};

    if(group.corrective_action){
        actionInput.value = group.corrective_action;
        actionLabel.classes = "active";
    }

    return actionFullInput;
}

function gmpPackingScissorsKnivesSanitized(group){
    var checkboxLabel = {"type":"label","contents":{"type":"text","classes":"sanitized_lubricated_title"},"for":"sanitized_" + group.id};
    var checkboxField = {"type":"checkbox", "id":"sanitized_" + group.id,"classes":"filled-in timeChanger", "data":{"group_id":group.id}};
    var checkboxFullInput = {"field":checkboxField, "label":checkboxLabel,"classes":"col s4 m4 l4"};

    if(group.is_sanitized == 1){
        checkboxField.checked = true;
    }

    return checkboxFullInput;
}

function gmpPackingScissorsKnivesFunctionality(data){
    if(data.isPrefilled){
        
    } else {
        $(".timeChanger").change(function(){
            console.log("time change");
            if($(this).data().group_id)
                $("#time_" + $(this).data().group_id).val(getISOTime(new Date()));
        });
    }
}

// Full report

function gmpPackingScissorsKnivesReport(data){
    var report = new Object();

    report.type = "table";
    report.classes = "bordered highlight";
    report.id = "report_" + data.report_id;

    report.thead = gmpPackingScissorsKnivesReportHeader();
    report.tbody = gmpPackingScissorsKnivesReportBody(data);
    //report.tfoot = gmpPackingScissorsKnivesReportFooter(data);

    return report;
}

// Header containing Area, Time, Number, Name, Conditions, Corrective Actions
// and Comment. This header contain the classes to borrow the text from
// languages.xml, not strings

function gmpPackingScissorsKnivesReportHeader(){
    var header = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"time_title timeColumn"},{"type":"th","classes":"group_title groupColumn"},{"type":"th","classes":"quantity_title quantityColumn"},{"type":"th","classes":"approved_title approvedColumn"},{"type":"th","classes":"returned_conditions_title returnedColumn"},{"type":"th","classes":"action_title actionColumn"},{"type":"th","classes":"sanitized_lubricated_title sanitationColumn"}]}]};

    return header;
}

// Body containing all the information, except for the report notes and album
// URL

function gmpPackingScissorsKnivesReportBody(data){
    var body = {"type":"tbody"};

    body.rows = new Array();

    for(var group of data.items){
        var row = {"type":"tr"};
        row.columns = gmpPackingScissorsKnivesReportItem(group)
        body.rows.push(row);
    }

    var reportNotesRow = new Object();

    reportNotesRow.columns = [gmpPackingScissorsKnivesReportNotes(data.notes, 7)];

    body.rows.push(reportNotesRow);

    console.log(body);

    return body;
}

// A row with seven 'td' elements, including the number, name, status,
// corrective action text and comment

function gmpPackingScissorsKnivesReportItem(groupData){
    var group = new Array();

    group.push({"type":"td","classes":"timeColumn","contents":groupData.time});
    group.push({"type":"td","classes":"groupColumn","contents":groupData.name});
    group.push({"type":"td","classes":"quantityColumn","contents":groupData.quantity});
    if(groupData.approved){
        group.push({"type":"td","classes":"approvedColumn yes_tag"});
    } else {
        group.push({"type":"td","classes":"approvedColumn no_tag"});
    }
    if(groupData.condition){
        group.push({"type":"td","classes":"returnedColumn yes_tag"});
    } else {
        group.push({"type":"td","classes":"returnedColumn no_tag"});
    }
    group.push({"type":"td","classes":"actionColumn","contents":groupData.corrective_action});
    if(groupData.is_sanitized){
        group.push({"type":"td","classes":"sanitationColumn yes_tag"});
    } else {
        group.push({"type":"td","classes":"sanitationColumn no_tag"});
    }

    return group;
}

// Notes for the report. They will go in the footer. Colspan equal to the
// number of columns

function gmpPackingScissorsKnivesReportNotes(notes, colspan){
    var reportNotes = {"type":"td","classes":"fullColumn","colspan":colspan,"contents":"<span class='report_notes_title'></span>: " + notes};

    return reportNotes;
}

function getCSS(){
    return '<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .fullColumn { background-color: #D3D3D3; width: 631px; } .groupColumn { width: 116px; } .quantityColumn { width: 40px; } .timeColumn { width: 40px; } .approvedColumn { width: 70px; } .returnedColumn { width: 105px; } .actionColumn { width: 170px; } .sanitationColumn { width: 90px; } </style>';
}