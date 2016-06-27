// Interface for displaying layouts to the screen and executing their
// corresponding behavior after it loads
// [in]     root: the root URL from which every layout is going to be 
//          requested
// [in]     container: the DOM container which the layour is going to be 
//          loaded to
Application = function(root, container)
{
    this.root = root;
    this.container = container;

    // asscociative array where the behaviors are stored; key indicates
    // the name of the layout and value is the behavior itself
    this.behaviors = {};
}


// Adds a new behavior to the behaviors list
// [in]     layout: name of the layout the behavior belongs to
// [in]     behavior: the behavior that will be stored
Application.prototype.addBehavior = function(layout, behavior)
{
    this.behavior[layout] = behavior;
}


// Laods the especified layout and executes its corresponding behavior
// [in]     layout: the name of the layout to load
Application.prototype.load = function(layout)
{
    // check if the layout behavior exists
    try {
        if (this.behaviors[layout]) {
            // if it does, load the layout to the container and then 
            // execute the behavior
            var behavior = this.behaviors[layout];
            $(this.container).load(this.root + layout, behavior);
        } else {
            // if not, throw an error
            throw 'The requested behavior "' + layout + '" is undefined.';
        }
    } catch (e) {
        this.handleException(e);
    }
}


// Catches an exception and process it properly
Application.prototype.handleException = function(exception)
{
    // for now, simply print to console
    console.log(exception);
}


// Instantiate the application clas that we just created as a global
// variable
$app = new Application('/espresso/layouts/', '#page-content');