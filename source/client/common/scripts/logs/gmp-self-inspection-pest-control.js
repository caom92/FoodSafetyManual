// Wrapper for loading a Log Form. For convenience's sake, this name will
// be shared among all log types

function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-self-inspection-pest-control',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPestControlSelfInspectionLog(report, htmlElement, false);
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    if($(this).data("waiting") === false){
                        $(this).data("waiting", true);
                        $("#sending_log").show();
                        sendGmpPestControlSelfInspectionReport();
                    }
                });
                $('.log_title').html(report.log_name);
                $("input").characterCounter();
                $("textarea").characterCounter();
                $(htmlElement).append(report.html_footer);
                changeLanguage();
            } else {
                Materialize.toast(response.meta.message, 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadPrefilledLogForm(htmlElement, data){
    $server.request({
        service: 'authorization-report-gmp-self-inspection-pest-control',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                $(htmlElement).html("");
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPestControlSelfInspectionLog(report, htmlElement, true);
                $("#send_report").click(function(){
                    $(this).attr("disabled", true);
                    $("#sending_log").show();
                    updateGmpPestControlSelfInspectionReport(parseInt(data.report_id));
                });
                bindAuthorizationButtonsFunctionality(htmlElement, data.report_id);
                changeLanguage();
                $("input").characterCounter();
                $("textarea").characterCounter();
                $("textarea").trigger("autoresize");
                window.scrollTo(0, 0);
                $(htmlElement).fadeIn(500);
            } else {
                Materialize.toast(response.meta.message, 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadFunctionality(data){
    //gmpPestControlSelfInspectionFunctionality(data);
    return;
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(data){
    return gmpPestControlSelfInspectionReport(data)
    //return;
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

function sendGmpPestControlSelfInspectionReport(){
    var report = new Object();

    report.date = getISODate(new Date());
    report.notes = $("#report_comment").val();
    report.stations = new Array();

    if(validateLog()){
        $(".item-card").each(function(){
            var station = new Object();
            var itemID = $(this).data("id");
            station.id = itemID;
            station.is_secured = getBool($("input[id='secured_" + itemID +"']:checked").val());
            station.condition = getBool($("input[id='acceptable_" + itemID +"']:checked").val());
            station.activity = getBool($("input[id='activity_" + itemID +"']:checked").val());
            station.corrective_actions = $("#correctiveAction_" + itemID).val();
            report.stations.push(station);
        });

        console.log(report);

        $server.request({
            service: 'capture-gmp-self-inspection-pest-control',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                    clearLog();
                    $('ul.tabs').tabs('select_tab', 'manual_tab');
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
                $("#send_report").removeAttr("disabled");
                $("#send_report").data("waiting", false);
                $("#sending_log").hide();
            }
        });
    } else {
        $("#send_report").removeAttr("disabled");
        $("#send_report").data("waiting", false);
        $("#sending_log").hide();
    }
}

function updateGmpPestControlSelfInspectionReport(reportID){
    var report = new Object();

    report.report_id = reportID;
    report.notes = $("#report_comment").val();
    report.stations = new Array();

    if(validateLog()){
        $(".item-card").each(function(){
            var station = new Object();
            var itemID = $(this).data("id");
            station.id = itemID;
            station.is_secured = getBool($("input[id='secured_" + itemID +"']:checked").val());
            station.condition = getBool($("input[id='acceptable_" + itemID +"']:checked").val());
            station.activity = getBool($("input[id='activity_" + itemID +"']:checked").val());
            station.corrective_actions = $("#correctiveAction_" + itemID).val();
            report.stations.push(station);
        });

        console.log(report);

        $server.request({
            service: 'update-gmp-self-inspection-pest-control',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte actualizado con exito", 3000, "rounded");
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
                $("#send_report").removeAttr("disabled");
                $("#sending_log").hide();
            }
        });
    } else {
        $("#send_report").removeAttr("disabled");
        $("#sending_log").hide();
    }
}

function gmpPestControlSelfInspectionLog(data, htmlElement, isPrefilled){
    var log = $("<div>");
    var areasCard = $("<div>");
    var additionalData = $("<div>");
    var buttonRow = $("<div>");

    for(var room of data.rooms){
        console.log(room);
        areasCard.append(gmpPestControlSelfInspectionArea(room));
    }

    additionalData.addClass("card-panel white");

    additionalData.append(createText({"type":"text","classes":"report_additional_info"}));
    additionalData.append(createInputRow({"columns":[gmpPestControlSelfInspectionComment(data.notes)]}));

    log.append(areasCard);
    log.append(additionalData);

    buttonRow.attr("id", "button_row");
    buttonRow.addClass("row");
    buttonRow.append(createButton(sendButton()));
    
    if(isPrefilled === true){
        buttonRow.append(createButton(approveButton()));
        buttonRow.append(createButton(rejectButton()));
        buttonRow.append(createButton(returnButton()));
    }

    log.append(buttonRow);

    $(htmlElement).append(log);
}

function gmpPestControlSelfInspectionComment(reportComment){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"comment_title"}};
    var commentInput = {"type":"textarea","id": "report_comment", "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":65535,"toast":"gmp-packing-preop-report-notes"}}};
    var commentFullInput = {"id":"reportCommentWrapper","classes":"input-field col s12 m12 l12","field":commentInput,"label":commentLabel};

    if(reportComment){
        commentInput.value = reportComment;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function sendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}},"align":"col s3 m3 l3","data":{"waiting":false}};

    return button;
}

function gmpPestControlSelfInspectionArea(area){
    var areaCard = $("<div>");
    var title = $("<div>");

    areaCard.addClass("card-panel white area-card");
    areaCard.data("id", area.id);

    title.addClass("card-title");
    title.append(createIcon({"type":"icon","icon":"mdi-cube-outline","size":"mdi-18px","color":"blue-text", "text":{"type":"text","classes":"blue-text","text":area.name}}));
    areaCard.append(title);

    for(var station of area.stations){
        areaCard.append(gmpPestControlSelfInspectionItem(station));
    }

    areaCard.attr("id", "area_card_" + area.id);
    areaCard.addClass("area-card card-panel white");
    areaCard.data("id", area.id);

    return areaCard;
}

function gmpPestControlSelfInspectionItem(station){
    var itemCard = $("<div>");
    var nameRow = new Object();
    var topRow = new Object();
    var bottomRow = new Object();

    nameRow.columns = [gmpPestControlSelfInspectionItemTitle(station)];
    topRow.columns = [gmpPestControlSelfInspectionItemSecured(station), gmpPestControlSelfInspectionItemCondition(station), gmpPestControlSelfInspectionItemActivity(station)];
    bottomRow.columns = [/*gmpPestControlSelfInspectionItemPests(station), gmpPestControlSelfInspectionItemOther(station), */gmpPestControlSelfInspectionItemCorrectiveAction(station)];

    itemCard.append(createInputRow(nameRow));
    itemCard.append(createInputRow(topRow));
    itemCard.append(createInputRow(bottomRow).attr("style", "margin-top:15px;"));

    itemCard.addClass("card-panel white item-card");
    itemCard.attr("id", "station_" + station.id);
    itemCard.data("id", station.id);

    return itemCard;
}

function gmpPestControlSelfInspectionItemTitle(item){
    var itemTitle = {"type":"text","id":"title_" + item.id,"classes":"", "text":item.name};
    var titleInput = {"id":"titleWrapper_" + item.id,"classes":"card-title col s12 m12 l12","field": itemTitle};

    return titleInput;
}

function gmpPestControlSelfInspectionItemSecured(item){
    var statusLabel = {"type": "label","contents": {"type":"text","classes":"secured_title"}};
    var acceptableIcon = {"type":"text","classes":"yes_tag big"};
    var unacceptableIcon = {"type":"text","classes":"no_tag big"};
    var radioAcceptable = {"type":"radio","id":"secured_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"secured_" + item.id,"contents": acceptableIcon},"data":{"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"unsecured_" + item.id,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"unsecured_" + item.id,"contents": unacceptableIcon},"data":{"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"secured_radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"secured_radio_" + item.id,"radioArray":[radioAcceptable, radioUnacceptable],"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-preop-item-status"},"groupName":"secured_radio_" + item.id},"label":statusLabel};
    var groupInput = {"id":"secured_radioWrapper_" + item.id,"classes":"col s4 m4 l4","field":itemRadioGroup};

    if(item.secured == 1){
        radioAcceptable.checked = true;
    } else if (item.secured == 0){
        radioUnacceptable.checked = true;
    }

    return groupInput;
}

function gmpPestControlSelfInspectionItemCondition(item){
    var statusLabel = {"type": "label","contents": {"type":"text","classes":"status_title"}};
    var acceptableIcon = {"type":"text","classes":"acceptable_tag big"};
    var unacceptableIcon = {"type":"text","classes":"unacceptable_tag big"};
    var radioAcceptable = {"type":"radio","id":"acceptable_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"acceptable_" + item.id,"contents": acceptableIcon},"data":{"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"unacceptable_" + item.id,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"unacceptable_" + item.id,"contents": unacceptableIcon},"data":{"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"condition_radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"conditio_radio_" + item.id,"radioArray":[radioAcceptable, radioUnacceptable],"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-preop-item-status"},"groupName":"conditio_radio_" + item.id},"label":statusLabel};
    var groupInput = {"id":"condition_radioWrapper_" + item.id,"classes":"col s4 m4 l4","field":itemRadioGroup};

    if(item.condition == 1){
        radioAcceptable.checked = true;
    } else if (item.condition == 0){
        radioUnacceptable.checked = true;
    }

    return groupInput;
}

function gmpPestControlSelfInspectionItemActivity(item){
    var statusLabel = {"type": "label","contents": {"type":"text","classes":"activity_title"}};
    var acceptableIcon = {"type":"text","classes":"yes_tag big"};
    var unacceptableIcon = {"type":"text","classes":"no_tag big"};
    var radioAcceptable = {"type":"radio","id":"activity_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"activity_" + item.id,"contents": acceptableIcon},"data":{"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"no_activity_" + item.id,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"no_activity_" + item.id,"contents": unacceptableIcon},"data":{"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"activity_radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"activity_radio_" + item.id,"radioArray":[radioAcceptable, radioUnacceptable],"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-preop-item-status"},"groupName":"activity_radio_" + item.id},"label":statusLabel};
    var groupInput = {"id":"activity_radioWrapper_" + item.id,"classes":"col s4 m4 l4","field":itemRadioGroup};

    if(item.activity == 1){
        radioAcceptable.checked = true;
    } else if (item.activity == 0){
        radioUnacceptable.checked = true;
    }

    return groupInput;
}

function gmpPestControlSelfInspectionItemPests(item){
    var checkboxLabel = {"type":"label","contents":{"type":"text","classes":"pests_title"},"for":"pests_" + item.id};
    var checkboxField = {"type":"checkbox", "id":"pests_" + item.id,"classes":"filled-in timeChanger", "data":{"group_id":item.id}};
    var checkboxFullInput = {"field":checkboxField, "label":checkboxLabel,"classes":"col s3 m3 l3"};

    return checkboxFullInput;
}

function gmpPestControlSelfInspectionItemOther(item){
    var checkboxLabel = {"type":"label","contents":{"type":"text","classes":"other_title"},"for":"other_" + item.id};
    var checkboxField = {"type":"checkbox", "id":"other_" + item.id,"classes":"filled-in timeChanger", "data":{"group_id":item.id}};
    var checkboxFullInput = {"field":checkboxField, "label":checkboxLabel,"classes":"col s3 m3 l3"};

    return checkboxFullInput;
}

function gmpPestControlSelfInspectionItemCorrectiveAction(item){
    var actionLabel = {"type":"label","contents":{"type":"text","classes":"action_title"}};
    var actionInput = {"type":"input","id": "correctiveAction_" + item.id, "classes": "validate timeChanger", "fieldType":"text","data":{"item_id":item.id},"validations":{"type":"text","max":{"value":255}}};
    var actionFullInput = {"id":"correctiveActionWrapper_" + item.id,"classes":"input-field col s12 m12 l12","field":actionInput,"label":actionLabel};

    if(item.corrective_actions){
        actionInput.value = item.corrective_actions;
        actionLabel.classes = "active";
    }

    return actionFullInput;
}

function gmpPestControlSelfInspectionFunctionality(data){
    console.log("Cargando funcionalidad");
}

// Full report

function gmpPestControlSelfInspectionReport(data){
    var report = new Object();

    report.type = "table";
    report.classes = "bordered highlight";
    report.id = "report_" + data.report_id;

    report.thead = gmpPestControlSelfInspectionHeader();
    report.tbody = gmpPestControlSelfInspectionBody(data);
    
    console.log(JSON.stringify(report));
    console.log(report);

    return report;
}

// Header containing Area, Time, Number, Name, Conditions, Corrective Actions
// and Comment. This header contain the classes to borrow the text from
// languages.xml, not strings

function gmpPestControlSelfInspectionHeader(){
    var header = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"number_title numberColumn"},{"type":"th","classes":"area_title areaColumn"},{"type":"th","classes":"secured_title securedColumn"},{"type":"th","classes":"status_title statusColumn"},{"type":"th","classes":"activity_title activityColumn"},{"type":"th","classes":"action_title actionColumn"}]}]};

    return header;
}

// Body containing all the information, except for the report notes and album
// URL

function gmpPestControlSelfInspectionBody(data){
    var body = {"type":"tbody"};

    body.rows = new Array();

    for(var room of data.rooms){
        var row = {"type":"tr"};
        row.columns = new Array();
        row.columns.push(gmpPestControlSelfInspectionReportRoomTitle(room.name, 6));
        body.rows.push(row);

        for(var station of room.stations){
            var itemRow = {"type":"tr"};
            itemRow.columns = gmpPestControlSelfInspectionReportItem(station);
            body.rows.push(itemRow);
        }
    }

    var reportNotesRow = {"type":"tr"};
    reportNotesRow.columns = [gmpPestControlSelfInspectionReportNotes(data.notes, 6)];

    body.rows.push(reportNotesRow);

    return body;
}

function gmpPestControlSelfInspectionReportRoomTitle(room, colspan){
    var roomTitle = {"type":"td","classes":"fullColumn","colspan":colspan,"contents":room};

    return roomTitle;
}

function gmpPestControlSelfInspectionReportItem(itemData){
    var item = new Array();

    item.push({"type":"td","classes":"numberColumn","contents":itemData.order});
    item.push({"type":"td","classes":"areaColumn","contents":itemData.name});
    if(itemData.secured == 1){
        item.push({"type":"td","classes":"securedColumn yes_tag"});
    } else {
        item.push({"type":"td","classes":"securedColumn no_tag"});
    }
    if(itemData.condition == 1){
        item.push({"type":"td","classes":"statusColumn acceptable_tag"});
    } else {
        item.push({"type":"td","classes":"statusColumn unacceptable_tag"});
    }
    if(itemData.activity == 1){
        item.push({"type":"td","classes":"activityColumn yes_tag"});
    } else {
        item.push({"type":"td","classes":"activityColumn no_tag"});
    }
    item.push({"type":"td","classes":"actionColumn","contents":itemData.corrective_actions});

    console.log(item);

    return item;
}

function gmpPestControlSelfInspectionReportNotes(notes, colspan){
    var reportNotes = {"type":"td","classes":"fullColumn","colspan":colspan,"contents":"<span class='report_notes_title'></span>: " + notes};

    return reportNotes;
}

// Footer

function gmpPestControlSelfInspectionFooter(data){

}

function getCSS(){
    return '<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .even { background-color: #b8e0b9; } .typeTitle { background-color: yellow; width: 588px; } .fullColumn { background-color: #D3D3D3; width: 631px; } .numberColumn { width: 47px; } .areaColumn { width: 195px; } .securedColumn { width: 75px; } .statusColumn { width: 100px; } .activityColumn { width: 70px; } .actionColumn { width: 144px; }</style>';
}
