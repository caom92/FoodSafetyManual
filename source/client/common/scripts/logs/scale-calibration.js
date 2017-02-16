// DatePicker is common to all reports. It's used to select a range of dates
// to display in report form

// Wrapper for loading a Log Form. For convenience's sake, this name will
// be shared among all log types

function loadLogForm(htmlElement){
    $server.request({
        service: 'log-scale-calibration',
        success: function(response) {
            if (response.meta.return_code == 0 || true) {
                //var report = response.data;
                var report = {"zone_name":"LAW","program_name":"GMP","module_name":"Packing","log_name":"Scale Calibration","types":[{"id":1,"name":"Digital Scales","items":[{"id":1,"name":"345","order":1},{"id":2,"name":"1337","order":2},{"id":5,"name":"345","order":1},{"id":6,"name":"1337","order":2},{"id":7,"name":"345","order":1},{"id":8,"name":"1337","order":2}]},{"id":2,"name":"Heavy Analog Scales","items":[{"id":3,"name":"#1","order":1},{"id":4,"name":"#2","order":2}]}]};
                console.log(report);
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                scaleCalibrationLog(report, htmlElement);
                loadFunctionality({"isPrefilled":false});
                changeLanguage(localStorage.defaultLanguage);
                /*$("#send_report").click(function(){
                    sendGmpPackingPreopReport();
                });*/
                $('.log_title').html($("#log_name").text());
                Materialize.toast("Informacion cargada del server", 3000, "rounded");
            } else {
                Materialize.toast("Some error", 3000, "rounded");
                throw response.meta.message;
            }
        }
    });
}

function loadPrefilledLogForm(htmlElement, data){

}

function loadFunctionality(data){
    scaleCalibrationFunctionality(data);
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(data){

}

/******************************************************************************
A collection of functions to display the Log Form. This will be related to the
name of the log, located in the name_suffix field on the database. Usually, we
are going to divide them into full log, area log and individual item log.
******************************************************************************/

function sendScaleCalibrationReport(){
    
}

function updateScaleCalibrationReport(reportID){

}

function scaleCalibrationLog(data, htmlElement){
    var log = $("<div>");
    var additionalData = $("<div>");

    console.log(data);
    for(var type of data.types){
        log.append(scaleCalibrationType(type));
    }

    additionalData.addClass("card-panel white");

    additionalData.append(createText({"type":"text","classes":"report_additional_info"}));
    additionalData.append(createInputRow({"columns":[scaleCalibrationComment(data.notes)]}));
    additionalData.append(createInputRow({"columns":[scaleCalibrationCorrectiveAction(data.corrective_action)]}));

    log.append(additionalData);
    log.append($("<div class='row'>").append(createButton(scaleCalibrationSendButton())));

    $(htmlElement).append(log);
}

function scaleCalibrationComment(reportComment){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"comment_title"}};
    var commentInput = {"type":"input","id": "report_comment", "classes": "validate", "fieldType":"text"};
    var commentFullInput = {"id":"reportCommentWrapper","classes":"input-field col s12 m12 l12","field":commentInput,"label":commentLabel};

    if(reportComment){
        commentInput.value = reportComment;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function scaleCalibrationCorrectiveAction(reportComment){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"action_title"}};
    var commentInput = {"type":"input","id": "report_action", "classes": "validate", "fieldType":"text"};
    var commentFullInput = {"id":"reportActionWrapper","classes":"input-field col s12 m12 l12","field":commentInput,"label":commentLabel};

    if(reportComment){
        commentInput.value = reportComment;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function scaleCalibrationSendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}}};

    return button;
}

function scaleCalibrationType(type){
    var typeCard = $("<div>");
    var title = $("<div>");

    typeCard.addClass("card-panel white area-card");
    typeCard.data("id", type.id);
    title.addClass("card-title");
    title.append(createText({"type":"text","classes":"blue-text","text":type.name}));
    typeCard.append(title);

    typeCard.append(createInputRow({"columns":[scaleCalibrationTypeTime(type.id, type.time)]}));

    for(var item of type.items){
        typeCard.append(scaleCalibrationItem(item, type.id));
    }

    return typeCard;
}

function scaleCalibrationTypeTime(typeID, time){
    var timeLabel = {"type":"label","contents":{"type":"text","classes":"time_title"},"for":"time_" + typeID,"classes":"active"};
    var timeInput = {"type":"input","id": "time_" + typeID, "classes": "validate", "fieldType":"text","disabled":true,"data":{"type_id":typeID},"value":getISOTime(new Date())};
    var timeFullInput = {"id":"timeWrapper_" + typeID,"classes":"input-field col s12 m12 l12","field":timeInput,"label":timeLabel};

    if(time){
        timeInput.value = time;
    }

    return timeFullInput;
}

function scaleCalibrationItem(item, typeID){
    var itemCard = $("<div>");    
    var itemRow = new Object();

    //itemRow.columns = [scaleCalibrationItemTitle(item, typeID), scaleCalibrationItemStatus(item, typeID), scaleCalibrationItemSanitation(item, typeID)];
    itemRow.columns = [scaleCalibrationItemTitle(item, typeID), scaleCalibrationItemTest(item, typeID), scaleCalibrationItemStatus(item, typeID), scaleCalibrationItemSanitation(item, typeID)];


    console.log(itemRow);

    console.log(createInputRow(itemRow));
    itemCard.append(createInputRow(itemRow).attr("style", "margin-top:15px;"));
    //itemCard.addClass("card-panel white item-card");
    itemCard.data("id", item.id);
    itemCard.append($("<div class='divider'>"));

    return itemCard;
}

function scaleCalibrationItemTitle(item, typeID){
    var itemTitle = {"type":"text","id":"title_" + item.id, "text":item.name};
    var titleInput = {"id":"titleWrapper_" + item.id,"classes":"card-title col s6 m3 l3","field": itemTitle};

    return titleInput;
}

function scaleCalibrationItemTest(item, typeID){
    var testLabel = {"type":"label","contents":{"type":"text","classes":"test_title"}};
    var testInput = {"type":"input","id": "test_" + item.id, "classes": "validate timeChanger", "fieldType":"text","data":{"type_id":typeID,"item_id":item.id}};
    var testFullInput = {"id":"testWrapper_" + item.id,"classes":"input-field col s6 m3 l3","field":testInput,"label":testLabel};

    if(item.test){
        testInput.value = item.test;
        testLabel.classes = "active";
    }

    return testFullInput;
}

function scaleCalibrationItemStatus(item, typeID){
    var acceptableIcon = {"type":"text","classes":"pass_tag big"};
    var unacceptableIcon = {"type":"text","classes":"fail_tag big"};
    var radioAcceptable = {"type":"radio","id":"acceptable_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"acceptable_" + item.id,"contents": acceptableIcon},"data":{"type_id":typeID,"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"unacceptable_" + item.id,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"unacceptable_" + item.id,"contents": unacceptableIcon},"data":{"type_id":typeID,"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"radio_" + item.id,"radioArray":[radioAcceptable, radioUnacceptable]};
    var groupInput = {"id":"radioWrapper_" + item.id,"classes":"col s6 m3 l3","field":itemRadioGroup};

    if(item.status == 1){
        radioAcceptable.checked = true;
    } else if (item.status == 0){
        radioUnacceptable.checked = true;
    }

    return groupInput;
}

function scaleCalibrationItemSanitation(item, typeID){
    var checkboxLabel = {"type":"label","contents":{"type":"text","classes":"sanitized_title"},"for":"sanitation_" + item.id};
    var checkboxField = {"type":"checkbox", "id":"sanitation_" + item.id,"classes":"filled-in timeChanger", "data":{"type_id":typeID}};
    var checkboxFullInput = {"field":checkboxField, "label":checkboxLabel,"classes":"col s6 m3 l3"};

    return checkboxFullInput;
}

// Functionality

function scaleCalibrationFunctionality(data){
    $(".timeChanger").change(function(){
        console.log("Time changed");
        if($(this).data().type_id)
            $("#time_" + $(this).data().type_id).val(getISOTime(new Date()));
    });


    /*if(data.isPrefilled){
        $("input[id^='unacceptable_']").each(function(){
            $(this).attr("disabled", true);
        });

        $("div[id^='commentWrapper_']").show();
        $("div[id^='correctiveActionWrapper_']").show();
    } else {
        $(".timeChanger").change(function(){
            if($(this).data().area_id)
                $("#time_" + $(this).data().area_id).val(getISOTime(new Date()));
        });

        $("input[id^='acceptable_']").change(function(){
            if($(this).is(":checked")){
                var tag = $(this).attr("id");
                var id = tag.match(/[0-9]+/g);
                $('label[for="acceptable_'+id[0]+'"]').removeClass("black-text");
                $('label[for="acceptable_'+id[0]+'"]').addClass("green-text text-darken-2");
                $('label[for="unacceptable_'+id[0]+'"]').removeClass("red-text");
                $('label[for="unacceptable_'+id[0]+'"]').addClass("black-text");
                $("#correctiveActionWrapper_" + id[0]).hide(500);
                $("#commentWrapper_" + id[0]).hide(500);
            }
        });

        $("input[id^='unacceptable_']").change(function(){
            if($(this).is(":checked")){
                var tag = $(this).attr("id");
                var id = tag.match(/[0-9]+/g);
                $('label[for="acceptable_'+id[0]+'"]').addClass("black-text");
                $('label[for="acceptable_'+id[0]+'"]').removeClass("green-text text-darken-2");
                $('label[for="unacceptable_'+id[0]+'"]').addClass("red-text");
                $('label[for="unacceptable_'+id[0]+'"]').removeClass("black-text");
                $("#correctiveActionWrapper_" + id[0]).show(500);
                $("#commentWrapper_" + id[0]).show(500);
            }
        });
    }*/
}

// Full report

function scaleCalibrationReport(data){
    var report = new Object();

    report.type = "table";
    report.classes = "bordered highlight";
    report.id = "report_" + data.report_id;

    report.thead = scaleCalibrationHeader();
    report.tbody = scaleCalibrationBody(data);
    report.tfoot = scaleCalibrationFooter(data);

    console.log(JSON.stringify(report));
    console.log(report);

    return report;
}

// Header containing Area, Time, Number, Name, Conditions, Corrective Actions
// and Comment. This header contain the classes to borrow the text from
// languages.xml, not strings

function scaleCalibrationHeader(){
    var header = {"type":"thead","rows":[{"type":"tr","columns":[{"type":"th","classes":"area_title areaColumn"},{"type":"th","classes":"time_title timeColumn"},{"type":"th","classes":"number_title numberColumn"},{"type":"th","classes":"name_title nameColumn"},{"type":"th","classes":"status_title statusColumn"},{"type":"th","classes":"action_title actionColumn"},{"type":"th","classes":"comment_title commentColumn"}]}]};

    return header;
}

// Body containing all the information, except for the report notes and album
// URL

function scaleCalibrationBody(data){
    var body = {"type":"tbody"};

    body.rows = new Array();

    for(var area of data.areas){
        var firstRowFlag = true;
        for(var type of area.types){
            console.log(type);
            var row = {"type":"tr"};
            row.columns = new Array();
            if(firstRowFlag){
                var rowspan = area.types.length;
                for(var count of area.types){
                    rowspan += count.items.length;
                }
                row.columns.push(gmpPackingPreopReportAreaName(area.name, rowspan));
                row.columns.push(gmpPackingPreopReportAreaTime(area.time, rowspan));
                row.columns.push(gmpPackingPreopReportTypeTitle(type.name, 5));
                firstRowFlag = false;
            } else {
                row.columns.push(gmpPackingPreopReportTypeTitle(type.name, 5));
            }
            body.rows.push(row);
            for(var item of type.items){
                var itemRow = {"type":"tr"};
                itemRow.columns = gmpPackingPreopReportItem(item);
                body.rows.push(itemRow);
            }
        }
        var notesRow = {"type":"tr"};
        var sanitationRow = {"type":"tr"};
        notesRow.columns = [gmpPackingPreopReportAreaNotes(area.notes, 7)];
        sanitationRow.columns = [gmpPackingPreopReportAreaSanitation(area.person_performing_sanitation, 7)];
        body.rows.push(notesRow);
        body.rows.push(sanitationRow);
    }

    var reportNotesRow = {"type":"tr"};
    var reportAlbumURL = {"type":"tr"};
    reportNotesRow.columns = [gmpPackingPreopReportNotes(data.notes, 7)];
    reportAlbumURL.columns = [gmpPackingPreopReportAlbumURL(data.album_url, 7)];

    body.rows.push(reportNotesRow);
    body.rows.push(reportAlbumURL);

    return body;
}

// Footer

function scaleCalibrationFooter(data){

}
