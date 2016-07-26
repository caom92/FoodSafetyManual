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

    // asscociative array where the behaviors are stored; key indicates
    // the name of the layout and value is the behavior itself
    this.behaviors = [];
}


// Laods the especified layout and executes its corresponding behavior
// [in]     layout: the name of the layout to load
// [in]     [container]: the selector of the HTML tag where to load the
//          especified layout; the default value is the container 
//          especified in the layout manager's constructor
LayoutManager.prototype.load = function(layout)
{
    // store the reference to this object for future use
    var self = this;

    // load the requested layout page
    $(this.container).load(this.root + 'layouts/' + view,
        function() {
            // then load and execute the corresponding behavior script
            $.ajax({
                method: 'GET',
                url: self.root + 'behaviors/' + view + '.js',
                dataType: 'script',
                cache: true,
                error: function(xhr, status, message) {
                    // if the script failed to load, display an error message
                    console.log('server says: (' + status + ') ' + message);
                }
            });
        }
    );
}


// Instantiate the LayoutManager clas that we just created as a global
// variable
$app = new LayoutManager($root, '#page-content');