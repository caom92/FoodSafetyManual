function getSSOPReport(){
    var src = "../../scripts/test_ssop_report.json";
    //var src = "http://localhost/Espresso/source/server/sanitationPreOpForm.php";
    $.getJSON(src, function(data){
        console.log("Petición de JSON exitosa");
        data.data.forEach(function(index){
            $("body").append(createAreaCard(index));
        });
        init();
    });
}

function createAreaCard(areaObject){
    var areaCard = $("<div>");
    var name = areaObject.area_name;
    var hardwareList = areaObject.hardware;

    areaCard.attr("class", "card-panel");
    areaCard.attr("style", "width:95%; margin: auto; margin-bottom: 0.5cm;");

    areaCard.append("<h6>" +  name +  "</h6>");

    hardwareList.forEach(function(index){
        areaCard.append(createHardwareCard(index));
    });

    return areaCard;
}

function createHardwareCard(hardwareObject){
    var hardwareCard = $("<div>");
    var firstRow = $("<div>");
    var secondRow = $("<div>");
    var thirdRow = $("<div>");
    var firstColumn = $("<div>");
    var secondColumn = $("<div>");

    var name = hardwareObject.hardware_name;
    var status = hardwareObject.status;
    var corrective = hardwareObject.corrective_action;
    var comment = hardwareObject.comment;

    hardwareCard.attr("class", "card-panel");

    //First Row, element name and status

    firstRow.attr("class", "row");

    firstColumn.attr("class", "col s6");
    firstColumn.append('<div style="font-weight: bold">Elemento</div>');
    firstColumn.append('<div>' + name + '</div>');
    firstRow.append(firstColumn);

    secondColumn.attr("class", "col s6");
    secondColumn.append('<div style="font-weight: bold">Condiciones</div>');
    if(status == 0){
        secondColumn.append('<div><i class="material-icons" style="color: green;">check_circle</i></div>')
    } else {
        secondColumn.append('<div><i class="material-icons" style="color: red;">cancel</i></div>');
    }
    firstRow.append(secondColumn);

    hardwareCard.append(firstRow);

    if(status == 0){
        secondRow.attr("class", "row");
        secondRow.append('<div style="font-weight: bold">Acción Correctiva</div>');
        secondRow.append('<div>' + corrective + '</div>');
        hardwareCard.append(secondRow);
    }

    thirdRow.attr("class", "row");
    thirdRow.append('<div style="font-weight: bold">Comentarios</div>');
    thirdRow.append('<div>' + comment + '</div>');
    hardwareCard.append(thirdRow);

    return hardwareCard;
}

//Any and all functions needed to display the document correctly.
function init(){
    console.log("Init ready");
}