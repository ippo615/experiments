var ITER_MODULE = function ($self) {
    if (!$self) {
        $self = {};
    }

    $self.iter_over_all_nested = function (objects, fn) {
        /// Calls fn(obj) for every element in every nested array in objects.
        /// For example: if [ x, y, [a,b,c] ] is the array to be iterated
        /// the action will be applied: fn(c); fn(b); fn(a); fn(y); fn(x);
        var i = objects.length,
            iObj;
        while (i--) {
            iObj = objects[i];
            //if(iObj == null){ continue; }
            if (iObj instanceof Array) {
                $self.iter_over_all_nested(iObj, fn);
            } else {
                fn(iObj);
            }
        }
    };

    $self.iter_over_each = function (objs, fn) {
        /// Applies the action to the first level elements in the array.
        /// For example: if [ x, y, [a,b,c] ] is the array to be iterated
        /// the action will be applied: action(x); action(y);
        /// action([a,b,c]);
        var nIterations = Math.floor(objs.length / 8);
        var nExtra = objs.length % 8;
        var i = objs.length - 1;
        while (nExtra--) {
            fn(objs[i--]);
        }
        while (nIterations--) {
            fn(objs[i--]);
            fn(objs[i--]);
            fn(objs[i--]);
            fn(objs[i--]);
            fn(objs[i--]);
            fn(objs[i--]);
            fn(objs[i--]);
            fn(objs[i--]);
        }
        //action(objs[i]);

    };

    $self.iter_repeat = function (count, fn) {
        /// Calls `fn(i)` `count` times where `i` is the number of
        /// times that the function has been called.
        var nIterations = Math.floor(count / 8);
        var nExtra = count % 8;
        var i = 0;
        while (nExtra--) {
            fn(i++);
        }
        while (nIterations--) {
            fn(i++);
            fn(i++);
            fn(i++);
            fn(i++);
            fn(i++);
            fn(i++);
            fn(i++);
            fn(i++);
        }
        return $self;
    };

    $self.iter_flatten_array = function (anArray) {
        /// Returns a single level version of the nested array.
        /// Example: [x,[y,[a,b,c],z]] -> [x,y,a,b,c,z]
        var subArrayElems = [],
            i = anArray.length;
        while (i--) {
            if (anArray[i] instanceof Array) {
                subArrayElems.push.apply(subArrayElems, $self.iter_flatten_array(anArray[i]));
            } else {
                subArrayElems.push(anArray[i]);
            }
        }
        return subArrayElems;
    };

    return $self;
};