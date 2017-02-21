function logCard(name, suffix){
    var card = $("<div>");

    card.addClass("card-panel white waves-effect waves-green");
    card.attr("style", "display:block;");

    card.append(name);

    card.data("link", "logs?_="+suffix);

    card.on('click', function(event) {
        // prevent normal navigation
        event.preventDefault();

        // get the layout that is being requested 
        var targetLayout = $(this).data('link');

        // push the state to the history stack
        window.history.pushState({ layout: targetLayout }, '', targetLayout);

        // load the requested layout
        $app.load(targetLayout); 
    });

    return card;
}

$(function() {
    var privileges = JSON.parse(localStorage.privileges);

    console.log(privileges);

    for(var zone of privileges.zones){
        for(var program of zone.programs){
            for(var module of program.modules){
                for(var log of module.logs){
                    $("#content_wrapper").append(logCard(log.name, log.suffix));
                }
            }
        }
    }

    $("#content_wrapper").append(logCard("Scale Calibration", "scale-calibration"));

    initMaterialize();

    changeLanguage(localStorage.defaultLanguage);
});