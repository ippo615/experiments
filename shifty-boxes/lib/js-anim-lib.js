var ANIM_MODULE = function ($self) {
    if (!$self) {
        $self = {};
    }

    // For callbacks
    $self.null_function = function () {};
    $self.noop = function () {};

    // -------------------------------------------------------- [ Interpolation ] -
    var deCasteljau = function (pts) {
        /// Hacked function for evaluating Bezier curves.
        return function (t) {
            for (var a = pts; a.length > 1; a = b) { // do..while loop in disguise
                for (var i = 0, b = [], j; i < a.length - 1; i++) { // cycle over control points
                    for (b[i] = [], j = 0; j < a[i].length; j++) { // cycle over dimensions
                        b[i][j] = a[i][j] * (1 - t) + a[i + 1][j] * t; // interpolation
                    }
                }
            }
            return a[0][1]; // ogrinal returned a[0] but I only wanted 1 parameter returned
        };
    };

    $self.anim_cubic_bezier = function (x1, y1, x2, y2) {
        /// Returns a function f(t) that can be evaluated between t=0 and t=1 for CSS-like cubicBezier interpolation.
        return deCasteljau([
            [0, 0],
            [x1, y1],
            [x2, y2],
            [1, 1]
        ]);
    };

    $self.anim_ease = $self.anim_cubic_bezier(0.25, 0.1, 0.25, 1);
    $self.anim_linear = $self.anim_cubic_bezier(0, 0, 1, 1);
    $self.anim_ease_in = $self.anim_cubic_bezier(0.42, 0, 1, 1);
    $self.anim_ease_out = $self.anim_cubic_bezier(0, 0, 0.58, 1);
    $self.anim_ease_in_out = $self.anim_cubic_bezier(0.42, 0, 0.58, 1);

    // ----------------------------------------------------- [ Helper Functions ] -

    var getSamePropertyNames = function (a, b) {
        /// Returns an array of strings that are the properties of a and b with the same name.
        var each, names = [];
        for (each in a) {
            // Warning: if a property is in only one - it will not be used
            if (a.hasOwnProperty(each) && b.hasOwnProperty(each)) {
                names.push(each);
            }
        }
        return names;
    };

    var operateOnProperties = function (props, a, b, fn) {
        /// operateOnProperties(['x','y'], {x:0,y:0}, {x:5,y:2}, fn(a,b){return a - b});
        /// returns {x:-5,y:-2};
        /// Applies fn(a,b) to each property and return a new object with those results
        var obj = {}, prop;
        var i = props.length;
        while (i--) {
            prop = props[i];
            obj[prop] = fn(a[prop], b[prop]);
        }
        return obj;
    };

    var copyProperties = function (props, src) {
        /// Returns a copy of only props (array of names) from src (the source object).
        var obj = {}, prop;
        var i = props.length;
        while (i--) {
            prop = props[i];
            obj[prop] = src[prop];
        }
        return obj;
    };

    // ------------------------------------------------------ [ Animation Stuff ] -

    $self.anim_new_queue = function (target,opts) {
        return {
            index: 0,
            animTime: 0,
            time: 0,
            duration: 0,
            direction: 1, // later maybe I'll add support for different values
            isDone: 0,
            onDone: opts.onDone || $self.noop,
            animations: [],
            target: target,
            current: null
        };
    };

    $self.anim_push_queue = function (queue, animation) {
        /// Add animation to the queue
        // A sample animation obj is:
        // {
        //   duration: 1, // total duration of the animation (seconds)
        //   time: 0,     // start time of the animation
        //   onDone = function(obj){}, // callback function when the animation finishes, obj is the obj that is being animated
        //   start = {}, // object with desired starting animation properties
        //   end = {},   // object with desired ending animation properties
        //   delta = {}  // object with desired change in animated properties
        // }
        // For example {start:{x:0,y:0},end:{x:32,y:16}} would change an object's x,y from 0,0 to 32,16 over 1 second
        // For example {end:{x:32,y:16},duration:5} would change an object's x,y from whatever it currently is to 32,16 over 5 seconds
        queue.animations.push(animation);
        queue.duration += animation.duration || 1;
    };

    var updateAnimation = function (anim, dt) {

        // update the timing information
        anim.time += dt;
        anim.extra = 0;
        if (anim.time >= anim.duration) {
            anim.time = anim.duration;
            anim.isDone = 1;
            anim.extra = anim.time - anim.duration;
        }

        // interpolate to get the current values
        var i = anim.propNames.length,
            prop;
        while (i--) {
            prop = anim.propNames[i];
            anim.current[prop] = anim.start[prop] + anim.delta[prop] * anim.interpolate(anim.time / anim.duration);
        }

        // when the animation finished run the callback
        if (anim.hasCallback && anim.time >= anim.duration) {
            anim.onDone(anim.current);
        }
    };

    $self.anim_update = function (queue, dt) {
        /// Updates an animation queue by moving it forward by time dt 
        if (queue.isDone) {
            return;
        }

        // Create the current animation instance if we need one
        if (queue.current === null) {
            queue.current = makeAnim(queue.target, queue.animations[queue.index]);
        }

        // Update time and animation
        queue.time += dt * queue.direction;
        updateAnimation(queue.current, dt * queue.direction);

        // If the animation has completed: start the next animation(s) with the remaining time
        var extra = queue.current.extra;
        var nAnim = queue.animations.length;
        while (queue.current.isDone && -1 < queue.index && queue.index < nAnim) {
            queue.index += 1 * queue.direction;
            if (queue.index >= nAnim) {
                break;
            }
            queue.current = makeAnim(queue.target, queue.animations[queue.index]);
            updateAnimation(queue.current, extra * queue.direction);
            extra = queue.current.extra;
        }

        // If we've finish all queued animations - run the on end stuff
        if (queue.index === nAnim) {
            queue.isDone = 1;
            queue.time = queue.duration;
            queue.onDone(queue.current);
        }
    };

    var makeAnim = function (obj, opt) {
        var anim = {};

        // compute delta = end - start
        if (opt.start && opt.end) {
            // compute delta = start - end
            anim.propNames = getSamePropertyNames(opt.start, opt.end);
            anim.start = copyProperties(anim.propNames, opt.start);
            anim.delta = operateOnProperties(anim.propNames, opt.end, opt.start, function (a, b) {
                return a - b;
            });
            anim.end = copyProperties(anim.propNames, opt.end);
        }

        // compute end = start + delta
        if (opt.start && opt.delta) {
            anim.propNames = getSamePropertyNames(opt.start, opt.delta);
            anim.start = copyProperties(anim.propNames, opt.start);
            anim.delta = copyProperties(anim.propNames, opt.delta);
            anim.end = operateOnProperties(anim.propNames, opt.start, opt.delta, function (a, b) {
                return a + b;
            });
        }

        // compute end = current + delta
        if (!opt.start && opt.delta) {
            anim.propNames = getSamePropertyNames(obj, opt.delta);
            anim.start = copyProperties(anim.propNames, obj);
            anim.delta = copyProperties(anim.propNames, opt.delta);
            anim.end = operateOnProperties(anim.propNames, obj, opt.delta, function (a, b) {
                return a + b;
            });
        }

        // compute delta = end - current
        if (!opt.start && opt.end) {
            anim.propNames = getSamePropertyNames(obj, opt.end);
            anim.start = copyProperties(anim.propNames, obj);
            anim.delta = operateOnProperties(anim.propNames, obj, opt.end, function (a, b) {
                return b - a;
            });
            anim.end = copyProperties(anim.propNames, opt.end);
        }

        // compute start = end - delta
        if (opt.end && opt.delta) {
            anim.propNames = getSamePropertyNames(opt.end, opt.delta);
            anim.start = operateOnProperties(anim.propNames, opt.end, opt.delta, function (a, b) {
                return a - b;
            });
            anim.delta = copyProperties(anim.propNames, opt.delta);
            anim.end = copyProperties(anim.propNames, opt.end);
        }

        // Let the current thing just be a reference to the actual object
        anim.current = obj;
        anim.duration = opt.duration || 1;
        anim.time = opt.time || 0;
        anim.extra = 0;
        anim.isDone = opt.isDone || 0;
        anim.hasCallback = 0;
        anim.onDone = $self.noop;
        anim.interpolate = $self.anim_ease_in_out;
        if (opt.hasOwnProperty('onDone')) {
            anim.hasCallback = 1;
            anim.onDone = opt.onDone;
        }

        return anim;
    };

    return $self;
};