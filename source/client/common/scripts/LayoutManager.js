// Interface for displaying layouts to the screen and executing their
// corresponding behavior after it loads
// [in]     root: the root URL from which every layout is going to be 
//          requested
// [in]     container: the DOM container which the layour is going to be 
//          loaded to
LayoutManager = function(root, container)
{
    this.root = root;
    this.container = container;

    // indicate which layouts are common to any user role
    this.common = [
        '',
        'edit-profile',
        'login',
        'report-problem',
        'password-recovery',
        'logs',
        'modules'
    ];
}


// Laods the especified layout and executes its corresponding behavior
// [in]     layout: the name of the layout to load
// [in]     [container]: the selector of the HTML tag where to load the
//          especified layout; the default value is the container 
//          especified in the layout manager's constructor
LayoutManager.prototype.load = function(layout, container = this.container)
{
    // compute the base URL where the layout is going to be requested for
    // depending if the layout is common or not
    var baseURL = this.root;
    var layoutParts = layout.split('?');
    baseURL += (this.common.indexOf(layoutParts[0]) != -1) ? 
        'common/' : localStorage.exclusive_access;
    var app = this;

    // load the requested layout page
    $(container).load(baseURL + 'layouts/' + layout,
        function(response, status, xhr) {
            // then load and execute the corresponding behavior script
            var error = status == 'error';
            if (error) {
                $(app.container).html(response);
                baseURL = 'common/';
                layout = 'error';
            }

            var hasQueryString = layout.indexOf('?') != -1;
            if (hasQueryString) {
                layout = layout.split('?')[0];
            }

            $.ajax({
                method: 'GET',
                url: baseURL + 'controllers/' + layout + '.js',
                dataType: 'script',
                cache: true,
                error: function(xhr, status, message) {
                    // if the script failed to load, display an error 
                    // message
                    console.log('server says: (' + status + ') ' + message);
                }
            });
        }
    );
}


// Instantiate the LayoutManager class that we just created as a global
// variable
$app = new LayoutManager($root, '#page-content');