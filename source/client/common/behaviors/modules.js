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
    var getParams = getURLQueryStringAsJSON();

    console.log(privileges);

    $("#content_wrapper").html("");

    for(var log in privileges[localStorage.zone_name][getParams._p]["suffixes"][getParams._m]){
        console.log(privileges[localStorage.zone_name][getParams._p]["suffixes"][getParams._m][log]);
        $("#content_wrapper").append(logCard(log, privileges[localStorage.zone_name][getParams._p]["suffixes"][getParams._m][log]["suffix"]));
    }

    initMaterialize();

    changeLanguage(localStorage.defaultLanguage);
});