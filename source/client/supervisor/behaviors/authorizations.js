function waitingReportCard(logName, employeeName, date){
    var reportCard = $("<div>");
    var employeeInfoRow = $("<div>");
    var buttonRow = $("<div>");

    reportCard.addClass("card-panel");
    employeeInfoRow.addClass("row");
    buttonRow.addClass("row center-align");

    employeeInfoRow.append(employeeInfo(logName, employeeName, date));
    buttonRow.append(reportCardButton(null, null, null, null, "check-circle"));
    buttonRow.append(reportCardButton(null, null, null, null, "close-circle"));
    buttonRow.append(reportCardButton(null, null, null, null, "file"));

    reportCard.append(employeeInfoRow);
    reportCard.append(buttonRow);

    return reportCard;
}

function rejectedReportCard(logName, employeeName, date){
    var reportCard = $("<div>");
    var employeeInfoRow = $("<div>");
    var buttonRow = $("<div>");

    reportCard.addClass("card-panel");
    employeeInfoRow.addClass("row");
    buttonRow.addClass("row center-align");

    employeeInfoRow.append(employeeInfo(logName, employeeName, date));
    buttonRow.append(reportCardButton(null, null, "8", null, "file"));

    reportCard.append(employeeInfoRow);
    reportCard.append(buttonRow);

    return reportCard;
}

function employeeInfo(logName, employeeName, date){
    var info = $("<div>");

    info.addClass("col s12 m12 l12");

    info.append(infoRow("name", logName), $("<br>"));
    info.append(infoRow("employee", employeeName), $("<br>"));
    info.append(infoRow("date_name", date), $("<br>"));

    return info;
}

function infoRow(type, info){
    var row = $("<span>");
    var typeSpan = $("<span>");
    var infoSpan = $("<span>");

    typeSpan.addClass(type);

    infoSpan.append(info);

    row.append(typeSpan);
    row.append(": ");
    row.append(infoSpan);

    return row;
}

function reportCardButton(id, buttonClass, offset, textClass, icon){
    var buttonWrapper = $("<div>");
    var button = $('<a class="waves-effect waves-light btn">');
    var text = $('<span>');
    var icon = $('<i class="mdi mdi-' + icon + ' mdi-20px"></i>');

    buttonWrapper.addClass("col s4 m4 l4");
    buttonWrapper.addClass(buttonClass);
    if(offset)
        buttonWrapper.addClass("offset-s" + offset +  " offset-m" + offset +  " offset-l" + offset);

    button.attr("id", id);

    text.addClass(textClass);

    button.append(text, " ", icon);

    buttonWrapper.append(button);

    return buttonWrapper;
}

$(function (){
    changeLanguage(localStorage.defaultLanguage);
});