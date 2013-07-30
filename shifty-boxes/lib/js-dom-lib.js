var DOM_MODULE = function ($self) {
    if (!$self) {
        $self = {};
    }
    $self.dom_get_pointer_positions_in = function (e, target) {
        /// Returns an array of {x: y:} objects that represent the x,y
        /// coordinates of the pointers relative to the top, left corner of the
        /// target object.
        /// Example:
        /// domNode.onclick = function(e){
        ///   var positions = GetPointerPositionsInTarget(e);
        ///   // Code that works with positions..
        /// }

        // Note that the target is the 'node on which the event occured'
        // not the 'node on which the event is registered'. For example:
        // <div id='parent'><div id='child'>BLAH</div></div>
        // If you regesiter the event on parent than target could be either
        // parent or child.
        var locations = [], // array of x,y pairs (finger locations)
            nLocations = 0, // number of locations
            nTouches, // number of touches to look through
            mx = 0, // mouse position
            my = 0,
            baseX = 0, // Base object's position
            baseY = 0,
            baseObj,
            i, iLocation, iTouch; // temp for iterating

        //get the event
        if (!e) {
            e = window.event;
        }

        // touch events
        if (e.type === "touchstart" || e.type === "touchmove" || e.type === "touchend" || e.type === "touchcancel") {
            nTouches = e.touches.length;
            for (i = 0; i < nTouches; i += 1) {
                iTouch = e.touches[i];
                locations[nLocations] = {
                    x: iTouch.pageX,
                    y: iTouch.pageY
                };
                nLocations += 1;
            }
            //could also use: (i haven't noticed a difference)
            //t = event.changedTouches[0];
            //get the mouse coordinates on the page
        }

        // mouse events
        else {
            //if we're actually given the page coordinates
            if (e.pageX || e.pageY) {
                //use the page coordinates as the mouse coordinates
                mx = e.pageX;
                my = e.pageY;
            } else if (e.clientX || e.clientY) {
                //compute the page corrdinates
                mx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                my = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            locations[nLocations] = {
                x: mx,
                y: my
            };
            nLocations += 1;
        }

        // find the location of the base object
        // by adding all of the parent's offsets
        baseObj = target;
        while (baseObj.offsetParent !== null) {
            baseX += parseInt(baseObj.offsetLeft, 10);
            baseY += parseInt(baseObj.offsetTop, 10);
            baseObj = baseObj.offsetParent;
        }

        // subtract the refence object's location to get the
        // pointer positions relative to it
        for (i = 0; i < nLocations; i += 1) {
            iLocation = locations[i];
            locations[i].x = iLocation.x - baseX;
            locations[i].y = iLocation.y - baseY;
        }

        return locations;
    };

    $self.dom_get_pointer_position_in = function (e, target) {
        return $self.dom_get_pointer_positions_in(e, target)[0];
    };

    $self.dom_get_element_under_pointer = function (e) {
        /// Returns the element under the pointer (regardless of the src/target element)
        e = e || window.event;
        var x = 0,
            y = 0;
        if (e.type === "touchstart" || e.type === "touchmove" || e.type === "touchend" || e.type === "touchcancel") {
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }
        var element = document.elementFromPoint(x, y);
        // If a text nodes is reported - get the parent instead
        if (element){
		while( element.tagName !== 'DIV' ) {
		    if( element.parentNode ){
		            element = element.parentNode;
			}else{
				break;
			}
		}
        }
        return element;
    };

    $self.dom_is_pointer_start = function (e) {
        return (e.type === "touchstart" || e.type === "mousedown");
    };

    $self.dom_is_pointer_end = function (e) {
        return (e.type === "touchend" || e.type === "touchcancel" || e.type === "mouseup");
    };

    $self.dom_is_pointer_move = function (e) {
        return (e.type === "touchmove" || e.type === "mousemove");
    };

    $self.dom_add_event = function (node, eventString, fn) {
        /// Registers fn to handle events on node.
        /// addEvent(document.getElementById('body-id'),'mouseup mousedown',function(){alert('hi');});
        var i;
        var events = eventString.split(' ');
        i = events.length;
        if (window.attachEvent) {
            while (i--) {
                // This is for IE - it only uses bubbling
                node.attachEvent("on" + events[i], fn);
            }
        } else {
            while (i--) {
                // always use bubbling (false) to be consistent with IE
                node.addEventListener(events[i], fn, false);
            }
        }
    };

    $self.dom_remove_event = function (node, eventString, fn) {
        /// Removes fn that have been registerd to handle events on node.
        /// removeEvent(document.getElementById('body-id'),'mouseup mousedown',function(){alert('hi');});
        var i;
        var events = eventString.split(' ');
        i = events.length;
        if (window.attachEvent) {
            while (i--) {
                // This is for IE - it only uses bubbling
                node.detachEvent("on" + events[i], fn);
            }
        } else {
            while (i--) {
                // always use bubbling (false) to be consistent with IE
                node.removeEventListener(events[i], fn, false);
            }
        }
    };

    $self.dom_get_event_target = function (e) {
        e = e || window.event;
        return e.target || e.srcElement;
    };

    $self.dom_get_viewport_size = function () {

        var viewPortWidth = 0;
        var viewPortHeight = 0;

        // the more standards compliant browsers
        if (typeof window.innerWidth !== 'undefined') {
            viewPortWidth = window.innerWidth;
            viewPortHeight = window.innerHeight;
        }

        // IE6 
        else if ( document.documentElement && document.documentElement.clientWidth !== 0) {
            viewPortWidth = document.documentElement.clientWidth;
            viewPortHeight = document.documentElement.clientHeight;
        }

        // older versions of IE
        else {
            viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
        }

        return {
            xSize: viewPortWidth,
            ySize: viewPortHeight
        };
    };

    return $self;
};