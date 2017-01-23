function waitingReportCard(report){
    var reportCard = $("<div>");
    var employeeInfoRow = $("<div>");
    var buttonRow = $("<div>");

    reportCard.addClass("card-panel");
    employeeInfoRow.addClass("row");
    buttonRow.addClass("row center-align");

    employeeInfoRow.append(employeeInfo(report.log_name, report.first_name + " " + report.last_name, report.capture_date));
    var approveButton = reportCardButton(null, "green", null, null, "check-circle");
    var rejectButton = reportCardButton(null, "red", null, null, "close-circle");
    var reportButton = reportCardButton(null, "blue", null, null, "file");

    approveButton.click(function(index){
        approveReport(report.captured_log_id);
        reportCard.remove();
    });

    rejectButton.click(function(index){
        rejectReport(report.captured_log_id, report);
        reportCard.remove();
    });

    buttonRow.append(approveButton);
    buttonRow.append(rejectButton);
    buttonRow.append(reportButton);

    reportCard.append(employeeInfoRow);
    reportCard.append(buttonRow);

    return reportCard;
}

function rejectedReportCard(report){
    var reportCard = $("<div>");
    var employeeInfoRow = $("<div>");
    var buttonRow = $("<div>");

    reportCard.addClass("card-panel");
    employeeInfoRow.addClass("row");
    buttonRow.addClass("row center-align");

    employeeInfoRow.append(employeeInfo(report.log_name, report.first_name + " " + report.last_name, report.capture_date));
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
    button.addClass(buttonClass);
    if(offset)
        buttonWrapper.addClass("offset-s" + offset +  " offset-m" + offset +  " offset-l" + offset);

    button.attr("id", id);

    text.addClass(textClass);

    button.append(text, " ", icon);

    buttonWrapper.append(button);

    return buttonWrapper;
}

function fillPendingAuthorizations(){
    var data = new Object();
    data.supervisor_id = parseInt(localStorage.user_id);

    $server.request({
        service: 'list-unapproved-logs-of-supervisor',
        data: data,
        success: function(response){
            if(response.meta.return_code == 0){
                console.log(response.data);
                for(var waiting of response.data.waiting.logs){
                    $("#waiting_reports").append(waitingReportCard(waiting));
                }

                for(var rejected of response.data.rejected.logs){
                    $("#rejected_reports").append(rejectedReportCard(rejected));
                }
                updateSigns();
                changeLanguage(localStorage.defaultLanguage);
            }
        }
    });
}

function getISODate(date){
    var ISODate = "";

    ISODate += date.getFullYear() + "-";

    if((date.getMonth() + 1) < 9){
        ISODate += "0" + (date.getMonth() + 1)+ "-";
    } else {
        ISODate += (date.getMonth() + 1) + "-";
    }

    if(date.getDate()<9){
        ISODate += "0" + date.getDate();
    } else {
        ISODate += date.getDate();
    }

    return ISODate;
}

function approveReport(logID){
    var data = new Object();

    data.captured_log_id = logID;
    data.date = getISODate(new Date());

    console.log(data);

    $server.request({
        service: 'approve-log',
        data: data,
        success: function(response){
            if(response.meta.return_code == 0){
                loadToast("approve_report", 2500, "rounded");
                updateSigns();
            }
        }
    });
}

function rejectReport(logID, report){
    var data = new Object();

    data.captured_log_id = logID;

    $server.request({
        service: 'reject-log',
        data: data,
        success: function(response){
            if(response.meta.return_code == 0){
                loadToast("reject_report", 2500, "rounded");
                $("#rejected_reports").append(rejectedReportCard(report));
                updateSigns();
                changeLanguage(localStorage.defaultLanguage);
            }
        }
    });
}

function updateSigns(){
    if($("#rejected_reports").children().length == 1){
        $("#no_rejected_reports").show();
    } else {
        $("#no_rejected_reports").hide();
    }

    if($("#waiting_reports").children().length == 1){
        $("#no_waiting_reports").show();
    } else {
        $("#no_waiting_reports").hide();
    }
}

$(function (){
    fillPendingAuthorizations();
});