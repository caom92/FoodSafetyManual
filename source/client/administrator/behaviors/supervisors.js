function addZoneSelect() {
    var select = $("<select>");
    var label = $("<label>");

    select.attr("id", "zone_select");
    label.addClass("select_zone");
    label.attr("for", "zone_select");

    $server.request({
        service: 'list-zones',
        success: function (response) {
            if (response.meta.return_code == 0) {
                for (var zone of response.data) {
                    var option = $("<option>");
                    option.attr("value", zone.id);
                    option.append(zone.name);
                    select.append(option);
                }
                $("#zone_select_wrapper").append(select);
                $("#zone_select_wrapper").append(label);
                addSupervisorSelect(parseInt($("zone_select").val()));
                changeLanguage(localStorage.defaultLanguage);
            } else {
                throw response.meta.message;
            }
        }
    });
}

function addSupervisorSelect(zoneID){
    var select = $("<select>");
    var label = $("<label>");

    select.attr("id", "supervisor_select");
    label.addClass("select_supervisor");
    label.attr("for", "supervisor_select");

    var data = new Object();

    data.

    $server.request({
        service: 'list-supervisors-by-zone',
        success: function (response) {
            if (response.meta.return_code == 0) {
                for (var supervisor of response.data.supervisors) {
                    var option = $("<option>");
                    option.attr("value", supervisor.id);
                    option.append(supervisor.full_name);
                    select.append(option);
                }
                $("#supervisor_select_wrapper").append(select);
                $("#supervisor_select_wrapper").append(label);
                changeLanguage(localStorage.defaultLanguage);
            } else {
                throw response.meta.message;
            }
        }
    });
}

$(function (){
    addZoneSelect();
    changeLanguage(localStorage.defaultLanguage);
});