// DatePicker is common to all reports. It's used to select a range of dates
// to display in report form

function createDatePicker(){

}

// Wrapper for loading a Log Form. For convenience's sake, this name will
// be shared among all log types

function loadLogForm(data, htmlElement){
    console.log("Wrapper was called to load log form");
    gmpPackingPreop(data, htmlElement);
}

function loadFunctionality(){
    console.log("Wrapper was called to trigger functionality");
    gmpPackingPreopFunctionality();
}

// Wrapper for showing a HTML report. For convenience's sake, this name will
// be shared among all log types

function loadReport(){

}

/******************************************************************************
A collection of functions to display the Log Form. This will be related to the
name of the log, located in the name_suffix field on the database. Usually, we
are going to divide them into full log, area log and individual item log.
******************************************************************************/

function gmpPackingPreop(data, htmlElement){
    var log = $("<div>");

    var response = {"meta":{"return_code":0,"message":"Success."},"data":{"zone_name":"LAW","program_name":"GMP","module_name":"Packing","log_name":"Pre-Operational Inspection","areas":[{"id":1,"name":"Warehouse","types":[{"id":1,"name":"Food Contact - Daily","items":[{"id":21,"name":"Elemento con Food Contact","order":11}]},{"id":2,"name":"Non Food Contact - Daily","items":[{"id":4,"name":"Equipment Tomatoes","order":2},{"id":3,"name":"Trash Recepticales","order":2},{"id":1,"name":"Floors","order":5},{"id":5,"name":"Stainless Table (5)","order":8},{"id":7,"name":"Forklift\/Palletjack\/Wave","order":9},{"id":2,"name":"Ceiling Lights","order":10},{"id":6,"name":"Roll Up Loading Doors","order":11}]}]},{"id":2,"name":"Cooler #1","types":[{"id":2,"name":"Non Food Contact - Daily","items":[{"id":8,"name":"Floors","order":1},{"id":9,"name":"Cool Care Fans","order":2},{"id":10,"name":"Ceiling Lights","order":3},{"id":11,"name":"Trash Recepticales","order":4},{"id":12,"name":"Walls","order":5},{"id":13,"name":"Plastic Curtains","order":6},{"id":14,"name":"Cooling Units","order":7}]}]},{"id":3,"name":"Cooler #2","types":[{"id":2,"name":"Non Food Contact - Daily","items":[{"id":18,"name":"Walls","order":1},{"id":15,"name":"Floors","order":2},{"id":20,"name":"Cooling Units","order":3},{"id":16,"name":"Ceiling Lights","order":4},{"id":19,"name":"Plastic Curtains","order":5},{"id":17,"name":"Trash Recepticales","order":6}]}]}]}};
    console.log(response);
    console.log(response.data);

    for(var area of response.data.areas){
        log.append(gmpPackingPreopArea(area));
    }

    $(htmlElement).append(log);
}

function gmpPackingPreopArea(area){
    var areaCard = $("<div>");
    var title = $("<div>");

    areaCard.addClass("card-panel white");
    title.addClass("card-title");
    title.append(createIcon({"type":"icon","icon":"mdi-cube-outline","size":"mdi-18px","color":"blue-text", "text":{"type":"text","classes":"blue-text","text":area.name}}));
    areaCard.append(title);

    areaCard.append(createInputRow({"columns":[gmpPackingPreopAreaTime(area.id)]}));

    for(var type of area.types){
        var typeTitle = $("<div>");
        typeTitle.addClass("card-title");
        typeTitle.attr("style", "font-weight: bold;");
        typeTitle.append(createText({"type":"text","text":type.name}));
        areaCard.append(typeTitle);
        for(var item of type.items){
            areaCard.append(gmpPackingPreopItem(item, area.id));
        }
    }

    areaCard.append(createInputRow({"columns":[gmpPackingPreopAreaNotes(area.id)]}));
    areaCard.append(createInputRow({"columns":[gmpPackingPreopAreaSanitation(area.id)]}));

    return areaCard;
}

function gmpPackingPreopAreaTime(areaID){
    var timeLabel = {"type":"label","contents":{"type":"text","classes":"time_title"},"for":"time_" + areaID,"classes":"active"};
    var timeInput = {"type":"input","id": "time_" + areaID, "classes": "validate", "fieldType":"text","disabled":true,"data":{"area_id":areaID},"value":getISOTime(new Date())};
    var timeFullInput = {"id":"timeWrapper_" + areaID,"classes":"input-field col s12 m12 l12","field":timeInput,"label":timeLabel};

    return timeFullInput;
}

function gmpPackingPreopAreaNotes(areaID){
    var notesLabel = {"type":"label","contents":{"type":"text","classes":"notes_title"},"for":"notes_" + areaID};
    var notesInput = {"type":"input","id": "notes_" + areaID, "classes": "timeChanger validate", "fieldType":"text","data":{"area_id":areaID}};
    var notesFullInput = {"id":"notesWrapper_" + areaID,"classes":"input-field col s12 m12 l12","field":notesInput,"label":notesLabel};

    return notesFullInput;
}

function gmpPackingPreopAreaSanitation(areaID){
    var sanitationLabel = {"type":"label","contents":{"type":"text","classes":"person_performing_sanitation_title"},"for":"sanitation_" + areaID};
    var sanitationInput = {"type":"input","id": "sanitation_" + areaID, "classes": "timeChanger validate", "fieldType":"text","data":{"area_id":areaID}};
    var sanitationFullInput = {"id":"sanitationWrapper_" + areaID,"classes":"input-field col s12 m12 l12","field":sanitationInput,"label":sanitationLabel};

    return sanitationFullInput;
}

function gmpPackingPreopItem(item, areaID){
    var itemCard = $("<div>");    
    var itemRow = new Object();
    var commentRow = new Object();

    itemRow.columns = [gmpPackingPreopTitle(item, areaID), gmpPackingPreopStatus(item, areaID), gmpPackingPreopCorrectiveAction(item, areaID)];
    commentRow.columns = [gmpPackingPreopComment(item, areaID)];

    itemCard.append(createInputRow(itemRow));
    itemCard.append(createInputRow(commentRow));
    itemCard.addClass("card-panel white");

    return itemCard;
}

function gmpPackingPreopTitle(item, areaID){
    var itemTitle = {"type":"text","id":"title_" + item.id, "text":item.name};
    var titleInput = {"id":"titleWrapper_" + item.id,"classes":"card-title col s4 m4 l4","field": itemTitle};

    return titleInput;
}

function gmpPackingPreopStatus(item, areaID){
    var acceptableIcon = {"type":"icon","icon":"mdi-check-circle","size":"mdi-18px","color":"green-text", "text":{"type":"text","classes":"acceptable_tag green-text"}};
    var unacceptableIcon = {"type":"icon","icon":"mdi-close-circle","size":"mdi-18px","color":"red-text", "text":{"type":"text","classes":"unacceptable_tag red-text"}};    
    var radioAcceptable = {"type":"radio","id":"acceptable_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","for":"acceptable_" + item.id,"contents": acceptableIcon},"data":{"area_id":areaID,"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"unacceptable_" + item.id,"classes":"timeChanger","value":"true","label":{"type":"label","for":"unacceptable_" + item.id,"contents": unacceptableIcon},"data":{"area_id":areaID,"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"radioGroup_"  + item.id,"classes":"col s12 m12 l12","group":"radio_" + item.id,"radioArray":[radioAcceptable, radioUnacceptable]};
    var groupInput = {"id":"radioWrapper_" + item.id,"classes":"col s8 m8 l4","field":itemRadioGroup};

    return groupInput;
}

function gmpPackingPreopCorrectiveAction(item, areaID){
    var actionOptions = new Array();

    for(var action of JSON.parse(localStorage.correctiveActionsSSOP))
        actionOptions.push({"value":action.id,"text":action.name,"classes":"timeChanger","data":{"area_id":areaID,"item_id":item.id}});

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"action_title"}};
    var actionSelect =  {"type": "select", "id": "correctiveAction_" + item.id,"classes":"timeChanger", "options": actionOptions,"data":{"area_id":areaID,"item_id":item.id}};
    var actionSelectInput = {"id":"correctiveActionWrapper_" + item.id,"classes":"input-field col s12 m12 l4","hidden": true,"field":actionSelect,"label":selectLabel,"data":{"area_id":areaID,"item_id":item.id}};

    return actionSelectInput;
}

function gmpPackingPreopComment(item, areaID){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"comment_title"}};
    var commentInput = {"type":"input","id": "comment_" + item.id, "classes": "validate timeChanger", "fieldType":"text","data":{"area_id":areaID,"item_id":item.id}};
    var commentFullInput = {"id":"commentWrapper_" + item.id,"classes":"input-field col s12 m12 l12","hidden": true,"field":commentInput,"label":commentLabel};

    return commentFullInput;
}

function gmpPackingPreopFunctionality(){
    $("input[id^='acceptable_']").change(function(){
        if($(this).is(":checked")){
            var tag = $(this).attr("id");
            var id = tag.match(/[0-9]+/g);
            $("#correctiveActionWrapper_" + id[0]).hide(500);
            $("#commentWrapper_" + id[0]).hide(500);
        }
    });

    $("input[id^='unacceptable_']").change(function(){
        if($(this).is(":checked")){
            var tag = $(this).attr("id");
            var id = tag.match(/[0-9]+/g);
            $("#correctiveActionWrapper_" + id[0]).show(500);
            $("#commentWrapper_" + id[0]).show(500);
        }
    });

    $(".timeChanger").change(function(){
        console.log($(this).data());
        if($(this).data().area_id)
            $("#time_" + $(this).data().area_id).val(getISOTime(new Date()));
    });
}

/*$(function (){
    $.getScript( "source/client/supervisor/behaviors/form-creator.js", function( data, textStatus, jqxhr ) {
        console.log( "Load was performed." );
        var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":"Pre-operational Log"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":"LAW"},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":"GMP"},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":"Packing"}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":"2017-01-23"},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":"Empleado I"}]}]};
        $("#content_wrapper").append(logHeader(header));
        gmpPackingPreop(null, "#content_wrapper");
        gmpPackingPreopFunctionality();
        changeLanguage(localStorage.defaultLanguage);
    });
});*/
