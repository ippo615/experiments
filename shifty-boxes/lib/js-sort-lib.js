var SORT_MODULE = function ($self) {
    if (!$self) {
        $self = {};
    }

    $self.sort_by_function = function (objs, fn) {
        objs.sort(fn);
        return objs;
    };

    $self.sort_by_ascending = function (objs, property) {
        objs.sort(function (a, b) {
            return a[property] - b[property];
        });
        return objs;
    };
    $self.sort_by_descending = function (objs, property) {
        objs.sort(function (a, b) {
            return b[property] - a[property];
        });
        return objs;
    };
    $self.sort_randomly = function (objs) {
        var nElements = objs.length,
            nSwaps = 1 + Math.floor(nElements / 2),
            p1, p2, swap;
        while (nSwaps--) {
            p1 = Math.floor(nElements * Math.random());
            p2 = Math.floor(nElements * Math.random());
            swap = objs[p1];
            objs[p1] = objs[p2];
            objs[p2] = swap;
        }
        return objs;
    };

    return $self;
};