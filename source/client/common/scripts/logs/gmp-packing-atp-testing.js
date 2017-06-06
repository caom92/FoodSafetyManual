function loadLogForm(htmlElement){
    $server.request({
        service: 'log-gmp-packing-atp-testing',
        success: function(response) {
            if (response.meta.return_code == 0) {
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingAtpTestingLog(report, htmlElement);
                loadFunctionality({"isPrefilled":false});
                changeLanguage();
                $("#send_report").click(function(){
                    sendGmpPackingAtpTestingReport();
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
    $server.request({
        service: 'authorization-report-gmp-packing-atp-testing',
        data: data,
        success: function(response) {
            if (response.meta.return_code == 0) {
                $(htmlElement).html("");
                var report = response.data;
                var header = {"rows":[{"columns":[{"styleClasses":"col s12 m12 l12", "columnText":report.log_name, "id":"log_name"}]},{"columns":[{"styleClasses":"col s4 m4 l4","textClasses":"zone_name","columnText":report.zone_name},{"styleClasses":"col s4 m4 l4","textClasses":"program_name","columnText":report.program_name},{"styleClasses":"col s4 m4 l4","textClasses":"module_name","columnText":report.module_name}]},{"columns":[{"styleClasses":"col s6 m6 l6","textClasses":"date_name","columnText":getISODate(new Date())},{"styleClasses":"col s6 m6 l6","textClasses":"made_by","columnText":localStorage.first_name + " " + localStorage.last_name}]}]};
                $(htmlElement).append(logHeader(header));
                gmpPackingAtpTestingLog(report.areas, htmlElement);
                loadFunctionality({"isPrefilled":true});
                changeLanguage();
                $("#send_report").click(function(){
                    sendGmpPackingAtpTestingReport();
                });
                $("input").characterCounter();
                changeLanguage();
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
        data: {"log-suffix":"gmp-packing-atp-testing"},
        success: function(response){
            $(titleElement).html(response.data.log_name);
            $(htmlElement).append('<iframe src = "' + $root + 'external/ViewerJS/#../../' + response.data.manual_location + 'actual_manual.pdf" width="100%" height="100%" style="min-height: 300px" allowfullscreen webkitallowfullscreen></iframe>');
            console.log(response);
        }
    });
}

function loadFunctionality(data){
    gmpPackingAtpTestingFunctionality(data);
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

function sendGmpPackingAtpTestingReport(){
    var report = new Object();

    report.date = getISODate(new Date());
    report.notes = $("#report_comment").val();
    report.areas = new Array();

    if(validateLog() || true){
        $(".area-card").each(function(){
            var area = new Object();
            var areaID = $(this).data("id");
            area.id = areaID;
            area.time = $("#time_" + area.id).val();
            area.items = new Array();
            $(this).find(".item-card").each(function(){
                var item = new Object();
                var itemID = $(this).data("number");
                item.test_number = itemID;
                item.test1 = Number($("#test_" + areaID + "_" + itemID).val());
                item.results1 = getBool($("input[id='test_acceptable_" + areaID + "_" + itemID +"']:checked").val());
                if(item.results1 == false){
                    item.corrective_action = $("#correctiveAction_" + areaID + "_" + itemID).val();
                    item.test2 = 15;
                    item.results2 = getBool($("input[id='acceptable_" + areaID + "_" + itemID +"']:checked").val());
                }
                area.items.push(item);
            });
            report.areas.push(area);
        });

        console.log(report);

        $server.request({
            service: 'capture-gmp-packing-atp-testing',
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

function gmpPackingAtpTestingLog(data, htmlElement){
    var log = $("<div>");
    var areasCard = $("<div>");
    var additionalData = $("<div>");
    var areaAddWrapper = $("<div>");

    /*for(var area in data){
        console.log(data[area]);
        areasCard.append(gmpPackingAtpTestingArea(data[area]));
    }*/

    //areasCard.append(gmpPackingAtpTestingArea(data[0]));

    console.log(data);

    areasCard.addClass("card-panel white");
    areasCard.attr("id", "areas_wrapper");
    additionalData.addClass("card-panel white");

    areaAddWrapper.addClass("card-panel white");
    areaAddWrapper.append(createInputRow(gmpPackingAtpTestingAreaControls(data)));

    additionalData.append(createText({"type":"text","classes":"report_additional_info"}));
    additionalData.append(createInputRow({"columns":[gmpPackingAtpTestingComment(data.notes)]}));

    log.append(areasCard);
    log.append(areaAddWrapper);
    log.append(additionalData);
    log.append($("<div class='row'>").append(createButton(gmpPackingAtpTestingSendButton())));

    $(htmlElement).append(log);
}

function gmpPackingAtpTestingAreaControls(data){
    var controlsRow = new Object();

    controlsRow.columns = [/*gmpPackingAtpTestingAreaControlsSelect(data), */gmpPackingAtpTestingAreaControlsSelect(data), gmpPackingAtpTestingAreaControlsInput(data), gmpPackingAtpTestingAreaControlsAddButton(data), gmpPackingAtpTestingAreaControlsDelButton(data)];

    return controlsRow;
}

function gmpPackingAtpTestingAreaControlsSelect(data){
    var areas = new Array();

    for(var area of data.areas){
        var tempOption = {"value":JSON.stringify(area),"text":area.name,"data":area};
        areas.push(tempOption);
    }

    areas.push({"value":0,"classes":"add_production_area","id":"add_production_area_option"});

    var selectLabel = {"type":"label","contents":{"type":"text","classes":"production_area_title"}};
    var actionSelect =  {"type":"select","id":"productionArea","options":areas,"wrapper":"productionAreaWrapper"};
    var actionSelectInput = {"id":"productionAreaWrapper","classes":"input-field col s5 m5 l5","field":actionSelect,"label":selectLabel};

    return actionSelectInput;
}

function gmpPackingAtpTestingAreaControlsInput(data){
    var areaNewLabel = {"type":"label","contents":{"type":"text","classes":"production_area_title"},"for":"newAreaInput","classes":"active"};
    var areaNewInput = {"type":"input","id": "newAreaInput", "classes": "validate", "fieldType":"text","disabled":true};
    var areaNewFullInput = {"id":"newAreaInputWrapper","classes":"input-field col s5 m5 l5","field":areaNewInput,"label":areaNewLabel};

    return areaNewFullInput;
}

function gmpPackingAtpTestingAreaControlsAddButton(data){
    var areaAddInput = {"id":"addAreaButtonWrapper","classes":"input-field col s1 m1 l1"};
    var areaAddButton = {"type":"floating","id":"add_area","classes":"btn-floating waves-effect waves-light green right","data":{"last_test":1}};
    var areaAddIcon = {"type":"icon","icon":"mdi-plus","size":"mdi-24px"};
    areaAddButton.icon = areaAddIcon;
    areaAddInput.field = areaAddButton;

    return areaAddInput;
}  

function gmpPackingAtpTestingAreaControlsDelButton(data){
    var areaDelInput = {"id":"delAreaButtonWrapper","classes":"input-field col s1 m1 l1"};
    var areaDelButton = {"type":"floating","id":"del_area","classes":"btn-floating waves-effect waves-light grey","data":{"last_test":1}};
    var areaDelIcon = {"type":"icon","icon":"mdi-minus","size":"mdi-24px"};
    areaDelButton.icon = areaDelIcon;
    areaDelInput.field = areaDelButton;

    return areaDelInput;
}

function gmpPackingAtpTestingComment(reportComment){
    var commentLabel = {"type":"label","contents":{"type":"text","classes":"comment_title"}};
    var commentInput = {"type":"input","id": "report_comment", "classes": "validate", "fieldType":"text","validations":{"type":"text","max":{"value":80,"toast":"gmp-packing-preop-report-notes"}}};
    var commentFullInput = {"id":"reportCommentWrapper","classes":"input-field col s12 m12 l12","field":commentInput,"label":commentLabel};

    if(reportComment){
        commentInput.value = reportComment;
        commentLabel.classes = "active";
    }

    return commentFullInput;
}

function gmpPackingAtpTestingSendButton(){
    var button = {"type":"button","id":"send_report","icon":{"type":"icon","icon":"mdi-send","size":"mdi-18px", "text":{"type":"text","classes":"send_button"}}};

    return button;
}

function gmpPackingAtpTestingArea(item){
    var areaCard = $("<div>");
    var testsWrapper = $("<div>");
    var topRow = new Object();
    var bottomRow = new Object();

    topRow.columns = [gmpPackingAtpTestingAreaTitle(item), gmpPackingAtpTestingAreaTime(item)];
    bottomRow.columns = [gmpPackingAtpTestingAreaAddTestButton(item), gmpPackingAtpTestingAreaDelTestButton(item)];

    testsWrapper.attr("id", "tests_wrapper_" + item.id);

    areaCard.append(createInputRow(topRow));
    testsWrapper.append(gmpPackingAtpTestingItem(item, 1))
    areaCard.append(testsWrapper);
    areaCard.append(createInputRow(bottomRow));

    areaCard.attr("id", "area_card_" + item.id);
    areaCard.addClass("area-card card-panel white");
    areaCard.data("id", item.id);

    return areaCard;
}

function gmpPackingAtpTestingAreaTitle(item){
    var itemTitle = {"type":"text","id":"title_" + item.id,"classes":"", "text":item.name};
    var titleInput = {"id":"titleWrapper_" + item.id,"classes":"card-title col s6 m6 l6","field": itemTitle};

    return titleInput;
}

function gmpPackingAtpTestingAreaTime(area, time){
    var timeLabel = {"type":"label","contents":{"type":"text","classes":"time_title"},"for":"time_" + area.id,"classes":"active"};
    var timeInput = {"type":"input","id": "time_" + area.id, "classes": "validate", "fieldType":"text","disabled":true,"data":{"area_id":area.id},"value":getISOTime(new Date())};
    var timeFullInput = {"id":"timeWrapper_" + area.id,"classes":"input-field col s6 m6 l6","field":timeInput,"label":timeLabel};

    if(time){
        timeInput.value = time;
    }

    return timeFullInput;
}

function gmpPackingAtpTestingAreaAddTestButton(area){
    var areaAddInput = {"id":"addTestButtonWrapper_" + area.id,"classes":"input-field col s1 offset-s10 m1 offset-m10 l1 offset-l10"};
    var areaAddButton = {"type":"floating","id":"add_area_test_" + area.id,"classes":"btn-floating waves-effect waves-light green right test_button","data":{"area_id":area.id,"last_test":1}};
    var areaAddIcon = {"type":"icon","icon":"mdi-plus","size":"mdi-24px"};
    areaAddButton.icon = areaAddIcon;
    areaAddInput.field = areaAddButton;

    return areaAddInput;
}

function gmpPackingAtpTestingAreaDelTestButton(area){
    var areaAddInput = {"id":"delTestButtonWrapper_" + area.id,"classes":"input-field col s1 m1 l1"};
    var areaAddButton = {"type":"floating","id":"del_area_test_" + area.id,"classes":"btn-floating waves-effect waves-light grey right delete_button","data":{"area_id":area.id,"last_test":1}};
    var areaAddIcon = {"type":"icon","icon":"mdi-minus","size":"mdi-24px"};
    areaAddButton.icon = areaAddIcon;
    areaAddInput.field = areaAddButton;

    return areaAddInput;
}

function gmpPackingAtpTestingItem(area, number){
    var itemCard = $("<div>");
    var topRow = new Object();

    topRow.columns = [gmpPackingAtpTestingItemReading(area, number), gmpPackingAtpTestingItemResult(area, number),gmpPackingAtpTestingItemCorrectiveAction(area, number), gmpPackingAtpTestingItemRetest(area, number)];

    itemCard.append(createInputRow(topRow));

    itemCard.addClass("item-card");
    itemCard.attr("id", "test_row_" + area.id + "_" + number);
    itemCard.data("id", area.id);
    itemCard.data("number", number);

    return itemCard;
}

function gmpPackingAtpTestingItemNumber(item, number){
    var testNumber = {"type":"text","id":"test_" + item.id + "_" + number,"classes":"test", "text":number, "data":{"area_id":item.id,"test_no":number}};
    var titleInput = {"id":"titleWrapper_" + item.id + "_" + number,"classes":"card-title col s2 m2 l2","field": testNumber};

    return titleInput;
}

function gmpPackingAtpTestingItemReading(item, number){
    var testLabel = {"type":"label","contents":{"type":"text","classes":"test_title"}};
    var testInput = {"type":"input","id": "test_" + item.id + "_" + number, "classes": "validate timeChanger", "fieldType":"text","data":{"test_no":number,"area_id":item.id},"validations":{"type":"number"/*,"toast":"gmp-packing-scale-calibration-test"*/}};
    var testFullInput = {"id":"testWrapper_" + item.id + "_" + number,"classes":"input-field col s4 m4 l4","field":testInput,"label":testLabel};

    if(item.test){
        testInput.value = item.test;
        testLabel.classes = "active";
    }

    return testFullInput;
}

function gmpPackingAtpTestingItemResult(item, number){
    var statusLabel = {"type": "label","contents": {"type":"text","classes":"results_title"}};
    var acceptableIcon = {"type":"text","classes":"pass_tag big"};
    var unacceptableIcon = {"type":"text","classes":"fail_tag big"};
    var radioAcceptable = {"type":"radio","id":"test_acceptable_" + item.id + "_" + number,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"test_acceptable_" + item.id + "_" + number,"contents": acceptableIcon},"data":{"test_no":number,"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"test_unacceptable_" + item.id + "_" + number,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"test_unacceptable_" + item.id + "_" + number,"contents": unacceptableIcon},"data":{"test_no":number,"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"test_radioGroup_"  + item.id + "_" + number,"classes":"col s12 m12 l12","group":"test_radio_" + item.id + "_" + number,"radioArray":[radioAcceptable, radioUnacceptable],"validations":{"type":"radio","required":{"value":true,"toast":"gmp-packing-preop-item-status"},"groupName":"test_radio_" + item.id + "_" + number},"label":statusLabel};
    var groupInput = {"id":"test_radioWrapper_" + item.id + "_" + number,"classes":"col s2 m2 l2","field":itemRadioGroup};

    if(item.status == 1){
        radioAcceptable.checked = true;
    } else if (item.status == 0){
        radioUnacceptable.checked = true;
    }

    return groupInput;
}

function gmpPackingAtpTestingItemCorrectiveAction(item, number){
    var actionLabel = {"type":"label","contents":{"type":"text","classes":"action_title"}};
    var actionInput = {"type":"input","id": "correctiveAction_" + item.id + "_" + number, "classes": "validate timeChanger", "fieldType":"text","data":{"test_no":number,"item_id":item.id},"validations":{"type":"text","max":{"value":256}}};
    var actionFullInput = {"id":"correctiveActionWrapper_" + item.id + "_" + number,"classes":"input-field col s4 m4 l4","field":actionInput,"label":actionLabel};

    if(item.corrective_action){
        actionInput.value = item.corrective_action;
        actionLabel.classes = "active";
    }

    return actionFullInput;
}

function gmpPackingAtpTestingItemRetest(item, number){
    var statusLabel = {"type": "label","contents": {"type":"text","classes":"retest_title"}};
    var acceptableIcon = {"type":"text","classes":"pass_tag big"};
    var unacceptableIcon = {"type":"text","classes":"fail_tag big"};
    var radioAcceptable = {"type":"radio","id":"acceptable_" + item.id + "_" + number,"classes":"timeChanger","value":"true","label":{"type":"label","classes":"black-text","for":"acceptable_" + item.id + "_" + number,"contents": acceptableIcon},"data":{"test_no":number,"item_id":item.id}};
    var radioUnacceptable = {"type":"radio","id":"unacceptable_" + item.id + "_" + number,"classes":"timeChanger","value":"false","label":{"type":"label","classes":"black-text","for":"unacceptable_" + item.id + "_" + number,"contents": unacceptableIcon},"data":{"test_no":number,"item_id":item.id}};
    var itemRadioGroup = {"type": "radioGroup", "id":"radioGroup_"  + item.id + "_" + number,"classes":"col s12 m12 l12","group":"radio_" + item.id + "_" + number,"radioArray":[radioAcceptable, radioUnacceptable],"label":statusLabel};
    var groupInput = {"id":"radioWrapper_" + item.id + "_" + number,"classes":"col s2 m2 l2","field":itemRadioGroup};

    if(item.status == 1){
        radioAcceptable.checked = true;
    } else if (item.status == 0){
        radioUnacceptable.checked = true;
    }

    return groupInput;
}

function gmpPackingAtpTestingFunctionality(data){
    console.log("Cargando funcionalidad");

    $("#productionArea").on("change", function(e){
        if($(this).val() == "0"){
            $("#newAreaInput").prop('disabled', false);
        } else {
            $("#newAreaInput").prop('disabled', true);
        }
    });

    $("#add_area").on("click", function(e){
        if($("#productionArea").val() == "0"){
            $server.request({
                service: 'add-gmp-packing-atp-testing',
                data: {"name":$("#newAreaInput").val()},
                success: function(response){
                    console.log(response);
                    if (response.meta.return_code == 0) {
                        Materialize.toast("Area añadida", 3000, "rounded");
                        $("#areas_wrapper").append(gmpPackingAtpTestingArea({"id":parseInt(response.data),"name":$("#newAreaInput").val()}));
                        $("#add_production_area_option").before($("<option>", {
                            value: parseInt(response.data),
                            text: $("#newAreaInput").val(),
                            disabled: true
                        }));
                        $("#newAreaInput").val("")
                        $('select').material_select('destroy');
                        $('select').material_select();
                        gmpPackingAtpTestingAddDelTestsFunctionality(data);
                        changeLanguage();
                    } else {
                        Materialize.toast(response.meta.message, 3000, "rounded");
                    }
                }
            });
            /*
            gmpPackingAtpTestingAddDelTestsFunctionality(data);
            changeLanguage();*/
        } else {
            $("#areas_wrapper").append(gmpPackingAtpTestingArea(JSON.parse($("#productionArea").val())));
            $("option[value='" + $("#productionArea").val() + "']").prop("disabled", true);
            gmpPackingAtpTestingAddDelTestsFunctionality(data);
            changeLanguage();
        }
    });
}

function gmpPackingAtpTestingAddDelTestsFunctionality(data){
    $( ".test_button" ).off();
    $( ".delete_button" ).off();

    $(".test_button").on("click", function(e){
        var areaID = $(this).data("area_id");
        var lastTest = $(this).data("last_test");
        $("#tests_wrapper_" + areaID).append(gmpPackingAtpTestingItem({"id":areaID}, lastTest + 1));
        $(this).data("last_test", lastTest + 1);
        $("#del_area_test_" + areaID).data("last_test", lastTest + 1);
        if($("#del_area_test_" + areaID).hasClass("grey")){
            $("#del_area_test_" + areaID).removeClass("grey");
            $("#del_area_test_" + areaID).addClass("red");
        }
        changeLanguage();
    });

    $(".delete_button").on("click", function(e){
        var areaID = $(this).data("area_id");
        var lastTest = $(this).data("last_test");
        if(lastTest > 1){
            $("#test_row_" + areaID + "_" + lastTest).remove();
            $(this).data("last_test", lastTest - 1);
            $("#add_area_test_" + areaID).data("last_test", lastTest - 1);
            changeLanguage();
        }
        if(lastTest - 1 == 1){
            $(this).removeClass("red");
            $(this).addClass("grey");
        }
    });
}
