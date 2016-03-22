//Retrieves the data to create a form on the client side. Afterwards, it creates
//the form with the functions written below. Once completed, it appends the data in
//the "<body>" tag. Finally, it executes the "init()" function, in order to leave
//everything ready for the user.

function getSSOPForm(){
    var src = "/Espresso/source/server/sanitationPreOpForm.php";
    $.getJSON(src, function(data){
        console.log("Peticion de JSON exitosa");
        data.data.areas.forEach(function(index){
            $("body").append(createAreaCard(index));
        });
        $("body").append(sendButtonSSOP());
        init();
    });
}

//Receives an area object; delivers a div customized to display any number of
//hardware forms

function createAreaCard(areaObject){
    var areaCard = $("<div>");
    var id = areaObject.area_id;
    var name = areaObject.area_name;
    var hardwareList = areaObject.hardware;

    areaCard.attr("id", "area_report_" + id);
    areaCard.attr("class", "card-panel");
    areaCard.attr("style", "width:95%; margin: auto; margin-bottom: 0.5cm;");

    areaCard.append("<h6>" + name + "</h6>");

    hardwareList.forEach(function(index){
        areaCard.append(createHardwareCard(index));
    });

    return areaCard;
}

//Receives an Hardware object; delivers a card panel containing the form to fill
//the data of one hardware object.

function createHardwareCard(hardwareObject){
    var hardwareCard = $("<div>");
    var firstRow = $("<div>");
    var secondRow = $("<div>");
    var thirdRow = $("<div>");
    var id = hardwareObject.id;
    var name = hardwareObject.name;

    hardwareCard.attr("class", "card-panel");

    firstRow.attr("class", "row");
    firstRow.append('<div class="col s6">' +
                        '<div style="font-weight: bold">Elemento</div>' +
                        '<div>' + name + '</div>' +
                    '</div>');
    firstRow.append('<div class="col s6">' +
                        '<div style="font-weight: bold">Condiciones</div>' +
                        '<input name="status_' + id + '" type="radio" id="acceptable_' + id + '" class="radio material-icons id_1" value="true"/>' +
                        '<label for="acceptable_' + id + '">' +
                            '<i class="material-icons" style="color: green;">check_circle</i>' +
                        '</label>' +
                        '<br>' +
                        '<input name="status_' + id + '" type="radio" id="unacceptable_' + id + '" class="radio material-icons" value="false"/>' +
                        '<label for="unacceptable_' + id + '">' +
                            '<i class="material-icons" style="color: red;">cancel</i>' +
                        '</label>' +
                    '</div>');

    secondRow.attr("class", "row");
    secondRow.attr("id", "corrective_action_" + id);
    secondRow.attr("style", "display: none;");
    secondRow.append('<div class="input-field col s12" >' +
                        '<select id="corrective_' + id + '" >' +
                            '<option value="">Elija la acción correctiva a tomar</option>' +
                            '<option value="1">WRS</option>' +
                            '<option value="2">RC</option>' +
                        '</select>' +
                        '<label>Acción correctiva</label>' +
                    '</div>');

    thirdRow.attr("class", "row");
    thirdRow.append('<div class="input-field">' +
                        '<input name="comments_' + id + '" type="text" id="comments_' + id + '"/>' +
                        '<label for="comments_' + id + '">Comentarios</label>' +
                    '</div>');

    hardwareCard.append(firstRow);
    hardwareCard.append(secondRow);
    hardwareCard.append(thirdRow);

    return hardwareCard;
}


function init(){
    //Trigger the Material Design select input
    $('select').material_select();

    //Check the status of each radio button group to make sure the 
    $("input[id^='acceptable_']").each(function(index){
        if($(this).is(":checked")){
            var tag = $(this).attr("id");
            var id = tag.match(/[0-9]+/g);
            $("#corrective_action_" + id[0]).hide();
        }
    });

    $("input[id^='unacceptable_']").each(function(index){
        if($(this).is(":checked")){
            var tag = $(this).attr("id");
            var id = tag.match(/[0-9]+/g);
            $("#corrective_action_" + id[0]).show();
        }
    });

    //Every time the radio buttons change, we have to update the current form to show
    //or hide the select element with the corrective actions
    $("input[id^='acceptable_']").change(function(){
        if($(this).is(":checked")){
            var tag = $(this).attr("id");
            var id = tag.match(/[0-9]+/g);
            $("#corrective_action_" + id[0]).hide(500);
        }
    });

    $("input[id^='unacceptable_']").change(function(){
        if($(this).is(":checked")){
            var tag = $(this).attr("id");
            var id = tag.match(/[0-9]+/g);
            $("#corrective_action_" + id[0]).show(500);
        }
    });

    //Send SSOP reporte, once ready
    $("#send").click(function(){
        sendSSOPReport();
    });
}

function sendSSOPReport(){
    var currentTime = new Date();
    var time = "";
    var date = "";

    //For time in format HH-MM-SS
    if(currentTime.getHours()<9){
        time += "0" + currentTime.getHours() + "-";
    } else {
        time += currentTime.getHours() + "-";
    }

    if(currentTime.getMinutes()<9){
        time += "0" + currentTime.getMinutes() + "-";
    } else {
        time += currentTime.getMinutes() + "-";
    }

    if(currentTime.getSeconds()<9){
        time += "0" + currentTime.getSeconds();
    } else {
        time += currentTime.getSeconds();
    }

    //For date in format

    date += currentTime.getFullYear() + "-";

    if((currentTime.getMonth() + 1) < 9){
        date += "0" + currentTime.getMonth() + "-";
    } else {
        date += currentTime.getMonth() + "-";
    }

    if(currentTime.getDate()<9){
        date += "0" + currentTime.getDate();
    } else {
        date += currentTime.getDate();
    }

    console.log("Enviar Reporte " + time + " " + date);

    var idArray = new Array();
    var report = new Array();

    //We obtain all the IDs embeded in the id names.
    $("input[id^='acceptable_']").each(function(index){
        var tag = $(this).attr("id");
        var id = tag.match(/[0-9]+/g);
        console.log(id[0]);
        idArray.push(id[0]);
    });

    //For each index, we create an object with the added information gathered in the form
    idArray.forEach(function(index){
        var hardware = new Object();

        hardware.date = date;
        hardware.time = time;
        hardware.workplace_hardware_id = Number(index);
        hardware.status = $.parseJSON($("input:radio[name='status_" + index +"']:checked").val());
        if(!hardware.status)
            hardware.corrective_action = Number($("#corrective_" + index).val());
        else
            hardware.corrective_action = 0;
        hardware.comment = $("#comments_" + index).val();

        report.push(hardware);
    });
    console.log(report);
    console.log(JSON.stringify(report));
}

function sendButtonSSOP(){
    return $('<div class="center-align" style="margin-bottom: 0.5cm">' +
                '<a class="waves-effect waves-light btn-large green-600" id="send">' +
                    '<i class="material-icons right">send</i>Enviar' +
                '</a>' +
            '</div>');
}