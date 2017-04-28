function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-pest-control-self-inspection',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPestControlSelfInspectionLog(report, htmlElement);
                $("#send_report").click(function(){
                    sendGmpPestControlSelfInspectionReport();
                });
                $('.log_title').html($("#log_name").text());
                $("input").characterCounter();
                changeLanguage();
            } else {
                Materialize.toast("Some error", 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadPrefilledLogForm(htmlElement, data){
    return;
}

function loadManual(htmlElement, titleElement){
    $server.request({
        service: 'get-log-manual-url',
        data: {"log-suffix":"gmp-pest-control-self-inspection"},
        success: function(response){
            $(titleElement).html(response.data.log_name);
            $(htmlElement).append('<iframe src = "' + $root + 'external/ViewerJS/#../../' + response.data.manual_location + 'actual_manual.pdf" width="100%" height="100%" style="min-height: 300px" allowfullscreen webkitallowfullscreen></iframe>');
            console.log(response);
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
    return;
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

    if(validateLog() || true){
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
            service: 'capture-gmp-pest-control-self-inspection',
            data: report,
            success: function(response){
                if (response.meta.return_code == 0) {
                    Materialize.toast("Reporte enviado con exito", 3000, "rounded");
                } else {
                    Materialize.toast(response.meta.message, 3000, "rounded");
                }
            }
        });
    }
}

function gmpPestControlSelfInspectionLog(data, htmlElement){
    var log = $("<div>");
    var areasCard = $("<div>");
    var additionalData = $("<div>");

    for(var room of data.rooms){
        console.log(room);
        areasCard.append(gmpPestControlSelfInspectionArea(room));
    }

    additionalData.addClass("card-panel white");

    additionalData.append(createText({"type":"text","classes":"report_additional_info"}));
    additionalData.append(createInputRow({"columns":[gmpPestControlSelfInspectionComment(data.notes)]}));

    log.append(areasCard);
    log.append(additionalData);
    log.append($("<div class='row'>").append(createButton(gmpPestControlSelfInspectionSendButton())));

    $(htmlElement).append(log);
}

function gmpPestControlSelfInspectionComment(reportComment){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"comment_title"}};
    var commentInput = {"type":"input","id": "report_comment", "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":80,"toast":"gmp-packing-preop-report-notes"}}};
    var commentFullInput = {"id":"reportCommentWrapper","classes":"input-field col s12 m12 l12","field":commentInput,"label":commentLabel};

    if(reportComment){
        commentInput.value = reportComment;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function gmpPestControlSelfInspectionSendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}}};

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
    bottomRow.columns = [gmpPestControlSelfInspectionItemPests(station), gmpPestControlSelfInspectionItemOther(station), gmpPestControlSelfInspectionItemCorrectiveAction(station)];

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

    if(item.status == 1){
        radioAcceptable.checked = true;
    } else if (item.status == 0){
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

    if(item.status == 1){
        radioAcceptable.checked = true;
    } else if (item.status == 0){
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

    if(item.status == 1){
        radioAcceptable.checked = true;
    } else if (item.status == 0){
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
    var actionInput = {"type":"input","id": "correctiveAction_" + item.id, "classes": "validate timeChanger", "fieldType":"text","data":{"item_id":item.id},"validations":{"type":"text","max":{"value":256}}};
    var actionFullInput = {"id":"correctiveActionWrapper_" + item.id,"classes":"input-field col s6 m6 l6","field":actionInput,"label":actionLabel};

    if(item.corrective_action){
        actionInput.value = item.corrective_action;
        actionLabel.classes = "active";
    }

    return actionFullInput;
}

function gmpPestControlSelfInspectionFunctionality(data){
    console.log("Cargando funcionalidad");
}
