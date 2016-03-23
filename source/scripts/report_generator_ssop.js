function getSSOPReport(){
    var src = "../../scripts/test_ssop_report.json";
    //var src = "http://localhost/Espresso/source/server/sanitationPreOpForm.php";
    $.getJSON(src, function(data){
        console.log("Petición de JSON exitosa");
        $("body").append(infoCard({date: "9 de marzo de 2016", name:"Víctor Miracle", zone:"South San Francisco"}));
        data.data.forEach(function(index){
            $("body").append(createReportTable(index));
        });
        init();
    });
}

function infoCard(data){
    var card = $("<div>");
    var date = data.date;
    var zone = data.zone;
    var reporterName = data.name;
    var imageSrc = "/Espresso/data/images/logo.png";

    card.attr("class", "card-panel");
    card.attr("style", "width:95%; margin: auto; margin-bottom: 0.5cm;");

    card.append("<h3>Zona: " + zone + "</h3>");
    card.append("<h5>Fecha de captura: " + date + "</h5>");
    card.append("<h5>Capturado por: " + reporterName + "</h5>");

    return card;
}

function createReportTable(areaObject){
    var reportCard = $("<div>");
    var table = $("<table>");
    var tableHeader = $("<thead>");
    var headerTitles = $("<tr>");
    var tableBody = $("<tbody>");
    var areaName = areaObject.area_name;
    var hardwareList = areaObject.hardware;

    reportCard.attr("class", "card-panel");
    reportCard.attr("style", "width:95%; margin: auto; margin-bottom: 0.5cm;");

    table.attr("class", "striped");

    headerTitles.append("<th>Elemento</th>");
    headerTitles.append("<th>Condiciones</th>");
    headerTitles.append("<th>Acción Correctiva</th>");
    headerTitles.append("<th>Comentarios</th>");

    tableHeader.append(headerTitles);

    hardwareList.forEach(function(index){
        tableBody.append(createHardwareRows(index));
    });

    table.append(tableHeader);
    table.append(tableBody);

    reportCard.append("<h5>" + areaName + "</h5>");
    reportCard.append(table);

    return reportCard;
}

function createHardwareRows(hardwareObject){
    var row = $("<tr>");
    var name = hardwareObject.hardware_name;
    var status = hardwareObject.status;
    var corrective = hardwareObject.corrective_action;
    var comment = hardwareObject.comment;

    row.append("<td>" + name + "</td>");
    if(status == 1){
        row.append("<td style='color: green;'>Aceptable</td>");
    } else {
        row.append("<td style='color: red'>No aceptable</td>");
    }
    row.append("<td>" + corrective + "</td>");
    row.append("<td>" + comment + "</td>");

    return row;
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
        secondColumn.append('<div><i class="material-icons" style="color: red;">cancel</i></div>');
    } else {
        secondColumn.append('<div><i class="material-icons" style="color: green;">check_circle</i></div>')
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
