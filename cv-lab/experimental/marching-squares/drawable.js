// ------------------------------------------------------- [Module: Overlay ] -
// Let's you draw (via mouse/touch) on a canvas
var setupOverlay = (function(){

    // My lazy excuse for jQuery:
    function $(selector){
        // Allow '#id' or 'id'
        var c = selector.charAt(0);
        if( c === '#' ){
            var element = document.getElementById(selector.slice(1,selector.length));
        }else{
            var element = document.getElementById(selector);
        }
        /*
        }else if( c === '.' ){
            var element = document.getElementsByClassName(selector.slice(1,selector.length))[0];
        }else{
            var element = document.getElementsByTagName(selector)[0];
        }
        */
        var self = {}
        var on = function(eventStr,callback){
            var events = eventStr.split(' ');
            var i, l = events.length;
            for( i=0; i<l; i+=1 ){
                if( element.attachEvent ){
                    element.attachEvent('on'+events[i], callback);
                }else{
                    element.addEventListener(events[i], callback, false);
                }
            }
            return self;
        };

        self.on = on;
        self.element = element;

        return self;
    }

    var getPointerPositionsIn = function(e,target){
    /// Returns an array of {x: y:} objects that represent the x,y
    /// coordinates of the pointers relative to the top, left corner of the
    /// target object.
    /// Example:
    /// domNode.onclick = function(e){
    /// var positions = GetPointerPositionsInTarget(e);
    /// // Code that works with positions..
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
    
        //get the original event (jQury changes e)
        //e = e.originalEvent;
        //we need an array of x,y pairs
        //if this is a touch event
        if(e.type === "touchstart"
        || e.type === "touchmove"
        || e.type === "touchend"){
            nTouches = e.touches.length;
            for(i=0; i<nTouches; i+= 1){
                iTouch = e.touches[i];
                locations[nLocations] = { x: iTouch.pageX, y: iTouch.pageY };
                nLocations += 1;
            }
            //could also use: (i haven't noticed a difference)
            //t = event.changedTouches[0];
            //get the mouse coordinates on the page
        }else{  
            //if we're actually given the page coordinates
            if(e.pageX || e.pageY){
                //use the page coordinates as the mouse coordinates
                mx = e.pageX;
                my = e.pageY;
            }else if(e.clientX || e.clientY){
                //compute the page corrdinates
                mx = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                my = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }
            locations[nLocations] = { x: mx, y: my };
            nLocations += 1;
        }
        //find the location of the base object
        baseObj = target;
        //as long as we haven't added all of the parents' offsets
        while(baseObj.offsetParent !== null){
            //add it's offset
            baseX += parseInt(baseObj.offsetLeft,10);
            baseY += parseInt(baseObj.offsetTop,10);
            //get the next parent
            baseObj = baseObj.offsetParent;
        }
        //the mouse position within the target object is:
        for(i=0; i<nLocations; i+=1){
            iLocation = locations[i];
            locations[i].x = iLocation.x - baseX;
            locations[i].y = iLocation.y - baseY;
        }
        return locations;
    };

    var lastPos = null;
    var currPos = null;
    var canvas = null;

    return function(id,onChange){
        var localOnChange = (function(onChange){ return function(){
            onChange();
        }; })(onChange);

        canvas = $(id);

        canvas.on('touchstart mousedown',function(e){
            lastPos = getPointerPositionsIn(e,canvas.element);
            currPos = lastPos;
        }).on('touchmove mousemove',function(e){
            if( lastPos ){
                var tmp = lastPos;
                lastPos = currPos;
                currPos = getPointerPositionsIn(e,canvas.element);
    
                // Only draw a line if it's longer than 5 units
                //var dx = currPos[0].x - lastPos[0].x;
                //var dy = currPos[0].y - lastPos[0].y;
                //if( dx*dx + dy*dy < 32 ){
                //  currPos = lastPos;
                //  lastPos = tmp;
                //  return;
                //}
                
                // Draw this segment
                var ctx = canvas.element.getContext('2d');
                ctx.lineWidth = 12;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(lastPos[0].x,lastPos[0].y);
                ctx.lineTo(currPos[0].x,currPos[0].y);
                ctx.stroke();
    
            }
            if( e.preventDefault ){
                e.preventDefault();
            }
        }).on('touchend mouseup mouseout',function(e){
            lastPos = null;
            currPos = lastPos;
            localOnChange()
        });
    };
})();
