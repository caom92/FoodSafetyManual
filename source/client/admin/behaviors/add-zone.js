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
    table.addClass("bordered striped highlight");
    table.append(addZoneHeader());
    table.append(addZoneList(zoneList));
    return table;
}


// Entry point for the controller of the add-zone view
$(function (){
    // indicate that we want the new zone text field to always display the text 
    // in uppercase
    $('input[name="new-zone"]').css('text-transform', 'uppercase');

    // then hide the text field
    $('#add-zone-form').hide();

    // when the user clicks the add zone button
    $('#add_zone').on('click', function(event) {
        // prevent navigation to other page
        event.preventDefault();

        // then check if the new zone name text field is visible or not
        if ($('#add-zone-form').is(':visible')) {
            // if it is visible, we need to check if the new name is already 
            // taken 

            // temporal variable where to store the table cells with the same
            // zone name that the one input
            var coincidences = null;

            // retrieve all cells with the same zone name than the one input
            coincidences = 
                $('td:contains(' 
                    + $('input[name="new-zone"]').val().toUpperCase() 
                    + ')'
                );

            // check if the zone name was repeated 
            var isRepeated = coincidences.length > 0;
            if (isRepeated) {
                // if it was, visually notify the user
                $(this).addClass('invalid');
                Materialize.toast('Zone name already in use.', 3500, 'rounded');
            } else {
                // store the zone in the data base
                $server.request({
                    service: 'add-zone',
                    data: {
                        new_zone: 
                            $('input[name="new-zone"]').val().toUpperCase()
                    },
                    success: function(response) {
                        // check if the request was processed successfully
                        if (response.meta.return_code == 0) {
                            // if it was, add a new table row with the new zone
                            $('tbody').append(
                                '<tr><td>' 
                                + $('input[name="new-zone"]').val().toUpperCase() 
                                + '</td></tr>'
                            );

                            // hide the text field
                            $('#add-zone-form').hide();

                            // reset the text in the text field
                            $('input[name="new-zone"]').val('');

                            // and notify the user of the successful addition
                            Materialize.toast('Zone added successfully', 3500, 'rounded');
                        } else {
                            // if something went wrong, display an error message
                            console.log('server says: ' 
                                + response.meta.message);
                        }
                    }
                });
            }
        } else {
            // if the text field is not visible, then show it so the user
            // can interact with it
            $('#add-zone-form').show();
        }
    });

    // retrieve the zones list
    $server.request({
        service: "list-zones",
        success: function(response, message, xhr) {
            console.log(response.data);
            $("#zones_wrapper").append(createZoneTable(response.data));
            changeLanguage(localStorage.defaultLanguage);
        }
    });
});