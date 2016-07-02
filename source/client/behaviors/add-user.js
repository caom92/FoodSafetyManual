function addPermisionTable(){
    $("#permissions_body").append(addPermissionRow("SSOP", 0));
    $("#permissions_body").append(addPermissionRow("GMP", 0));
}

function addPermissionRow(procedureName, valueChecked){
    var row;
    var name;
    var none;
    var read;
    var write;

    row = $("<tr>");
    name = $("<td>");
    noneLabel = $("<label>")
    noneInput = $("<input>");
    readInput = $("<input>");
    readLabel = $("<label>")
    writeInput = $("<input>");
    writeLabel = $("<label>")

    name.attr("id", procedureName);
    //name.text(procedureName);

    noneInput.attr("name", procedureName);
    noneInput.attr("type", "radio");
    noneInput.attr("id", procedureName + "_none");
    noneInput.attr("value", 0);
    noneLabel.attr("for", procedureName + "_none");

    readInput.attr("name", procedureName);
    readInput.attr("type", "radio");
    readInput.attr("id", procedureName + "_read");
    readInput.attr("value", 1);
    readLabel.attr("for", procedureName + "_read");

    writeInput.attr("name", procedureName);
    writeInput.attr("type", "radio");
    writeInput.attr("id", procedureName + "_write");
    writeInput.attr("value", 2);
    writeLabel.attr("for", procedureName + "_write");

    row.append(name);
    row.append($("<td>").append(noneInput, noneLabel));
    row.append($("<td>").append(readInput, readLabel));
    row.append($("<td>").append(writeInput, writeLabel));

    switch (valueChecked) {
        case 0: noneInput.attr("checked", "checked"); break;
        case 1: readInput.attr("checked", "checked"); break;
        case 2: writeInput.attr("checked", "checked"); break;
        default: noneInput.attr("checked", "checked");
    }

    return row;
}

function getProcedureNames(){
    $.ajax({
        url: '/espresso/data/files/procedures.xml',
        success: function(xml){
            var name = $(xml).find('procedure').each(function(){
                var id = $(this).attr('id');
                var text = $(this).find('name').text();
                $("#" + id).text(text);
            });
        }
    });
}

function onAddUserViewReady(){
    addPermisionTable();
    getProcedureNames();
}