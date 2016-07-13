function addZoneListElement(element){
    var row = $("<tr>");
    row.append($("<td>").text(element.name));
    return row;
}

function addZoneList(zoneList) {
    var list = $("<tbody>");
    for (element of zoneList) {
        list.append(addZoneListElement(element));
    }
    return list;
}

function addZoneHeader() {
    var header = $("<thead>");
    var headerRow = $("<tr>");
    headerRow.append($('<th data-field="zone_name" class="zone_name"></th>'));
    header.append(headerRow);
    return header;
}

function createZoneTable(zoneList) {
    var table = $("<table>");
    table.addClass("bordered striped highlight responsive-table");
    table.append(addZoneHeader());
    table.append(addZoneList(zoneList));
    return table;
}

$app.behaviors['add-zone'] = function (){
    $server.request({
        service: "list-zones",
        success: function(response, message, xhr) {
            console.log(response.data);
            $("#zones_wrapper").append(createZoneTable(response.data));
            changeLanguage(localStorage.defaultLanguage);
        }
    });
}